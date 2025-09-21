// Get form and inputs
const form = document.getElementById("registrationForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const terms = document.getElementById("terms");

// Utility function to show error
function showError(input, message) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  input.nextElementSibling.textContent = message;
}

// Utility function to show success
function showSuccess(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

// Name Validation
function validateName() {
  if (fullname.value.trim().length < 5) {
    showError(fullname, "Name must be at least 5 characters.");
    return false;
  }
  showSuccess(fullname);
  return true;
}

// Email Validation (regex)
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showError(email, "Enter a valid email (e.g., user@example.com).");
    return false;
  }
  showSuccess(email);
  return true;
}

// Phone Validation
function validatePhone() {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.value) || phone.value === "1234567890") {
    showError(phone, "Phone number must be 10 digits and not 1234567890.");
    return false;
  }
  showSuccess(phone);
  return true;
}

// Password Validation (strong password check)
function validatePassword() {
  const pass = password.value;
  const name = fullname.value.toLowerCase();
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (
    pass.length < 8 ||
    pass.toLowerCase() === "password" ||
    pass.toLowerCase() === name ||
    !strongRegex.test(pass)
  ) {
    showError(password, "Password must be strong (8+ chars, upper, lower, number, special).");
    return false;
  }
  showSuccess(password);
  return true;
}

// Confirm Password Validation
function validateConfirmPassword() {
  if (password.value !== confirmPassword.value || confirmPassword.value === "") {
    showError(confirmPassword, "Passwords do not match.");
    return false;
  }
  showSuccess(confirmPassword);
  return true;
}

// Age Validation
function validateAge() {
  if (age.value === "" || parseInt(age.value) < 18) {
    showError(age, "You must be 18 years or older.");
    return false;
  }
  showSuccess(age);
  return true;
}

// Gender Validation
function validateGender() {
  if (gender.value === "") {
    showError(gender, "Please select your gender.");
    return false;
  }
  showSuccess(gender);
  return true;
}

// Terms Validation
function validateTerms() {
  if (!terms.checked) {
    terms.classList.add("is-invalid");
    return false;
  }
  terms.classList.remove("is-invalid");
  return true;
}

// Validate All
function validateForm() {
  let valid = true;
  if (!validateName()) valid = false;
  if (!validateEmail()) valid = false;
  if (!validatePhone()) valid = false;
  if (!validatePassword()) valid = false;
  if (!validateConfirmPassword()) valid = false;
  if (!validateAge()) valid = false;
  if (!validateGender()) valid = false;
  if (!validateTerms()) valid = false;
  return valid;
}

// Submit Event
form.addEventListener("submit", function (e) {
  e.preventDefault(); 
  if (validateForm()) {
    // Save name in localStorage for success page
    localStorage.setItem("registeredName", fullname.value.trim());
    // Redirect
    window.location.href = "success.html";
  }
});

// Live validation
fullname.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
phone.addEventListener("input", validatePhone);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);
age.addEventListener("input", validateAge);
gender.addEventListener("change", validateGender);
terms.addEventListener("change", validateTerms);
