/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `parametres` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "parametres_label_key" ON "parametres"("label");
