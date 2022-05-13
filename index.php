<!--
Para no estar escribiendo el mismo código en cada documento del sitio, se emplean documentos PHP que servirán
de plantillas, así, si se requiere hacer un cambio, este cambio se hará en un sólo documento pero se verá en
todas las páginas del sitio web
Se importa la parte superior del documento
-->
<?php require './php/Higher.php'; ?>


<!--
En esta parte se mostrará el código HTML que contendrá el contenido de la página
-->
<main class="index__container">
    <section class="outer">
        <article class="details">
            <h2>VIDRIOS Y CRISTALES PARA CONSTRUCCIÓN</h2>
            <p>Somos una empresa comercializadora de vidrio de distintas variedades para emplearse en hogares, oficinas, edificios, y cualquier tipo de construcción.</p>
            <p>Vendemos al <b>mayoreo</b> y <b>menudeo</b></p>
            <p>En ventas al mayoreo le llevamos el material hasta su domicilio</p>
        </article>
    </section>
</main>

<!--
Al igual que en la parte superior del documento, se emplea el mismo método de plantillas utilizando un sólo
documento, que en este caso mostrará la parte inferior del documento
-->
<?php require './php/Nether.php'; ?>