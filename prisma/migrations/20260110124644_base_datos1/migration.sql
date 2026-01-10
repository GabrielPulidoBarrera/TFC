-- CreateTable
CREATE TABLE `family` (
    `cod` VARCHAR(6) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`cod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `cod` VARCHAR(12) NOT NULL,
    `name` VARCHAR(200) NULL,
    `short_name` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `RRP` DECIMAL(10, 2) NOT NULL,
    `family` VARCHAR(6) NOT NULL,

    UNIQUE INDEX `short_name`(`short_name`),
    INDEX `family`(`family`),
    PRIMARY KEY (`cod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `cod` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `tlf` VARCHAR(13) NULL,

    PRIMARY KEY (`cod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock` (
    `product` VARCHAR(12) NOT NULL,
    `store` INTEGER NOT NULL,
    `units` INTEGER NOT NULL,

    INDEX `stock_ibfk_2`(`store`),
    PRIMARY KEY (`product`, `store`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`family`) REFERENCES `family`(`cod`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`product`) REFERENCES `product`(`cod`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`store`) REFERENCES `store`(`cod`) ON DELETE RESTRICT ON UPDATE CASCADE;
