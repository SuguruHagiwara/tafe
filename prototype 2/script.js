
/* ------------------------------------------------------ Example ----------------------------------------------------  */

function postWithFetch() {
    var fd = new FormData();
    // each form element goes into fd object
    fd.append('dish', 'vegetables');
    fetch('api.php?action=order', {
        method: 'POST',
        mode: cors,
        body: fd,
        credentials: 'include'
        }
    ).then(function(response) {
        if(response.status === 400) {
            console.log('not inserted');
            return;
        }
        if(response.status === 401) {
            console.log('no permission');
            return;
        }
        if(response.status === 501) {
            console.log('not implemented');
            return;
        }
        if(response.status === 202) {
            console.log('success');
            return;
        }
    })
    return false;
}

/* ------------------------------------------------------ Information ----------------------------------------------------  */

/*
function info() {
    fetch('../../api.php?action=info',
    {
        method: 'POST',
        credentails: 'include'
    }
    ).then(function(response) {
        if(response.status === 401) {
            alert('Authentication failed', 'warning');
            return;
        }
        if(response.status === 203) {
            alert('registration required, set password', 'error');
            return;
        }
        if(response.status === 202) {
            document.getElementById("matchInfo").innerHTML = "Hello";
            return;
        }
        response.json().then(function(data) {
            alert('Authentication success', 'warining');
            localStorage.setItem('credentials', JSON.stringify(data))
        })
    })
    .catch(function(err) {
        alert('Connection unavailable', 'error');
    }) 
}*/

/* ------------------------------------------------------ Login ----------------------------------------------------  */

function login() {

    var login = {
        'login-uname': document.getElementById("login-uname").value,
        'login-pword': document.getElementById("login-pword").value,
    }

    var loginJSON = JSON.stringify(login);
    fetch('api.php?action=login',
    {
        method: 'POST',
        body: loginJSON,
        credentails: 'include'
    }
    ).then(function(response) {
        if(response.status === 401) {
            alert('Authentication failed', 'warning');
            return;
        }
        if(response.status === 203) {
            alert('registration required, set password', 'error');
            return;
        }
        if(response.status === 202) {
            alert('You are now logged in!');
            return;
        }
        response.json().then(function(data) {
            alert('Authentication success', 'warining');
            localStorage.setItem('credentials', JSON.stringify(data))
        })
    })
    .catch(function(err) {
        alert('Connection unavailable', 'error');
    }) 
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
        'address': document.getElementById("address").value,
    }
    
    fetch('../../api.php?action=registration',
    {
        method: 'POST',
        body: JSON.stringify(reg),
        mode: 'cors'
    }
    ).then(function(response) {
        if(response.status === 200) {
            console.log('200')
            return;
        }
        if(response.status === 201) {
            console.log('203')
            return;
        }
        if(response.status === 202) {
            console.log('202')
            alert("You are now registered!")
            return;
        }
    })
    .catch(function(err) {
        alert('Connection unavailable', 'error');
    }) 
}



/* ------------------------------------------------------ Logout ----------------------------------------------------  */


function logout1() {
    fetch('../../api.php?action=logout')
    .then(function(response) {
        if(response.status === 200) {
            console.log('200');
            return;
        }
        if(response.status === 201) {
            console.log('203');
            return;
        }
        if(response.status === 202) {
            console.log('202');
            window.location.assign("index.html")
            return;
        }
    })
}



/* ------------------------------------------------------ Buy a ticket ----------------------------------------------------  */

function buyTicket() {

    var ticket = {
        'amount': document.getElementById("amount").value,
        'seat': document.getElementById("seat").value,
        'method': document.getElementById("radio").value,
    }
    
    fetch('../../api.php?action=ticket',
    {
        method: 'POST',
        body: JSON.stringify(ticket),
        mode: 'cors'
    }
    ).then(function(response) {
        if(response.status === 200) {
            console.log('200')
            return;
        }
        if(response.status === 201) {
            console.log('203')
            return;
        }
        if(response.status === 202) {
            console.log('202')
            alert("Purchased!")
            return;
        }
    })
    .catch(function(err) {
        alert('Connection unavailable', 'error');
    }) 
}


/* ------------------------------------------------------ Display team ----------------------------------------------------  */


/*
function team() {

fetch('../../api.php?action=team')
.then(function(response) {
    if(response.status === 200) {
        localStorage.removeItem('credentials');
        console.log('200')
        return;
    }
    if(response.status === 201) {
        console.log('203')
        return;
    }
    if(response.status === 202) {
        response.json();
        console.log('202')
        return;
    }
})
.catch(function(err) {
    alert('Connection unavailable', 'error');
}) 
}*/


/* ------------------------------------------------------ Like the team ----------------------------------------------------  */

function like(this) {

    var team = this.value;
    var likedTeam = {
        "team": team,
    }
    var teamJSON = JSON.stringify(likedTeam);

    fetch('../../api.php?action=like',
    {
        method: 'POST',
        body: teamJSON,
        mode: 'cors'
    }
    ).then(function(response) {
        if(response.status === 200) {
            localStorage.removeItem('credentials');
            console.log('200')
            return;
        }
        if(response.status === 201) {
            console.log('203')
            return;
        }
        if(response.status === 202) {
            console.log('202')
            alert("Purchased!")
            return;
        }
    })
    .catch(function(err) {
        alert('Connection unavailable', 'error');
    }) 
}


document.getElementById('regForm').addEventListener('submit', function(e) {processForm()});

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

function animateElement(elem) {
    
}