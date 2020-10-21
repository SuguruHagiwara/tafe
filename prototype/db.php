<?php
        //session_start();
        //require("se.php"); $_SESSION['se2'] = new sessObj;
class DatabaseObject {


    // DB connection

    private $dbconn;
    public function __construct() {
        $user = "root";
        $password = "suguruhagiwara";
        $dsn = "mysql:host=localhost; dbname=Prototype";

        $this->dbconn = new PDO($dsn, $user, $password);
        $this->dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->dbconn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        echo "<h1>Database is connected</h1><br>";
    }


    // Login check function

    function checkUserAccount($loginUname, $loginPword) {

        $sql = "SELECT UserID, UserName, Password FROM UserInformation WHERE UserName = :username";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':username', $loginUname);
        $stmt->execute();
        $row = $stmt->fetch();
        print_r($row);
        if(password_verify($loginPword, $row['Password'])) {
                // assign session variables
                $_SESSION['User'] = $loginUname;
                $_SESSION['UserID'] = $row["UserID"];
                //$_SESSION['login'] = true;

                //$_SESSION['se']->logging();
                echo "data is logged";
                return true;
            }
            else {
                return false;
            }
        }


    // Registration

    function register($uname, $pword, $fname, $lname, $email, $phone, $address) {

        // PDO is now required to insert
        $sql = "INSERT INTO UserInformation(UserName, Password, FirstName, LastName, Email, Phone, Address) VALUES (:uname, :pword, :fname, :lname, :email, :phone, :address)";
        $stmt = $this->dbconn->prepare($sql);
        //how do we stop SQL injection?
        $stmt->bindValue(':uname', $uname);
        $hpassword = password_hash($pword, PASSWORD_BCRYPT);
        $stmt->bindValue(':pword', $hpassword);
        $stmt->bindValue(':fname', $fname);
        $stmt->bindValue(':lname', $lname);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':phone', $phone);
        $stmt->bindValue(':address', $address);

        echo "new roll inserted";
        return $stmt->execute();
    }


    // Buy a ticket

    function buyTicket($amount, $seat, $method, $matchID, $userID) {

        $sql = "INSERT INTO TicketInformation(PurchasedAmount, SeatNumber, PaymentMethod, UserID, MatchInfoID) VALUES (:amount, :seat, :method, :userID, :matchinfo)";
        $stmt = $this->dbconn->prepare($sql);
        //how do we stop SQL injection?
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':seat', $seat);
        $stmt->bindParam(':method', $method);
        $stmt->bindParam(':matchinfo', $matchID);
        $stmt->bindParam(':userID', $userID);

        echo "new roll inserted";
        return $stmt->execute();
    }


    // logging

    function loggingDb($ip, $browser, $time, $action, $userID) {
        $sql = "INSERT INTO Log(IP, browser, timestmap, action, UserID) VALUES (:ip, :browser, :timestamp, :action, :userID)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':ip', $ip);
        $stmt->bindValue(':browser', $browser);
        $stmt->bindValue(':timestamp', $time);
        $stmt->bindValue(':action', $action);
        $stmt->bindValue(':userID', $userID);
        return $stmt->execute();
    }

   
}
?>