<!--
En esta sección se mostrarán las opciones d enavegación por el sitio web
-->
<nav>
    <!-- NAVBAR -->
    <div class="navbar">
        <span>&equiv;</span>

        <div class="logo">
            <a href="#">
                <img src="<?php echo $uri; ?>images/logotipo_inverse.png" alt="">
            </a>
        </div>

        <div class="nav-links">
            <div class="sidebar-logo">
                <a href="#">
                    <img src="<?php echo $uri; ?>images/isotipo_inverse.png" alt="">
                </a>
                <span>
                        &times;
                    </span>
            </div>

            <?php
            $items = explode("/", $_SERVER["PHP_SELF"]);

            /**
             * Si el usuario ha iniciado sesión y se encuentra en la parte administrativa
             * se le mostrarán solo las siguientes opciones
             */
            if (array_search("admin", $items))
            {
                ?>
                <ul class="links">
                    <li><a href="<?php echo $uri; ?>index.php">Inicio</a></li>
                    <li><a href="<?php echo $uri; ?>admin/ventas.php">Productos por vender</a></li>
                    <li><a href="<?php echo $uri; ?>admin/solicitudes.php">Consultar solicitudes</a></li>
                    <li><a href="<?php echo $uri; ?>php/Logout.php">Cerrar sesión</a></li>
                </ul>
                <?php
            }

            /**
             * Si el usuario no ha iniciado sesión, solo se le mostrarán las opciones
             * del área pública
             */
            else
            {
                ?>
                <ul class="links">
                    <li><a href="<?php echo $uri; ?>index.php">Negocio</a></li>
                    <li><a href="<?php echo $uri; ?>catalogo.php">Catálogo de productos</a></li>
                    <li><a href="<?php echo $uri; ?>cotizacion.php">Solicitud de cotización</a></li>
                    <li><a href="<?php echo $uri; ?>contacto.php">Contacto</a></li>
                    <li><a href="<?php echo $uri; ?>login.php">Acceso a usuarios</a></li>
                </ul>
                <?php
            }
            ?>
        </div>
    </div>
</nav>
