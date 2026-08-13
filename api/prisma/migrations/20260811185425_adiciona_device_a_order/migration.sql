/*
  Warnings:

  - A unique constraint covering the columns `[client_id,issue,status,created_by,device]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_client_id_fkey`;

-- DropIndex
DROP INDEX `Order_client_id_issue_status_created_by_key` ON `Order`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `device` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_client_id_issue_status_created_by_device_key` ON `Order`(`client_id`, `issue`, `status`, `created_by`, `device`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
