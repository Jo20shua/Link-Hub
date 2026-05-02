document.addEventListener("DOMContentLoaded", () => {
// Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle button click
function handleContinue(e) {
  e.preventDefault(); // stop form from refreshing

  const email = document.getElementById("username").value;

  if (!isValidEmail(email)) {
    alert("Enter a valid email");
    return;
  }

  // save data
  sessionStorage.setItem("userEmail", email);
  sessionStorage.setItem("fromPage", "login");

  // go to OTP
  window.location.href = "otp.html?from=login";
}

// Enable/disable button based on input
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

// Attach click event
continueBtn.addEventListener("click", handleContinue);
});