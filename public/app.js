function myFunc(input) {

    let files = input.files || input.currentTarget.files;

    let reader = [];
    let images = document.getElementById('images');
    let name;
    let name2
    for (let i in files) {
        if (files.hasOwnProperty(i)) {
            name = 'file' + i;
            name2 = 'file1' + i;

            reader[i] = new FileReader();
            reader[i].readAsDataURL(input.files[i]);

            images.innerHTML += '<li class="liChecked" ><label><input id="' + name + '" name="checkedImage" type="radio" onclick="a(this)" required/><span id="' + name2 + '" style=""></span></label></li>';

            (function (name, name2) {
                reader[i].onload = function (e) {
                    let inputCheck = document.getElementById(name),
                        spanCheck = document.getElementById(name2);
                    let inputCheckStyle = inputCheck.style,
                        spanCheckStyle = spanCheck.style;
                    inputCheckStyle.background = 'url(' + e.target.result + ') no-repeat';
                    inputCheckStyle.backgroundSize = '100% 100%';
                    spanCheckStyle.background = 'url(' + e.target.result + ') no-repeat';
                    spanCheckStyle.backgroundSize = '100% 100%';
                };
            })(name, name2);
        }
    }
}

function a(input) {
    let previewImage = document.getElementById('previewimg');
    document.getElementById('selectedImage').value = $('.liChecked').index(input.parentNode.parentNode);
    previewImage.src = input.style.background.slice(5, -30);
}

function b(btn) {
    let content = document.querySelector('.news .news-list .news-content');
    if (btn.innerHTML === 'Развернуть') {
        content.classList.remove('hidden')
        content.classList.add('show')
        btn.innerHTML = 'Свернуть'
    } else {
        content.classList.remove('show')
        content.classList.add('hidden')
        btn.innerHTML = 'Развернуть'
    }
}