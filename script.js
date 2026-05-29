// script.js - Server-side validation version (secure, no localStorage codes)
(function() {
  let modalOverlay = null;
  let protectedContent = null;
  let authCheckInterval = null;
  
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
  
  async function checkAuthStatus() {
    try {
      const response = await fetch('/api/check-auth', { credentials: 'include' });
      const data = await response.json();
      if (data.authenticated) {
        if (modalOverlay && modalOverlay.style.display === 'flex') {
          hideModalAndShowContent();
        }
        return true;
      } else {
        if (protectedContent && modalOverlay && modalOverlay.style.display !== 'flex') {
          showAccessModal();
        }
        return false;
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      return false;
    }
  }
  
  async function attemptVerification() {
    const inputField = document.getElementById('accessCodeInput');
    const errorDiv = document.getElementById('accessError');
    const enteredCode = inputField.value.trim().toUpperCase();
    
    if (!enteredCode) {
      errorDiv.innerText = 'Please enter an access code.';
      return;
    }
    
    errorDiv.innerText = 'Verifying...';
    
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: enteredCode })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        errorDiv.innerText = '';
        inputField.value = '';
        await checkAuthStatus();
      } else {
        errorDiv.innerText = data.error || 'Invalid or already used code.';
      }
    } catch (err) {
      errorDiv.innerText = 'Network error. Please try again.';
    }
  }
  
  async function initAccessSystem() {
    modalOverlay = document.getElementById('accessModal');
    protectedContent = document.getElementById('protected-content');
    
    if (!modalOverlay || !protectedContent) return;
    
    await checkAuthStatus();
    
    const verifyBtn = document.getElementById('verifyAccessBtn');
    if (verifyBtn) verifyBtn.addEventListener('click', attemptVerification);
    
    const codeInput = document.getElementById('accessCodeInput');
    if (codeInput) {
      codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptVerification();
      });
    }
    
    // Check auth every 5 seconds
    if (authCheckInterval) clearInterval(authCheckInterval);
    authCheckInterval = setInterval(checkAuthStatus, 5000);
  }
  
  // Search functionality (original, unchanged)
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