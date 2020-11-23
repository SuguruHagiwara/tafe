/* Dark mode */

window.onload = function () {
    if(localStorage.getItem('bg') !== null) {
        if(localStorage.getItem('bg') === 'black') {
            document.body.style.backgroundColor = 'black';
            dark.checked = true;
        }
        /* rgb(51,182,122) */
        if(localStorage.getItem('bg') === 'rgb(51,182,122)') {
            document.body.style.color = 'rgb(51,182,122)';
            dark.checked = false;
        }
    }
}


function switchBgDark(x) {
    if(x.checked == true) {
        document.body.style.backgroundColor = 'black';
        localStorage.setItem('bg', 'black');
        return true;
    } else {
        document.body.style.backgroundColor = 'rgb(51,182,122)';
        localStorage.setItem('bg', 'rgb(51,182,122)');
        return false;
    }
}



/* Hiding menus */

window.onload = function() {
    index = document.getElementById("login");
    if (window.getComputedStyle(index).display !== "none") {
        document.getElementById("app-head").style.display = "none";
        document.getElementById("app-foot").style.display = "none";
    } 
}


function hideNav() {
    document.getElementById("app-head").style.display = "none";
    document.getElementById("app-foot").style.display = "none";
}

function showNav() {
    document.getElementById("app-head").style.display = "flex";
    document.getElementById("app-foot").style.display = "flex";
}



/* Spinner */
function showSpinner(){
    document.getElementById("spinner").style.display = "block";
    document.getElementById("app-head").style.display = "none";
    document.getElementById("app-foot").style.display = "none";
}

function hideSpinner(){
    setTimeout(function(){
        document.getElementById("spinner").style.display = "none";
    }, 3000);
    //document.getElementById("app-head").style.display = "flex";
    //document.getElementById("app-foot").style.display = "flex";
}



/* Display pages */

function openContent(event, pageName) {
    //document.getElementById("spinner").style.display = "block";
    var pagecontent = document.getElementsByClassName("pagecontent");
    for (var x = 0; x < pagecontent.length; x++) {
        pagecontent[x].style.display = "none";
    } 
    showSpinner()
    hideSpinner()
    //setTimeout(function(){
        document.getElementById(pageName).style.display = "block";
        showNav();
        //document.getElementById("spinner").style.display = "none";
        if(registration.style.display == "block") {
            hideNav()
        }
    //},1000);
}




/* registration form validation */


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


function formValidation() {
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    
    if(fname.checkValidity() == false) {
        error1.innerHTML = "Please check Your First Name!"
        fname.style.backgroundColor = "pink";
        return false;
        } else {
        fname.style.backgroundColor = "lightgreen";
        }

    if(lname.checkValidity() == false) {
        error2.innerHTML = "Please check Your Last Name!"
        lname.style.backgroundColor = "pink";
        return false;
        } else {
        lname.style.backgroundColor = "lightgreen";
        }

    if(email.checkValidity() == false) {
        error3.innerHTML = "Please check Your Email Address!"
        email.style.backgroundColor = "pink";
        return false;
        } else {
        email.style.backgroundColor = "lightgreen";
        }

    if(phone.checkValidity() == false) {
        error4.innerHTML = "Please check Your Phone Number!"
        phone.style.backgroundColor = "pink";
        return false;
        } else {
        phone.style.backgroundColor = "lightgreen";
        }

    if(address.checkValidity() == false) {
        error5.innerHTML = "Please check Your Address!"
        address.style.backgroundColor = "pink";
        return false;
        } else {
        address.style.backgroundColor = "lightgreen";
        }

    return checkRequired();
}


function errorDisplay1() {
    if(fname.checkValidity() == false){
        fname.style.backgroundColor = "pink";
    } else {
        fname.style.backgroundColor = "lightgreen";
    }
}

function errorDisplay2() {
     if(lname.checkValidity() == false){
        lname.style.backgroundColor = "pink";
    } else {
        lname.style.backgroundColor = "lightgreen";
    }
}

function errorDisplay3() {
    if(email.checkValidity() == false){
       email.style.backgroundColor = "pink";
   } else {
       email.style.backgroundColor = "lightgreen";
   }
}

function errorDisplay4() {
    if(phone.checkValidity() == false){
       phone.style.backgroundColor = "pink";
   } else {
       phone.style.backgroundColor = "lightgreen";
   }
}

function errorDisplay5() {
    if(address.checkValidity() == false){
       address.style.backgroundColor = "pink";
   } else {
       address.style.backgroundColor = "lightgreen";
   }
 
}


/* User profile edit validation */


function editValidation() {
    let editFname = document.getElementById("editFName");
    let editLname = document.getElementById("editLName");
    let editEmail = document.getElementById("editEmail");
    let editPhone = document.getElementById("editPhone");
    let editAddress = document.getElementById("editAddress");
    
    if(editFname.checkValidity() == false) {
        editerror1.innerHTML = "Please check Your First Name!"
        editFname.style.backgroundColor = "pink";
        return false;
        } else {
            editFname.style.backgroundColor = "lightgreen";
        }

    if(editLname.checkValidity() == false) {
        editerror2.innerHTML = "Please check Your Last Name!"
        editLname.style.backgroundColor = "pink";
        return false;
        } else {
            editLname.style.backgroundColor = "lightgreen";
        }

    if(editEmail.checkValidity() == false) {
        editerror3.innerHTML = "Please check Your Email Address!"
        editEmail.style.backgroundColor = "pink";
        return false;
        } else {
            editEmail.style.backgroundColor = "lightgreen";
        }

    if(editPhone.checkValidity() == false) {
        editerror4.innerHTML = "Please check Your Phone Number!"
        editPhone.style.backgroundColor = "pink";
        return false;
        } else {
            editPhone.style.backgroundColor = "lightgreen";
        }

    if(editAddress.checkValidity() == false) {
        editerror5.innerHTML = "Please check Your Address!"
        editAddress.style.backgroundColor = "pink";
        return false;
        } else {
            editAddress.style.backgroundColor = "lightgreen";
        }
    return true;
}



function editErrorDisplay1() {
    if(editFName.checkValidity() == false){
        editFName.style.backgroundColor = "pink";
    } else {
        editFName.style.backgroundColor = "lightgreen";
    }
}

function editErrorDisplay2() {
     if(editLName.checkValidity() == false){
        editLName.style.backgroundColor = "pink";
    } else {
        editLName.style.backgroundColor = "lightgreen";
    }
}

function editErrorDisplay3() {
    if(editEmail.checkValidity() == false){
        editEmail.style.backgroundColor = "pink";
   } else {
        editEmail.style.backgroundColor = "lightgreen";
   }
}

function editErrorDisplay4() {
    if(editPhone.checkValidity() == false){
        editPhone.style.backgroundColor = "pink";
   } else {
        editPhone.style.backgroundColor = "lightgreen";
   }
}

function editErrorDisplay5() {
    if(editAddress.checkValidity() == false){
        editAddress.style.backgroundColor = "pink";
   } else {
        editAddress.style.backgroundColor = "lightgreen";
   }
 
}



/* local storage */


function switchBgImg(y) {
    if(y.checked == true) {
        if(localStorage.getItem('background-image') == null) {
            localStorage.setItem('background-image', 'url("view/images/soccer1.png")');
        } else {
            document.body.style.backgroundImage = localStorage.getItem('background-image');
            return true;            
        }
    } else {
        document.body.style.backgroundImage = "none";
    }
}

function switchBgImg2(z) {
    if(z.checked == true) {
        if(localStorage.getItem('background-image2') == null) {
            localStorage.setItem('background-image2', 'url("view/images/soccer2.png")');
        } else {
            document.body.style.backgroundImage = localStorage.getItem('background-image2');
            return true;
        } 
    } else {
        document.body.style.backgroundImage = 'none';
    }
}




function changeLogo(logo) {
    localStorage.removeItem("change-logo");
    document.getElementById("top-logo").removeAttribute("src");
    if(logo.checked == true) {
        if(localStorage.getItem('change-logo') == null) {
            localStorage.setItem('change-logo', "view/images/logo2.png");
            var img = localStorage.getItem('change-logo')
            document.getElementById("top-logo").setAttribute("src", img);
        } else {
            document.getElementById("top-logo").setAttribute("src", img);
        }
    } else {
        document.getElementById("top-logo").setAttribute("src", "view/images/logo.png");
    }
}


function profileImage() {
    localStorage.removeItem("profile-image");
    document.getElementById("default-img").removeAttribute("src");
    if(localStorage.getItem('profile-image') == null) {
        localStorage.setItem('profile-image', "view/images/profileImage.png");
        var img = localStorage.getItem('profile-image')
        document.getElementById("default-img").setAttribute("src", img);
    } else {
        document.getElementById("default-img").setAttribute("src", img);
    }
}


function changeColor(color) {
    localStorage.removeItem("change-color");
    if(color.checked == true) {
        if(localStorage.getItem('change-color') == null) {
            localStorage.setItem('change-color', "grey");
            var color = localStorage.getItem('change-color');
            document.getElementById("app-foot").style.backgroundColor = color;
        } else {
            document.getElementById("app-foot").style.backgroundColor = color;
        }
    } else {
        document.getElementById("app-foot").style.backgroundColor =  "#8fc0a9";
    }
}



/* Service worker */

/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js')
        .then(function register()
        {
            console.log('Service Worker: Registered')
        }
            )
        .catch(err => console.log(`Service Workder: Error: ${err}`))
    })
}



document.querySelector('.cache-article').addEventListener('click', function(event) {
    event.preventDefault();
    var id = this.dataset.articleId;
    caches.open('mysite-article-' + id).then(function(cache) {
      fetch('/get-article-urls?id=' + id).then(function(response) {
        // /get-article-urls returns a JSON-encoded array of
        // resource URLs that a given article depends on
        return response.json();
      }).then(function(urls) {
        cache.addAll(urls);
      });
    });
  });
*/




/* Admin */

function passMatchID(num) {
    document.getElementById("AdminMatchID").innerHTML = num;
    document.getElementById("updateBtn").setAttribute("value", num);
}


function passTeamID(num1) {
    document.getElementById("AdminTeamID").innerHTML = num1;
    document.getElementById("updateTeamBtn").setAttribute("value", num1);
}


/* Admin Insert form validation */



function adminErrorDisplay(num) {
    if(num.checkValidity() == false){
        num.classList.add("uk-form-danger");
    } else {
        num.classList.add("uk-form-success");
    }
}



function AdminInsertValidation() {
    let matchDate = document.getElementById("matchDate");
    let homeTeamID = document.getElementById("homeTeamID");
    let awayTeamID = document.getElementById("awayTeamID");
    let cost = document.getElementById("cost");
    let stadiumID = document.getElementById("stadiumID");

    
    if(matchDate.checkValidity() == false) {
        adminerror1.innerHTML = "The format must be yyyy-mm-dd"
        matchDate.classList.add("uk-form-danger");
        } else {
        matchDate.classList.add("uk-form-success");
        }

    if(homeTeamID.checkValidity() == false) {
        adminerror2.innerHTML = "Please check Your Home Team ID!"
        //homeTeamID.classList.add("uk-form-danger");
        } else {
        //homeTeamID.classList.add("uk-form-success");
        }

    if(awayTeamID.checkValidity() == false) {
        adminerror3.innerHTML = "Please check Your Away Team ID!"
        //awayTeamID.classList.add("uk-form-danger");
        } else {
        //awayTeamID.classList.add("uk-form-success");
        }

    if(cost.checkValidity() == false) {
        adminerror4.innerHTML = "Please fill in the Cost!"
        //cost.classList.add("uk-form-danger");
        } else {
        //cost.classList.add("uk-form-success");
        }

    if(stadiumID.checkValidity() == false) {
        adminerror5.innerHTML = "Please check the Stadium ID!"
        //stadiumID.classList.add("uk-form-danger");
        } else {
        //stadiumID.classList.add("uk-form-success");
        }

    return alert("check your form again");
}



/* Admin update form validation */


function adminUpdateMatchValidation() {
    let updateMatchDate = document.getElementById("updateMatchDate");
    let updateHomeTeamID = document.getElementById("updateHomeTeamID");
    let updateAwayTeamID = document.getElementById("updateAwayTeamID");
    let updateCost = document.getElementById("updateCost");
    let updateStadiumID = document.getElementById("updateStadiumID");
    
    if(updateMatchDate.checkValidity() == false) {
        adminUpdateMatchError1.innerHTML = "The format must be yyyy-mm-dd"
        updateMatchDate.classList.add("uk-form-danger");
        } else {
        updateMatchDate.classList.add("uk-form-success");
        }

    if(updateHomeTeamID.checkValidity() == false) {
        adminUpdateMatchError2.innerHTML = "Please check Your Home Team ID!"
        updateHomeTeamID.classList.add("uk-form-danger");
        } else {
        updateHomeTeamID.classList.add("uk-form-success");
        }

    if(updateAwayTeamID.checkValidity() == false) {
        adminUpdateMatchError3.innerHTML = "Please check Your Away Team ID!"
        updateAwayTeamID.classList.add("uk-form-danger");
        } else {
        updateAwayTeamID.classList.add("uk-form-success");
        }

    if(updateCost.checkValidity() == false) {
        adminUpdateMatchError4.innerHTML = "Please check Your Phone Number!"
        updateCost.classList.add("uk-form-danger");
        } else {
        updateCost.classList.add("uk-form-success");
        }

    if(updateStadiumID.checkValidity() == false) {
        adminUpdateMatchError5.innerHTML = "Please check the Stadium ID!"
        updateStadiumID.classList.add("uk-form-danger");
        } else {
        updateStadiumID.classList.add("uk-form-success");
        }

    return alert("check your form again");
}





function AdminInsertTeamValidation() {
    let insertTeamName = document.getElementById("insertTeamName");
    let insertTeamStadiumID = document.getElementById("insertTeamStadiumID");
    let logoImagePath = document.getElementById("insertLogoImagePath");

    
    if(insertTeamName.checkValidity() == false) {
        adminInsertTeamError1.innerHTML = "The format must be yyyy-mm-dd"
        matchDate.classList.add("uk-form-danger");
        } else {
        matchDate.classList.add("uk-form-success");
        }

    if(insertTeamStadiumID.checkValidity() == false) {
        adminInsertTeamError2.innerHTML = "Please fill in the Cost!"
        homeTeamID.classList.add("uk-form-danger");
        } else {
        homeTeamID.classList.add("uk-form-success");
        }

    if(logoImagePath.checkValidity() == false) {
        adminInsertTeamError3.innerHTML = "Please check Your logo path!"
        awayTeamID.classList.add("uk-form-danger");
        } else {
        awayTeamID.classList.add("uk-form-success");
        }

    return alert("check your form again");
}




function adminUpdateTeamValidation() {
    let updateTeamName = document.getElementById("insertTeamName");
    let updateTeamStadiumID = document.getElementById("insertTeamStadiumID");
    let updateLogoImagePath = document.getElementById("insertLogoImagePath");
    
    if(updateTeamName .checkValidity() == false) {
        adminUpdateTeamError1.innerHTML = "The format must be yyyy-mm-dd!"
        matchDate.classList.add("uk-form-danger");
        } else {
        matchDate.classList.add("uk-form-success");
        }

    if(updateTeamStadiumID.checkValidity() == false) {
        adminUpdateTeamError2.innerHTML = "Please check your stadium ID!"
        homeTeamID.classList.add("uk-form-danger");
        } else {
        homeTeamID.classList.add("uk-form-success");
        }

    if(updateLogoImagePath.checkValidity() == false) {
        adminUpdateTeamError3.innerHTML = "Please check Your logo path!"
        awayTeamID.classList.add("uk-form-danger");
        } else {
        awayTeamID.classList.add("uk-form-success");
        }

    return alert("check your form again");
}