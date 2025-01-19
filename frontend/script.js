
const togglePasswordIcon = document.getElementById("togglePassword");
const form = document.getElementsByClassName("signup-form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("exampleInputEmail1");
const password = document.getElementById("exampleInputPassword");
const confirmPassword = document.getElementById("exampleInputPassword1");
const errors = document.getElementsByClassName("error")[0]
const paymentForm = document.getElementsByClassName("payment-form")
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  let error = [];
  if (!firstNameValue) {
    error.push("First name is required");
  }
  if (!lastNameValue) {
    error.push("Last name is required");
  }
  if (!emailValue) {
    error.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
    error.push("Invalid email");
  }
  if (passwordValue.length < 6) {
    error.push("Password must be at least 6 characters");
  }
  if (passwordValue !== confirmPasswordValue) {
    error.push("Passwords do not match");
    }
    if (error.length > 0) { 
        errors.innerHTML = error.join('<br>')

    } else {
        alert("Form submitted successfully")
    }
});

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById("phone-number").value.trim()
    window.location.href = '/dashboard'
    console.log("submited")
})








