<?php
    session_start();
class sessObj {

    
    public $limit;
    public $lastTime;


    public function __construct() {
        $this->limit = array("");
        $_SESSION["last_session_request"] = time();
        $this->lastTime = $_SESSION["last_session_request"];
    }

    

    function is_logged_in() {
        if(isset($_SESSION['login'])) {
            if($_SESSION['login'] == true) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    function login() {
        $_SESSION["last_session_request"] = time();
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


    //  step one is there a session of last request
    if(isset($_SESSION["last_session_request"])) {
        // is last request the same as now?]
        if($_SESSION["last_session_request"] > time() - 1) {
            die ("Rate Limit Exceeded");  
        } else {
            // if yes rate limit else OK
            return true;
        }
    } else {

    // take now the last visit
        $_SESSION["last_session_request"] = time();
    }

}




    //Rate limiting 1000 in a 24 hour

    function rateLimitingthousand() {
            $time = time();
            array_push($this->limit, $time);
            $limitCount = count($this->limit);

            echo $this->lastTime;
            echo time();
        
            if(time() - $this->lastTime < 86400) {
                if ($limitCount > 1000) {
                    die ("Rate Limit Exceeded within 24 hours"); 
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
        



    //domain lock


    function domainLock() {
        
        if(!isset($data)) {
            $data = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER'] : "http://localhost:8888/prototype/";
        } else {
            die("not available url");
        }
        if($data = "127.0.0.1") {
            echo "you are allowed";
            return true;
        } else {
            die("not available url");
            return false;
        }
        if($data = "") {
            die("not available url");
            return false;
        } 
    }

}
    


?>