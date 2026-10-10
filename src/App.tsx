import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckSquare,
  Sparkles,
  Layers,
  FileText,
  PenTool,
  Clock,
  BookOpen,
  School,
  Heart,
  Plus,
} from 'lucide-react';
import { Exam, StudySessionItem } from './types';
import { INITIAL_EXAMS } from './data/seedData';
import { Header } from './components/Header';
import { ExamTimeline } from './components/ExamTimeline';
import { DailyPlanner } from './components/DailyPlanner';
import { QuizRunner } from './components/QuizRunner';
import { FlashcardsView } from './components/FlashcardsView';
import { SummarySheetView } from './components/SummarySheetView';
import { OpenQuestionPractice } from './components/OpenQuestionPractice';
import { ExamModal } from './components/ExamModal';
import { PomodoroTimer } from './components/PomodoroTimer';
import { TeaNotesHub } from './components/TeaNotesHub';

type TabType = 'timeline' | 'daily' | 'tea_notes' | 'quiz' | 'flashcards' | 'summary' | 'open_answer';

export default function App() {
  // LocalStorage state for exams
  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const saved = localStorage.getItem('garrigosa_exams_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_EXAMS;
  });

  // LocalStorage state for daily study sessions
  const [studySessions, setStudySessions] = useState<StudySessionItem[]>(() => {
    try {
      const saved = localStorage.getItem('garrigosa_sessions_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Auto-create initial smart sessions distributed across dates
    return [
      {
        id: 's-1',
        date: '2026-10-11',
        examId: 'exam-1',
        subjectName: 'Matemáticas',
        topic: 'Monomios, polinomios y quitar paréntesis',
        durationMinutes: 25,
        completed: true,
        priority: 'alta',
      },
      {
        id: 's-2',
        date: '2026-10-12',
        examId: 'exam-1',
        subjectName: 'Matemáticas',
        topic: 'Ecuaciones de 1er grado con denominadores (m.c.m.)',
        durationMinutes: 25,
        completed: false,
        priority: 'alta',
      },
      {
        id: 's-3',
        date: '2026-10-13',
        examId: 'exam-1',
        subjectName: 'Matemáticas',
        topic: 'Simulacro de problemas con ecuaciones de examen',
        durationMinutes: 25,
        completed: false,
        priority: 'alta',
      },
      {
        id: 's-4',
        date: '2026-10-13',
        examId: 'exam-2',
        subjectName: 'Lengua Castellana',
        topic: 'Reconocer Sujeto por concordancia y predicado',
        durationMinutes: 25,
        completed: false,
        priority: 'media',
      },
      {
        id: 's-5',
        date: '2026-10-14',
        examId: 'exam-2',
        subjectName: 'Lengua Castellana',
        topic: 'Complemento Directo (lo/la) y Atributo (ser/estar)',
        durationMinutes: 25,
        completed: false,
        priority: 'media',
      },
      {
        id: 's-6',
        date: '2026-10-15',
        examId: 'exam-2',
        subjectName: 'Lengua Castellana',
        topic: 'Textos argumentativos y repaso general sintaxis',
        durationMinutes: 25,
        completed: false,
        priority: 'media',
      },
      {
        id: 's-7',
        date: '2026-10-17',
        examId: 'exam-3',
        subjectName: 'Geografía e Historia',
        topic: 'Etapas de Al-Ándalus (Emirato, Califato de Córdoba)',
        durationMinutes: 25,
        completed: false,
        priority: 'media',
      },
      {
        id: 's-8',
        date: '2026-10-18',
        examId: 'exam-3',
        subjectName: 'Geografía e Historia',
        topic: 'La pirámide feudal y el pacto de vasallaje',
        durationMinutes: 25,
        completed: false,
        priority: 'media',
      },
      {
        id: 's-9',
        date: '2026-10-19',
        examId: 'exam-4',
        subjectName: 'Física y Química',
        topic: 'Densidad (d = m / V) y cambios de estado de la materia',
        durationMinutes: 25,
        completed: false,
        priority: 'alta',
      },
      {
        id: 's-10',
        date: '2026-10-20',
        examId: 'exam-4',
        subjectName: 'Física y Química',
        topic: 'Problemas de concentración de disoluciones en g/L',
        durationMinutes: 25,
        completed: false,
        priority: 'alta',
      },
      {
        id: 's-11',
        date: '2026-10-21',
        examId: 'exam-6',
        subjectName: 'Valencià: Llengua',
        topic: 'Pronoms febles bàsics i regles d’apostrofació',
        durationMinutes: 25,
        completed: false,
        priority: 'media',
      },
      {
        id: 's-12',
        date: '2026-10-22',
        examId: 'exam-5',
        subjectName: 'Inglés (English)',
        topic: 'Past Simple vs Continuous (when / while) and Modals',
        durationMinutes: 25,
        completed: false,
        priority: 'baja',
      },
    ];
  });

  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('garrigosa_streak');
      return saved ? parseInt(saved, 10) : 3;
    } catch {}
    return 3;
  });

  const [totalQuizzesTaken, setTotalQuizzesTaken] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('garrigosa_quizzes_count');
      return saved ? parseInt(saved, 10) : 4;
    } catch {}
    return 4;
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('timeline');

  // Selected exam for quiz / flashcards / summary
  const [selectedExam, setSelectedExam] = useState<Exam | null>(exams[0] || null);

  // Modals
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('garrigosa_exams_v1', JSON.stringify(exams));
    } catch {}
  }, [exams]);

  useEffect(() => {
    try {
      localStorage.setItem('garrigosa_sessions_v1', JSON.stringify(studySessions));
    } catch {}
  }, [studySessions]);

  useEffect(() => {
    try {
      localStorage.setItem('garrigosa_streak', streak.toString());
      localStorage.setItem('garrigosa_quizzes_count', totalQuizzesTaken.toString());
    } catch {}
  }, [streak, totalQuizzesTaken]);

  // Next exam calculation
  const getNextExamInfo = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = [...exams]
      .filter((ex) => {
        const d = new Date(ex.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime() >= today.getTime();
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcoming.length === 0) return { days: null, subject: null };

    const first = upcoming[0];
    const target = new Date(first.date);
    target.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { days: diffDays, subject: first.subjectName };
  };

  const nextInfo = getNextExamInfo();

  // Handlers for Exam CRUD
  const handleSaveExam = (exam: Exam) => {
    if (editingExam) {
      setExams((prev) => prev.map((e) => (e.id === exam.id ? exam : e)));
    } else {
      setExams((prev) => [...prev, exam]);
      // Also add recommended study sessions for this new exam
      const newSessions: StudySessionItem[] = exam.topics.slice(0, 2).map((topic, i) => ({
        id: `session-${Date.now()}-${i}`,
        date: exam.date, // or previous day
        examId: exam.id,
        subjectName: exam.subjectName,
        topic,
        durationMinutes: 25,
        completed: false,
        priority: 'alta',
      }));
      setStudySessions((prev) => [...prev, ...newSessions]);
    }
    setEditingExam(null);
  };

  const handleDeleteExam = (examId: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este examen del calendario?')) {
      setExams((prev) => prev.filter((e) => e.id !== examId));
      setStudySessions((prev) => prev.filter((s) => s.examId !== examId));
    }
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setIsExamModalOpen(true);
  };

  const handleConfidenceChange = (examId: string, newScore: number) => {
    setExams((prev) =>
      prev.map((e) => (e.id === examId ? { ...e, confidenceScore: newScore } : e))
    );
  };

  // Launching quizzes from timeline / planner
  const handleStartQuiz = (exam: Exam) => {
    setSelectedExam(exam);
    setActiveTab('quiz');
  };

  const handleOpenFlashcards = (exam: Exam) => {
    setSelectedExam(exam);
    setActiveTab('flashcards');
  };

  const handleOpenSummary = (exam: Exam) => {
    setSelectedExam(exam);
    setActiveTab('summary');
  };

  const handleQuizCompleted = (examId: string, scoreOutOf10: number) => {
    setTotalQuizzesTaken((prev) => prev + 1);
    // Increase confidence based on quiz result
    setExams((prev) =>
      prev.map((ex) => {
        if (ex.id === examId) {
          const estimatedConfidence = Math.min(100, Math.round(scoreOutOf10 * 10));
          const updated = Math.max(ex.confidenceScore, estimatedConfidence);
          return { ...ex, confidenceScore: updated };
        }
        return ex;
      })
    );
  };

  const handleToggleSession = (sessionId: string) => {
    setStudySessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const newCompleted = !s.completed;
          if (newCompleted) {
            setStreak((curr) => curr + 1);
          }
          return { ...s, completed: newCompleted };
        }
        return s;
      })
    );
  };

  const handleAddSession = (session: StudySessionItem) => {
    setStudySessions((prev) => [...prev, session]);
  };

  const handleResetData = () => {
    if (window.confirm('¿Quieres reiniciar los exámenes al calendario oficial inicial de 2º ESO?')) {
      setExams(INITIAL_EXAMS);
      localStorage.removeItem('garrigosa_exams_v1');
      localStorage.removeItem('garrigosa_sessions_v1');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <Header
        streak={streak}
        totalQuizzesTaken={totalQuizzesTaken}
        onOpenPomodoro={() => setIsPomodoroOpen(true)}
        onResetData={handleResetData}
        nextExamDays={nextInfo.days}
        nextExamSubject={nextInfo.subject}
      />

      {/* Main Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-[69px] z-30 shadow-2xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>1. Calendario 2 Semanas</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'timeline' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {exams.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'daily'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>2. Plan Diario de Temas</span>
            </button>

            <button
              onClick={() => setActiveTab('tea_notes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'tea_notes'
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-200'
                  : 'text-teal-800 bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200/80'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600 group-hover:text-teal-700" />
              <span>3. Cuaderno de Apuntes TEA (Todos los Cursos)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>4. Cuestionarios Tipo Test</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>5. Tarjetas de Memoria</span>
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>6. Chuletas de Repaso</span>
            </button>

            <button
              onClick={() => setActiveTab('open_answer')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'open_answer'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>7. Preguntas Escritas</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'timeline' && (
          <ExamTimeline
            exams={exams}
            onAddExam={() => {
              setEditingExam(null);
              setIsExamModalOpen(true);
            }}
            onEditExam={handleEditExam}
            onDeleteExam={handleDeleteExam}
            onStartQuiz={handleStartQuiz}
            onOpenFlashcards={handleOpenFlashcards}
            onOpenSummary={handleOpenSummary}
            onConfidenceChange={handleConfidenceChange}
          />
        )}

        {activeTab === 'daily' && (
          <DailyPlanner
            exams={exams}
            studySessions={studySessions}
            onToggleSession={handleToggleSession}
            onAddSession={handleAddSession}
            onStartQuizForTopic={(exam, topic) => {
              setSelectedExam(exam);
              setActiveTab('quiz');
            }}
            onOpenPomodoro={() => setIsPomodoroOpen(true)}
          />
        )}

        {activeTab === 'tea_notes' && (
          <TeaNotesHub
            onStartQuizFromNote={(subjectCode, subjectName, topic) => {
              const matched = exams.find((e) => e.subjectCode === subjectCode) || exams[0];
              if (matched) {
                setSelectedExam(matched);
              }
              setActiveTab('quiz');
            }}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizRunner
            exams={exams}
            selectedExam={selectedExam}
            onSelectExam={setSelectedExam}
            onQuizCompleted={handleQuizCompleted}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            exams={exams}
            selectedExam={selectedExam}
            onSelectExam={setSelectedExam}
          />
        )}

        {activeTab === 'summary' && (
          <SummarySheetView
            exams={exams}
            selectedExam={selectedExam}
            onSelectExam={setSelectedExam}
          />
        )}

        {activeTab === 'open_answer' && (
          <OpenQuestionPractice
            exams={exams}
            selectedExam={selectedExam}
            onSelectExam={setSelectedExam}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5">
            <span>Diseñado con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para una alumna de 2º ESO en el IES Garrigosa (Meliana)</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Organización inteligente de exámenes • Currículo LOMLOE Comunitat Valenciana • Sin agobios
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ExamModal
        isOpen={isExamModalOpen}
        onClose={() => {
          setIsExamModalOpen(false);
          setEditingExam(null);
        }}
        onSave={handleSaveExam}
        editingExam={editingExam}
      />

      <PomodoroTimer
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
      />
    </div>
  );
}
