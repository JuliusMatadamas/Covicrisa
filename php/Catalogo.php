<?php
require_once 'Connection.php';

// SI LA PETICIÓN ES POST
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    $productos = [];

    try {
        // Se crea una nueva instancia de la clase 'Connection'
        $database = new Connection();
        // Se abre la conexión a la BD
        $db = $database->openConnection();
        // Se crea la consulta SQL a realizar
        $sql = "SELECT * FROM productos WHERE deleted_at IS NULL";
        // Se prepara la consulta a la BD
        $stm = $db->prepare($sql);
        // Se realiza la consulta a la BD
        $stm->execute();
        // Se obtienen los resultados de la consulta
        $productos = $stm->fetchAll(PDO::FETCH_ASSOC);
        $database->closeConnection();

        header("Access-Control-Allow-Origin: *");
        header("content-type:application/json");
        http_response_code(200);
        echo json_encode($productos);
        exit;
    }
    catch (PDOException $e)
    {
        http_response_code(400);
        echo json_encode(['message' => 'Ocurrió un error y el servidor no pudo procesar la petición.']);
        exit;
    }
}
