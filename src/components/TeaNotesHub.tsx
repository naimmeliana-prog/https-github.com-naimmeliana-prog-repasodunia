import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronRight,
  GraduationCap,
  ListOrdered,
  Eye,
  Sliders,
  Check,
  RotateCcw,
  Plus,
  PlayCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Download,
} from 'lucide-react';
import {
  GradeLevel,
  SchoolTerm,
  SubjectCode,
  TeaStudyNote,
  CurriculumUnit,
} from '../types';
import {
  GRADE_LEVELS,
  SCHOOL_TERMS,
  DEFAULT_CURRICULA,
  INITIAL_TEA_NOTES,
} from '../data/teaCurriculumSeed';
import { SUBJECTS } from '../data/seedData';
import { fetchTeaNotes } from '../services/api';

interface TeaNotesHubProps {
  onStartQuizFromNote?: (subjectCode: SubjectCode, subjectName: string, topic: string) => void;
}

export const TeaNotesHub: React.FC<TeaNotesHubProps> = ({ onStartQuizFromNote }) => {
  // Course & Grade Level state
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('2º ESO');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCode>('mates');
  const [selectedTerm, setSelectedTerm] = useState<SchoolTerm>('1er Trimestre');

  // Sensory overload / Calm mode toggle (essential for Autism support)
  const [calmMode, setCalmMode] = useState<boolean>(true);
  const [textSize, setTextSize] = useState<'normal' | 'grande'>('normal');

  // Stored notes library
  const [notesLibrary, setNotesLibrary] = useState<TeaStudyNote[]>(() => {
    try {
      const saved = localStorage.getItem('garrigosa_tea_notes_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TEA_NOTES;
  });

  // Active note in viewer
  const [activeNoteId, setActiveNoteId] = useState<string>(
    INITIAL_TEA_NOTES[0]?.id || ''
  );

  // Loading state for AI generation
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [customUnitInput, setCustomUnitInput] = useState<string>('');

  // Save notes to localStorage
  const saveNotes = (updated: TeaStudyNote[]) => {
    setNotesLibrary(updated);
    try {
      localStorage.setItem('garrigosa_tea_notes_v1', JSON.stringify(updated));
    } catch {}
  };

  // Get current curriculum for selected Grade & Subject
  const gradeCurricula = DEFAULT_CURRICULA[selectedGrade] || DEFAULT_CURRICULA['2º ESO'];
  const subjectCurriculum = gradeCurricula[selectedSubject] || gradeCurricula.mates;
  const currentTermData = subjectCurriculum?.terms?.find((t) => t.termName === selectedTerm);
  const unitsList = currentTermData?.units || [];

  // Notes filtered for current Grade, Subject, Term
  const filteredNotes = notesLibrary.filter(
    (n) =>
      n.gradeLevel === selectedGrade &&
      n.subjectCode === selectedSubject &&
      n.term === selectedTerm
  );

  const activeNote = notesLibrary.find((n) => n.id === activeNoteId) || filteredNotes[0];

  // Generate study notes for a specific unit
  const handleGenerateUnitNotes = async (unit: CurriculumUnit) => {
    setIsGenerating(true);
    const subMeta = SUBJECTS[selectedSubject];
    try {
      const result = await fetchTeaNotes(
        selectedGrade,
        selectedSubject,
        subMeta.name,
        unit.title,
        unit.topics.join(', '),
        selectedTerm,
        unit.unitNumber
      );

      // Check if note already exists for this unit
      const existingIdx = notesLibrary.findIndex(
        (n) =>
          n.gradeLevel === selectedGrade &&
          n.subjectCode === selectedSubject &&
          n.unitTitle.toLowerCase().trim() === unit.title.toLowerCase().trim()
      );

      let updatedList: TeaStudyNote[];
      if (existingIdx >= 0) {
        updatedList = notesLibrary.map((item, idx) =>
          idx === existingIdx ? { ...result.note, id: item.id } : item
        );
      } else {
        updatedList = [result.note, ...notesLibrary];
      }

      saveNotes(updatedList);
      setActiveNoteId(result.note.id);
    } catch (err) {
      console.error('Error generating TEA notes:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate custom unit typed by parent or student
  const handleGenerateCustomNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUnitInput.trim()) return;

    setIsGenerating(true);
    const subMeta = SUBJECTS[selectedSubject];
    try {
      const result = await fetchTeaNotes(
        selectedGrade,
        selectedSubject,
        subMeta.name,
        customUnitInput.trim(),
        '',
        selectedTerm,
        filteredNotes.length + 1
      );

      const updated = [result.note, ...notesLibrary];
      saveNotes(updated);
      setActiveNoteId(result.note.id);
      setCustomUnitInput('');
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle unit mastery
  const handleToggleCompleted = (noteId: string) => {
    const updated = notesLibrary.map((n) =>
      n.id === noteId ? { ...n, isCompleted: !n.isCompleted } : n
    );
    saveNotes(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  const subMeta = SUBJECTS[selectedSubject];

  return (
    <div className="space-y-6">
      {/* Top Banner: Autism-Adapted Learning & Multi-Year Continuity */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Adaptación Cognitiva TEA Grado 2</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Continuidad para Todo el Curso y Cursos Posteriores</span>
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Apuntes Estructurados y Resúmenes Paso a Paso
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Diseñados con lenguaje literal, algoritmos secuenciales paso a paso y sin sobrecarga sensorial. Los contenidos se organizan cronológicamente por trimestres para que sirvan ahora en 2º de ESO y continúen en 3º, 4º y Bachillerato.
            </p>
          </div>

          {/* Calm Mode & Accessibility Controls */}
          <div className="flex items-center gap-2 self-start lg:self-auto p-2 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setCalmMode(!calmMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                calmMode
                  ? 'bg-amber-100 text-amber-900 shadow-2xs border border-amber-300'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
              title="Colores suaves cálidos para evitar la fatiga y sobreestimulación sensorial"
            >
              <Eye className="w-3.5 h-3.5 text-amber-600" />
              <span>{calmMode ? 'Modo Calma Activo' : 'Modo Estándar'}</span>
            </button>

            <button
              onClick={() => setTextSize(textSize === 'normal' ? 'grande' : 'normal')}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
              title="Aumentar tamaño de letra para lectura cómoda"
            >
              <span>{textSize === 'normal' ? 'A+' : 'A-'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              title="Imprimir cuaderno de apuntes en papel A4"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grade Level Selector (2º ESO -> 3º ESO -> 4º ESO -> Bachillerato) */}
        <div className="pt-3 border-t border-slate-100">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Nivel Educativo / Curso Escolar:</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {GRADE_LEVELS.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {grade} {grade === '2º ESO' && '(Curso Actual)'}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Selector */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Asignatura:</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {Object.values(SUBJECTS).map((sub) => {
              const isSelected = selectedSubject === sub.code;
              return (
                <button
                  key={sub.code}
                  onClick={() => setSelectedSubject(sub.code)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? `${sub.badgeBg} ring-2 ring-indigo-500/30 font-extrabold shadow-2xs`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* School Term Selector (Chronological order) */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>Orden Cronológico del Curso:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SCHOOL_TERMS.map((term) => (
              <button
                key={term.name}
                onClick={() => setSelectedTerm(term.name as SchoolTerm)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedTerm === term.name
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-2xs ring-2 ring-indigo-500/10'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <p className="text-xs font-extrabold">{term.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{term.period}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid: Left Syllabus Units & Right Note Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chronological Syllabus of Units */}
        <div className="lg:col-span-4 space-y-4 no-print">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-indigo-600" />
                <span>Temas del {selectedTerm}</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">
                {unitsList.length} unidades
              </span>
            </div>

            {unitsList.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                Programación de este trimestre en preparación. Puedes generar un tema libre abajo.
              </p>
            ) : (
              <div className="space-y-2">
                {unitsList.map((unit) => {
                  const hasNote = notesLibrary.some(
                    (n) =>
                      n.gradeLevel === selectedGrade &&
                      n.subjectCode === selectedSubject &&
                      n.unitTitle.toLowerCase().trim() === unit.title.toLowerCase().trim()
                  );
                  const existingNote = notesLibrary.find(
                    (n) =>
                      n.gradeLevel === selectedGrade &&
                      n.subjectCode === selectedSubject &&
                      n.unitTitle.toLowerCase().trim() === unit.title.toLowerCase().trim()
                  );
                  const isViewing = activeNote?.id === existingNote?.id;

                  return (
                    <div
                      key={unit.unitNumber}
                      className={`p-3 rounded-2xl border transition-all text-xs ${
                        isViewing
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-2xs'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            Unidad {unit.unitNumber}
                          </span>
                          <h4 className="font-bold text-slate-900 leading-snug">
                            {unit.title}
                          </h4>
                        </div>

                        {existingNote?.isCompleted && (
                          <span className="shrink-0 text-emerald-600" title="Unidad dominada">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 flex items-center gap-2">
                        {hasNote && existingNote ? (
                          <button
                            onClick={() => setActiveNoteId(existingNote.id)}
                            className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-bold text-[11px] hover:bg-indigo-700 transition-colors cursor-pointer"
                          >
                            Abrir Apuntes
                          </button>
                        ) : (
                          <button
                            onClick={() => handleGenerateUnitNotes(unit)}
                            disabled={isGenerating}
                            className="px-2.5 py-1 rounded-xl bg-teal-600 text-white font-bold text-[11px] hover:bg-teal-700 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Generar Apuntes TEA</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Custom Unit Generation Form */}
            <form
              onSubmit={handleGenerateCustomNote}
              className="pt-3 border-t border-slate-100 space-y-2"
            >
              <label className="block text-[11px] font-bold text-slate-600">
                + Añadir tema específico del libro:
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={customUnitInput}
                  onChange={(e) => setCustomUnitInput(e.target.value)}
                  placeholder="Ej: Tema 5: El verbo y perífrasis"
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={isGenerating || !customUnitInput.trim()}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Visual Study Notes Viewer */}
        <div className="lg:col-span-8">
          {isGenerating ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
              <Sparkles className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Estructurando apuntes con apoyo cognitivo TEA...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Desglosando definiciones literales, pasos secuenciales numerados, tablas comparativas y checklist de comprobación.
              </p>
            </div>
          ) : !activeNote ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">
                Selecciona una unidad de la lista o pulsa en "Generar Apuntes TEA"
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Cada tema generado se guardará permanentemente en el cuaderno de la alumna para repasar durante todo el curso.
              </p>
            </div>
          ) : (
            <div
              className={`rounded-3xl p-6 sm:p-10 border transition-all duration-200 space-y-8 ${
                calmMode
                  ? 'bg-[#FFFDF9] border-amber-200/70 text-slate-800 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              } ${textSize === 'grande' ? 'text-base leading-relaxed' : 'text-sm leading-normal'}`}
            >
              {/* Header on Note */}
              <div className="border-b border-slate-200 pb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-900">
                      {activeNote.gradeLevel} • {activeNote.subjectName}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      {activeNote.term} (Unidad {activeNote.orderNumber})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 no-print">
                    <button
                      onClick={() => handleToggleCompleted(activeNote.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeNote.isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{activeNote.isCompleted ? '¡Tema Dominado!' : 'Marcar como Dominado'}</span>
                    </button>

                    {onStartQuizFromNote && (
                      <button
                        onClick={() =>
                          onStartQuizFromNote(
                            activeNote.subjectCode,
                            activeNote.subjectName,
                            activeNote.unitTitle
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Hacer Test de este Tema</span>
                      </button>
                    )}
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {activeNote.unitTitle}
                </h1>
              </div>

              {/* Box 1: Idea Central en Lenguaje Directo */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
                <div className="flex items-center gap-2 text-indigo-950 font-extrabold text-xs uppercase tracking-wider">
                  <FileCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Idea Central (Qué es y para qué sirve en la vida real)</span>
                </div>
                <p className="text-slate-800 font-semibold leading-relaxed">
                  {activeNote.executiveSummary}
                </p>
              </div>

              {/* Box 2: Conceptos Fundamentales en Lenguaje Literal */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>1. Conceptos Fundamentales (Definición literal y ejemplo concreto)</span>
                </h3>

                <div className="space-y-3">
                  {activeNote.coreConcepts.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="font-extrabold text-slate-900">
                          {item.conceptName}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 pl-8 leading-relaxed">
                        <strong className="text-slate-900">Definición literal:</strong>{' '}
                        {item.literalDefinition}
                      </p>

                      <div className="ml-8 p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1">
                        <strong className="text-indigo-700 font-bold">Ejemplo concreto:</strong>
                        <p className="text-slate-700">{item.concreteExample}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Algoritmos Secuenciales Paso a Paso */}
              {activeNote.stepByStepAlgorithms.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-teal-600" />
                    <span>2. Pasos Ordenados para Resolver (Sin saltarse pasos)</span>
                  </h3>

                  <div className="space-y-4">
                    {activeNote.stepByStepAlgorithms.map((algo, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3"
                      >
                        <h4 className="font-extrabold text-teal-950 text-sm">
                          {algo.taskTitle}
                        </h4>

                        <div className="space-y-2">
                          {algo.steps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                              <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span className="text-slate-800 font-medium leading-relaxed">
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>

                        {algo.solvedCase && (
                          <div className="p-3 bg-white rounded-xl border border-teal-200 text-xs sm:text-sm text-teal-950 font-semibold">
                            <strong>Caso resuelto:</strong> {algo.solvedCase}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Box 4: Tabla Comparativa Visual */}
              {activeNote.comparisonTable && activeNote.comparisonTable.columns && (
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-purple-600" />
                    <span>3. Tabla Comparativa Visual</span>
                  </h3>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                          {activeNote.comparisonTable.columns.map((col, idx) => (
                            <th key={idx} className="p-3.5">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeNote.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3.5 text-slate-700">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Box 5: Qué NO Hacer (Prevenir Errores) */}
              {activeNote.mistakesToAvoid.length > 0 && (
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-950 font-extrabold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>4. Qué NO Hacer (Errores a evitar para no confundirse)</span>
                  </div>

                  <div className="space-y-2.5">
                    {activeNote.mistakesToAvoid.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white rounded-xl border border-rose-200/80 text-xs sm:text-sm space-y-1.5"
                      >
                        <p className="text-rose-900 font-bold flex items-start gap-1.5">
                          <span className="text-rose-500 font-extrabold">✕</span>
                          <span>{item.wrongAction}</span>
                        </p>
                        {item.whyIsWrong && (
                          <p className="text-slate-500 text-xs pl-4">
                            <strong>Por qué falla:</strong> {item.whyIsWrong}
                          </p>
                        )}
                        <p className="text-emerald-900 font-semibold text-xs pl-4">
                          <strong className="text-emerald-700">Acción correcta:</strong>{' '}
                          {item.correctAction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Box 6: Checkpoints de Comprobación */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5. Comprobación de Dominio (Checklist Personal)</span>
                </div>

                <div className="space-y-2">
                  {activeNote.checkpointsMastery.map((chk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="font-medium leading-relaxed">{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
