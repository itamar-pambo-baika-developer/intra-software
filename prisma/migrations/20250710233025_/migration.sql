/*
  Warnings:

  - Added the required column `alunoId` to the `Teste` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turma_disciplina_id" INTEGER NOT NULL,
    "trimestre_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "peso" REAL NOT NULL,
    "alunoId" INTEGER NOT NULL,
    CONSTRAINT "Teste_turma_disciplina_id_fkey" FOREIGN KEY ("turma_disciplina_id") REFERENCES "TurmaDisciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Teste_trimestre_id_fkey" FOREIGN KEY ("trimestre_id") REFERENCES "Trimestre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Teste_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Teste" ("data", "id", "peso", "tipo", "trimestre_id", "turma_disciplina_id") SELECT "data", "id", "peso", "tipo", "trimestre_id", "turma_disciplina_id" FROM "Teste";
DROP TABLE "Teste";
ALTER TABLE "new_Teste" RENAME TO "Teste";
CREATE UNIQUE INDEX "Teste_tipo_key" ON "Teste"("tipo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
