-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2026 a las 13:04:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dwes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userID` int(11) NOT NULL,
  `columns` varchar(1000) NOT NULL,
  `visibility` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `collection`
--

INSERT INTO `collection` (`id`, `name`, `userID`, `columns`, `visibility`) VALUES
(1, 'holaaa', 3, '[\"cola\",\"color\"]', 'Publico'),
(2, 'test', 3, '[\"asdas\",\"asd\"]', 'Publico'),
(3, 'testAñadir', 3, '[\"asd\",\"asd\"]', 'Publico'),
(4, 'testFinalConSuerte', 3, '[\"tipo\",\"color\"]', 'Publico'),
(5, 'coleccionPrivada', 3, '[\"asd\",\"asd\"]', 'Privado'),
(6, 'holaaaaaaaaaa', 4, '[\"colarr\",\"color\"]', 'Publico'),
(7, 'hola', 8, '[\"hola\",\"holaa\"]', 'Publico'),
(8, 'Comida', 10, '[\"Nombre\",\"Ubicacion\",\"\"]', 'Publico'),
(9, 'Muebles', 10, '[\"Nombre\",\"Color\",\"Ubicacion\"]', 'Publico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collectionproducts`
--

CREATE TABLE `collectionproducts` (
  `productID` int(11) NOT NULL,
  `collectionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `collectionproducts`
--

INSERT INTO `collectionproducts` (`productID`, `collectionID`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 6),
(2, 1),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(11, 9),
(12, 9),
(13, 9),
(14, 9),
(15, 9),
(16, 9),
(17, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `columns` varchar(1000) NOT NULL,
  `visibility` varchar(20) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `columns`, `visibility`, `userID`) VALUES
(1, 'manzana', '{\"color\":\"rojo\",\"sabor\":\"bien\"}', 'Publico', 1),
(2, 'manzana', '{\"color\":\"rojo\",\"sabor\":\"bien\"}', 'Publico', 1),
(3, 'manzana2', '{\"color\":\"rojo\",\"sabor\":\"bien\"}', 'Publico', 3),
(4, 'shijima', '{\"personalidad\":\"intj\",\"race\":\"tonto\"}', 'Publico', 3),
(5, 'shijima', '{\"personalidad\":\"intj\",\"race\":\"tonto\"}', 'Publico', 3),
(6, 'shijima', '{\"personalidad\":\"intj\",\"race\":\"tonto\"}', 'Publico', 3),
(7, 'Paella', '{\"Nombre\":\"Paella\",\"Picor\":\"Poco\",\"Sabor\":\"Rico\"}', 'Publico', 10),
(8, 'Ramen', '{\"Nombre\":\"Paella\",\"Picor\":\"Medio\",\"Sabor\":\"Rico\"}', 'Publico', 10),
(9, 'Sofa', '{\"Nombre\":\"Paella\",\"Ubicacion\":\"Salon\",\"Color\":\"Marron\"}', 'Publico', 10),
(10, 'Mesa', '{\"Nombre\":\"Paella\",\"Ubicacion\":\"Salon\",\"Color\":\"Madera\"}', 'Publico', 10),
(11, 'Mesa1', '{\"Nombre\":\"Mesa\",\"Ubicacion\":\"Salon\",\"Color\":\"Madera\"}', 'Publico', 10),
(12, 'Mesa2', '{\"Nombre\":\"Mesa\",\"Ubicacion\":\"Cocina\",\"Color\":\"Madera\"}', 'Publico', 10),
(13, 'Sofa', '{\"Nombre\":\"Sofa\",\"Ubicacion\":\"Salon\",\"Color\":\"Marron\"}', 'Publico', 10),
(14, 'Estanteria', '{\"Nombre\":\"Estanteria\",\"Ubicacion\":\"Habitacion\",\"Color\":\"Blanco\"}', 'Publico', 10),
(15, 'Cama', '{\"Nombre\":\"Cama\",\"Ubicacion\":\"Habitacion\",\"Color\":\"Rojo\"}', 'Publico', 10),
(16, 'Armario', '{\"Nombre\":\"Armario\",\"Ubicacion\":\"Habitacion\",\"Color\":\"Blanco\"}', 'Publico', 10),
(17, 'Sillon', '{\"Nombre\":\"Sillon\",\"Ubicacion\":\"Salon\",\"Color\":\"Marron\"}', 'Publico', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` char(64) NOT NULL,
  `email` varchar(200) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `enabled`) VALUES
(1, 'hola', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'pepe', 0),
(2, 'juanito', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'juanito', 0),
(3, 'rajoy', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'pepepeepepepe', 0),
(4, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'test', 0),
(5, 'testttt', '45067391d1978eeee40d3f5523a6bb752894e8093b55df76929446877110adfa', 'testttt', 0),
(6, 'testt', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'testt', 0),
(7, 'asd', '688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6', 'asd', 0),
(8, 'sdf', '4bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f877', 'sdfsdf', 0),
(9, 'sdfsdf', '18ee24150dcb1d96752a4d6dd0f20dfd8ba8c38527e40aa8509b7adecf78f9c6', 'sdfsdf', 0),
(10, '', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collection_userID_fkey` (`userID`);

--
-- Indices de la tabla `collectionproducts`
--
ALTER TABLE `collectionproducts`
  ADD PRIMARY KEY (`productID`,`collectionID`),
  ADD KEY `collectionProducts_collectionID_fkey` (`collectionID`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_userID_fkey` (`userID`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `collection_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `collectionproducts`
--
ALTER TABLE `collectionproducts`
  ADD CONSTRAINT `collectionProducts_collectionID_fkey` FOREIGN KEY (`collectionID`) REFERENCES `collection` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `collectionProducts_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
