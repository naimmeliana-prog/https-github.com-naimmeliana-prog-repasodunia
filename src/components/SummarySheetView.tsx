import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Copy,
  Check,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { Exam, StudySummary } from '../types';
import { fetchStudySummary } from '../services/api';
import { SUBJECTS } from '../data/seedData';

interface SummarySheetViewProps {
  exams: Exam[];
  selectedExam: Exam | null;
  onSelectExam: (exam: Exam) => void;
}

export const SummarySheetView: React.FC<SummarySheetViewProps> = ({
  exams,
  selectedExam,
  onSelectExam,
}) => {
  const currentExam = selectedExam || exams[0];

  const [summary, setSummary] = useState<StudySummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  const loadSummary = async () => {
    if (!currentExam) return;
    setIsLoading(true);
    try {
      const res = await fetchStudySummary(
        currentExam.subjectCode,
        currentExam.subjectName,
        currentExam.topics.join(', '),
        notes
      );
      setSummary(res.summary);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentExam) {
      loadSummary();
    }
  }, [currentExam?.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (!summary) return;
    const textToCopy = `${summary.title}\nAsignatura: ${summary.subject}\n\n` +
      `PUNTOS CLAVE:\n${summary.keyPoints.map((k) => `• ${k.concept}: ${k.explanation}`).join('\n')}\n\n` +
      `ERRORES TÍPICOS:\n${summary.commonPitfalls.map((p) => `• ${p}`).join('\n')}\n\n` +
      `MNEMOTECNIAS:\n${summary.mnemonics.map((m) => `• ${m}`).join('\n')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subMeta = currentExam ? SUBJECTS[currentExam.subjectCode] : SUBJECTS.mates;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Controls Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Chuleta de Estudio Express • 2º ESO</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Resumen visual y puntos clave para el examen
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Perfecta para imprimir y darle un último repaso 15 minutos antes de entrar a clase.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={currentExam?.id || ''}
            onChange={(e) => {
              const ex = exams.find((x) => x.id === e.target.value);
              if (ex) onSelectExam(ex);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.subjectName} ({ex.title})
              </option>
            ))}
          </select>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Copiar texto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Hoja</span>
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-800">
            Estructurando resumen express con conceptos clave y mnemotecnias...
          </p>
        </div>
      )}

      {/* Printable Sheet */}
      {!isLoading && summary && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
          {/* Header */}
          <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                IES GARRIGOSA (MELIANA) • 2º ESO
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {summary.title}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Asignatura: <strong className="text-slate-700">{summary.subject}</strong> • Fecha de examen: {currentExam?.date}
              </p>
            </div>

            <div className="no-print">
              <button
                onClick={loadSummary}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Regenerar con IA</span>
              </button>
            </div>
          </div>

          {/* Section 1: Conceptos Fundamentales */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                1. Conceptos Fundamentales (Lo que entra seguro)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {summary.keyPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5"
                >
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                    {item.concept}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Errores Típicos & Trampas */}
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                2. Errores Típicos donde casi todos fallan en 2º ESO
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-rose-950 font-medium">
              {summary.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">⚠️</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Reglas Mnemotécnicas */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                3. Trucos y Reglas Mnemotécnicas para memorizar fácil
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-amber-950 font-medium">
              {summary.mnemonics.map((mnem, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">💡</span>
                  <span>{mnem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Ejercicio Estrella Resuelto */}
          {summary.solvedExample && (
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-3">
              <div className="flex items-center gap-2 text-indigo-950">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider">
                  4. Pregunta Típica de Examen Resuelta Paso a Paso
                </h3>
              </div>
              <p className="text-xs font-bold text-indigo-900">
                {summary.solvedExample.question}
              </p>
              <div className="space-y-1.5 pl-2 border-l-2 border-indigo-300">
                {summary.solvedExample.solutionStepByStep.map((step, idx) => (
                  <p key={idx} className="text-xs text-slate-700">
                    {step}
                  </p>
                ))}
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-indigo-100 text-xs font-bold text-indigo-950">
                Resultado final:{' '}
                <span className="text-emerald-700">{summary.solvedExample.finalAnswer}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
