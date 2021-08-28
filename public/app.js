const form = document.querySelector('.form'),
    menu_btn = document.querySelector('.menu-contacts-btn');
    form_close = document.querySelector('.close');
    overlay = document.querySelector('.overlay');


menu_btn.addEventListener('click', function () {
    overlay.classList.add('overlay-visible');
    form.classList.add('form-visible');
});

form_close.addEventListener('click', function () {
    overlay.classList.remove('overlay-visible');
    form.classList.remove('form-visible');
});

overlay.addEventListener('click', function () {
    overlay.classList.remove('overlay-visible');
    form.classList.remove('form-visible');
});


let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("item");
    const dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
}

let inputs = document.querySelectorAll('.add-input-img');
Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
        labelVal = label.querySelector('.input-file-button-text').innerText;

    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
            countFiles = this.files.length;

        if (countFiles)
            label.querySelector('.input-file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
        else
            label.querySelector('.input-file-button-text').innerText = labelVal;
    });
});

