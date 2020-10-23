

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
    fetch('api.php?action=logout'), {
        method: 'POST',
        credentails: 'include'
    }
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



function getInfo(info) {

    var information = {
        'game': info
    }
    fetch('api.php?action=information',
    {
        method: 'POST',
        body: JSON.stringify(information),
        credentails: 'include'
    }
    ).then(function(response) {
        if(response.status === 202) {
            response.json().then(function(data) {
                document.getElementById("dis").innerHTML = "Hello";
            })
            
            return true;
        } else {
            return false;
        }
    });
    return false;
    }
