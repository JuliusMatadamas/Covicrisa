<?php
// Se establece la zona horaria
date_default_timezone_set('America/Mexico_City');
require_once 'Connection.php';

// SI LA PETICIÓN ES POST
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    // SE EVALUA QUE SE RECIBA EL ID DEL PRODUCTO A ELIMINAR
    if (!isset($_POST['id']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'Se debe proporcionar el id del producto.']);
        exit;
    }

    $id = $_POST["id"];

    try {
        // Se crea una nueva instancia de la clase 'Connection'
        $database = new Connection();
        // Se abre la conexión a la BD
        $db = $database->openConnection();
        // Se crea la consulta SQL a realizar
        $sql = "UPDATE productos SET deleted_at = NOW() WHERE id = $id";
        $count = $db->exec($sql);

        if ($count)
        {
            header("Access-Control-Allow-Origin: *");
            header("content-type:application/json");
            http_response_code(200);
            echo json_encode(['message' => 'El producto fue eliminado ']);
            exit;
        }
        else
        {
            http_response_code(400);
            echo json_encode(['message' => 'Ocurrió un error y el servidor no pudo procesar la eliminación del producto']);
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
