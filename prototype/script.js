

/* ------------------------------------------------------ Login ----------------------------------------------------  */

function login1() {

    var login = {
        'login-uname' : document.getElementById("login-uname").value,
        'login-pword' : document.getElementById("login-pword").value
    }

    fetch('api.php?action=login',
    {
        method: "POST",
        body: JSON.stringify(login),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
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
        response.json()
        if(response.status === 202) {
            if(checkRequired() == true) {
                alert("You are now registered!")
                document.getElementById("login").style.display = "block";
                document.getElementById("registration").style.display = "none";
                return;
            } 
        } else {
            response.json().then(function(data) {
                alert("registration error");
            })
        }
    });
    return false;
}



/* ------------------------------------------------------ Logout ----------------------------------------------------  */


function logout1() {
    fetch('api.php?action=logout'), {
        method: 'POST',
        credentails: 'same-origin'
    }
    .then(function(response) {
        response.json()
        if(response.status === 202) {
            console.log('202');
            window.location.assign("index.html")
            return;
        } else {
            response.json().then(function(data) {
                alert("logging out error");
            })
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
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            console.log('202');
            document.getElementById("home").style.display = "block";
            document.getElementById("ticket").style.display = "none";
            alert("Purchased!");
            return;
        } else {
            response.json().then(function(data) {
                alert("purchasing error");
            })
        }
    });
    return false;
    }


/* ------------------------------------------------------ Get information ----------------------------------------------------  */


function getInfo(info) {

    var information = {
        'game': info
    }
    fetch('api.php?action=information',
    {
        method: 'POST',
        body: JSON.stringify(information),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
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


/* ------------------------------------------------------ Delete a user account ----------------------------------------------------  */

 function deleteUser() {
    fetch('api.php?action=deleteUser',
    {
        method: 'POST',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            console.log('202');
            alert("User account deleted!");
            document.getElementById("login").style.display = "block";
            document.getElementById("profile").style.display = "none";
            return;
        } else {
            response.json().then(function(data) {
                alert("failed to delete");
            })
        }
    });
    return false;
    }


    function editUser() {

        var editcomponent = {
            'editFName': document.getElementById("editFName").value,
            'editLName': document.getElementById("editLName").value,
            'editEmail': document.getElementById("Email").value,
            'editPhone': document.getElementById("editPhone").value,
            'editAddress': document.getElementById("editAddress").value
        }
        fetch('api.php?action=editUser',
        {
            method: 'POST',
            body: editcomponent,
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                console.log('202');
                alert("User account edited!");
                document.getElementById("login").style.display = "block";
                document.getElementById("profile-edit").style.display = "none";
                return;
            } else {
                response.json().then(function(data) {
                    alert("failed to edit");
                })
            }
        });
        return false;
        }
    
