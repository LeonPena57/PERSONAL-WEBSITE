/* DESIGN CAROUSEL */
let currentSlide = 0;

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentSlide) {
            item.classList.add('active');
        }
    });
    const carousel = document.getElementById('image-carousel');
    if (carousel) {
        carousel.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function nextCarouselItem() {
    const items = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide + 1) % items.length; // Loop to the start
    updateCarousel();
}

function prevCarouselItem() {
    const items = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide - 1 + items.length) % items.length; // Loop to the end
    updateCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCarousel(); // Initial update

    const categoryBoxes = document.getElementsByClassName("category-box");

    for (let i = 0; i < categoryBoxes.length; i++) {
        categoryBoxes[i].addEventListener('click', function() {
            const categoryId = this.dataset.categoryId;
            showCategoryPopup(categoryId);
        });

        const categoryId = categoryBoxes[i].dataset.categoryId;
        startImageSwap(categoryBoxes[i], categoryId);
    }
});

let swapIntervals = {};

function startImageSwap(box, categoryId) {
    const images = getCategoryImages(categoryId);
    const previewImg = box.querySelector('img');
    let currentIndex = Math.floor(Math.random() * images.length);

    swapIntervals[categoryId] = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        previewImg.src = images[currentIndex];
    }, 2000);
}

function stopImageSwap(box) {
    const categoryId = box.dataset.categoryId;
    clearInterval(swapIntervals[categoryId]);
    delete swapIntervals[categoryId];
}

function showCategoryPopup(categoryId) {
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');
    overlay.dataset.categoryId = categoryId;

    const popup = document.createElement('div');
    popup.classList.add('popup-content');

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';

    const mainImg = document.createElement('img');
    mainImg.classList.add('active');
    mainImg.style.width = '80%';
    mainImg.style.marginBottom = '20px';

    const leftArrow = document.createElement('div');
    leftArrow.classList.add('arrow', 'left');
    leftArrow.innerHTML = '<';
    leftArrow.addEventListener('click', () => {
        showPrevImage(mainImg, images);
    });

    const rightArrow = document.createElement('div');
    rightArrow.classList.add('arrow', 'right');
    rightArrow.innerHTML = '>';
    rightArrow.addEventListener('click', () => {
        showNextImage(mainImg, images);
    });

    const smallImagesContainer = document.createElement('div');
    smallImagesContainer.classList.add('small-images-container');

    const images = getCategoryImages(categoryId);
    let currentIndex = 0;
    mainImg.src = images[currentIndex];
    mainImg.dataset.index = currentIndex;

    function setActiveImage(mainImg, thumbnailImg, index, images) {
        mainImg.src = images[index];
        mainImg.dataset.index = index;

        document.querySelectorAll('.thumbnail').forEach(img => img.classList.remove('active'));
        if (thumbnailImg) {
            thumbnailImg.classList.add('active');
            thumbnailImg.style.border = '2px solid white';
        }
    }

    images.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.dataset.index = index;
        img.classList.add('thumbnail');
        img.addEventListener('click', function() {
            setActiveImage(mainImg, img, index, images);
        });
        smallImagesContainer.appendChild(img);
    });

    popup.appendChild(closeBtn);
    popup.appendChild(leftArrow);
    popup.appendChild(mainImg);
    popup.appendChild(rightArrow);
    popup.appendChild(smallImagesContainer);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const overlay = document.querySelector('.popup-overlay');
    const mainImg = document.querySelector('.popup-content img.active');
    const categoryId = overlay?.dataset.categoryId;
    const images = getCategoryImages(categoryId);

    if (!mainImg || !overlay) return;

    if (e.key === 'ArrowLeft') {
        showPrevImage(mainImg, images);
    } else if (e.key === 'ArrowRight') {
        showNextImage(mainImg, images);
    } else if (e.key === 'Escape') {
        document.body.removeChild(overlay);
    }
});

function showPrevImage(mainImg, images) {
    let currentIndex = parseInt(mainImg.dataset.index);
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    mainImg.src = images[currentIndex];
    mainImg.dataset.index = currentIndex;
}

function showNextImage(mainImg, images) {
    let currentIndex = parseInt(mainImg.dataset.index);
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    mainImg.src = images[currentIndex];
    mainImg.dataset.index = currentIndex;
}

function getCategoryImages(categoryId) {
    const images = {
        'category1': [
            './images/overlays/3Short2Congrats.png',
            './images/overlays/1Holdup85.png',
            './images/overlays/2.png',
            './images/overlays/222.png',
            './images/overlays/2briany120828.png',
            './images/overlays/2JonathanVOVERLAY.png',
            './images/overlays/2QJCosmicOVERLAY.png',
            './images/overlays/3tiehkay.png',
            './images/overlays/anthonypollins.png',
            './images/overlays/bCarybylisOV.png',
            './images/overlays/CaptainShakey2.png',
            './images/overlays/CrimsonINSURGENCE2.png',
            './images/overlays/deanforlanoTRIPLEFC.png',
            './images/overlays/Display.png',
            './images/overlays/DS2.png',
            './images/overlays/ETB.png',
            './images/overlays/Fix2.png',
            './images/overlays/FixShort2SV.png',
            './images/overlays/Lugia.png',
            './images/overlays/krayyzeeOVERLAY.png',
            './images/overlays/Short25Fuse.png'
        ],
        'category2': [
            './images/thumbnails/CelebLIVE.png',
            './images/thumbnails/EeveeLIVE.png',
            './images/thumbnails/GameCOrnerLIVE.png',
            './images/thumbnails/jirachi.png',
            './images/thumbnails/LIVEHeartGOLD.png',
            './images/thumbnails/Mew.png',
            './images/thumbnails/PINSIRVOD.png',
            './images/thumbnails/Registeel.png',
            './images/thumbnails/RS STARTS.png',
            './images/thumbnails/Starters2.png',
            './images/thumbnails/TNDTQ.png',
            './images/thumbnails/VODPinball.png',
            './images/thumbnails/X Y LIVE.png',
            './images/thumbnails/XY2 LIVE.png'
        ],
    };
    return images[categoryId] || [];
}
