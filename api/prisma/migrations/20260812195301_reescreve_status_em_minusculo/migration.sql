/*
  Warnings:

  - You are about to alter the column `status` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('open', 'in_progress', 'done') NOT NULL DEFAULT 'open';
