const showError = (id, message) => {
  const el = document.getElementById(id);
  el.textContent = message;
  el.style.color = 'red';
};

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const errorBox = document.getElementById('login-error');
  errorBox.textContent = '';

  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    showError('login-error', 'Email and password are required.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showError('login-error', 'Invalid email or password');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  errorBox.textContent = 'Login successful. Redirecting...';
  errorBox.style.color = 'green';

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
});
