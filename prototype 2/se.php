<?php

require("db.php"); $dbconn = new dbObj;
require("se.php"); $_SESSION['se'] = new sessObj;

class sessObj {

    function is_logged_in() {
        if(login() == true) {
            return true;
        }
    }

    function login() {
        global $db;
        $db->checkUserAccount();
        return true;
    }

    function logout() {
        session_start();
        session_unset();
        session_destroy();
        echo "You are now logout!";
        return true;
    }



    // logging 
    function logging() {
    try {
        if(!isset($_SESSION['se'])) {
            $_SESSION['se'] = new sessObj();
        }
        if($_SESSION['se']->session_ok() == true) {
            $ip = $_SERVER['REMOTE_ADDR'];
            $browser = $_SERVER['HTTP_USER_AGENT'];
            $time = $_SERVER['REQUEST_TIME'];
            $action = $_SERVER['PHP_SELF'];
            $dbconn->logginDb($ip,$time,$browser,$action);
            return true;
    } else {
        throw new APIException("401, not authorised");
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
        session_start();
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




    //domain lock

    function domainLock() {
        $referer = $_SERVER['HTTP_REFERER'];
        if($referer == "http://localhost:8888"){
            $url = parse_url($referer);

            if($url == "") {
                
            }
        }

    }
    
}
}






    


    

    class gaqsession {

        public $lastrequest;

        public function __construct() {
            $this->lastrequest = time();
        }
        public function ratelimited() {
            if($this->lastrequest == time()) {
                $this->lastrequest = time();
                return true;
            } else {
                $this->lastrequest = time();
            return false;
            } 
        }
    }



    
    function used_referrer() {
        class RateLimitCounter
        {
            // The time -> request count data
            private $timeline = [];
        
            /**
             * Log an event in the timeline
             */
            public function increment()
            {
                $now = time();
                if (!array_key_exists($now, $this->timeline))
                {
                    $this->timeline[$now] = 0;
                }
        
                $this->timeline[$now]++;
            }
        
            /**
             * Return the total number of events logged in the counter
             * @return int
             */
            public function getTotal()
            {
                return array_sum($this->timeline);
            }
        
            /**
             * Remove any timeline data older than 24 hours
             */
            private function trim()
            {
                // Get the current time
                $now = time();
        
                // Time is in seconds, so subtract 1 day worth of seconds
                $timeFloor = $now - 86400;
        
                // Filter out all timeline entries more than 24 hours old
                $this->timeline = array_filter($this->timeline, function ($key) use ($timeFloor) {
                    return $key > $timeFloor;
                }, ARRAY_FILTER_USE_KEY);
            }
        
            public function __serialize(): array
            {
                return [
                    'timeline' => $this->timeline
                ];
            }
        
            /**
             * Wake up! Set the timeline data and trim data older than 24 hours
             * @param array $data
             */
            public function __unserialize(array $data): void
            {
                $this->timeline = $data['timeline'];
        
                $this->trim();
            }
        }
        
        /**
         * Verify that the rate limit has not been exceeded. Bail out if it has been.
         * @param $counter
         * @return bool
         */
        function rateLimit($counter)
        {
            $limit = 1000;
            if ($counter->getTotal() > $limit)
            {
                // Do whatever you need to here, throw an exception, redirect to an error page, etc.
                exit('Rate limit exceeded' . PHP_EOL);
            }
        
            return true;
        }
        
        /*
         * Instantiate a counter - this is what you would do if you do not already have one on the session
         */
        $counter = new RateLimitCounter();
        
        /*
         * Simulate some prior activity
         * Let's get close to the limit then save to the "session"
         */
        for ($i = 0; $i <= 995; $i++)
        {
            $counter->increment();
        }
        
        // Mock session
        $dummySession = ['counter' => $counter];
        
        // Serialize the session
        $serializedSession = serialize($dummySession);
        
        // Unserialize the session
        $session = unserialize($serializedSession);
        
        $counter = $session['counter'];
        
        // Do API calls until we hit our limit. There should be 5 remaining.
        while (rateLimit($counter))
        {
            apiCall();
        
            // Don't forget to increment the counter for each call
            $counter->increment();
        }
        
        // Dummy function to simulate your API call
        function apiCall()
        {
            echo 'Doing something interesting' . PHP_EOL;
        }
    }

   


?>