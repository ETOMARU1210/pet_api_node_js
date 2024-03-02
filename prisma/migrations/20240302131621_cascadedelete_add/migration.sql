-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Pet_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("categoryId", "id", "name", "status") SELECT "categoryId", "id", "name", "status" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
CREATE TABLE "new_PhotoUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "petId" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    CONSTRAINT "PhotoUrl_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PhotoUrl" ("id", "petId", "photoUrl") SELECT "id", "petId", "photoUrl" FROM "PhotoUrl";
DROP TABLE "PhotoUrl";
ALTER TABLE "new_PhotoUrl" RENAME TO "PhotoUrl";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
