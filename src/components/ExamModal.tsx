import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { Exam, SubjectCode, ExamDifficulty } from '../types';
import { SUBJECTS } from '../data/seedData';

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exam: Exam) => void;
  editingExam?: Exam | null;
}

export const ExamModal: React.FC<ExamModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingExam,
}) => {
  const [subjectCode, setSubjectCode] = useState<SubjectCode>(
    editingExam?.subjectCode || 'mates'
  );
  const [title, setTitle] = useState<string>(
    editingExam?.title || 'Examen de Matemáticas'
  );
  const [date, setDate] = useState<string>(
    editingExam?.date || new Date().toISOString().split('T')[0]
  );
  const [time, setTime] = useState<string>(editingExam?.time || '09:00');
  const [classroom, setClassroom] = useState<string>(
    editingExam?.classroom || 'Aula 2º B'
  );
  const [topicsText, setTopicsText] = useState<string>(
    editingExam?.topics.join('\n') ||
      SUBJECTS[subjectCode]?.defaultTopics.slice(0, 3).join('\n') ||
      ''
  );
  const [difficulty, setDifficulty] = useState<ExamDifficulty>(
    editingExam?.difficulty || 'media'
  );
  const [confidenceScore, setConfidenceScore] = useState<number>(
    editingExam?.confidenceScore ?? 50
  );
  const [notes, setNotes] = useState<string>(editingExam?.notes || '');

  if (!isOpen) return null;

  const handleSubjectChange = (code: SubjectCode) => {
    setSubjectCode(code);
    const sub = SUBJECTS[code];
    if (sub) {
      if (!editingExam) {
        setTitle(`Examen de ${sub.name}`);
        setTopicsText(sub.defaultTopics.slice(0, 3).join('\n'));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = SUBJECTS[subjectCode];
    const parsedTopics = topicsText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newOrUpdatedExam: Exam = {
      id: editingExam?.id || `exam-${Date.now()}`,
      subjectCode,
      subjectName: sub?.name || 'Asignatura',
      title: title.trim() || `Examen de ${sub?.name || 'Asignatura'}`,
      date,
      time: time || undefined,
      classroom: classroom.trim() || undefined,
      topics: parsedTopics.length > 0 ? parsedTopics : ['Tema general'],
      difficulty,
      confidenceScore,
      notes: notes.trim() || undefined,
      status: editingExam?.status || 'pendiente',
      color: sub?.color || 'from-indigo-600 to-violet-600',
      iconName: sub?.icon || 'BookOpen',
    };

    onSave(newOrUpdatedExam);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {editingExam ? 'Editar Examen' : 'Añadir Nuevo Examen'}
            </h2>
            <p className="text-xs text-slate-500">
              IES Garrigosa (Meliana) • 2º de la ESO
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Asignatura */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Asignatura
            </label>
            <select
              value={subjectCode}
              onChange={(e) => handleSubjectChange(e.target.value as SubjectCode)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {Object.values(SUBJECTS).map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Título del Examen */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Título o Contenido principal
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Álgebra y Ecuaciones de 1er y 2º grado"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Fecha, Hora y Aula */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                Hora
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Aula
              </label>
              <input
                type="text"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                placeholder="Aula 2º B"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Temas específicos */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                Temas a evaluar (uno por línea)
              </label>
              <button
                type="button"
                onClick={() => {
                  const sub = SUBJECTS[subjectCode];
                  if (sub) setTopicsText(sub.defaultTopics.join('\n'));
                }}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Cargar temas estándar 2º ESO
              </button>
            </div>
            <textarea
              rows={3}
              value={topicsText}
              onChange={(e) => setTopicsText(e.target.value)}
              placeholder="Tema 3: Sintaxis y complementos del verbo&#10;Tema 4: Textos argumentativos"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Dificultad y Nivel de Confianza de la alumna */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Dificultad autopercibida
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['baja', 'media', 'alta'] as ExamDifficulty[]).map((dif) => (
                  <button
                    key={dif}
                    type="button"
                    onClick={() => setDifficulty(dif)}
                    className={`py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      difficulty === dif
                        ? dif === 'alta'
                          ? 'bg-rose-500 text-white shadow-xs'
                          : dif === 'media'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {dif}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nivel de seguridad
                </label>
                <span className="text-xs font-extrabold text-indigo-600">
                  {confidenceScore}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={confidenceScore}
                onChange={(e) => setConfidenceScore(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Perdida (0%)</span>
                <span>Preparada (100%)</span>
              </div>
            </div>
          </div>

          {/* Notas o consejos del profesor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Apuntes del profe / Consejos a recordar
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Caerá seguro un ejercicio de la página 34"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-100 transition-all cursor-pointer"
            >
              {editingExam ? 'Guardar Cambios' : 'Añadir al Calendario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
