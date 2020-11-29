<?php
//Data base object and session object are inside the db.php file and the se.php file.
//These files are inside the api folder to differentiate from Client side files like HTML and CSS.


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
        $sql = "SELECT UserID, UserName, Password, AccessRights FROM UserInformation WHERE UserName = :username";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':username', $loginUname);
        $stmt->execute();
        $row = $stmt->fetch();

        if(password_verify($loginPword, $row['Password'])) {
            print_r($row);
                // assign session variables
                $_SESSION['User'] = $loginUname;
                $_SESSION['UserID'] = $row["UserID"];
                $_SESSION['AccessRight'] = $row["AccessRights"];
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

    function buyTicketDb($amount, $seat, $method, $matchID, $userID) {
        $sql = "INSERT INTO TicketInformation(PurchasedAmount, SeatNumber, PaymentMethod, MatchInfoID, UserID) VALUES (:amount, :seat, :method, :matchinfo, :userID)";
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


    function displayTicketDB() {
        try {
            $sql = "SELECT * FROM TicketInformation WHERE UserID = :userid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            $stmt->execute();
            $ticketResult = $stmt->fetchAll();
            return $ticketResult;
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function deleteTicketDB() {
        try {
            $sql = "DELETE FROM TicketInformation WHERE UserID = :userid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            return $stmt->execute();
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }


    // logging

    function loggingDb($ip, $browser, $time, $action) {
        $sql = "INSERT INTO Log(IP, browser, timestamp, action) VALUES (:ip, :browser, :timestamp, :action)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':ip', $ip);
        $stmt->bindValue(':browser', $browser);
        $stmt->bindValue(':timestamp', $time);
        $stmt->bindValue(':action', $action);
        return $stmt->execute();
    }


    function displayProfileDB() {
        try {
            $sql = "SELECT * FROM UserInformation WHERE UserID = :userid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function deleteUserAccount() {
        $sql = "DELETE FROM UserInformation WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':userid', $_SESSION["UserID"]);
        return $stmt->execute();
    }

    function displayCurrentProfile() {
        try {
            $sql = "SELECT * FROM UserInformation WHERE UserID = :userid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
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
        $sql = "SELECT * FROM FavoriteTeams WHERE UserID = :userid";
        $q = $this->dbconn->prepare($sql);
        $q->bindValue(':userid', $_SESSION['UserID']);
        $q->execute();
        $Result = $q->fetch();
        print_r($Result);
        //Now to check, we use an if() statement 
        if($Result > 1) {
            $sql = "UPDATE FavoriteTeams SET HomeTeamID = :favteamid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':favteamid', $favoriteTeam);
            print "Record updated";
            return $stmt->execute();
            //$favResult = $stmt->fetchAll();

            //return $favResult;
        } else {
            $sql = "INSERT FavoriteTeams SET HomeTeamID = :homeTeamID, UserID = :userid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':homeTeamID', $favoriteTeam);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            print "Record inserted";
            return $stmt->execute();
        }

    }


    function displayFavoriteTeam() {
        try {
            $sql = "SELECT FavoriteTeams.HomeTeamID, HomeTeam.TeamName, HomeTeam.Logo FROM FavoriteTeams JOIN HomeTeam ON HomeTeam.HomeTeamID = FavoriteTeams.HomeTeamID WHERE UserID = :userid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':userid', $_SESSION['UserID']);
            $stmt->execute();
            $favResult = $stmt->fetchAll();
            return $favResult;
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }
    

    function deleteFavoriteTeam() {
        $sql = "DELETE FROM FavoriteTeams WHERE UserID = :userid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':userid', $_SESSION["UserID"]);
        return $stmt->execute();
    }


    function displayMatchDB() {
        try {
            $sql = "SELECT MatchInfoID, HomeTeam.Logo, HomeTeam.TeamName, AwayTeam.Logo, AwayTeam.TeamName FROM MatchInformation JOIN HomeTeam ON MatchInformation.HomeTeamID = HomeTeam.HomeTeamID JOIN AwayTeam ON MatchInformation.AwayTeamID = AwayTeam.AwayTeamID";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->execute();
            $matchResult = $stmt->fetchAll();
            return $matchResult;
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }


    function passInfoDB($matchNum) {
        try {
            $sql = "SELECT MatchInfoID, HomeTeam.Logo, HomeTeam.TeamName, AwayTeam.Logo, AwayTeam.TeamName FROM MatchInformation JOIN HomeTeam ON MatchInformation.HomeTeamID = HomeTeam.HomeTeamID JOIN AwayTeam ON MatchInformation.AwayTeamID = AwayTeam.AwayTeamID WHERE MatchInformation.MatchInfoID = :infoID";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':infoID', $matchNum);
            $stmt->execute();
            $matchResult = $stmt->fetchAll();
            return $matchResult;
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function displayTeamDB() {
        try {
            $sql = "SELECT HomeTeamID, HomeTeam.TeamName, HomeTeam.Logo, Stadium.StadiumName, Stadium.Location FROM HomeTeam JOIN Stadium ON HomeTeam.StadiumID = Stadium.StadiumID";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->execute();
            $teamResult = $stmt->fetchAll();

            return $teamResult;

        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function displayInfoDB() {
        try {
            $sql = "SELECT HomeTeamID, HomeTeam.TeamName, HomeTeam.Logo, Stadium.StadiumName, Stadium.Location FROM HomeTeam JOIN Stadium ON HomeTeam.StadiumID = Stadium.StadiumID";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->execute();
            $teamResult = $stmt->fetchAll();

            return $teamResult;

        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function passDetailDB($matchDetail) {
        try {
            $sql = "SELECT MatchInfoID, DateOfMatch, HomeTeam.TeamName, HomeTeam.Logo, AwayTeam.TeamName, AwayTeam.Logo, Cost, Stadium.StadiumName, Stadium.Location FROM MatchInformation JOIN HomeTeam ON MatchInformation.HomeTeamID = HomeTeam.HomeTeamID JOIN AwayTeam ON MatchInformation.AwayTeamID = AwayTeam.AwayTeamID JOIN Stadium ON MatchInformation.StadiumID = Stadium.StadiumID WHERE MatchInfoID = :matchinfoid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(":matchinfoid", $matchDetail);
            $stmt->execute();
            $infoResult = $stmt->fetchAll();

            return $infoResult;

        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function passTicketDetailDB($matchTicketDetail) {
        try {
            $sql = "SELECT MatchInfoID, DateOfMatch, HomeTeam.TeamName, HomeTeam.Logo, AwayTeam.TeamName, AwayTeam.Logo, Cost, Stadium.StadiumName, Stadium.Location FROM MatchInformation JOIN HomeTeam ON MatchInformation.HomeTeamID = HomeTeam.HomeTeamID JOIN AwayTeam ON MatchInformation.AwayTeamID = AwayTeam.AwayTeamID JOIN Stadium ON MatchInformation.StadiumID = Stadium.StadiumID WHERE MatchInfoID = :matchinfoid";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(":matchinfoid", $matchTicketDetail);
            $stmt->execute();
            $infoTicketResult = $stmt->fetchAll();

            return $infoTicketResult;

        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }


    function checkAdminAccount($adminLoginUname, $adminLoginPword) {
        $sql = "SELECT AdminID, AdminName, AdminPassword FROM Admin WHERE AdminName = :adminname";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':adminname', $adminLoginUname);
        $stmt->execute();
        $row = $stmt->fetch();
        print_r($adminLoginPword);

        // I used hash as a one way encryption. The reason why chose hash is that it can store the password safely in the database
        if(password_verify($adminLoginPword, $row['AdminPassword'])) {
                $_SESSION['Admin'] = $adminLoginUname;
                $_SESSION['AdminID'] = $row["AdminID"];
                $_SESSION['adminlogin'] = true;
                return true;
            }
            else {
                return false;
            }
    }



    // modify matches

    function adminDisplayMatchDB() {
        try {
            $sql = "SELECT MatchInfoID, HomeTeam.Logo, HomeTeam.TeamName, AwayTeam.Logo, AwayTeam.TeamName, Cost, Stadium.StadiumName FROM MatchInformation JOIN HomeTeam ON MatchInformation.HomeTeamID = HomeTeam.HomeTeamID JOIN AwayTeam ON MatchInformation.AwayTeamID = AwayTeam.AwayTeamID JOIN Stadium ON MatchInformation.StadiumID = Stadium.StadiumID";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->execute();
            $matchResult = $stmt->fetchAll();
            return $matchResult;
        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function adminInsertMatch($insertDate, $insertHomeTeamId, $insertAwayTeamId, $insertCost, $insertStadiumId) {
        $sql = "INSERT INTO MatchInformation(DateOfMatch, HomeTeamID, AwayTeamID, Cost, StadiumID) VALUES (:dateOfMatch, :homeTeamId, :awayTeamId, :cost, :stadiumId)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':dateOfMatch', $insertDate);
        $stmt->bindValue(':homeTeamId', $insertHomeTeamId);
        $stmt->bindValue(':awayTeamId', $insertAwayTeamId);
        $stmt->bindValue(':cost', $insertCost);
        $stmt->bindValue(':stadiumId', $insertStadiumId);
        return $stmt->execute();
    }

    function adminDeleteMatch($matchNum) {
        $sql = "DELETE FROM MatchInformation WHERE MatchInfoID = :matchinfoid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':matchinfoid', $matchNum);
        return $stmt->execute();
    }


    function adminUpdateMatch($updateId, $updateDate, $updateHomeTeamId, $updateAwayTeamId, $updateCost, $updateStadiumId) {
        $sql = "UPDATE MatchInformation SET DateOfMatch = :dateOfMatch, HomeTeamID = :homeTeamId, AwayTeamID = :awayTeamId, Cost = :cost, StadiumID = :stadiumId WHERE MatchInfoID = :matchInfoId";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':dateOfMatch', $updateDate);
        $stmt->bindValue(':homeTeamId', $updateHomeTeamId);
        $stmt->bindValue(':awayTeamId', $updateAwayTeamId);
        $stmt->bindValue(':cost', $updateCost);
        $stmt->bindValue(':stadiumId', $updateStadiumId);
        $stmt->bindValue(':matchInfoId', $updateId);
        return $stmt->execute();
    }

    // modify teams

    
    function adminDisplayTeamDB() {
        try {
            $sql = "SELECT HomeTeamID, HomeTeam.TeamName, HomeTeam.Logo, Stadium.StadiumName, Stadium.Location FROM HomeTeam JOIN Stadium ON HomeTeam.StadiumID = Stadium.StadiumID";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->execute();
            $teamResult = $stmt->fetchAll();

            return $teamResult;

        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function adminInsertTeam($insertTeam, $insertStadiumId, $insertImagePath) {
        $sql = "INSERT INTO HomeTeam(TeamName, StadiumID, Logo) VALUES (:teamName, :stadiumId, :logo)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':teamName', $insertTeam);
        $stmt->bindValue(':stadiumId', $insertStadiumId);
        $stmt->bindValue(':logo', $insertImagePath);
        $stmt->execute();
        $sql = "INSERT INTO AwayTeam(TeamName, StadiumID, Logo) VALUES (:teamName, :stadiumId, :logo)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':teamName', $insertTeam);
        $stmt->bindValue(':stadiumId', $insertStadiumId);
        $stmt->bindValue(':logo', $insertImagePath);
        return $stmt->execute();
    }

    function adminDeleteTeam($TeamNum2) {
        $sql = "DELETE FROM HomeTeam WHERE HomeTeamID = :homeTeamid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':homeTeamid', $TeamNum2);
        $stmt->execute();
        $sql = "DELETE FROM AwayTeam WHERE AwayTeamID = :awayTeamid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':awayTeamid', $TeamNum2);
        return $stmt->execute();
    }


    function adminUpdateTeam($updateTeamNum, $updateTeam, $updateStadiumId, $updateImagePath) {
        $sql = "UPDATE HomeTeam SET TeamName = :teamName, StadiumID = :stadiumId, Logo = :logo WHERE HomeTeamID = :homeTeamid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':teamName', $updateTeam);
        $stmt->bindValue(':stadiumId', $updateStadiumId);
        $stmt->bindValue(':logo', $updateImagePath);
        $stmt->bindValue(':homeTeamid', $updateTeamNum);
        $stmt->execute();
        $sql = "UPDATE AwayTeam SET TeamName = :teamName, StadiumID = :stadiumId, Logo = :logo WHERE AwayTeamID = :awayTeamid";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindValue(':teamName', $updateTeam);
        $stmt->bindValue(':stadiumId', $updateStadiumId);
        $stmt->bindValue(':logo', $updateImagePath);
        $stmt->bindValue(':awayTeamid', $updateTeamNum);
        return $stmt->execute();
    }

    function getIDinfo() {
        try {
            $sql = "SELECT HomeTeamID, HomeTeam.TeamName, Stadium.StadiumID, Stadium.StadiumName FROM HomeTeam JOIN Stadium ON HomeTeam.StadiumID = Stadium.StadiumID";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->execute();
            $teamResult = $stmt->fetchAll();

            return $teamResult;

        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }

    function getCurrentTeamInfo($TeamInfoNum2) {
        try {
            $sql = "SELECT TeamName, StadiumID, Logo FROM HomeTeam WHERE HomeTeamID = :id";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindValue(':id', $TeamInfoNum2);
            $stmt->execute();
            $teamResult = $stmt->fetchAll();

            return $teamResult;

        }
        catch (PDOEXCEPTION $ex) {
            throw $ex;
        }
    }
}


?>





<?php

/*
 //For admin username and password 

$user = "root";
$password = "suguruhagiwara";
$dsn = "mysql:host=localhost; dbname=Prototype";

$dbconn = new PDO($dsn, $user, $password);
$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$dbconn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

echo $_POST["adminName"];

$sql = "INSERT INTO Admin(AdminName, AdminPassword) VALUES (:uname, :pword)";
$stmt = $dbconn->prepare($sql);
//how do we stop SQL injection?
$hadminpassword = password_hash($_POST["adminPword"], PASSWORD_BCRYPT);
$stmt->bindValue(':uname', $_POST["adminName"]);
$stmt->bindValue(':pword', $hadminpassword);

$stmt->execute();
*/
?>