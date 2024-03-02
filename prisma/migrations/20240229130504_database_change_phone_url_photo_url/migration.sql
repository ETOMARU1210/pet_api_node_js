/*
  Warnings:

  - You are about to drop the `PhoneUrl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PhoneUrl";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PhotoUrls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneurlId" INTEGER NOT NULL,
    "phoneurl" TEXT NOT NULL,
    CONSTRAINT "PhotoUrls_phoneurlId_fkey" FOREIGN KEY ("phoneurlId") REFERENCES "Pet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PhotoUrls_phoneurlId_key" ON "PhotoUrls"("phoneurlId");
