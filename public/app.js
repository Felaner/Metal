// const form = document.querySelector('.form'),
//     menu_btn = document.querySelector('.menu-contacts-btn');
//     form_close = document.querySelector('.close');
//     overlay = document.querySelector('.overlay');
//
//
// menu_btn.addEventListener('click', function () {
//     overlay.classList.add('overlay-visible');
//     form.classList.add('form-visible');
// });
//
// form_close.addEventListener('click', function () {
//     overlay.classList.remove('overlay-visible');
//     form.classList.remove('form-visible');
// });
//
// overlay.addEventListener('click', function () {
//     overlay.classList.remove('overlay-visible');
//     form.classList.remove('form-visible');
// });

function myFunc(input) {

    let files = input.files || input.currentTarget.files;

    let reader = [];
    let images = document.getElementById('images');
    let name;
    for (let i in files) {
        if (files.hasOwnProperty(i)) {
            name = 'file' + i;

            reader[i] = new FileReader();
            reader[i].readAsDataURL(input.files[i]);

            images.innerHTML += '<li><img id="'+ name +'" src="" alt="'+ name +'" /></li>';

            (function (name) {
                reader[i].onload = function (e) {
                    console.log(document.getElementById(name));
                    document.getElementById(name).src = e.target.result;
                };
            })(name);


            console.log(files[i]);
        }
    }
}