<?php
class sessObj {

    function is_logged_in() {
        return true;
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
}
?>