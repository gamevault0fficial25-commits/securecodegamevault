require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const dbPath = process.env.NODE_ENV === 'production' ? '/data/gamevault.db' : './gamevault.db';
const db = new sqlite3.Database(dbPath);
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;


// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for existing frontend
}));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// Database setup
db.serialize(() => {

  // Codes table
  db.run(`CREATE TABLE IF NOT EXISTS codes (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    status TEXT CHECK(status IN ('unused', 'used', 'disabled', 'expired')) DEFAULT 'unused',
    used_by_session TEXT,
    used_at INTEGER,
    created_at INTEGER NOT NULL,
    expires_at INTEGER
  )`);
  
  // User sessions table
  db.run(`CREATE TABLE IF NOT EXISTS user_sessions (
    id TEXT PRIMARY KEY,
    code_id TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    last_verified INTEGER NOT NULL,
    FOREIGN KEY(code_id) REFERENCES codes(id)
  )`);
  
  // Admin table (single admin)
  db.run(`CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL
  )`);
  
  // Insert default admin if not exists
  db.get(`SELECT * FROM admin WHERE id = 1`, (err, row) => {
    if (!row && process.env.ADMIN_PASSWORD_HASH) {
      db.run(`INSERT INTO admin (id, username, password_hash) VALUES (1, 'admin', ?)`, [process.env.ADMIN_PASSWORD_HASH]);
    }
  });
});

// Helper functions
function generateCodeId() {
  return crypto.randomUUID();
}

function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

function generateStrongCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  const segments = [];
  for (let i = 0; i < 3; i++) {
    let seg = '';
    for (let j = 0; j < 4; j++) seg += chars.charAt(Math.floor(Math.random() * chars.length));
    segments.push(seg);
  }
  return segments.join('-');
}

// Middleware: Check admin authentication
const requireAdmin = async (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error();
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Middleware: Check user access (valid session)
const requireUserAccess = async (req, res, next) => {
  const sessionToken = req.cookies.user_session;
  if (!sessionToken) return res.status(401).json({ error: 'No active session' });
  
  db.get(`SELECT * FROM user_sessions WHERE id = ?`, [sessionToken], (err, session) => {
    if (err || !session) return res.status(401).json({ error: 'Invalid session' });
    
    // Check if code still valid
    db.get(`SELECT * FROM codes WHERE id = ?`, [session.code_id], (err, code) => {
      if (err || !code) return res.status(401).json({ error: 'Code not found' });
      if (code.status !== 'used') return res.status(401).json({ error: 'Access revoked' });
      if (code.expires_at && Date.now() > code.expires_at) {
        db.run(`UPDATE codes SET status = 'expired' WHERE id = ?`, [code.id]);
        return res.status(401).json({ error: 'Code expired' });
      }
      
      // Update last_verified
      db.run(`UPDATE user_sessions SET last_verified = ? WHERE id = ?`, [Date.now(), sessionToken]);
      req.userSession = session;
      next();
    });
  });
};

// ========== PUBLIC API ==========
app.post('/api/verify-code', async (req, res) => {
  const { code } = req.body;
  if (!code || typeof code !== 'string') return res.status(400).json({ error: 'Code required' });
  
  const normalizedCode = code.trim().toUpperCase();
  
  db.get(`SELECT * FROM codes WHERE code = ?`, [normalizedCode], async (err, codeRow) => {
    if (err || !codeRow) return res.status(400).json({ error: 'Invalid code' });
    
    // Validate status
    if (codeRow.status !== 'unused') {
      if (codeRow.status === 'used') return res.status(400).json({ error: 'Code already used' });
      if (codeRow.status === 'disabled') return res.status(400).json({ error: 'Code disabled' });
      if (codeRow.status === 'expired') return res.status(400).json({ error: 'Code expired' });
      return res.status(400).json({ error: 'Code unavailable' });
    }
    
    // Check expiration
    if (codeRow.expires_at && Date.now() > codeRow.expires_at) {
      db.run(`UPDATE codes SET status = 'expired' WHERE id = ?`, [codeRow.id]);
      return res.status(400).json({ error: 'Code expired' });
    }
    
    // Mark code as used
    const sessionToken = generateSessionToken();
    db.run(`UPDATE codes SET status = 'used', used_by_session = ?, used_at = ? WHERE id = ?`, 
      [sessionToken, Date.now(), codeRow.id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to activate code' });
      
      // Create user session
      db.run(`INSERT INTO user_sessions (id, code_id, created_at, last_verified) VALUES (?, ?, ?, ?)`,
        [sessionToken, codeRow.id, Date.now(), Date.now()], (err) => {
        if (err) return res.status(500).json({ error: 'Session creation failed' });
        
        res.cookie('user_session', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        res.json({ success: true });
      });
    });
  });
});

app.get('/api/check-auth', (req, res) => {
  const sessionToken = req.cookies.user_session;
  if (!sessionToken) return res.json({ authenticated: false });
  
  db.get(`SELECT * FROM user_sessions WHERE id = ?`, [sessionToken], (err, session) => {
    if (err || !session) return res.json({ authenticated: false });
    
    db.get(`SELECT * FROM codes WHERE id = ? AND status = 'used'`, [session.code_id], (err, code) => {
      if (err || !code) return res.json({ authenticated: false });
      if (code.expires_at && Date.now() > code.expires_at) {
        db.run(`UPDATE codes SET status = 'expired' WHERE id = ?`, [code.id]);
        return res.json({ authenticated: false });
      }
      res.json({ authenticated: true });
    });
  });
});

app.post('/api/logout', (req, res) => {
  const sessionToken = req.cookies.user_session;
  if (sessionToken) {
    db.run(`DELETE FROM user_sessions WHERE id = ?`, [sessionToken]);
  }
  res.clearCookie('user_session');
  res.json({ success: true });
});

// ========== ADMIN API ==========
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });
  
  db.get(`SELECT password_hash FROM admin WHERE id = 1`, async (err, row) => {
    if (err || !row) return res.status(401).json({ error: 'Admin not configured' });
    
    const isValid = await bcrypt.compare(password, row.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000
    });
    res.json({ success: true });
  });
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
});

app.get('/api/admin/check', requireAdmin, (req, res) => {
  res.json({ authenticated: true });
});

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  db.get(`SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN status = 'used' THEN 1 ELSE 0 END) as used,
    SUM(CASE WHEN status = 'unused' THEN 1 ELSE 0 END) as unused,
    SUM(CASE WHEN status = 'disabled' THEN 1 ELSE 0 END) as disabled,
    SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expired
    FROM codes`, (err, stats) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(stats || { total: 0, used: 0, unused: 0, disabled: 0, expired: 0 });
  });
});

app.get('/api/admin/codes', requireAdmin, (req, res) => {
  const search = req.query.search || '';
  const searchTerm = `%${search}%`;
  
  db.all(`SELECT * FROM codes 
    WHERE code LIKE ? OR used_by_session LIKE ?
    ORDER BY created_at DESC`, 
    [searchTerm, searchTerm], (err, codes) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(codes || []);
  });
});

app.post('/api/admin/codes/generate', requireAdmin, (req, res) => {
  const { count = 1, expiryDays = null } = req.body;
  const generateCount = Math.min(Math.max(1, count), 50);
  const expiresAt = expiryDays && expiryDays > 0 ? Date.now() + (expiryDays * 86400000) : null;
  const newCodes = [];
  
  const insertCode = (code, callback) => {
    const id = generateCodeId();
    db.run(`INSERT INTO codes (id, code, status, created_at, expires_at) VALUES (?, ?, 'unused', ?, ?)`,
      [id, code, Date.now(), expiresAt], (err) => {
      if (err && err.message.includes('UNIQUE')) {
        // Regenerate on conflict
        const newCode = generateStrongCode();
        insertCode(newCode, callback);
      } else {
        newCodes.push({ id, code, status: 'unused', created_at: Date.now(), expires_at: expiresAt });
        callback();
      }
    });
  };
  
  let pending = generateCount;
  for (let i = 0; i < generateCount; i++) {
    insertCode(generateStrongCode(), () => {
      pending--;
      if (pending === 0) {
        res.json({ codes: newCodes, count: newCodes.length });
      }
    });
  }
});

app.put('/api/admin/codes/:id/toggle', requireAdmin, (req, res) => {
  const { id } = req.params;
  
  db.get(`SELECT status FROM codes WHERE id = ?`, [id], (err, code) => {
    if (err || !code) return res.status(404).json({ error: 'Code not found' });
    
    const newStatus = code.status === 'disabled' ? 'unused' : 'disabled';
    db.run(`UPDATE codes SET status = ? WHERE id = ?`, [newStatus, id], (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      
      // If disabling, also invalidate any active sessions for this code
      if (newStatus === 'disabled') {
        db.run(`DELETE FROM user_sessions WHERE code_id = ?`, [id]);
      }
      res.json({ success: true, newStatus });
    });
  });
});

app.delete('/api/admin/codes/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  
  // Delete sessions first (foreign key)
  db.run(`DELETE FROM user_sessions WHERE code_id = ?`, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete sessions' });
    
    db.run(`DELETE FROM codes WHERE id = ?`, [id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete code' });
      res.json({ success: true });
    });
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});
app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'faq.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Secure server running on http://localhost:${PORT}`);
});