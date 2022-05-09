<!--
Se importa la sección 'Footer'
-->
<?php require 'Footer.php'; ?>


<!--
Se importan los archivos 'JS'
-->
<script src="<?php echo $uri; ?>js/main.js"></script>
<?php
$items = explode("/", $_SERVER["PHP_SELF"]);
if (array_search("contacto.php", $items))
{
    echo "<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAXGywjG-h8uaigQHkr_bQOQXrk7mBOVD4&callback=initMap&v=weekly' defer></script>
    <script src='js/map.js'></script>
";
}
elseif (array_search("login.php", $items))
{
    echo "<script src='js/login.js'></script>
";
}
?>
</body>
</html>