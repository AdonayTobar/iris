const logo = document.querySelector('.logo2 img');
const textoLogo = document.querySelector('.logo2 h1');
const parrafoLogo = document.querySelector('.logo2 p');
const seccionAcercaDeNosotros = document.querySelector('.acerca-de-nosotros');
const clientes = document.querySelectorAll('.cliente');

// Animación de entrada para el logo
logo.animate([
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' }
], {
    duration: 1000,
    easing: 'ease-in-out',
    fill: 'forwards'
});

// Animación de resaltado para el texto del logo
textoLogo.animate([
    { color: '#122D3F' },
    { color: '#fd6baa' },
    { color: '#FD368B' }
], {
    duration: 2000,
    iterations: Infinity,
    direction: 'alternate',
    fill: 'forwards'
});



// Animación de entrada para la sección Acerca de Nosotros
seccionAcercaDeNosotros.animate([
    { opacity: 0, transform: 'translateY(50px)' },
    { opacity: 1, transform: 'translateY(0)' }
], {
    duration: 1200,
    easing: 'ease-in-out',
    delay: 500,
    fill: 'forwards'
});

document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
});
