const passwordField = document.getElementById('exampleInputPassword1');
    const togglePasswordIcon = document.getElementById('togglePassword');

    togglePasswordIcon.addEventListener('click', function() {
        // Toggle the type attribute
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;

        // Toggle the icon
        this.textContent = type === 'password' ? '👁️' : '🙈'; // Optional: Change the icon based on visibility
    });