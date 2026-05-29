```javascript
// =========================
// SUPABASE CONFIG
// =========================

const SUPABASE_URL =
  "https://ytqzsgnlkevcsnoqilvv.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXpzZ25sa2V2Y3Nub3FpbHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNTk5MjMsImV4cCI6MjA5NTYzNTkyM30.sV9QfiMjaWcAU0PYy8D-S75LwOT28o1k0qqwhNl_Uio";

const supabase =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

console.log("Supabase Connected");

// =========================
// ACCESS SYSTEM
// =========================

(function () {

  const STORAGE_KEYS = {
    ACCESS_GRANTED: "gamevault_access_granted",
    GRANTED_CODE: "gamevault_used_code",
    DEVICE_ID: "gamevault_device_id"
  };

  const modalOverlay =
    document.getElementById("accessModal");

  const protectedContent =
    document.getElementById("protected-content");

  // =========================
  // DEVICE ID
  // =========================

  function getDeviceId() {

    let deviceId =
      localStorage.getItem(
        STORAGE_KEYS.DEVICE_ID
      );

    if (!deviceId) {

      const raw =
        navigator.userAgent +
        navigator.language +
        screen.width +
        screen.height;

      let hash = 0;

      for (let i = 0; i < raw.length; i++) {
        hash =
          ((hash << 5) - hash) +
          raw.charCodeAt(i);

        hash |= 0;
      }

      deviceId =
        "DEV_" +
        Math.abs(hash).toString(36);

      localStorage.setItem(
        STORAGE_KEYS.DEVICE_ID,
        deviceId
      );
    }

    return deviceId;
  }

  // =========================
  // UI
  // =========================

  function showAccessModal() {

    if (modalOverlay) {
      modalOverlay.style.display = "flex";
    }

    if (protectedContent) {
      protectedContent.style.visibility =
        "hidden";
    }

    document.body.style.overflow =
      "hidden";
  }

  function hideModalAndShowContent() {

    if (modalOverlay) {
      modalOverlay.style.display = "none";
    }

    if (protectedContent) {
      protectedContent.style.visibility =
        "visible";
    }

    document.body.style.overflow =
      "auto";
  }

  // =========================
  // FETCH CODE
  // =========================

  async function fetchCode(code) {

    const { data, error } =
      await supabase
        .from("access_codes")
        .select("*")
        .eq("code", code)
        .single();

    if (error || !data) {
      console.log(error);
      return null;
    }

    return data;
  }

  // =========================
  // VALIDATE SESSION
  // =========================

  async function isSessionValid() {

    const granted =
      localStorage.getItem(
        STORAGE_KEYS.ACCESS_GRANTED
      );

    const savedCode =
      localStorage.getItem(
        STORAGE_KEYS.GRANTED_CODE
      );

    if (granted !== "true") {
      return false;
    }

    if (!savedCode) {
      return false;
    }

    const deviceId =
      getDeviceId();

    const codeData =
      await fetchCode(savedCode);

    if (!codeData) {
      return false;
    }

    // disabled
    if (codeData.active === false) {
      return false;
    }

    // deleted
    if (codeData.deleted === true) {
      return false;
    }

    // wrong device
    if (
      codeData.used_by_device !== deviceId
    ) {
      return false;
    }

    return true;
  }

  // =========================
  // VERIFY ACCESS CODE
  // =========================

  async function attemptVerification() {

    const input =
      document.getElementById(
        "accessCodeInput"
      );

    const errorDiv =
      document.getElementById(
        "accessError"
      );

    const enteredCode =
      input.value
        .trim()
        .toUpperCase();

    if (!enteredCode) {

      errorDiv.innerText =
        "Please enter a code.";

      return;
    }

    const codeData =
      await fetchCode(
        enteredCode
      );

    // invalid
    if (!codeData) {

      errorDiv.innerText =
        "Invalid access code.";

      return;
    }

    // disabled
    if (
      codeData.active === false
    ) {

      errorDiv.innerText =
        "This code is disabled.";

      return;
    }

    // deleted
    if (
      codeData.deleted === true
    ) {

      errorDiv.innerText =
        "This code was removed.";

      return;
    }

    const deviceId =
      getDeviceId();

    // already used by another device
    if (
      codeData.status === "used" &&
      codeData.used_by_device !== deviceId
    ) {

      errorDiv.innerText =
        "Code already used.";

      return;
    }

    // activate code first time
    if (
      codeData.status === "unused"
    ) {

      const { error } =
        await supabase
          .from("access_codes")
          .update({
            status: "used",
            used_by_device: deviceId,
            used_at:
              new Date()
                .toISOString()
          })
          .eq(
            "code",
            enteredCode
          );

      if (error) {

        console.log(error);

        errorDiv.innerText =
          "Activation failed.";

        return;
      }
    }

    // save session
    localStorage.setItem(
      STORAGE_KEYS.ACCESS_GRANTED,
      "true"
    );

    localStorage.setItem(
      STORAGE_KEYS.GRANTED_CODE,
      enteredCode
    );

    errorDiv.innerText = "";

    hideModalAndShowContent();

    console.log(
      "Access Granted"
    );
  }

  // =========================
  // REVOKE ACCESS
  // =========================

  function revokeAccess() {

    localStorage.removeItem(
      STORAGE_KEYS.ACCESS_GRANTED
    );

    localStorage.removeItem(
      STORAGE_KEYS.GRANTED_CODE
    );

    showAccessModal();
  }

  // =========================
  // LIVE CHECK
  // =========================

  function startLiveCheck() {

    setInterval(async () => {

      if (
        modalOverlay.style.display ===
        "flex"
      ) {
        return;
      }

      const valid =
        await isSessionValid();

      if (!valid) {

        revokeAccess();

        console.log(
          "Access Revoked"
        );
      }

    }, 3000);
  }

  // =========================
  // INIT
  // =========================

  async function init() {

    console.log(
      "Initializing Access System"
    );

    const valid =
      await isSessionValid();

    if (valid) {

      hideModalAndShowContent();

    } else {

      revokeAccess();
    }

    document
      .getElementById(
        "verifyAccessBtn"
      )
      ?.addEventListener(
        "click",
        attemptVerification
      );

    document
      .getElementById(
        "accessCodeInput"
      )
      ?.addEventListener(
        "keypress",
        (e) => {

          if (
            e.key === "Enter"
          ) {
            attemptVerification();
          }
        }
      );

    startLiveCheck();
  }

  // =========================
  // BASIC SECURITY
  // =========================

  document.addEventListener(
    "contextmenu",
    (e) => e.preventDefault()
  );

  // =========================
  // START
  // =========================

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();
  }

})();
```
