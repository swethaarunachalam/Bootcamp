
let currentIndex = 0;
const images = document.querySelectorAll('.slider img');

function changeImage(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

