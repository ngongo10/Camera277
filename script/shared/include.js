import { calculateCartQuantity, initHeaderEvents } from "./cart.js";

document.addEventListener('DOMContentLoaded', () => {
  // HEADER
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      initHeaderEvents();
      calculateCartQuantity();

       document.querySelector('.js-search-icon')
        .addEventListener('click', () => {
          document.querySelector('.js-search-products').style.display = 'block';
        })

      document.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.middle-header');
        const isSmallScreen = window.innerWidth <= 768;
        if (isSmallScreen) {
          if (!wrapper.contains(e.target)) {
            document.querySelector('.js-search-products').style.display = 'none';

          }
        }
      });
      document.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.right-header');
        const isSmallScreen = window.innerWidth <= 768;
        if (isSmallScreen) {
          if (!wrapper.contains(e.target)) {
            document.querySelector('.js-expand-bar')?.classList.remove('show');

          }
        }
      });


      document.querySelector('.js-dropdown')?.addEventListener('click', () => {
        document.querySelector('.js-expand-bar')?.classList.toggle('show');
      });

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        document.querySelector('.show-name').innerHTML = currentUser.username;
        document.querySelector('.show-name-dropdown').innerHTML = currentUser.username;
      }

      const toggleVisibility = (selector, show) => {
        const el = document.querySelector(selector);
        if (el) el.style.display = show ? 'inline-block' : 'none';
      };

      toggleVisibility('.js-login-link', !currentUser);
      toggleVisibility('.js-signup-link', !currentUser);
      toggleVisibility('.js-logout-link', !!currentUser);
      toggleVisibility('.js-profile-link', !!currentUser);
      toggleVisibility('.js-admin-login', !currentUser);

      toggleVisibility('.js-login-link2', !currentUser);
      toggleVisibility('.js-signup-link2', !currentUser);
      toggleVisibility('.js-logout-link2', !!currentUser);
      toggleVisibility('.js-admin-login2', !currentUser);

      document.querySelector('.js-admin-login')
        .addEventListener('click', () => {

          if (!localStorage.getItem('admin')) {
            localStorage.setItem('admin', JSON.stringify({
              email: 'admin123@gmail.com',
              password: 'admin@123'
            }));
          }
          const admin = JSON.parse(localStorage.getItem('admin'));
          console.log(admin);
          window.location.href = ('admin.html');
        });
      document.querySelector('.js-admin-login2')
        .addEventListener('click', () => {

          if (!localStorage.getItem('admin')) {
            localStorage.setItem('admin', JSON.stringify({
              email: 'admin123@gmail.com',
              password: 'admin@123'
            }));
          }
          const admin = JSON.parse(localStorage.getItem('admin'));
          console.log(admin);
          window.location.href = ('admin.html');
        });
      document.querySelector('.js-logout-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
      });

      document.querySelector('.js-logout-link2')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
      });
    });

  // FOOTER
  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });

  // THEME TOGGLE
  const savedTheme = sessionStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('toggle-it');
  }

  setTimeout(() => {
    document.querySelector('.js-toggle-color')?.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('toggle-it');
      sessionStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }, 100);
});
