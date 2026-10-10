import { ChronologicalCurriculum, TeaStudyNote, GradeLevel, SubjectCode } from '../types';

export const GRADE_LEVELS: GradeLevel[] = [
  '1º ESO',
  '2º ESO',
  '3º ESO',
  '4º ESO',
  '1º Bachillerato',
  '2º Bachillerato'
];

export const SCHOOL_TERMS = [
  { name: '1er Trimestre', period: 'Septiembre - Diciembre (Otoño)' },
  { name: '2º Trimestre', period: 'Enero - Marzo (Invierno)' },
  { name: '3er Trimestre', period: 'Abril - Junio (Primavera)' },
] as const;

// Chronological curricula for 2º ESO and higher grades
export const DEFAULT_CURRICULA: Record<string, Record<SubjectCode, ChronologicalCurriculum>> = {
  '2º ESO': {
    mates: {
      gradeLevel: '2º ESO',
      subjectCode: 'mates',
      subjectName: 'Matemáticas',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'Divisibilidad y Números Enteros',
              topics: ['Múltiplos y divisores', 'm.c.d. y m.c.m.', 'Operaciones combinadas con números enteros', 'Regla de los signos y valor absoluto'],
            },
            {
              unitNumber: 2,
              title: 'Fracciones y Números Decimales',
              topics: ['Fracciones equivalentes y fracción irreducible', 'Suma, resta, producto y división de fracciones', 'Problemas con fracciones de la vida real'],
            },
            {
              unitNumber: 3,
              title: 'Potencias y Raíces Cuadradas',
              topics: ['Propiedades de las potencias de la misma base', 'Potencias de base 10 y notación científica básica', 'Raíz cuadrada exacta y entera'],
            },
            {
              unitNumber: 4,
              title: 'Álgebra y Ecuaciones de 1er Grado',
              topics: ['Monomios y operaciones', 'Ecuaciones de 1er grado con paréntesis y denominadores', 'Resolución de problemas cotidianos mediante ecuaciones'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 5,
              title: 'Sistemas de Ecuaciones Lineales',
              topics: ['Ecuaciones con dos incógnitas', 'Método de sustitución', 'Método de reducción', 'Problemas con dos incógnitas'],
            },
            {
              unitNumber: 6,
              title: 'Proporcionalidad y Porcentajes',
              topics: ['Proporcionalidad directa e inversa', 'Regla de tres simple', 'Cálculo de aumentos y descuentos porcentuales'],
            },
            {
              unitNumber: 7,
              title: 'Teorema de Pitágoras y Geometría Plana',
              topics: ['Triángulos rectángulos e hipotenusa', 'Áreas de polígonos regulares', 'Longitud de la circunferencia y área del círculo'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 8,
              title: 'Cuerpos Geométricos y Volúmenes',
              topics: ['Prismas, pirámides y poliedros regulares', 'Cuerpos de revolución: cilindro, cono y esfera', 'Cálculo de áreas y volúmenes'],
            },
            {
              unitNumber: 9,
              title: 'Funciones y Gráficas Cartesianas',
              topics: ['Ejes cartesianos y coordenadas (x, y)', 'Interpretación de gráficas continuas', 'Función lineal y afín (y = mx + n)'],
            },
            {
              unitNumber: 10,
              title: 'Estadística y Probabilidad',
              topics: ['Población, muestra y tablas de frecuencias', 'Media aritmética, mediana y moda', 'Gráficos de barras y sectores', 'Probabilidad elemental (Regla de Laplace)'],
            },
          ],
        },
      ],
    },
    lengua: {
      gradeLevel: '2º ESO',
      subjectCode: 'lengua',
      subjectName: 'Lengua Castellana y Literatura',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'La Comunicación y Tipologías Textuales',
              topics: ['Elementos de la comunicación', 'Texto narrativo: estructura y narrador', 'Texto descriptivo objetivo y subjetivo'],
            },
            {
              unitNumber: 2,
              title: 'Morfología: Clases de Palabras',
              topics: ['Sustantivo, adjetivo calificativo y determinantes', 'Pronombres personales, demostrativos y relativos', 'El verbo: tiempos verbales, persona y número'],
            },
            {
              unitNumber: 3,
              title: 'La Oración Simple: Sujeto y Predicado',
              topics: ['Estructura del Sintagma Nominal (SN)', 'Concordancia entre Sujeto y Verbo', 'Sujeto elíptico o tácito', 'Predicado verbal vs nominal'],
            },
            {
              unitNumber: 4,
              title: 'Complementos del Verbo (CD, CI y Atributo)',
              topics: ['Complemento Directo (prueba de lo/la y pasiva)', 'Complemento Indirecto (le/les)', 'Atributo con verbos copulativos (ser, estar, parecer)'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 5,
              title: 'Complementos Circunstanciales y Régimen',
              topics: ['CC de lugar, tiempo, modo, cantidad, compañía, instrumento', 'Complemento de Régimen (CRég)', 'Complemento Agente en oraciones pasivas'],
            },
            {
              unitNumber: 6,
              title: 'El Texto Expositivo y Argumentativo',
              topics: ['Estructura de la exposición: introducción, desarrollo, conclusión', 'Tesis y argumentos en el texto argumentativo', 'Conectores textuales lógicos'],
            },
            {
              unitNumber: 7,
              title: 'Ortografía Fundamental y Léxico',
              topics: ['Acentuación: agudas, llanas, esdrújulas', 'Hiatos y diptongos', 'Palabras homófonas (b/v, haber/a ver, ahí/hay/¡ay!)'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 8,
              title: 'Géneros Literarios y Métrica',
              topics: ['La lírica: versos de arte menor y mayor, rima asonante y consonante', 'Figuras retóricas: metáfora, comparación, hipérbole, personificación'],
            },
            {
              unitNumber: 9,
              title: 'Literatura Medieval y Renacentista',
              topics: ['Cantares de gesta y el Cantar de Mio Cid', 'El Romancero viejo', 'El Lazarillo de Tormes'],
            },
          ],
        },
      ],
    },
    sociales: {
      gradeLevel: '2º ESO',
      subjectCode: 'sociales',
      subjectName: 'Geografía e Historia',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'La Fragmentación del Mundo Antiguo',
              topics: ['La caída del Imperio Romano de Occidente', 'Los reinos germánicos y el reino visigodo en Hispania', 'El Imperio Bizantino y Justiniano'],
            },
            {
              unitNumber: 2,
              title: 'El Nacimiento del Islam y Al-Ándalus',
              topics: ['Mahoma y la doctrina del Islam', 'La expansión del califato omeya y abasí', 'Invasión del 711 d.C.: Emirato de Córdoba y Califato de Abderramán III', 'Cultura y arte andalusí en la Península'],
            },
            {
              unitNumber: 3,
              title: 'La Europa Feudal y la Sociedad Estamental',
              topics: ['El feudo: reserva señorial y mansos', 'Las relaciones de vasallaje (homenaje e investidura)', 'La pirámide feudal: bellatores, oratores, laboratores', 'El papel de la Iglesia y los monasterios medievales'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 4,
              title: 'Los Reinos Cristianos Peninsulares',
              topics: ['El origen de los núcleos cristianos (Asturias, Navarra, Aragón)', 'El avance hacia el sur y la batalla de Las Navas de Tolosa (1212)', 'La Corona de Castilla y la Corona de Aragón'],
            },
            {
              unitNumber: 5,
              title: 'El Renacimiento Urbano y el Comercio Medieval',
              topics: ['El crecimiento de las ciudades (burgos) y los gremios', 'El resurgir del comercio y las ferias medievales', 'El arte románico y el arte gótico (catedrales, vidrieras, arcos ojivales)'],
            },
            {
              unitNumber: 6,
              title: 'La Crisis del Siglo XIV y los Reyes Católicos',
              topics: ['La Peste Negra de 1348 y las revueltas campesinas', 'La unión dinástica de Isabel de Castilla y Fernando de Aragón (1469)', 'El año crucial de 1492: Granada, expulsión de los judíos y llegada a América'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 7,
              title: 'El Humanismo y el Renacimiento',
              topics: ['El antropocentrismo frente al teocentrismo', 'La revolución científica y la imprenta de Gutenberg', 'Los grandes genios del arte: Da Vinci, Miguel Ángel, Rafael'],
            },
            {
              unitNumber: 8,
              title: 'Geografía Humana: Población y Ciudades',
              topics: ['Estructura demográfica: natalidad, mortalidad, esperanza de vida', 'Las pirámides de población', 'El proceso de urbanización y las funciones de la ciudad moderna'],
            },
          ],
        },
      ],
    },
    fisica_quimica: {
      gradeLevel: '2º ESO',
      subjectCode: 'fisica_quimica',
      subjectName: 'Física y Química',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'La Actividad Científica y Magnitudes',
              topics: ['El método científico paso a paso', 'Magnitudes fundamentales del Sistema Internacional (SI)', 'Factores de conversión de unidades y notación científica'],
            },
            {
              unitNumber: 2,
              title: 'La Materia y sus Estados de Agregación',
              topics: ['Masa, volumen y cálculo de la densidad (d = m / V)', 'Teoría cinético-molecular de la materia', 'Gráficas de cambios de estado (fusión, ebullición, sublimación)'],
            },
            {
              unitNumber: 3,
              title: 'Sustancias Puras, Mezclas y Disoluciones',
              topics: ['Mezclas homogéneas vs heterogéneas', 'Métodos de separación física (filtración, decantación, evaporación, destilación)', 'Concentración de disoluciones: % en masa y gramos por litro (g/L)'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 4,
              title: 'La Estructura del Átomo y la Tabla Periódica',
              topics: ['Modelos atómicos: Thomson, Rutherford, Bohr', 'Partículas subatómicas: protones (+), neutrones (0) y electrones (-)', 'Número atómico (Z), número másico (A) e isótopos', 'Grupos y periodos de la Tabla Periódica'],
            },
            {
              unitNumber: 5,
              title: 'Los Cambios Químicos y Reacciones',
              topics: ['Cambios físicos vs cambios químicos', 'Reactivos y productos en una ecuación química', 'Ley de conservación de la masa (Lavoisier)', 'Reacciones cotidianas: combustión, oxidación, fotosíntesis'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 6,
              title: 'El Movimiento y la Cinemática',
              topics: ['Posición, trayectoria, espacio recorrido y desplazamiento', 'Velocidad media e instantánea (v = s / t)', 'Movimiento Rectilíneo Uniforme (MRU) y gráficas s-t'],
            },
            {
              unitNumber: 7,
              title: 'Las Fuerzas y las Máquinas Simples',
              topics: ['Concepto de fuerza (newtons) y dinamómetro', 'Efectos de las fuerzas: deformación y Ley de Hooke', 'Fuerza gravitatoria, peso (P = m · g) y rozamiento', 'Palancas de 1º, 2º y 3er género'],
            },
          ],
        },
      ],
    },
    biologia: {
      gradeLevel: '2º ESO',
      subjectCode: 'biologia',
      subjectName: 'Biología y Geología',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'Los Niveles de Organización y la Célula Humana',
              topics: ['Átomos, moléculas, células, tejidos, órganos y sistemas', 'Célula eucariota animal: membrana, citoplasma y orgánulos', 'El núcleo celular y el ADN'],
            },
            {
              unitNumber: 2,
              title: 'La Función de Nutrición (I): Digestivo y Respiratorio',
              topics: ['Anatomía del tubo digestivo y glándulas anejas', 'Digestión mecánica y química, absorción en vellosidades intestinales', 'Vías respiratorias y alvéolos pulmonares: intercambio de gases (hematosis)'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 3,
              title: 'La Función de Nutrición (II): Circulatorio y Excretor',
              topics: ['El corazón: aurículas, ventrículos y ciclo cardíaco', 'Vasos sanguíneos: arterias, venas y capilares', 'La sangre: glóbulos rojos, blancos y plaquetas', 'Los riñones, nefronas y formación de la orina'],
            },
            {
              unitNumber: 4,
              title: 'La Función de Relación: Sistema Nervioso y Sentidos',
              topics: ['La neurona y el impulso nervioso (sinapsis)', 'Sistema Nervioso Central (encéfalo y médula) y Periférico', 'Acto reflejo vs acto voluntario', 'Los órganos de los sentidos'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 5,
              title: 'El Sistema Endocrino y la Coordinación Hormonal',
              topics: ['Glándulas endocrinas e hipófisis', 'Hormonas principales (insulina, adrenalina, tiroxina)', 'La función de reproducción y ciclo ovárico'],
            },
            {
              unitNumber: 6,
              title: 'La Dinámica de la Tierra y Relieve',
              topics: ['Estructura interna de la Tierra (corteza, manto, núcleo)', 'Tectónica de placas, volcanes y terremotos', 'Agentes geológicos externos: agua, viento, hielo y modelado del paisaje'],
            },
          ],
        },
      ],
    },
    valencia: {
      gradeLevel: '2º ESO',
      subjectCode: 'valencia',
      subjectName: 'Valencià: Llengua i Literatura',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'Ortografia Bàsica: Accent i Apòstrof',
              topics: ['Accentuació oberta (à, è, ò) i tancada (é, í, ó, ú)', 'Regles de l’apòstrof de l’article "el" i "la"', 'La dièresi: estalviadora i morfològica'],
            },
            {
              unitNumber: 2,
              title: 'Morfologia Verbal i Pronoms',
              topics: ['Els temps verbals de passat (passat simple vs perifràstic "vaig cantar")', 'Pronoms personals forts i pronoms febles de 1a i 2a persona (em, et, ens, vos)'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 3,
              title: 'Pronoms Febles de 3a Persona (CD i CI)',
              topics: ['Substitució de Complement Directe determinat (el, la, els, les) i indeterminat (en)', 'Substitució de Complement Indirecte (li, els)', 'Apostrofació de pronoms febles davant o darrere de verb'],
            },
            {
              unitNumber: 4,
              title: 'Tipologia Textual i Lèxic Valencià',
              topics: ['Textos expositius i argumentatius en valencià', 'Prefixos i sufixos derivatius', 'Frases fetes i refranys populars valencians'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 5,
              title: 'Literatura Valenciana Medieval i Popular',
              topics: ['Les Rondalles valencianes d’Enric Valor', 'Ausiàs March i la poesia lírica medieval', 'Tirant lo Blanc de Joanot Martorell'],
            },
          ],
        },
      ],
    },
    ingles: {
      gradeLevel: '2º ESO',
      subjectCode: 'ingles',
      subjectName: 'Inglés (English)',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'Past Simple & Past Continuous',
              topics: ['Regular verbs with -ed pronunciation', 'Irregular verbs 2nd column list', 'Past Continuous: was/were + verb-ing', 'Connecting sentences with WHEN and WHILE'],
            },
            {
              unitNumber: 2,
              title: 'Comparative and Superlative Adjectives',
              topics: ['Short adjectives: -er / the -est', 'Long adjectives: more / the most', 'Irregular adjectives: good/better/best, bad/worse/worst'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 3,
              title: 'Present Perfect Simple',
              topics: ['Structure: have/has + 3rd column (past participle)', 'Time adverbs: just, already, yet', 'Experience with ever and never', 'Present Perfect vs Past Simple'],
            },
            {
              unitNumber: 4,
              title: 'Modal Verbs of Obligation and Ability',
              topics: ['Can and could for ability', 'Must and have to for rules and obligation', 'Should for advice and recommendations', 'Mustn\'t vs don\'t have to'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 5,
              title: 'Future Forms (Will vs Be Going To)',
              topics: ['Will for spontaneous decisions and predictions', 'Be going to for plans and intentions', 'First conditional: if + present simple, will + base form'],
            },
          ],
        },
      ],
    },
    tecnologia: {
      gradeLevel: '2º ESO',
      subjectCode: 'tecnologia',
      subjectName: 'Tecnología y Digitalización',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'El Proceso Tecnológico y Materiales',
              topics: ['Fases del método de proyectos', 'Propiedades de la madera y derivados', 'Metales férricos y no férricos'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 2,
              title: 'Mecanismos y Máquinas Simples',
              topics: ['Palancas y ley de la palanca', 'Poleas fijas, móviles y polipastos', 'Engranajes y relación de transmisión'],
            },
            {
              unitNumber: 3,
              title: 'Electricidad Básica y Ley de Ohm',
              topics: ['Circuito eléctrico básico: generador, conductor, receptor, interruptor', 'Magnitudes: Voltaje (V), Intensidad (I) y Resistencia (R)', 'Ley de Ohm: V = I · R', 'Circuitos en serie vs paralelo'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 4,
              title: 'Pensamiento Computacional y Programación',
              topics: ['Algoritmos y diagramas de flujo', 'Estructuras de control: bucles y condicionales (if/else)', 'Programación por bloques'],
            },
          ],
        },
      ],
    },
    musica: {
      gradeLevel: '2º ESO',
      subjectCode: 'musica',
      subjectName: 'Música',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'Cualidades del Sonido y Notación',
              topics: ['Altura, duración, intensidad y timbre', 'Notas en clave de sol y figuras rítmicas'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 2,
              title: 'Instrumentos y Agrupaciones Musicales',
              topics: ['Familias de cuerda, viento y percusión', 'La orquesta sinfónica'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 3,
              title: 'Historia de la Música',
              topics: ['Canto gregoriano y trovadores en la Edad Media', 'La polifonía renacentista'],
            },
          ],
        },
      ],
    },
    plastica: {
      gradeLevel: '2º ESO',
      subjectCode: 'plastica',
      subjectName: 'Educación Plástica y Visual',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            {
              unitNumber: 1,
              title: 'Elementos del Lenguaje Visual',
              topics: ['Punto, línea y plano como recursos expresivos', 'Texturas visuales y táctiles'],
            },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            {
              unitNumber: 2,
              title: 'Teoría del Color y Composición',
              topics: ['Colores primarios, secundarios y complementarios', 'Armonía y contraste'],
            },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            {
              unitNumber: 3,
              title: 'Geometría Plana y Trazados',
              topics: ['Mediatriz de un segmento y bisectriz de un ángulo', 'Polígonos regulares inscritos'],
            },
          ],
        },
      ],
    },
    otro: {
      gradeLevel: '2º ESO',
      subjectCode: 'otro',
      subjectName: 'Otra Asignatura',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [{ unitNumber: 1, title: 'Unidad Inicial', topics: ['Introducción', 'Fundamentos'] }],
        },
      ],
    },
  },
  '3º ESO': {
    mates: {
      gradeLevel: '3º ESO',
      subjectCode: 'mates',
      subjectName: 'Matemáticas',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            { unitNumber: 1, title: 'Números Reales y Notación Científica', topics: ['Números racionales e irracionales', 'Intervalos y semirrectas', 'Operaciones con notación científica'] },
            { unitNumber: 2, title: 'Polinomios y Operaciones', topics: ['Suma, resta y multiplicación de polinomios', 'Identidades notables: cuadrado de una suma, diferencia y suma por diferencia'] },
            { unitNumber: 3, title: 'Ecuaciones de Segundo Grado', topics: ['Fórmula general: x = (-b ± √(b² - 4ac)) / (2a)', 'Ecuaciones incompletas y discriminante'] },
          ],
        },
        {
          termName: '2º Trimestre',
          periodMonths: 'Enero - Marzo',
          units: [
            { unitNumber: 4, title: 'Sistemas de Ecuaciones Lineales y No Lineales', topics: ['Método algebraico y gráfico', 'Problemas geométricos y económicos'] },
            { unitNumber: 5, title: 'Sucesiones y Progresiones', topics: ['Término general de una sucesión', 'Progresiones aritméticas y suma de n términos', 'Progresiones geométricas'] },
          ],
        },
        {
          termName: '3er Trimestre',
          periodMonths: 'Abril - Junio',
          units: [
            { unitNumber: 6, title: 'Funciones Lineales y Cuadráticas (Parábolas)', topics: ['Pendiente y ordenada en el origen', 'Vértice de una parábola', 'Puntos de corte con los ejes'] },
            { unitNumber: 7, title: 'Geometría del Espacio y Cuerpos de Revolución', topics: ['Teorema de Tales y semejanza de figuras', 'Áreas y volúmenes de prismas y pirámides'] },
          ],
        },
      ],
    },
    lengua: {
      gradeLevel: '3º ESO',
      subjectCode: 'lengua',
      subjectName: 'Lengua Castellana y Literatura',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            { unitNumber: 1, title: 'Sintaxis de la Oración Simple (Repaso y Consolidación)', topics: ['Todos los complementos verbales: CD, CI, CC, Atributo, CPvo, CRég, CAg'] },
            { unitNumber: 2, title: 'Literatura de la Edad Media y Prerrenacimiento', topics: ['Mester de juglaría y clerecía', 'Jorge Manrique: Coplas por la muerte de su padre', 'La Celestina de Fernando de Rojas'] },
          ],
        },
      ],
    },
    sociales: {
      gradeLevel: '3º ESO',
      subjectCode: 'sociales',
      subjectName: 'Geografía e Historia',
      terms: [
        {
          termName: '1er Trimestre',
          periodMonths: 'Septiembre - Diciembre',
          units: [
            { unitNumber: 1, title: 'La Organización Política y Económica del Mundo', topics: ['Los sectores económicos (primario, secundario, terciario)', 'Globalización e interdependencia'] },
          ],
        },
      ],
    },
    fisica_quimica: { gradeLevel: '3º ESO', subjectCode: 'fisica_quimica', subjectName: 'Física y Química', terms: [] },
    biologia: { gradeLevel: '3º ESO', subjectCode: 'biologia', subjectName: 'Biología y Geología', terms: [] },
    valencia: { gradeLevel: '3º ESO', subjectCode: 'valencia', subjectName: 'Valencià', terms: [] },
    ingles: { gradeLevel: '3º ESO', subjectCode: 'ingles', subjectName: 'Inglés', terms: [] },
    tecnologia: { gradeLevel: '3º ESO', subjectCode: 'tecnologia', subjectName: 'Tecnología', terms: [] },
    musica: { gradeLevel: '3º ESO', subjectCode: 'musica', subjectName: 'Música', terms: [] },
    plastica: { gradeLevel: '3º ESO', subjectCode: 'plastica', subjectName: 'Plástica', terms: [] },
    otro: { gradeLevel: '3º ESO', subjectCode: 'otro', subjectName: 'Otra', terms: [] },
  },
  '4º ESO': {
    mates: { gradeLevel: '4º ESO', subjectCode: 'mates', subjectName: 'Matemáticas', terms: [] },
    lengua: { gradeLevel: '4º ESO', subjectCode: 'lengua', subjectName: 'Lengua Castellana', terms: [] },
    sociales: { gradeLevel: '4º ESO', subjectCode: 'sociales', subjectName: 'Historia del Mundo Contemporáneo', terms: [] },
    fisica_quimica: { gradeLevel: '4º ESO', subjectCode: 'fisica_quimica', subjectName: 'Física y Química', terms: [] },
    biologia: { gradeLevel: '4º ESO', subjectCode: 'biologia', subjectName: 'Biología y Geología', terms: [] },
    valencia: { gradeLevel: '4º ESO', subjectCode: 'valencia', subjectName: 'Valencià', terms: [] },
    ingles: { gradeLevel: '4º ESO', subjectCode: 'ingles', subjectName: 'Inglés', terms: [] },
    tecnologia: { gradeLevel: '4º ESO', subjectCode: 'tecnologia', subjectName: 'Tecnología', terms: [] },
    musica: { gradeLevel: '4º ESO', subjectCode: 'musica', subjectName: 'Música', terms: [] },
    plastica: { gradeLevel: '4º ESO', subjectCode: 'plastica', subjectName: 'Plástica', terms: [] },
    otro: { gradeLevel: '4º ESO', subjectCode: 'otro', subjectName: 'Otra', terms: [] },
  },
};

// Initial pre-built TEA study notes for 2º ESO units
export const INITIAL_TEA_NOTES: TeaStudyNote[] = [
  {
    id: 'tea-note-mat-1',
    gradeLevel: '2º ESO',
    subjectCode: 'mates',
    subjectName: 'Matemáticas',
    term: '1er Trimestre',
    orderNumber: 4,
    unitTitle: 'Álgebra y Ecuaciones de 1er Grado con Paréntesis y Denominadores',
    estimatedStudyTimeMinutes: 25,
    executiveSummary: 'Una ecuación es como una balanza en equilibrio con dos lados iguales. Nuestro único objetivo es dejar la letra X completamente sola en un lado de la balanza para averiguar qué número vale.',
    coreConcepts: [
      {
        conceptName: 'Incógnita (la letra X)',
        literalDefinition: 'Es un número desconocido que queremos averiguar. Actúa como una caja cerrada con un valor numérico fijo dentro.',
        concreteExample: 'Si x + 5 = 12, la caja X contiene exactamente el número 7, porque 7 + 5 = 12.',
        visualIconHint: 'caja_abierta',
      },
      {
        conceptName: 'Miembros de la ecuación',
        literalDefinition: 'El primer miembro es todo lo que está a la izquierda del signo igual (=). El segundo miembro es todo lo que está a la derecha.',
        concreteExample: 'En 3x - 4 = 2x + 8, el miembro izquierdo es (3x - 4) y el derecho es (2x + 8).',
        visualIconHint: 'balanza',
      },
      {
        conceptName: 'Regla de la trasposición (cambio de lado)',
        literalDefinition: 'Cuando un término pasa de un lado del signo igual al otro lado, SIEMPRE debe realizar la operación exactamente opuesta.',
        concreteExample: 'Lo que está sumando (+) pasa restando (-). Lo que está multiplicando pasa dividiendo (sin cambiar su signo).',
        visualIconHint: 'flecha_cambio',
      },
    ],
    stepByStepAlgorithms: [
      {
        taskTitle: 'Algoritmo exacto para resolver CUALQUIER ecuación con paréntesis',
        steps: [
          'Paso 1: Quitar paréntesis multiplicando el número de fuera por CADA término de dentro. Cuidado: Si hay un signo menos (-) delante, cambia TODOS los signos interiores.',
          'Paso 2: Trasponer las X al lado izquierdo y los números sin X al lado derecho.',
          'Paso 3: Reducir términos semejantes (sumar las X entre sí y los números entre sí).',
          'Paso 4: Despejar la X pasando su coeficiente dividiendo al otro lado.',
          'Paso 5: Comprobar el resultado sustituyendo el número obtenido en la ecuación original.',
        ],
        solvedCase: 'Ejemplo resuelto: 2(x - 3) + 4 = 14 -> 2x - 6 + 4 = 14 -> 2x - 2 = 14 -> 2x = 16 -> x = 16/2 = 8.',
      },
    ],
    comparisonTable: {
      tableTitle: 'Tabla de operaciones opuestas al cruzar el signo igual (=)',
      columns: ['Operación en su lado actual', 'Operación al pasar al otro lado', 'Ejemplo concreto'],
      rows: [
        ['Sumando (+ 5)', 'Pasa restando (- 5)', 'x + 5 = 9  ->  x = 9 - 5'],
        ['Restando (- 3)', 'Pasa sumando (+ 3)', 'x - 3 = 7  ->  x = 7 + 3'],
        ['Multiplicando (· 4)', 'Pasa dividiendo (/ 4)', '4x = 20  ->  x = 20 / 4'],
        ['Dividiendo (/ 2)', 'Pasa multiplicando (· 2)', 'x / 2 = 6  ->  x = 6 · 2'],
      ],
    },
    mistakesToAvoid: [
      {
        wrongAction: 'Olvidar multiplicar el número de fuera por el segundo término del paréntesis (ejemplo erróneo: 3(x + 4) = 3x + 4).',
        whyIsWrong: 'El 3 multiplica a TODO lo que hay dentro de la caja, no solo a la primera letra.',
        correctAction: 'Multiplica los dos: 3 · x = 3x y 3 · 4 = 12. Queda 3x + 12.',
      },
      {
        wrongAction: 'Cambiar de signo al pasar un número dividiendo (ejemplo erróneo: -2x = 8 -> x = 8 / 2).',
        whyIsWrong: 'Al despejar una multiplicación a división, el signo se conserva siempre intacto.',
        correctAction: 'Conserva el signo negativo: x = 8 / (-2) = -4.',
      },
    ],
    checkpointsMastery: [
      'Sé que lo domino si puedo quitar un paréntesis con signo negativo sin confundirme de signos.',
      'Sé que lo domino si puedo pasar todas las X a la izquierda y los números a la derecha en 30 segundos.',
      'Sé que lo domino si al sustituir el resultado final en la ecuación, ambos miembros dan el mismo número.',
    ],
    createdAt: '2026-10-10',
  },
  {
    id: 'tea-note-len-1',
    gradeLevel: '2º ESO',
    subjectCode: 'lengua',
    subjectName: 'Lengua Castellana y Literatura',
    term: '1er Trimestre',
    orderNumber: 4,
    unitTitle: 'Sintaxis: Identificación Infalible de Sujeto y Complemento Directo (CD)',
    estimatedStudyTimeMinutes: 25,
    executiveSummary: 'Analizar sintaxis es como clasificar piezas de un puzle. Cada palabra cumple una función fija y exacta dentro de la oración según su relación con el verbo.',
    coreConcepts: [
      {
        conceptName: 'Sujeto (Suj)',
        literalDefinition: 'Es la persona, animal o cosa que concuerda en NÚMERO (singular o plural) y PERSONA con el verbo de la oración.',
        concreteExample: 'En "Me gustan los libros", el Sujeto es "los libros", porque si cambias el verbo a singular ("Me gusta"), la palabra que cambia obligatoriamente es "el libro".',
        visualIconHint: 'engranaje',
      },
      {
        conceptName: 'Complemento Directo (CD)',
        literalDefinition: 'Es el sintagma que recibe directamente la acción del verbo. Solo puede aparecer con verbos predicativos y transitivos.',
        concreteExample: 'En "Lucía compró manzanas", el CD es "manzanas" (Lucía las compró).',
        visualIconHint: 'flecha_directa',
      },
    ],
    stepByStepAlgorithms: [
      {
        taskTitle: 'La Prueba del Cambio de Número para encontrar el Sujeto (100% infalible)',
        steps: [
          'Paso 1: Localiza el verbo conjugado de la oración (ej: "llegó").',
          'Paso 2: Cambia mentalmente el verbo de singular a plural (de "llegó" a "llegaron") o viceversa.',
          'Paso 3: Observa qué grupo de palabras te ves OBLIGADA a cambiar para que la frase suene correcta en español.',
          'Paso 4: Ese grupo que cambia por concordancia ES EL SUJETO. El resto de la oración es el PREDICADO.',
        ],
        solvedCase: '"Ayer llegó el tren de Valencia" -> Si pones "llegaron", dices "llegaron los trenes". Sujeto: "El tren de Valencia".',
      },
      {
        taskTitle: 'Las 2 Pruebas para verificar si un sintagma es Complemento Directo (CD)',
        steps: [
          'Prueba A (Pronominalización): Sustituye el sintagma por "lo", "la", "los" o "las". Si encaja de forma natural, es CD.',
          'Prueba B (Paso a Pasiva): Convierte la oración a pasiva. Si el sintagma pasa a ser el Sujeto Paciente, es CD seguro.',
        ],
        solvedCase: '"El mecánico arregló la moto" -> Prueba A: "El mecánico LA arregló" (OK) -> Prueba B: "La moto fue arreglada por el mecánico" (OK). CD: "la moto".',
      },
    ],
    comparisonTable: {
      tableTitle: 'Diferencia exacta entre Sujeto y Complemento Directo',
      columns: ['Criterio', 'Sujeto (Suj)', 'Complemento Directo (CD)'],
      rows: [
        ['¿Lleva preposición?', 'Casi nunca (nunca lleva "a", excepto raros casos)', 'Solo lleva preposición "a" si se refiere a una persona concreta (ej: "Vi a Sara")'],
        ['¿Cómo se prueba?', 'Cambiando el número del verbo (singular <-> plural)', 'Sustituyendo por lo, la, los, las'],
        ['¿Qué pasa en voz pasiva?', 'Se convierte en Complemento Agente ("por...")', 'Se convierte en el nuevo Sujeto Paciente'],
      ],
    },
    mistakesToAvoid: [
      {
        wrongAction: 'Preguntarle "¿Quién?" al verbo para buscar el Sujeto.',
        whyIsWrong: 'Falla estrepitosamente en oraciones cotidianas como "Me gusta el chocolate" (si preguntas ¿quién?, responderías erróneamente "a mí", pero "a mí" es CI y el Sujeto es "el chocolate").',
        correctAction: 'Usa SIEMPRE la prueba de concordancia de número (cambiar singular a plural).',
      },
    ],
    checkpointsMastery: [
      'Sé que lo domino si puedo encontrar el sujeto elíptico escribiendo el pronombre correspondiente (yo, tú, él, ella, nosotros, vosotros, ellos).',
      'Sé que lo domino si distingo un CD de un Atributo comprobando si el verbo es copulativo (ser, estar, parecer).',
    ],
    createdAt: '2026-10-10',
  },
  {
    id: 'tea-note-soc-1',
    gradeLevel: '2º ESO',
    subjectCode: 'sociales',
    subjectName: 'Geografía e Historia',
    term: '1er Trimestre',
    orderNumber: 3,
    unitTitle: 'La Sociedad Feudal y las Etapas Cronológicas de Al-Ándalus',
    estimatedStudyTimeMinutes: 25,
    executiveSummary: 'La Edad Media en la Península Ibérica estuvo marcada por dos realidades paralelas: la sociedad feudal cristiana organizada en tres estamentos cerrados, y el florecimiento de Al-Ándalus desde el año 711 d.C.',
    coreConcepts: [
      {
        conceptName: 'Estamento',
        literalDefinition: 'Grupo social cerrado al que se pertenecía por nacimiento. Era prácticamente imposible cambiar de estamento durante la vida.',
        concreteExample: 'El hijo de un campesino nacía campesino y moría campesino. El hijo de un noble nacía con títulos y tierras.',
        visualIconHint: 'piramide_escalonada',
      },
      {
        conceptName: 'Pacto de Vasallaje',
        literalDefinition: 'Contrato personal sagrado entre dos hombres libres de la nobleza: el vasallo prometía ayuda militar y consejo; el señor le otorgaba protección y un feudo (tierras).',
        concreteExample: 'Se sellaba con la ceremonia del Homenaje (el vasallo se arrodillaba) y la Investidura (el señor le entregaba una vara o puñado de tierra).',
        visualIconHint: 'apreton_manos',
      },
    ],
    stepByStepAlgorithms: [
      {
        taskTitle: 'Línea de Tiempo Cronológica de Al-Ándalus (Orden invariable)',
        steps: [
          '1. Año 711 d.C.: Batalla de Guadalete. Tropas musulmanas cruzan el estrecho y derrotan al rey visigodo Rodrigo.',
          '2. 711 - 756: Emirato Dependiente de Damasco (capital Córdoba, gobernado por un valí dependiente del Califa).',
          '3. 756 - 929: Emirato Independiente de Bagdad. El príncipe omeya Abderramán I proclama la independencia política.',
          '4. 929 - 1031: Califato de Córdoba (Época de máximo esplendor militar, cultural y económico bajo Abderramán III).',
          '5. 1031 - 1212: Reinos de Taifas e invasiones norteafricanas (Almorávides y Almohades).',
          '6. 1212: Batalla de Las Navas de Tolosa (gran victoria cristiana que debilita el poder musulmán).',
          '7. 1238 - 1492: Reino Nazarí de Granada (último bastión musulmán, entregado por Boabdil a los Reyes Católicos en 1492).',
        ],
        solvedCase: 'Cronología básica: 711 (Invasión) -> 756 (Emirato) -> 929 (Califato) -> 1212 (Navas de Tolosa) -> 1492 (Toma de Granada).',
      },
    ],
    comparisonTable: {
      tableTitle: 'Los Tres Estamentos Feudales de la Edad Media',
      columns: ['Estamento', 'Nombre en latín', 'Función obligatoria', '¿Pagaba impuestos?'],
      rows: [
        ['Nobleza (Caballeros y señores)', 'Bellatores', 'Defender militarmente a la sociedad', 'NO (Privilegiados)'],
        ['Clero (Sacerdotes, monjes y obispos)', 'Oratores', 'Rezar por la salvación de las almas', 'NO (Privilegiados)'],
        ['Campesinos y siervos (Tercer estado)', 'Laboratores', 'Trabajar la tierra y alimentar a todos', 'SÍ (Pagaban tributos a los dos superiores)'],
      ],
    },
    mistakesToAvoid: [
      {
        wrongAction: 'Confundir vasallaje con servidumbre.',
        whyIsWrong: 'El vasallaje es un pacto honorable entre dos NOBLES. La servidumbre es la relación de sometimiento entre un campesino siervo y su señor feudal.',
        correctAction: 'Recuerda: Vasallo = noble jurando fidelidad a otro noble señor.',
      },
    ],
    checkpointsMastery: [
      'Sé que lo domino si puedo recitar en orden las etapas de Al-Ándalus en una línea cronológica.',
      'Sé que lo domino si sé explicar los 3 estamentos de la pirámide feudal y quién pagaba los impuestos.',
    ],
    createdAt: '2026-10-10',
  },
  {
    id: 'tea-note-fyq-1',
    gradeLevel: '2º ESO',
    subjectCode: 'fisica_quimica',
    subjectName: 'Física y Química',
    term: '1er Trimestre',
    orderNumber: 2,
    unitTitle: 'La Materia: Masa, Volumen, Densidad y Cambios de Estado',
    estimatedStudyTimeMinutes: 25,
    executiveSummary: 'La materia es todo lo que tiene masa y ocupa un volumen en el espacio. La densidad nos dice cómo de compacta está la masa dentro de ese volumen.',
    coreConcepts: [
      {
        conceptName: 'Densidad (d)',
        literalDefinition: 'Es la relación matemática fija entre la masa de un cuerpo y el volumen que ocupa: d = masa / volumen.',
        concreteExample: 'Un bloque de plomo de 1 litro pesa 11,3 kg. Un bloque de corcho de 1 litro pesa solo 0,2 kg. El plomo es mucho más denso que el corcho.',
        visualIconHint: 'balanza_cubo',
      },
    ],
    stepByStepAlgorithms: [
      {
        taskTitle: 'Algoritmo de 4 pasos para resolver CUALQUIER problema de densidad',
        steps: [
          'Paso 1 (Datos): Escribe claramente m = ..., V = ..., d = ... con un signo de interrogación en la incógnita.',
          'Paso 2 (Unidades): Asegúrate de que las unidades sean compatibles (gramos con cm³ o mililitros; kilogramos con m³ o litros). Si no, convierte antes de operar.',
          'Paso 3 (Fórmula): Escribe la fórmula base d = m / V. Si necesitas despejar: m = d · V  o  V = m / d.',
          'Paso 4 (Cálculo y respuesta): Sustituye los números, haz la división con cuidado y escribe la cifra final con su unidad bien visible.',
        ],
        solvedCase: 'Ejemplo: m = 540 g, V = 200 cm³ -> d = 540 / 200 = 2,7 g/cm³ (aluminio).',
      },
    ],
    comparisonTable: {
      tableTitle: 'Los 6 Cambios de Estado de la Materia',
      columns: ['Estado Inicial', 'Estado Final', 'Nombre del Cambio', '¿Aporta o pierde calor?'],
      rows: [
        ['Sólido', 'Líquido', 'Fusión', 'Se calienta (absorbe calor)'],
        ['Líquido', 'Gas', 'Vaporización / Ebullición', 'Se calienta (absorbe calor)'],
        ['Gas', 'Líquido', 'Condensación', 'Se enfría (cede calor)'],
        ['Líquido', 'Sólido', 'Solidificación', 'Se enfría (cede calor)'],
        ['Sólido', 'Gas directo', 'Sublimación', 'Se calienta (absorbe calor)'],
        ['Gas', 'Sólido directo', 'Sublimación inversa / Deposición', 'Se enfría (cede calor)'],
      ],
    },
    mistakesToAvoid: [
      {
        wrongAction: 'Olvidar poner la unidad en el resultado final (ejemplo: escribir "d = 2,7" a secas).',
        whyIsWrong: 'En Física y Química un número sin unidades no tiene sentido físico y los profesores bajan medio punto por respuesta sin unidades.',
        correctAction: 'Escribe siempre la unidad: "d = 2,7 g/cm³" o "d = 2700 kg/m³".',
      },
    ],
    checkpointsMastery: [
      'Sé que lo domino si puedo despejar el volumen o la masa del triángulo de la densidad sin dudar.',
      'Sé que lo domino si sé nombrar los 6 cambios de estado y cuál absorbe calor y cuál se enfría.',
    ],
    createdAt: '2026-10-10',
  },
];
