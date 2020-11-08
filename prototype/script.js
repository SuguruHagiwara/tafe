

/* ------------------------------------------------------ Login ----------------------------------------------------  */

function login() {
    showSpinner()
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
            hideSpinner()
            return;
        }
        if(response.status === 202) {
            document.getElementById("login").style.display = "none";
            document.getElementById("home").style.display = "block";
            showNav();
            hideSpinner()
            return;
        }
    });
    hideSpinner()
    return false;
}


/* ------------------------------------------------------ Registration ----------------------------------------------------  */

function reg() {
    showSpinner()
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
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            if(formValidation() == true) {
                alert("You are now registered!")
                document.getElementById("login").style.display = "block";
                document.getElementById("registration").style.display = "none";
                hideSpinner()
                return ;
            }  else {
                alert("Check your form again");
                hideSpinner()
            }
        } else {
            response.json().then(function() {
                alert("registration error");
                hideSpinner()
            })
        }
    });
    hideSpinner()
    return false;
}



/* ------------------------------------------------------ Logout ----------------------------------------------------  */


function logout() {
    showSpinner()
    fetch('api.php?action=logout'), {
        method: 'GET',
        credentails: 'same-origin'
    }
    .then(function(response) {
        response.json()
        if(response.status === 202) {
            console.log('202');
            window.location.assign("index.html")
            hideSpinner()
            return;
        } else {
            response.json().then(function(data) {
                alert("logging out error");
                hideSpinner()
            })
            hideSpinner()
            return false;
        }
    })
}



/* ------------------------------------------------------ Buy a ticket ----------------------------------------------------  */

function buyTicket() {
    showSpinner()
    var radioValue = document.getElementsByName("radio").value;

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
            document.getElementById("home").style.display = "block";
            document.getElementById("ticket").style.display = "none";
            alert("Purchased!");
            hideSpinner()
            return;
        } else {
            response.json().then(function(data) {
                hideSpinner()
                alert("purchasing error");
            })
        }
    });
    hideSpinner()
    return false;
    }


/* ------------------------------------------------------ Get information ----------------------------------------------------  */


function getInfo(info) {
    showSpinner()
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
                document.getElementById("dis").innerHTML = "hello";
                hideSpinner()
            })
            hideSpinner()
            return true;
        } else {
            hideSpinner()
            return false;
        }
    });
    hideSpinner()
    return false;
    }


/* ------------------------------------------------------ Delete a user account ----------------------------------------------------  */

 function deleteUser() {
    showSpinner()
    fetch('api.php?action=deleteUser',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            alert("User account deleted!");
            document.getElementById("login").style.display = "block";
            document.getElementById("profile").style.display = "none";
            hideSpinner()
            return;
        } else {
            hideSpinner()
            document.getElementById("profile").style.display = "block";
            showNav()
            alert("failed to delete");
        }
    });
    hideSpinner()
    return false;
 }


/* ------------------------------------------------------ Edit a user account ----------------------------------------------------  */

    function editUser() {
        showSpinner()
        var editcomponent = {
            'editFName': document.getElementById("editFName").value,
            'editLName': document.getElementById("editLName").value,
            'editEmail': document.getElementById("editEmail").value,
            'editPhone': document.getElementById("editPhone").value,
            'editAddress': document.getElementById("editAddress").value
        }
        fetch('api.php?action=editUser',
        {
            method: 'POST',
            body: JSON.stringify(editcomponent),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                if(editValidation() == true) {
                    alert("User account edited!");
                    document.getElementById("profile").style.display = "block";
                    document.getElementById("profile-edit").style.display = "none";
                    showNav()
                    hideSpinner()
                    return;
                } else {
                    hideSpinner()
                    showNav()
                    alert("Check your form again");
                }
            } else {
                response.json().then(function(data) {
                    hideSpinner()
                    alert("failed to edit");
                })
            }
        });
        hideSpinner()
        return false;
        }
    
/* ------------------------------------------------------ Create favorite team ----------------------------------------------------  */


    function createFavTeam(team) {
        showSpinner()
        var favTeam = {
            "favTeam": team.value
        }
        fetch('api.php?action=favTeam',
        {
            method: 'POST',
            body: JSON.stringify(favTeam),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                hideSpinner()
                return;
            } else {
                hideSpinner()
                alert("failed to like");
                }
        });
        hideSpinner()
        return false;
    }

/* ------------------------------------------------------ Display favorite team ----------------------------------------------------  */

    function showFavTeam() {
        showSpinner()
        //if(createFavTeam() == true) {
            fetch('api.php?action=displayFavTeam',
            {
                method: 'GET',
                credentails: 'same-origin'
            }
            ).then(function(response) {
                response.json();
                if(response.status === 202) {
                    //console.log($result);
                    let output = "";
                    for(let i in response) {
                            output = `<div>
                            <div>${data[i].FavoriteTeamID}</div>
                            <div>${data[i].HomeTeamID}</div>
                            <div>${data[i].UserID}</div>
                        </div>`
                        
                    }

                    document.getElementById("yourFav").innerHTML = output;
                    hideSpinner()
                    return;
                } else {
                    hideSpinner()
                    alert("failed to like");
                    }
            });
            hideSpinner()
        //} else {
            return false;
        //}
        
    }

/* ------------------------------------------------------ Delete favorite team ----------------------------------------------------  */

    function deleteFavTeam(team) {
        showSpinner()
        var favTeam = {
            "favTeam": team.value
        }
        fetch('api.php?action=favTeam',
        {
            method: 'POST',
            body: JSON.stringify(favTeam),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                hideSpinner()
                return;
            } else {
                hideSpinner()
                alert("failed to like");
                }
        });
        hideSpinner()
        return false;
    }


/* ------------------------------------------------------ Update favorite team ----------------------------------------------------  */

    function updateFavTeam(team) {
        showSpinner()
        var favTeam = {
            "favTeam": team.value
        }
        fetch('api.php?action=favTeam',
        {
            method: 'POST',
            body: JSON.stringify(favTeam),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                hideSpinner()
                return;
            } else {
                hideSpinner()
                alert("failed to like");
                }
        });
        hideSpinner()
        return false;
    }
