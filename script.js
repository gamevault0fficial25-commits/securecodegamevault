const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_KEY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

(function() {
  const STORAGE_KEYS = {
    ACCESS_GRANTED: 'gamevault_access_granted',
    GRANTED_CODE: 'gamevault_used_code',
    DEVICE_ID: 'gamevault_device_id'
  };
  const CODES_DB_KEY = 'gamevault_codes_db';

  // Device fingerprint
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

  function getCodesDB() {
    const raw = localStorage.getItem(CODES_DB_KEY);
    if (!raw) {
      const defaultCodes = [{
        id: 'init1',
        code: 'GVX-8F2K-9QPL',
        status: 'unused',
        usedByDevice: null,
        usedAt: null,
        createdAt: Date.now(),
        expiresAt: null
      }];
      localStorage.setItem(CODES_DB_KEY, JSON.stringify(defaultCodes));
      return defaultCodes;
    }
    return JSON.parse(raw);
  }

  function saveCodesDB(codes) {
    localStorage.setItem(CODES_DB_KEY, JSON.stringify(codes));
    // Trigger storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', { key: CODES_DB_KEY, newValue: JSON.stringify(codes) }));
  }

  // Check if code is valid for initial activation (unused, not disabled, not expired, not deleted)
  function isCodeValidForActivation(codeToCheck) {
    const codes = getCodesDB();
    const found = codes.find(c => c.code === codeToCheck);
    if (!found) return false;
    if (found.status === 'used') return false;
    if (found.status === 'disabled') return false;
    if (found.status === 'expired') return false;
    if (found.status === 'deleted') return false;
    if (found.expiresAt && Date.now() > found.expiresAt) {
      // Auto-update expired status
      found.status = 'expired';
      saveCodesDB(codes);
      return false;
    }
    return true;
  }

  // Mark code as used (for first-time activation)
  function consumeCode(code, deviceId) {
    const codes = getCodesDB();
    const index = codes.findIndex(c => c.code === code);
    if (index === -1) return false;
    const codeObj = codes[index];
    if (codeObj.status !== 'unused') return false;
    if (codeObj.expiresAt && Date.now() > codeObj.expiresAt) {
      codeObj.status = 'expired';
      saveCodesDB(codes);
      return false;
    }
    codeObj.status = 'used';
    codeObj.usedByDevice = deviceId;
    codeObj.usedAt = Date.now();
    saveCodesDB(codes);
    return true;
  }

  // Validate current session (on each page load)
  function isSessionValid() {
    const granted = localStorage.getItem(STORAGE_KEYS.ACCESS_GRANTED);
    if (granted !== 'true') return false;
    const usedCode = localStorage.getItem(STORAGE_KEYS.GRANTED_CODE);
    if (!usedCode) return false;
    const deviceId = getDeviceId();
    const codes = getCodesDB();
    const codeEntry = codes.find(c => c.code === usedCode);
    if (!codeEntry) return false;
    // Check status: only 'used' is valid for session
    if (codeEntry.status !== 'used') return false;
    if (codeEntry.usedByDevice !== deviceId) return false;
    if (codeEntry.expiresAt && Date.now() > codeEntry.expiresAt) {
      codeEntry.status = 'expired';
      saveCodesDB(codes);
      return false;
    }
    return true;
  }

  function revokeAccess() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_GRANTED);
    localStorage.removeItem(STORAGE_KEYS.GRANTED_CODE);
    showAccessModal();
  }

  function grantAccess(code) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_GRANTED, 'true');
    localStorage.setItem(STORAGE_KEYS.GRANTED_CODE, code);
    hideModalAndShowContent();
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

  function attemptVerification() {
    const inputField = document.getElementById('accessCodeInput');
    const errorDiv = document.getElementById('accessError');
    const enteredCode = inputField.value.trim().toUpperCase();
    if (!enteredCode) {
      errorDiv.innerText = 'Please enter an access code.';
      return;
    }
    if (!isCodeValidForActivation(enteredCode)) {
      errorDiv.innerText = 'Invalid, disabled, expired, or already used code.';
      return;
    }
    const deviceId = getDeviceId();
    const consumed = consumeCode(enteredCode, deviceId);
    if (!consumed) {
      errorDiv.innerText = 'Code activation failed.';
      return;
    }
    grantAccess(enteredCode);
    errorDiv.innerText = '';
  }

  // Periodic integrity check (every 2 seconds)
  function startIntegrityCheck() {
    setInterval(() => {
      if (modalOverlay && modalOverlay.style.display !== 'flex') {
        if (!isSessionValid()) {
          revokeAccess();
        }
      }
    }, 2000);
  }

  function initAccessSystem() {
    getCodesDB(); // ensure DB exists
    if (isSessionValid()) {
      hideModalAndShowContent();
    } else {
      if (localStorage.getItem(STORAGE_KEYS.ACCESS_GRANTED) === 'true') {
        revokeAccess();
      } else {
        showAccessModal();
      }
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
