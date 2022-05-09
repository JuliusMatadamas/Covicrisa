<?php
if ($_SERVER["SERVER_NAME"] == "localhost")
{
    $uri = $_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/dpw/";
}
else
{
    $uri = $_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/";
}
?><!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="author" content="Julio Cesar Matadamas Zaragoza">
    <title>Covicrisa</title>
    <!--
    Se importan los archivos 'CSS'
    -->
    <link rel="stylesheet" href="<?php echo $uri; ?>css/styles.css">
    <link rel="shortcut icon" href="<?php echo $uri; ?>favicon.ico" type="image/x-icon">
</head>
<body>
<!--
Se importa la sección Nav
-->
<?php require 'Nav.php'; ?>
