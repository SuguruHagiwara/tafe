<?php
    session_start();
class sessObj {



    function is_logged_in() {
        //if($_SESSION['se']->login() == true) {
            return true;
        //}
    }

    function login() {
        //global $dbconn;
        
        $_SESSION['se']->logging();
        return true;
    }

    function logout() {
        session_unset();
        session_destroy();
        echo "You are now logout!";
        return true;
    }



    function session_ok() {
        if(isset($_SESSION['User']) && isset($_SESSION['UserID']) && isset($_SESSION['login'])) {
            return true;
        } else {
            echo "Session is not applied";
        }
    }



    //rate limiting per second


    function rate_limited(){   
        
        date_default_timezone_set('Asia/Tokyo');

    
/*
        $_SESSION['last_session_request'] = time();
        
        if($_SESSION['last_session_request'] > time() - 1){
        die();
        }
        
        echo $_SESSION['last_session_request'];
        
*/

    
        if (isset($_SERVER['REQUEST_TIME'])) {
            $requestTime = $_SERVER['REQUEST_TIME'];
            $currentTime = strtotime("now");
          $sec =  abs($requestTime - $currentTime);
          echo $sec;
          if ($sec <= 1) {
            die ("Rate Limit Exceeded");        
          } else {
              return true;
          }
        }
       
        // normal usage
        /*$data = "Data Returned from API";
        header('Content-Type: application/json');
        die(json_encode($data));
        return true;*/
    }


    //rate limiting 1000 in a 24 hour




    //domain lock

    function domainLock() {

        //print_r($_SERVER);
        //$referer = $_SERVER['HTTP_REFERER'];
        //$url = parse_url($referer);
        //echo $url;
        /*if($url == ""){
            die("not available url");
        } else {*/
            return true;
        }
    // }

    } 
    


?>