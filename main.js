document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el contenedor de las diapositivas del carrusel.
    const track = document.querySelector('.carousel-track');
    // Convierte los elementos hijos de 'track' en un array.
    const slides = Array.from(track.children);
    // Obtiene el ancho de una diapositiva.
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Variables para manejar el arrastre y el estado del carrusel.
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    // Clona la primera y última diapositiva para crear el efecto de desplazamiento infinito.
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);
    track.appendChild(firstSlide);
    track.insertBefore(lastSlide, slides[0]);

    // Actualiza el array de diapositivas para incluir las diapositivas clonadas.
    const updatedSlides = Array.from(track.children);
    const totalSlides = updatedSlides.length;

    // Posiciona las diapositivas clonadas y originales en línea horizontal.
    updatedSlides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });

    // Función para establecer la posición del carrusel basada en el índice actual.
    const setPositionByIndex = () => {
        track.style.transition = 'transform 0.5s ease-in-out';
        currentTranslate = -currentIndex * slideWidth;
        prevTranslate = currentTranslate;
        setSlidePosition(currentTranslate);
        updateSlideClasses();
    };

    // Establece la posición del carrusel en el eje X.
    const setSlidePosition = (translate) => {
        track.style.transform = `translateX(${translate}px)`;
    };

    // Actualiza las clases de las diapositivas para reflejar la diapositiva actual.
 // Actualiza las clases de las diapositivas para reflejar la diapositiva actual.
const updateSlideClasses = () => {
    updatedSlides.forEach((slide, index) => {
        slide.classList.remove('current-slide');
        if (index === currentIndex) {
            slide.classList.add('current-slide');
        }
    });
};


    // Obtiene la posición X del evento (mouse o touch).
    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    };

    // Animación para el arrastre.
    const animation = () => {
        setSlidePosition(currentTranslate);
        if (isDragging) requestAnimationFrame(animation);
    };

    // Inicia el arrastre.
    const touchStart = (event) => {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        track.classList.add('grabbing');
        clearInterval(autoSlideInterval); // Detiene el desplazamiento automático en la interacción manual
    };

    // Mueve la diapositiva durante el arrastre.
    const touchMove = (event) => {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    };

    // Termina el arrastre.
    const touchEnd = () => {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) currentIndex += 1;
        if (movedBy > 100) currentIndex -= 1;

        // Manejo del ciclo infinito
        if (currentIndex >= totalSlides - 1) {
            currentIndex = 0;
            prevTranslate = -slideWidth * (totalSlides - 2);
        }

        if (currentIndex < 0) {
            currentIndex = totalSlides - 2;
            prevTranslate = -slideWidth;
        }

        setPositionByIndex();
        track.classList.remove('grabbing');

        // Reinicia el desplazamiento automático
        startAutoSlide();
    };

    // Añade los event listeners para el arrastre.
    track.addEventListener('mousedown', touchStart);
    track.addEventListener('touchstart', touchStart);

    track.addEventListener('mousemove', touchMove);
    track.addEventListener('touchmove', touchMove);

    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);
    track.addEventListener('touchend', touchEnd);

    // Mueve a la siguiente diapositiva, manejando el ciclo infinito.
    const moveToNextSlide = () => {
        currentIndex++;
        if (currentIndex >= totalSlides - 1) {
            track.style.transition = 'none';
            currentIndex = 0;
            setPositionByIndex();
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                currentIndex = 1;
                setPositionByIndex();
            }, 30);
        } else {
            setPositionByIndex();
        }
        updateSlideClasses();
    };

    // Inicia el desplazamiento automático.
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(moveToNextSlide, 3000); // Cambia la diapositiva cada 3 segundos
    };

    // Inicializa el carrusel
    let autoSlideInterval;
    currentIndex = 1; // Empieza desde la diapositiva real inicial
    setPositionByIndex();
    updateSlideClasses();
    startAutoSlide();
});



