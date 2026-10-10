import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  Send,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { Exam, OpenAnswerEvaluation } from '../types';
import { evaluateStudentAnswer } from '../services/api';
import { SUBJECTS } from '../data/seedData';

interface OpenQuestionPracticeProps {
  exams: Exam[];
  selectedExam: Exam | null;
  onSelectExam: (exam: Exam) => void;
}

export const OpenQuestionPractice: React.FC<OpenQuestionPracticeProps> = ({
  exams,
  selectedExam,
  onSelectExam,
}) => {
  const currentExam = selectedExam || exams[0];

  const defaultQuestions: Record<string, string> = {
    mates: 'Explica con tus palabras qué es una ecuación de primer grado y cuál es la regla básica para trasponer términos de un lado a otro.',
    lengua: 'Define qué es el Complemento Directo (CD) y explica los dos trucos o pruebas para reconocerlo en una oración.',
    sociales: 'Describe cómo era la sociedad estamental en la Edad Media y qué diferencias había entre los estamentos privilegiados y los no privilegiados.',
    fisica_quimica: 'Explica la diferencia entre una sustancia pura, una mezcla homogénea y una mezcla heterogénea, poniendo un ejemplo cotidiano de cada una.',
    biologia: 'Explica qué función cumplen las vellosidades intestinales en el aparato digestivo y por qué son tan importantes para la nutrición.',
    valencia: 'Explica com s’apostrofa l’article definit masculí "el" en valencià i posa dos exemples.',
    ingles: 'Explain when we use the Past Continuous tense compared to the Past Simple, and give an example using "while".',
    tecnologia: 'Explica la diferencia entre un circuito eléctrico en serie y en paralelo, y qué ocurre en cada uno si una bombilla se funde.',
  };

  const [question, setQuestion] = useState<string>(
    defaultQuestions[currentExam?.subjectCode || 'mates'] ||
      'Explica los conceptos principales que entran en este examen de 2º ESO.'
  );
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<OpenAnswerEvaluation | null>(null);

  const handleSubjectChange = (exam: Exam) => {
    onSelectExam(exam);
    setQuestion(
      defaultQuestions[exam.subjectCode] ||
        `Explica los puntos clave del examen de ${exam.subjectName}.`
    );
    setStudentAnswer('');
    setEvaluation(null);
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswer.trim() || !currentExam) return;

    setIsLoading(true);
    try {
      const res = await evaluateStudentAnswer(
        currentExam.subjectName,
        question,
        studentAnswer
      );
      setEvaluation(res);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1">
              <PenTool className="w-3.5 h-3.5" />
              <span>Simulador de Preguntas de Desarrollo Escritas</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Practica redactar respuestas de examen
            </h2>
          </div>

          <select
            value={currentExam?.id || ''}
            onChange={(e) => {
              const ex = exams.find((x) => x.id === e.target.value);
              if (ex) handleSubjectChange(ex);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.subjectName} ({ex.title})
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          En los exámenes de 2º de ESO, los profesores quitan puntos si la respuesta es demasiado escueta o falta vocabulario técnico. Escribe tu respuesta como si estuvieras en el examen y recibe corrección instantánea orientativa.
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Pregunta de Examen propuesta:
          </label>
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-indigo-950 leading-relaxed">
              {question}
            </p>
          </div>
        </div>

        {/* Answer Textarea */}
        <form onSubmit={handleEvaluate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Tu respuesta (redacta con tus palabras):</span>
              <span className="text-[11px] text-slate-400 font-normal">
                {studentAnswer.trim().split(/\s+/).filter(Boolean).length} palabras
              </span>
            </label>
            <textarea
              rows={5}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Escribe aquí tu respuesta completa, explicando el concepto con claridad y poniendo algún ejemplo..."
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !studentAnswer.trim()}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-300" />
              )}
              <span>Evaluar mi redacción con IA</span>
            </button>
          </div>
        </form>

        {/* Evaluation Output */}
        {evaluation && (
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-mono font-extrabold text-lg shadow-sm">
                  {evaluation.scoreOutOf10}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {evaluation.verdict}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Puntuación orientativa sobre 10
                  </p>
                </div>
              </div>
            </div>

            {/* Praise */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lo que has hecho genial:</span>
              </div>
              <p className="text-emerald-950 pl-5 leading-relaxed">
                {evaluation.praise}
              </p>
            </div>

            {/* Improvement */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Qué te ha faltado para tener el 10:</span>
              </div>
              <p className="text-amber-950 pl-5 leading-relaxed">
                {evaluation.improvement}
              </p>
            </div>

            {/* Model 10/10 Answer */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Respuesta modelo de 10:</span>
              </div>
              <p className="text-slate-700 pl-5 leading-relaxed whitespace-pre-line italic">
                "{evaluation.modelAnswer}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
