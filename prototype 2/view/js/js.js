/*window.onload = function () {
    if(localStorage.getItem('src') !== null) {
        if(localStorage.getItem('src') === '../images/logo2.jpg') {
            document.getElementsByClassName("header-logo").setAttribute('src', '../images/logo2.jpg');
            logo.checked = true;
        }
        if(localStorage.getItem('src') === '../images/logo.png') {
            document.getElementsByClassName("header-logo").setAttribute('src', '../images/logo.png');
            logo.checked = false;
        }
    }
}

function logoChange(y) {
    if(y.checked == true) {
        document.getElementsByClassName("header-logo").setAttribute('src', '../images/logo2.jpg');
        localStorage.setItem('src', '../images/logo2.jpg');
    } else {
        document.getElementsByClassName("header-logo").setAttribute('src', '../images/logo.png');
        localStorage.setItem('src', '../images/logo.png');
    }
}*/

window.onload = function () {
    if(localStorage.getItem('bg') !== null) {
        if(localStorage.getItem('bg') === 'rgb(255, 136, 160)') {
            document.body.style.backgroundColor = 'rgb(255, 136, 160)';
            pink.checked = true;
        }
        if(localStorage.getItem('bg') === 'rgb(51,182,122)') {
            document.body.style.color = 'rgb(51,182,122)';
            pink.checked = false;
        }
    }
}

function switchBg(x) {
    if(x.checked == true) {
        document.body.style.backgroundColor = 'rgb(255, 136, 160)';
        localStorage.setItem('bg', 'rgb(255, 136, 160)');
    } else {
        document.body.style.backgroundColor = 'rgb(51,182,122)';
        localStorage.setItem('bg', 'rgb(51,182,122)');
    }
}