// case 1

// document.addEventListener('DOMContentLoaded', function () {
//     const slider = document.querySelector('.slider');
//     let currentIndex = 0;

//     function showSlide(index) {
//         const slideWidth = document.querySelector('.slide').offsetWidth;
//         const newPosition = -index * slideWidth;
//         slider.style.transform = `translateX(${newPosition}px)`;
//     }

//     function nextSlide() {
//         currentIndex = (currentIndex + 1) % document.querySelectorAll('.slide').length;
//         showSlide(currentIndex);
//     }


//     setInterval(nextSlide, 4000);
// });


// case 2
let imgs = ["../images/store-3.jpeg", "../images/store-4.jpg", "../images/store-5.jpg"];

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let i = 0;
prev.addEventListener("click", function () {
    i--;
    if (i < 0) {
        i = imgs.length - 1;
    }
    document.querySelector(".overlay-img").src = imgs[i];
    // setTimeout(() => {
    // }, 100);
});

next.addEventListener("click", function () {
    i++;
    if (i > imgs.length - 1) {
        i = 0;
    }
    document.querySelector(".overlay-img").src = imgs[i];
    // setTimeout(() => {
    // }, 100);
});



setInterval(() => {
    i++;


    if (i > imgs.length - 1) {
        i = 0;
    }
    document.querySelector(".overlay-img").src = imgs[i];
}, 5000);