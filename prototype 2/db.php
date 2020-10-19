<?php
class dbObj {


    // DB connection

    private $dbconn;
    public function __construct() {
        $user = "root";
        $password = "suguruhagiwara";
        $dsn = "mysql:host=localhost;dbname=Prototype";

    try {
        $this->$dbconn = new PDO($dsn, $user, $password);
        $this->$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->$dbconn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        echo "<h1>Database is connected</h1><br>";
    } catch(PDOException $e) {
        echo "<h1>Can't connect</h1>" .$e->getMessage();
        exit();
    }


    // Buy a ticket

    function buyTicket($amount, $seat, $method) {
        $sql = "INSERT INTO TicketInformation(PurchasedAmount, SeatNumber, PaymentMethod) VALUES (:amount, :seat, :method)";
        $stmt = $this->$dbconn->prepare($sql);
        //how do we stop SQL injection?
        $stmt->bindValue(':amount', $amount);
        $stmt->bindValue(':seat', $seat);
        $stmt->bindValue(':method', $method);

        echo "new roll inserted";
        return $stmt->execute();
    }


    // Login check function

    function checkUserAccount($loginUname, $loginPword) {
        
        $sql = "SELECT UserID, UserName, Password FROM UserInformation WHERE UserName = :username";
        $stmt = $this->$dbconn->prepare($sql);
        $stmt->bindValue(':username', $loginUname);
        $stmt->execute();
        $row = $stmt->fetch();
            if(password_verify($loginPword, $row['Password'])){
                // assign session variables
                $_SESSION['User'] = $loginUname;
                $_SESSION['UserID'] = $row["UserID"];
                $_SESSION['login'] = true;
                $_SESSION['se']->is_logged_in();
                return true;
            }
            else {
                header('location:../index.html');
            }
        }
    }


    // Registration

    function register($uname, $pword, $fname, $lname, $email, $phone, $address) {

        // PDO is now required to insert
        $sql = "INSERT INTO UserInformation(UserName, Password, FirstName, LastName, Email, Phone, Address) VALUES (:uname, :pword, :fname, :lname, :email, :phone, :address)";
        $stmt = $this->$dbconn->prepare($sql);
        //how do we stop SQL injection?
        $stmt->bindValue(':uname', $uname);
        $stmt->bindValue(':pword', $pword);
        $stmt->bindValue(':fname', $fname);
        $stmt->bindValue(':lname', $lname);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':phone', $phone);
        $stmt->bindValue(':address', $address);

        echo "new roll inserted";
        return $stmt->execute();
    }



    /*
    // Match information


    function getInfo() {
        $sql = "SELECT * from MatchInformation";
        $stmt = $this->$dbconn->prepare($sql);
        return $stmt->execute();
    }


    // Display teams


    function displayTeam() {
        $sql = "SELECT TeamName FROM HomeTeam";
        $stmt = $this->$dbconn->prepare($sql);
        return $stmt->execute();
    }



    // Like the team 

    function likeTheTeam() {
        $sql = "INSERT INTO FavoriteTeams(HomeTeamID, UserID) VALUES(('TeamName',  SELECT HomeTeamID FROM HomeTeam WHERE FavoriteTeams.HomeTeamID = HomeTeam.HomeTeamID ))" ;
        NSERT INTO bar (description, foo_id) VALUES
        ( 'testing',     (SELECT id from foo WHERE type='blue') ),
        ( 'another row', (SELECT id from foo WHERE type='red' ) );


        $stmt = $this->$dbconn->prepare($sql);
        return $stmt->execute();
    }
*/

    // logging

    function loggingDb($ip, $browser, $time, $action) {
        $sql = "INSERT INTO Log(IP, browser, timestmap, action) VALUES (:ip, :browser, :timestamp, :action)";
        $stmt = $this->$dbconn->prepare($sql);
        $stmt->bindValue(':ip', $ip);
        $stmt->bindValue(':browser', $browser);
        $stmt->bindValue(':timestamp', $time);
        $stmt->bindValue(':action', $action);
        return $stmt->execute();
    }

}
?>