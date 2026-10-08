const container = document.getElementById('container');
const toRegister = document.getElementById('to-register');
const toLogin = document.getElementById('to-login');

toRegister.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.add('active');
});

toLogin.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.remove('active');
});
