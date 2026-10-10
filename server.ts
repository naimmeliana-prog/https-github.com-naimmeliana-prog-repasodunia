import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '2mb' }));

// Initialize GoogleGenAI SDK with user-agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper: Check if error is quota exhaustion or timeout
function isQuotaOrTimeoutError(error: any): boolean {
  if (!error) return false;
  const msg = (error.message || '').toLowerCase();
  const status = error.status || (error.error && error.error.code);
  return (
    status === 429 ||
    status === 'RESOURCE_EXHAUSTED' ||
    msg.includes('quota') ||
    msg.includes('rate') ||
    msg.includes('exceeded') ||
    msg.includes('timeout') ||
    msg.includes('fetch failed')
  );
}

// Fallback generator for TEA Notes (Autismo Grado 2)
function getFallbackTeaNotes(gradeLevel: string, subject: string, unitTitle: string, term: string, orderNumber: number) {
  return {
    title: unitTitle,
    subject: subject,
    gradeLevel: gradeLevel,
    term: term,
    orderNumber: orderNumber,
    estimatedStudyTimeMinutes: 25,
    executiveSummary: `Esta unidad de ${subject} (${unitTitle}) se centra en entender las reglas exactas y los pasos prácticos para resolver ejercicios sin confusión ni sobrecarga.`,
    coreConcepts: [
      {
        conceptName: `Concepto Principal de ${unitTitle}`,
        literalDefinition: `Definición literal y objetiva: es la regla fundamental que se aplica en todas las preguntas de esta unidad de ${subject}.`,
        concreteExample: `Ejemplo concreto de la vida real o del libro de texto: cuando aplicamos esta regla en clase, siempre seguimos el mismo orden.`,
        visualIconHint: 'regla_fija',
      },
      {
        conceptName: 'Procedimiento de Trabajo',
        literalDefinition: 'Secuencia invariable de pasos para llegar a la respuesta correcta sin equivocarse.',
        concreteExample: 'Paso 1 identificar datos, Paso 2 aplicar fórmula, Paso 3 comprobar el resultado final.',
        visualIconHint: 'balanza_orden',
      },
    ],
    stepByStepAlgorithms: [
      {
        taskTitle: `Algoritmo exacto para resolver tareas de ${unitTitle}`,
        steps: [
          'Paso 1: Leer el enunciado despacio una vez completa y subrayar con lápiz los datos que te dan.',
          'Paso 2: Escribir a la izquierda la fórmula o regla que corresponde a estos datos.',
          'Paso 3: Sustituir las letras por sus números correspondientes paso a paso.',
          'Paso 4: Hacer las operaciones con calma, cuidando los signos positivos y negativos.',
          'Paso 5: Escribir la respuesta final recuadrada con su unidad correspondiente (ej: cm, gramos, x=...).',
        ],
        solvedCase: `Caso modelo resuelto: aplicando estos 5 pasos de forma ordenada, la solución queda comprobada y limpia.`,
      },
    ],
    comparisonTable: {
      tableTitle: `Tabla comparativa de ${unitTitle}`,
      columns: ['Concepto o Caso', 'Qué significa', 'Cómo se aplica'],
      rows: [
        ['Caso 1 (Directo)', 'Aplicación directa de la regla base', 'Se sustituyen datos directamente'],
        ['Caso 2 (Con signo opuesto)', 'Requiere cambiar de lado o invertir signo', 'Pasa al otro lado con la operación contraria'],
        ['Comprobación final', 'Verificar si el resultado es coherente', 'Se sustituye el resultado en el enunciado'],
      ],
    },
    mistakesToAvoid: [
      {
        wrongAction: 'Intentar hacer los cálculos de cabeza sin escribir los pasos intermedios en el papel.',
        whyIsWrong: 'Aumenta el riesgo de olvidar un signo o un número y genera ansiedad innecesaria.',
        correctAction: 'Escribe siempre cada línea de cálculo debajo de la anterior.',
      },
      {
        wrongAction: 'Entregar el ejercicio sin comprobar si la respuesta tiene sentido lógico.',
        whyIsWrong: 'Un error simple de cálculo puede arruinar un razonamiento que estaba bien hecho.',
        correctAction: 'Dedica 30 segundos finales a verificar las operaciones básicas.',
      },
    ],
    checkpointsMastery: [
      'Sé que lo domino si puedo explicar la regla principal en 1 sola frase literal.',
      'Sé que lo domino si resuelvo un ejercicio del libro siguiendo los 5 pasos sin dudar.',
      'Sé que lo domino si sé qué error evitar antes de empezar a escribir.',
    ],
  };
}

// Fallback generator for Flashcards
function getFallbackFlashcards(subject: string, topics: string) {
  const isMates = subject.toLowerCase().includes('mat');
  const isLengua = subject.toLowerCase().includes('leng');
  const isFyQ = subject.toLowerCase().includes('fís') || subject.toLowerCase().includes('quím');

  if (isMates) {
    return [
      { id: 'fc-1', category: 'Regla de Signos', front: '¿Qué signo da (-) · (-) al multiplicar?', back: 'Da POSITIVO (+). Signos iguales siempre dan positivo.', hint: 'Menos por menos es más.' },
      { id: 'fc-2', category: 'Ecuaciones', front: '¿Cómo pasa un número que está multiplicando (ej: 3x = 12)?', back: 'Pasa dividiendo al otro lado: x = 12 / 3 = 4.', hint: 'No le cambies el signo, solo la operación.' },
      { id: 'fc-3', category: 'Pitágoras', front: 'Fórmula del Teorema de Pitágoras', back: 'h² = a² + b² (Hipotenusa² = Cateto² + Cateto²).', hint: 'Solo en triángulos con ángulo recto de 90°.' },
      { id: 'fc-4', category: 'Fracciones', front: '¿Cómo se divide una fracción (2/3) : (4/5)?', back: 'Multiplicando en cruz: (2 · 5) / (3 · 4) = 10 / 12 = 5/6.', hint: 'Producto cruzado de términos.' },
    ];
  }

  if (isLengua) {
    return [
      { id: 'fc-1', category: 'Sintaxis', front: '¿Cómo se encuentra el Sujeto sin equivocarse?', back: 'Cambiando el verbo de singular a plural. La palabra que cambie obligatoriamente es el Sujeto.', hint: 'Nunca preguntes quién al verbo.' },
      { id: 'fc-2', category: 'Sintaxis', front: '¿Por qué pronombres se sustituye el Complemento Directo (CD)?', back: 'Por lo, la, los, las.', hint: 'Marina vio a su amiga -> Marina LA vio.' },
      { id: 'fc-3', category: 'Ortografía', front: '¿Cuándo llevan tilde obligatoria las palabras esdrújulas?', back: 'SIEMPRE llevan tilde (ej: música, cámara, pájaro).', hint: 'Regla sin excepciones.' },
      { id: 'fc-4', category: 'Textos', front: '¿Qué partes tiene un texto argumentativo?', back: '1. Introducción  2. Tesis  3. Argumentos  4. Conclusión.', hint: 'Defiende una opinión razonada.' },
    ];
  }

  return [
    { id: 'fc-1', category: 'Concepto Clave', front: `Definición principal de ${topics || subject}`, back: 'Es el concepto fundamental evaluado en este tema curricular.', hint: 'Aprende las palabras clave exactas.' },
    { id: 'fc-2', category: 'Procedimiento', front: 'Pasos para preparar este tema de examen', back: '1. Leer el resumen  2. Resolver un ejercicio modelo  3. Repasar con preguntas tipo test.', hint: 'Método activo de estudio.' },
    { id: 'fc-3', category: 'Error Frecuente', front: '¿Cuál es la trampa típica en este examen?', back: 'Confundir términos parecidos o responder con prisas sin leer todo el enunciado.', hint: 'Lee dos veces cada pregunta.' },
    { id: 'fc-4', category: 'Regla de Oro', front: 'Consejo para sacar la máxima nota', back: 'Escribir con orden, justificar las respuestas y comprobar las unidades.', hint: 'Limpieza y claridad.' },
  ];
}

// Fallback generator for Quizzes
function getFallbackQuiz(subject: string, topics: string, count: number) {
  return {
    quizTitle: `Cuestionario de Repaso • ${subject}`,
    subject: subject,
    summaryTip: 'Lee con calma cada enunciado. En 2º de ESO la clave es descartar primero las opciones imposibles.',
    questions: [
      {
        id: 'q-fb-1',
        question: `En el tema de ${topics || subject}, ¿cuál es la primera regla que debemos aplicar siempre?`,
        options: [
          'Leer los datos con atención y plantear la fórmula o regla correspondiente',
          'Adivinar la respuesta directamente sin hacer cálculos',
          'Copiar cualquier número del enunciado sin entenderlo',
          'Dejar la pregunta en blanco sin intentarlo',
        ],
        correctIndex: 0,
        explanation: 'En los exámenes de 2º de ESO, el orden y la comprensión de los datos aseguran el 90% del éxito.',
        tip: 'Subraya siempre los datos con lápiz antes de operar.',
      },
      {
        id: 'q-fb-2',
        question: `¿Qué debemos hacer cuando un término pasa al otro lado del signo igual (=) en una ecuación o fórmula?`,
        options: [
          'Dejarlo exactamente igual sin cambios',
          'Pasarlo realizando la operación matemática contraria (sumar <-> restar, multiplicar <-> dividir)',
          'Borrarlo de la ecuación',
          'Multiplicarlo por cero',
        ],
        correctIndex: 1,
        explanation: 'La regla de trasposición exige cambiar a la operación opuesta para mantener la igualdad equilibrada.',
        tip: 'Si suma pasa restando; si multiplica pasa dividiendo.',
      },
      {
        id: 'q-fb-3',
        question: `¿Cuál de las siguientes pautas te garantiza una mejor nota en el examen?`,
        options: [
          'Escribir la respuesta final con sus unidades y los pasos ordenados en limpio',
          'Entregar rápido el primero aunque haya dudas',
          'No poner unidades ni justificar',
          'Tachar todo con borrones',
        ],
        correctIndex: 0,
        explanation: 'Los profesores de secundaria valoran enormemente el orden y la claridad en el desarrollo del ejercicio.',
        tip: 'Recuadra la solución final con bolígrafo para que resalte.',
      },
      {
        id: 'q-fb-4',
        question: `Si al comprobar una solución matemática sustituyes el número y ambos lados dan igual, ¿qué significa?`,
        options: [
          'Que el ejercicio está mal resuelto',
          'Que la solución obtenida es 100% correcta y segura',
          'Que hay que repetir todo desde el principio',
          'Que falta un dato',
        ],
        correctIndex: 1,
        explanation: 'La comprobación es la mejor herramienta para tener total certeza antes de entregar.',
        tip: 'Si te sobran 5 minutos en el examen, comprueba tus respuestas.',
      },
      {
        id: 'q-fb-5',
        question: `¿Qué actitud es la más efectiva ante un examen de 2º de la ESO?`,
        options: [
          'Ir paso a paso con tranquilidad, empezando por lo que mejor te sabes',
          'Ponerse nerviosa y no leer los enunciados',
          'Estudiar 6 horas seguidas la noche anterior sin dormir',
          'Rendirse al primer ejercicio difícil',
        ],
        correctIndex: 0,
        explanation: 'Empezar por lo que dominas te da confianza inmediata y asegura puntos valiosos desde el minuto uno.',
        tip: '¡Tú estás preparada! Respira hondo y ve tema a tema.',
      },
    ].slice(0, count),
  };
}

// Endpoint: Generate Quiz Questions for 2º ESO
app.post('/api/generate-quiz', async (req, res) => {
  const { subject, topics, examTitle, questionCount = 5, difficulty = 'media', notes = '' } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json(getFallbackQuiz(subject || 'Repaso', topics || '', questionCount));
  }

  try {
    const systemInstruction = `Eres un docente de 2º de ESO en España (LOMLOE). Genera preguntas claras tipo test sin ambigüedades.`;
    const prompt = `Cuestionario de ${questionCount} preguntas tipo test de ${subject}. Temas: ${topics}. Dificultad: ${difficulty}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            subject: { type: Type.STRING },
            summaryTip: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  tip: { type: Type.STRING },
                },
                required: ['question', 'options', 'correctIndex', 'explanation'],
              },
            },
          },
          required: ['questions', 'quizTitle'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.questions && parsed.questions.length > 0) {
      return res.json({ ...parsed, isAiGenerated: true });
    }
    throw new Error('Respuesta incompleta de Gemini');
  } catch (error: any) {
    console.warn('[Gemini Quiz Fallback]:', error.message || error);
    // Graceful fallback: return valid curricular quiz without failing
    const fallback = getFallbackQuiz(subject || 'Repaso', topics || '', questionCount);
    return res.json({ ...fallback, isAiGenerated: false, isFallback: true });
  }
});

// Endpoint: Generate Flashcards
app.post('/api/generate-flashcards', async (req, res) => {
  const { subject = 'Repaso', topics = '', count = 6, notes = '' } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json({ flashcards: getFallbackFlashcards(subject, topics), isAiGenerated: false, isFallback: true });
  }

  try {
    const prompt = `Genera ${count} flashcards de ${subject} sobre ${topics}. Cada tarjeta con categoría, front y back claro y breve para 2º ESO.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction: 'Tutor de secundaria en España. Crea tarjetas de memoria concisas.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  category: { type: Type.STRING },
                  front: { type: Type.STRING },
                  back: { type: Type.STRING },
                  hint: { type: Type.STRING },
                },
                required: ['front', 'back'],
              },
            },
          },
          required: ['flashcards'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.flashcards && parsed.flashcards.length > 0) {
      return res.json({ flashcards: parsed.flashcards, isAiGenerated: true });
    }
    throw new Error('Flashcards vacías de Gemini');
  } catch (error: any) {
    console.warn('[Gemini Flashcards Fallback]:', error.message || error);
    // Graceful fallback: return curricular flashcards
    const fallbackCards = getFallbackFlashcards(subject, topics);
    return res.json({ flashcards: fallbackCards, isAiGenerated: false, isFallback: true });
  }
});

// Endpoint: Generate Study Sheet / Summary ("Chuleta Ética")
app.post('/api/generate-summary', async (req, res) => {
  const { subject = 'Repaso', topics = '', notes = '' } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      title: `Resumen de Estudio • ${subject}`,
      subject,
      keyPoints: [
        { concept: 'Concepto Fundamental', explanation: `Comprender los conceptos principales de ${topics || subject} antes de memorizar.` },
        { concept: 'Reglas de Aplicación', explanation: 'Aprender la secuencia de pasos para resolver los ejercicios modelo.' },
      ],
      commonPitfalls: ['Apresurarse en los cálculos', 'Olvidar poner las unidades'],
      mnemonics: ['Regla de los 3 vistazos al examen: leer todo, empezar por lo fácil, repasar al final.'],
      isAiGenerated: false,
      isFallback: true,
    });
  }

  try {
    const prompt = `Resumen express de ${subject} sobre ${topics}. Puntos clave, errores típicos y mnemotecnias para 2º ESO.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction: 'Profesor de secundaria en España. Elabora resúmenes claros y didácticos.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subject: { type: Type.STRING },
            keyPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  concept: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['concept', 'explanation'],
              },
            },
            commonPitfalls: { type: Type.ARRAY, items: { type: Type.STRING } },
            mnemonics: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['title', 'keyPoints', 'commonPitfalls', 'mnemonics'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, isAiGenerated: true });
  } catch (error: any) {
    console.warn('[Gemini Summary Fallback]:', error.message || error);
    return res.json({
      title: `Resumen de Estudio • ${subject}`,
      subject,
      keyPoints: [
        { concept: 'Concepto Fundamental', explanation: `Comprender los conceptos principales de ${topics || subject} antes de memorizar.` },
        { concept: 'Reglas de Aplicación', explanation: 'Aprender la secuencia de pasos para resolver los ejercicios modelo.' },
      ],
      commonPitfalls: ['Apresurarse en los cálculos', 'Olvidar poner las unidades'],
      mnemonics: ['Regla de los 3 vistazos al examen: leer todo, empezar por lo fácil, repasar al final.'],
      isAiGenerated: false,
      isFallback: true,
    });
  }
});

// Endpoint: Evaluate open-ended student answer
app.post('/api/evaluate-answer', async (req, res) => {
  const { subject, question, studentAnswer, idealAnswerContext } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    const score = Math.min(10, Math.max(6, Math.round(studentAnswer.trim().length / 20) + 5));
    return res.json({
      scoreOutOf10: score,
      verdict: '¡Buen esfuerzo de redacción!',
      praise: 'Has explicado la idea principal con tus palabras.',
      improvement: 'Añade términos técnicos y un ejemplo concreto para asegurar el 10.',
      modelAnswer: idealAnswerContext || 'Respuesta clara definiendo el concepto y añadiendo un ejemplo.',
    });
  }

  try {
    const prompt = `Evalúa la respuesta de una alumna de 2º ESO: Asignatura: ${subject}. Pregunta: ${question}. Respuesta: ${studentAnswer}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction: 'Profesor cálido y pedagógico de secundaria.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scoreOutOf10: { type: Type.NUMBER },
            verdict: { type: Type.STRING },
            praise: { type: Type.STRING },
            improvement: { type: Type.STRING },
            modelAnswer: { type: Type.STRING },
          },
          required: ['scoreOutOf10', 'verdict', 'praise', 'improvement', 'modelAnswer'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.warn('[Gemini Evaluation Fallback]:', error.message || error);
    const score = Math.min(10, Math.max(6, Math.round((studentAnswer || '').trim().length / 20) + 5));
    return res.json({
      scoreOutOf10: score,
      verdict: '¡Bien razonado!',
      praise: 'Has expresado el concepto con tus propias palabras con buen criterio.',
      improvement: 'Intenta incorporar un ejemplo concreto para completar la respuesta.',
      modelAnswer: idealAnswerContext || 'Una respuesta completa define el concepto y muestra un ejemplo paso a paso.',
    });
  }
});

// Endpoint: Generate Complete Study Notes adapted for Autism Spectrum (TEA Grado 2)
app.post('/api/generate-tea-notes', async (req, res) => {
  const {
    gradeLevel = '2º ESO',
    subject = 'Matemáticas',
    unitTitle = 'Tema de Repaso',
    specificTopics = '',
    term = '1er Trimestre',
    orderNumber = 1,
  } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json(getFallbackTeaNotes(gradeLevel, subject, unitTitle, term, orderNumber));
  }

  try {
    const systemInstruction = `Pedagogo especialista en ESO (LOMLOE España) y TEA Grado 2.
Directrices estrictas:
1. Lenguaje literal directo sin metáforas.
2. Desglose secuencial 1, 2, 3 sin saltos.
3. Ejemplos concretos.
4. Tabla comparativa y qué NO hacer.
5. Concisión para evitar sobrecarga y latencia.`;

    const prompt = `Apuntes TEA para ${gradeLevel} de ${subject}: ${unitTitle}. Trimestre: ${term}. Contenidos: ${specificTopics || unitTitle}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subject: { type: Type.STRING },
            gradeLevel: { type: Type.STRING },
            term: { type: Type.STRING },
            orderNumber: { type: Type.INTEGER },
            estimatedStudyTimeMinutes: { type: Type.INTEGER },
            executiveSummary: { type: Type.STRING },
            coreConcepts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  conceptName: { type: Type.STRING },
                  literalDefinition: { type: Type.STRING },
                  concreteExample: { type: Type.STRING },
                  visualIconHint: { type: Type.STRING },
                },
                required: ['conceptName', 'literalDefinition', 'concreteExample'],
              },
            },
            stepByStepAlgorithms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  taskTitle: { type: Type.STRING },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  solvedCase: { type: Type.STRING },
                },
                required: ['taskTitle', 'steps'],
              },
            },
            comparisonTable: {
              type: Type.OBJECT,
              properties: {
                tableTitle: { type: Type.STRING },
                columns: { type: Type.ARRAY, items: { type: Type.STRING } },
                rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } },
              },
            },
            mistakesToAvoid: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  wrongAction: { type: Type.STRING },
                  whyIsWrong: { type: Type.STRING },
                  correctAction: { type: Type.STRING },
                },
                required: ['wrongAction', 'correctAction'],
              },
            },
            checkpointsMastery: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'title',
            'subject',
            'gradeLevel',
            'term',
            'executiveSummary',
            'coreConcepts',
            'stepByStepAlgorithms',
            'mistakesToAvoid',
            'checkpointsMastery',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.coreConcepts && parsed.coreConcepts.length > 0) {
      return res.json({ ...parsed, isAiGenerated: true });
    }
    throw new Error('Apuntes incompletos de Gemini');
  } catch (error: any) {
    console.warn('[Gemini TEA Notes Fallback]:', error.message || error);
    // Graceful fallback: return comprehensive structured notes
    const fallbackNotes = getFallbackTeaNotes(gradeLevel, subject, unitTitle, term, orderNumber);
    return res.json({ ...fallbackNotes, isAiGenerated: false, isFallback: true });
  }
});

// Endpoint: Generate Full Chronological Curriculum by Term for any Grade Level
app.post('/api/generate-course-curriculum', async (req, res) => {
  const { gradeLevel = '2º ESO', subject = 'Matemáticas' } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      gradeLevel,
      subject,
      terms: [
        { termName: '1er Trimestre', periodMonths: 'Sep - Dic', units: [{ unitNumber: 1, title: 'Unidad Inicial', topics: ['Fundamentos'] }] },
        { termName: '2º Trimestre', periodMonths: 'Ene - Mar', units: [{ unitNumber: 2, title: 'Desarrollo', topics: ['Aplicaciones'] }] },
        { termName: '3er Trimestre', periodMonths: 'Abr - Jun', units: [{ unitNumber: 3, title: 'Consolidación', topics: ['Repaso Final'] }] },
      ],
      isAiGenerated: false,
      isFallback: true,
    });
  }

  try {
    const prompt = `Programación didáctica de 3 trimestres de ${gradeLevel} para ${subject}. Unidades didácticas cronológicas.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction: 'Inspector educativo en España.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gradeLevel: { type: Type.STRING },
            subject: { type: Type.STRING },
            terms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  termName: { type: Type.STRING },
                  periodMonths: { type: Type.STRING },
                  units: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        unitNumber: { type: Type.INTEGER },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['unitNumber', 'title', 'topics'],
                    },
                  },
                },
                required: ['termName', 'units'],
              },
            },
          },
          required: ['gradeLevel', 'subject', 'terms'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, isAiGenerated: true });
  } catch (error: any) {
    console.warn('[Gemini Curriculum Fallback]:', error.message || error);
    return res.json({
      gradeLevel,
      subject,
      terms: [
        { termName: '1er Trimestre', periodMonths: 'Sep - Dic', units: [{ unitNumber: 1, title: 'Unidad Inicial', topics: ['Fundamentos'] }] },
        { termName: '2º Trimestre', periodMonths: 'Ene - Mar', units: [{ unitNumber: 2, title: 'Desarrollo', topics: ['Aplicaciones'] }] },
        { termName: '3er Trimestre', periodMonths: 'Abr - Jun', units: [{ unitNumber: 3, title: 'Consolidación', topics: ['Repaso Final'] }] },
      ],
      isAiGenerated: false,
      isFallback: true,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port} (mode: ${isProduction ? 'prod' : 'dev'})`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
