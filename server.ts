import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '2mb' }));

// Initialize GoogleGenAI SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Generate Quiz Questions for 2º ESO
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { subject, topics, examTitle, questionCount = 5, difficulty = 'media', notes = '' } = req.body;

    if (!subject || !topics) {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios (subject, topics).' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY no está configurada.',
        useFallback: true,
      });
    }

    const systemInstruction = `Eres un docente experto de Educación Secundaria Obligatoria (ESO) en España, con gran empatía hacia los alumnos de 2º de ESO (13-14 años). Tu objetivo es preparar preguntas de examen claras, motivadoras y rigurosas pero adecuadas al nivel cognitivo de 2º de ESO según el currículo LOMLOE (Comunitat Valenciana).
Para cada pregunta, redacta:
1. Una pregunta clara tipo test.
2. 4 opciones (A, B, C, D).
3. El índice de la respuesta correcta (0, 1, 2 o 3).
4. Una explicación didáctica de por qué es la correcta y qué truco o clave hay que recordar para el examen.
5. Pistas mnemotécnicas si aplica.`;

    const prompt = `Genera un cuestionario de ${questionCount} preguntas tipo test de repaso para una alumna de 2º de la ESO del Instituto Garrigosa de Meliana.
Asignatura: ${subject}
Título del examen: ${examTitle || subject}
Temas específicos a evaluar: ${topics}
Nivel de dificultad: ${difficulty}
${notes ? `Apuntes adicionales o énfasis del profesor: ${notes}` : ''}

El idioma debe ser español (o valenciano si la asignatura es 'Valencià').
Devuelve las preguntas en formato JSON estructurado.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            subject: { type: Type.STRING },
            summaryTip: { type: Type.STRING, description: 'Consejo rápido de estudio para este examen' },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
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

    const text = response.text;
    if (!text) {
      throw new Error('Respuesta vacía del modelo Gemini');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-quiz:', error);
    return res.status(500).json({
      error: error.message || 'Error al generar el cuestionario con Gemini.',
      useFallback: true,
    });
  }
});

// Endpoint: Generate Flashcards
app.post('/api/generate-flashcards', async (req, res) => {
  try {
    const { subject, topics, count = 8, notes = '' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY no disponible', useFallback: true });
    }

    const prompt = `Genera ${count} tarjetas de memoria (flashcards) para repasar 2º de ESO.
Asignatura: ${subject}
Temas: ${topics}
${notes ? `Notas adicionales: ${notes}` : ''}
Cada tarjeta debe tener un "anverso" (pregunta, concepto, fórmula, fecha o término clave) y un "reverso" (respuesta concisa y clara fácil de memorizar para un estudiante de 13 años). Añade también una categoría breve (ej: "Vocabulario", "Fórmula", "Definición", "Regla").`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Eres un tutor educativo de secundaria en España. Elabora flashcards de alto impacto visual y conceptual para 2º ESO.',
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
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-flashcards:', error);
    return res.status(500).json({ error: error.message, useFallback: true });
  }
});

// Endpoint: Generate Study Sheet / Summary ("Chuleta Ética")
app.post('/api/generate-summary', async (req, res) => {
  try {
    const { subject, topics, notes = '' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY no disponible', useFallback: true });
    }

    const prompt = `Crea una hoja de resumen express ("Chuleta de estudio") para preparar el examen de 2º de ESO.
Asignatura: ${subject}
Temas: ${topics}
${notes ? `Apuntes del alumno: ${notes}` : ''}

Estructura el contenido en:
1. Conceptos fundamentales imprescindibles (lo que SIEMPRE cae en examen).
2. Fórmulas, reglas ortográficas o esquemas clave.
3. Errores típicos y trampas frecuentes de alumnos de 2º de ESO en este tema.
4. Reglas mnemotécnicas divertidas para memorizar sin esfuerzo.
5. Pregunta estrella típica de examen resuelta paso a paso.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Eres un profesor particular que ayuda a una alumna de 2º de ESO a superar con éxito sus exámenes sin estrés, organizando la materia con claridad cristalina.',
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
            commonPitfalls: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            mnemonics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            solvedExample: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                solutionStepByStep: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                finalAnswer: { type: Type.STRING },
              },
              required: ['question', 'solutionStepByStep', 'finalAnswer'],
            },
          },
          required: ['title', 'keyPoints', 'commonPitfalls', 'mnemonics'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-summary:', error);
    return res.status(500).json({ error: error.message, useFallback: true });
  }
});

// Endpoint: Evaluate open-ended student answer
app.post('/api/evaluate-answer', async (req, res) => {
  try {
    const { subject, question, studentAnswer, idealAnswerContext } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY no disponible' });
    }

    const prompt = `Evalúa la respuesta de una alumna de 2º de ESO:
Asignatura: ${subject}
Pregunta: ${question}
Respuesta de la alumna: ${studentAnswer}
${idealAnswerContext ? `Contexto o respuesta esperada: ${idealAnswerContext}` : ''}

Proporciona:
1. Puntuación orientativa de 0 a 10.
2. Tono muy alentador, motivador y constructivo (apropiado para 13 años).
3. Qué ha hecho muy bien.
4. Qué detalle o concepto le ha faltado para tener el 10.
5. Ejemplo de respuesta de 10 redactada con claridad.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Eres un profesor cálido, motivador y riguroso de secundaria.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scoreOutOf10: { type: Type.NUMBER },
            verdict: { type: Type.STRING, description: 'Ej: ¡Excelente!, ¡Muy bien encaminada!, ¡Buen intento, afina estos detalles!' },
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
    console.error('Error in /api/evaluate-answer:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint: Generate Complete Study Notes adapted for Autism Spectrum (TEA Grado 2)
app.post('/api/generate-tea-notes', async (req, res) => {
  try {
    const {
      gradeLevel = '2º ESO',
      subject,
      unitTitle,
      specificTopics = '',
      term = '1er Trimestre',
      orderNumber = 1,
    } = req.body;

    if (!subject || !unitTitle) {
      return res.status(400).json({ error: 'Faltan parámetros (subject, unitTitle).' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY no disponible', useFallback: true });
    }

    const systemInstruction = `Eres un pedagogo especialista en Educación Secundaria (ESO y Bachillerato en España, currículo LOMLOE) y en intervención para alumnado con Trastorno del Espectro Autista (TEA Grado 2 / Apoyo Notable).
CRITERIOS PEDAGÓGICOS CRUCIALES PARA TEA GRADO 2:
1. Claridad Literal y Estructura Predecible: Evita dobles sentidos, metáforas confusas o expresiones ambiguas. El lenguaje debe ser directo, claro, afirmativo y respetuoso.
2. Desglose Secuencial (Algoritmos Paso a Paso): En cada procedimiento o regla, desglosa EXACTAMENTE los pasos en orden 1, 2, 3, sin saltos implícitos.
3. Ejemplos Concretos Inmediatos: Cada definición debe ir seguida de un ejemplo de la vida real o matemático/científico tangible.
4. Apoyo Visual Mental: Esquemas, tablas comparativas explícitas y lista de comprobación de dominio.
5. Qué NO hacer: Indicar explícitamente qué errores evitar para prevenir la frustración y la sobrecarga cognitiva.`;

    const prompt = `Genera un cuaderno completo de apuntes y resumen estructurado para una alumna con TEA de ${gradeLevel}:
Asignatura: ${subject}
Unidad / Tema: ${unitTitle}
Trimestre: ${term} (Tema cronológico Nº ${orderNumber})
Contenidos específicos o énfasis: ${specificTopics || 'Currículo oficial LOMLOE completo de esta unidad'}

Elabora unos apuntes definitivos, exhaustivos pero sin sobrecarga sensorial, que le sirvan para entender la materia en profundidad y repasar antes de cualquier examen.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
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
            executiveSummary: { type: Type.STRING, description: 'Idea central de la unidad explicada en 2 o 3 frases claras y literales' },
            coreConcepts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  conceptName: { type: Type.STRING },
                  literalDefinition: { type: Type.STRING },
                  concreteExample: { type: Type.STRING },
                  visualIconHint: { type: Type.STRING, description: 'Ej: regla, formula, balanza, arbol, mapa' },
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
                  steps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  solvedCase: { type: Type.STRING },
                },
                required: ['taskTitle', 'steps'],
              },
            },
            comparisonTable: {
              type: Type.OBJECT,
              properties: {
                tableTitle: { type: Type.STRING },
                columns: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                rows: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
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
              items: { type: Type.STRING, description: 'Frase que empieza por "Sé que lo domino si puedo..."' },
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
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-tea-notes:', error);
    return res.status(500).json({ error: error.message, useFallback: true });
  }
});

// Endpoint: Generate Full Chronological Curriculum by Term for any Grade Level
app.post('/api/generate-course-curriculum', async (req, res) => {
  try {
    const { gradeLevel = '2º ESO', subject } = req.body;

    if (!subject) {
      return res.status(400).json({ error: 'Falta el parámetro subject' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY no disponible', useFallback: true });
    }

    const prompt = `Genera la programación didáctica cronológica completa para ${gradeLevel} en España (LOMLOE, Comunitat Valenciana) de la asignatura ${subject}.
Organízala estrictamente en 3 trimestres:
- 1er Trimestre (Septiembre - Diciembre)
- 2º Trimestre (Enero - Marzo)
- 3er Trimestre (Abril - Junio)

Para cada trimestre, enumera las unidades didácticas en orden cronológico con sus temas clave.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Eres un inspector educativo y jefe de departamento de secundaria en España.',
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
                        topics: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
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
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-course-curriculum:', error);
    return res.status(500).json({ error: error.message, useFallback: true });
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

startServer();
