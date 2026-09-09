/* ==========================================================================
   DE BRANCA A PRETA — FONTE UNICA DE DADOS
   Todo o conteudo abaixo foi extraido fielmente dos dois documentos-fonte:
   1) "De Branca a Preta" (narrativa, capitulos por faixa, tabela-mestra)
   2) "Checkup tecnico" (checklist estruturado por faixa)
   Nenhuma tecnica, criterio ou conceito externo foi adicionado.
   ========================================================================== */

const appData = {

  levels: [
    { id: 1, key: "nao-sei", label: "Nao sei", desc: "Nao reconheco ou nao consigo executar." },
    { id: 2, key: "sei",     label: "Sei",     desc: "Consigo demonstrar de forma cooperativa." },
    { id: 3, key: "faco",    label: "Faco",    desc: "Consigo aplicar no treino." },
    { id: 4, key: "resistencia", label: "Faco contra resistencia", desc: "Consigo aplicar quando o parceiro sabe o que estou tentando fazer e reage." }
  ],

  beltOrder: ["branca", "azul", "roxa", "marrom", "preta"],

  radarGroups: [
    "Movimentacao/defesa", "Quedas/em pe", "Guarda", "Raspagens",
    "Escapes/recuperacao", "Passagem", "Controle", "Finalizacoes"
  ],

  belts: {

    branca: {
      code: "branca",
      name: "Branca",
      colorHex: "#f4f4f2",
      epigraph: "O aprendizado da sobrevivencia",
      centralQuestion: "Como nao perder?",
      theme: "Sobrevivencia e fundamentos",
      whatChanges: "tecnicas simples, posicoes fundamentais, escapes e ataques basicos",
      intro: "Toda faixa branca atravessa uma fase de frustracao e humildade, marcada pela busca constante pela sobrevivencia. O foco nao e finalizar ou vencer lutas — e aprender a se defender, evitar a derrota e entender que bater nao e vergonha, e sim um feedback valioso para reconhecer erros, proteger o corpo e quebrar o ego.",
      modules: [
        { label: "Fundamentos transversais", desc: "Respiracao e ritmo; sensibilidade; gestao de riscos; controle de distancia; base; postura; centro de gravidade; deslocamento tecnico; angulo; mobilidade de quadril; distribuicao de peso; alavanca; isolamento e nocoes basicas de tempo." },
        { label: "Movimentacao corporal", desc: "Fuga de quadril, ponte, levantar tecnico, rolamentos, criacao de espaco e recuperacao da base." },
        { label: "Quedas e jogo em pe", desc: "Base, postura, protecao da cabeca, distancia, quedas de seguranca, levantar tecnico e nocoes de queda de uma e duas pernas." },
        { label: "Guarda", desc: "Guarda fechada: postura, quebra de postura e controles; guarda aberta: esquadros, ganchos e distancia; meia-guarda: posicoes por baixo/acima, controle por baixo do braco e uma reversao basica." },
        { label: "Escapes", desc: "Montada: fuga por ponte e fuga cotovelo-joelho; controle lateral: esquadros, fuga de quadril e recuperacao da guarda; costas: defesa do estrangulamento e retirada dos ganchos; quatro apoios: protecao das costas, recuperacao da guarda ou levantar." },
        { label: "Passagem de guarda", desc: "Dominar de 2 a 3 mecanismos basicos de passagem e impedir a recomposicao da guarda." },
        { label: "Finalizacoes", desc: "Chave de braco, triangulo, kimura, americana, mata-leao e guilhotina." }
      ],
      maturityLeap: "\"Eu reajo desesperadamente\" vira \"eu reconheco a posicao e aplico uma resposta.\"",
      promotionCriteria: "Constancia de treino, reducao de reacoes por forca bruta, primeiras defesas automaticas e o inicio de ataques conectados (raspagem, passagem, controle) — nao a quantidade de finalizacoes aplicadas.",
      checklistIntro: "O salto: de sobreviver desesperadamente para reconhecer posicoes e aplicar respostas simples.",
      categories: [
        { name: "Movimentacao e defesa corporal", radarGroup: "Movimentacao/defesa", items: [
          "Fuga de quadril (shrimp) com criacao de espaco",
          "Ponte (upa) e ponte com direcao",
          "Levantar tecnico mantendo protecao",
          "Rolamento para frente e para tras com seguranca",
          "Queda de seguranca e recuperacao da base",
          "Movimentacao lateral e mudanca de base"
        ]},
        { name: "Quedas e jogo em pe", radarGroup: "Quedas/em pe", items: [
          "Postura e base para luta de pegada",
          "Single leg basico",
          "Double leg basico",
          "Defesa inicial de single/double leg",
          "Sprawl basico"
        ]},
        { name: "Posicoes e controle", radarGroup: "Controle", items: [
          "Controle lateral: estabilizacao basica",
          "Montada: manutencao e ajuste de base",
          "Controle das costas e retencao dos ganchos",
          "Joelho na barriga: entrada e manutencao",
          "Quatro apoios: protecao das costas"
        ]},
        { name: "Guarda", radarGroup: "Guarda", items: [
          "Guarda fechada: postura e controle",
          "Quebra de postura na guarda fechada",
          "Guarda fechada: controle de bracos e distancia",
          "Guarda aberta basica com ganchos e frames",
          "Meia-guarda basica: underhook e protecao"
        ]},
        { name: "Raspagens", radarGroup: "Raspagens", items: [
          "Raspagem basica da guarda fechada",
          "Raspagem basica da meia-guarda (knee tap/underhook)",
          "Raspagem basica a partir da guarda aberta"
        ]},
        { name: "Escapes e recuperacao", radarGroup: "Escapes/recuperacao", items: [
          "Escape da montada por ponte e rolamento",
          "Escape da montada por cotovelo-joelho",
          "Escape do controle lateral com frame e fuga de quadril",
          "Recuperacao da guarda a partir do controle lateral",
          "Escape das costas: esconder o pescoco e retirar ganchos",
          "Defesa de estrangulamentos basicos"
        ]},
        { name: "Passagem e controle", radarGroup: "Passagem", items: [
          "Passagem de guarda fechada: abertura e estabilizacao",
          "Passagem de guarda aberta por controle das pernas",
          "Passagem de meia-guarda basica",
          "Controle lateral apos a passagem",
          "Transicao controle lateral - montada",
          "Transicao montada - costas"
        ]},
        { name: "Finalizacoes", radarGroup: "Finalizacoes", items: [
          "Chave de braco da montada",
          "Chave de braco da guarda",
          "Triangulo da guarda",
          "Americana do controle lateral",
          "Kimura do controle lateral/guarda",
          "Mata-leao das costas",
          "Guilhotina frontal basica"
        ]}
      ]
    },

    azul: {
      code: "azul",
      name: "Azul",
      colorHex: "#2f6fed",
      epigraph: "A construcao de uma identidade",
      centralQuestion: "Como escapar e vencer posicoes?",
      theme: "Competencia funcional",
      whatChanges: "maior repertorio, variacoes, retencao, passagem e primeiras cadeias",
      intro: "Superada a fase exaustiva da faixa branca, a azul representa o primeiro grande marco da trajetoria. Os fundamentos comecam a ficar naturais e automaticos, e o lutador passa a construir sua propria identidade. E tambem o fim da fase de novidade — o progresso desacelera, a rotina se intensifica, e e aqui que muitos praticantes desistem. Superar essa fase exige consistencia e o inicio da responsabilidade de guiar os novos faixas-brancas.",
      modules: [
        { label: "Guarda — combinacoes e sistemas", desc: "Integra guardas aberta, fechada e meia-guarda em cadeias de ataque e raspagem." },
        { label: "Passagem — sistema de passagem", desc: "Conecta diferentes passes conforme a reacao, em vez de executar tecnicas isoladas." },
        { label: "Controle e transicoes — encadeamento posicional", desc: "Conecta controle lateral, montada e costas mantendo a vantagem." },
        { label: "Finalizacoes e defesas — ataques em cadeia", desc: "Passa a construir finalizacoes e responder as defesas, em vez de depender de oportunidades entregues." },
        { label: "Chaves de perna — introducao ao jogo de pernas", desc: "Chave de tornozelo reta e emaranhamentos basicos." },
        { label: "Quedas — confiabilidade", desc: "Desenvolve um pequeno repertorio de quedas utilizavel com resistencia." },
        { label: "Tatica — hierarquia posicional", desc: "Passa a pensar em posicao, controle, finalizacao, e nao em uma tecnica isolada." },
        { label: "Nivel de dominio", desc: "Os fundamentos da branca tornam-se funcionais: o diferencial da azul e conseguir aplica-los contra resistencia e integra-los em um jogo coerente." }
      ],
      maturityLeap: "De \"conhecer tecnicas\" para \"fazer Jiu-Jitsu contra alguem que esta de fato resistindo\". A partir da faixa azul o lutador deve ser capaz de finalizar alguem sem nenhum treinamento e do mesmo porte com relativa facilidade.",
      promotionCriteria: "Consistencia em sparring contra parceiros variados, dominio tecnico das posicoes fundamentais e a capacidade de conduzir a luta — nao apenas reagir a ela.",
      checklistIntro: "O salto: de conhecer tecnicas para aplica-las contra resistencia e comecar a construir um jogo funcional.",
      categories: [
        { name: "Quedas e entradas", radarGroup: "Quedas/em pe", items: [
          "Single leg com finalizacoes de posicao e recuperacao",
          "Double leg com mudanca de direcao",
          "Ankle pick",
          "Snapdown para front headlock",
          "Varrida com a perna (foot sweep) com controle de pegada",
          "Combinacao de duas entradas de queda"
        ]},
        { name: "Guardas", radarGroup: "Guarda", items: [
          "Butterfly guard: postura, ganchos e underhook",
          "Collar-sleeve guard como guarda aberta inicial",
          "Spider guard",
          "Lasso guard",
          "Transicao guarda fechada - aberta",
          "Transicao meia-guarda - guarda aberta"
        ]},
        { name: "Raspagens", radarGroup: "Raspagens", items: [
          "Raspagem de butterfly",
          "Tripod sweep",
          "Sit-up sweep",
          "Flower sweep",
          "Raspagem de meia-guarda com underhook",
          "Raspagem em resposta a reacao do adversario"
        ]},
        { name: "Retencao e escapes", radarGroup: "Escapes/recuperacao", items: [
          "Retencao de guarda contra tentativa de passagem",
          "Recuperacao de guarda com frames e conexao das pernas",
          "Escape avancado da montada",
          "Escape avancado das costas",
          "Defesa e contra-ataque a tentativas de passagem"
        ]},
        { name: "Passagem", radarGroup: "Passagem", items: [
          "Toreando pass",
          "Knee cut",
          "Leg drag",
          "Over-under pass",
          "Smash pass",
          "Passagem de meia-guarda com crossface/underhook",
          "Combinacao de dois passes conforme a reacao"
        ]},
        { name: "Controle e transicoes", radarGroup: "Controle", items: [
          "North-south",
          "Variacoes de controle lateral",
          "Variacoes de controle da montada",
          "Transicao lateral - norte-sul - lateral",
          "Transicao montada - costas sob resistencia"
        ]},
        { name: "Finalizacoes e leg locks permitidos", radarGroup: "Finalizacoes", items: [
          "Arm triangle",
          "Bow-and-arrow choke",
          "Ezequiel",
          "Guilhotina: variacoes a partir de front headlock",
          "Chave de tornozelo reta",
          "Defesa da chave de tornozelo reta"
        ]}
      ]
    },

    roxa: {
      code: "roxa",
      name: "Roxa",
      colorHex: "#7b3fe4",
      epigraph: "O jogo como um sistema fluido",
      centralQuestion: "Como conectar minhas tecnicas?",
      theme: "Sistema e estrategia",
      whatChanges: "especializacao de guarda, cadeias de ataque, transicoes e leitura de reacao",
      intro: "Frequentemente citada como a faixa mais divertida, a roxa e quando a arte passa a fluir de forma mais artistica. O praticante deixa de ver tecnicas como truques isolados e passa a enxergar um sistema interconectado de ataques e transicoes. Em vez de apenas reagir, o faixa-roxa dita o ritmo da luta e se torna um solucionador de problemas no tatame — e comeca a ensinar, o que o obriga a entender a propria arte de forma mais profunda.",
      modules: [
        { label: "Guarda — especializacao com mobilidade", desc: "Desenvolve uma guarda principal e aprende a migrar entre diferentes guardas conforme a situacao." },
        { label: "Retencao — sistema defensivo", desc: "Utiliza esquadros, posicao interna, movimentacao das pernas e recuperacao da guarda de forma integrada." },
        { label: "Passagem — integracao", desc: "Conecta pressao, distancia, peso e quebra de postura em sequencias de passagem conforme a reacao do adversario." },
        { label: "Controle e transicoes — rede de posicoes", desc: "Conecta posicoes, mantendo rotas de recuperacao e contra-ataque quando perde uma posicao." },
        { label: "Finalizacoes — cadeias de submissao", desc: "Utiliza uma finalizacao para provocar a defesa que abre outra." },
        { label: "Chaves de perna — ampliacao do repertorio", desc: "Incorpora ataques de perna, como chave de tornozelo reta e chave de joelho, conforme as regras." },
        { label: "Quedas e contra-ataques — cadeias", desc: "Combina entradas, desequilibrios e contra-ataques em vez de depender de quedas isoladas." },
        { label: "Estrategia — leitura de jogo", desc: "Usa desequilibrio, leitura do adversario e estrategia de competicao para provocar reacoes favoraveis." },
        { label: "Ensino — transmissao", desc: "Comeca a auxiliar faixas brancas e azuis e a explicar tecnicas como forma de aprofundar o proprio entendimento." }
      ],
      maturityLeap: "De \"tecnica individual\" para \"sequencia baseada na reacao do adversario\" — o salto mais importante de toda a jornada. O faixa roxa deve ser capaz de dar aula como instrutor ajudante ou mesmo conduzir uma aula so.",
      promotionCriteria: "Consistencia de sparring, entendimento posicional profundo e capacidade de aplicar o proprio jogo contra estilos bem diferentes do seu.",
      checklistIntro: "O salto: de tecnica individual para sequencia baseada na reacao do adversario.",
      categories: [
        { name: "Quedas, entradas e scrambles", radarGroup: "Quedas/em pe", items: [
          "Snapdown - front headlock - ataque",
          "Single leg - passagem ou controle",
          "Ankle pick em combinacao com snapdown",
          "Entrada de queda em resposta a postura do adversario",
          "Scramble: levantar, recuperar guarda ou atacar as costas"
        ]},
        { name: "Guardas e retencao", radarGroup: "Guarda", items: [
          "De La Riva guard",
          "X-guard",
          "Single-leg X",
          "Seated guard",
          "Lapel guard / Worm guard",
          "Transicao entre seated - DLR - X/SLX",
          "Sistema de retencao com frames, inside position e mobilidade",
          "Defesa especifica de berimbolo"
        ]},
        { name: "Raspagens e entradas", radarGroup: "Raspagens", items: [
          "Wrestle-up a partir da guarda",
          "Raspagem da X-guard",
          "Raspagem da single-leg X",
          "Raspagem de butterfly com leitura da reacao",
          "Back take a partir da guarda",
          "Raspagem - passagem - controle como sequencia"
        ]},
        { name: "Passagem em sistema", radarGroup: "Passagem", items: [
          "Body-lock pass",
          "Headquarters pass",
          "Passagem em cadeia conforme a reacao",
          "Passagem contra DLR/X/SLX",
          "Transicao entre diferentes sistemas de passagem",
          "Recuperacao do controle quando o adversario recompoe a guarda"
        ]},
        { name: "Controle e transicoes", radarGroup: "Controle", items: [
          "Front headlock como posicao de ataque e controle",
          "Controle lateral - montada - costas",
          "Montada - costas em reacao a fuga",
          "Back control com manutencao dos ganchos e seatbelt",
          "Transicao para ataque sem perder posicao"
        ]},
        { name: "Finalizacoes em cadeia", radarGroup: "Finalizacoes", items: [
          "Wrist locks como finalizacao",
          "Anaconda choke",
          "D'Arce choke",
          "Kimura trap",
          "Kimura - armbar",
          "Kimura - costas",
          "Armbar - triangulo",
          "Triangulo - armbar",
          "Ataque em cadeia as costas",
          "Defesa de finalizacao - contra-ataque"
        ]}
      ]
    },

    marrom: {
      code: "marrom",
      name: "Marrom",
      colorHex: "#7a4a2b",
      epigraph: "O refinamento de cada detalhe",
      centralQuestion: "Como tornar meu jogo eficiente?",
      theme: "Pressao, timing e refinamento",
      whatChanges: "eficiencia, pressao, timing, sistemas avancados e especializacao pessoal",
      intro: "Normalmente alcancada apos quase uma decada de treino, a faixa marrom nao e sobre aprender tecnicas novas — e sobre polir ao extremo o que ja foi aprendido. Cada pegada, angulo e transicao e ajustado milimetricamente. O faixa-marrom encara e corrige as falhas remanescentes do proprio jogo, tornando defesa e ataque o mais eficientes possiveis, e assume papeis claros de lideranca na academia.",
      modules: [
        { label: "Respiracao e ritmo — dominio", desc: "Controla conscientemente o ritmo, acelerando ou desacelerando sem perder eficiencia." },
        { label: "Sensibilidade — alta precisao", desc: "Percebe microajustes de peso, tensao e direcao, antecipando respostas." },
        { label: "Gestao de riscos — estrategica", desc: "Calcula risco e recompensa e cria situacoes em que o adversario precisa assumir riscos." },
        { label: "Controle de distancia — imposicao", desc: "Determina a distancia e reduz as opcoes do adversario." },
        { label: "Base e centro de gravidade — manipulacao", desc: "Mantem estabilidade durante ataques e desloca o peso do adversario com minima forca." },
        { label: "Deslocamento e angulo — economia e precisao", desc: "Cada movimento tem proposito; microangulos bloqueiam escapes e criam oportunidades." },
        { label: "Mobilidade de quadril — integracao", desc: "O quadril participa de todo o jogo, gerando mobilidade e controle." },
        { label: "Distribuicao de peso — pressao refinada", desc: "Usa o peso intensamente sem perder mobilidade." },
        { label: "Guarda — especializacao", desc: "Possui posicoes preferidas e sistemas eficientes — seu \"jogo de pao e manteiga\"." },
        { label: "Passagem — alta eficiencia", desc: "Combina passagem avancada, armadilhas de submissao e contra-ataques, controlando as opcoes de recuperacao." },
        { label: "Controle e transicoes — fluidez", desc: "Transita com minimo espaco para reacao; a proxima posicao comeca antes de a anterior terminar." },
        { label: "Finalizacoes — precisao", desc: "Integra alavanca, isolamento, tempo e angulo para reduzir progressivamente as opcoes de defesa." },
        { label: "Chaves de perna — sistemas avancados", desc: "Domina sistemas de chave de perna e, quando permitido, chave de calcanhar." },
        { label: "Estrategia — produzir erros", desc: "Deixa de apenas reagir e passa a criar deliberadamente situacoes que induzem erros." },
        { label: "Ensino e mentoria — referencia", desc: "Pratica ensino e mentoria de forma constante, com etica e comportamento exemplar." },
        { label: "Lacunas do jogo — correcao sistematica", desc: "Identifica e elimina as ultimas deficiencias do proprio jogo." }
      ],
      maturityLeap: "De \"conhecer muitas tecnicas\" para \"ter poucas solucoes extremamente eficientes\" — e saber ensina-las em profundidade, isto e, explicar como funcionam e por que funcionam, demonstrando variacoes e adaptacoes.",
      promotionCriteria: "Dominio tecnico quase completo do sistema, maturidade competitiva e comportamento de lideranca — avaliados continuamente pelo professor, nao por um teste unico.",
      checklistIntro: "O salto: de conhecer muitas solucoes para possuir poucas solucoes extremamente eficientes, especializadas e ensinaveis.",
      categories: [
        { name: "Quedas e entradas", radarGroup: "Quedas/em pe", items: [
          "Ouchi gari",
          "Osoto gari",
          "Combinacao ouchi - osoto e reacoes",
          "Entrada de queda - controle imediato",
          "Queda em resposta a tentativa de queda do adversario",
          "Queda - passagem ou ataque no scramble"
        ]},
        { name: "Guarda e especializacao", radarGroup: "Guarda", items: [
          "Half guard avancada",
          "Deep half guard",
          "Knee shield avancado",
          "Transicao half - wrestle-up",
          "Transicao half - back take",
          "Sistema pessoal de guarda com entradas, retencao e saidas"
        ]},
        { name: "Raspagens e ataques a partir da guarda", radarGroup: "Raspagens", items: [
          "Raspagem encadeada da meia-guarda",
          "Raspagem com segunda e terceira resposta a defesa",
          "Entrada de leg entanglement a partir de posicoes permitidas",
          "Raspagem - leg attack ou back take conforme a reacao",
          "Controle do scramble apos a raspagem"
        ]},
        { name: "Passagem avancada", radarGroup: "Passagem", items: [
          "Body-lock pass avancado",
          "Leg drag avancado",
          "Smash pass avancado",
          "Stack pass",
          "Passagem contra guardas de alta mobilidade",
          "Transicao entre sistemas de passagem sem perder pressao",
          "Passagem - controle - ataque como sistema"
        ]},
        { name: "Controle, pressao e transicoes", radarGroup: "Controle", items: [
          "Mount - side control sem perder pressao",
          "Side control - armbar",
          "Mount - costas",
          "Controle de costas com ajustes minimos",
          "Transicao de posicao antes da recuperacao do adversario",
          "Pressao e distribuicao de peso com economia de movimento"
        ]},
        { name: "Finalizacoes e sistemas", radarGroup: "Finalizacoes", items: [
          "Guilhotina - D'Arce/Anaconda - costas - montada",
          "Sistema avancado de ataques as costas",
          "Sistema avancado de kimura",
          "Sistema avancado de front headlock",
          "Armbar e triangulo em cadeia com multiplas respostas",
          "Chave de tornozelo reta com variacoes e contra-ataques",
          "Knee bar — conforme divisao permitida",
          "Toe hold — conforme divisao permitida",
          "Calf slice — conforme divisao permitida",
          "Leg entanglements avancados — conforme divisao permitida",
          "Heel hook — conforme divisao permitida (adulto marrom/preta No-Gi)",
          "Knee reaping — somente onde a regra IBJJF da divisao permitir (adulto marrom/preta No-Gi)"
        ]}
      ]
    },

    preta: {
      code: "preta",
      name: "Preta",
      colorHex: "#1a1a1a",
      epigraph: "O inicio de uma nova jornada",
      centralQuestion: "Como resolver qualquer problema?",
      theme: "Principios, adaptacao e dominio",
      whatChanges: "nao e mais um checklist de golpes; e integracao, adaptacao e dominio",
      intro: "Embora seja o grande sonho de todo iniciante, a faixa preta nao e o fim da linha — e um novo ponto de partida. Depois de mais de dez anos de dedicacao, o faixa-preta tem um entendimento profundo e instintivo de tempo, estrategia, movimento e transicoes. Mais do que vencer lutas, o foco se desloca para a lideranca, a mentoria e a transmissao dos valores de respeito e disciplina as novas geracoes. E uma fase de grande humildade, em que o mestre percebe que o aprendizado da arte e infinito.",
      notAChecklistNote: "A faixa preta nao deve ser reduzida a uma lista adicional de golpes.",
      knowledgePrinciples: [
        "Principios de controle, alavanca, base e pressao",
        "Frames, inside position, timing, kuzushi e distancia",
        "Conexao entre posicoes, transicoes e leitura da reacao humana"
      ],
      realCriteria: [
        "Resolver problemas de Jiu-Jitsu que nunca viu exatamente daquela forma",
        "Adaptar o jogo contra qualquer estilo de oponente",
        "Pedagogia: corrigir, estruturar aula e formar novos praticantes",
        "Resolve situacoes novas usando principios, nao repertorio decorado",
        "Adapta-se a qualquer estilo de oponente com fluidez",
        "Consegue corrigir e estruturar o aprendizado de outros alunos",
        "Consolidou e integrou todo o sistema tecnico das faixas anteriores"
      ],
      maturityLeap: "De \"acumular tecnicas\" para \"aplicar principios para resolver problemas nunca vistos antes\" — o criterio mais importante que separa conhecimento tecnico de expertise real.",
      exitCriteria: [
        "Resolver uma situacao que nao foi treinada exatamente daquela forma.",
        "Adaptar o jogo contra estilos e corpos diferentes.",
        "Criar solucoes a partir dos principios, em vez de depender de sequencias decoradas.",
        "Ensinar e corrigir com precisao, explicando nao apenas como fazer, mas por que funciona.",
        "Ter um sistema pessoal coerente de ataque, defesa, passagem, guarda e transicoes."
      ]
    }
  },

  masterTable: [
    { axis: "Percepcao & autorregulacao", rows: [
      { theme: "Respiracao & ritmo", values: ["Controlar", "Regular", "Manipular", "Dominar", "Adaptar"] },
      { theme: "Sensibilidade", values: ["Perceber", "Responder", "Antecipar", "Prever", "Intuir"] },
      { theme: "Gestao de riscos", values: ["Evitar perigos", "Escolher", "Calcular", "Induzir riscos", "Gerir estrategicamente"] }
    ]},
    { axis: "Espaco & estrutura", rows: [
      { theme: "Distancia", values: ["Proteger", "Controlar", "Manipular", "Impor", "Adaptar"] },
      { theme: "Base", values: ["Manter", "Estabilizar", "Desequilibrar", "Manipular", "Controlar as duas bases"] },
      { theme: "Postura", values: ["Preservar", "Quebrar", "Explorar", "Desmontar", "Governar a estrutura"] },
      { theme: "Centro de gravidade", values: ["Reconhecer", "Usar", "Deslocar", "Manipular", "Dominar"] }
    ]},
    { axis: "Movimento & mecanica", rows: [
      { theme: "Deslocamento", values: ["Executar", "Utilizar", "Conectar", "Economizar", "Adaptar"] },
      { theme: "Angulo", values: ["Reconhecer", "Buscar", "Criar", "Refinar", "Manipular"] },
      { theme: "Mobilidade do quadril", values: ["Escapar", "Recuperar", "Atacar", "Integrar", "Dominar"] },
      { theme: "Distribuicao de peso", values: ["Posicionar", "Controlar", "Alternar", "Otimizar", "Manipular"] }
    ]},
    { axis: "Mecanica ofensiva", rows: [
      { theme: "Alavanca", values: ["Entender", "Aplicar", "Combinar", "Otimizar", "Criar"] },
      { theme: "Isolamento", values: ["Reconhecer", "Executar", "Encadear", "Antecipar", "Manipular"] },
      { theme: "Timing", values: ["Reagir", "Escolher o momento", "Antecipar", "Explorar o instante", "Determinar o momento"] }
    ]},
    { axis: "Controle", rows: [
      { theme: "Pressao", values: ["Aplicar", "Manter", "Alternar", "Otimizar", "Manipular"] },
      { theme: "Integracao", values: ["Tecnicas isoladas", "Combinacoes", "Sistemas", "Especializacao", "Adaptacao"] }
    ]},
    { axis: "Estrategia & identidade", rows: [
      { theme: "Estrategia", values: ["Sobreviver", "Vencer posicoes", "Construir o jogo", "Impor o jogo", "Resolver o problema"] },
      { theme: "Autonomia", values: ["Seguir instrucoes", "Aplicar o aprendido", "Construir solucoes", "Refinar solucoes", "Criar solucoes"] }
    ]}
  ],

  masterTableNote: "Essa evolucao descreve capacidades — o que voce consegue fazer — e nao uma lista fechada de golpes por faixa. Um faixa-azul nao vira faixa-roxa por saber mais tecnicas, mas por conseguir conectar as que ja sabe em sequencias fluidas contra resistencia real. Essa e a diferenca entre curriculo de tecnicas e competencia de faixa.",

  readingRule: "O objetivo nao e obter 100% de \"Faco contra resistencia\" em todas as tecnicas. O indicador mais importante e a distribuicao: fundamentos essenciais devem chegar a \"Faco contra resistencia\"; tecnicas de especializacao podem permanecer em \"Sei\" ou \"Faco\" enquanto o atleta decide se fazem parte do proprio jogo.",

  disclaimer: "Este checkup e uma ferramenta de autoavaliacao baseada no conteudo do e-book \"De Branca a Preta\" e nao constitui criterio oficial de graduacao. A definicao de faixa e sempre uma decisao do seu professor."
};
