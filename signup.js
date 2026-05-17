document.addEventListener("DOMContentLoaded", () => {
function goToOTP(email, source) {
  // save email + where user came from
  sessionStorage.setItem("userEmail", email);
  sessionStorage.setItem("fromPage", source); // "login" or "signup"

  function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleContinue() {
  const email = document.getElementById("username").value;

  if (!isValidEmail(email)) {
    alert("Enter a valid email");
    return;
  }

 window.location.href = "otp.html?from=sign_up";
}

   // OTP Page Logic
const username = document.getElementById("username");
const continueBtn = document.getElementById("continueBtn");

username.addEventListener("input", () => {
  if (username.value.trim() !== "") {
    continueBtn.disabled = false;
    continueBtn.classList.add("active");
  } else {
    continueBtn.disabled = true;
    continueBtn.classList.remove("active");
  }
});

}

  const username = document.getElementById("username");
  const continueBtn = document.getElementById("continueBtn");
  const errorMsg = document.getElementById("errorMsg");

  username.addEventListener("input", () => {
    if (username.value.trim() !== "") {
      continueBtn.disabled = false;
      continueBtn.classList.add("active");
    } else {
      continueBtn.disabled = true;
      continueBtn.classList.remove("active");
    }
  });

  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!username.validity.valid) {
      errorMsg.textContent = "Please enter a valid email";
      username.classList.add("input-error");
      return;
    }

    // Save email (mock database)
    localStorage.setItem("userEmail", username.value);

    // Move to next page
    window.location.href = "otp.html?from=sign_up";
  });

  username.addEventListener("input", () => {
  username.classList.remove("input-error");
  errorMsg.textContent = "";
});
});