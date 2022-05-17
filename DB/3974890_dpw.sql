-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 17-05-2022 a las 17:46:58
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
-- Estructura de tabla para la tabla `catalogo`
--

CREATE TABLE `catalogo` (
  `clave` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `presentacion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `precio` double(12,2) NOT NULL,
  `imagen` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `catalogo`
--

INSERT INTO `catalogo` (`clave`, `nombre`, `descripcion`, `presentacion`, `precio`, `imagen`, `created_at`, `deleted_at`, `updated_at`) VALUES
('LACI-02', 'Laminado circular', 'Es un tipo de vidrio de seguridad que mantiene su estructura en caso de rotura; los fragmentos tienden a permanecer adheridos a las capas plÃ¡sticas intermedias, reduciÃ©ndose asÃ­ las probabilidades de causar daÃ±o.', '3x3', 41.00, 'circular', NULL, NULL, '2022-05-17 17:40:14'),
('LACU-01', 'Laminado cuadrado', 'Es un tipo de vidrio de seguridad que mantiene su estructura en caso de rotura; los fragmentos tienden a permanecer adheridos a las capas plÃ¡sticas intermedias, reduciÃ©ndose asÃ­ las probabilidades de causar daÃ±o.', '3x3', 30.35, 'cuadrado', NULL, NULL, '2022-05-17 17:40:18'),
('LAOV-03', 'Laminado ovalado', 'Es un tipo de vidrio de seguridad que mantiene su estructura en caso de rotura; los fragmentos tienden a permanecer adheridos a las capas plÃ¡sticas intermedias, reduciÃ©ndose asÃ­ las probabilidades de causar daÃ±o.', '3.5x3.5', 41.00, 'ovalado', NULL, NULL, '2022-05-17 17:40:22'),
('LARE-00', 'Laminado rectangular', 'Es un tipo de vidrio de seguridad que mantiene su estructura en caso de rotura; los fragmentos tienden a permanecer adheridos a las capas plÃ¡sticas intermedias, reduciÃ©ndose asÃ­ las probabilidades de causar daÃ±o.', '3x4.5', 30.50, 'rectangular', NULL, NULL, '2022-05-17 17:40:26'),
('SICI-02', 'Simple circular', 'Puede ser sometido a distintos proceso de transformaciÃ³n. Se adapta con facilidad a casi todas las utilidades que se les quiera dar, desde la formaciÃ³n de ventanas, cristales para muebles, cristales para cuadros, cristales para puertas, etc.', '4x4', 11.80, 'circular', NULL, NULL, '2022-05-17 17:41:26'),
('SICU-01', 'Simple cuadrado', 'Puede ser sometido a distintos proceso de transformaciÃ³n. Se adapta con facilidad a casi todas las utilidades que se les quiera dar, desde la formaciÃ³n de ventanas, cristales para muebles, cristales para cuadros, cristales para puertas, etc.', '4.5x4.5', 8.80, 'cuadrado', NULL, NULL, '2022-05-17 17:41:31'),
('SIOV-03', 'Simple ovalado', 'Puede ser sometido a distintos proceso de transformaciÃ³n. Se adapta con facilidad a casi todas las utilidades que se les quiera dar, desde la formaciÃ³n de ventanas, cristales para muebles, cristales para cuadros, cristales para puertas, etc.', '4x4', 12.90, 'ovalado', NULL, NULL, '2022-05-17 17:41:34'),
('SIRE-00', 'Simple rectangular', 'Puede ser sometido a distintos proceso de transformaciÃ³n. Se adapta con facilidad a casi todas las utilidades que se les quiera dar, desde la formaciÃ³n de ventanas, cristales para muebles, cristales para cuadros, cristales para puertas, etc.', '3x4.5', 8.80, 'rectangular', NULL, NULL, '2022-05-17 17:41:37'),
('TECI-02', 'Templado circular', 'Es considerado un cristal de seguridad, mediante un proceso tÃ©rmico se incrementa su resistencia de 4 a 5 veces mÃ¡s que la de un vidrio normal sin alterar sus propiedades. En caso de fractura, se presenta en pequeÃ±as e inofensivas partÃ­culas.', '3x3', 46.00, 'circular', NULL, NULL, '2022-05-17 17:42:26'),
('TECU-01', 'Templado cuadrado', 'Es considerado un cristal de seguridad, mediante un proceso tÃ©rmico se incrementa su resistencia de 4 a 5 veces mÃ¡s que la de un vidrio normal sin alterar sus propiedades. En caso de fractura, se presenta en pequeÃ±as e inofensivas partÃ­culas.', '4.5x4.5', 34.00, 'cuadrado', NULL, NULL, '2022-05-17 17:42:30'),
('TEOV-03', 'Templado ovalado', 'Es considerado un cristal de seguridad, mediante un proceso tÃ©rmico se incrementa su resistencia de 4 a 5 veces mÃ¡s que la de un vidrio normal sin alterar sus propiedades. En caso de fractura, se presenta en pequeÃ±as e inofensivas partÃ­culas.', '3x3', 46.00, 'ovalado', NULL, NULL, '2022-05-17 17:42:33'),
('TERE-00', 'Templado rectangular', 'Es considerado un cristal de seguridad, mediante un proceso tÃ©rmico se incrementa su resistencia de 4 a 5 veces mÃ¡s que la de un vidrio normal sin alterar sus propiedades. En caso de fractura, se presenta en pequeÃ±as e inofensivas partÃ­culas.', '3x4.5', 34.00, 'rectangular', NULL, NULL, '2022-05-17 17:42:36');

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
(1, 'Admin01', '$2y$10$aj4cRULVuFu7dzgXhJNPDOMyS2r8vVP5u1itqz0hO.AM2cA4VHjQG', '2022-05-13 15:08:19', NULL, '2022-05-13 15:15:33'),
(2, 'Gerente', '$2y$10$CgtAxM/Ke6D.rSh/jJW5b.1.s1wyNFF7yQ6lzfhKcwGIfpmBQz2DG', '2022-05-13 15:16:39', NULL, '2022-05-13 15:17:09'),
(3, 'Sistema', '$2y$10$6nncqyXN8s1iTBgLF.IQjeqTcLdvHdWxthhwaLUVt8io/4x04CVkC', '2022-05-13 15:17:37', NULL, '2022-05-13 15:17:54');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD PRIMARY KEY (`clave`);

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
