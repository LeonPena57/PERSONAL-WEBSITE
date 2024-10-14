document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Form submitted!');
        });
    }

    const carouselSlide = document.getElementById('carousel');
    if (!carouselSlide) {
        console.error('Carousel element not found');
        return;
    }

    const items = Array.from(carouselSlide.children);
    let currentItemIndex = Math.floor(items.length / 2); // Start with the middle item as active

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.add('unfocused');
            item.classList.remove('active');
            if (index === currentItemIndex) {
                item.classList.remove('unfocused');
                item.classList.add('active');
            }
        });

        const itemWidth = items[0].offsetWidth + 25; // Includes the margin
        const offset = (carouselSlide.parentElement.offsetWidth / 2) - (itemWidth / 2);
        carouselSlide.style.transform = `translateX(-${currentItemIndex * itemWidth - offset}px)`;
    }

    function nextItem() {
        currentItemIndex = (currentItemIndex + 1) % items.length;
        carouselSlide.appendChild(carouselSlide.firstElementChild);
        updateCarousel();
    }

    function prevItem() {
        currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
        carouselSlide.insertBefore(carouselSlide.lastElementChild, carouselSlide.firstElementChild);
        updateCarousel();
    }

    window.nextItem = nextItem;
    window.prevItem = prevItem;

    updateCarousel();
});
