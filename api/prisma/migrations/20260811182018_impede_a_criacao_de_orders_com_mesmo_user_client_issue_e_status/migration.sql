/*
  Warnings:

  - A unique constraint covering the columns `[client_id,issue,status,created_by]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Order_client_id_issue_status_created_by_key` ON `Order`(`client_id`, `issue`, `status`, `created_by`);
