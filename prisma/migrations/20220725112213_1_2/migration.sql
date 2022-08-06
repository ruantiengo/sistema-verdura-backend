/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_clientId_fkey";

-- DropTable
DROP TABLE "Client";

-- CreateTable
CREATE TABLE "Costumer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(50),
    "type" VARCHAR(50),
    "cpf_cnpj" VARCHAR(50),
    "note" VARCHAR(255),

    CONSTRAINT "Costumer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Costumer_name_key" ON "Costumer"("name");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Costumer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
