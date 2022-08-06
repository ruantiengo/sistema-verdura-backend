/*
  Warnings:

  - You are about to drop the column `birthday` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "birthday";

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");
