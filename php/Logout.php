<?php

session_start();

$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
}

session_destroy();

if ($_SERVER["SERVER_NAME"] == "localhost")
{
    header('Location: '.$_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/dpw/index.php");
}
else
{
    header('Location: '.$_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/index.php");
}