export interface Curso {
    id?: number;
    nome: string;
    created_at?: Date;
}

export interface Turma {
    id?: number;
    curso_id: number;
    nome: string;
    ano: number;
    curso?: Curso;
}

export interface Aluno {
    id?: number;
    nome: string;
    email: string;
    numero_de_processo: string;
    created_at?: Date;
}

export interface Professor {
    id?: number;
    nome: string;
    email: string;
    created_at?: Date;
}

export interface Disciplina {
    id?: number;
    nome: string;
}

export interface Matricula {
    id?: number;
    aluno_id: number;
    turma_id: number;
    data_matricula?: Date;
    aluno?: Aluno;
    turma?: Turma;
}

export interface TurmaDisciplina {
    id?: number;
    turma_id: number;
    disciplina_id: number;
    professor_id: number;
    turma?: Turma;
    disciplina?: Disciplina;
    professor?: Professor;
}

export interface Trimestre {
    id?: number;
    ano: number;
    numero: number;
    inicio: Date;
    fim: Date;
}

export enum TipoTeste {
    PROFESSOR = "professor",
    TRIMESTRAL = "trimestral"
}

export interface Teste {
    id?: number;
    turma_disciplina_id: number;
    trimestre_id: number;
    tipo: TipoTeste;
    data: Date;
    peso: number;
    turma_disciplina?: TurmaDisciplina;
    trimestre?: Trimestre;
}

export interface Pauta {
    id?: number;
    matricula_id: number;
    teste_id: number;
    nota: number;
    observacoes?: string;
    matricula?: Matricula;
    teste?: Teste;
}

// Tipos para criação (sem campos opcionais)
export type CreateCurso = Omit<Curso, 'id' | 'created_at'>;
export type CreateTurma = Omit<Turma, 'id'>;
export type CreateAluno = Omit<Aluno, 'id' | 'created_at'>;
export type CreateProfessor = Omit<Professor, 'id' | 'created_at'>;
export type CreateDisciplina = Omit<Disciplina, 'id'>;
export type CreateMatricula = Omit<Matricula, 'id' | 'data_matricula'>;
export type CreateTurmaDisciplina = Omit<TurmaDisciplina, 'id'>;
export type CreateTrimestre = Omit<Trimestre, 'id'>;
export type CreateTeste = Omit<Teste, 'id'>;
export type CreatePauta = Omit<Pauta, 'id'>;

// Tipos para atualização (todos campos opcionais exceto id)
export type UpdateCurso = Partial<Curso> & { id: number };
export type UpdateTurma = Partial<Turma> & { id: number };
export type UpdateAluno = Partial<Aluno> & { id: number };
export type UpdateProfessor = Partial<Professor> & { id: number };
export type UpdateDisciplina = Partial<Disciplina> & { id: number };
export type UpdateMatricula = Partial<Matricula> & { id: number };
export type UpdateTurmaDisciplina = Partial<TurmaDisciplina> & { id: number };
export type UpdateTrimestre = Partial<Trimestre> & { id: number };
export type UpdateTeste = Partial<Teste> & { id: number };
export type UpdatePauta = Partial<Pauta> & { id: number };