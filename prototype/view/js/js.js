window.onload = function () {
    if(localStorage.getItem('bg') !== null) {
        if(localStorage.getItem('bg') === 'black') {
            document.body.style.backgroundColor = 'black';
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
        document.body.style.backgroundColor = 'black';
        localStorage.setItem('bg', 'black');
    } else {
        document.body.style.backgroundColor = 'rgb(51,182,122)';
        localStorage.setItem('bg', 'rgb(51,182,122)');
    }
}



function openContent(event, pageName) {
    var pagecontent = document.getElementsByClassName("pagecontent");
    document.getElementById("app-head").style.display = "none";
    document.getElementById("app-foot").style.display = "none";
    for (var x = 0; x < pagecontent.length; x++) {
        pagecontent[x].style.display = "none";
    }
    document.getElementById("spinner").setAttribute('uk-spinner', "");
    setTimeout(function(){
        document.getElementById("spinner").removeAttribute('uk-spinner', "");
        document.getElementById(pageName).style.display = "block";
        document.getElementById("app-head").style.display = "flex";
        document.getElementById("app-foot").style.display = "flex";
    },1000);
    
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



function checkRequired() {
    let uname = document.getElementById("uname").value;
    let pword = document.getElementById("pword").value;
    if(uname == "") {
        alert("Username must be filled out");
        return false;
    }
    if(pword == "") {
        alert("Password must be filled out");
        return false;
    }
    
    return true;
}

function checkInvalid() {
    
    var uname = uname;
    /*var pword = pword.value
    var fname = fname.value
    var lname = lname.value
    var email = email.value
    var phone = phone.value
    var address = address.value*/
    if(uname.checkValidity() == false) {
        uname.style.backgroundColor = "crimson";
    }
}
