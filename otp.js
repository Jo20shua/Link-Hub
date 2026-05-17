const inputs = document.querySelectorAll(".code-inputs input");
const button = document.querySelector(".submit-btn");

// 👉 change this to whatever code you want to validate against
const CORRECT_CODE = "123456";

// Handle typing
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");

    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    checkAndSubmit();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });

  // Paste support
  input.addEventListener("paste", (e) => {
    e.preventDefault();

    const pasteData = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, inputs.length);

    pasteData.split("").forEach((char, i) => {
      if (inputs[i]) inputs[i].value = char;
    });

    checkAndSubmit();
  });
});

// Check + auto-submit
function checkAndSubmit() {
  const code = [...inputs].map(i => i.value).join("");
  const allFilled = code.length === inputs.length;

  if (!allFilled) return;

  if (code === CORRECT_CODE) {
    // ✅ Auto verify and redirect immediately (no button needed)
    window.location.href = "dashboard.html";
  } else {
    triggerError();
  }
}

// Error animation
function triggerError() {
  const container = document.querySelector(".code-inputs");

  container.classList.add("shake");

  inputs.forEach(input => input.value = "");
  inputs[0].focus();

  setTimeout(() => {
    container.classList.remove("shake");
  }, 400);
}

// Get stored email
const email = sessionStorage.getItem("username");

// Insert email into page
if (email) {
  document.getElementById("username").textContent = email;
}

// Handle back navigation (clean version)
const back = document.getElementById("back-btn");

back.addEventListener("click", (e) => {
  e.preventDefault();

  const fromPage = sessionStorage.getItem("fromPage");

  if (fromPage === "login") {
    window.location.href = "login.html";
  } else {
    window.location.href = "sign_up.html";
  }
});