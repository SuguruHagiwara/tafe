<?php
require("se.php"); 
if(!isset($_SESSION['se'])) {
    $_SESSION['se'] = new sessObj;
} 
require("db.php"); $db = new DatabaseObject;


//sanitise data sent via POST
function testInput($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = htmlentities($data);
    return $data;
}



if ($_SESSION['se']->rate_limited() == true &&
    $_SESSION['se']->rateLimitingthousand() == true && 
    $_SESSION['se']->domainLock() == true){


        $_SESSION['se']->login();
        $ip = $_SERVER['REMOTE_ADDR'];
        $time = $_SERVER['REQUEST_TIME'];
        $browser = $_SERVER['HTTP_USER_AGENT'];
        $action = $_SERVER['QUERY_STRING'];
        
        $db->loggingDb($ip, $time, $browser, $action);

    if(!isset($_GET['action'])) {
        http_response_code(501);
        die;
    } else {
        //On the first if statement inside the switch statement, each case is checking if the request is whether POST or GET using $SERVER[REQUEST_METHOD]. If the request method is wrong, it will return die.
        switch ($_GET['action']) {
            case 'login':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    $objJSON = json_decode(file_get_contents("php://input"), true);

                    $loginUname = testInput($objJSON['login-uname']);
                    $loginPword = testInput($objJSON['login-pword']);
     
                        if($db->checkUserAccount($loginUname, $loginPword)) {
                            http_response_code(202);
                        } else {
                            http_response_code(401);
                        }
                } else {
                    die ("Request method is wrong"); 
                }
               
            break;
       
            case 'logout':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        if($_SESSION['se']->logout()) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    }
                } else {
                    die ("Request method is wrong"); 
                }

            break;

            case 'registration':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
                        $obj2 = json_decode(file_get_contents("php://input"), true);

                        $uname = testInput($obj2['uname']);
                        $pword = testInput($obj2['pword']);
                        $fname = testInput($obj2['fname']);
                        $lname = testInput($obj2['lname']);
                        $email = testInput($obj2['email']);
                        $phone = testInput($obj2['phone']);
                        $address = testInput($obj2['address']);
                        
                        if(!isset($obj2['uname']) && !isset($obj2['pword']) && !isset($obj2['fname'])){
                            http_response_code(406);
                        } else {
                            if($db->register($uname, $pword, $fname, $lname, $email, $phone, $address)) {
                                http_response_code(202);
                            } else {
                                http_response_code(406);
                            }
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;
       
            case 'buyTicket':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
                        $ticket = json_decode(file_get_contents("php://input") , true);
                        $amount = testInput($ticket['amount']);
                        $seat = testInput($ticket['seat']);
                        $method = testInput($ticket['method']);
                        $matchID = testInput($ticket['matchid']);
                        $userID = $_SESSION['UserID'];
                        
                            if($db->buyTicketDb($amount, $seat, $method, $matchID, $userID)) {
                                http_response_code(202);
                            } else {
                                http_response_code(406);
                            }
                        } else {
                        http_response_code(402);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'displayTicket':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        if($db->displayTicketDB()) {
                            $ticketResult2 = $db->displayTicketDB();
                            echo json_encode($ticketResult2);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }

                } else {
                    die ("Request method is wrong");
                }
            break;


            case 'deleteTicket':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        if($db->deleteTicketDB()) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong");
                }
            break;

            case 'displayProfile':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        if($result = $db->displayProfileDB()) {
                            echo json_encode($result);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }

                } else {
                    die ("Request method is wrong");
                }
            break;

            case 'editUser':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if(isset($_SESSION['UserID'])) {
                        if($_SESSION['se']->is_logged_in()) {
                            $editUserAccount = json_decode(file_get_contents("php://input"), true);
    
                            $editFName = testInput($editUserAccount['editFName']);
                            $editLName = testInput($editUserAccount['editLName']);
                            $editEmail = testInput($editUserAccount['editEmail']);
                            $editPhone = testInput($editUserAccount['editPhone']);
                            $editAddress = testInput($editUserAccount['editAddress']);
    
                            if($db->editUserAccount($editFName, $editLName, $editEmail, $editPhone, $editAddress)) {
                                
                                http_response_code(202);
                            } else {
                                http_response_code(406);
                            }
                        } else {
                            http_response_code(401);
                        }
                    } else {
                        die ("You are not logged in"); 
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'deleteUser':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        if($db->deleteUserAccount()) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'favTeam':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
                        $favTeam = json_decode(file_get_contents("php://input"), true);
                        $favoriteTeam = $favTeam['favTeam'];

                        if($db->createFavoriteTeam($favoriteTeam)) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'displayFavTeam':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {

                        if($db->displayFavoriteTeam()) {
                            $favResult = $db->displayFavoriteTeam();
                            echo json_encode($favResult);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }

                    } else {
                        http_response_code(401);
                    }

                } else {
                    die ("Request method is wrong");
                }
            break;

            case 'deleteFavTeam':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        /*$deleteFavTeam = json_decode(file_get_contents("php://input"), true);             
                        $deletefavoriteTeam = $deleteFavTeam ['deleteFavTeam'];*/
                        if($db->deleteFavoriteTeam()) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'updateFavTeam':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
                        $favTeamNum = json_decode(file_get_contents("php://input"), true);
                        
                        $favoriteTeamNum = $favTeamNum['updateFavTeam'];

                        if($db->updateFavoriteTeam($favoriteTeamNum)) {
                            /*$updatefavResult = $db->updateFavoriteTeam();
                            echo json_encode($updatefavResult);*/
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'displayTeam':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        if($db->displayTeamDB()) {
                            $teamResult = $db->displayTeamDB();
                            echo json_encode($teamResult);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }

                } else {
                    die ("Request method is wrong");
                }
            break;

            case 'displayMatch':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        if($db->displayMatchDB()) {
                            $matchResult = $db->displayMatchDB();
                            echo json_encode($matchResult);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }

                } else {
                    die ("Request method is wrong");
                }
            break; 
            
            case 'passInfo':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {

                        $passInfo = json_decode(file_get_contents("php://input"), true);

                        $matchNum = $passInfo['matchNum'];

                        if($db->passInfoDB($matchNum)) {
                            $passResult = $db->passInfoDB($matchNum);
                            echo json_encode($passResult);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }

                } else {
                    die ("Request method is wrong");
                }
            break;   
         
            case 'displayTeam':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                            $db->displayTeamDB();
                            $teamResult = $db->displayTeamDB();
                            echo json_encode($teamResult);
                            http_response_code(202);
                    } else {
                    http_response_code(406);
                    }
                } else {
                    die ("Request method is wrong");
                }
            break; 

            case 'displayInfo':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {

                        $passDetailInfo = json_decode(file_get_contents("php://input"), true);

                        $matchDetail = $passDetailInfo['info'];

                        if($db->passDetailDB($matchDetail)) {
                            $passDetailResult = $db->passDetailDB($matchDetail);
                            echo json_encode($passDetailResult);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                    http_response_code(406);
                    }
                } else {
                    die ("Request method is wrong");
                }
            break; 

            case 'ticketDisplayInfo':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {

                        $passTicketDetailInfo = json_decode(file_get_contents("php://input"), true);

                        $matchTicketDetail = $passTicketDetailInfo['infoID'];

                        if($db->passTicketDetailDB($matchTicketDetail)) {
                            $passTicketDetailResult = $db->passTicketDetailDB($matchTicketDetail);
                            echo json_encode($passTicketDetailResult);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                    http_response_code(406);
                    }
                } else {
                    die ("Request method is wrong");
                }
            break;
        }
    }

} else {
    http_response_code(400);
}

if($_SESSION['se']->domainLock() == true){
    if(!isset($_GET['action'])) {
        http_response_code(501);
        die;
    } else {
        switch ($_GET['action']) {
            case 'adminLogin':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    $adminJSON = json_decode(file_get_contents("php://input"), true);

                    $adminLoginUname = testInput($adminJSON['admin-login-uname']);
                    $adminLoginPword = testInput($adminJSON['admin-login-pword']);
     
                        if($db->checkAdminAccount($adminLoginUname, $adminLoginPword)) {
                            http_response_code(202);
                        } else {
                            http_response_code(401);
                        }
                } else {
                    die ("Request method is wrong"); 
                }
               
            break;
       
            case 'adminLogout':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        if($_SESSION['se']->adminlogout()) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    }
                } else {
                    die ("Request method is wrong"); 
                }

            break;

            
            case 'adminDisplayMatch':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        if($db->adminDisplayMatchDB()) {
                            $matchResult = $db->adminDisplayMatchDB();
                            echo json_encode($matchResult);
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }

                } else {
                    die ("Request method is wrong");
                }
            break;

            case 'adminInsert':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        $adminInsert = json_decode(file_get_contents("php://input"), true);

                        $insertDate = testInput($adminInsert['date']);
                        $insertHomeTeamId = testInput($adminInsert['homeTeamID']);
                        $insertAwayTeamId = testInput($adminInsert['awayTeamID']);
                        $insertCost = testInput($adminInsert['cost']);
                        $insertStadiumId = testInput($adminInsert['stadiumID']);

                        if($db->adminInsertMatch($insertDate, $insertHomeTeamId, $insertAwayTeamId, $insertCost, $insertStadiumId)) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'adminDelete':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        $adminobj2 = json_decode(file_get_contents("php://input"), true);

                        $matchNum = testInput($adminobj2['matchID']);
                        if($db->adminDeleteMatch($matchNum)) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'adminUpdate':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        $adminUpdate = json_decode(file_get_contents("php://input"), true);

                        $updateId = $adminUpdate['matchID'];
                        $updateDate = testInput($adminUpdate['updateDate']);
                        $updateHomeTeamId = testInput($adminUpdate['updateHomeTeamID']);
                        $updateAwayTeamId = testInput($adminUpdate['updateAwayTeamID']);
                        $updateCost = testInput($adminUpdate['updateCost']);
                        $updateStadiumId = testInput($adminUpdate['updateStadiumID']);

                        if($db->adminUpdateMatch($updateId, $updateDate, $updateHomeTeamId, $updateAwayTeamId, $updateCost, $updateStadiumId)) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;


            case 'adminDisplayTeam':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->adminLoggedIn()) {
                            $db->adminDisplayTeamDB();
                            $teamResult = $db->adminDisplayTeamDB();
                            echo json_encode($teamResult);
                            http_response_code(202);
                    } else {
                    http_response_code(406);
                    }
                } else {
                    die ("Request method is wrong");
                }
            break;

            case 'adminInsertTeam':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        $adminInsertTeam = json_decode(file_get_contents("php://input"), true);
                        echo $adminInsertTeam;
                        $insertTeam = testInput($adminInsertTeam['insertTeamName']);
                        $insertStadiumId = testInput($adminInsertTeam['insertTeamStadiumID']);
                        $insertImagePath = testInput($adminInsertTeam['insertLogoImagePath']);

                        if($db->adminInsertTeam($insertTeam, $insertStadiumId, $insertImagePath)) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'adminUpdateTeam':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        $adminUpdateTeam = json_decode(file_get_contents("php://input"), true);

                        $updateTeamNum = testInput($adminUpdateTeam['teamNum']);
                        $updateTeam = testInput($adminUpdateTeam['updateTeamName']);
                        $updateStadiumId = testInput($adminUpdateTeam['updateTeamstadiumID']);
                        $updateImagePath = testInput($adminUpdateTeam['updatelogoImagePath']);

                        if($db->adminUpdateTeam($updateTeamNum, $updateTeam, $updateStadiumId, $updateImagePath)) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;

            case 'adminDeleteTeam':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->adminLoggedIn()) {
                        $TeamNum = json_decode(file_get_contents("php://input"), true);

                        $TeamNum2 = testInput($TeamNum['deletematch']);

                        if($db->adminDeleteTeam($TeamNum2)) {
                            http_response_code(202);
                        } else {
                            http_response_code(406);
                        }
                    } else {
                        http_response_code(401);
                    }
                } else {
                    die ("Request method is wrong"); 
                }
            break;
            
        }
    }
} 
?>
 
