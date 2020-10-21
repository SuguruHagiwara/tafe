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



function openContent(event, pageName) {
    var x = 0;
    var pagecontent = document.getElementsByClassName("pagecontent");
    var displaycontent = document.getElementsByClassName("displaycontent");

    for (x = 0; x < pagecontent.length; x++) {
        pagecontent[x].style.display = "none";
    }
    for (x = 0; x < pagecontent.length; x++) {
        displaycontent[x].className = displaycontent[x].className.replace("current", "");
    }
    document.getElementById(pageName).style.display = "block";
    if (event.currentTarget.classList.contains("displaycontent")) {
        event.currentTarget.className += " current";
    }
}


window.onload = function() {
    index = document.getElementById("login");
    if (window.getComputedStyle(index).display !== "none") {
        document.getElementById("app-head").style.display = "none";
        document.getElementById("app-foot").style.display = "none";
    } 
    if (window.getComputedStyle(index).display == "none") {
        document.getElementById("app-head").style.display = "flex";
        document.getElementById("app-foot").style.display = "flex";
    }
}

function showNav() {
    document.getElementById("app-head").style.display = "flex";
    document.getElementById("app-foot").style.display = "flex";
}