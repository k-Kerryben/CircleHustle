document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".signup-form");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("exampleInputEmail1");
  const password = document.getElementById("exampleInputPassword");
  const confirmPassword = document.getElementById("exampleInputPassword1");
  const errors = document.getElementsByClassName("error")[0];
  const paymentForm = document.querySelector(".payment-form");
  const termsCheckBox = document.getElementById("exampleCheck1");
  const loginForm = document.querySelector(".login-form")

  // Handle signup form submission
  if (signupForm) {
    
    signupForm.addEventListener("submit", (e) => {
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
      if (!termsCheckBox.checked) {
        error.push("You must agree to the terms and conditions");
      }
      if (error.length > 0) {
        errors.innerHTML = error.join("<br>");
      } else {
        alert("Form submitted successfully");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => { 
      e.preventDefault();
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();
      let error = []
      
      if (!emailValue) { 
        error.push("Enter email")
      }
      if (!passwordValue) { 
        error.push("Enter valid password")
      }
      window.location.href = "/dashboard.html";
    })
  }

  // Handle payment form submission
  if (paymentForm) { 

    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneNumber = document.getElementById("phone-number").value.trim();
      let error = [];
      
      if (!phoneNumber) {
        error.push("Phone number is required.");
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        error.push("Enter a valid 10-digit phone number.");
      }
      
      if (error.length > 0) {
        errors.innerHTML = error.join("<br>");
      } else {
        window.location.href = "/dashboard";
        console.log("Form submitted successfully");
      }
    });
  }
});
