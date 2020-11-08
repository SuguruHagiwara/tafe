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
    } else {
        return false;
    }
    if(!isset($_GET['action'])) {
        http_response_code(501);
        die;
    } else {
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
       
            case 'ticket':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
            
                        $ticket = json_decode(file_get_contents("php://input") , true);
            
                        $amount = testInput($ticket['amount']);
                        $seat = testInput($ticket['seat']);
                        $method = testInput($ticket['method']);
                        $matchID = testInput($ticket['matchID']);
                        $userID = $_SESSION['UserID'];
                        
                            if($db->buyTicket($amount, $seat, $method, $matchID, $userID)) {
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

            case 'information':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
                        $info = json_decode(file_get_contents("php://input"), true);
                        
                        $gameNum = $info['game'];
                        
                            if($db->getGameInfo($gameNum)) {
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

            case 'favTeam':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
                        $favTeam = json_decode(file_get_contents("php://input"), true);
                        
                        $favoriteTeam = $favTeam['favTeam'];

                        print_r($favoriteTeam);

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

            case 'deleteFavTeam':
                if($_SERVER['REQUEST_METHOD'] == 'GET') {
                    if($_SESSION['se']->is_logged_in()) {
                        $favTeam = json_decode(file_get_contents("php://input"), true);
                        
                        $favoriteTeam = $favTeam['favTeam'];

                        print_r($favoriteTeam);

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

            case 'updateFavTeam':
                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if($_SESSION['se']->is_logged_in()) {
                        $favTeam = json_decode(file_get_contents("php://input"), true);
                        
                        $favoriteTeam = $favTeam['favTeam'];

                        print_r($favoriteTeam);

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


?>
 