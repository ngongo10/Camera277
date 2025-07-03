const form = document.querySelector('form');

const showError = (id, message) => {
  document.getElementById(id).textContent = message;
}

const clearErrors = () => {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();
  const confirm = document.getElementById('confirm').value.trim();
  const messageBox = document.getElementById('message');

  let valid = true;

  if (username.length < 2) {
    
    showError('username-error', 'Name must be at least 2 characters.');
    valid = false;
  }

  if (password.length < 6) {
    showError('password-error', 'Password must be at least 6 characters.');
    valid = false;
  }

  if (confirm !== password) {
    showError('confirm-error', 'Password is not matching.');
    valid = false;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError("email-error", "Enter a valid email address.");
    valid = false;
  }
  if (!valid) return;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.email === email);
  if (user) {
    messageBox.textContent = "User already exists.";
    messageBox.style.color = 'red';
    return;
  }



  if (valid) {
    users.push({
      username,
      email,
      password,
      cart: [],
      order: []
    });

    localStorage.setItem('users', JSON.stringify(users));
    simulateLoginFlow();

  }
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function simulateLoginFlow() {
    messageBox.textContent = "Logging in...";
    messageBox.style.color = "green";

    await wait(1000);
    messageBox.textContent = "Login successful!";
    messageBox.style.color = "green";

    await wait(1000);
    form.reset();
    window.location.href = 'login.html';
  }
})