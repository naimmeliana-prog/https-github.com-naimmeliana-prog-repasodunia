import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Award,
  Zap,
  BookOpen,
  Lightbulb,
  Loader2,
  Share2,
} from 'lucide-react';
import { Exam, QuizQuestion, SubjectCode } from '../types';
import { fetchQuiz } from '../services/api';
import { SUBJECTS } from '../data/seedData';

interface QuizRunnerProps {
  exams: Exam[];
  selectedExam: Exam | null;
  onSelectExam: (exam: Exam) => void;
  onQuizCompleted: (examId: string, scoreOutOf10: number) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  exams,
  selectedExam,
  onSelectExam,
  onQuizCompleted,
}) => {
  const currentExam = selectedExam || exams[0];

  // Generator states
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<string>('media');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Active quiz states
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [summaryTip, setSummaryTip] = useState<string>('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);

  // Sound chime helper
  const playSound = (isCorrect: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      if (isCorrect) {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleStartQuiz = async () => {
    if (!currentExam) return;
    setIsLoading(true);
    setApiError(null);

    const topicsToUse = customTopic.trim()
      ? customTopic.trim()
      : currentExam.topics.join(', ');

    try {
      const result = await fetchQuiz(
        currentExam.subjectCode,
        currentExam.subjectName,
        topicsToUse,
        currentExam.title,
        questionCount,
        difficulty,
        notes
      );

      setQuizTitle(result.quizTitle);
      setSummaryTip(result.summaryTip || '');
      setQuestions(result.questions);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setIsAnswerSubmitted(false);
      setQuizFinished(false);
      setIsAiGenerated(result.isAiGenerated);
    } catch (err: any) {
      setApiError('Error al cargar cuestionario. Usando banco de repaso local.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
    setIsAnswerSubmitted(true);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;
    playSound(isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      // Finish quiz
      setQuizFinished(true);
      // Calculate score out of 10
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });
      const scoreOutOf10 = Math.round((correctCount / questions.length) * 10 * 10) / 10;
      if (currentExam) {
        onQuizCompleted(currentExam.id, scoreOutOf10);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  // Score stats calculation
  let correctTotal = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) correctTotal++;
  });
  const score = questions.length > 0 ? (correctTotal / questions.length) * 10 : 0;
  const roundedScore = Math.round(score * 10) / 10;

  const currentQ = questions[currentIndex];
  const subMeta = currentExam ? SUBJECTS[currentExam.subjectCode] : SUBJECTS.mates;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Quiz Setup Header */}
      {questions.length === 0 && !isLoading && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generador Automático de Cuestionarios • 2º ESO LOMLOE</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Prepara tu examen con preguntas reales tipo test
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Genera exámenes de práctica adaptados a las asignaturas del IES Garrigosa. Cada pregunta incluye la explicación pedagógica y trucos para no caer en trampas.
            </p>
          </div>

          {/* Exam Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Selecciona el examen a preparar:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {exams.map((ex) => {
                const isSelected = currentExam?.id === ex.id;
                const meta = SUBJECTS[ex.subjectCode] || SUBJECTS.mates;
                return (
                  <button
                    key={ex.id}
                    onClick={() => {
                      onSelectExam(ex);
                      setCustomTopic('');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 ${meta.badgeBg}`}
                    >
                      {ex.subjectName}
                    </span>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">
                      {ex.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Fecha: {ex.date}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topics & Custom Focus */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                2. Temas a incluir en el cuestionario:
              </label>
              <span className="text-[11px] text-slate-500">
                Temas del examen: {currentExam?.topics.length || 0}
              </span>
            </div>

            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder={`Por defecto: ${currentExam?.topics.join(', ') || 'Todos los temas del examen'}`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-400">
              *Puedes dejarlo vacío para incluir todos los temas del examen, o escribir un tema concreto donde tenga más dudas (ej: "Solo ecuaciones con paréntesis").
            </p>
          </div>

          {/* Number of questions & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Longitud del cuestionario:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setQuestionCount(5)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    questionCount === 5
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ⚡ Test Express (5 preg.)
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionCount(10)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    questionCount === 10
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  🎯 Examen Completo (10 preg.)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                4. Dificultad:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['facil', 'media', 'dificil'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                      difficulty === d
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {d === 'facil' ? 'Básica' : d === 'media' ? 'Estándar' : 'Avanzada'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-2">
            <button
              onClick={handleStartQuiz}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 text-white font-extrabold text-sm shadow-lg shadow-indigo-200 hover:shadow-xl hover:from-indigo-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Generar Cuestionario Inteligente de {currentExam?.subjectName}</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-xs">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Generando preguntas para 2º de la ESO...
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Analizando el temario de {currentExam?.subjectName} y creando preguntas claras con explicaciones pedagógicas.
          </p>
        </div>
      )}

      {/* Active Quiz in Progress */}
      {questions.length > 0 && !quizFinished && currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
          {/* Quiz Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    subMeta?.badgeBg || 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {currentExam?.subjectName}
                </span>
                {isAiGenerated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    Generado con Gemini
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-700">
                {quizTitle || currentExam?.title}
              </h3>
            </div>

            {/* Question Counter Pill */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-slate-500">
                Pregunta {currentIndex + 1} de {questions.length}
              </span>
              <button
                onClick={handleRestartQuiz}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Reiniciar cuestionario"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Options (A, B, C, D) */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const letter = ['A', 'B', 'C', 'D'][optIdx];
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const isCorrectOption = currentQ.correctIndex === optIdx;

              let btnStyle =
                'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-800';
              let badgeStyle = 'bg-slate-100 text-slate-600';

              if (isAnswerSubmitted) {
                if (isCorrectOption) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected && !isCorrectOption) {
                  btnStyle =
                    'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20';
                  badgeStyle = 'bg-rose-500 text-white';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm font-semibold flex-1 pt-0.5">
                    {option}
                  </span>
                  {isAnswerSubmitted && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Didactic Tip (revealed after clicking an option) */}
          {isAnswerSubmitted && (
            <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 animate-in fade-in duration-200">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                    ¿Por qué es esta la respuesta correcta?
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>

              {currentQ.tip && (
                <div className="pt-2 border-t border-indigo-100/80 flex items-start gap-2 text-xs text-indigo-900 font-medium">
                  <span className="font-bold text-indigo-700">💡 Truco de examen:</span>
                  <span>{currentQ.tip}</span>
                </div>
              )}
            </div>
          )}

          {/* Bottom Next Button */}
          {isAnswerSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {currentIndex < questions.length - 1
                    ? 'Siguiente Pregunta'
                    : 'Ver Resultados del Examen'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quiz Finished / Scorecard Screen */}
      {quizFinished && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-amber-800 shadow-xl shadow-amber-100">
            <Trophy className="w-10 h-10 text-amber-700" />
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Resultado del Cuestionario
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-1 mb-2 font-mono">
              {roundedScore} <span className="text-xl text-slate-400 font-normal">/ 10</span>
            </h2>

            {/* Motivational message according to Spanish secondary grade scale */}
            <div className="max-w-md mx-auto">
              {roundedScore >= 9 ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold">
                  🌟 ¡Sobresaliente! Llevas este tema dominado. Sigue repasando un poquito cada día para fijarlo.
                </div>
              ) : roundedScore >= 7 ? (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-800 text-xs font-bold">
                  👏 ¡Notable! Vas por muy buen camino. Revisa los fallos de abajo y tendrás el 10 asegurado.
                </div>
              ) : roundedScore >= 5 ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs font-bold">
                  💪 ¡Aprobado! Tienes las bases, pero necesitas afinar las fórmulas y definiciones antes del examen.
                </div>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-bold">
                  ❤️ ¡Ánimo! Para eso sirve repasar a tiempo. Mira la chuleta del tema y repite el cuestionario.
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="block text-lg font-bold text-slate-800">
                {correctTotal}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Aciertos</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="block text-lg font-bold text-slate-800">
                {questions.length - correctTotal}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Fallos</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="block text-lg font-bold text-slate-800">
                {Math.round((correctTotal / questions.length) * 100)}%
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Precisión</span>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Revisión de respuestas:
            </h4>
            <div className="space-y-2">
              {questions.map((q, idx) => {
                const isCorrect = selectedAnswers[idx] === q.correctIndex;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs ${
                      isCorrect
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                        : 'bg-rose-50/50 border-rose-200/80 text-rose-950'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <span className="font-bold flex-1">{q.question}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6">
                      <strong className="text-slate-800">Respuesta correcta:</strong>{' '}
                      {q.options[q.correctIndex]}
                    </p>
                    <p className="text-[11px] text-slate-500 pl-6 mt-0.5">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir este mismo test</span>
            </button>

            <button
              onClick={() => {
                setQuestions([]);
                handleStartQuiz();
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Generar NUEVAS preguntas con IA</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
