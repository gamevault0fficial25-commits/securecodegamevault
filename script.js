// script.js - Supabase integration for central code management
const SUPABASE_URL = "https://ytqzsgnlkevcsnoqilvv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXpzZ25sa2V2Y3Nub3FpbHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTk5MjMsImV4cCI6MjA5NTYzNTkyM30.sV9QfiMjaWcAU0PYy8D-S75LwOT28o1k0qqwhNl_Uio";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

(function() {
  const STORAGE_KEYS = {
    ACCESS_GRANTED: 'gamevault_access_granted',
    GRANTED_CODE: 'gamevault_used_code',
    DEVICE_ID: 'gamevault_device_id'
  };

  // Device fingerprint (unique per browser)
  function getDeviceId() {
    let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!deviceId) {
      const fingerprint = navigator.userAgent + navigator.language + screen.width + screen.height + new Date().getTimezoneOffset();
      let hash = 0;
      for (let i = 0; i < fingerprint.length; i++) {
        hash = ((hash << 5) - hash) + fingerprint.charCodeAt(i);
        hash |= 0;
      }
      deviceId = 'DEV_' + Math.abs(hash).toString(36) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }
    return deviceId;
  }

  // ---------- SUPABASE HELPERS ----------
  async function fetchCodeFromSupabase(code) {
    const { data, error } = await supabase
      .from('access_codes')
      .select('*')
      .eq('code', code)
      .single();
    if (error || !data) return null;
    return data;
  }

  async function markCodeAsUsedInSupabase(code, deviceId) {
    const { error } = await supabase
      .from('access_codes')
      .update({ 
        status: 'used', 
        used_by_device: deviceId, 
        used_at: new Date().toISOString() 
      })
      .eq('code', code)
      .eq('status', 'unused'); // extra safety: only if still unused
    return !error;
  }

  // Validate current session (called on load + every 2 seconds)
  async function isSessionValid() {
    const granted = localStorage.getItem(STORAGE_KEYS.ACCESS_GRANTED);
    if (granted !== 'true') return false;
    const usedCode = localStorage.getItem(STORAGE_KEYS.GRANTED_CODE);
    if (!usedCode) return false;
    const deviceId = getDeviceId();
    const codeData = await fetchCodeFromSupabase(usedCode);
    if (!codeData) return false;
    // Status must be 'used', device must match, not expired
    if (codeData.status !== 'used') return false;
    if (codeData.used_by_device !== deviceId) return false;
    if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
      // Auto-mark as expired in DB
      await supabase.from('access_codes').update({ status: 'expired' }).eq('code', usedCode);
      return false;
    }
    return true;
  }

  async function isCodeValidForActivation(code) {
    const codeData = await fetchCodeFromSupabase(code);
    if (!codeData) return false;
    if (codeData.status !== 'unused') return false;
    if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) return false;
    return true;
  }

  async function attemptVerification() {
    const inputField = document.getElementById('accessCodeInput');
    const errorDiv = document.getElementById('accessError');
    const enteredCode = inputField.value.trim().toUpperCase();
    if (!enteredCode) {
      errorDiv.innerText = 'Please enter an access code.';
      return;
    }
    const isValid = await isCodeValidForActivation(enteredCode);
    if (!isValid) {
      errorDiv.innerText = 'Invalid, disabled, expired, or already used code.';
      return;
    }
    const deviceId = getDeviceId();
    const success = await markCodeAsUsedInSupabase(enteredCode, deviceId);
    if (!success) {
      errorDiv.innerText = 'Code activation failed (maybe already used).';
      return;
    }
    grantAccess(enteredCode);
    errorDiv.innerText = '';
  }

  function grantAccess(code) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_GRANTED, 'true');
    localStorage.setItem(STORAGE_KEYS.GRANTED_CODE, code);
    hideModalAndShowContent();
  }

  function revokeAccess() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_GRANTED);
    localStorage.removeItem(STORAGE_KEYS.GRANTED_CODE);
    showAccessModal();
  }

  const modalOverlay = document.getElementById('accessModal');
  const protectedContent = document.getElementById('protected-content');
  
  function showAccessModal() {
    if (modalOverlay) modalOverlay.style.display = 'flex';
    if (protectedContent) protectedContent.style.opacity = '0.6';
    document.body.style.overflow = 'hidden';
  }
  
  function hideModalAndShowContent() {
    if (modalOverlay) modalOverlay.style.display = 'none';
    if (protectedContent) protectedContent.style.opacity = '1';
    document.body.style.overflow = 'auto';
  }

  // Periodic integrity check (every 2 seconds) – ensures admin changes revoke access instantly
  let integrityInterval;
  function startIntegrityCheck() {
    if (integrityInterval) clearInterval(integrityInterval);
    integrityInterval = setInterval(async () => {
      if (modalOverlay && modalOverlay.style.display !== 'flex') {
        const valid = await isSessionValid();
        if (!valid) revokeAccess();
      }
    }, 2000);
  }

  async function initAccessSystem() {
    if (await isSessionValid()) {
      hideModalAndShowContent();
    } else {
      revokeAccess(); // clears invalid sessions and shows modal
    }
    const verifyBtn = document.getElementById('verifyAccessBtn');
    if (verifyBtn) verifyBtn.addEventListener('click', attemptVerification);
    const codeInput = document.getElementById('accessCodeInput');
    if (codeInput) {
      codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptVerification();
      });
    }
    startIntegrityCheck();
  }

  // Search functionality (original)
  function bindSearch() {
    const searchField = document.getElementById('search');
    if (!searchField) return;
    const handler = () => {
      const filter = searchField.value.toLowerCase();
      document.querySelectorAll('.game-card').forEach(card => {
        const titleElem = card.querySelector('h3');
        if (titleElem) {
          const title = titleElem.innerText.toLowerCase();
          card.style.display = title.includes(filter) ? '' : 'none';
        }
      });
    };
    searchField.addEventListener('keyup', handler);
    const observer = new MutationObserver(() => handler());
    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) observer.observe(gamesGrid, { childList: true, subtree: true });
  }

  // Security: disable right-click and devtools shortcuts
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')) {
      e.preventDefault();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAccessSystem();
      bindSearch();
    });
  } else {
    initAccessSystem();
    bindSearch();
  }
})();
