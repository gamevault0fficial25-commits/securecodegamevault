// script.js - Enhanced Security + Supabase Access Control
const SUPABASE_URL = "https://ytqzsgnlkevcsnoqilvv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXpzZ25sa2V2Y3Nub3FpbHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTk5MjMsImV4cCI6MjA5NTYzNTkyM30.sV9QfiMjaWcAU0PYy8D-S75LwOT28o1k0qqwhNl_Uio";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

(function() {
  // -------------------- HARDENED SECURITY --------------------
  // 1. Disable right-click, text selection, and copying
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
  document.addEventListener('selectstart', (e) => e.preventDefault());
  document.addEventListener('copy', (e) => e.preventDefault());
  document.addEventListener('cut', (e) => e.preventDefault());

  // 2. Block all DevTools / inspector shortcuts
  function blockDevTools(e) {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S, Ctrl+Shift+K
    if (e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'K')) ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        (e.metaKey && e.altKey && e.key === 'I')  // Mac: Cmd+Option+I
    ) {
      e.preventDefault();
      return false;
    }
  }
  document.addEventListener('keydown', blockDevTools);

  // 3. Detect DevTools opening via window size difference (heuristic)
  let devToolsOpen = false;
  const detectDevTools = () => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const threshold = 160;
    const newState = (widthDiff > threshold || heightDiff > threshold);
    if (newState !== devToolsOpen) {
      devToolsOpen = newState;
      if (devToolsOpen) {
        // Option: revoke access or redirect
        console.clear();
        if (typeof revokeAccess === 'function') revokeAccess();
      }
    }
  };
  setInterval(detectDevTools, 1000);

  // 4. Anti-debugging loop (makes DevTools breakpoints annoying)
  function antiDebug() {
    function debug() {
      debugger; // this will pause execution if DevTools is open
      setTimeout(debug, 100);
    }
    debug();
  }
  antiDebug();

  // 5. Clear console periodically to hide error messages
  setInterval(() => {
    if (window.console && window.console.clear) console.clear();
  }, 500);

  // 6. Disable right-click on modal input (also prevent paste in code field)
  const accessInput = document.getElementById('accessCodeInput');
  if (accessInput) {
    accessInput.addEventListener('contextmenu', (e) => e.preventDefault());
    accessInput.addEventListener('paste', (e) => e.preventDefault()); // optional
  }

  // -------------------- ACCESS SYSTEM (Supabase) --------------------
  const STORAGE_KEYS = {
    ACCESS_GRANTED: 'gamevault_access_granted',
    GRANTED_CODE: 'gamevault_used_code',
    DEVICE_ID: 'gamevault_device_id'
  };

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
      .eq('status', 'unused');
    return !error;
  }

  async function isSessionValid() {
    const granted = localStorage.getItem(STORAGE_KEYS.ACCESS_GRANTED);
    if (granted !== 'true') return false;
    const usedCode = localStorage.getItem(STORAGE_KEYS.GRANTED_CODE);
    if (!usedCode) return false;
    const deviceId = getDeviceId();
    const codeData = await fetchCodeFromSupabase(usedCode);
    if (!codeData) return false;
    if (codeData.status !== 'used') return false;
    if (codeData.used_by_device !== deviceId) return false;
    if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
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
      revokeAccess();
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
