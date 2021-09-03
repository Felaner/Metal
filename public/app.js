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

            images.innerHTML += '<li><label><input id="' + name + '" name="checkedImage" type="radio" style="" required/><span id="' + name2 + '" style=""></span></label></li>';

            (function (name, name2) {
                reader[i].onload = function (e) {
                    let inputCheck = document.getElementById(name),
                        spanCheck = document.getElementById(name2);
                    let inputCheckStyle = inputCheck.style,
                        spanCheckStyle = spanCheck.style;
                    console.log(inputCheckStyle)
                    console.log(spanCheckStyle)
                    inputCheckStyle.background = 'url(' + e.target.result + ') no-repeat';
                    inputCheckStyle.backgroundSize = '100% 100%'
                    spanCheckStyle.background = 'url(' + e.target.result + ') no-repeat';
                    spanCheckStyle.backgroundSize = '100% 100%'
                };
                let previewimg = document.getElementById('previewimg');
                let checkedImages = document.getElementsByTagName('input[name="checkedImage"]');
            })(name, name2);
        }
    }
}

checkedImages.addEventListener('click', function () {
    previewimg.src = this.style.background
});