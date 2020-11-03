<?php
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
        //echo "<h1>Database is connected</h1><br>";
    }


    // Login check function

    function checkUserAccount($loginUname, $loginPword) {
        $sql = "SELECT UserID, UserName, Password FROM UserInformation WHERE UserName = :username";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':username', $loginUname);
        $stmt->execute();
        $row = $stmt->fetch();
        if(password_verify($loginPword, $row['Password'])) {
                // assign session variables
                $_SESSION['User'] = $loginUname;
                $_SESSION['UserID'] = $row["UserID"];
                $_SESSION['login'] = true;

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

        //echo "new roll inserted";
        return $stmt->execute();
    }


    // Buy a ticket

    function buyTicket($amount, $seat, $method, $matchID, $userID) {

        $sql = "INSERT INTO TicketInformation(PurchasedAmount, SeatNumber, PaymentMethod, MatchInfoID, UserID) VALUES (:amount, :seat, :method, :matchinfo, :userID)";
        $stmt = $this->dbconn->prepare($sql);
        //how do we stop SQL injection?
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':seat', $seat);
        $stmt->bindParam(':method', $method);
        $stmt->bindParam(':matchinfo', $matchID);
        $stmt->bindParam(':userID', $userID);

        //echo "new roll inserted";
        return $stmt->execute();
    }


    // logging

    function loggingDb($ip, $browser, $time, $action) {
        $sql = "INSERT INTO Log(IP, browser, timestamp, action) VALUES (:ip, :browser, :timestamp, :action)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':ip', $ip);
        $stmt->bindValue(':browser', $browser);
        $stmt->bindValue(':timestamp', $time);
        $stmt->bindValue(':action', $action);
        //echo "new row inserted";
        return $stmt->execute();
    }


    function getGameInfo($gameNum) {
        $sql = "SELECT MatchInfoID, DateOfMatch, HomeTeam.TeamName, AwayTeam.TeamName, Cost, Stadium.StadiumName FROM MatchInformation JOIN HomeTeam ON MatchInformation.HomeTeamID = HomeTeam.HomeTeamID JOIN AwayTeam ON MatchInformation.AwayTeamID = AwayTeam.AwayTeamID JOIN Stadium ON MatchInformation.StadiumID = Stadium.StadiumID WHERE MatchInfoID = :matchinfoID";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':matchinfoID', $gameNum);
        return $stmt->execute();
    }

    function deleteUserAccount() {
        $sql = "DELETE FROM UserInformation WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':userid', $_SESSION["UserID"]);
        return $stmt->execute();
    }

    function editUserAccount($editFName, $editLName, $editEmail, $editPhone, $editAddress) {
        $sql = "UPDATE UserInformation SET FirstName = :editfname, LastName = :editlname, Email = :editemail, Phone = :editphone, Address = :editaddress WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':editfname', $editFName);
        $stmt->bindValue(':editlname', $editLName);
        $stmt->bindValue(':editemail', $editEmail);
        $stmt->bindValue(':editphone', $editPhone);
        $stmt->bindValue(':editaddress', $editAddress);
        $stmt->bindValue(':userid', $_SESSION['UserID']);
        return $stmt->execute();
    }


    function createFavoriteTeam($favoriteTeam) {
        $sql = "INSERT FavoriteTeams SET HomeTeamID = :homeTeamID, UserID = :userid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':homeTeamID', $favoriteTeam);
        $stmt->bindValue(':userid', $_SESSION['UserID']);
        return $stmt->execute();
    }


    function displayFavoriteTeam() {
        $sql = "SELECT * FROM FavoriteTeams WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':userid', $_SESSION['UserID']);
        $stmt->execute();
        $row = $stmt->fetch();
        json_encode($row);
        return true;
    }

}
?>