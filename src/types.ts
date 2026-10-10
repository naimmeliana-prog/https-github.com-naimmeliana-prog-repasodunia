export type SubjectCode = 
  | 'mates'
  | 'lengua'
  | 'sociales'
  | 'fisica_quimica'
  | 'biologia'
  | 'valencia'
  | 'ingles'
  | 'tecnologia'
  | 'musica'
  | 'plastica'
  | 'otro';

export type GradeLevel = 
  | '1º ESO'
  | '2º ESO'
  | '3º ESO'
  | '4º ESO'
  | '1º Bachillerato'
  | '2º Bachillerato';

export type SchoolTerm = '1er Trimestre' | '2º Trimestre' | '3er Trimestre';

export interface CurriculumUnit {
  unitNumber: number;
  title: string;
  description?: string;
  topics: string[];
}

export interface CurriculumTerm {
  termName: string;
  periodMonths: string;
  units: CurriculumUnit[];
}

export interface ChronologicalCurriculum {
  gradeLevel: GradeLevel;
  subjectCode: SubjectCode;
  subjectName: string;
  terms: CurriculumTerm[];
}

export interface TeaCoreConcept {
  conceptName: string;
  literalDefinition: string;
  concreteExample: string;
  visualIconHint?: string;
}

export interface TeaAlgorithm {
  taskTitle: string;
  steps: string[];
  solvedCase?: string;
}

export interface TeaMistakeToAvoid {
  wrongAction: string;
  whyIsWrong?: string;
  correctAction: string;
}

export interface TeaComparisonTable {
  tableTitle: string;
  columns: string[];
  rows: string[][];
}

export interface TeaStudyNote {
  id: string;
  gradeLevel: GradeLevel;
  subjectCode: SubjectCode;
  subjectName: string;
  term: SchoolTerm;
  orderNumber: number;
  unitTitle: string;
  estimatedStudyTimeMinutes?: number;
  executiveSummary: string;
  coreConcepts: TeaCoreConcept[];
  stepByStepAlgorithms: TeaAlgorithm[];
  comparisonTable?: TeaComparisonTable;
  mistakesToAvoid: TeaMistakeToAvoid[];
  checkpointsMastery: string[];
  userNotes?: string;
  isCompleted?: boolean;
  createdAt: string;
}

export type ExamDifficulty = 'baja' | 'media' | 'alta';

export type ExamStatus = 'pendiente' | 'repasando' | 'listo';

export interface Exam {
  id: string;
  subjectCode: SubjectCode;
  subjectName: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  classroom?: string;
  topics: string[];
  difficulty: ExamDifficulty;
  confidenceScore: number; // 0 to 100
  notes?: string;
  status: ExamStatus;
  color: string;
  iconName: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tip?: string;
}

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  hint?: string;
  mastered?: boolean;
}

export interface StudySummary {
  title: string;
  subject: string;
  keyPoints: {
    concept: string;
    explanation: string;
  }[];
  commonPitfalls: string[];
  mnemonics: string[];
  solvedExample?: {
    question: string;
    solutionStepByStep: string[];
    finalAnswer: string;
  };
}

export interface OpenAnswerEvaluation {
  scoreOutOf10: number;
  verdict: string;
  praise: string;
  improvement: string;
  modelAnswer: string;
}

export interface StudySessionItem {
  id: string;
  date: string; // YYYY-MM-DD
  examId: string;
  subjectName: string;
  topic: string;
  durationMinutes: number;
  completed: boolean;
  priority: 'alta' | 'media' | 'baja';
}
