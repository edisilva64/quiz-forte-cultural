/* ===================================================================
   quiz.js — Banco de dados do quiz (perguntas, gabarito, níveis)
   Namespace global: window.QuizData
   =================================================================== */

(function () {
  "use strict";

  /**
   * Cada pergunta tem:
   *  id, question, options[4], correctIndex, explanation
   *
   * Este array funciona como FALLBACK local: é usado somente quando o
   * banco de dados (Supabase) não está configurado ou está indisponível,
   * para o quiz nunca ficar quebrado. Quando o banco está configurado,
   * as perguntas vêm da tabela `questions` (ver js/db.js e supabase/schema.sql).
   *
   * A cada partida, 15 perguntas são sorteadas aleatoriamente deste pool
   * de 30 (ver QuizData.pickRandom).
   */
  const FALLBACK_QUESTIONS = [
    {
      id: 1,
      question: "Complete a sequência lógica: 2, 6, 12, 20, 30, ?",
      options: ["36", "40", "42", "38"],
      correctIndex: 2,
      explanation: "A diferença entre os termos cresce de 2 em 2 (4, 6, 8, 10, 12), então 30 + 12 = 42."
    },
    {
      id: 2,
      question: "Qual número não pertence ao grupo: 3, 5, 7, 10, 11?",
      options: ["3", "7", "10", "11"],
      correctIndex: 2,
      explanation: "Todos os outros números são ímpares; o 10 é o único número par do grupo."
    },
    {
      id: 3,
      question: "Charada: quanto mais eu seco, mais molhado fico. O que sou?",
      options: ["Uma esponja", "Uma toalha", "Um guarda-chuva", "Um espelho"],
      correctIndex: 1,
      explanation: "A toalha é usada para secar algo, mas no processo ela mesma fica molhada."
    },
    {
      id: 4,
      question: "Se hoje é quarta-feira, que dia da semana será daqui a 100 dias?",
      options: ["Segunda-feira", "Sexta-feira", "Quinta-feira", "Sábado"],
      correctIndex: 1,
      explanation: "100 dividido por 7 deixa resto 2, então avançamos 2 dias a partir de quarta: quinta, sexta."
    },
    {
      id: 5,
      question: "Qual é a próxima letra da sequência: A, D, G, J, ?",
      options: ["K", "L", "M", "N"],
      correctIndex: 2,
      explanation: "A sequência pula sempre 2 letras (A→D→G→J→M), avançando de 3 em 3 posições no alfabeto."
    },
    {
      id: 6,
      question: "Charada: tenho cidades, mas nenhuma casa; tenho montanhas, mas nenhuma árvore; tenho água, mas nenhum peixe. O que sou?",
      options: ["Um globo", "Um mapa", "Um livro", "Uma foto"],
      correctIndex: 1,
      explanation: "Um mapa representa cidades, montanhas e rios sem conter os elementos reais."
    },
    {
      id: 7,
      question: "Se um relógio leva 5 segundos para bater 6 badaladas, quanto tempo leva para bater 12 badaladas?",
      options: ["10 segundos", "11 segundos", "12 segundos", "6 segundos"],
      correctIndex: 1,
      explanation: "Entre 6 badaladas há 5 intervalos (1s cada). Para 12 badaladas há 11 intervalos, ou seja, 11 segundos."
    },
    {
      id: 8,
      question: "Qual figura completa a sequência: círculo, quadrado, triângulo, círculo, quadrado, ?",
      options: ["Círculo", "Triângulo", "Quadrado", "Pentágono"],
      correctIndex: 1,
      explanation: "O padrão se repete a cada 3 posições: círculo, quadrado, triângulo — o próximo é triângulo."
    },
    {
      id: 9,
      question: "Charada: quanto mais você tira de mim, maior eu fico. O que sou?",
      options: ["Um buraco", "Uma dívida", "Um problema", "Uma sombra"],
      correctIndex: 0,
      explanation: "Ao retirar terra de um buraco, ele aumenta de tamanho."
    },
    {
      id: 10,
      question: "Ana é mais velha que Bruno. Bruno é mais velho que Carla. Quem é o mais novo dos três?",
      options: ["Ana", "Bruno", "Carla", "Não é possível saber"],
      correctIndex: 2,
      explanation: "Se Ana > Bruno > Carla em idade, Carla é necessariamente a mais nova."
    },
    {
      id: 11,
      question: "Qual é o próximo número da sequência de Fibonacci: 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "12", "13", "10"],
      correctIndex: 2,
      explanation: "Cada número é a soma dos dois anteriores: 5 + 8 = 13."
    },
    {
      id: 12,
      question: "Charada: eu tenho chaves, mas não abro portas. Tenho espaço, mas não tenho quarto. Você pode entrar, mas não pode sair. O que sou?",
      options: ["Um piano", "Um teclado de computador", "Uma casa", "Um cofre"],
      correctIndex: 1,
      explanation: "Um teclado tem 'teclas' (chaves), 'barra de espaço' e você pode digitar 'enter' (entrar), mas não 'sair' como tecla padrão."
    },
    {
      id: 13,
      question: "Se todos os Bips são Bops, e todos os Bops são Baps, então:",
      options: [
        "Todos os Baps são Bips",
        "Todos os Bips são Baps",
        "Nenhum Bip é Bap",
        "Alguns Baps não são Bops"
      ],
      correctIndex: 1,
      explanation: "Por transitividade lógica: se Bip ⊂ Bop e Bop ⊂ Bap, então Bip ⊂ Bap."
    },
    {
      id: 14,
      question: "Qual planeta do sistema solar é conhecido como o 'Planeta Vermelho'?",
      options: ["Vênus", "Júpiter", "Marte", "Saturno"],
      correctIndex: 2,
      explanation: "Marte tem coloração avermelhada devido ao óxido de ferro presente em sua superfície."
    },
    {
      id: 15,
      question: "Um trem parte às 14h e viaja a 80 km/h. Outro trem parte da mesma cidade às 15h no mesmo sentido, a 100 km/h. A que horas o segundo trem alcança o primeiro?",
      options: ["18h", "19h", "20h", "17h"],
      correctIndex: 1,
      explanation: "Às 15h o primeiro já percorreu 80 km. A diferença de velocidade é 20 km/h, então leva 4h para alcançar: 15h + 4h = 19h."
    },
    {
      id: 16,
      question: "Complete a sequência: 1, 4, 9, 16, 25, ?",
      options: ["30", "36", "32", "49"],
      correctIndex: 1,
      explanation: "São os quadrados perfeitos (1², 2², 3², 4², 5²...). O próximo é 6² = 36."
    },
    {
      id: 17,
      question: "Charada: não tenho vida, mas posso morrer. O que sou?",
      options: ["Uma pilha", "Uma planta", "Um robô", "Uma estrela"],
      correctIndex: 0,
      explanation: "Uma pilha nunca esteve viva, mas dizemos que ela 'morre' quando descarrega."
    },
    {
      id: 18,
      question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quanto tempo levam 100 máquinas para fazer 100 produtos?",
      options: ["100 minutos", "20 minutos", "5 minutos", "50 minutos"],
      correctIndex: 2,
      explanation: "Cada máquina faz 1 produto em 5 minutos. Com 100 máquinas trabalhando em paralelo, ainda leva 5 minutos para produzir 100 produtos."
    },
    {
      id: 19,
      question: "Complete a sequência: 3, 9, 27, 81, ?",
      options: ["162", "243", "324", "729"],
      correctIndex: 1,
      explanation: "Cada termo é o anterior multiplicado por 3 (potências de 3). 81 × 3 = 243."
    },
    {
      id: 20,
      question: "Charada: quanto mais eu cresço, menos você vê. O que sou?",
      options: ["A escuridão", "A neblina", "A fumaça", "A distância"],
      correctIndex: 0,
      explanation: "Quanto mais a escuridão aumenta, menos enxergamos ao redor."
    },
    {
      id: 21,
      question: "Qual é o maior oceano do mundo?",
      options: ["Atlântico", "Índico", "Ártico", "Pacífico"],
      correctIndex: 3,
      explanation: "O Oceano Pacífico é o maior e mais profundo oceano da Terra, cobrindo cerca de um terço da superfície do planeta."
    },
    {
      id: 22,
      question: "Um pai tem 5 filhas. Cada filha tem exatamente 1 irmão. Quantos filhos o pai tem ao todo?",
      options: ["5", "6", "10", "11"],
      correctIndex: 1,
      explanation: "As 5 filhas compartilham o mesmo único irmão. Logo, são 5 filhas + 1 filho = 6 filhos no total."
    },
    {
      id: 23,
      question: "Complete a sequência de letras: Z, X, V, T, ?",
      options: ["S", "R", "Q", "U"],
      correctIndex: 1,
      explanation: "A sequência anda de trás para frente pulando uma letra a cada passo (Z, X, V, T, R)."
    },
    {
      id: 24,
      question: "Charada: tenho um rosto, mas não tenho olhos; tenho mãos, mas não tenho dedos. O que sou?",
      options: ["Uma boneca", "Um relógio", "Uma estátua", "Um espelho"],
      correctIndex: 1,
      explanation: "Um relógio tem 'rosto' (mostrador) e 'mãos' (ponteiros), mas não possui olhos nem dedos de verdade."
    },
    {
      id: 25,
      question: "Quantos lados tem um hexágono?",
      options: ["5", "6", "7", "8"],
      correctIndex: 1,
      explanation: "O prefixo 'hexa' significa seis — um hexágono é um polígono de 6 lados."
    },
    {
      id: 26,
      question: "Você está correndo uma corrida e ultrapassa quem está em segundo lugar. Em que posição você fica?",
      options: ["Primeiro lugar", "Segundo lugar", "Terceiro lugar", "Depende da distância que falta"],
      correctIndex: 1,
      explanation: "Se você ultrapassa o segundo colocado, você assume a posição dele: o segundo lugar (e não o primeiro)."
    },
    {
      id: 27,
      question: "Complete a sequência: 2, 5, 11, 23, 47, ?",
      options: ["94", "95", "96", "93"],
      correctIndex: 1,
      explanation: "Cada termo é o dobro do anterior mais 1 (2×2+1=5, 5×2+1=11...). 47×2+1 = 95."
    },
    {
      id: 28,
      question: "Charada: quanto mais você tira de mim, mais eu deixo para trás. O que sou?",
      options: ["Pegadas", "Lembranças", "Um rastro de tinta", "Um caminho"],
      correctIndex: 0,
      explanation: "A cada passo que você dá (tira de si mesmo), mais pegadas ficam para trás."
    },
    {
      id: 29,
      question: "Qual é o único metal que é líquido à temperatura ambiente?",
      options: ["Chumbo", "Mercúrio", "Estanho", "Zinco"],
      correctIndex: 1,
      explanation: "O mercúrio é o único metal que se mantém em estado líquido em temperatura ambiente."
    },
    {
      id: 30,
      question: "Se A=1, B=2, C=3, D=4... qual é a soma dos valores das letras da palavra 'CAB'?",
      options: ["5", "6", "7", "8"],
      correctIndex: 1,
      explanation: "C=3, A=1, B=2. Somando: 3 + 1 + 2 = 6."
    }
  ];

  const QUESTIONS_PER_GAME = 15;

  /** Embaralha uma cópia do array (Fisher-Yates) sem alterar o original */
  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  /**
   * Sorteia `count` perguntas aleatórias e em ordem aleatória a partir de um pool.
   * Se o pool tiver menos perguntas que `count`, retorna o pool inteiro embaralhado.
   */
  function pickRandom(pool, count) {
    const shuffled = shuffleArray(pool || []);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  /**
   * Níveis de classificação final, do maior para o menor.
   * min/max referem-se à quantidade de acertos (0 a 15).
   */
  const LEVELS = [
    { min: 15, max: 15, title: "Lenda Suprema",       emoji: "👑", color: "#FF6B00",
      message: "Perfeição absoluta! Sua lógica está em outro nível — você enxerga padrões que ninguém mais vê." },
    { min: 13, max: 14, title: "Mestre da Lógica",    emoji: "🧠", color: "#00A651",
      message: "Impressionante! Você domina o raciocínio lógico como poucos. Faltou muito pouco para a perfeição." },
    { min: 10, max: 12, title: "Especialista",        emoji: "🎯", color: "#1877F2",
      message: "Ótimo desempenho! Sua capacidade analítica está muito acima da média." },
    { min: 7,  max: 9,  title: "Intelectual Curioso", emoji: "📚", color: "#8E5CF7",
      message: "Bom trabalho! Você tem uma boa base de raciocínio, com espaço para evoluir ainda mais." },
    { min: 4,  max: 6,  title: "Aprendiz",             emoji: "🌱", color: "#F5A623",
      message: "Você está no caminho certo! Continue exercitando a lógica e os resultados vão melhorar." },
    { min: 0,  max: 3,  title: "Iniciante",            emoji: "🔰", color: "#FF3C3C",
      message: "Todo mestre um dia foi iniciante. Tente novamente e desafie sua mente!" }
  ];

  function getLevel(score) {
    return LEVELS.find(function (lvl) { return score >= lvl.min && score <= lvl.max; }) || LEVELS[LEVELS.length - 1];
  }

  window.QuizData = {
    FALLBACK_QUESTIONS: FALLBACK_QUESTIONS,
    QUESTIONS_PER_GAME: QUESTIONS_PER_GAME,
    LEVELS: LEVELS,
    getLevel: getLevel,
    pickRandom: pickRandom
  };
})();
