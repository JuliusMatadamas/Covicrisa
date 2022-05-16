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
            <div class="row">
                <div class="col-md-4 text-left">
                    <label for="producto">Selecciona el producto</label>
                    <select class="form-control" name="listaProductos" id="listaProductos">
                    </select>
                </div>

                <div class="col-md-2">
                    <label for="">&nbsp;</label>
                    <button class="btn btn-secondary w-100" id="btnMostrarTablaCatalogo">Ver</button>
                </div>
            </div>
        </article>

        <article id="container__table-catalogo">
        </article>
    </section>
</main>

<!--
Se importa la parte inferior del documento
-->
<?php require './php/Nether.php'; ?>