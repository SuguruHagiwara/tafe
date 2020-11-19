

/* ------------------------------------------------------ Login ----------------------------------------------------  */

function login() {
    var login = {
        'login-uname' : document.getElementById("login-uname").value,
        'login-pword' : document.getElementById("login-pword").value
    }

    fetch('api/api.php?action=login',
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
            alert("Hello! admin!");
            document.getElementById("login").style.display = "none";
            document.getElementById("admin-panel").style.display = "block";
        }
        if(response.status === 203) {
            document.getElementById("login").style.display = "none";
            document.getElementById("home").style.display = "block";
            showNav();
        }
    })
    return false;
}




/* ------------------------------------------------------ Logout ----------------------------------------------------  */


function logout() {
    fetch('api/api.php?action=logout', {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            alert("logging out");
            window.location.assign("index.html")
            return true;
        } else {
            alert("logging out error");
            return false;
        }
    })
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
    
    fetch('api/api.php?action=registration',
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
                return ;
            }  else {
                alert("Check your form again");
            }
        } else {
            response.json().then(function() {
                alert("registration error");
            })
        }
    });
    return false;
}





/* ------------------------------------------------------ Display profile ----------------------------------------------------  */

function displayProfile() {
    var output = '';
    fetch('api/api.php?action=displayProfile',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json().then(function(data) {
            if(response.status === 202) {
                data.forEach(row => {
                    output =
                    `<div><h2>First Name</h2><div>` + row.FirstName +
                    `</div><h2>Last Name</h2><div>` + row.LastName + 
                    `</div><h2>Email</h2><div>` + row.Email +
                    `</div><h2>Phone</h2><div>` + row.Phone +
                    `</div><h2>Address</h2><div>` + row.Address +
                    `</div></div>`
                })
                document.getElementById("profileDisplay").innerHTML = output;
                //return;
            } else {
               alert("failed to display");
            }
        })
        
    });
    return false;
}


/* ------------------------------------------------------ Delete a user account ----------------------------------------------------  */


 function deleteUser() {
    fetch('api/api.php?action=deleteUser',
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
            return;
        } else {
            document.getElementById("profile").style.display = "block";
            showNav()
            alert("failed to delete");
        }
    });
    return false;
}

/* ------------------------------------------------------ Edit a user account ----------------------------------------------------  */

    function editUser() {
        var editcomponent = {
            'editFName': document.getElementById("editFName").value,
            'editLName': document.getElementById("editLName").value,
            'editEmail': document.getElementById("editEmail").value,
            'editPhone': document.getElementById("editPhone").value,
            'editAddress': document.getElementById("editAddress").value
        }
        fetch('api/api.php?action=editUser',
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
                    displayProfile()
                    document.getElementById("profile").style.display = "block";
                    document.getElementById("profile-edit").style.display = "none";
                    showNav()
                    return;
                } else {
                    showNav()
                    alert("Check your form again");
                }
            } else {
                response.json().then(function(data) {
                    alert("failed to edit");
                })
            }
        });
        return false;
        }
    



/* ------------------------------------------------------ Create favorite team ----------------------------------------------------  */


    function createFavTeam(team) {
        var favTeam = {
            "favTeam": team.value
        }
        fetch('api/api.php?action=favTeam',
        {
            method: 'POST',
            body: JSON.stringify(favTeam),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                document.getElementById("yourFav").style.display = "block";
                alert("The team is saved to Your favorite team page!");
                return;
            } else {
                alert("failed to like");
                }
        });
        return false;
    }

/* ------------------------------------------------------ Display favorite team ----------------------------------------------------  */

    function showFavTeam() {
        var output10 = ""
        fetch('api/api.php?action=displayFavTeam',
        {
            method: 'GET',
            credentails: 'same-origin'
        }
        ).then(function(response) {
            if(response.status === 202) {
                response.json().then(function(data) {
                    data.forEach(row => {
                        output10 =
                        `<div style="margin: 10% auto;background-color:white;">
                            <div style="display:flex;flex-direction: column; align-items: center;">
                                <div style="width:80%;margin:auto;">
                                    <div style="font-size: 20px; color:black;">` + row[1] + `</div>
                                    <div><img style="width:100%" src="` + row[2] + `"></div>
                                </div>
                                <button value="` + row[0] + `" onclick="deleteFavTeam(this);"><span class="like-icon" uk-icon="icon:minus-circle; ratio:3"></span></button>
                            </div>
                        </div>
                        `
                        document.getElementById("yourFav").innerHTML = output10;
                        return true;
                    });
                });
            } else {
                alert("You don't have a favorite team yet!");
            }
        });
    }

/* ------------------------------------------------------ Delete favorite team ----------------------------------------------------  */

    function deleteFavTeam(team) {
        //showSpinner()
        /*var favTeam = {
            "deleteFavTeam": team.value
        }*/
        fetch('api/api.php?action=deleteFavTeam',
        {
            method: 'GET',
            //body: JSON.stringify(favTeam),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                alert("Your favorite team has been deleted!");
                document.getElementById("yourFav").style.display = "none";
                return;
            } else {
                alert("failed to delete");
                }
        });
        return false;
    }




/* ------------------------------------------------------ Buy a ticket ----------------------------------------------------  */

function buyTicket(info) {
    var radioValue = document.getElementsByName("radio");
    for(i=0;i<radioValue.length;i++) {
        if(radioValue[i].checked){
            var method = radioValue[i].value;    
            console.log(method);
        }
    }

    var ticket = {
        'amount': document.getElementById("amount").value,
        'seat': document.getElementById("seat").value,
        'method': method,
        'matchid': info.value
    }
    
    fetch('api/api.php?action=buyTicket',
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
                return true;
            } else {
                alert("purchasing error");
                return false;
            }
        });
    return false;
    }

/* ------------------------------------------------------ Display ticket ----------------------------------------------------  */

function displayTicket() {
    var output7 = '';
    fetch('api/api.php?action=displayTicket',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            if(response.status === 202) {
                data.forEach(row => {
                    output7 =
                    `<div><h2>Purchased Amount</h2><div>` + row.PurchasedAmount +
                    `</div><h2>Seat Number</h2><div>` + row.SeatNumber + 
                    `</div><h2>Payment Method</h2><div>` + row.PaymentMethod +
                    `</div><h2>MatchInfoID</h2><div>` + row.MatchInfoID +
                    `</div></div>`
                })
                document.getElementById("ticketDisplay").innerHTML = output7;
                return;
            } else {
                alert("failed to display");
            }
        })
        
    });
    return false;
}


/* ------------------------------------------------------ Delete a ticket ----------------------------------------------------  */

    function deleteTicket() {
        fetch('api/api.php?action=deleteTicket',
        {
            method: 'GET',
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
                if(response.status === 202) {
                    alert("Ticket deleted");
                    return true;
                } else {
                    alert("Deleting error");
                    return false;
                }
            });
        return false;
    }

    




/* ------------------------------------------------------ Display match ----------------------------------------------------  */

function displayMatch() {
    let output = "";
    fetch('api/api.php?action=displayMatch',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 202) {
            response.json().then(function(data) {
                data.forEach(row => {
                    output +=
                    `<div style="margin: 10% auto;background-color:white;">
                        <div>
                            <div>MatchID</div>
                            <div style="font-size: 20px; color:black;">` + row.MatchInfoID + `</div>
                        </div>
                        <div style="display:flex;dlex-direction: column; align-items: center;">
                            <div style="width:40%;margin:auto;">
                                <div>Home</div>
                                <div style="font-size: 20px; color:black;">` + row[2] + `</div>
                                <div><img style="width:100%" src="` + row[1] + `"></div>
                            </div>
                            <div style="width: 20%;align-content: center;">VS</div>
                            <div style="width: 40%;margin:auto;">
                                <div>Away</div>
                                <div style="font-size: 20px; color:black;">` + row[4] + `</div>
                                <div><img style="width:100%" src="` + row[3] +`"></div>
                            </div>
                        </div>
                        <button class="uk-button uk-button-primary uk-button-small" type="button" uk-toggle="target: #modal-example" onclick="matchInfo(` + row.MatchInfoID +`)">More Information...</button>
                        <button class="uk-button uk-button-danger uk-button-small moreInfo" type="button" onclick="openContent(event, 'ticket'); passInfo(` + row.MatchInfoID + `)">Buy a ticket</button>
                    </div>
                    `
                    document.getElementById("matchInfo").innerHTML = output;
                    return true;
                });
            });
        } 
    })
        return false;
}


/* ------------------------------------------------------ Pass match info to ticket page ----------------------------------------------------  */

function passInfo(num) {

    let output = "";
    var matchInfo = {
            matchNum: num
        }

    fetch('api/api.php?action=passInfo',
    {
        method: 'POST',
        body: JSON.stringify(matchInfo),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 202) {
            response.json().then(function(data) {
                data.forEach(row => {
                output =
                `<div style="margin: 10% auto;background-color:white; text-align:center;">
                    <div>
                        <div style="color:grey;">MatchID</div>
                        <div style="font-size: 20px; color:black;">` + row.MatchInfoID + `</div>
                    </div>
                    <div style="display:flex;dlex-direction: column; align-items: center;">
                        <div style="width:40%;margin:auto;">
                            <div style="color:gray">Home</div>
                            <div style="font-size: 20px; color:black;">` + row[2] + `</div>
                            <div><img style="width:100%" src="` + row[1] + `"></div>
                        </div>
                        <div style="width: 20%;align-content: center;color:gray">VS</div>
                        <div style="width: 40%;margin:auto;">
                            <div style="color:gray">Away</div>
                            <div style="font-size: 20px; color:black;">` + row[4] + `</div>
                            <div><img style="width:100%" src="` + row[3] +`"></div>
                        </div>
                    </div>
                    <button class="uk-button uk-button-primary uk-button-small" type="button" uk-toggle="target: #modal-ticketmatchInfo" onclick="passMatchInfo(` + row.MatchInfoID + `)">More Information...</button>
                </div>`

                var btn = 
                `<button class="uk-button uk-button-danger" value="` + row.MatchInfoID + `" type="button" onclick="return buyTicket(this)">Buy a ticket</button>`
            document.getElementById("ticketMatchInfo").innerHTML = output;
            document.getElementById("ticketSubmit").innerHTML = btn;
            return true;
                })
            })
        } else {
            alert("failed to display");
        }
    });
    return false;
}






/* ------------------------------------------------------ Display team ----------------------------------------------------  */

function displayTeam() {
    var output3 = "";
    var adminOutput3 = "";
    fetch('api/api.php?action=displayTeam',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 200) {
            response.json().then(function(data) {
                data.forEach(row => {
                    output3 +=
                    `<div style="margin: 10% auto;background-color:white;">
                        <div style="display:flex;flex-direction: column; align-items: center;margin:auto;">
                            <div style="width:80%;margin:auto;">
                                <div class="uk-text-center" style="font-size: 20px; color:black;">` + row[1] + `</div>
                                <div class="uk-text-center"><img style="width:100%" src="` + row[2] + `"></div>
                                <div class="uk-text-center">Stadium:</div>
                                <div class="uk-text-center" style="font-size: 20px; color:black;">` + row[3] + `</div>
                                <div class="uk-text-center">Location:</div>
                                <div class="uk-text-center" style="font-size: 20px; color:black;">` + row[4] +`</div>
                            </div>
                            <button value="` + row[0] + `" onclick="createFavTeam(this);"><span class="like-icon" uk-icon="icon:heart; ratio:3"></span></button>
                        </div>
                    </div>
                    `

                    adminOutput3 += 
                    `<div style="margin: 10% auto;background-color:white;">
                        <div style="display:flex;flex-direction: column; align-items: center;margin:auto;">
                            <div style="width:80%;margin:auto;">
                                <div class="uk-text-center" style="font-size: 20px; color:black;">` + row[1] + `</div>
                                <div><img style="width:100%" src="` + row[2] + `"></div>
                                <div class="uk-text-center">Stadium:</div>
                                <div class="uk-text-center"style="font-size: 20px; color:black;">` + row[3] + `</div>
                                <div class="uk-text-center">Location:</div>
                                <div class="uk-text-center" style="font-size: 20px; color:black;">` + row[4] +`</div>
                            </div>
                            <button class="uk-button uk-button-primary uk-button-large uk-align-center" style="margin: 5% auto 0 auto;" onclick="openContent(event, 'updateTeam'); passTeamID(` + row[0] +`); hideNav()">Update this team</button>
                            <button class="uk-button uk-button-danger uk-button-large uk-align-center" style="margin: 5% auto;" onclick="deleteAdminTeam(` + row[0] + `)">Delete this team</button>
                        </div>
                    </div>
                    `

                    document.getElementById("teamInfo").innerHTML = output3;
                    document.getElementById("modify-teams").innerHTML = adminOutput3;
                    return true;
                });
            });
        } else {
            alert("failed to display");
        }
    });
}


/* ------------------------------------------------------ Display details ----------------------------------------------------  */

function matchInfo(info) {
    var output4 = "";
    var passDetails = {
        "info": info
    }
    fetch('api/api.php?action=displayInfo',
    {
        method: 'POST',
        body: JSON.stringify(passDetails),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 202) {
            response.json().then(function(data) {
                data.forEach(row => {
                    output4 +=
                    `<div style="margin: 10% auto;background-color:white; text-align:center;">
                        <div>
                            <div>MatchID</div>
                            <div style="font-size: 20px; color:black;">` + row.MatchInfoID + `</div>
                        </div>
                        <div style="display:flex;dlex-direction: column; align-items: center;">
                            <div style="width:40%;margin:auto;">
                                <div>Home</div>
                                <div style="font-size: 20px; color:black;">` + row[2] + `</div>
                                <div><img style="width:100%" src="` + row[3] + `"></div>
                            </div>
                        <div style="width: 20%;align-content: center;">VS</div>
                            <div style="width: 40%;margin:auto;">
                                <div>Away</div>
                                <div style="font-size: 20px; color:black;">` + row[4] + `</div>
                                <div><img style="width:100%" src="` + row[5] +`"></div>
                            </div>
                        </div>
                        <div>
                            <div>Date:</div>
                            <div style="font-size: 20px; color:black;">` + row[1] +`</div>
                        </div>
                        <div>
                            <div>Stadium:</div>
                            <div style="font-size: 20px; color:black;">` + row[7] +`</div>
                        </div>
                        <div>
                            <div>Location:</div>
                            <div style="font-size: 20px; color:black;">` + row[8] +`</div>
                        </div>
                        <div>
                            <div>Cost:</div>
                            <div style="font-size: 20px; color:black;">` + row[6] +`</div>
                        </div>
                        <p class="uk-text-center">
                            <button class="uk-button uk-button-default uk-modal-close" type="button">Back</button>
                            <button class="uk-button uk-button-danger uk-button-small moreInfo" type="button" onclick="openContent(event, 'ticket'); passInfo(` + row.MatchInfoID + `)">Buy a ticket</button>
                        </p>
                    </div>
                    `
                    document.getElementById("matchInfoDetail").innerHTML = output4;
                    return true;
                });
            });
        } else {
            alert("failed to display");
        }
    });
}


/* ------------------------------------------------------ Pass Display details ----------------------------------------------------  */

function passMatchInfo(infoID) {
    var output8 = "";
    var passDetails = {
        "infoID": infoID
    }
    fetch('api/api.php?action=ticketDisplayInfo',
    {
        method: 'POST',
        body: JSON.stringify(passDetails),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 202) {
            response.json().then(function(data) {
                data.forEach(row => {
                    output8 +=
                    `<div style="margin: 10% auto;background-color:white; text-align:center;">
                        <div>
                            <div>MatchID</div>
                            <div style="font-size: 20px; color:black;">` + row.MatchInfoID + `</div>
                        </div>
                        <div style="display:flex;dlex-direction: column; align-items: center;">
                            <div style="width:40%;margin:auto;">
                                <div>Home</div>
                                <div style="font-size: 20px; color:black;">` + row[2] + `</div>
                                <div><img style="width:100%" src="` + row[3] + `"></div>
                            </div>
                        <div style="width: 20%;align-content: center;">VS</div>
                            <div style="width: 40%;margin:auto;">
                                <div>Away</div>
                                <div style="font-size: 20px; color:black;">` + row[4] + `</div>
                                <div><img style="width:100%" src="` + row[5] +`"></div>
                            </div>
                        </div>
                        <div>
                            <div>Date:</div>
                            <div style="font-size: 20px; color:black;">` + row[1] +`</div>
                        </div>
                        <div>
                            <div>Stadium:</div>
                            <div style="font-size: 20px; color:black;">` + row[7] +`</div>
                        </div>
                        <div>
                            <div>Location:</div>
                            <div style="font-size: 20px; color:black;">` + row[8] +`</div>
                        </div>
                        <div>
                            <div>Cost:</div>
                            <div style="font-size: 20px; color:black;">` + row[6] +`</div>
                        </div>
                        <p class="uk-text-center">
                            <button class="uk-button uk-button-default uk-modal-close" type="button">Back</button>
                        </p>
                    </div>
                    `
                    document.getElementById("matchInfoDetailTicket").innerHTML = output8;
                    return true;
                });
            });
        } else {
            alert("failed to display");
        }
    });
}




/* ------------------------------------------------------ Admin functions----------------------------------------------------  */




/* ------------------------------ login ---------------------------  */

function adminLogin() {
    var adminlogin = {
        'admin-login-uname' : document.getElementById("admin-login-uname").value,
        'admin-login-pword' : document.getElementById("admin-login-pword").value
    }

    fetch('api/api.php?action=adminLogin',
    {
        method: "POST",
        body: JSON.stringify(adminlogin),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 401) {
            alert('Authentication failed', 'warning');
            return;
        }
        if(response.status === 202) {
            alert("Hello! admin!");
            hideNav(); 
            document.getElementById("admin-login").style.display = "none";
            document.getElementById("admin-panel").style.display = "block";
            return;
        }
    })
    return false;
}

/* ------------------------------ logout ---------------------------  */

    function adminLogout() {
        fetch('api/api.php?action=adminLogout', {
            method: 'GET',
            credentails: 'same-origin'
        }
        ).then(function(response) {
            if(response.status === 202) {
                alert("logged out!");
                document.getElementById("admin-login").style.display = "block";
                document.getElementById("admin-panel").style.display = "none";
                return true;
            } else {
                alert("logging out error");
                return false;
            }
        })
    }



/* ------------------------------ Display match---------------------------  */

function adminDisplayMatch() {
    let adminOutput = ""
    fetch('api/api.php?action=adminDisplayMatch',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 202) {
            response.json().then(function(data) {
                data.forEach(row => {
                    adminOutput +=
                    `<div style="margin:10% auto;background-color:white;">
                        <div class="uk-align-center">
                            <div>MatchID</div>
                            <div style="font-size: 20px; color:black;">` + row.MatchInfoID + `</div>
                        </div>
                        <div style="display:flex;dlex-direction: column; align-items: center;">
                            <div style="width:40%;margin:auto;">
                                <div>Home</div>
                                <div style="font-size: 20px; color:black;">` + row[2] + `</div>
                                <div><img style="width:100%" src="` + row[1] + `"></div>
                            </div>
                            <div style="width: 20%;align-content: center;">VS</div>
                            <div style="width: 40%;margin:auto;">
                                <div>Away</div>
                                <div style="font-size: 20px; color:black;">` + row[4] + `</div>
                                <div><img style="width:100%" src="` + row[3] +`"></div>
                            </div>
                        </div>
                        <button class="uk-button uk-button-primary uk-button-large uk-align-center displaycontent" style="margin: 5% auto 0 auto;" onclick="openContent(event, 'updateMatch'); passMatchID(` + row.MatchInfoID +`); hideNav()">Update this match</button>
                        <button class="uk-button uk-button-danger uk-button-large uk-align-center displaycontent" style="margin: 5% auto;" onclick="deleteAdminMatch(` + row.MatchInfoID + `)">Delete this match</button>
                    </div>
                    `
                    document.getElementById("modify-matches").innerHTML = adminOutput;
                    return true;
                });
            });
        } else {
            console.log("failed to display");
        }
    });
}



/* ------------------------------ Insert match ---------------------------  */ 

    function insertMatch() {
        var ins = {
            'date': document.getElementById("matchDate").value,
            'homeTeamID': document.getElementById("homeTeamID").value,
            'awayTeamID': document.getElementById("awayTeamID").value,
            'cost': document.getElementById("cost").value,
            'stadiumID': document.getElementById("stadiumID").value,
        }
        
        fetch('api/api.php?action=adminInsert', {
            method: 'POST',
            body: JSON.stringify(ins),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            if(response.status === 202) {
                alert("The new match was inserted!");
                document.getElementById("admin-login").style.display = "block";
                document.getElementById("admin-panel").style.display = "none";
                return true;
            } else {
                alert("Inserting error!");
                return false;
            }
        })
    }

/* ------------------------------ Delete match ---------------------------  */

    function deleteAdminMatch(num){
        var matchNum = {
            "matchID": num
        }
        fetch('api/api.php?action=adminDelete',
    {
        method: 'POST',
        body: JSON.stringify(matchNum),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            alert("The match was deleted!");
            document.getElementById("login").style.display = "block";
            document.getElementById("profile").style.display = "none";
            return;
        } else {
            document.getElementById("profile").style.display = "block";
            showNav()
            alert("failed to delete the match");
        }
    })
}

/* ------------------------------ Update match ---------------------------  */

    function updateAdminMatch(matchNum){
        var updateInfo = {
            'matchID': matchNum,
            'updateDate': document.getElementById("updateMatchDate").value,
            'updateHomeTeamID': document.getElementById("updateHomeTeamID").value,
            'updateAwayTeamID': document.getElementById("updateAwayTeamID").value,
            'updateCost': document.getElementById("updateCost").value,
            'updateStadiumID': document.getElementById("updateStadiumID").value
        }
        fetch('api/api.php?action=adminUpdate',
    {
        method: 'POST',
        body: JSON.stringify(updateInfo),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            alert("The match was updated!");
            document.getElementById("login").style.display = "block";
            document.getElementById("profile").style.display = "none";
            return;
        } else {
            document.getElementById("profile").style.display = "block";
            showNav()
            alert("failed to update the match");
        }
    })
}




/* ------------------------------ Display Team ---------------------------  */

function adminDisplayTeam() {
    var adminOutput3 = "";
    fetch('api/api.php?action=adminDisplayTeam',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 200) {
            response.json().then(function(data) {
                data.forEach(row => {
                    adminOutput3 += 
                    `<div style="margin: 10% auto;background-color:white;">
                        <div style="display:flex;flex-direction: column; align-items: center;margin:auto;">
                            <div style="width:80%;margin:auto;">
                                <div class="uk-text-center" style="font-size: 20px; color:black;">` + row[1] + `</div>
                                <div><img style="width:100%" src="` + row[2] + `"></div>
                                <div class="uk-text-center">Stadium:</div>
                                <div class="uk-text-center"style="font-size: 20px; color:black;">` + row[3] + `</div>
                                <div class="uk-text-center">Location:</div>
                                <div class="uk-text-center" style="font-size: 20px; color:black;">` + row[4] +`</div>
                            </div>
                            <button class="uk-button uk-button-primary uk-button-large uk-align-center" style="margin: 5% auto 0 auto;" onclick="openContent(event, 'updateTeam'); hideNav(); passTeamID(` + row[0] +`);">Update this team</button>
                        <button class="uk-button uk-button-danger uk-button-large uk-align-center" style="margin: 5% auto;" onclick="deleteAdminTeam(` + row[0] + `)">Delete this team</button>
                        </div>
                    </div>
                    `

                    document.getElementById("modify-teams").innerHTML = adminOutput3;
                    return true;
                });
            });
        } else {
            alert("failed to display");
        }
    });
}


/*
function adminDisplayTeam() {
    var adminOutput3 = "";
    fetch('api/api.php?action=adminDisplayTeam',
    {
        method: 'GET',
        credentails: 'same-origin'
    }
    ).then(function(response) {
        if(response.status === 200) {
            response.json().then(function(data) {
                data.forEach(row => {
                    adminOutput3 += 


                

            ReactDOM.render(
                <App />,
                document.getElementById('root')
            );

            function App() {
                return (
                <div>
                    <Team 
                        teamName = "Manchester United"
                        img = "view/images/logo/manU.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "2"
                    />
                    <Team 
                        teamName = "Chelsea"
                        img = "view/images/logo/chelsea.jpg"
                        stadium = "Stamford Bridge"
                        location = "Fulham, London, SW6, England"
                        value= "4"    
                    />
                    <Team 
                        teamName = "Liverpool"
                        img = "view/images/logo/liverpool.png"
                        stadium = "liverpool"
                        location = "Anfield, liverpool, merseyside, England"
                        value= "1"
                    />
                    <Team 
                        teamName = "Manchester City"
                        img = "view/images/logo/manC.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "2"
                    />
                    <Team 
                        teamName = "Arsenal"
                        img = "view/images/logo/arsenal.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "8"
                    />
                    <Team 
                        teamName = "Tottenham Hotspur"
                        img = "view/images/logo/tottenham.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "6"
                    />
                    <Team 
                        teamName = "Leicester"
                        img = "view/images/logo/Leicester.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "5"
                    />
                    <Team 
                        teamName = "Wolverhampton"
                        img = "view/images/logo/Wolverhampton.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "7"
                    />
                    <Team 
                        teamName = "Sheffield United"
                        img = "view/images/logo/SheffieldUnited.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "9"
                    />
                    <Team 
                        teamName = "Burnley"
                        img = "view/images/logo/Burnley.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "10"
                    />
                    <Team 
                        teamName = "Southampton"
                        img = "view/images/logo/Southampton.jpeg"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "11"
                    />
                    <Team 
                        teamName = "Everton"
                        img = "view/images/logo/Everton.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "12"
                    />
                    <Team 
                        teamName = "Newcastle"
                        img = "view/images/logo/Newcastle.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "13"
                    />
                    <Team 
                        teamName = "Crystal Palace"
                        img = "view/images/logo/CrystalPalace.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "14"
                    />
                    <Team 
                        teamName = "Brighton"
                        img = "view/images/logo/Brighton.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "15"
                    />
                    <Team 
                        teamName = "West Ham"
                        img = "view/images/logo/Westham.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "16"
                    />
                    <Team 
                        teamName = "Aston Villa"
                        img = "view/images/logo/AstonVilla.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "17"
                    />
                    <Team 
                        teamName = "Bournemouth"
                        img = "view/images/logo/Bournemouth.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "18"
                    />
                    <Team 
                        teamName = "Watford"
                        img = "view/images/logo/Watford.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "19"
                    />
                    <Team 
                        teamName = "Norwich"
                        img = "view/images/logo/Norwich.png"
                        stadium = "Old Trafford"
                        location = "Sir Matt Busby Way, Old Trafford, Greater Manchester"
                        value= "20"
                    />
                </div>);
            }

            function Team(props) {
                return (
                <div className="teams manU">
                    <div className="teams-name">
                        <p>{props.teamName}</p>
                    </div>
                    <div className="teams-logo-img">
                        <img src={props.img} alt="" />
                    </div>
                    <div>
                        <p>Stadium: <br />{props.stadium}</p>
                    </div>
                    <div>
                        <p>Location: <br />{props.location}</p>
                    </div>
                    <div className="like-btn">
                        <button id="ManU-btn" value={props.value} onClick="createFavTeam(this)"><span className="like-icon" uk-icon="icon:heart; ratio:3"></span></button>
                    </div>
                </div>);
            }
        


                    document.getElementById("modify-teams").innerHTML = adminOutput3;
                    return true;
                });
            });
        } else {
            alert("failed to display");
        }
    });
}*/


/* ------------------------------ Insert Team ---------------------------  */

    function insertAdminTeam() {
        var insTeam = {
            "insertTeamName": document.getElementById("insertTeamName").value,
            "insertTeamStadiumID": document.getElementById("insertTeamStadiumID").value,
            "insertLogoImagePath": document.getElementById("insertLogoImagePath").value
        }
        console.log(insTeam)
        fetch('api/api.php?action=adminInsertTeam', 
        {
            method: 'POST',
            body: JSON.stringify(insTeam),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                alert("The new team was inserted!");
                document.getElementById("admin-login").style.display = "block";
                document.getElementById("admin-panel").style.display = "none";
                return
            } else {
                alert(response.status);
                return false;
            }
        })
    }

/* ------------------------------ Update Team ---------------------------  */

    function updateAdminTeam(teamNum) {
        var insTeam = {
            "teamNum": teamNum,
            "updateTeamName": document.getElementById("updateTeamName").value,
            "updateTeamstadiumID": document.getElementById("updateTeamstadiumID").value,
            "updatelogoImagePath": document.getElementById("updatelogoImagePath").value
        }
        console.log(insTeam)
        fetch('api/api.php?action=adminUpdateTeam', 
        {
            method: 'POST',
            body: JSON.stringify(insTeam),
            credentails: 'same-origin'
        }
        ).then(function(response) {
            response.json()
            if(response.status === 202) {
                alert("The team was updated!");
                adminDisplayTeam()
                document.getElementById("login").style.display = "none";
                document.getElementById("updateTeam").style.display = "none";
                document.getElementById("adminTeamInfo").style.display = "block";
                return;
            } else {
                alert(response.status);
                return false;
            }
        })
    }

/* ------------------------------ Delete Team ---------------------------  */

    function deleteAdminTeam(TeamNum){
        var TeamNum = {
            "deletematch": TeamNum
        }
        fetch('api/api.php?action=adminDeleteTeam',
    {
        method: 'POST',
        body: JSON.stringify(TeamNum),
        credentails: 'same-origin'
    }
    ).then(function(response) {
        response.json()
        if(response.status === 202) {
            alert("The team was deleted!");
            return;
        } else {
            alert("failed to delete the team");
        }
    })
}
