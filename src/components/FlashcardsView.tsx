import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  RotateCw,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Loader2,
  Lightbulb,
} from 'lucide-react';
import { Exam, Flashcard } from '../types';
import { fetchFlashcards } from '../services/api';
import { SUBJECTS } from '../data/seedData';

interface FlashcardsViewProps {
  exams: Exam[];
  selectedExam: Exam | null;
  onSelectExam: (exam: Exam) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  exams,
  selectedExam,
  onSelectExam,
}) => {
  const currentExam = selectedExam || exams[0];

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customTopic, setCustomTopic] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const loadCards = async () => {
    if (!currentExam) return;
    setIsLoading(true);
    setIsFlipped(false);
    setShowHint(false);

    try {
      const topicToUse = customTopic.trim() || currentExam.topics.join(', ');
      const res = await fetchFlashcards(
        currentExam.subjectCode,
        currentExam.subjectName,
        topicToUse,
        6,
        notes
      );
      setFlashcards(res.flashcards);
      setCurrentIndex(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto load initial cards if empty
  React.useEffect(() => {
    if (flashcards.length === 0 && currentExam) {
      loadCards();
    }
  }, [currentExam]);

  const currentCard = flashcards[currentIndex];
  const masteredCount = flashcards.filter((f) => f.mastered).length;

  const handleMarkMastered = () => {
    if (!currentCard) return;
    setFlashcards((prev) =>
      prev.map((c, i) => (i === currentIndex ? { ...c, mastered: true } : c))
    );
    handleNextCard();
  };

  const handleMarkReviewAgain = () => {
    if (!currentCard) return;
    setFlashcards((prev) =>
      prev.map((c, i) => (i === currentIndex ? { ...c, mastered: false } : c))
    );
    handleNextCard();
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const subMeta = currentExam ? SUBJECTS[currentExam.subjectCode] : SUBJECTS.mates;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Banner & Exam Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Tarjetas de Memoria Activa (Flashcards)</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Repaso Rápido de Conceptos y Fórmulas
            </h2>
          </div>

          {/* Exam Selector Dropdown */}
          <select
            value={currentExam?.id || ''}
            onChange={(e) => {
              const ex = exams.find((x) => x.id === e.target.value);
              if (ex) {
                onSelectExam(ex);
                setFlashcards([]);
              }
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.subjectName} ({ex.title})
              </option>
            ))}
          </select>
        </div>

        {/* Generate / Refresh button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
          <p className="text-xs text-slate-500 font-medium">
            Temas activos: <strong className="text-slate-800">{currentExam?.topics[0]}</strong> y más
          </p>
          <button
            onClick={loadCards}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            )}
            <span>Generar Nuevas Tarjetas con IA</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
          <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-800">
            Generando tarjetas de memoria de 2º ESO...
          </p>
        </div>
      )}

      {/* Active Card Container */}
      {!isLoading && currentCard && (
        <div className="space-y-4">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs px-2">
            <span className="font-bold text-slate-500">
              Tarjeta {currentIndex + 1} de {flashcards.length}
            </span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {masteredCount} dominadas ({Math.round((masteredCount / flashcards.length) * 100)}%)
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] sm:min-h-[320px] bg-white rounded-3xl p-8 border-2 border-slate-200/90 shadow-lg hover:border-purple-300 transition-all flex flex-col justify-between relative group select-none"
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                {currentCard.category || 'Concepto clave'}
              </span>

              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 group-hover:text-purple-600 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                Haz clic para girar
              </span>
            </div>

            {/* Card Content (Front vs Back) */}
            <div className="py-6 text-center flex-1 flex flex-col items-center justify-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest">
                    ANVERSO (Pregunta / Concepto)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed max-w-lg mx-auto">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                    REVERSO (Respuesta / Explicación)
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed whitespace-pre-line max-w-lg mx-auto">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer: Hint toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentCard.hint ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHint(!showHint);
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  {showHint ? 'Ocultar pista' : 'Ver pista'}
                </button>
              ) : (
                <div />
              )}

              {currentCard.mastered && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ¡Ya te la sabes!
                </span>
              )}
            </div>

            {/* Hint Box */}
            {showHint && currentCard.hint && (
              <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left animate-in fade-in duration-150">
                <strong>Pista:</strong> {currentCard.hint}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrevCard}
              className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Tarjeta anterior"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkReviewAgain}
                className="px-5 py-3 rounded-2xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🔄 Repasar luego</span>
              </button>

              <button
                onClick={handleMarkMastered}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-100 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>👍 ¡Me la sé!</span>
              </button>
            </div>

            <button
              onClick={handleNextCard}
              className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Siguiente tarjeta"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
