<?php
require("db.php"); $db = new dbObj;
require("se.php"); $_SESSION['se'] = new sessObj;
 if(!isset($_GET['action'])) {
    http_response_code(501);
    die;
 }
 switch ($_GET['action']) {
     case 'login':
        $objJSON = json_decode(file_get_contents("php://input"), true);

        $loginUname = $objJSON['login-uname'];
        $loginPword = $objJSON['login-pword'];

        //if(isset($objJSON['login-uname']) && isset($objJSON['login-pword'])) {
            if($db->checkUserAccount($loginUname, $loginPword) == true) {
                header('location:view/pages/home.html');
                http_response_code(202);
            } else {
                http_response_code(401);
            }
        /*} else {
            http_response_code(401);
        }*/
        
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
     /*case 'info':
        if($_SESSION['se']->is_logged_in()) {
                if($db->getInfo()) {
                    http_response_code(202);
                } else {
                    http_response_code(406);
                }
         } else {
            http_response_code(401);
        }


     break;*/
     case 'like':
        if($_SESSION['se']->is_logged_in()) {
            $likeobj = json_decode(file_get_contents("php://input"), true);

            //echo $obj2 = json_encode($obj);

                if($db->likeTheTeam($likeobj)) {
                    http_response_code(202);
                } else {
                    http_response_code(406);
                }
         } else {
            http_response_code(401);
        }

    break;
    /*case 'liked':

        if($_SESSION['se']->is_logged_in()) {

                if() {
                    http_response_code(202);
                } else {
                    http_response_code(406);
                }
         } else {
            http_response_code(401);
        }


     break;*/
     /*case 'team':
        if($_SESSION['se']->is_logged_in()) {
                if($db->displayTeam()) {
                    http_response_code(202);
                } else {
                    http_response_code(406);
                }
         } else {
            http_response_code(401);
        }

     break;*/
     case 'ticket':
        if($_SESSION['se']->is_logged_in()) {
            $ticketobj = json_decode(file_get_contents("php://input"), true);

            $amount = $ticketobj['amount'];
            $seat = $ticketobj['seat'];
            $method = $ticketobj['method'];
            
                if($db->buyTicket($amount, $seat, $method)) {
                    http_response_code(202);
                } else {
                    http_response_code(406);
                }
         } else {
            http_response_code(401);
        }
     break;


     break;
     case 'registration':
        if(!$_SESSION['se']->is_logged_in()) {
            $obj2 = json_decode(file_get_contents("php://input"), true);

            $uname = $obj2['uname'];
            $pword = $obj2['pword'];
            $fname = $obj2['fname'];
            $lname = $obj2['lname'];
            $email = $obj2['email'];
            $phone = $obj2['phone'];
            $address = $obj2['address'];
            
            /*if(!isset($obj2['uname']) && !isset($obj2['pword']) && !isset($obj2['fname'])){
                http_response_code(406);
            } else {*/
                if($db->register($uname, $pword, $fname, $lname, $email, $phone, $address)) {
                    http_response_code(202);
                } else {
                    http_response_code(406);
                }
         } else {
            http_response_code(401);
        }
     break;
 }