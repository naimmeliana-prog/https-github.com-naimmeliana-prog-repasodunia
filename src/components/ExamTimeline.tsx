import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Plus,
  PlayCircle,
  FileText,
  Sparkles,
  Layers,
  Edit2,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { Exam } from '../types';
import { SUBJECTS } from '../data/seedData';

interface ExamTimelineProps {
  exams: Exam[];
  onAddExam: () => void;
  onEditExam: (exam: Exam) => void;
  onDeleteExam: (examId: string) => void;
  onStartQuiz: (exam: Exam) => void;
  onOpenFlashcards: (exam: Exam) => void;
  onOpenSummary: (exam: Exam) => void;
  onConfidenceChange: (examId: string, newScore: number) => void;
}

export const ExamTimeline: React.FC<ExamTimelineProps> = ({
  exams,
  onAddExam,
  onEditExam,
  onDeleteExam,
  onStartQuiz,
  onOpenFlashcards,
  onOpenSummary,
  onConfidenceChange,
}) => {
  // Sort exams chronologically
  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Helper to calculate days from today
  const getDaysDiff = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(dateStr);
    examDate.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${dayNames[date.getDay()]}, ${date.getDate()} de ${monthNames[date.getMonth()]}`;
  };

  // Group exams by upcoming 2 weeks
  // Week 1: within 7 days
  // Week 2: between 8 and 14 days (or remaining)
  const week1Exams = sortedExams.filter((ex) => {
    const d = getDaysDiff(ex.date);
    return d <= 7;
  });

  const week2Exams = sortedExams.filter((ex) => {
    const d = getDaysDiff(ex.date);
    return d > 7;
  });

  const renderExamCard = (exam: Exam) => {
    const daysDiff = getDaysDiff(exam.date);
    const subMeta = SUBJECTS[exam.subjectCode] || SUBJECTS.mates;

    // Urgency styling
    let urgencyBadge = {
      text: `En ${daysDiff} días`,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
    };
    if (daysDiff < 0) {
      urgencyBadge = {
        text: 'Finalizado',
        color: 'bg-slate-100 text-slate-600 border-slate-200',
        dot: 'bg-slate-400',
      };
    } else if (daysDiff === 0) {
      urgencyBadge = {
        text: '¡HOY!',
        color: 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold animate-pulse',
        dot: 'bg-rose-600',
      };
    } else if (daysDiff === 1) {
      urgencyBadge = {
        text: '¡MAÑANA!',
        color: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
        dot: 'bg-rose-500',
      };
    } else if (daysDiff <= 3) {
      urgencyBadge = {
        text: `¡En ${daysDiff} días!`,
        color: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
        dot: 'bg-amber-500',
      };
    }

    return (
      <div
        key={exam.id}
        className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 pt-6 flex flex-col justify-between relative group overflow-hidden"
      >
        {/* Subject Vibrant Top Color Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${subMeta.color}`} />

        {/* Top Header */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold border shadow-2xs ${subMeta.badgeBg}`}
              >
                {exam.subjectName}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${urgencyBadge.color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${urgencyBadge.dot}`} />
                {urgencyBadge.text}
              </span>
            </div>

            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditExam(exam)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Editar este examen"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteExam(exam.id)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Eliminar examen"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Exam Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1.5">
            {exam.title}
          </h3>

          {/* Date, Time & Classroom */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mb-3 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDateDisplay(exam.date)}
            </span>
            {exam.time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {exam.time} h
              </span>
            )}
            {exam.classroom && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {exam.classroom}
              </span>
            )}
          </div>

          {/* Topics List */}
          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 mb-3.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-slate-500" />
              Temas incluidos ({exam.topics.length}):
            </p>
            <ul className="space-y-1">
              {exam.topics.slice(0, 3).map((topic, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-700 flex items-start gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span className="line-clamp-1">{topic}</span>
                </li>
              ))}
              {exam.topics.length > 3 && (
                <li className="text-[11px] text-slate-400 italic pl-3">
                  +{exam.topics.length - 3} temas más...
                </li>
              )}
            </ul>
          </div>

          {/* Teacher's note if available */}
          {exam.notes && (
            <div className="mb-3.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span className="line-clamp-2 italic">{exam.notes}</span>
            </div>
          )}

          {/* Confidence Score Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                Preparación estimada:
              </span>
              <span
                className={`font-extrabold ${
                  exam.confidenceScore >= 70
                    ? 'text-emerald-600'
                    : exam.confidenceScore >= 45
                    ? 'text-amber-600'
                    : 'text-rose-600'
                }`}
              >
                {exam.confidenceScore}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  exam.confidenceScore >= 70
                    ? 'bg-emerald-500'
                    : exam.confidenceScore >= 45
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${exam.confidenceScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons to Launch Quizzes & Flashcards */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => onStartQuiz(exam)}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer group/btn"
            title="Generar cuestionario interactivo de este examen"
          >
            <PlayCircle className="w-4 h-4 text-indigo-600 group-hover/btn:scale-110 transition-transform mb-0.5" />
            <span>Test</span>
          </button>

          <button
            onClick={() => onOpenFlashcards(exam)}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all cursor-pointer group/btn"
            title="Repasar tarjetas de memoria"
          >
            <Layers className="w-4 h-4 text-purple-600 group-hover/btn:scale-110 transition-transform mb-0.5" />
            <span>Tarjetas</span>
          </button>

          <button
            onClick={() => onOpenSummary(exam)}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all cursor-pointer group/btn"
            title="Ver chuleta y resumen de estudio"
          >
            <FileText className="w-4 h-4 text-emerald-600 group-hover/btn:scale-110 transition-transform mb-0.5" />
            <span>Chuleta</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Banner & Add Button */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
          <Sparkles className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Plan Estratégico para 2º ESO • IES Garrigosa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Organiza tus 2 semanas sin agobios
          </h2>
          <p className="text-indigo-100 text-sm leading-relaxed mb-5">
            Divide los temas, repasa 25 minutos al día con cuestionarios interactivos
            y no dejes nada para el último día. ¡Tú puedes sacar la mejor nota!
          </p>

          <button
            onClick={onAddExam}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-indigo-700 font-extrabold text-sm shadow-lg shadow-indigo-900/20 hover:bg-indigo-50 hover:shadow-xl transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Nuevo Examen</span>
          </button>
        </div>
      </div>

      {/* Week 1: La Semana que Viene */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Semana 1: Exámenes más próximos (La semana que viene)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
              {week1Exams.length} {week1Exams.length === 1 ? 'examen' : 'exámenes'}
            </span>
          </div>
        </div>

        {week1Exams.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 font-medium">
              No tienes exámenes programados para esta primera semana. ¡Aprovecha para adelantar materia de la siguiente!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {week1Exams.map(renderExamCard)}
          </div>
        )}
      </div>

      {/* Week 2: La Otra Semana */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-600"></div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Semana 2: Segunda tanda de exámenes (La otra semana)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 text-violet-800">
              {week2Exams.length} {week2Exams.length === 1 ? 'examen' : 'exámenes'}
            </span>
          </div>
        </div>

        {week2Exams.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 font-medium">
              No hay exámenes programados para la segunda semana.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {week2Exams.map(renderExamCard)}
          </div>
        )}
      </div>
    </div>
  );
};
