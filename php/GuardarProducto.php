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

    // SE EVALUA EL CAMPO CLAVE
    if (!isset($_POST['clave']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo clave es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['clave'])) == 0)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo clave es requerido.']);
            exit;
        }
    }

    // SE EVALUA EL CAMPO NOMBRE
    if (!isset($_POST['nombre']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo nombre es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['clave'])) == 0)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo nombre es requerido.']);
            exit;
        }
    }

    // SE EVALUA EL CAMPO DESCRIPCIÓN
    if (!isset($_POST['descripcion']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo descripcion es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['descripcion'])) == 0)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo descripcion es requerido.']);
            exit;
        }
    }


    // SE EVALUA EL CAMPO PRESENTACION
    if (!isset($_POST['presentacion']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo presentacion es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['presentacion'])) == 0)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo presentacion es requerido.']);
            exit;
        }
    }


    // SE EVALUA EL CAMPO PRECIO
    if (!isset($_POST['precio']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo precio es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['precio'])) == 0)
        {
            http_response_code(400);
            echo json_encode(['message' => 'El campo precio es requerido.']);
            exit;
        }
    }

    // SE EVALUA EL CAMPO IMAGEN
    if (!isset($_FILES['imagen']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo imagen es requerido.']);
        exit;
    }
    else
    {
        $formatos = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!in_array($_FILES["imagen"]["type"], $formatos, true))
        {
            http_response_code(400);
            echo json_encode(['message' => 'La imagen debe ser de alguno de los siguientes formatos .jpeg, .jpg, .png, .gif.']);
            exit;
        }
        else
        {
            if ($_FILES["imagen"]["size"] > 2000000)
            {
                http_response_code(400);
                echo json_encode(['message' => 'La imagen no debe ser mayor a 2MB.']);
                exit;
            }
        }
    }

    // SE EVALUA EL CAMPO PROVEEDOR ID
    if (!isset($_POST['proveedor_id']))
    {
        http_response_code(400);
        echo json_encode(['message' => 'El campo del proveedor es requerido.']);
        exit;
    }
    else
    {
        if (strlen(trim($_POST['proveedor_id'])) == 0)
        {
            http_response_code(400);
            echo json_encode(['message' => 'Se debe seleccionar un proveedor.']);
            exit;
        }
    }

    $clave = trim($_POST["clave"]);
    $nombre = trim($_POST["nombre"]);
    $descripcion = trim($_POST["descripcion"]);
    $presentacion = trim($_POST["presentacion"]);
    $precio = trim($_POST["precio"]);
    $imagen = "catalogo/" . $_FILES["imagen"]["name"];
    $proveedor_id = $_POST["proveedor_id"];

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
        $sql = "INSERT INTO productos (clave, nombre, descripcion, presentacion, precio, imagen, proveedor_id, created_at, deleted_at) VALUES ('$clave', '$nombre', '$descripcion', '$presentacion', '$precio', '$imagen', $proveedor_id, NOW(), NULL)";
        $db->query($sql);
        $id = $db->lastInsertId();
        $database->closeConnection();

        // SE GUARDA EL ARCHIVO DE LA IMAGEN EN EL SERVIDOR
        $dir = '../images/catalogo';
        $name = $_FILES["imagen"]['name'];

        if (move_uploaded_file($_FILES["imagen"]['tmp_name'], "$dir/$name"))
        {
            header("Access-Control-Allow-Origin: *");
            header("content-type:application/json");
            http_response_code(200);
            echo json_encode(['message' => 'El producto fue registrado exitosamente con el id: '. $id]);
            exit;
        }
        else{
            header("Access-Control-Allow-Origin: *");
            header("content-type:application/json");
            http_response_code(200);
            echo json_encode(['message' => 'El producto fue registrado con el id: '. $id . " pero no se pudo guardar la imagen en el servidor."]);
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
