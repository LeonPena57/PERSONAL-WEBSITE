// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal and its elements
    var modal = document.getElementById("image-modal");
    var modalImg = document.getElementById("modal-image");
    var modalText = document.getElementById("modal-text");
    var closeBtn = document.getElementsByClassName("close")[0];

    // Function to open the modal when an image is clicked
    function openModal(imgElement, description) {
        modal.style.display = "block";
        modalImg.src = imgElement.src;
        modalText.textContent = description;
    }

    // Add event listener to each image in the gallery
    var images = document.querySelectorAll('.overlay-gallery img');
    images.forEach(function(image) {
        image.addEventListener('click', function() {
            var description = image.alt; // Use alt text as description
            openModal(image, description);
        });
    });

    // Close the modal when the user clicks on the "X"
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks outside the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
