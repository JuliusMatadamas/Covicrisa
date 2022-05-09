<?php
// SI LA PETICIÓN ES ¿POST
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    // SI EL USUARIO Y LA CONTRASEÑA SON CORRECTOS
    if ($_POST["usuario"] == "admin" && $_POST["password"] == "12345")
    {
        // SE INICIA LA SESIÓN
        session_start();
        $_SESSION["login"] = true;
        return http_response_code(200);
    }
    // ENCASO CONTRARIO SE MANDA LA RESPUESTA DE ERROR
    else
    {
        return http_response_code(404);
    }
}