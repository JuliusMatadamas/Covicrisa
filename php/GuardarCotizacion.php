<?php
// SE ESTABLECE LA ZONA HORARIA
date_default_timezone_set('America/Mexico_City');
// SE IMPORTA LA CLASE CONNECTION
require_once 'Connection.php';

// SI LA PETICIÓN ES POST
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    /**
     * ANTES DE INSERTAR LA INFORMACIÓN EN LA BASE DE DATOS SE
     * EVALUARÁN CADA UNO DE LOS POST RECIBIDOS CON EL FIN DE
     * COMPROBAR QUE CUMPLAN CON LOS REQUERIMIENTOS
     */
    $patron = "/^[a-zA-Z\u00C0-\u017F\s]+$/i";

    // SE EVALUA EL CAMPO NOMBRE
    if (!isset($_POST['nombre']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo nombre es requerido y debe tener entre 10 y 50 caracteres, únicamente letras y espacios.']);
        exit;
    }
    else
    {
        // SE EVALUA POR MEDIO DE UNA EXPRESIÓN REGULAR QUE EL NOMBRE SÓLO CONTENGA LETRAS Y ESPACIOS
        if ( !preg_match("/^[a-zA-Z\sñáéíóúÁÉÍÓÚ]+$/",trim($_POST["nombre"])) )
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo nombre es requerido y debe tener entre 10 y 50 caracteres, únicamente letras y espacios.']);
            exit;
        }
        else
        {
            if (strlen(trim($_POST["nombre"])) < 10 || strlen(trim($_POST["nombre"])) > 50)
            {
                http_response_code(400);
                echo json_encode(['message' => 'El campo nombre es requerido y debe tener entre 10 y 50 caracteres, únicamente letras y espacios.']);
                exit;
            }
            else
            {
                $nombre = trim($_POST["nombre"]);
            }
        }
    }

    // SE EVALUA EL CAMPO EDAD
    if (!isset($_POST["edad"]))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo edad es requerido y debe ser un número entre 18 y 60']);
        exit;
    }
    else
    {
        if (!is_numeric($_POST["edad"]))
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo edad es requerido y debe ser un número entre 18 y 60']);
            exit;
        }
        else
        {
            $edad = intval($_POST["edad"]);
        }
    }

    // SE EVALUA EL EMAIL
    if(!isset($_POST["email"]))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo email es requerido y debe ser una dirección de correo electrónico válida']);
        exit;
    }
    else
    {
        if (!filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['message' => 'El campo email es requerido y debe ser una dirección de correo electrónico válida']);
            exit;
        }
        else
        {
            $email = trim($_POST["email"]);
        }
    }

    // SE EVALUA LA SOLICITUD
    if (!isset($_POST["solicitud"]))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo solicitud es requerido y debe tener al menos 20 carácteres.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST["solicitud"])) == 0)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo solicitud es requerido y debe tener al menos 20 carácteres.']);
            exit;
        }
        else
        {
            $solicitud = trim($_POST["solicitud"]);
        }
    }

    $fecha = $_POST["fecha"];

    // SE INTENTA REALIZAR EL REGISTRO DE LA INFORMACIÓN
    try {
        // SE CREA UNA NUEVA INSTANCIA DE LA CLASE CONNECTION
        $database = new Connection();
        // SE ABRE LA CONEXIÓN A LA BD
        $db = $database->openConnection();
        // SE CREA LA CONSULTA DE INSERCIÓN DE LA SOLICITUD DE COTIZACIÓN
        $sql = "INSERT INTO cotizaciones (nombre, edad, correo, descripcion, fecha, created_at, deleted_at) VALUES ('$nombre', '$edad', '$email', '$solicitud', '$fecha',NOW(), NULL)";
        // SE EJECUTA LA CONSULTA SQL
        $db->query($sql);
        // SE OBTIENE EL ID DEL REGISTRO
        $id = $db->lastInsertId();
        // SE CIERRA LA CONEXIÓN
        $database->closeConnection();
        // SE MANDA LA RESPUESTA
        http_response_code(200);
        echo json_encode(['message' => 'La solicitud de cotización fue registrada con el id: '. $id]);
        exit;
    }
    // EN CASO DE ERROR
    catch (PDOException $e)
    {
        http_response_code(400);
        echo json_encode(['message' => 'Ocurrió un error y el servidor no pudo procesar la petición.']);
        exit;
    }
}
