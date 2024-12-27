
    // Carousel Setup Function for carousel (original)
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

    // Initialize carousel
    setupCarousel('carousel'); // Initialize original carousel

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


document.addEventListener('DOMContentLoaded', () => {
    // Carousel Setup Function for new-carousel (modified logic)
    const setupNewCarousel = (carouselId) => {
        const carouselSlide = document.getElementById(carouselId);
        if (!carouselSlide) {
            console.error(`${carouselId} element not found`);
            return;
        }

        const items = Array.from(carouselSlide.children);
        const initialCenterIndex = 2; // "Alantis" is the third item (index 2)
        let currentItemIndex = initialCenterIndex; // Start with "Alantis" as active

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

            // Calculate translation based on current item index
            const translateX = (initialCenterIndex * itemWidth) - offset; // Always center "Alantis"
            carouselSlide.style.transform = `translateX(-${translateX}px)`; // Adjust position
        }

        function nextItem() {
            currentItemIndex = (currentItemIndex + 1) % items.length; // Increment index
            updateCarousel(); // Update the carousel
        }

        function prevItem() {
            currentItemIndex = (currentItemIndex - 1 + items.length) % items.length; // Decrement index
            updateCarousel(); // Update the carousel
        }

        // Set up event listeners for buttons
        document.querySelector(`.${carouselId}-arrow.right`).addEventListener('click', nextItem);
        document.querySelector(`.${carouselId}-arrow.left`).addEventListener('click', prevItem);

        updateCarousel(); // Initial update to set the correct position
    };

    // Initialize new-carousel
    setupNewCarousel('new-carousel'); // Initialize new-carousel
});

// ---------------- REVIEWS --------------------- //
document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");

    stars.forEach(star => {
        star.addEventListener("click", function() {
            let rating = this.dataset.value;
            stars.forEach(s => {
                s.classList.remove("selected");
                if (s.dataset.value <= rating) {
                    s.classList.add("selected");
                }
            });
        });
    });
});


// ------------- OVERLAYS ------------ //

let currentImageIndex = 0;
const images = ["./images/main/Overlay1.png", "./images/main/Overlay2.png", "./images/main/Overlay3.png"]; // Add paths to your images

function openPopup(imageSrc, index) {
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popup-image");

    currentImageIndex = index; // Set the current index
    popup.style.display = "block";
    popupImage.src = imageSrc; // Set the source of the image
    document.body.style.overflow = 'hidden'; // Disable scrolling
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Hide the popup
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Optional: To close the popup when clicking outside the image
window.onclick = function(event) {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        closePopup();
    }
};

// Add the functions for navigating the images in the popup
function prevImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
    updatePopupImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
    updatePopupImage();
}

function updatePopupImage() {
    const popupImage = document.getElementById("popup-image");
    popupImage.src = images[currentImageIndex];
}

// Add functions for navigating thumbnails
function prevThumbnailImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
    updateMainImage();
}

function nextThumbnailImage() {
    currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
    updateMainImage();
}

function updateMainImage() {
    const mainImage = document.getElementById("main-image");
    mainImage.src = images[currentImageIndex];
    mainImage.onclick = () => openPopup(images[currentImageIndex], currentImageIndex); // Update click event
}

// Initialize the main image and set up click events for thumbnails
function initGallery() {
    updateMainImage(); // Set initial main image
    const thumbnails = document.querySelectorAll('.thumbnail-container img');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.onclick = () => {
            currentImageIndex = index; // Set the current index based on thumbnail clicked
            openPopup(images[index], index); // Open the popup with the clicked thumbnail
            updateMainImage(); // Update the main image as well
        };
    });
}

// Call this function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initGallery);

// NEON SIGN //
document.addEventListener('DOMContentLoaded', (event) => {
    const letters = document.querySelectorAll('.neon-text .letter');

    function flicker() {
        const numberOfFlickers = Math.random() < 0.3 ? 3 : 2; // Occasionally flicker 3 letters, but mostly 2
        for (let i = 0; i < numberOfFlickers; i++) {
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            randomLetter.classList.add('dimmed');
            setTimeout(() => {
                randomLetter.classList.remove('dimmed');
            }, 1000);
        }
        setTimeout(flicker, Math.random() * 4000 + 1000); // Schedule next flicker between 1-5 seconds
    }

    flicker(); // Start the first flicker
});


// NEON SIGN END //

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

// CHAT BOX //

document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const message = document.createElement('div');
            message.className = 'message';
            message.textContent = messageText;
            messages.appendChild(message);

            // Scroll to the bottom of the messages
            messages.scrollTop = messages.scrollHeight;

            // Clear the input field
            messageInput.value = '';
        }
    });

    // Allow pressing "Enter" to send a message
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});