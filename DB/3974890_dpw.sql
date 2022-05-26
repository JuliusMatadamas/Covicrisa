-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 22-05-2022 a las 19:20:17
-- Versión del servidor: 5.7.33
-- Versión de PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `3974890_dpw`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE `cotizaciones` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `edad` int(11) NOT NULL,
  `correo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) UNSIGNED NOT NULL,
  `clave` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `presentacion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `precio` double(12,2) NOT NULL,
  `imagen` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `proveedor_id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `clave`, `nombre`, `descripcion`, `presentacion`, `precio`, `imagen`, `proveedor_id`, `created_at`, `deleted_at`, `updated_at`) VALUES
(7, 'ANT00', 'Antirreflectante', 'Es un tipo de vidrio en el que ambos lados estÃ¡n tratados para lograr la textura de la superficie, reduciendo asÃ­ el reflejo de la luz sin distorsionar los colores. Al tratar ambos lados se puede usar de la misma manera en un lugar u otro. Suelen utilizarse para la protecciÃ³n de marcos.', '3.60 x 2.40', 1100.00, 'catalogo/antirreflectante', 1, NULL, NULL, '2022-05-20 21:13:52'),
(8, 'ESP01', 'Espejo', 'Al hacer metÃ¡lico un lado este tipo de vidrio es muy adecuado para estancias de menor tamaÃ±o (como dormitorios y baÃ±os), dÃ¡ndoles asÃ­ mayor profundidad y visibilidad.', '3.60 x 2.40', 900.00, 'catalogo/espejo', 2, NULL, NULL, '2022-05-20 21:14:24'),
(9, 'IMP02', 'Impreso', 'Este tipo de vidrio es similar al vidrio simple, la diferencia es que el lado en relieve estÃ¡ impreso en la superficie. Suele utilizarse para dar mÃ¡s color en estancias, puertas, ventanas e incluso paredes de vidrio.', '3.60 x 2.40', 1600.00, 'catalogo/impreso', 2, NULL, NULL, '2022-05-20 21:14:52'),
(10, 'LAM03', 'Laminado', 'El vidrio laminado consta de dos o mÃ¡s vidrios simples, que se unen entre sÃ­ mediante lÃ¡minas de plÃ¡stico (polivinil butiral), que tienen buena adherencia, transparencia, resistencia y elasticidad. Una de las caracterÃ­sticas mÃ¡s relevantes de este vidrio es su alta resistencia al impacto y la penetraciÃ³n, por lo que se utiliza para proteger a las personas y los bienes.', '3.60 x 2.40', 1800.00, 'catalogo/laminado', 1, NULL, NULL, '2022-05-20 21:15:21'),
(11, 'SIM04', 'Simple', 'Las propiedades de este tipo de vidrios son bien conocidas, ya que es un vidrio simple y con poca deformaciÃ³n en muchos casos por lo que generalmente solo se usa para puertas y ventanas de manera decorativa y permite que la luz entre en la habitaciÃ³n.', '3.60 x 2.40', 700.00, 'catalogo/simple', 1, NULL, NULL, '2022-05-20 21:15:46'),
(12, 'TEM05', 'Templado', 'El templado tÃ©rmico permite obtener una gran resistencia mecÃ¡nica. Estos vidrios tienen su forma final antes de entrar en el horno de templado, ya que despuÃ©s del templado no se puede realizar ninguna modificaciÃ³n o corte. Este vidrios es mÃ¡s seguro, pues si se rompe crea pequeÃ±os fragmentos que no representan ningÃºn peligro.', '3.60 x 2.40', 1200.00, 'catalogo/templado', 2, NULL, NULL, '2022-05-20 21:16:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `rfc` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` text COLLATE utf8_unicode_ci NOT NULL,
  `telefono` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `rfc`, `direccion`, `telefono`, `email`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Saint-Gobain Glass', 'SME9502015F6', 'Parque Industrial Cuautla. Av. NicolÃ¡s Bravo 5, Xaloxtoc, 62741 Cd Ayala, Mor.', '5552791600', 'contacto@saint-gobain.com', '2022-05-22 11:59:30', NULL, '2022-05-22 21:59:30'),
(2, 'Vitro Vidrio Y Cristal S.A. De C.V.', 'VVC0010204R8', 'Carretera GarcÃ­a KM 10, Nuevo LeÃ³n', '8183293600', 'ventas@vitro.com', '2022-05-22 13:48:01', NULL, '2022-05-22 23:48:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Admin01', '$2y$10$aj4cRULVuFu7dzgXhJNPDOMyS2r8vVP5u1itqz0hO.AM2cA4VHjQG', '2022-05-13 15:08:19', NULL, '2022-05-13 20:15:33'),
(2, 'Gerente', '$2y$10$CgtAxM/Ke6D.rSh/jJW5b.1.s1wyNFF7yQ6lzfhKcwGIfpmBQz2DG', '2022-05-13 15:16:39', NULL, '2022-05-13 20:17:09'),
(3, 'Sistema', '$2y$10$6nncqyXN8s1iTBgLF.IQjeqTcLdvHdWxthhwaLUVt8io/4x04CVkC', '2022-05-13 15:17:37', NULL, '2022-05-13 20:17:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `producto_id` int(10) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL,
  `nombre_cliente` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `direccion_cliente` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefono_cliente` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `correo_cliente` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fecha_venta` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_provedor_producto_idx` (`proveedor_id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_venta_usuario_idx` (`usuario_id`),
  ADD KEY `fk_venta_producto_idx` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_provedor_producto` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_venta_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_venta_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
