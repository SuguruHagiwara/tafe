<?php
require("db.php"); $db = new DatabaseObject;
require("se.php"); $_SESSION['se'] = new sessObj;
//session_start();

//sanitise data sent via POST and SEND
function testInput($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = htmlentities($data);
    return $data;
}



    if(!isset($_SESSION['se'])) {
        $_SESSION['se'] = new sessObj;
    }
    if (/*$_SESSION['se']->rate_limited() == true && */
    $_SESSION['se']->domainLock() ==true){
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
               $objJSON = json_decode(file_get_contents("php://input"), true);
       
               $loginUname = testInput($objJSON['login-uname']);
               $loginPword = testInput($objJSON['login-pword']);
        print_r($objJSON);
                   if($db->checkUserAccount($loginUname, $loginPword)) {
                       http_response_code(202);
                   } else {
                       http_response_code(401);
                   }
       
               
            break;
       
            case 'logout':
               if($_SESSION['se']->is_logged_in()) {
                   if($_SESSION['se']->logout()) {
                       http_response_code(202);
                   } else {
                       http_response_code(406);
                   }
               }
            break;
       
       
            case 'ticket':
               if($_SESSION['se']->is_logged_in()) {
       
                   $ticket = json_decode(file_get_contents("php://input") , true);
                   echo $ticket;
       
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
            break;
       
            case 'registration':
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
               case 'information':
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
            }
        }




?>

 