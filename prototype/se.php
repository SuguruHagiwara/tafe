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

    // logging 

    function logging() {

        /*if(!isset($_SESSION['se'])) {
            $_SESSION['se'] = new sessObj();
        }
        if($_SESSION['se']->session_ok() == true) {*/
            $ip = $_SERVER['REMOTE_ADDR'];
            $time = $_SERVER['REQUEST_TIME'];
            $browser = $_SERVER['HTTP_USER_AGENT'];
            $action = $_SERVER['PHP_SELF'];
            $userID = $_SESSION['UserID'];

            $db->loggingDb($ip, $time, $browser, $action, $userID);
            return true;
        }
    
    } /*else {
        return false;
    }*/

   // }


    //rate limiting per second

    function rate_limited(){    

        if (isset($_SESSION['LAST_CALL'])) {
          $last = strtotime($_SESSION['LAST_CALL']);
          $curr = strtotime(date());
          $sec =  abs($last - $curr);
          if ($sec <= 1) {
            $data = 'Rate Limit Exceeded';  // rate limit
            header('Content-Type: application/json');
            die (json_encode($data));        
          }
        }
        $_SESSION['LAST_CALL'] = date();
       
        // normal usage
        $data = "Data Returned from API";
        header('Content-Type: application/json');
        die(json_encode($data));
    }


    //rate limiting 1000 in a 24 hour

/*
A request to happen more than once per second. Throw an error if this happens
No more than 1000 requests per day. Test with maybe 10 requests per day first, so that you're not refreshing too often
In the first instance, we have to account for the time every request came in, then compare the current request with the last time one came in.

For part two, we need to log an array of all the requests made in the last 24 hours. Parse and rewrite this array every request to count the total elements.

*/


    //domain lock

    function domainLock() {
        $referer = $_SERVER['HTTP_REFERER'];
        $url = parse_url($referer);
        if($url['host'] == ""){
            die("not available url");
        }
     }



    


?>