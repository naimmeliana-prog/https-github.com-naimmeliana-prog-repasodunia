import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Bell, Coffee, BookOpen } from 'lucide-react';

interface PomodoroTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 mins
  const [isActive, setIsActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play gentle synthesized chime when timer finishes
  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = audioContextRef.current || new AudioContextClass();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      playChime();
      if (mode === 'study') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('study');
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'study' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'study' ? 25 * 60 : 5 * 60);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalSeconds = mode === 'study' ? 25 * 60 : 5 * 60;
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mode Selector */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-2xl mb-6">
          <button
            onClick={() => switchMode('study')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'study'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Estudio (25 min)
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'break'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-4 h-4 text-emerald-600" />
            Descanso (5 min)
          </button>
        </div>

        {/* Circular Clock Display */}
        <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-100 fill-none"
              strokeWidth="7"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`fill-none transition-all duration-500 ${
                mode === 'study' ? 'stroke-indigo-600' : 'stroke-emerald-500'
              }`}
              strokeWidth="7"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold tracking-tight text-slate-800 font-mono">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              {mode === 'study' ? 'Enfoque total' : 'Desconecta la mente'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-md transition-all cursor-pointer ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Comenzar
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Reiniciar reloj"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Friendly Advice */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 flex items-start gap-2 text-left">
          <Bell className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <p>
            {mode === 'study'
              ? 'Consejo para 2º ESO: Pon el móvil en otra habitación o en silencio durante estos 25 minutos. ¡Retendrás el doble en la mitad de tiempo!'
              : '¡Bien hecho! Ahora levántate, estira la espalda, bebe un vaso de agua y no mires pantallas hasta que suene el timbre.'}
          </p>
        </div>
      </div>
    </div>
  );
};
