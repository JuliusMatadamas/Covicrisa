<!--
Se importa la sección 'Footer'
-->
<?php require 'Footer.php'; ?>


<!--
Se importan los archivos 'JS'
-->
<script src="<?php echo $uri; ?>js/main.js"></script>
<?php
// SE DETERMINA EN QUE SECCIÓN SE UBICA EL USUARIO
$items = explode("/", $_SERVER["PHP_SELF"]);
if (array_search("contacto.php", $items))
{
    echo "<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAXGywjG-h8uaigQHkr_bQOQXrk7mBOVD4&callback=initMap&v=weekly' defer></script>
    <script src='js/map.js'></script>
";
}
elseif (array_search("login.php", $items))
{
    echo "<script src='".$uri."js/login.js'></script>
";
}
elseif (array_search("cotizacion.php", $items))
{
    echo "<script src='".$uri."js/cotizacion.js'></script>
";
}
elseif (array_search("solicitudes.php", $items))
{
    echo "<script src='".$uri."js/solicitudes.js'></script>
";
}
?>
</body>
</html>