// ------------- OVERLAYS ------------ //

let currentImageIndex = 0;
const images = ["/images/main/Overlay1.png", "/images/main/Overlay2.png", "/images/main/Overlay3.png"]; // Add paths to your images

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

// Ensure the gallery is initialized after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});