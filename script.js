```javascript id="x7r2sa"
// =========================
// TEST SCRIPT
// =========================

console.log("SCRIPT RUNNING");

// SHOW POPUP
window.onload = function () {

  console.log("WINDOW LOADED");

  const modal =
    document.getElementById("accessModal");

  const content =
    document.getElementById("protected-content");

  console.log(modal);
  console.log(content);

  if (modal) {
    modal.style.display = "flex";
  }

  if (content) {
    content.style.visibility = "hidden";
  }
};
```
