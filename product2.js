document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const newSrc = this.src;
            mainImage.src = newSrc;
        });
    });
});


document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
});

const contactMenu = document.querySelector('.contact-menu');
const cuerpoP = document.querySelector(".content");
const googleForm = document.getElementById("contactId");


