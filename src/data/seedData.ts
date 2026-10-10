import { Exam, SubjectCode } from '../types';

export interface SubjectMeta {
  code: SubjectCode;
  name: string;
  shortName: string;
  color: string; // Tailwind color classes
  bgLight: string;
  borderLight: string;
  badgeBg: string;
  textColor: string;
  icon: string;
  defaultTopics: string[];
}

export const SUBJECTS: Record<SubjectCode, SubjectMeta> = {
  mates: {
    code: 'mates',
    name: 'Matemáticas',
    shortName: 'Mates',
    color: 'from-blue-600 via-indigo-600 to-sky-500',
    bgLight: 'bg-blue-50/70',
    borderLight: 'border-blue-200',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300 font-bold',
    textColor: 'text-blue-700',
    icon: 'Calculator',
    defaultTopics: [
      'Números enteros, fracciones y decimales',
      'Potencias y raíces cuadradas',
      'Proporcionalidad y porcentajes',
      'Álgebra: monomios y polinomios básicos',
      'Ecuaciones de 1er y 2º grado',
      'Sistemas de ecuaciones lineales',
      'Teorema de Pitágoras y áreas de figuras planas',
      'Funciones y gráficas cartesianas',
      'Estadística: media, moda, mediana y diagramas'
    ],
  },
  lengua: {
    code: 'lengua',
    name: 'Lengua Castellana y Literatura',
    shortName: 'Lengua',
    color: 'from-emerald-600 via-teal-600 to-cyan-500',
    bgLight: 'bg-emerald-50/70',
    borderLight: 'border-emerald-200',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
    textColor: 'text-emerald-700',
    icon: 'BookOpen',
    defaultTopics: [
      'Tipologías textuales: narración, descripción y diálogo',
      'Textos expositivos y argumentativos',
      'Morfología: sustantivos, adjetivos, determinantes y verbos',
      'Sintaxis: la oración simple, sujeto y predicado',
      'Complementos del verbo: CD, CI, Atributo, CC y CAg',
      'Ortografía: acentuación, diptongos, hiatos y signos de puntuación',
      'Géneros literarios: la lírica y sus figuras retóricas',
      'La narrativa medieval y el Siglo de Oro'
    ],
  },
  sociales: {
    code: 'sociales',
    name: 'Geografía e Historia',
    shortName: 'Sociales',
    color: 'from-amber-500 via-orange-500 to-yellow-500',
    bgLight: 'bg-amber-50/70',
    borderLight: 'border-amber-200',
    badgeBg: 'bg-amber-100 text-amber-950 border-amber-300 font-bold',
    textColor: 'text-amber-800',
    icon: 'Landmark',
    defaultTopics: [
      'La caída del Imperio Romano y los reinos germánicos',
      'El Imperio Bizantino y la expansión del Islam',
      'Al-Ándalus en la Península Ibérica (Emirato, Califato, Taifas)',
      'La sociedad feudal: señores, clero y campesinado',
      'Los reinos cristianos peninsulares y la Reconquista',
      'La ciudad medieval y el resurgir del comercio',
      'El Renacimiento y el Humanismo en Europa',
      'La población mundial y el proceso de urbanización'
    ],
  },
  fisica_quimica: {
    code: 'fisica_quimica',
    name: 'Física y Química',
    shortName: 'FyQ',
    color: 'from-purple-600 via-fuchsia-600 to-pink-500',
    bgLight: 'bg-purple-50/70',
    borderLight: 'border-purple-200',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300 font-bold',
    textColor: 'text-purple-700',
    icon: 'Atom',
    defaultTopics: [
      'El método científico y las magnitudes del SI',
      'La materia: propiedades generales y específicas, densidad',
      'Los estados de la materia y la teoría cinético-molecular',
      'Sustancias puras y mezclas (homogéneas y heterogéneas)',
      'Métodos de separación de mezclas y disoluciones',
      'Estructura del átomo: protones, neutrones, electrones',
      'La tabla periódica y elementos químicos cotidianos',
      'El movimiento: velocidad media, aceleración y gráficas s-t',
      'Las fuerzas y las leyes básicas del movimiento'
    ],
  },
  biologia: {
    code: 'biologia',
    name: 'Biología y Geología',
    shortName: 'Bio y Geo',
    color: 'from-lime-600 via-emerald-600 to-teal-500',
    bgLight: 'bg-lime-50/70',
    borderLight: 'border-lime-200',
    badgeBg: 'bg-lime-100 text-lime-950 border-lime-300 font-bold',
    textColor: 'text-lime-800',
    icon: 'Dna',
    defaultTopics: [
      'La organización del cuerpo humano: células, tejidos y órganos',
      'La función de nutrición: aparato digestivo y respiratorio',
      'La función de nutrición: aparato circulatorio y excretor',
      'La función de relación: sistema nervioso y receptores sensoriales',
      'El sistema endocrino y la coordinación hormonal',
      'La dinámica interna de la Tierra: tectónica de placas',
      'Procesos geológicos externos: meteorización, erosión, transporte y sedimentación'
    ],
  },
  valencia: {
    code: 'valencia',
    name: 'Valencià: Llengua i Literatura',
    shortName: 'Valencià',
    color: 'from-rose-500 via-red-500 to-amber-500',
    bgLight: 'bg-rose-50/70',
    borderLight: 'border-rose-200',
    badgeBg: 'bg-rose-100 text-rose-950 border-rose-300 font-bold',
    textColor: 'text-rose-800',
    icon: 'Languages',
    defaultTopics: [
      'Comprensió lectora i tipologies textuals',
      'Gramàtica: pronoms personals forts i pronoms febles bàsics',
      'Morfologia verbal: present, passat perfet i futur',
      'Lèxic: prefixos, sufixos i derivació de paraules',
      'Ortografia: accentuació oberta i tancada, apòstrof i dièresi',
      'Normes de gènere i nombre en valencià',
      'Literatura popular valenciana: rondalles d’Enric Valor'
    ],
  },
  ingles: {
    code: 'ingles',
    name: 'Inglés (English)',
    shortName: 'English',
    color: 'from-cyan-600 via-sky-600 to-blue-500',
    bgLight: 'bg-cyan-50/70',
    borderLight: 'border-cyan-200',
    badgeBg: 'bg-cyan-100 text-cyan-950 border-cyan-300 font-bold',
    textColor: 'text-cyan-800',
    icon: 'Globe',
    defaultTopics: [
      'Past Simple vs Past Continuous (when / while)',
      'Present Perfect with just, already, yet, ever, never',
      'Comparative and Superlative Adjectives',
      'Modal Verbs: can, could, must, should, have to',
      'Future Forms: will, be going to, Present Continuous',
      'Vocabulary: Daily life, school subjects, travel, tech',
      'Reading comprehension and short writing essays'
    ],
  },
  tecnologia: {
    code: 'tecnologia',
    name: 'Tecnología y Digitalización',
    shortName: 'Tecno',
    color: 'from-teal-600 via-cyan-600 to-emerald-500',
    bgLight: 'bg-teal-50/70',
    borderLight: 'border-teal-200',
    badgeBg: 'bg-teal-100 text-teal-950 border-teal-300 font-bold',
    textColor: 'text-teal-800',
    icon: 'Cpu',
    defaultTopics: [
      'El proceso tecnológico y diseño de proyectos',
      'Materiales técnicos: maderas y metales',
      'Mecanismos de transmisión y transformación del movimiento',
      'Electricidad básica: circuitos en serie y en paralelo, Ley de Ohm',
      'Pensamiento computacional y algoritmos',
      'Seguridad en internet y uso responsable de dispositivos'
    ],
  },
  musica: {
    code: 'musica',
    name: 'Música',
    shortName: 'Música',
    color: 'from-pink-500 via-rose-500 to-purple-500',
    bgLight: 'bg-pink-50/70',
    borderLight: 'border-pink-200',
    badgeBg: 'bg-pink-100 text-pink-950 border-pink-300 font-bold',
    textColor: 'text-pink-800',
    icon: 'Music',
    defaultTopics: [
      'Lenguaje musical: figuras, compases y notas en clave de sol',
      'Cualidades del sonido: altura, duración, intensidad y timbre',
      'Familias de instrumentos de la orquesta',
      'La música en la Edad Media y el Renacimiento'
    ],
  },
  plastica: {
    code: 'plastica',
    name: 'Educación Plástica y Visual',
    shortName: 'Plástica',
    color: 'from-indigo-600 via-violet-600 to-fuchsia-500',
    bgLight: 'bg-indigo-50/70',
    borderLight: 'border-indigo-200',
    badgeBg: 'bg-indigo-100 text-indigo-950 border-indigo-300 font-bold',
    textColor: 'text-indigo-800',
    icon: 'Palette',
    defaultTopics: [
      'Elementos de la configuración plástica: punto, línea y plano',
      'El color: colores primarios, secundarios, complementarios y gamas',
      'Geometría plana: trazados fundamentales, mediatriz, bisectriz y polígonos regulares'
    ],
  },
  otro: {
    code: 'otro',
    name: 'Otra Asignatura',
    shortName: 'Otra',
    color: 'from-slate-600 via-indigo-600 to-teal-600',
    bgLight: 'bg-slate-50/70',
    borderLight: 'border-slate-200',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-300 font-bold',
    textColor: 'text-slate-700',
    icon: 'GraduationCap',
    defaultTopics: ['Tema general de repaso', 'Conceptos del trimestre'],
  },
};

// Realistic initial exams scheduled for next week (Week 1) and the week after (Week 2)
// Current reference date: mid-October 2026
export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    subjectCode: 'mates',
    subjectName: 'Matemáticas',
    title: 'Examen de Álgebra y Ecuaciones',
    date: '2026-10-14',
    time: '09:00',
    classroom: 'Aula 2º B',
    topics: [
      'Expresiones algebraicas y monomios',
      'Ecuaciones de primer grado con paréntesis y denominadores',
      'Problemas de la vida cotidiana con ecuaciones'
    ],
    difficulty: 'alta',
    confidenceScore: 35,
    notes: 'El profesor hace mucho hincapié en no equivocarse con los signos menos delante de las fracciones y paréntesis.',
    status: 'repasando',
    color: 'from-blue-600 to-indigo-600',
    iconName: 'Calculator'
  },
  {
    id: 'exam-2',
    subjectCode: 'lengua',
    subjectName: 'Lengua Castellana y Literatura',
    title: 'Sintaxis de la Oración Simple y Tipos de Textos',
    date: '2026-10-16',
    time: '11:30',
    classroom: 'Aula 2º B',
    topics: [
      'Sintagmas (SN, SV, SPrep, SAdj, SAdv)',
      'Identificar Sujeto elíptico y Predicado verbal/nominal',
      'Complementos: CD (sustituir por lo/la/los/las), CI y Atributo',
      'Textos expositivos y argumentativos'
    ],
    difficulty: 'media',
    confidenceScore: 60,
    notes: 'Hay que repasar bien la prueba de la pasiva para no confundir Sujeto con Complemento Directo.',
    status: 'pendiente',
    color: 'from-emerald-600 to-teal-600',
    iconName: 'BookOpen'
  },
  {
    id: 'exam-3',
    subjectCode: 'sociales',
    subjectName: 'Geografía e Historia',
    title: 'Al-Ándalus y la Sociedad Feudal',
    date: '2026-10-19',
    time: '10:15',
    classroom: 'Aula 2º B',
    topics: [
      'Etapas de Al-Ándalus (Emirato dependiente, Califato de Córdoba, Taifas)',
      'La sociedad andalusí: mozárabes, muladíes, mudéjares',
      'El feudalismo: la pirámide estamental (bellatores, oratores, laboratores)',
      'El feudo y las relaciones de vasallaje'
    ],
    difficulty: 'media',
    confidenceScore: 50,
    notes: 'Suelen poner un mapa de la península ibérica o un eje cronológico.',
    status: 'pendiente',
    color: 'from-amber-600 to-orange-600',
    iconName: 'Landmark'
  },
  {
    id: 'exam-4',
    subjectCode: 'fisica_quimica',
    subjectName: 'Física y Química',
    title: 'La Materia, Densidad y Disoluciones',
    date: '2026-10-21',
    time: '12:45',
    classroom: 'Laboratorio / Aula 2º B',
    topics: [
      'Propiedades de la materia: masa, volumen y densidad (d = m / V)',
      'Los tres estados de la materia y cambios de estado con gráficas',
      'Sustancias puras y mezclas (homogéneas y heterogéneas)',
      'Concentración de disoluciones: % en masa y g/L'
    ],
    difficulty: 'alta',
    confidenceScore: 40,
    notes: 'Practicar problemas numéricos de densidad y cambio de unidades de gramos a kilogramos y cm³ a litros.',
    status: 'pendiente',
    color: 'from-purple-600 to-fuchsia-600',
    iconName: 'Atom'
  },
  {
    id: 'exam-5',
    subjectCode: 'ingles',
    subjectName: 'Inglés (English)',
    title: 'Unit 2: Past Simple vs Continuous & Adjectives',
    date: '2026-10-23',
    time: '08:00',
    classroom: 'Aula 2º B',
    topics: [
      'Past Simple (regular -ed and irregular verbs list)',
      'Past Continuous (was/were + verb-ing) with "when" and "while"',
      'Comparative and superlative adjectives (-er / more, -est / most)',
      'Reading comprehension vocabulary'
    ],
    difficulty: 'baja',
    confidenceScore: 75,
    notes: 'Repasar la lista de verbos irregulares de la página 120 del libro.',
    status: 'pendiente',
    color: 'from-sky-600 to-cyan-600',
    iconName: 'Globe'
  },
  {
    id: 'exam-6',
    subjectCode: 'valencia',
    subjectName: 'Valencià: Llengua i Literatura',
    title: 'Gramàtica, Ortografia i Tipologies Textuals',
    date: '2026-10-22',
    time: '11:30',
    classroom: 'Aula 2º B',
    topics: [
      'Pronoms febles de 2n d’ESO: em, et, es, ens, vos, el, la, els, les',
      'Accentuació: paraules agudes, planes i esdrúixoles (obertes vs tancades)',
      'L’apòstrof davant de vocal o hac',
      'Comprensió de text i expressió escrita'
    ],
    difficulty: 'media',
    confidenceScore: 55,
    notes: 'Recordar les regles d’apostrofació de l’article "el" i "la".',
    status: 'pendiente',
    color: 'from-red-600 to-amber-600',
    iconName: 'Languages'
  }
];
