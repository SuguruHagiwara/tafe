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


function checkRequired() {
    let x = document.getElementById("uname").value;
    let y = document.getElementById("pword").value;
    if(x == "" || y == "") {
        return false;
    }
}


function processForm(evt) {
    evt.preventDefault();
    var validatedArray = Array();
    alertbox.innderHTML = '';
    for(var loop = 0;loop < evt.srcElement.length;loop++) {
        evt.srcElement[loop].setCustomValidity('');
        if(evt.srcElement[loop].hasAttribute('required')) {
            if(evt.srcElement[loop].value.length > 0) {
                if(evt.srcElement[loop].checkValidity()) {
                    evt.srcElement[loop].setCustomValidity('');
                    validatedArray.push({type: evt.srcElement[loop].type,
                                        name: evt.srcElement[loop].name,
                                        value: evt.srcElement[loop].value});
                } else {
                    evt.srcElement[loop].setCustomValidity(evt.srcElement[loop].title);
                    alertbox.innerHTML = evt.srcElement[loop].title;
                    validatedArray = Array(); // crush the array
                    break;
                }
                } else {
                    validatedArray = Array();
                    break;
                }
        } else { // field not required.... Should we still not validate?
                validatedArray.push({type: evt.srcElement[loop].type,
                                    name: evt.srcElement[loop].name,
                                    value: evt.srcElement[loop].value});
        }
    }
    if(validatedArray.length === 0) {
        console.log('err');
    } else {
        console.log(validatedArray);
        // further processing... but success!
    }
}

function populateAlert(msg) {
    alertbox.innerHTML = msg;
}
