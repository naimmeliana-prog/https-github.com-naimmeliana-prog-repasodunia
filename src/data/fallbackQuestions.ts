import { QuizQuestion, Flashcard, StudySummary, SubjectCode } from '../types';

export const FALLBACK_QUIZZES: Record<SubjectCode, QuizQuestion[]> = {
  mates: [
    {
      id: 'mat-1',
      question: '¿Cuál es la solución de la ecuación de primer grado: 3(x - 2) + 4 = 19?',
      options: ['x = 5', 'x = 7', 'x = 6', 'x = 8'],
      correctIndex: 1,
      explanation: 'Primero quitamos paréntesis: 3x - 6 + 4 = 19. Agrupamos números: 3x - 2 = 19. Pasamos el -2 sumando: 3x = 21. Despejamos: x = 21 / 3 = 7.',
      tip: 'Multiplica el número de fuera por TODO lo que está dentro del paréntesis antes de sumar o restar.'
    },
    {
      id: 'mat-2',
      question: 'Si en un triángulo rectángulo los catetos miden 6 cm y 8 cm, ¿cuánto mide la hipotenusa (h)?',
      options: ['14 cm', '10 cm', '12 cm', '48 cm'],
      correctIndex: 1,
      explanation: 'Aplicamos el Teorema de Pitágoras: h² = a² + b² = 6² + 8² = 36 + 64 = 100. Por lo tanto, h = √100 = 10 cm.',
      tip: '¡Recuerda que la hipotenusa siempre es el lado más largo y está opuesta al ángulo recto de 90°!'
    },
    {
      id: 'mat-3',
      question: 'En unas rebajas, una sudadera de 40 € tiene un 25 % de descuento. ¿Cuánto cuesta rebajada?',
      options: ['10 €', '35 €', '30 €', '28 €'],
      correctIndex: 2,
      explanation: 'El 25 % de 40 € es (25 · 40) / 100 = 10 € de descuento. El precio final es 40 - 10 = 30 € (o multiplicar directamente por 0,75).',
      tip: 'Un 25% de descuento equivale a pagar el 75% del precio original (o dividir entre 4 para saber el descuento).'
    },
    {
      id: 'mat-4',
      question: '¿Cuál es el valor del monomio 3x²y cuando x = 2 e y = -1?',
      options: ['-12', '12', '-6', '-18'],
      correctIndex: 0,
      explanation: 'Sustituimos las letras por sus valores: 3 · (2)² · (-1) = 3 · 4 · (-1) = 12 · (-1) = -12.',
      tip: 'Haz primero las potencias, luego los productos, y ten mucho cuidado con la regla de los signos: positivo · negativo = negativo.'
    },
    {
      id: 'mat-5',
      question: '¿Cuál es el resultado de la operación con fracciones: (2/3) + (5/6)?',
      options: ['7/9', '9/6 = 3/2', '10/18', '7/6'],
      correctIndex: 1,
      explanation: 'El m.c.m.(3, 6) = 6. Convertimos la primera fracción: 2/3 = 4/6. Sumamos: 4/6 + 5/6 = 9/6. Simplificando entre 3 obtenemos 3/2 (ó 1,5).',
      tip: '¡Nunca sumes los denominadores directamente! Halla siempre el común denominador antes de sumar.'
    }
  ],
  lengua: [
    {
      id: 'len-1',
      question: 'En la oración "Marina compró un libro de aventuras a su hermano", ¿qué función sintáctica realiza "un libro de aventuras"?',
      options: ['Sujeto paciente', 'Complemento Indirecto (CI)', 'Complemento Directo (CD)', 'Atributo'],
      correctIndex: 2,
      explanation: 'Es el Complemento Directo (CD) porque recibe directamente la acción del verbo transitivo "comprar", se puede sustituir por "lo" ("Marina LO compró a su hermano") y pasa a sujeto en voz pasiva ("Un libro de aventuras fue comprado...").',
      tip: 'Prueba siempre la sustitución por lo/la/los/las. Si encaja perfectamente, ¡es CD seguro!'
    },
    {
      id: 'len-2',
      question: '¿Qué tipo de predicado y complemento tiene la oración "El profesor parecía muy cansado hoy"?',
      options: ['Predicado Verbal con CD', 'Predicado Nominal con Atributo ("muy cansado")', 'Predicado Verbal con C. Régimen', 'Predicado Nominal con CI'],
      correctIndex: 1,
      explanation: 'El verbo "parecer" es copulativo (ser, estar, parecer). Por tanto, la oración tiene Predicado Nominal y el sintagma adjetival "muy cansado" funciona como Atributo (se puede sustituir por "lo": "El profesor lo parecía").',
      tip: 'Verbos copulativos = Ser, Estar o Parecer. Si llevan un adjetivo que dice cómo es o está el sujeto, ¡es Atributo!'
    },
    {
      id: 'len-3',
      question: '¿Cuál de las siguientes palabras contiene un HIATO y por qué lleva tilde?',
      options: ['Cuidado (diptongo ui)', 'Canción (diptongo ió)', 'País (vocal abierta + vocal cerrada tónica)', 'Murciélago (diptongo ié)'],
      correctIndex: 2,
      explanation: '"Pa-ís" tiene dos vocales en sílabas distintas (hiato). Al recaer la fuerza de la voz en la vocal cerrada (i), SIEMPRE lleva tilde obligatoria, independientemente de las reglas generales de agudas/llanas.',
      tip: 'Cuando la vocal débil (i, u) suena fuerte al lado de una fuerte (a, e, o), rompe el diptongo y lleva tilde sí o sí (ej: Ma-rí-a, ba-úl, pa-ís).'
    },
    {
      id: 'len-4',
      question: '¿Qué rasgo caracteriza principalmente a un texto ARGUMENTATIVO?',
      options: ['Explicar un hecho objetivo sin opiniones personales', 'Defender una tesis o postura propia mediante razones y argumentos convincentes', 'Describir detalladamente los rasgos físicos de un personaje', 'Contar una historia cronológica ficticia'],
      correctIndex: 1,
      explanation: 'El texto argumentativo tiene como finalidad defender una tesis aportando argumentos que convenzan o persuadan al receptor (artículos de opinión, debates, editoriales).',
      tip: 'Tesis = Idea que se defiende. Argumentos = Pruebas y razones que la apoyan. Conclusión = Cierre que reafirma la tesis.'
    }
  ],
  sociales: [
    {
      id: 'soc-1',
      question: '¿En qué año se produjo la invasión musulmana de la península ibérica y la batalla de Guadalete?',
      options: ['476 d.C.', '711 d.C.', '1492 d.C.', '1212 d.C.'],
      correctIndex: 1,
      explanation: 'En el año 711 d.C., las tropas musulmanas lideradas por Táriq derrotaron al último rey visigodo, Rodrigo, en la batalla de Guadalete, iniciando la historia de Al-Ándalus.',
      tip: 'Acuérdate de la rima mnemotécnica: "En el setecientos once (711), los musulmanes cruzaron el estrecho veloces".'
    },
    {
      id: 'soc-2',
      question: 'En la sociedad feudal de la Edad Media, ¿quiénes formaban los estamentos PRIVILEGIADOS?',
      options: ['Campesinos libres y siervos', 'La nobleza (bellatores) y el clero (oratores)', 'Los artesanos y los comerciantes', 'Solo los monjes de los monasterios'],
      correctIndex: 1,
      explanation: 'La nobleza (encargada de la defensa militar) y el clero (encargado de la salvación espiritual) eran los estamentos privilegiados: no pagaban impuestos directos, tenían leyes propias y poseían la mayor parte de las tierras.',
      tip: 'Privilegiados = nobleza + clero (no pagan impuestos). No privilegiados = el tercer estado / campesinos (trabajan y pagan a todos).'
    },
    {
      id: 'soc-3',
      question: '¿Qué pacto se sellaba mediante la ceremonia del homenaje y la investidura en el feudalismo?',
      options: ['La venta de siervos en el mercado', 'El pacto de vasallaje entre un noble señor y otro noble vasallo', 'La coronación del Papa de Roma', 'La paz entre cristianos y musulmanes'],
      correctIndex: 1,
      explanation: 'El pacto de vasallaje era un vínculo personal entre nobles: el vasallo juraba fidelidad y ayuda militar al señor (homenaje) y el señor le concedía un feudo o beneficio para su manutención (investidura).',
      tip: 'El vasallaje es entre NOBLES (iguales en estamento), mientras que la servidumbre es entre señor y campesino.'
    },
    {
      id: 'soc-4',
      question: '¿Qué batalla decisiva de 1212 supuso el gran avance de los reinos cristianos hacia el sur peninsular?',
      options: ['Batalla de Covadonga', 'Batalla de las Navas de Tolosa', 'Batalla de Lepanto', 'Batalla de Toro'],
      correctIndex: 1,
      explanation: 'En 1212, los reinos cristianos de Castilla, Navarra y Aragón se unieron para vencer a los almohades en las Navas de Tolosa (Jaén), abriendo las puertas de Andalucía a la reconquista.',
      tip: 'Fecha clave que siempre preguntan en 2º ESO: ¡1212 = Las Navas de Tolosa!'
    }
  ],
  fisica_quimica: [
    {
      id: 'fyq-1',
      question: 'Un objeto de metal tiene una masa de 270 gramos y ocupa un volumen de 100 cm³. ¿Cuál es su densidad?',
      options: ['27.000 g/cm³', '0,37 g/cm³', '2,7 g/cm³', '170 g/cm³'],
      correctIndex: 2,
      explanation: 'La fórmula de la densidad es d = m / V. Por tanto, d = 270 g / 100 cm³ = 2,7 g/cm³ (densidad típica del aluminio).',
      tip: 'Acuérdate del triángulo de la densidad: Masa arriba, Densidad y Volumen abajo. ¡d = m / V!'
    },
    {
      id: 'fyq-2',
      question: '¿Cómo se denomina el cambio de estado directo de GAS a SÓLIDO sin pasar por el estado líquido?',
      options: ['Sublimación inversa o deposición', 'Vaporización', 'Fusión', 'Condensación'],
      correctIndex: 0,
      explanation: 'El paso directo de gas a sólido se llama sublimación inversa, regresiva o deposición (como la formación de escarcha en invierno).',
      tip: 'De sólido a gas directo = Sublimación. De gas a sólido directo = Sublimación inversa.'
    },
    {
      id: 'fyq-3',
      question: '¿Qué partículas forman el NÚCLEO del átomo?',
      options: ['Solo electrones', 'Protones y electrones', 'Protones (carga positiva) y neutrones (sin carga)', 'Electrones y neutrones'],
      correctIndex: 2,
      explanation: 'En el núcleo central se encuentran los protones (con carga positiva +) y los neutrones (sin carga eléctrica, neutros). Los electrones (carga negativa -) orbitan en la corteza.',
      tip: 'Núcleo = Protones (P+) + Neutrones (N0). En la corteza alrededor vuelan los Electrones (e-).'
    },
    {
      id: 'fyq-4',
      question: 'Preparamos una disolución disolviendo 15 gramos de sal (soluto) en 200 ml de agua (disolvente). ¿Cuál es la concentración en g/L?',
      options: ['15 g/L', '75 g/L', '30 g/L', '3 g/L'],
      correctIndex: 1,
      explanation: 'Pasamos el volumen a litros: 200 ml = 0,2 L. Aplicamos la fórmula: Concentración = masa soluto (g) / volumen disolución (L) = 15 g / 0,2 L = 75 g/L.',
      tip: '¡Cuidado con las unidades! Para sacar g/L hay que pasar siempre los mililitros (ml) a litros (dividir entre 1000).'
    }
  ],
  biologia: [
    {
      id: 'bio-1',
      question: '¿En qué órgano del aparato digestivo tiene lugar la mayor parte de la ABSORCIÓN de los nutrientes hacia la sangre?',
      options: ['Estómago', 'Intestino delgado (vellosidades intestinales)', 'Intestino grueso', 'Esófago'],
      correctIndex: 1,
      explanation: 'En el intestino delgado (especialmente yeyuno e íleon), gracias a millones de microvellosidades intestinales, los nutrientes digeridos pasan a los capilares sanguíneos.',
      tip: 'El estómago digiere y tritura el quimo; el intestino delgado absorbe nutrientes; el intestino grueso absorbe agua.'
    },
    {
      id: 'bio-2',
      question: '¿Qué vasos sanguíneos devuelven la sangre al corazón con baja presión y tienen válvulas para evitar el retroceso?',
      options: ['Arterias', 'Venas', 'Capilares', 'Arteriolas'],
      correctIndex: 1,
      explanation: 'Las venas llevan la sangre de vuelta al corazón. Tienen paredes más finas que las arterias y disponen de válvulas semilunares que impiden que la sangre retroceda por la gravedad.',
      tip: 'Arterias = Salen del corazón (paredes gruesas y elásticas). Venas = Vuelven al corazón (tienen válvulas).'
    },
    {
      id: 'bio-3',
      question: '¿Cuál es la unidad anatómica y funcional básica del sistema nervioso?',
      options: ['La nefrona', 'La neurona', 'El alvéolo', 'El miocito'],
      correctIndex: 1,
      explanation: 'La neurona es la célula especializada en transmitir impulsos nerviosos bioeléctricos mediante axones y dendritas.',
      tip: 'No confundir: Neurona = Nervioso. Nefrona = Riñón (excretor).'
    }
  ],
  valencia: [
    {
      id: 'val-1',
      question: 'En la frase "Jo vaig donar un llibre a la meua germana", quin pronom feble substitueix correctament el Complement Directe "un llibre"?',
      options: ['Li', 'El', 'En', 'Els'],
      correctIndex: 1,
      explanation: '"Un llibre" és un CD masculí singular determinat. Se substitueix pel pronom "el" (o "l\'" davant de vocal): "Jo el vaig donar a la meua germana".',
      tip: 'CD determinat masculí singular = el / l\'. CD indeterminat (un, dos, quantitat) = en.'
    },
    {
      id: 'val-2',
      question: 'Quina d’aquestes paraules porta ACCENT OBERT segons la normativa valenciana?',
      options: ['Café', 'Ciència', 'Cançó', 'També'],
      correctIndex: 1,
      explanation: '"Ciència" porta accent obert (è) perquè la vocal "e" té so obert /ɛ/. En canvi, café, també i cançó porten accent tancat (é, ó).',
      tip: 'A = sempre obert (à). I, U = sempre tancat (í, ú). E, O = obertes (è, ò) o tancades (é, ó) segons la pronunciació.'
    },
    {
      id: 'val-3',
      question: 'Com s’apostrofa correctament l’article masculí davant de la paraula "home"?',
      options: ['El home', 'L\'home', 'L’ome', 'El-home'],
      correctIndex: 1,
      explanation: 'L’article "el" s’apostrofa obligatòriament davant de qualsevol mot que comence per vocal o hac ("l’home", "l’amic", "l’hospital").',
      tip: 'Regla d’or: l’article "el" sempre s’apostrofa davant vocal o hac muda.'
    }
  ],
  ingles: [
    {
      id: 'ing-1',
      question: 'Complete the sentence: "While I ________ my homework, my brother ________ into the room."',
      options: [
        'was doing / came',
        'did / was coming',
        'did / come',
        'was doing / was coming'
      ],
      correctIndex: 0,
      explanation: 'We use the Past Continuous ("was doing") for the longer ongoing action in the background, and the Past Simple ("came") for the sudden interruption.',
      tip: 'Remember: WHILE + Past Continuous (long action) ... WHEN + Past Simple (short interruption)!'
    },
    {
      id: 'ing-2',
      question: 'Choose the correct superlative form: "Mount Everest is the ________ mountain in the world."',
      options: ['highest', 'more high', 'higher', 'most highest'],
      correctIndex: 0,
      explanation: 'For short one-syllable adjectives like "high", we add "-est" to form the superlative: "the highest".',
      tip: 'Short adjective: the + adj + -est (the tallest, the fastest). Long adjective: the most + adj (the most expensive).'
    },
    {
      id: 'ing-3',
      question: 'Which sentence correctly uses the Present Perfect with "yet"?',
      options: [
        'I have yet finished my test.',
        'Have you finished your dinner yet?',
        'She already has eaten yet.',
        'They yet haven’t gone home.'
      ],
      correctIndex: 1,
      explanation: '"Yet" is used at the END of questions and negative sentences in Present Perfect to ask or say if something expected has happened.',
      tip: '"Yet" goes at the very end of sentences: "Haven\'t called yet" or "Has it started yet?".'
    }
  ],
  tecnologia: [
    {
      id: 'tec-1',
      question: 'Según la Ley de Ohm, ¿cuál es la relación entre el voltaje (V), la intensidad (I) y la resistencia (R)?',
      options: ['V = I · R', 'I = V · R', 'R = V · I', 'V = I / R'],
      correctIndex: 0,
      explanation: 'La Ley de Ohm establece que el voltaje o diferencia de potencial es igual a la intensidad que circula multiplicada por la resistencia eléctrica del circuito: V = I · R.',
      tip: 'Mnemotecnia famosa: ¡"Victoria es la Reina de Inglaterra" (V = R · I)!'
    },
    {
      id: 'tec-2',
      question: 'En un circuito con dos bombillas conectadas EN SERIE, ¿qué ocurre si una bombilla se funde?',
      options: [
        'La otra bombilla alumbra el doble de fuerte',
        'El circuito se interrumpe y la otra bombilla se apaga inmediatamente',
        'No pasa nada, la otra sigue funcionando igual',
        'Se produce un cortocircuito peligroso'
      ],
      correctIndex: 1,
      explanation: 'En un circuito en serie solo existe un único camino para la corriente eléctrica. Si se funde un componente, el circuito se abre y deja de circular corriente.',
      tip: 'Serie = una sola fila (si uno falla, todos se apagan). Paralelo = caminos independientes (como las luces de casa).'
    }
  ],
  musica: [
    {
      id: 'mus-1',
      question: '¿Cuántos tiempos dura una figura de REDONDA en un compás de 4/4?',
      options: ['1 tiempo', '2 tiempos', '4 tiempos', '8 tiempos'],
      correctIndex: 2,
      explanation: 'La redonda equivale a 4 tiempos (pulsos). La blanca dura 2 tiempos, la negra 1 tiempo y la corchea 1/2 tiempo.',
      tip: 'Redonda (4) = 2 blancas (2+2) = 4 negras (1+1+1+1).'
    }
  ],
  plastica: [
    {
      id: 'pla-1',
      question: '¿Cuáles son los tres colores PRIMARIOS luz / pigmento tradicionales?',
      options: ['Rojo, Verde y Azul', 'Cyan, Magenta y Amarillo (o Rojo, Amarillo y Azul en arte)', 'Naranja, Verde y Violeta', 'Blanco, Negro y Gris'],
      correctIndex: 1,
      explanation: 'En pintura y artes plásticas tradicionales, los primarios son el Amarillo, Azul (Cyan) y Rojo (Magenta), a partir de los cuales se mezclan los secundarios.',
      tip: 'Mezclas básicas: Amarillo + Azul = Verde; Amarillo + Rojo = Naranja; Azul + Rojo = Violeta.'
    }
  ],
  otro: [
    {
      id: 'otr-1',
      question: '¿Cuál es la clave principal para preparar un examen sin estrés?',
      options: [
        'Dejarlo todo para la noche anterior y no dormir',
        'Planificar temas por días, hacer descansos de 5 minutos y practicar con preguntas reales',
        'Leer el libro entero una vez por encima sin resumir',
        'Aprenderse palabras de memoria sin entender su significado'
      ],
      correctIndex: 1,
      explanation: 'La práctica activa (hacer cuestionarios) y el estudio espaciado en varios días son las técnicas con mayor evidencia científica para fijar el conocimiento a largo plazo.',
      tip: '¡Más vale 30 minutos concentrada cada día que 6 horas agobiada el día de antes!'
    }
  ]
};

export const FALLBACK_FLASHCARDS: Record<SubjectCode, Flashcard[]> = {
  mates: [
    {
      id: 'fc-mat-1',
      category: 'Regla',
      front: 'Regla de los signos al multiplicar y dividir',
      back: '(+) · (+) = +\n(-) · (-) = +\n(+) · (-) = -\n(-) · (+) = -',
      hint: 'Signos iguales dan positivo, signos distintos dan negativo.'
    },
    {
      id: 'fc-mat-2',
      category: 'Fórmula',
      front: 'Teorema de Pitágoras',
      back: 'h² = a² + b²\n(Hipotenusa al cuadrado = cateto² + cateto²)',
      hint: 'Solo para triángulos rectángulos.'
    },
    {
      id: 'fc-mat-3',
      category: 'Ecuaciones',
      front: 'Pasos para resolver una ecuación con paréntesis y denominadores',
      back: '1. Quitar paréntesis multiplicando.\n2. m.c.m. de denominadores.\n3. Trasponer términos (las X a un lado, números al otro).\n4. Reducir y despejar X.',
      hint: '¡Ojo con los signos menos delante de una fracción!'
    },
    {
      id: 'fc-mat-4',
      category: 'Geometría',
      front: 'Área del triángulo y del círculo',
      back: 'Triángulo: A = (base · altura) / 2\nCírculo: A = π · r²',
      hint: 'En el círculo no olvides elevar el radio al cuadrado.'
    }
  ],
  lengua: [
    {
      id: 'fc-len-1',
      category: 'Sintaxis',
      front: '¿Cómo identificar el Sujeto de una oración?',
      back: 'Cambia el número del verbo (de singular a plural o viceversa). La palabra que cambie obligatoriamente por concordancia ¡es el Sujeto!',
      hint: '¡Nunca le preguntes "¿quién?" al verbo, falla en muchas oraciones!'
    },
    {
      id: 'fc-len-2',
      category: 'Sintaxis',
      front: 'Truco definitivo para el Complemento Directo (CD)',
      back: '1. Sustitúyelo por lo, la, los, las.\n2. Pasa la oración a pasiva: el CD se convierte en el Sujeto paciente.',
      hint: 'Solo acompaña a verbos predicativos y transitivos.'
    },
    {
      id: 'fc-len-3',
      category: 'Ortografía',
      front: 'Regla de acentuación de Hiatos con vocal cerrada tónica',
      back: 'Si la fuerza de voz recae sobre la "i" o la "u" al lado de a/e/o, SIEMPRE lleva tilde, aunque sea llana terminada en vocal (ej: río, María, baúl).',
      hint: 'Rompe el diptongo automáticamente.'
    }
  ],
  sociales: [
    {
      id: 'fc-soc-1',
      category: 'Fecha clave',
      front: 'Año 711 d.C.',
      back: 'Invasión musulmana de la península ibérica y Batalla de Guadalete contra los visigodos.',
      hint: 'Comienzo de Al-Ándalus.'
    },
    {
      id: 'fc-soc-2',
      category: 'Definición',
      front: 'Sociedad estamental feudal',
      back: 'Dividida en tres estamentos cerrados: Nobles (luchan), Clero (rezan) y Pueblo llano/campesinos (trabajan y pagan tributos).',
      hint: 'Los dos primeros son privilegiados.'
    },
    {
      id: 'fc-soc-3',
      category: 'Concepto',
      front: 'Homenaje e Investidura',
      back: 'La ceremonia del pacto de vasallaje: en el homenaje el vasallo promete fidelidad; en la investidura el señor le entrega el feudo.',
      hint: 'Vínculo sagrado entre nobles.'
    }
  ],
  fisica_quimica: [
    {
      id: 'fc-fyq-1',
      category: 'Fórmula',
      front: 'Fórmula de la Densidad',
      back: 'd = m / V\n(Densidad = masa en gramos / volumen en cm³ o mililitros)',
      hint: 'Unidades comunes: g/cm³, g/mL o kg/m³.'
    },
    {
      id: 'fc-fyq-2',
      category: 'Átomo',
      front: 'Estructura básica del átomo',
      back: 'Núcleo: Protones (positivos +) y Neutrones (neutros 0).\nCorteza: Electrones (negativos -) en capas.',
      hint: 'Casi toda la masa está concentrada en el núcleo.'
    },
    {
      id: 'fc-fyq-3',
      category: 'Materia',
      front: 'Diferencia entre mezcla homogénea y heterogénea',
      back: 'Homogénea (disolución): No se distinguen sus componentes a simple vista (ej: agua con sal).\nHeterogénea: Sí se distinguen sus fases (ej: agua con aceite, granito).',
      hint: '¿Ves una sola fase o varias?'
    }
  ],
  biologia: [
    {
      id: 'fc-bio-1',
      category: 'Anatomía',
      front: 'Función de las vellosidades intestinales',
      back: 'Aumentar la superficie interna del intestino delgado para absorber los nutrientes hacia los capilares sanguíneos.',
      hint: 'Están en el yeyuno e íleon.'
    },
    {
      id: 'fc-bio-2',
      category: 'Aparato Circulatorio',
      front: 'Diferencia entre arterias y venas',
      back: 'Arterias: Llevan sangre del corazón a los órganos (alta presión, paredes elásticas).\nVenas: Devuelven la sangre al corazón (con válvulas anti-retorno).',
      hint: 'A = Adonde van; V = Vuelven.'
    }
  ],
  valencia: [
    {
      id: 'fc-val-1',
      category: 'Gramàtica',
      front: 'Pronoms febles de 1a i 2a persona',
      back: '1a persona: em / m\' / me / \'m (sing.), ens / nos (plur.)\n2a persona: et / t\' / te / \'t (sing.), vos / us (plur.)',
      hint: 'Canvien de forma segons si van davant o darrere del verb.'
    },
    {
      id: 'fc-val-2',
      category: 'Ortografia',
      front: 'Regla de l’apòstrof de l’article "la"',
      back: 'S’apostrofa davant de paraules femenines que comencen per vocal o hac, EXCEPTE si comença per "i" o "u" àtones (sense accent), o davant prefix a- privatiu.',
      hint: 'Exemple: l\'amiga, l\'illa... però la universitat, la infància.'
    }
  ],
  ingles: [
    {
      id: 'fc-ing-1',
      category: 'Grammar',
      front: 'Past Simple vs Past Continuous rule',
      back: 'Past Continuous (was/were + -ing) = Background action in progress.\nPast Simple (-ed or 2nd column) = Interruption.',
      hint: 'While I was sleeping, the phone rang.'
    },
    {
      id: 'fc-ing-2',
      category: 'Grammar',
      front: 'Present Perfect keywords',
      back: 'JUST = Hace un momento\nALREADY = Ya (afirmativas)\nYET = Todavía no / ¿Ya? (al final de negativas y preguntas)\nEVER = Alguna vez en la vida',
      hint: 'Have you EVER been to London?'
    }
  ],
  tecnologia: [
    {
      id: 'fc-tec-1',
      category: 'Fórmula',
      front: 'Ley de Ohm',
      back: 'V = I · R\nVoltaje (Voltios) = Intensidad (Amperios) · Resistencia (Ohmios)',
      hint: 'Victoria Reina de Inglaterra.'
    }
  ],
  musica: [
    {
      id: 'fc-mus-1',
      category: 'Teoría',
      front: 'Duración de figuras musicales en 4/4',
      back: 'Redonda = 4 tiempos\nBlanca = 2 tiempos\nNegra = 1 tiempo\nCorchea = 1/2 tiempo',
      hint: 'Cada figura dura el doble que la siguiente.'
    }
  ],
  plastica: [
    {
      id: 'fc-pla-1',
      category: 'Teoría del Color',
      front: 'Colores secundarios en pintura',
      back: 'Verde (Amarillo + Azul)\nNaranja (Amarillo + Rojo)\nVioleta (Rojo + Azul)',
      hint: 'Se obtienen mezclando dos primarios a partes iguales.'
    }
  ],
  otro: [
    {
      id: 'fc-otr-1',
      category: 'Técnica de Estudio',
      front: 'El Método Pomodoro para 2º ESO',
      back: '25 minutos de estudio sin móvil ni distracciones + 5 minutos de descanso activo (estirar, beber agua). Tras 4 bloques, descanso largo de 20 min.',
      hint: 'Evita la fatiga mental y mejora la retención.'
    }
  ]
};
