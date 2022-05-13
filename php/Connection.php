<?php


class Connection
{
    // DB name: 3974890_dpw
    // DB user: 3974890_dpw
    // DB pass: rl9#8rke06cq]OF}

    protected $con;

    public function openConnection()
    {
        // Se intenta la conexión a la BD mediante un bloque try-catch
        try {
            // Se determina si se está utilizando el servidor local o el externo
            if ($_SERVER["SERVER_ADDR"] == "127.0.0.1")
            {
                $this->con = new PDO("mysql:host=localhost;dbname=3974890_dpw", "root", "");
                $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->con->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'utf8'");
            }
            else
            {
                $this->con = new PDO("mysql:host=fdb33.awardspace.net;dbname=3974890_dpw", "3974890_dpw", "rl9#8rke06cq]OF}");
                $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->con->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'utf8'");
            }

            return $this->con;
        }
        // Si no se pudo realizar la conexión se manda el siguiente mensaje
        catch (PDOException $e)
        {
            echo "Problema con la conexión: " . $e->getMessage();
            die();
        }
    }

    public function closeConnection()
    {
        $this->con = null;
    }
}