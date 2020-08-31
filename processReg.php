<?php
session_start();
require("../model/connection.php");
require("../model/functionReg.php");
require("filterInput.php");
if(!empty([$_POST])) {
    //input sanitation via testInput function
    $username = testInput($_POST['uname']);
    $password = testInput($_POST['pass']);
    $role = testInput($_POST['role']);
    $name = testInput($_POST['fname']);
    $lastname = testInput($_POST['lname']);
    $email = testInput($_POST['email']);
    $phone = testInput($_POST['phone']);
    //hashing the password with PASSWORD_HASH()
    $hpassword = password_hash($password, PASSWORD_DEFAULT);
    //linking the user name input with the database whether it already exits or not
    $query = $conn->prepare("SELECT Username FROM login WHERE Username = :user ");
    $query->bindValue(':user', $username);
    $query->execute();
    //inserting data to the database
    if ($query->rowCount() < 1) {//if user does not exists
        //newUser() function call
        newUser($username, $hpassword, $role, $firstname, $lastname, $email, $phone);
        header('location:../view/pages/displayBook.php');
    } else {
        echo "Customer already exists";
    }
}
?>