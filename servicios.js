const servicios = document.querySelectorAll('.servicio');

servicios.forEach(servicio => {
  servicio.addEventListener('click', () => {
    const enlace = servicio.querySelector('a'); // Obtiene el enlace dentro del servicio
    if (enlace) {
      window.location.href = enlace.href; // Redirige a la página del enlace
    } else {
      // En caso de que no haya un enlace, puedes agregar código personalizado
      console.log('Este servicio aún no tiene una página asignada.');
    }
  });
});

document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
});