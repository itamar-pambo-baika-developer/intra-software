-- CreateTable
CREATE TABLE "Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "curso_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Turma_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Matricula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aluno_id" INTEGER NOT NULL,
    "turma_id" INTEGER NOT NULL,
    "data_matricula" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Matricula_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matricula_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TurmaDisciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turma_id" INTEGER NOT NULL,
    "disciplina_id" INTEGER NOT NULL,
    "professor_id" INTEGER NOT NULL,
    CONSTRAINT "TurmaDisciplina_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TurmaDisciplina_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TurmaDisciplina_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trimestre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ano" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "inicio" DATETIME NOT NULL,
    "fim" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Teste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turma_disciplina_id" INTEGER NOT NULL,
    "trimestre_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "peso" REAL NOT NULL,
    CONSTRAINT "Teste_turma_disciplina_id_fkey" FOREIGN KEY ("turma_disciplina_id") REFERENCES "TurmaDisciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Teste_trimestre_id_fkey" FOREIGN KEY ("trimestre_id") REFERENCES "Trimestre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pauta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matricula_id" INTEGER NOT NULL,
    "teste_id" INTEGER NOT NULL,
    "nota" REAL NOT NULL,
    "observacoes" TEXT,
    CONSTRAINT "Pauta_matricula_id_fkey" FOREIGN KEY ("matricula_id") REFERENCES "Matricula" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pauta_teste_id_fkey" FOREIGN KEY ("teste_id") REFERENCES "Teste" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teste_tipo_key" ON "Teste"("tipo");
