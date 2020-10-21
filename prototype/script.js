

/* ------------------------------------------------------ Login ----------------------------------------------------  */

function login1() {

    var login = {
        'login-uname' : document.getElementById("login-uname").value,
        'login-pword' : document.getElementById("login-pword").value
    }

    fetch('api.php?action=login',
    {
        method: 'POST',
        body: JSON.stringify(login),
        credentails: 'include'
    }
    ).then(function(response) {
        if(response.status === 401) {
            alert('Authentication failed', 'warning');
            return;
        }
        if(response.status === 202) {
            document.getElementById("login").style.display = "none";
            document.getElementById("home").style.display = "block";
            showNav();
            return;
        }
    });
    return false;
}


/* ------------------------------------------------------ Registration ----------------------------------------------------  */

function reg() {

    var reg = {
        'uname': document.getElementById("uname").value,
        'pword': document.getElementById("pword").value,
        'fname': document.getElementById("fname").value,
        'lname': document.getElementById("lname").value,
        'email': document.getElementById("email").value,
        'phone': document.getElementById("phone").value,
        'address': document.getElementById("address").value
    }
    
    fetch('api.php?action=registration',
    {
        method: 'POST',
        body: JSON.stringify(reg),
        credentails: 'include'
    }
    ).then(function(response) {
        if(response.status === 202) {
            console.log('202')
            alert("You are now registered!")
            document.getElementById("login").style.display = "block";
            document.getElementById("registration").style.display = "none";
            return;
        } else {
            console.log("failed to register");
        }
    });
    return false;
}



/* ------------------------------------------------------ Logout ----------------------------------------------------  */


function logout1() {
    fetch('api.php?action=logout')
    .then(function(response) {
        if(response.status === 202) {
            console.log('202');
            window.location.assign("index.html")
            return;
        } else {
            console.log("fail to logout!")
            return false;
        }
    })
}



/* ------------------------------------------------------ Buy a ticket ----------------------------------------------------  */

function buyTicket() {

    var radioValue = document.getElementsByName("radio"),value;

    for(i=0;i<radioValue.length;i++) {
        if(radioValue[i].checked){
            var method = radioValue[i].value;
        }
    }

    var ticket = {
        'amount': document.getElementById("amount").value,
        'seat': document.getElementById("seat").value,
        'method': method,
        'matchID': document.getElementById("matchInfo").value
    }
    
    fetch('api.php?action=ticket',
    {
        method: 'POST',
        body: JSON.stringify(ticket),
        credentails: 'include'
    }
    ).then(function(response) {
        if(response.status === 202) {
            console.log('202')
            alert("Purchased!")
            return;
        } else {
            console.log("couldn't buy a ticket")
        }
    });
    return false;
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
