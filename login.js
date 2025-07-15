document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let uname = "Admin";
    let psword = "admin123"

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error
    errorMessage.style.display = 'none';

    // Check credentials (sample credentials)
    if (username === uname && password === psword) {
        // Store login state in session storage
        sessionStorage.setItem('isAuthenticated', 'true');

        // Redirect to quiz page
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
});


// Check if user is already logged in when loading login page
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isAuthenticated')) {
        window.location.href = 'index.html';
    }
});