/*
  Warnings:

  - Added the required column `processNumber` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "processNumber" INTEGER NOT NULL,
    "birthDate" DATETIME,
    "biNumber" TEXT,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authId" TEXT,
    CONSTRAINT "Aluno_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Authorization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("authId", "created_at", "email", "id", "nome") SELECT "authId", "created_at", "email", "id", "nome" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_biNumber_key" ON "Aluno"("biNumber");
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
CREATE UNIQUE INDEX "Aluno_authId_key" ON "Aluno"("authId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
