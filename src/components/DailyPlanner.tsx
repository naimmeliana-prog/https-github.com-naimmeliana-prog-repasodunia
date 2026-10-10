import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Filter,
  Plus,
} from 'lucide-react';
import { Exam, StudySessionItem } from '../types';
import { SUBJECTS } from '../data/seedData';

interface DailyPlannerProps {
  exams: Exam[];
  studySessions: StudySessionItem[];
  onToggleSession: (sessionId: string) => void;
  onAddSession: (newSession: StudySessionItem) => void;
  onStartQuizForTopic: (exam: Exam, topic: string) => void;
  onOpenPomodoro: () => void;
}

export const DailyPlanner: React.FC<DailyPlannerProps> = ({
  exams,
  studySessions,
  onToggleSession,
  onAddSession,
  onStartQuizForTopic,
  onOpenPomodoro,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');
  const [newTopicInput, setNewTopicInput] = useState('');
  const [selectedExamId, setSelectedExamId] = useState(exams[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Group study sessions by date
  const sortedSessions = [...studySessions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filteredSessions = sortedSessions.filter((s) => {
    if (filterMode === 'pending') return !s.completed;
    if (filterMode === 'completed') return s.completed;
    return true;
  });

  // Group by date
  const sessionsByDate: Record<string, StudySessionItem[]> = {};
  filteredSessions.forEach((s) => {
    if (!sessionsByDate[s.date]) {
      sessionsByDate[s.date] = [];
    }
    sessionsByDate[s.date].push(s);
  });

  const getDayLabel = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const fullDate = `${dayNames[target.getDay()]}, ${target.getDate()} de ${monthNames[target.getMonth()]}`;

    if (diff === 0) return `Hoy (${fullDate})`;
    if (diff === 1) return `Mañana (${fullDate})`;
    if (diff === -1) return `Ayer (${fullDate})`;
    if (diff > 1 && diff <= 7) return `${fullDate} (Esta semana)`;
    return fullDate;
  };

  const handleCreateCustomSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicInput.trim() || !selectedExamId) return;

    const parentExam = exams.find((e) => e.id === selectedExamId);
    const newSession: StudySessionItem = {
      id: `session-${Date.now()}`,
      date: selectedDate,
      examId: selectedExamId,
      subjectName: parentExam?.subjectName || 'Repaso',
      topic: newTopicInput.trim(),
      durationMinutes: 25,
      completed: false,
      priority: 'alta',
    };

    onAddSession(newSession);
    setNewTopicInput('');
  };

  const totalSessions = studySessions.length;
  const completedCount = studySessions.filter((s) => s.completed).length;
  const progressPercent = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Planner Summary */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Plan de Estudio Dosificado • Método Micro-Sesiones</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Distribución de temas por fechas
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Estudiar 25 o 50 minutos cada día de forma organizada es la clave para llegar a la semana que viene con seguridad y sin noches de estrés.
          </p>
        </div>

        {/* Overall Completion Progress */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4 min-w-[240px]">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-md shadow-indigo-100">
            <span className="text-base">{progressPercent}%</span>
            <span className="text-[9px] uppercase tracking-wider text-indigo-200 font-normal">Listo</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800">
              {completedCount} de {totalSessions} temas repasados
            </p>
            <button
              onClick={onOpenPomodoro}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" /> Abrir Pomodoro (25 min)
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Quick Add Form */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Mostrar:
            </span>
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'all'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({totalSessions})
              </button>
              <button
                onClick={() => setFilterMode('pending')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'pending'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pendientes ({totalSessions - completedCount})
              </button>
              <button
                onClick={() => setFilterMode('completed')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'completed'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Completados ({completedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Quick Add Custom Study Slot */}
        <form
          onSubmit={handleCreateCustomSession}
          className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2.5"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>Programar repaso:</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.subjectName} ({ex.title.slice(0, 20)}...)
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newTopicInput}
            onChange={(e) => setNewTopicInput(e.target.value)}
            placeholder="Tema o apartado (ej: Regla de los signos y ejercicios 1-5)"
            className="flex-1 min-w-[200px] px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Añadir al día
          </button>
        </form>
      </div>

      {/* Daily Groups */}
      {Object.keys(sessionsByDate).length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">
            No hay sesiones de estudio en este filtro.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Puedes añadir una nueva sesión arriba o cambiar de filtro.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(sessionsByDate).map(([dateStr, sessions]) => (
            <div key={dateStr} className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-extrabold text-slate-800">
                  {getDayLabel(dateStr)}
                </h3>
                <span className="text-[11px] font-bold text-slate-400">
                  ({sessions.length} {sessions.length === 1 ? 'bloque' : 'bloques'})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sessions.map((session) => {
                  const parentExam = exams.find((e) => e.id === session.examId);
                  const subMeta = parentExam
                    ? SUBJECTS[parentExam.subjectCode]
                    : SUBJECTS.mates;

                  return (
                    <div
                      key={session.id}
                      className={`p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                        session.completed
                          ? 'bg-slate-50/70 border-slate-200/60 opacity-75'
                          : 'bg-white border-slate-200 hover:border-indigo-200 shadow-xs hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggleSession(session.id)}
                          className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                          title={
                            session.completed
                              ? 'Marcar como pendiente'
                              : 'Marcar como completado ¡Bravo!'
                          }
                        >
                          {session.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 hover:text-indigo-600" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                subMeta?.badgeBg || 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {session.subjectName}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.durationMinutes} min
                            </span>
                          </div>

                          <p
                            className={`text-sm font-bold text-slate-900 ${
                              session.completed ? 'line-through text-slate-400' : ''
                            }`}
                          >
                            {session.topic}
                          </p>

                          {parentExam && (
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Para examen: {parentExam.title}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quick Quiz Launch button */}
                      {parentExam && !session.completed && (
                        <button
                          onClick={() => onStartQuizForTopic(parentExam, session.topic)}
                          className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                          title="Hacer test directo sobre este tema"
                        >
                          <span>Test</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
