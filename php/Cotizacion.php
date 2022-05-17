<?php
// Se establece la zona horaria
date_default_timezone_set('America/Mexico_City');
require_once 'Connection.php';

// SI LA PETICIÓN ES POST
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    /**
     * ANTES DE INSERTAR LA INFORMACIÓN EN LA BASE DE DATOS SE
     * EVALUARÁN CADA UNO DE LOS POST RECIBIDOS CON EL FIN DE
     * COMPROBAR QUE CUMPLAN CON LOS REQUERIMIENTOS
     */

    // SE EVALUA EL CAMPO NOMBRE
    if (!isset($_POST['nombre']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo nombre es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['nombre'])) < 10 || strlen(trim($_POST['nombre'])) > 50)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo nombre no cumple con la longitud requerida (entre 10 y 50 caracteres).']);
            exit;
        }
        else
        {
            $nombre = trim($_POST['nombre']);
        }
    }

    // SE EVALUA EL CAMPO EDAD
    if (!isset($_POST['edad']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo edad es requerido.']);
        exit;
    }
    else
    {
        if (intval($_POST['edad']) < 18 || intval($_POST['edad']) > 60)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo edad no cumple con lo requerido (entre 18 y 60 años).']);
            exit;
        }
        else
        {
            $edad = intval($_POST['edad']);
        }
    }

    // SE EVALUA EL CAMPO EAMIL
    if (!isset($_POST['email']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo email es requerido.']);
        exit;
    }
    else
    {
        $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
        if (!preg_match($regex, $_POST['email']))
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo email no cumple con lo requerido, debe ser una dirección válida.']);
            exit;
        }
        else
        {
            $email = trim($_POST['email']);
        }
    }

    // SE EVALUA EL CAMPO SOLICITUD
    if (!isset($_POST['solicitud']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo solicitud es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['solicitud'])) < 20)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo solicitud debe tener al menos 20 caracteres.']);
            exit;
        }
        else
        {
            $solicitud = trim($_POST['solicitud']);
        }
    }

    try {
        // Se obtiene la fecha actual
        $date = "CURRENT_DATE()";
        $create = "NOW()";
        $delete = "NULL";
        // Se crea una nueva instancia de la clase 'Connection'
        $database = new Connection();
        // Se abre la conexión a la BD
        $db = $database->openConnection();
        // Se crea la consulta SQL a realizar
        $sql = "INSERT INTO cotizaciones (nombre, edad, correo, descripcion, fecha, created_at, deleted_at) VALUES ('$nombre', '$edad', '$email', '$solicitud', CURRENT_DATE(), NOW(), NULL )";
        $db->query($sql);
        $id = $db->lastInsertId();
        $database->closeConnection();

        header("Access-Control-Allow-Origin: *");
        header("content-type:application/json");
        http_response_code(200);
        echo json_encode(['message' => 'La solicitud de cotización fue registrada exitosamente con el id: '. $id]);
        exit;
    }
    catch (PDOException $e)
    {
        http_response_code(400);
        echo json_encode(['message' => 'Ocurrió un error y el servidor no pudo procesar la petición.']);
        exit;
    }
}
