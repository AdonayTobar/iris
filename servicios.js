const ser1 = document.querySelector('.lim-re');

ser1.addEventListener('click', function() {
  window.location.href = './product2.html'; // Replace with the desired URL
});
const ser2 = document.querySelector('.lim-pro');

ser2.addEventListener('click', function() {
  window.location.href = './produc1.html'; // Replace with the desired URL
});

document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
});