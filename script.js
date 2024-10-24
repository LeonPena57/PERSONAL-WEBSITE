function toggleMenu() {
    const navbar = document.querySelector('.navbar ul');
    navbar.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Form Submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Form submitted!');
        });
    }

    // Carousel Setup Function
    const setupCarousel = (carouselId) => {
        const carouselSlide = document.getElementById(carouselId);
        if (!carouselSlide) {
            console.error(`${carouselId} element not found`);
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

            const itemWidth = items[0].offsetWidth + 25; // Width including margin
            const offset = (carouselSlide.parentElement.offsetWidth / 2) - (itemWidth / 2); // Centering offset

            // Center the active item without any movement
            const translateX = (currentItemIndex * itemWidth) - offset; // Correcting translate calculation
            carouselSlide.style.transform = `translateX(-${translateX}px)`; // Adjust position
        }

        function nextItem() {
            // Move current item to the end of the list to simulate seamless transition
            carouselSlide.appendChild(carouselSlide.firstElementChild);
            currentItemIndex = (currentItemIndex + 1) % items.length; // Increment index
            updateCarousel(); // Update the carousel
        }

        function prevItem() {
            // Move current item to the start of the list to simulate seamless transition
            carouselSlide.insertBefore(carouselSlide.lastElementChild, carouselSlide.firstElementChild);
            currentItemIndex = (currentItemIndex - 1 + items.length) % items.length; // Decrement index
            updateCarousel(); // Update the carousel
        }

        // Set up event listeners for buttons
        document.querySelector(`.${carouselId}-arrow.right`).addEventListener('click', nextItem);
        document.querySelector(`.${carouselId}-arrow.left`).addEventListener('click', prevItem);

        updateCarousel(); // Initial update to set the correct position
    };

    // Initialize both carousels
    setupCarousel('carousel');
    setupCarousel('new-carousel');

    // Image Swap Function
    window.swapImages = (thumbnailId) => {
        let mainImage = document.getElementById('main-image');
        let thumbnail = document.getElementById(thumbnailId);

        // Swap the src of the main image and the clicked thumbnail
        let tempSrc = mainImage.src;
        mainImage.src = thumbnail.src;
        thumbnail.src = tempSrc;

        // Ensure the sizes and aspect ratios are maintained correctly
        mainImage.style.width = "500px";
        mainImage.style.height = "auto";
        mainImage.style.objectFit = "contain";

        thumbnail.style.maxWidth = "80px";
        thumbnail.style.maxHeight = "80px";
        thumbnail.style.objectFit = "contain";
    };
});
