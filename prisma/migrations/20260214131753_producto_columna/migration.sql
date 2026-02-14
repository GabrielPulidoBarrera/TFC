/*
  Warnings:

  - You are about to drop the column `RRP` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `short_name` on the `product` table. All the data in the column will be lost.
  - Added the required column `columns` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `short_name` ON `product`;

-- AlterTable
ALTER TABLE `collection` MODIFY `columns` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `RRP`,
    DROP COLUMN `description`,
    DROP COLUMN `name`,
    DROP COLUMN `short_name`,
    ADD COLUMN `columns` VARCHAR(1000) NOT NULL;
