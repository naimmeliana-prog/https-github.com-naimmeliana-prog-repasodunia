import React from 'react';
import { Sparkles, Flame, Clock, Printer, RotateCcw, School } from 'lucide-react';

interface HeaderProps {
  streak: number;
  totalQuizzesTaken: number;
  onOpenPomodoro: () => void;
  onResetData: () => void;
  nextExamDays: number | null;
  nextExamSubject: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  streak,
  totalQuizzesTaken,
  onOpenPomodoro,
  onResetData,
  nextExamDays,
  nextExamSubject,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & School Context */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Organizador & Repaso 2º ESO
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  IES Garrigosa • Meliana
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Planificador de las 2 semanas críticas de exámenes y cuestionarios inteligentes
              </p>
            </div>
          </div>

          {/* Gamification & Quick Tools */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Countdown Pill */}
            {nextExamDays !== null && nextExamSubject && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>
                  Próximo: <strong className="font-bold">{nextExamSubject}</strong>{' '}
                  {nextExamDays === 0
                    ? '¡HOY!'
                    : nextExamDays === 1
                    ? '¡MAÑANA!'
                    : `(en ${nextExamDays} días)`}
                </span>
              </div>
            )}

            {/* Streak */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold"
              title="Días seguidos repasando"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{streak} {streak === 1 ? 'día' : 'días'} de racha</span>
            </div>

            {/* Quizzes Taken */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold"
              title="Cuestionarios completados"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{totalQuizzesTaken} repasos hechos</span>
            </div>

            {/* Pomodoro Timer button */}
            <button
              onClick={onOpenPomodoro}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Método de concentración: 25 min de estudio + 5 min de descanso"
            >
              <Clock className="w-4 h-4 text-red-500" />
              <span>Pomodoro 25m</span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Imprimir calendario o chuleta en papel"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            {/* Reset data */}
            <button
              onClick={onResetData}
              className="inline-flex items-center justify-center p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Restablecer exámenes iniciales"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
