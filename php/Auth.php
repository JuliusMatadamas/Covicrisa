<?php
// SI LA PETICIÓN ES ¿POST
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    // Si no se recibe el usuario
    if (!isset($_POST["usuario"]))
    {
        http_response_code(400);
        echo json_encode(["message" => "El campo usuario es requerido y obligatorio."]);
        exit;
    }

    // Si no se recibe el password
    if (!isset($_POST["password"]))
    {
        http_response_code(400);
        echo json_encode(["message" => "El campo contraseña es requerido y obligatorio."]);
        exit;
    }

    $usuario = trim($_POST["usuario"]);
    $password = trim($_POST["password"]);

    // Se incluye la clase 'Connection'
    include_once 'Connection.php';

    try {
        // Se crea una nueva instancia de la clase 'Connection'
        $database = new Connection();
        // Se abre la conexión a la BD
        $db = $database->openConnection();
        // Se crea la consulta SQL a realizar
        $sql = "SELECT * FROM `usuarios` WHERE `usuarios`.`usuario`='$usuario' AND `usuarios`.`deleted_at` IS NULL";
        // Se prepara la consulta a la BD
        $stm = $db->prepare($sql);
        // Se realiza la consulta a la BD
        $stm->execute();
        // Se obtienen los resultados de la consulta
        $result = $stm->fetch(PDO::FETCH_ASSOC);

        // Si la consulta no obtuvo resultados
        if (!$result)
        {
            http_response_code(400);
            echo json_encode(['message' => 'Error: usuario/contraseña invalidos!']);
            exit;
        }

        // Si la consulta obtuvo resultados
        // Se comprueba que el password sea correcto
        $hash = $result["password"];
        if (password_verify($password, $hash))
        {
            // Se inicia la sesión
            session_start();
            $_SESSION["login"] = true;

            // Se establece el código de respuesta de servidor como exitoso
            http_response_code(200);

            // Se manda el mensaje
            echo json_encode(['message' => 'Login correcto!']);
        }
        else
        {
            http_response_code(400);
            echo json_encode(['message' => 'Error: usuario/contraseña invalidos!']);
            exit;
        }
    }
    catch (PDOException $e)
    {
        http_response_code(400);
        echo json_encode(['message' => 'Ocurrió un error y el servidor no pudo procesar la petición.']);
        exit;
    }
}
