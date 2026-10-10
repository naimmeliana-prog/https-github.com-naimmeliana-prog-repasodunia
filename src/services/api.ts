import { QuizQuestion, Flashcard, StudySummary, OpenAnswerEvaluation, SubjectCode } from '../types';
import { FALLBACK_QUIZZES, FALLBACK_FLASHCARDS } from '../data/fallbackQuestions';

export interface QuizResponse {
  quizTitle: string;
  subject: string;
  summaryTip?: string;
  questions: QuizQuestion[];
  isAiGenerated: boolean;
}

export async function fetchQuiz(
  subjectCode: SubjectCode,
  subjectName: string,
  topics: string,
  examTitle: string,
  questionCount: number = 5,
  difficulty: string = 'media',
  notes: string = ''
): Promise<QuizResponse> {
  try {
    const res = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: subjectName,
        topics,
        examTitle,
        questionCount,
        difficulty,
        notes,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        return {
          quizTitle: data.quizTitle || `Cuestionario de ${subjectName}`,
          subject: data.subject || subjectName,
          summaryTip: data.summaryTip || '¡Lee con calma cada enunciado antes de responder!',
          questions: data.questions.map((q: any, idx: number) => ({
            id: q.id || `ai-${Date.now()}-${idx}`,
            question: q.question,
            options: q.options || [],
            correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
            explanation: q.explanation || 'Respuesta correcta.',
            tip: q.tip || 'Presta atención a los conceptos clave del tema.',
          })),
          isAiGenerated: true,
        };
      }
    }
  } catch (err) {
    console.warn('Backend quiz API call failed or offline, using curricular bank:', err);
  }

  // Curricular fallback
  const fallbackList = FALLBACK_QUIZZES[subjectCode] || FALLBACK_QUIZZES.mates;
  return {
    quizTitle: `Cuestionario Curricular de 2º ESO - ${subjectName}`,
    subject: subjectName,
    summaryTip: 'Preguntas oficiales de 2º de la ESO para asegurar los conceptos clave del examen.',
    questions: fallbackList,
    isAiGenerated: false,
  };
}

export async function fetchFlashcards(
  subjectCode: SubjectCode,
  subjectName: string,
  topics: string,
  count: number = 6,
  notes: string = ''
): Promise<{ flashcards: Flashcard[]; isAiGenerated: boolean }> {
  try {
    const res = await fetch('/api/generate-flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: subjectName,
        topics,
        count,
        notes,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.flashcards && data.flashcards.length > 0) {
        return {
          flashcards: data.flashcards.map((f: any, idx: number) => ({
            id: f.id || `fc-ai-${Date.now()}-${idx}`,
            category: f.category || 'Concepto clave',
            front: f.front,
            back: f.back,
            hint: f.hint || '',
            mastered: false,
          })),
          isAiGenerated: true,
        };
      }
    }
  } catch (err) {
    console.warn('Backend flashcards failed, using fallback:', err);
  }

  const fallbackList = FALLBACK_FLASHCARDS[subjectCode] || FALLBACK_FLASHCARDS.mates;
  return {
    flashcards: fallbackList.map((f) => ({ ...f, mastered: false })),
    isAiGenerated: false,
  };
}

export async function fetchStudySummary(
  subjectCode: SubjectCode,
  subjectName: string,
  topics: string,
  notes: string = ''
): Promise<{ summary: StudySummary; isAiGenerated: boolean }> {
  try {
    const res = await fetch('/api/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: subjectName,
        topics,
        notes,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.keyPoints && data.keyPoints.length > 0) {
        return {
          summary: {
            title: data.title || `Hoja de Repaso Express: ${subjectName}`,
            subject: data.subject || subjectName,
            keyPoints: data.keyPoints,
            commonPitfalls: data.commonPitfalls || [],
            mnemonics: data.mnemonics || [],
            solvedExample: data.solvedExample,
          },
          isAiGenerated: true,
        };
      }
    }
  } catch (err) {
    console.warn('Backend summary failed, creating curriculum summary:', err);
  }

  // Fallback high-yield summary for 2º ESO
  return {
    summary: {
      title: `Chuleta Ética & Puntos Clave de ${subjectName}`,
      subject: subjectName,
      keyPoints: [
        {
          concept: 'Estructuración del tema',
          explanation: 'Comprende el esquema global antes de memorizar datos aislados. Los profesores de 2º ESO buscan que entiendas el porqué.',
        },
        {
          concept: 'Definiciones exactas con palabras clave',
          explanation: 'Aprende los términos técnicos específicos exigidos en los criterios de evaluación de la asignatura.',
        },
        {
          concept: 'Práctica activa con ejercicios modelo',
          explanation: 'Repite al menos 3 ejercicios del libro paso a paso sin mirar la solución antes del examen.',
        },
      ],
      commonPitfalls: [
        'Confundir signos o no cambiar de signo al pasar términos al otro lado del igual.',
        'No justificar la respuesta en las preguntas teóricas.',
        'Leer las preguntas deprisa y responder antes de entender qué se está pidiendo.',
      ],
      mnemonics: [
        'Regla de los 3 vistazos: 1) Lee todo el examen al recibirlo, 2) Empieza por lo que mejor te sabes, 3) Guarda 5 minutos finales para repasar.',
      ],
      solvedExample: {
        question: `Pregunta típica de examen de ${subjectName}: ¿Cómo abordar una cuestión clave del tema?`,
        solutionStepByStep: [
          'Paso 1: Identificar los datos que nos da el enunciado y lo que nos pide.',
          'Paso 2: Escribir la fórmula o regla general aplicable.',
          'Paso 3: Sustituir los valores y desarrollar con orden y limpieza.',
          'Paso 4: Escribir la solución con sus unidades correspondientes bien recuadrada.',
        ],
        finalAnswer: 'Solución justificada y con unidades correctas.',
      },
    },
    isAiGenerated: false,
  };
}

export async function evaluateStudentAnswer(
  subjectName: string,
  question: string,
  studentAnswer: string,
  idealAnswerContext?: string
): Promise<OpenAnswerEvaluation> {
  try {
    const res = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: subjectName,
        question,
        studentAnswer,
        idealAnswerContext,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Open answer evaluation API error:', err);
  }

  // Fallback evaluation if offline
  const lengthScore = Math.min(10, Math.max(5, Math.round(studentAnswer.trim().length / 20) + 4));
  return {
    scoreOutOf10: lengthScore,
    verdict: '¡Buen esfuerzo de redacción!',
    praise: 'Has expresado la idea con tus propias palabras, lo que demuestra que estás razonando el concepto.',
    improvement: 'Intenta incorporar más vocabulario técnico formal y especificar ejemplos concretos para redondear la nota al 10.',
    modelAnswer: idealAnswerContext || 'Una respuesta completa debe definir el concepto principal, citar sus partes fundamentales y dar un ejemplo práctico.',
  };
}

export async function fetchTeaNotes(
  gradeLevel: string,
  subjectCode: SubjectCode,
  subjectName: string,
  unitTitle: string,
  specificTopics: string = '',
  term: string = '1er Trimestre',
  orderNumber: number = 1
): Promise<{ note: any; isAiGenerated: boolean }> {
  try {
    const res = await fetch('/api/generate-tea-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gradeLevel,
        subject: subjectName,
        unitTitle,
        specificTopics,
        term,
        orderNumber,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.coreConcepts && data.coreConcepts.length > 0) {
        return {
          note: {
            id: `tea-${Date.now()}`,
            gradeLevel,
            subjectCode,
            subjectName,
            term,
            orderNumber,
            unitTitle: data.title || unitTitle,
            estimatedStudyTimeMinutes: data.estimatedStudyTimeMinutes || 25,
            executiveSummary: data.executiveSummary,
            coreConcepts: data.coreConcepts,
            stepByStepAlgorithms: data.stepByStepAlgorithms || [],
            comparisonTable: data.comparisonTable,
            mistakesToAvoid: data.mistakesToAvoid || [],
            checkpointsMastery: data.checkpointsMastery || [],
            createdAt: new Date().toISOString().split('T')[0],
          },
          isAiGenerated: true,
        };
      }
    }
  } catch (err) {
    console.warn('Backend TEA notes failed, generating structured pedagogical fallback:', err);
  }

  // Pedagogical structured fallback
  return {
    note: {
      id: `tea-fb-${Date.now()}`,
      gradeLevel,
      subjectCode,
      subjectName,
      term,
      orderNumber,
      unitTitle,
      estimatedStudyTimeMinutes: 25,
      executiveSummary: `Esta unidad de ${subjectName} se centra en comprender y aplicar los conceptos de ${unitTitle} mediante reglas claras paso a paso y ejemplos concretos.`,
      coreConcepts: [
        {
          conceptName: 'Concepto Clave 1',
          literalDefinition: `Definición literal y precisa de los términos de ${unitTitle}.`,
          concreteExample: `Ejemplo concreto de la vida cotidiana aplicado a ${subjectName}.`,
          visualIconHint: 'icono_clave',
        },
        {
          conceptName: 'Concepto Clave 2',
          literalDefinition: 'Procedimiento de resolución sin ambigüedad.',
          concreteExample: 'Caso resuelto paso por paso.',
          visualIconHint: 'procedimiento',
        },
      ],
      stepByStepAlgorithms: [
        {
          taskTitle: `Pasos ordenados para resolver ejercicios de ${unitTitle}`,
          steps: [
            'Paso 1: Leer el enunciado despacio y subrayar los datos exactos que nos dan.',
            'Paso 2: Identificar la regla o fórmula que relaciona estos datos.',
            'Paso 3: Realizar las operaciones con orden en el papel.',
            'Paso 4: Comprobar el resultado y escribirlo con su unidad correspondiente.',
          ],
          solvedCase: 'Ejercicio resuelto con todos los pasos comprobados.',
        },
      ],
      mistakesToAvoid: [
        {
          wrongAction: 'Apresurarse a responder antes de tener claros los datos.',
          whyIsWrong: 'Genera confusión y errores en los cálculos intermedios.',
          correctAction: 'Escribe siempre la lista de datos a un lado antes de empezar.',
        },
      ],
      checkpointsMastery: [
        'Sé que lo domino si puedo explicar la idea central en una sola frase.',
        'Sé que lo domino si puedo resolver un ejercicio modelo sin consultar el libro.',
      ],
      createdAt: new Date().toISOString().split('T')[0],
    },
    isAiGenerated: false,
  };
}

export async function fetchCourseCurriculum(
  gradeLevel: string,
  subjectName: string
): Promise<{ terms: any[]; isAiGenerated: boolean } | null> {
  try {
    const res = await fetch('/api/generate-course-curriculum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gradeLevel, subject: subjectName }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.terms && data.terms.length > 0) {
        return { terms: data.terms, isAiGenerated: true };
      }
    }
  } catch (err) {
    console.warn('Backend curriculum failed:', err);
  }
  return null;
}

