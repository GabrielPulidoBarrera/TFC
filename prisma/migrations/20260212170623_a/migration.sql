/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `family` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `family` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_ibfk_1`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `stock_ibfk_1`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `stock_ibfk_2`;

-- DropIndex
DROP INDEX `family` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    DROP COLUMN `cod`,
    DROP COLUMN `family`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `short_name` VARCHAR(50) NULL,
    MODIFY `RRP` DECIMAL(10, 2) NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `family`;

-- DropTable
DROP TABLE `stock`;

-- DropTable
DROP TABLE `store`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collectionProducts` (
    `productID` INTEGER NOT NULL,
    `collectionID` INTEGER NOT NULL,

    PRIMARY KEY (`productID`, `collectionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `userID` INTEGER NOT NULL,
    `columns` VARCHAR(700) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `collectionProducts` ADD CONSTRAINT `collectionProducts_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collectionProducts` ADD CONSTRAINT `collectionProducts_collectionID_fkey` FOREIGN KEY (`collectionID`) REFERENCES `collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection` ADD CONSTRAINT `collection_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
