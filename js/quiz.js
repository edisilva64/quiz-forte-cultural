/* ===================================================================
   quiz.js — Banco de dados do quiz (perguntas, gabarito, níveis)
   Namespace global: window.QuizData
   =================================================================== */

(function () {
  "use strict";

  /**
   * Cada pergunta tem:
   *  id, question, options[4], correctIndex, explanation
   * As alternativas já estão embaralhadas manualmente para variedade.
   */
  const QUESTIONS = [
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
    }
  ];

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
    QUESTIONS: QUESTIONS,
    LEVELS: LEVELS,
    getLevel: getLevel,
    TOTAL: QUESTIONS.length
  };
})();
