document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
});

const contactMenu = document.querySelector('.contact-menu');
const cuerpoP = document.querySelector(".content");
const googleForm = document.getElementById("contactId");



document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    let startX, isDown = false, currentTranslate = 0, prevTranslate = 0, animationID;

    const cloneFirstElement = () => {
        const firstElement = testimonials[0];
        const clone = firstElement.cloneNode(true);
        carousel.appendChild(clone);
    };

    cloneFirstElement();

    const moveCarousel = () => {
        currentIndex++;
        carousel.style.transition = `transform 0.5s ease-in-out`;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (currentIndex === testimonials.length) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                carousel.style.transform = 'translateX(0)';
                currentIndex = 0;
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                }, 20);
            }, 500);
        }
    };

    setInterval(moveCarousel, 5000);

    const touchStart = (index) => {
        return function(event) {
            startX = getPositionX(event);
            isDown = true;
            currentIndex = index;
            carousel.style.transition = 'none';
            animationID = requestAnimationFrame(animation);
        };
    };

    const touchMove = (event) => {
        if (!isDown) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startX;
    };

    const touchEnd = () => {
        isDown = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < testimonials.length - 1) {
            currentIndex++;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        setPositionByIndex();
    };

    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    };

    const animation = () => {
        setCarouselPosition();
        if (isDown) requestAnimationFrame(animation);
    };

    const setCarouselPosition = () => {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    };

    const setPositionByIndex = () => {
        currentTranslate = currentIndex * -window.innerWidth;
        prevTranslate = currentTranslate;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        setCarouselPosition();
    };

    testimonials.forEach((testimonial, index) => {
        const testimonialElement = testimonial;
        testimonialElement.addEventListener('touchstart', touchStart(index));
        testimonialElement.addEventListener('touchmove', touchMove);
        testimonialElement.addEventListener('touchend', touchEnd);
        testimonialElement.addEventListener('mousedown', touchStart(index));
        testimonialElement.addEventListener('mousemove', touchMove);
        testimonialElement.addEventListener('mouseup', touchEnd);
        testimonialElement.addEventListener('mouseleave', touchEnd);
    });
});




