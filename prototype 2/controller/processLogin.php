<?php
session_start();
require("../model/connection.php");
require("filterInput.php");
//input via POST method
if(!empty($_POST)) {
    $username = testInput($_POST['uname']);
    $password = testInput($_POST['upass']);

    $stmt = $conn->prepare("SELECT UserName, Password FROM User WHERE UserName = :username");
    $stmt->bindValue(':username', $username);
    $stmt->execute();
    $row = $stmt->fetch();
    if(password_verify($password, $row['Password'])){
        // assign session variables
        $_SESSION['adminUser'] = $username;
        $_SESSION['loginID'] = $row["LoginID"];
        $_SESSION['login'] = true;
        echo "You are now logged in!";
        header('location:../view/pages/displayBook.php');
    }
    else {
        header('location:../index.html');
    }
}