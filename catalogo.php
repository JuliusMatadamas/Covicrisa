<!--
Se importa la parte superior del documento
-->
<?php require './php/Higher.php'; ?>


<!--
Contenido de la página
-->
<main class="container">
    <section class="card">
        <h2>Catálogo de productos</h2>
        <article>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Clave</th>
                        <th>Nombre</th>
                        <th>Precio x m<sup>2</sup></th>
                    </tr>
                </thead>
                <tbody>
                <?php
                    $tipos = ["laminado", "templado", "simple"];
                    $formas = ["rectangular", "cuadrado", "circular", "ovalado"];
                    $precios = ["00" => 30.5, "01" => 34.00, "02" => 8.80, "10" => 30.35, "11" => 34.00, "12" => 8.80, "20" => 41.00, "21" => 46.00, "22" => 11.80, "30" => 41.00, "31" => 46.00, "32" => 11.9];

                    foreach ($tipos as &$tipo){
                        foreach ($formas as &$forma) {
                            $nombre = ucfirst($tipo) . " " . ucfirst($forma);
                            $clave = strtoupper(substr($tipo,0,2)) . strtoupper(substr($forma, 0, 2)) . '-' . array_search($forma, $formas) . array_search($tipo, $tipos);
                            $key = array_search($forma, $formas) . array_search($tipo, $tipos);
                            $precio = '$' . number_format( $precios[$key], 2);
                            echo "<tr>
                                <td class='td__img-container'>
                                    <img src='";
                            echo $uri;
                            echo "images/$forma.png'>
                                </td>
                                <td class='td__container'>
                                    $clave 
                                </td>
                                <td class='td__container'>$nombre</td>
                                <td class='td__container'>$precio</td>
                            </tr>";
                        }
                    }
                ?>
                </tbody>
            </table>
        </article>
    </section>
</main>

<!--
Se importa la parte inferior del documento
-->
<?php require './php/Nether.php'; ?>