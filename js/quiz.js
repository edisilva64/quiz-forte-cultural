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
    },

    /* ===== 31-45: Sequências numéricas ===== */
    {
      id: 31,
      question: "Complete a sequência: 5, 10, 20, 40, 80, ?",
      options: ["120", "150", "160", "100"],
      correctIndex: 2,
      explanation: "Cada termo é o dobro do anterior. 80 × 2 = 160."
    },
    {
      id: 32,
      question: "Complete a sequência: 100, 90, 81, 73, ?",
      options: ["68", "66", "64", "70"],
      correctIndex: 1,
      explanation: "As diferenças diminuem 1 a cada passo (-10, -9, -8, -7). 73 - 7 = 66."
    },
    {
      id: 33,
      question: "Complete a sequência: 7, 14, 28, 56, ?",
      options: ["84", "98", "112", "106"],
      correctIndex: 2,
      explanation: "Cada termo é o dobro do anterior. 56 × 2 = 112."
    },
    {
      id: 34,
      question: "Complete a sequência: 1, 2, 4, 7, 11, 16, ?",
      options: ["20", "21", "22", "23"],
      correctIndex: 2,
      explanation: "As diferenças aumentam 1 a cada passo (1,2,3,4,5,6). 16 + 6 = 22."
    },
    {
      id: 35,
      question: "Complete a sequência: 2, 3, 5, 8, 13, 21, ?",
      options: ["29", "31", "34", "36"],
      correctIndex: 2,
      explanation: "Cada termo é a soma dos dois anteriores (sequência de Fibonacci). 13 + 21 = 34."
    },
    {
      id: 36,
      question: "Complete a sequência: 4, 8, 16, 32, ?",
      options: ["48", "56", "64", "72"],
      correctIndex: 2,
      explanation: "Cada termo é o dobro do anterior. 32 × 2 = 64."
    },
    {
      id: 37,
      question: "Complete a sequência: 10, 20, 15, 25, 20, 30, ?",
      options: ["35", "25", "40", "20"],
      correctIndex: 1,
      explanation: "O padrão alterna +10 e -5. Depois de 30, subtraímos 5: 30 - 5 = 25."
    },
    {
      id: 38,
      question: "Complete a sequência: 81, 27, 9, 3, ?",
      options: ["0", "1", "2", "-3"],
      correctIndex: 1,
      explanation: "Cada termo é dividido por 3. 3 ÷ 3 = 1."
    },
    {
      id: 39,
      question: "Complete a sequência: 2, 6, 18, 54, ?",
      options: ["108", "144", "162", "216"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 3. 54 × 3 = 162."
    },
    {
      id: 40,
      question: "Complete a sequência: 1, 8, 27, 64, ?",
      options: ["100", "121", "125", "81"],
      correctIndex: 2,
      explanation: "São cubos perfeitos (1³, 2³, 3³, 4³...). O próximo é 5³ = 125."
    },
    {
      id: 41,
      question: "Complete a sequência: 15, 13, 16, 14, 17, 15, ?",
      options: ["16", "18", "19", "20"],
      correctIndex: 1,
      explanation: "O padrão alterna -2 e +3. Depois de 15, somamos 3: 15 + 3 = 18."
    },
    {
      id: 42,
      question: "Complete a sequência: 3, 4, 6, 9, 13, ?",
      options: ["16", "17", "18", "19"],
      correctIndex: 2,
      explanation: "As diferenças aumentam 1 a cada passo (1,2,3,4,5). 13 + 5 = 18."
    },
    {
      id: 43,
      question: "Complete a sequência: 2, 4, 8, 14, 22, ?",
      options: ["30", "32", "34", "28"],
      correctIndex: 1,
      explanation: "As diferenças aumentam 2 a cada passo (2,4,6,8,10). 22 + 10 = 32."
    },
    {
      id: 44,
      question: "Complete a sequência: 50, 47, 44, 41, ?",
      options: ["37", "38", "39", "40"],
      correctIndex: 1,
      explanation: "Cada termo diminui 3. 41 - 3 = 38."
    },
    {
      id: 45,
      question: "Complete a sequência: 6, 11, 21, 41, ?",
      options: ["61", "71", "81", "91"],
      correctIndex: 2,
      explanation: "Cada termo é o dobro do anterior menos 1. 41 × 2 - 1 = 81."
    },

    /* ===== 46-65: Charadas ===== */
    {
      id: 46,
      question: "Charada: eu subo e desço o dia todo, mas nunca saio do lugar. O que sou?",
      options: ["Uma escada", "Um elevador", "Um balanço", "Um foguete"],
      correctIndex: 1,
      explanation: "O elevador se move para cima e para baixo, mas está sempre fixo no mesmo poço."
    },
    {
      id: 47,
      question: "Charada: eu te sigo o dia todo, mas desapareço quando escurece. O que sou?",
      options: ["Seu reflexo", "Sua sombra", "Seu eco", "Seu cabelo"],
      correctIndex: 1,
      explanation: "A sombra acompanha você durante o dia, mas some sem luz."
    },
    {
      id: 48,
      question: "Charada: não tenho boca, mas falo; não tenho ouvidos, mas escuto. O que sou?",
      options: ["Um rádio", "Um papagaio", "Um eco", "Um telefone"],
      correctIndex: 2,
      explanation: "O eco repete os sons que ouve, sem ter boca nem ouvidos de verdade."
    },
    {
      id: 49,
      question: "Charada: quanto mais eu envelheço, mais valho. O que sou?",
      options: ["Um carro", "Um vinho", "Um celular", "Um jornal"],
      correctIndex: 1,
      explanation: "Diferente da maioria dos produtos, alguns vinhos ficam mais valiosos com o tempo."
    },
    {
      id: 50,
      question: "Charada: tenho uma coroa na cabeça, mas não sou rei nem rainha. O que sou?",
      options: ["Um abacaxi", "Uma batata", "Uma flor", "Um chapéu"],
      correctIndex: 0,
      explanation: "O topo do abacaxi lembra uma coroa, apesar de ele não ser realeza."
    },
    {
      id: 51,
      question: "Charada: corro sem pernas, mas nunca chego a lugar nenhum. O que sou?",
      options: ["Um carro", "Um rio", "Um trem", "Um cavalo"],
      correctIndex: 1,
      explanation: "Um rio 'corre' continuamente, mas seu leito permanece no mesmo lugar."
    },
    {
      id: 52,
      question: "Charada: quanto mais escuro está, mais fácil sou de ver. O que sou?",
      options: ["Uma lanterna", "Uma estrela", "Uma sombra", "Um espelho"],
      correctIndex: 1,
      explanation: "As estrelas ficam mais visíveis quanto mais escuro o céu estiver."
    },
    {
      id: 53,
      question: "Charada: quanto mais eu como, mais eu cresço, mas um gole de água me mata. O que sou?",
      options: ["O fogo", "Uma planta", "Um balão", "Um vírus"],
      correctIndex: 0,
      explanation: "O fogo se alimenta de combustível e cresce, mas a água o apaga."
    },
    {
      id: 54,
      question: "Charada: posso ser quebrada sem nunca ser tocada. O que sou?",
      options: ["Uma promessa", "Uma janela", "Uma corda", "Uma xícara"],
      correctIndex: 0,
      explanation: "Uma promessa é quebrada quando não é cumprida, sem envolver nada físico."
    },
    {
      id: 55,
      question: "Charada: viajo o mundo inteiro, mas fico sempre presa num canto do envelope. O que sou?",
      options: ["Uma carta", "Um selo", "Uma etiqueta", "Uma foto"],
      correctIndex: 1,
      explanation: "O selo postal viaja grudado no envelope até o destino."
    },
    {
      id: 56,
      question: "Charada: quanto mais eu trabalho, menor eu fico. O que sou?",
      options: ["Um sabonete", "Um lápis", "Uma vela", "Todas as anteriores"],
      correctIndex: 3,
      explanation: "Sabonete, lápis e vela diminuem de tamanho conforme são usados."
    },
    {
      id: 57,
      question: "Charada: tenho folhas, mas não sou árvore; tenho lombada, mas não tenho coluna. O que sou?",
      options: ["Um livro", "Uma planta", "Uma mesa", "Um caderno"],
      correctIndex: 0,
      explanation: "Um livro tem 'folhas' (páginas) e uma 'lombada', sem ser uma árvore ou ter espinha dorsal."
    },
    {
      id: 58,
      question: "Charada: posso voar sem asas e posso chorar sem ter olhos. O que sou?",
      options: ["Uma pipa", "Uma nuvem", "Um avião", "Um pássaro"],
      correctIndex: 1,
      explanation: "As nuvens se movem pelo céu sem asas e liberam chuva, como se 'chorassem'."
    },
    {
      id: 59,
      question: "Charada: sou leve como o ar, mas nem a pessoa mais forte consegue me segurar por muito tempo. O que sou?",
      options: ["A respiração", "Uma pena", "Um balão", "O vento"],
      correctIndex: 0,
      explanation: "Todo mundo precisa soltar a respiração eventualmente, por mais que tente prendê-la."
    },
    {
      id: 60,
      question: "Charada: tenho um olho só e não posso enxergar. O que sou?",
      options: ["Uma agulha", "Um furacão", "Uma câmera", "Um relógio"],
      correctIndex: 0,
      explanation: "O 'olho' da agulha é o buraco por onde passa a linha."
    },
    {
      id: 61,
      question: "Charada: no verão fico roxa e docinha, mas sob o sol forte viro passa. O que sou?",
      options: ["Uma ameixa", "Uma uva", "Uma ciruela", "Uma ervilha"],
      correctIndex: 1,
      explanation: "A uva, quando desidratada ao sol, se transforma em uva-passa."
    },
    {
      id: 62,
      question: "Charada: nasço no mar, mas dou sabor à sua comida até o fim. O que sou?",
      options: ["O sal", "O iodo", "A alga", "O plâncton"],
      correctIndex: 0,
      explanation: "O sal é extraído da água do mar (ou de minas) e usado para temperar alimentos."
    },
    {
      id: 63,
      question: "Charada: tenho cabeça e cauda, mas não tenho corpo. O que sou?",
      options: ["Uma moeda", "Um cometa", "Uma cobra", "Uma seta"],
      correctIndex: 0,
      explanation: "As moedas têm um lado 'cara' (cabeça) e o outro é às vezes chamado de 'coroa' ou 'cauda'."
    },
    {
      id: 64,
      question: "Charada: viro de cabeça para baixo e começo a contar o tempo. O que sou?",
      options: ["Um relógio digital", "Uma ampulheta", "Um cronômetro", "Um calendário"],
      correctIndex: 1,
      explanation: "A ampulheta só começa a marcar o tempo quando é virada de cabeça para baixo."
    },
    {
      id: 65,
      question: "Charada: tenho dentes, mas nunca mastigo. O que sou?",
      options: ["Um garfo", "Um pente", "Uma serra", "Um zíper"],
      correctIndex: 1,
      explanation: "O pente tem 'dentes' que penteiam o cabelo, mas não mastiga nada."
    },

    /* ===== 66-85: Lógica e raciocínio ===== */
    {
      id: 66,
      question: "Três amigos dividiram uma pizza em partes iguais. Cada um comeu 4 pedaços e não sobrou nada. Quantos pedaços tinha a pizza?",
      options: ["8", "10", "12", "14"],
      correctIndex: 2,
      explanation: "3 amigos × 4 pedaços cada = 12 pedaços ao todo."
    },
    {
      id: 67,
      question: "Se 1 ovo leva 10 minutos para cozinhar em água fervente, quanto tempo levam 3 ovos para cozinhar juntos na mesma panela?",
      options: ["30 minutos", "20 minutos", "10 minutos", "15 minutos"],
      correctIndex: 2,
      explanation: "Os ovos cozinham ao mesmo tempo dentro da mesma água fervente, então o tempo não muda."
    },
    {
      id: 68,
      question: "Um fazendeiro tinha 17 ovelhas. Todas menos 9 morreram. Quantas ovelhas sobraram?",
      options: ["8", "9", "17", "0"],
      correctIndex: 1,
      explanation: "'Todas menos 9 morreram' significa que 9 ovelhas continuam vivas."
    },
    {
      id: 69,
      question: "Quantos meses do ano têm 28 dias?",
      options: ["1", "2", "6", "Todos os 12"],
      correctIndex: 3,
      explanation: "Pegadinha clássica: todo mês tem PELO MENOS 28 dias, então, tecnicamente, os 12 meses têm 28 dias."
    },
    {
      id: 70,
      question: "Você entra em um quarto escuro com apenas 1 fósforo. Há uma vela, uma lamparina a óleo e uma lareira para acender. O que você acende primeiro?",
      options: ["A vela", "A lamparina", "A lareira", "O fósforo"],
      correctIndex: 3,
      explanation: "Antes de acender qualquer coisa, é preciso acender o próprio fósforo."
    },
    {
      id: 71,
      question: "Dois pais e dois filhos foram pescar, e cada um pegou exatamente 1 peixe — totalizando 3 peixes. Como isso é possível?",
      options: ["Eram avô, pai e filho (3 pessoas)", "Um peixe foi contado duas vezes", "Eram 4 pessoas ao todo", "Isso não é possível"],
      correctIndex: 0,
      explanation: "Avô, pai e filho formam '2 pais e 2 filhos' ao mesmo tempo, mas são apenas 3 pessoas."
    },
    {
      id: 72,
      question: "Um homem baixinho mora no 10º andar. Ele sempre desce de elevador até o térreo, mas ao voltar só consegue subir de elevador até o 7º andar, fazendo o resto a pé — exceto em dias de chuva, quando sobe direto até o 10º andar de elevador. Por quê?",
      options: [
        "Ele gosta de se exercitar",
        "Em dias de chuva, ele usa a ponta do guarda-chuva para apertar o botão do 10º andar",
        "O elevador só funciona até o 7º andar quando não chove",
        "Ele mora, na verdade, no 7º andar"
      ],
      correctIndex: 1,
      explanation: "Sendo baixinho, ele só alcança o botão do 7º andar normalmente, mas com o guarda-chuva consegue apertar o botão mais alto."
    },
    {
      id: 73,
      question: "Uma família tem 6 filhas, e cada filha tem exatamente 1 irmão. Contando os pais, quantas pessoas há na família ao todo?",
      options: ["7", "8", "9", "10"],
      correctIndex: 2,
      explanation: "6 filhas + 1 irmão (compartilhado por todas) + 2 pais = 9 pessoas."
    },
    {
      id: 74,
      question: "Em uma corrida, você ultrapassa a pessoa que está em último lugar. Em que posição você fica?",
      options: ["Penúltimo lugar", "Último lugar", "Isso é impossível", "Depende da distância que falta"],
      correctIndex: 2,
      explanation: "Não existe ninguém atrás do último colocado para você ultrapassar — a situação descrita não pode acontecer."
    },
    {
      id: 75,
      question: "Quantas vezes o algarismo 9 aparece escrito nos números de 1 a 100?",
      options: ["10", "19", "20", "11"],
      correctIndex: 2,
      explanation: "O 9 aparece 10 vezes como algarismo das unidades (9,19,...,99) e mais 10 vezes como dezena (90 a 99), totalizando 20."
    },
    {
      id: 76,
      question: "Um produto custa R$100 na compra. Ao vendê-lo com 20% de lucro sobre o valor de compra, qual é o preço de venda?",
      options: ["R$110", "R$115", "R$120", "R$130"],
      correctIndex: 2,
      explanation: "20% de R$100 é R$20. Somando: R$100 + R$20 = R$120."
    },
    {
      id: 77,
      question: "Numa sala há 3 interruptores que controlam 3 lâmpadas em outro cômodo, fora da sua visão. Você só pode entrar nesse cômodo uma única vez. Como descobrir com certeza qual interruptor liga qual lâmpada?",
      options: [
        "É impossível descobrir com uma única entrada",
        "Ligar um interruptor, esperar alguns minutos, desligá-lo, ligar outro e então entrar",
        "Ligar todos os interruptores ao mesmo tempo e entrar",
        "Perguntar para outra pessoa que já sabe"
      ],
      correctIndex: 1,
      explanation: "Ao entrar: a lâmpada acesa corresponde ao 2º interruptor; a apagada e quente, ao 1º; a apagada e fria, ao 3º."
    },
    {
      id: 78,
      question: "Se SEG=1, TER=2, QUA=3, QUI=4... quanto vale SEX?",
      options: ["4", "5", "6", "7"],
      correctIndex: 1,
      explanation: "Seguindo a ordem dos dias úteis da semana, sexta-feira é o 5º dia."
    },
    {
      id: 79,
      question: "Um trem de 200 metros de comprimento atravessa um túnel de 300 metros, andando a 50 metros por segundo. Quanto tempo leva para o trem atravessar completamente o túnel?",
      options: ["6 segundos", "8 segundos", "10 segundos", "12 segundos"],
      correctIndex: 2,
      explanation: "A distância total até a traseira do trem sair do túnel é 200+300=500m. A 50m/s, isso leva 500 ÷ 50 = 10 segundos."
    },
    {
      id: 80,
      question: "2 pedreiros constroem um muro em 6 dias. Trabalhando no mesmo ritmo, quantos dias 3 pedreiros levariam para construir o mesmo muro?",
      options: ["3 dias", "4 dias", "5 dias", "2 dias"],
      correctIndex: 1,
      explanation: "O trabalho total é 2×6=12 'pedreiro-dias'. Com 3 pedreiros: 12 ÷ 3 = 4 dias."
    },
    {
      id: 81,
      question: "Numa gaveta escura há 5 meias pretas e 5 meias brancas, todas soltas. Quantas meias você precisa tirar, no mínimo, para garantir um par da mesma cor?",
      options: ["2", "3", "4", "6"],
      correctIndex: 1,
      explanation: "Existem só 2 cores possíveis. Ao tirar 3 meias, pelo menos duas serão obrigatoriamente da mesma cor."
    },
    {
      id: 82,
      question: "Qual é o menor número inteiro positivo que, dividido por 2, 3, 4, 5 ou 6, sempre deixa resto 1?",
      options: ["31", "41", "61", "121"],
      correctIndex: 2,
      explanation: "O mínimo múltiplo comum de 2,3,4,5,6 é 60. Somando 1, temos 61, que deixa resto 1 em todas essas divisões."
    },
    {
      id: 83,
      question: "Todos os gatos são mamíferos. Alguns mamíferos são pretos. O que se pode concluir com certeza?",
      options: ["Todo gato é preto", "Nenhum gato é preto", "Não é possível concluir que algum gato é preto", "Todo mamífero é gato"],
      correctIndex: 2,
      explanation: "As premissas não garantem que os mamíferos pretos incluam algum gato — essa conclusão não é logicamente válida."
    },
    {
      id: 84,
      question: "Um relógio quebrado ficou parado e sempre marca a mesma hora. Quantas vezes por dia esse horário estará correto?",
      options: ["Nenhuma vez", "1 vez", "2 vezes", "24 vezes"],
      correctIndex: 2,
      explanation: "Como o relógio marca sempre a mesma hora fixa, ela coincidirá com a hora certa duas vezes em 24 horas."
    },
    {
      id: 85,
      question: "Se hoje é sábado, que dia da semana será daqui a 45 dias?",
      options: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Domingo"],
      correctIndex: 1,
      explanation: "45 dividido por 7 deixa resto 3. Avançando 3 dias a partir de sábado: domingo, segunda, terça-feira."
    },

    /* ===== 86-105: Cultura geral ===== */
    {
      id: 86,
      question: "Qual é o maior planeta do sistema solar?",
      options: ["Saturno", "Netuno", "Júpiter", "Urano"],
      correctIndex: 2,
      explanation: "Júpiter é o maior planeta do sistema solar, com um diâmetro maior que o de todos os outros planetas somados."
    },
    {
      id: 87,
      question: "Aproximadamente quantos ossos tem o corpo humano adulto?",
      options: ["156", "186", "206", "256"],
      correctIndex: 2,
      explanation: "O esqueleto humano adulto tem, em média, 206 ossos."
    },
    {
      id: 88,
      question: "Qual é a capital da Austrália?",
      options: ["Sydney", "Melbourne", "Camberra", "Perth"],
      correctIndex: 2,
      explanation: "Apesar de Sydney ser mais famosa, a capital oficial da Austrália é Camberra."
    },
    {
      id: 89,
      question: "Quem pintou a Mona Lisa?",
      options: ["Michelangelo", "Leonardo da Vinci", "Rafael", "Ticiano"],
      correctIndex: 1,
      explanation: "A Mona Lisa é uma das obras mais famosas de Leonardo da Vinci, pintada no início do século XVI."
    },
    {
      id: 90,
      question: "Qual rio é tradicionalmente considerado o mais longo do mundo?",
      options: ["Amazonas", "Nilo", "Mississippi", "Yangtzé"],
      correctIndex: 1,
      explanation: "O Nilo é o mais citado como o mais longo pelos critérios tradicionais, embora estudos recentes sugiram que o Amazonas pode ser ainda mais extenso."
    },
    {
      id: 91,
      question: "Qual gás os seres humanos exalam ao respirar?",
      options: ["Oxigênio", "Hidrogênio", "Dióxido de carbono", "Nitrogênio"],
      correctIndex: 2,
      explanation: "Ao expirar, os pulmões liberam principalmente dióxido de carbono (CO₂), produzido pelo metabolismo do corpo."
    },
    {
      id: 92,
      question: "Segundo a divisão mais usada no Brasil, quantos continentes existem?",
      options: ["5", "6", "7", "4"],
      correctIndex: 1,
      explanation: "O modelo mais ensinado no Brasil considera 6 continentes: América, Europa, Ásia, África, Oceania e Antártida."
    },
    {
      id: 93,
      question: "Qual é o metal mais abundante na crosta terrestre?",
      options: ["Ferro", "Alumínio", "Cobre", "Ouro"],
      correctIndex: 1,
      explanation: "O alumínio é o metal mais abundante na crosta terrestre, embora o ferro seja mais conhecido popularmente."
    },
    {
      id: 94,
      question: "Em que ano o ser humano pisou na Lua pela primeira vez?",
      options: ["1965", "1969", "1972", "1959"],
      correctIndex: 1,
      explanation: "A missão Apollo 11 pousou na Lua em 20 de julho de 1969."
    },
    {
      id: 95,
      question: "Qual é o maior mamífero do mundo?",
      options: ["O elefante-africano", "A girafa", "A baleia-azul", "O rinoceronte"],
      correctIndex: 2,
      explanation: "A baleia-azul é o maior animal já conhecido, podendo ultrapassar 30 metros de comprimento."
    },
    {
      id: 96,
      question: "Quantas cordas tem um violão clássico padrão?",
      options: ["4", "5", "6", "7"],
      correctIndex: 2,
      explanation: "O violão clássico padrão tem 6 cordas."
    },
    {
      id: 97,
      question: "Qual é o osso mais longo do corpo humano?",
      options: ["A tíbia", "O fêmur", "O úmero", "A fíbula"],
      correctIndex: 1,
      explanation: "O fêmur, localizado na coxa, é o osso mais longo e resistente do corpo humano."
    },
    {
      id: 98,
      question: "Qual é a moeda oficial do Japão?",
      options: ["O won", "O yuan", "O iene", "O baht"],
      correctIndex: 2,
      explanation: "A moeda oficial do Japão é o iene (¥)."
    },
    {
      id: 99,
      question: "Quem escreveu o romance 'Dom Casmurro'?",
      options: ["José de Alencar", "Machado de Assis", "Graciliano Ramos", "Jorge Amado"],
      correctIndex: 1,
      explanation: "'Dom Casmurro' é uma das obras mais famosas de Machado de Assis, publicada em 1899."
    },
    {
      id: 100,
      question: "Qual é o menor país do mundo em área territorial?",
      options: ["Mônaco", "San Marino", "Vaticano", "Liechtenstein"],
      correctIndex: 2,
      explanation: "O Vaticano tem cerca de 0,44 km², sendo o menor Estado soberano do mundo em área."
    },
    {
      id: 101,
      question: "Quantos lados tem um octógono?",
      options: ["6", "7", "8", "9"],
      correctIndex: 2,
      explanation: "O prefixo 'octo' significa oito — um octógono é um polígono de 8 lados."
    },
    {
      id: 102,
      question: "Qual elemento químico é representado pelo símbolo 'O'?",
      options: ["Ouro", "Oxigênio", "Ósmio", "Ozônio"],
      correctIndex: 1,
      explanation: "O símbolo químico 'O' representa o Oxigênio na tabela periódica."
    },
    {
      id: 103,
      question: "Em que continente fica o Egito?",
      options: ["Ásia", "Oriente Médio", "África", "Europa"],
      correctIndex: 2,
      explanation: "O Egito está localizado no continente africano, embora a Península do Sinai fique tecnicamente na Ásia."
    },
    {
      id: 104,
      question: "Qual é, aproximadamente, a velocidade da luz no vácuo?",
      options: ["30 mil km/s", "150 mil km/s", "300 mil km/s", "3 milhões km/s"],
      correctIndex: 2,
      explanation: "A velocidade da luz no vácuo é de aproximadamente 300.000 km por segundo."
    },
    {
      id: 105,
      question: "Quantas patas tem uma aranha?",
      options: ["6", "8", "10", "4"],
      correctIndex: 1,
      explanation: "Aranhas são aracnídeos e possuem 8 patas, diferente dos insetos, que têm 6."
    },

    /* ===== 106-115: Sequências e padrões de letras ===== */
    {
      id: 106,
      question: "Complete a sequência de letras: B, D, F, H, ?",
      options: ["I", "J", "K", "G"],
      correctIndex: 1,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto (pulando uma a cada passo)."
    },
    {
      id: 107,
      question: "Complete a sequência de letras: A, C, F, J, ?",
      options: ["M", "N", "O", "P"],
      correctIndex: 2,
      explanation: "O intervalo entre as letras aumenta 1 a cada passo (+2,+3,+4,+5). De J (10ª letra), somando 5, chega-se a O (15ª letra)."
    },
    {
      id: 108,
      question: "Complete a sequência de letras: M, O, Q, S, ?",
      options: ["T", "U", "V", "W"],
      correctIndex: 1,
      explanation: "A sequência avança de 2 em 2 letras (pulando uma a cada passo)."
    },
    {
      id: 109,
      question: "Complete a sequência de letras: Y, W, U, S, ?",
      options: ["R", "Q", "P", "T"],
      correctIndex: 1,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 110,
      question: "Se A=1, B=2, C=3... qual letra corresponde ao número 15?",
      options: ["M", "N", "O", "P"],
      correctIndex: 2,
      explanation: "Contando o alfabeto em ordem, a 15ª letra é o O."
    },
    {
      id: 111,
      question: "Complete a sequência: AB, DE, GH, JK, ?",
      options: ["LM", "MN", "NO", "KL"],
      correctIndex: 1,
      explanation: "Cada bloco de 2 letras pula 1 letra em relação ao bloco anterior. Depois de JK (pulando L), vem MN."
    },
    {
      id: 112,
      question: "Qual letra mais se repete na palavra 'BANANA'?",
      options: ["B", "A", "N", "Nenhuma se repete"],
      correctIndex: 1,
      explanation: "A letra 'A' aparece 3 vezes em BANANA, mais que qualquer outra letra da palavra."
    },
    {
      id: 113,
      question: "Quantas vogais tem a palavra 'ABACAXI'?",
      options: ["3", "4", "5", "2"],
      correctIndex: 1,
      explanation: "As vogais em ABACAXI são A, A, A, I — totalizando 4 vogais."
    },
    {
      id: 114,
      question: "Complete a sequência de letras: C, F, I, L, ?",
      options: ["M", "N", "O", "P"],
      correctIndex: 2,
      explanation: "Cada letra avança 3 posições no alfabeto (C=3, F=6, I=9, L=12, O=15)."
    },
    {
      id: 115,
      question: "Qual é a 5ª letra do alfabeto contando de trás para frente (Z sendo a 1ª)?",
      options: ["W", "V", "U", "T"],
      correctIndex: 1,
      explanation: "Contando do final: Z(1), Y(2), X(3), W(4), V(5)."
    },

    /* ===== 116-120: Matemática e probabilidade ===== */
    {
      id: 116,
      question: "Se 40% de um número é igual a 20, qual é esse número?",
      options: ["40", "50", "60", "80"],
      correctIndex: 1,
      explanation: "Se 40% = 20, então o número total é 20 ÷ 0,4 = 50."
    },
    {
      id: 117,
      question: "Quanto mede cada ângulo interno de um triângulo equilátero?",
      options: ["45°", "60°", "90°", "120°"],
      correctIndex: 1,
      explanation: "Em um triângulo equilátero, os 3 ângulos internos são iguais e somam 180°, logo cada um mede 60°."
    },
    {
      id: 118,
      question: "Se 1kg de maçãs custa R$6, quanto você paga por 2,5kg?",
      options: ["R$12", "R$13,50", "R$15", "R$18"],
      correctIndex: 2,
      explanation: "2,5 × R$6 = R$15."
    },
    {
      id: 119,
      question: "Quantos graus somam os ângulos internos de qualquer triângulo?",
      options: ["90°", "180°", "270°", "360°"],
      correctIndex: 1,
      explanation: "A soma dos ângulos internos de qualquer triângulo é sempre 180°."
    },
    {
      id: 120,
      question: "Se a probabilidade de chover amanhã é 30%, qual é a probabilidade de NÃO chover?",
      options: ["30%", "50%", "70%", "100%"],
      correctIndex: 2,
      explanation: "A soma das probabilidades de ocorrer e não ocorrer um evento é sempre 100%. 100% - 30% = 70%."
    },
    {
      id: 121,
      question: "Complete a sequência: 8, 9, 10, 11, 12, ?",
      options: ["15", "14", "13", "12"],
      correctIndex: 2,
      explanation: "Cada termo soma 1 em relação ao anterior. 12 + 1 = 13."
    },
    {
      id: 122,
      question: "Complete a sequência: 46, 53, 60, 67, 74, ?",
      options: ["95", "74", "88", "81"],
      correctIndex: 3,
      explanation: "Cada termo soma 7 em relação ao anterior. 74 + 7 = 81."
    },
    {
      id: 123,
      question: "Complete a sequência: 10, 6, 2, -2, -6, ?",
      options: ["-18", "-6", "-14", "-10"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 4 em relação ao anterior. -6 - 4 = -10."
    },
    {
      id: 124,
      question: "Complete a sequência: 7, 2, -3, -8, -13, ?",
      options: ["-13", "-18", "-28", "-23"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 5 em relação ao anterior. -13 - 5 = -18."
    },
    {
      id: 125,
      question: "Complete a sequência: 55, 47, 39, 31, 23, ?",
      options: ["23", "15", "7", "-1"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 8 em relação ao anterior. 23 - 8 = 15."
    },
    {
      id: 126,
      question: "Complete a sequência: 43, 54, 65, 76, 87, ?",
      options: ["109", "87", "98", "120"],
      correctIndex: 2,
      explanation: "Cada termo soma 11 em relação ao anterior. 87 + 11 = 98."
    },
    {
      id: 127,
      question: "Complete a sequência: 34, 25, 16, 7, -2, ?",
      options: ["-20", "-11", "-29", "-2"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 9 em relação ao anterior. -2 - 9 = -11."
    },
    {
      id: 128,
      question: "Complete a sequência: 19, 17, 15, 13, 11, ?",
      options: ["11", "7", "5", "9"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 2 em relação ao anterior. 11 - 2 = 9."
    },
    {
      id: 129,
      question: "Complete a sequência: 66, 76, 86, 96, 106, ?",
      options: ["106", "136", "126", "116"],
      correctIndex: 3,
      explanation: "Cada termo soma 10 em relação ao anterior. 106 + 10 = 116."
    },
    {
      id: 130,
      question: "Complete a sequência: 36, 48, 60, 72, 84, ?",
      options: ["96", "84", "120", "108"],
      correctIndex: 0,
      explanation: "Cada termo soma 12 em relação ao anterior. 84 + 12 = 96."
    },
    {
      id: 131,
      question: "Complete a sequência: 50, 60, 70, 80, 90, ?",
      options: ["110", "90", "120", "100"],
      correctIndex: 3,
      explanation: "Cada termo soma 10 em relação ao anterior. 90 + 10 = 100."
    },
    {
      id: 132,
      question: "Complete a sequência: 1, -11, -23, -35, -47, ?",
      options: ["-47", "-59", "-83", "-71"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 12 em relação ao anterior. -47 - 12 = -59."
    },
    {
      id: 133,
      question: "Complete a sequência: 37, 42, 47, 52, 57, ?",
      options: ["62", "57", "67", "72"],
      correctIndex: 0,
      explanation: "Cada termo soma 5 em relação ao anterior. 57 + 5 = 62."
    },
    {
      id: 134,
      question: "Complete a sequência: 2, -10, -22, -34, -46, ?",
      options: ["-58", "-70", "-46", "-82"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 12 em relação ao anterior. -46 - 12 = -58."
    },
    {
      id: 135,
      question: "Complete a sequência: 60, 64, 68, 72, 76, ?",
      options: ["76", "80", "88", "84"],
      correctIndex: 1,
      explanation: "Cada termo soma 4 em relação ao anterior. 76 + 4 = 80."
    },
    {
      id: 136,
      question: "Complete a sequência: 68, 59, 50, 41, 32, ?",
      options: ["23", "32", "14", "5"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 9 em relação ao anterior. 32 - 9 = 23."
    },
    {
      id: 137,
      question: "Complete a sequência: 58, 63, 68, 73, 78, ?",
      options: ["93", "78", "88", "83"],
      correctIndex: 3,
      explanation: "Cada termo soma 5 em relação ao anterior. 78 + 5 = 83."
    },
    {
      id: 138,
      question: "Complete a sequência: 25, 18, 11, 4, -3, ?",
      options: ["-10", "-17", "-3", "-24"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 7 em relação ao anterior. -3 - 7 = -10."
    },
    {
      id: 139,
      question: "Complete a sequência: 27, 28, 29, 30, 31, ?",
      options: ["31", "33", "34", "32"],
      correctIndex: 3,
      explanation: "Cada termo soma 1 em relação ao anterior. 31 + 1 = 32."
    },
    {
      id: 140,
      question: "Complete a sequência: 15, 26, 37, 48, 59, ?",
      options: ["81", "59", "70", "92"],
      correctIndex: 2,
      explanation: "Cada termo soma 11 em relação ao anterior. 59 + 11 = 70."
    },
    {
      id: 141,
      question: "Complete a sequência: 9, -3, -15, -27, -39, ?",
      options: ["-51", "-39", "-75", "-63"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 12 em relação ao anterior. -39 - 12 = -51."
    },
    {
      id: 142,
      question: "Complete a sequência: 70, 82, 94, 106, 118, ?",
      options: ["142", "154", "118", "130"],
      correctIndex: 3,
      explanation: "Cada termo soma 12 em relação ao anterior. 118 + 12 = 130."
    },
    {
      id: 143,
      question: "Complete a sequência: 69, 67, 65, 63, 61, ?",
      options: ["55", "57", "59", "61"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 2 em relação ao anterior. 61 - 2 = 59."
    },
    {
      id: 144,
      question: "Complete a sequência: 49, 43, 37, 31, 25, ?",
      options: ["19", "7", "13", "25"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 6 em relação ao anterior. 25 - 6 = 19."
    },
    {
      id: 145,
      question: "Complete a sequência: 3, 2, 1, 0, -1, ?",
      options: ["-2", "-1", "-3", "-4"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 1 em relação ao anterior. -1 - 1 = -2."
    },
    {
      id: 146,
      question: "Complete a sequência: 20, 17, 14, 11, 8, ?",
      options: ["2", "8", "5", "-1"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 3 em relação ao anterior. 8 - 3 = 5."
    },
    {
      id: 147,
      question: "Complete a sequência: 46, 50, 54, 58, 62, ?",
      options: ["70", "74", "66", "62"],
      correctIndex: 2,
      explanation: "Cada termo soma 4 em relação ao anterior. 62 + 4 = 66."
    },
    {
      id: 148,
      question: "Complete a sequência: 52, 59, 66, 73, 80, ?",
      options: ["94", "80", "87", "101"],
      correctIndex: 2,
      explanation: "Cada termo soma 7 em relação ao anterior. 80 + 7 = 87."
    },
    {
      id: 149,
      question: "Complete a sequência: 14, 21, 28, 35, 42, ?",
      options: ["56", "63", "49", "42"],
      correctIndex: 2,
      explanation: "Cada termo soma 7 em relação ao anterior. 42 + 7 = 49."
    },
    {
      id: 150,
      question: "Complete a sequência: 34, 41, 48, 55, 62, ?",
      options: ["69", "83", "62", "76"],
      correctIndex: 0,
      explanation: "Cada termo soma 7 em relação ao anterior. 62 + 7 = 69."
    },
    {
      id: 151,
      question: "Complete a sequência: 36, 35, 34, 33, 32, ?",
      options: ["31", "29", "32", "30"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 1 em relação ao anterior. 32 - 1 = 31."
    },
    {
      id: 152,
      question: "Complete a sequência: 33, 24, 15, 6, -3, ?",
      options: ["-30", "-21", "-3", "-12"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 9 em relação ao anterior. -3 - 9 = -12."
    },
    {
      id: 153,
      question: "Complete a sequência: 60, 69, 78, 87, 96, ?",
      options: ["105", "96", "114", "123"],
      correctIndex: 0,
      explanation: "Cada termo soma 9 em relação ao anterior. 96 + 9 = 105."
    },
    {
      id: 154,
      question: "Complete a sequência: 20, 24, 28, 32, 36, ?",
      options: ["48", "36", "44", "40"],
      correctIndex: 3,
      explanation: "Cada termo soma 4 em relação ao anterior. 36 + 4 = 40."
    },
    {
      id: 155,
      question: "Complete a sequência: 66, 61, 56, 51, 46, ?",
      options: ["46", "41", "31", "36"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 5 em relação ao anterior. 46 - 5 = 41."
    },
    {
      id: 156,
      question: "Complete a sequência: 31, 29, 27, 25, 23, ?",
      options: ["23", "19", "17", "21"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 2 em relação ao anterior. 23 - 2 = 21."
    },
    {
      id: 157,
      question: "Complete a sequência: 65, 53, 41, 29, 17, ?",
      options: ["-7", "-19", "5", "17"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 12 em relação ao anterior. 17 - 12 = 5."
    },
    {
      id: 158,
      question: "Complete a sequência: 6, 9, 12, 15, 18, ?",
      options: ["24", "27", "21", "18"],
      correctIndex: 2,
      explanation: "Cada termo soma 3 em relação ao anterior. 18 + 3 = 21."
    },
    {
      id: 159,
      question: "Complete a sequência: 17, 13, 9, 5, 1, ?",
      options: ["-3", "-11", "-7", "1"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 4 em relação ao anterior. 1 - 4 = -3."
    },
    {
      id: 160,
      question: "Complete a sequência: 68, 63, 58, 53, 48, ?",
      options: ["38", "43", "33", "48"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 5 em relação ao anterior. 48 - 5 = 43."
    },
    {
      id: 161,
      question: "Complete a sequência: 3, 15, 27, 39, 51, ?",
      options: ["63", "51", "75", "87"],
      correctIndex: 0,
      explanation: "Cada termo soma 12 em relação ao anterior. 51 + 12 = 63."
    },
    {
      id: 162,
      question: "Complete a sequência: 15, 17, 19, 21, 23, ?",
      options: ["25", "29", "27", "23"],
      correctIndex: 0,
      explanation: "Cada termo soma 2 em relação ao anterior. 23 + 2 = 25."
    },
    {
      id: 163,
      question: "Complete a sequência: 63, 68, 73, 78, 83, ?",
      options: ["98", "88", "93", "83"],
      correctIndex: 1,
      explanation: "Cada termo soma 5 em relação ao anterior. 83 + 5 = 88."
    },
    {
      id: 164,
      question: "Complete a sequência: 46, 49, 52, 55, 58, ?",
      options: ["61", "64", "58", "67"],
      correctIndex: 0,
      explanation: "Cada termo soma 3 em relação ao anterior. 58 + 3 = 61."
    },
    {
      id: 165,
      question: "Complete a sequência: 35, 37, 39, 41, 43, ?",
      options: ["45", "43", "49", "47"],
      correctIndex: 0,
      explanation: "Cada termo soma 2 em relação ao anterior. 43 + 2 = 45."
    },
    {
      id: 166,
      question: "Complete a sequência: 39, 34, 29, 24, 19, ?",
      options: ["4", "14", "19", "9"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 5 em relação ao anterior. 19 - 5 = 14."
    },
    {
      id: 167,
      question: "Complete a sequência: 46, 42, 38, 34, 30, ?",
      options: ["18", "26", "22", "30"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 4 em relação ao anterior. 30 - 4 = 26."
    },
    {
      id: 168,
      question: "Complete a sequência: 21, 10, -1, -12, -23, ?",
      options: ["-45", "-56", "-23", "-34"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 11 em relação ao anterior. -23 - 11 = -34."
    },
    {
      id: 169,
      question: "Complete a sequência: 39, 46, 53, 60, 67, ?",
      options: ["81", "74", "67", "88"],
      correctIndex: 1,
      explanation: "Cada termo soma 7 em relação ao anterior. 67 + 7 = 74."
    },
    {
      id: 170,
      question: "Complete a sequência: 29, 26, 23, 20, 17, ?",
      options: ["17", "14", "11", "8"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 3 em relação ao anterior. 17 - 3 = 14."
    },
    {
      id: 171,
      question: "Complete a sequência: 1, 12, 23, 34, 45, ?",
      options: ["45", "56", "78", "67"],
      correctIndex: 1,
      explanation: "Cada termo soma 11 em relação ao anterior. 45 + 11 = 56."
    },
    {
      id: 172,
      question: "Complete a sequência: 5, 8, 11, 14, 17, ?",
      options: ["20", "17", "26", "23"],
      correctIndex: 0,
      explanation: "Cada termo soma 3 em relação ao anterior. 17 + 3 = 20."
    },
    {
      id: 173,
      question: "Complete a sequência: 43, 47, 51, 55, 59, ?",
      options: ["63", "71", "59", "67"],
      correctIndex: 0,
      explanation: "Cada termo soma 4 em relação ao anterior. 59 + 4 = 63."
    },
    {
      id: 174,
      question: "Complete a sequência: 36, 26, 16, 6, -4, ?",
      options: ["-34", "-4", "-14", "-24"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 10 em relação ao anterior. -4 - 10 = -14."
    },
    {
      id: 175,
      question: "Complete a sequência: 26, 34, 42, 50, 58, ?",
      options: ["74", "66", "58", "82"],
      correctIndex: 1,
      explanation: "Cada termo soma 8 em relação ao anterior. 58 + 8 = 66."
    },
    {
      id: 176,
      question: "Complete a sequência: 5, 15, 45, 135, ?",
      options: ["400", "405", "410", "810"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por 3. 135 × 3 = 405."
    },
    {
      id: 177,
      question: "Complete a sequência: 7, 21, 63, 189, ?",
      options: ["574", "1134", "560", "567"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 3. 189 × 3 = 567."
    },
    {
      id: 178,
      question: "Complete a sequência: 6, -12, 24, -48, ?",
      options: ["192", "96", "90", "102"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -2. -48 × -2 = 96."
    },
    {
      id: 179,
      question: "Complete a sequência: 5, 10, 20, 40, ?",
      options: ["85", "80", "75", "160"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por 2. 40 × 2 = 80."
    },
    {
      id: 180,
      question: "Complete a sequência: 2, 4, 8, 16, ?",
      options: ["32", "34", "64", "30"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 2. 16 × 2 = 32."
    },
    {
      id: 181,
      question: "Complete a sequência: 2, 8, 32, 128, ?",
      options: ["510", "1024", "512", "514"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 4. 128 × 4 = 512."
    },
    {
      id: 182,
      question: "Complete a sequência: 2, -4, 8, -16, ?",
      options: ["32", "30", "34", "64"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por -2. -16 × -2 = 32."
    },
    {
      id: 183,
      question: "Complete a sequência: 7, 28, 112, 448, ?",
      options: ["3584", "1785", "1792", "1799"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 4. 448 × 4 = 1792."
    },
    {
      id: 184,
      question: "Complete a sequência: 4, 12, 36, 108, ?",
      options: ["324", "320", "328", "648"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 3. 108 × 3 = 324."
    },
    {
      id: 185,
      question: "Complete a sequência: 8, 16, 32, 64, ?",
      options: ["128", "256", "120", "136"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 2. 64 × 2 = 128."
    },
    {
      id: 186,
      question: "Complete a sequência: 6, 18, 54, 162, ?",
      options: ["486", "492", "480", "972"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 3. 162 × 3 = 486."
    },
    {
      id: 187,
      question: "Complete a sequência: 3, -6, 12, -24, ?",
      options: ["48", "51", "96", "45"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por -2. -24 × -2 = 48."
    },
    {
      id: 188,
      question: "Complete a sequência: 4, 16, 64, 256, ?",
      options: ["1020", "1024", "2048", "1028"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por 4. 256 × 4 = 1024."
    },
    {
      id: 189,
      question: "Complete a sequência: 8, 32, 128, 512, ?",
      options: ["2048", "2056", "4096", "2040"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 4. 512 × 4 = 2048."
    },
    {
      id: 190,
      question: "Complete a sequência: 9, 18, 36, 72, ?",
      options: ["135", "288", "144", "153"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 2. 72 × 2 = 144."
    },
    {
      id: 191,
      question: "Complete a sequência: 9, -18, 36, -72, ?",
      options: ["153", "144", "135", "288"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -2. -72 × -2 = 144."
    },
    {
      id: 192,
      question: "Complete a sequência: 8, -16, 32, -64, ?",
      options: ["256", "136", "120", "128"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por -2. -64 × -2 = 128."
    },
    {
      id: 193,
      question: "Complete a sequência: 8, 24, 72, 216, ?",
      options: ["640", "648", "1296", "656"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por 3. 216 × 3 = 648."
    },
    {
      id: 194,
      question: "Complete a sequência: 5, -10, 20, -40, ?",
      options: ["85", "80", "75", "160"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -2. -40 × -2 = 80."
    },
    {
      id: 195,
      question: "Complete a sequência: 9, 27, 81, 243, ?",
      options: ["729", "720", "1458", "738"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 3. 243 × 3 = 729."
    },
    {
      id: 196,
      question: "Complete a sequência: 3, 6, 12, 24, ?",
      options: ["51", "45", "96", "48"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 2. 24 × 2 = 48."
    },
    {
      id: 197,
      question: "Complete a sequência: 5, 20, 80, 320, ?",
      options: ["1285", "1280", "1275", "2560"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por 4. 320 × 4 = 1280."
    },
    {
      id: 198,
      question: "Complete a sequência: 9, 36, 144, 576, ?",
      options: ["2313", "4608", "2295", "2304"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 4. 576 × 4 = 2304."
    },
    {
      id: 199,
      question: "Complete a sequência: 7, -14, 28, -56, ?",
      options: ["112", "224", "119", "105"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por -2. -56 × -2 = 112."
    },
    {
      id: 200,
      question: "Complete a sequência: 3, 12, 48, 192, ?",
      options: ["768", "771", "765", "1536"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 4. 192 × 4 = 768."
    },
    {
      id: 201,
      question: "Se 20% de um número é igual a 80, qual é esse número?",
      options: ["380", "400", "800", "420"],
      correctIndex: 1,
      explanation: "Se 20% = 80, o número total é 80 ÷ (20/100) = 400."
    },
    {
      id: 202,
      question: "Se 10% de um número é igual a 12, qual é esse número?",
      options: ["130", "240", "110", "120"],
      correctIndex: 3,
      explanation: "Se 10% = 12, o número total é 12 ÷ (10/100) = 120."
    },
    {
      id: 203,
      question: "Se 40% de um número é igual a 54, qual é esse número?",
      options: ["135", "95", "175", "270"],
      correctIndex: 0,
      explanation: "Se 40% = 54, o número total é 54 ÷ (40/100) = 135."
    },
    {
      id: 204,
      question: "Se 5% de um número é igual a 6, qual é esse número?",
      options: ["125", "115", "240", "120"],
      correctIndex: 3,
      explanation: "Se 5% = 6, o número total é 6 ÷ (5/100) = 120."
    },
    {
      id: 205,
      question: "Se 75% de um número é igual a 48, qual é esse número?",
      options: ["139", "128", "64", "-11"],
      correctIndex: 2,
      explanation: "Se 75% = 48, o número total é 48 ÷ (75/100) = 64."
    },
    {
      id: 206,
      question: "Se 75% de um número é igual a 147, qual é esse número?",
      options: ["392", "196", "121", "271"],
      correctIndex: 1,
      explanation: "Se 75% = 147, o número total é 147 ÷ (75/100) = 196."
    },
    {
      id: 207,
      question: "Se 5% de um número é igual a 30, qual é esse número?",
      options: ["595", "1200", "600", "605"],
      correctIndex: 2,
      explanation: "Se 5% = 30, o número total é 30 ÷ (5/100) = 600."
    },
    {
      id: 208,
      question: "Se 20% de um número é igual a 62, qual é esse número?",
      options: ["290", "330", "620", "310"],
      correctIndex: 3,
      explanation: "Se 20% = 62, o número total é 62 ÷ (20/100) = 310."
    },
    {
      id: 209,
      question: "Se 10% de um número é igual a 60, qual é esse número?",
      options: ["610", "1200", "600", "590"],
      correctIndex: 2,
      explanation: "Se 10% = 60, o número total é 60 ÷ (10/100) = 600."
    },
    {
      id: 210,
      question: "Se 10% de um número é igual a 18, qual é esse número?",
      options: ["170", "190", "180", "360"],
      correctIndex: 2,
      explanation: "Se 10% = 18, o número total é 18 ÷ (10/100) = 180."
    },
    {
      id: 211,
      question: "Se 10% de um número é igual a 23, qual é esse número?",
      options: ["230", "220", "240", "460"],
      correctIndex: 0,
      explanation: "Se 10% = 23, o número total é 23 ÷ (10/100) = 230."
    },
    {
      id: 212,
      question: "Se 75% de um número é igual a 96, qual é esse número?",
      options: ["128", "53", "203", "256"],
      correctIndex: 0,
      explanation: "Se 75% = 96, o número total é 96 ÷ (75/100) = 128."
    },
    {
      id: 213,
      question: "Se 40% de um número é igual a 132, qual é esse número?",
      options: ["290", "330", "660", "370"],
      correctIndex: 1,
      explanation: "Se 40% = 132, o número total é 132 ÷ (40/100) = 330."
    },
    {
      id: 214,
      question: "Se 25% de um número é igual a 51, qual é esse número?",
      options: ["204", "229", "408", "179"],
      correctIndex: 0,
      explanation: "Se 25% = 51, o número total é 51 ÷ (25/100) = 204."
    },
    {
      id: 215,
      question: "Se 25% de um número é igual a 11, qual é esse número?",
      options: ["44", "19", "88", "69"],
      correctIndex: 0,
      explanation: "Se 25% = 11, o número total é 11 ÷ (25/100) = 44."
    },
    {
      id: 216,
      question: "Se 25% de um número é igual a 39, qual é esse número?",
      options: ["312", "181", "156", "131"],
      correctIndex: 2,
      explanation: "Se 25% = 39, o número total é 39 ÷ (25/100) = 156."
    },
    {
      id: 217,
      question: "Se 40% de um número é igual a 88, qual é esse número?",
      options: ["260", "220", "180", "440"],
      correctIndex: 1,
      explanation: "Se 40% = 88, o número total é 88 ÷ (40/100) = 220."
    },
    {
      id: 218,
      question: "Se 5% de um número é igual a 20, qual é esse número?",
      options: ["400", "395", "800", "405"],
      correctIndex: 0,
      explanation: "Se 5% = 20, o número total é 20 ÷ (5/100) = 400."
    },
    {
      id: 219,
      question: "Se 20% de um número é igual a 48, qual é esse número?",
      options: ["260", "220", "480", "240"],
      correctIndex: 3,
      explanation: "Se 20% = 48, o número total é 48 ÷ (20/100) = 240."
    },
    {
      id: 220,
      question: "Se 50% de um número é igual a 20, qual é esse número?",
      options: ["-10", "40", "90", "80"],
      correctIndex: 1,
      explanation: "Se 50% = 20, o número total é 20 ÷ (50/100) = 40."
    },
    {
      id: 221,
      question: "Se 40% de um número é igual a 80, qual é esse número?",
      options: ["240", "200", "400", "160"],
      correctIndex: 1,
      explanation: "Se 40% = 80, o número total é 80 ÷ (40/100) = 200."
    },
    {
      id: 222,
      question: "Se 20% de um número é igual a 11, qual é esse número?",
      options: ["35", "55", "75", "110"],
      correctIndex: 1,
      explanation: "Se 20% = 11, o número total é 11 ÷ (20/100) = 55."
    },
    {
      id: 223,
      question: "Se 20% de um número é igual a 71, qual é esse número?",
      options: ["375", "335", "355", "710"],
      correctIndex: 2,
      explanation: "Se 20% = 71, o número total é 71 ÷ (20/100) = 355."
    },
    {
      id: 224,
      question: "Se 50% de um número é igual a 76, qual é esse número?",
      options: ["102", "152", "202", "304"],
      correctIndex: 1,
      explanation: "Se 50% = 76, o número total é 76 ÷ (50/100) = 152."
    },
    {
      id: 225,
      question: "Se 50% de um número é igual a 62, qual é esse número?",
      options: ["248", "74", "124", "174"],
      correctIndex: 2,
      explanation: "Se 50% = 62, o número total é 62 ÷ (50/100) = 124."
    },
    {
      id: 226,
      question: "Se 10% de um número é igual a 6, qual é esse número?",
      options: ["70", "50", "120", "60"],
      correctIndex: 3,
      explanation: "Se 10% = 6, o número total é 6 ÷ (10/100) = 60."
    },
    {
      id: 227,
      question: "Se 5% de um número é igual a 18, qual é esse número?",
      options: ["365", "355", "360", "720"],
      correctIndex: 2,
      explanation: "Se 5% = 18, o número total é 18 ÷ (5/100) = 360."
    },
    {
      id: 228,
      question: "Se 20% de um número é igual a 22, qual é esse número?",
      options: ["110", "90", "220", "130"],
      correctIndex: 0,
      explanation: "Se 20% = 22, o número total é 22 ÷ (20/100) = 110."
    },
    {
      id: 229,
      question: "Se 60% de um número é igual a 141, qual é esse número?",
      options: ["295", "470", "175", "235"],
      correctIndex: 3,
      explanation: "Se 60% = 141, o número total é 141 ÷ (60/100) = 235."
    },
    {
      id: 230,
      question: "Se 60% de um número é igual a 168, qual é esse número?",
      options: ["280", "560", "340", "220"],
      correctIndex: 0,
      explanation: "Se 60% = 168, o número total é 168 ÷ (60/100) = 280."
    },
    {
      id: 231,
      question: "Se 40% de um número é igual a 170, qual é esse número?",
      options: ["850", "425", "465", "385"],
      correctIndex: 1,
      explanation: "Se 40% = 170, o número total é 170 ÷ (40/100) = 425."
    },
    {
      id: 232,
      question: "Se 50% de um número é igual a 14, qual é esse número?",
      options: ["28", "56", "-22", "78"],
      correctIndex: 0,
      explanation: "Se 50% = 14, o número total é 14 ÷ (50/100) = 28."
    },
    {
      id: 233,
      question: "Se 10% de um número é igual a 43, qual é esse número?",
      options: ["860", "440", "430", "420"],
      correctIndex: 2,
      explanation: "Se 10% = 43, o número total é 43 ÷ (10/100) = 430."
    },
    {
      id: 234,
      question: "Se 40% de um número é igual a 8, qual é esse número?",
      options: ["20", "-20", "40", "60"],
      correctIndex: 0,
      explanation: "Se 40% = 8, o número total é 8 ÷ (40/100) = 20."
    },
    {
      id: 235,
      question: "Se 60% de um número é igual a 18, qual é esse número?",
      options: ["30", "60", "-30", "90"],
      correctIndex: 0,
      explanation: "Se 60% = 18, o número total é 18 ÷ (60/100) = 30."
    },
    {
      id: 236,
      question: "Quantos metros há em 8 quilômetros?",
      options: ["800", "7000", "9000", "8000"],
      correctIndex: 3,
      explanation: "8 km × 1000 = 8000 metros."
    },
    {
      id: 237,
      question: "Quantos minutos há em 12 horas?",
      options: ["72", "720", "660", "780"],
      correctIndex: 1,
      explanation: "12 h × 60 = 720 minutos."
    },
    {
      id: 238,
      question: "Quantos centímetros há em 30 metros?",
      options: ["3000", "300", "2900", "3100"],
      correctIndex: 0,
      explanation: "30 m × 100 = 3000 centímetros."
    },
    {
      id: 239,
      question: "Quantos centímetros há em 26 metros?",
      options: ["260", "2700", "2500", "2600"],
      correctIndex: 3,
      explanation: "26 m × 100 = 2600 centímetros."
    },
    {
      id: 240,
      question: "Quantos segundos há em 2 minutos?",
      options: ["60", "180", "12", "120"],
      correctIndex: 3,
      explanation: "2 min × 60 = 120 segundos."
    },
    {
      id: 241,
      question: "Quantos minutos há em 27 horas?",
      options: ["1620", "162", "1560", "1680"],
      correctIndex: 0,
      explanation: "27 h × 60 = 1620 minutos."
    },
    {
      id: 242,
      question: "Quantos centímetros há em 18 metros?",
      options: ["1800", "1700", "180", "1900"],
      correctIndex: 0,
      explanation: "18 m × 100 = 1800 centímetros."
    },
    {
      id: 243,
      question: "Quantos metros há em 27 quilômetros?",
      options: ["26000", "2700", "28000", "27000"],
      correctIndex: 3,
      explanation: "27 km × 1000 = 27000 metros."
    },
    {
      id: 244,
      question: "Quantos gramas há em 22 quilogramas?",
      options: ["23000", "21000", "22000", "2200"],
      correctIndex: 2,
      explanation: "22 kg × 1000 = 22000 gramas."
    },
    {
      id: 245,
      question: "Quantos mililitros há em 6 litros?",
      options: ["5000", "6000", "600", "7000"],
      correctIndex: 1,
      explanation: "6 L × 1000 = 6000 mililitros."
    },
    {
      id: 246,
      question: "Quantos metros há em 25 quilômetros?",
      options: ["24000", "26000", "2500", "25000"],
      correctIndex: 3,
      explanation: "25 km × 1000 = 25000 metros."
    },
    {
      id: 247,
      question: "Quantos centímetros há em 25 metros?",
      options: ["2600", "2500", "250", "2400"],
      correctIndex: 1,
      explanation: "25 m × 100 = 2500 centímetros."
    },
    {
      id: 248,
      question: "Quantos mililitros há em 5 litros?",
      options: ["6000", "500", "5000", "4000"],
      correctIndex: 2,
      explanation: "5 L × 1000 = 5000 mililitros."
    },
    {
      id: 249,
      question: "Quantos mililitros há em 35 litros?",
      options: ["36000", "35000", "34000", "3500"],
      correctIndex: 1,
      explanation: "35 L × 1000 = 35000 mililitros."
    },
    {
      id: 250,
      question: "Quantos segundos há em 34 minutos?",
      options: ["2100", "204", "2040", "1980"],
      correctIndex: 2,
      explanation: "34 min × 60 = 2040 segundos."
    },
    {
      id: 251,
      question: "Quantos gramas há em 35 quilogramas?",
      options: ["3500", "34000", "36000", "35000"],
      correctIndex: 3,
      explanation: "35 kg × 1000 = 35000 gramas."
    },
    {
      id: 252,
      question: "Quantos segundos há em 16 minutos?",
      options: ["900", "960", "96", "1020"],
      correctIndex: 1,
      explanation: "16 min × 60 = 960 segundos."
    },
    {
      id: 253,
      question: "Quantos gramas há em 11 quilogramas?",
      options: ["12000", "11000", "1100", "10000"],
      correctIndex: 1,
      explanation: "11 kg × 1000 = 11000 gramas."
    },
    {
      id: 254,
      question: "Quantos gramas há em 4 quilogramas?",
      options: ["4000", "3000", "400", "5000"],
      correctIndex: 0,
      explanation: "4 kg × 1000 = 4000 gramas."
    },
    {
      id: 255,
      question: "Quantos minutos há em 35 horas?",
      options: ["2040", "2160", "2100", "210"],
      correctIndex: 2,
      explanation: "35 h × 60 = 2100 minutos."
    },
    {
      id: 256,
      question: "Quantos metros há em 3 quilômetros?",
      options: ["2000", "300", "3000", "4000"],
      correctIndex: 2,
      explanation: "3 km × 1000 = 3000 metros."
    },
    {
      id: 257,
      question: "Quantos metros há em 4 quilômetros?",
      options: ["3000", "400", "5000", "4000"],
      correctIndex: 3,
      explanation: "4 km × 1000 = 4000 metros."
    },
    {
      id: 258,
      question: "Quantos segundos há em 5 minutos?",
      options: ["240", "30", "360", "300"],
      correctIndex: 3,
      explanation: "5 min × 60 = 300 segundos."
    },
    {
      id: 259,
      question: "Quantos segundos há em 40 minutos?",
      options: ["2460", "2400", "240", "2340"],
      correctIndex: 1,
      explanation: "40 min × 60 = 2400 segundos."
    },
    {
      id: 260,
      question: "Quantos metros há em 22 quilômetros?",
      options: ["2200", "23000", "22000", "21000"],
      correctIndex: 2,
      explanation: "22 km × 1000 = 22000 metros."
    },
    {
      id: 261,
      question: "Quantos mililitros há em 34 litros?",
      options: ["34000", "33000", "35000", "3400"],
      correctIndex: 0,
      explanation: "34 L × 1000 = 34000 mililitros."
    },
    {
      id: 262,
      question: "Quantos gramas há em 40 quilogramas?",
      options: ["4000", "39000", "41000", "40000"],
      correctIndex: 3,
      explanation: "40 kg × 1000 = 40000 gramas."
    },
    {
      id: 263,
      question: "Quantos mililitros há em 20 litros?",
      options: ["20000", "2000", "19000", "21000"],
      correctIndex: 0,
      explanation: "20 L × 1000 = 20000 mililitros."
    },
    {
      id: 264,
      question: "Quantos gramas há em 15 quilogramas?",
      options: ["1500", "15000", "16000", "14000"],
      correctIndex: 1,
      explanation: "15 kg × 1000 = 15000 gramas."
    },
    {
      id: 265,
      question: "Quantos mililitros há em 21 litros?",
      options: ["22000", "20000", "21000", "2100"],
      correctIndex: 2,
      explanation: "21 L × 1000 = 21000 mililitros."
    },
    {
      id: 266,
      question: "Ana tem o dobro da idade de sua irmã. Se a irmã tem 37 anos, quantos anos tem Ana?",
      options: ["76", "74", "39", "72"],
      correctIndex: 1,
      explanation: "O dobro de 37 é 37 × 2 = 74."
    },
    {
      id: 267,
      question: "Bruno tem o dobro da idade de sua irmã. Se a irmã tem 36 anos, quantos anos tem Bruno?",
      options: ["72", "38", "74", "70"],
      correctIndex: 0,
      explanation: "O dobro de 36 é 36 × 2 = 72."
    },
    {
      id: 268,
      question: "Hoje, Carla tem 29 anos. Daqui a 15 anos, quantos anos Carla terá?",
      options: ["43", "59", "45", "44"],
      correctIndex: 3,
      explanation: "29 + 15 = 44 anos."
    },
    {
      id: 269,
      question: "Hoje, Diego tem 35 anos. Daqui a 7 anos, quantos anos Diego terá?",
      options: ["42", "43", "49", "41"],
      correctIndex: 0,
      explanation: "35 + 7 = 42 anos."
    },
    {
      id: 270,
      question: "Hoje, Elena tem 23 anos. Daqui a 13 anos, quantos anos Elena terá?",
      options: ["49", "35", "36", "37"],
      correctIndex: 2,
      explanation: "23 + 13 = 36 anos."
    },
    {
      id: 271,
      question: "Hoje, Felipe tem 42 anos. Daqui a 3 anos, quantos anos Felipe terá?",
      options: ["44", "46", "45", "48"],
      correctIndex: 2,
      explanation: "42 + 3 = 45 anos."
    },
    {
      id: 272,
      question: "Hoje, Gabriela tem 60 anos. Daqui a 8 anos, quantos anos Gabriela terá?",
      options: ["76", "67", "69", "68"],
      correctIndex: 3,
      explanation: "60 + 8 = 68 anos."
    },
    {
      id: 273,
      question: "Hugo tem o dobro da idade de sua irmã. Se a irmã tem 21 anos, quantos anos tem Hugo?",
      options: ["23", "44", "42", "40"],
      correctIndex: 2,
      explanation: "O dobro de 21 é 21 × 2 = 42."
    },
    {
      id: 274,
      question: "Iris tem o dobro da idade de sua irmã. Se a irmã tem 33 anos, quantos anos tem Iris?",
      options: ["64", "66", "68", "35"],
      correctIndex: 1,
      explanation: "O dobro de 33 é 33 × 2 = 66."
    },
    {
      id: 275,
      question: "Hoje, João tem 11 anos. Daqui a 14 anos, quantos anos João terá?",
      options: ["24", "25", "39", "26"],
      correctIndex: 1,
      explanation: "11 + 14 = 25 anos."
    },
    {
      id: 276,
      question: "Karina tem o dobro da idade de sua irmã. Se a irmã tem 34 anos, quantos anos tem Karina?",
      options: ["36", "68", "66", "70"],
      correctIndex: 1,
      explanation: "O dobro de 34 é 34 × 2 = 68."
    },
    {
      id: 277,
      question: "Hoje, Lucas tem 12 anos. Daqui a 14 anos, quantos anos Lucas terá?",
      options: ["25", "40", "27", "26"],
      correctIndex: 3,
      explanation: "12 + 14 = 26 anos."
    },
    {
      id: 278,
      question: "Hoje, Marina tem 29 anos. Daqui a 16 anos, quantos anos Marina terá?",
      options: ["44", "45", "61", "46"],
      correctIndex: 1,
      explanation: "29 + 16 = 45 anos."
    },
    {
      id: 279,
      question: "Hoje, Nicolas tem 35 anos. Daqui a 12 anos, quantos anos Nicolas terá?",
      options: ["47", "46", "59", "48"],
      correctIndex: 0,
      explanation: "35 + 12 = 47 anos."
    },
    {
      id: 280,
      question: "Olívia tem o dobro da idade de sua irmã. Se a irmã tem 17 anos, quantos anos tem Olívia?",
      options: ["34", "19", "32", "36"],
      correctIndex: 0,
      explanation: "O dobro de 17 é 17 × 2 = 34."
    },
    {
      id: 281,
      question: "Hoje, Pedro tem 27 anos. Daqui a 16 anos, quantos anos Pedro terá?",
      options: ["43", "42", "44", "59"],
      correctIndex: 0,
      explanation: "27 + 16 = 43 anos."
    },
    {
      id: 282,
      question: "Rafaela tem o dobro da idade de sua irmã. Se a irmã tem 6 anos, quantos anos tem Rafaela?",
      options: ["10", "14", "8", "12"],
      correctIndex: 3,
      explanation: "O dobro de 6 é 6 × 2 = 12."
    },
    {
      id: 283,
      question: "Samuel tem o dobro da idade de sua irmã. Se a irmã tem 17 anos, quantos anos tem Samuel?",
      options: ["36", "32", "19", "34"],
      correctIndex: 3,
      explanation: "O dobro de 17 é 17 × 2 = 34."
    },
    {
      id: 284,
      question: "Hoje, Tainá tem 51 anos. Daqui a 17 anos, quantos anos Tainá terá?",
      options: ["69", "85", "68", "67"],
      correctIndex: 2,
      explanation: "51 + 17 = 68 anos."
    },
    {
      id: 285,
      question: "Victor tem o dobro da idade de sua irmã. Se a irmã tem 4 anos, quantos anos tem Victor?",
      options: ["6", "10", "18", "8"],
      correctIndex: 3,
      explanation: "O dobro de 4 é 4 × 2 = 8."
    },
    {
      id: 286,
      question: "Complete a sequência de letras: G, J, M, P, ?",
      options: ["S", "V", "T", "R"],
      correctIndex: 0,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 287,
      question: "Complete a sequência de letras: A, E, I, M, ?",
      options: ["R", "U", "Q", "P"],
      correctIndex: 2,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 288,
      question: "Complete a sequência de letras: T, P, L, H, ?",
      options: ["C", "D", "E", "H"],
      correctIndex: 1,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 289,
      question: "Complete a sequência de letras: F, J, N, R, ?",
      options: ["U", "V", "Z", "W"],
      correctIndex: 1,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 290,
      question: "Complete a sequência de letras: F, H, J, L, ?",
      options: ["N", "M", "P", "O"],
      correctIndex: 0,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 291,
      question: "Complete a sequência de letras: T, R, P, N, ?",
      options: ["K", "N", "M", "L"],
      correctIndex: 3,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 292,
      question: "Complete a sequência de letras: H, K, N, Q, ?",
      options: ["U", "T", "W", "S"],
      correctIndex: 1,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 293,
      question: "Complete a sequência de letras: N, P, R, T, ?",
      options: ["W", "X", "U", "V"],
      correctIndex: 3,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 294,
      question: "Complete a sequência de letras: C, G, K, O, ?",
      options: ["R", "T", "W", "S"],
      correctIndex: 3,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 295,
      question: "Complete a sequência de letras: G, I, K, M, ?",
      options: ["P", "Q", "O", "N"],
      correctIndex: 2,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 296,
      question: "Complete a sequência de letras: S, P, M, J, ?",
      options: ["G", "H", "F", "J"],
      correctIndex: 0,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 297,
      question: "Complete a sequência de letras: X, U, R, O, ?",
      options: ["K", "L", "M", "O"],
      correctIndex: 1,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 298,
      question: "Complete a sequência de letras: H, L, P, T, ?",
      options: ["X", "W", "T", "Y"],
      correctIndex: 0,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 299,
      question: "Complete a sequência de letras: G, K, O, S, ?",
      options: ["S", "V", "W", "X"],
      correctIndex: 2,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 300,
      question: "Complete a sequência de letras: E, I, M, Q, ?",
      options: ["Y", "T", "U", "V"],
      correctIndex: 2,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 301,
      question: "Complete a sequência de letras: F, I, L, O, ?",
      options: ["U", "R", "Q", "S"],
      correctIndex: 1,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 302,
      question: "Complete a sequência de letras: B, F, J, N, ?",
      options: ["S", "Q", "V", "R"],
      correctIndex: 3,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 303,
      question: "Complete a sequência de letras: K, N, Q, T, ?",
      options: ["W", "V", "Z", "X"],
      correctIndex: 0,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 304,
      question: "Complete a sequência de letras: U, S, Q, O, ?",
      options: ["N", "O", "L", "M"],
      correctIndex: 3,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 305,
      question: "Complete a sequência de letras: K, I, G, E, ?",
      options: ["D", "E", "B", "C"],
      correctIndex: 3,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 306,
      question: "Complete a sequência de letras: Z, V, R, N, ?",
      options: ["N", "I", "J", "K"],
      correctIndex: 2,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 307,
      question: "Complete a sequência de letras: Y, U, Q, M, ?",
      options: ["H", "M", "J", "I"],
      correctIndex: 3,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 308,
      question: "Complete a sequência de letras: M, P, S, V, ?",
      options: ["Z", "X", "Y", "V"],
      correctIndex: 2,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 309,
      question: "Complete a sequência de letras: N, K, H, E, ?",
      options: ["E", "C", "B", "A"],
      correctIndex: 2,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 310,
      question: "Complete a sequência de letras: R, N, J, F, ?",
      options: ["A", "F", "C", "B"],
      correctIndex: 3,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 311,
      question: "156 itens foram divididos igualmente entre 6 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["25", "26", "27", "32"],
      correctIndex: 1,
      explanation: "156 ÷ 6 = 26."
    },
    {
      id: 312,
      question: "Uma caixa tem 27 itens. Se você tem 17 caixas iguais, quantos itens há ao todo?",
      options: ["459", "486", "476", "442"],
      correctIndex: 0,
      explanation: "27 × 17 = 459."
    },
    {
      id: 313,
      question: "Uma caixa tem 25 itens. Se você tem 19 caixas iguais, quantos itens há ao todo?",
      options: ["475", "494", "456", "500"],
      correctIndex: 0,
      explanation: "25 × 19 = 475."
    },
    {
      id: 314,
      question: "Uma caixa tem 31 itens. Se você tem 18 caixas iguais, quantos itens há ao todo?",
      options: ["558", "589", "540", "576"],
      correctIndex: 0,
      explanation: "31 × 18 = 558."
    },
    {
      id: 315,
      question: "45 itens foram divididos igualmente entre 3 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["15", "16", "18", "14"],
      correctIndex: 0,
      explanation: "45 ÷ 3 = 15."
    },
    {
      id: 316,
      question: "Uma caixa tem 5 itens. Se você tem 7 caixas iguais, quantos itens há ao todo?",
      options: ["35", "42", "28", "40"],
      correctIndex: 0,
      explanation: "5 × 7 = 35."
    },
    {
      id: 317,
      question: "Uma caixa tem 36 itens. Se você tem 3 caixas iguais, quantos itens há ao todo?",
      options: ["144", "105", "111", "108"],
      correctIndex: 3,
      explanation: "36 × 3 = 108."
    },
    {
      id: 318,
      question: "24 itens foram divididos igualmente entre 6 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["10", "5", "3", "4"],
      correctIndex: 3,
      explanation: "24 ÷ 6 = 4."
    },
    {
      id: 319,
      question: "Uma caixa tem 33 itens. Se você tem 12 caixas iguais, quantos itens há ao todo?",
      options: ["384", "396", "429", "408"],
      correctIndex: 1,
      explanation: "33 × 12 = 396."
    },
    {
      id: 320,
      question: "Uma caixa tem 21 itens. Se você tem 19 caixas iguais, quantos itens há ao todo?",
      options: ["399", "380", "418", "420"],
      correctIndex: 0,
      explanation: "21 × 19 = 399."
    },
    {
      id: 321,
      question: "Uma caixa tem 32 itens. Se você tem 2 caixas iguais, quantos itens há ao todo?",
      options: ["64", "66", "62", "96"],
      correctIndex: 0,
      explanation: "32 × 2 = 64."
    },
    {
      id: 322,
      question: "Uma caixa tem 28 itens. Se você tem 3 caixas iguais, quantos itens há ao todo?",
      options: ["112", "81", "84", "87"],
      correctIndex: 2,
      explanation: "28 × 3 = 84."
    },
    {
      id: 323,
      question: "220 itens foram divididos igualmente entre 11 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["31", "19", "21", "20"],
      correctIndex: 3,
      explanation: "220 ÷ 11 = 20."
    },
    {
      id: 324,
      question: "66 itens foram divididos igualmente entre 3 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["25", "22", "21", "23"],
      correctIndex: 1,
      explanation: "66 ÷ 3 = 22."
    },
    {
      id: 325,
      question: "9 itens foram divididos igualmente entre 3 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["2", "4", "3", "6"],
      correctIndex: 2,
      explanation: "9 ÷ 3 = 3."
    },
    {
      id: 326,
      question: "Uma caixa tem 9 itens. Se você tem 10 caixas iguais, quantos itens há ao todo?",
      options: ["90", "100", "80", "99"],
      correctIndex: 0,
      explanation: "9 × 10 = 90."
    },
    {
      id: 327,
      question: "Uma caixa tem 9 itens. Se você tem 16 caixas iguais, quantos itens há ao todo?",
      options: ["128", "160", "153", "144"],
      correctIndex: 3,
      explanation: "9 × 16 = 144."
    },
    {
      id: 328,
      question: "70 itens foram divididos igualmente entre 10 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["6", "17", "7", "8"],
      correctIndex: 2,
      explanation: "70 ÷ 10 = 7."
    },
    {
      id: 329,
      question: "Uma caixa tem 6 itens. Se você tem 12 caixas iguais, quantos itens há ao todo?",
      options: ["78", "72", "60", "84"],
      correctIndex: 1,
      explanation: "6 × 12 = 72."
    },
    {
      id: 330,
      question: "Uma caixa tem 39 itens. Se você tem 10 caixas iguais, quantos itens há ao todo?",
      options: ["400", "429", "390", "380"],
      correctIndex: 2,
      explanation: "39 × 10 = 390."
    },
    {
      id: 331,
      question: "Uma caixa tem 32 itens. Se você tem 19 caixas iguais, quantos itens há ao todo?",
      options: ["640", "608", "627", "589"],
      correctIndex: 1,
      explanation: "32 × 19 = 608."
    },
    {
      id: 332,
      question: "Uma caixa tem 26 itens. Se você tem 12 caixas iguais, quantos itens há ao todo?",
      options: ["312", "300", "324", "338"],
      correctIndex: 0,
      explanation: "26 × 12 = 312."
    },
    {
      id: 333,
      question: "18 itens foram divididos igualmente entre 3 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["5", "9", "6", "7"],
      correctIndex: 2,
      explanation: "18 ÷ 3 = 6."
    },
    {
      id: 334,
      question: "Uma caixa tem 34 itens. Se você tem 14 caixas iguais, quantos itens há ao todo?",
      options: ["490", "476", "462", "510"],
      correctIndex: 1,
      explanation: "34 × 14 = 476."
    },
    {
      id: 335,
      question: "132 itens foram divididos igualmente entre 11 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["11", "12", "23", "13"],
      correctIndex: 1,
      explanation: "132 ÷ 11 = 12."
    },
    {
      id: 336,
      question: "35 itens foram divididos igualmente entre 7 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["4", "6", "5", "12"],
      correctIndex: 2,
      explanation: "35 ÷ 7 = 5."
    },
    {
      id: 337,
      question: "Uma caixa tem 19 itens. Se você tem 4 caixas iguais, quantos itens há ao todo?",
      options: ["76", "95", "72", "80"],
      correctIndex: 0,
      explanation: "19 × 4 = 76."
    },
    {
      id: 338,
      question: "Uma caixa tem 38 itens. Se você tem 11 caixas iguais, quantos itens há ao todo?",
      options: ["407", "429", "456", "418"],
      correctIndex: 3,
      explanation: "38 × 11 = 418."
    },
    {
      id: 339,
      question: "60 itens foram divididos igualmente entre 10 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["16", "5", "6", "7"],
      correctIndex: 2,
      explanation: "60 ÷ 10 = 6."
    },
    {
      id: 340,
      question: "Uma caixa tem 32 itens. Se você tem 5 caixas iguais, quantos itens há ao todo?",
      options: ["192", "160", "165", "155"],
      correctIndex: 1,
      explanation: "32 × 5 = 160."
    },
    {
      id: 341,
      question: "Qual é o maior deserto quente do mundo?",
      options: ["Saara", "Gobi", "Kalahari", "Atacama"],
      correctIndex: 0,
      explanation: "O deserto do Saara, no norte da África, é o maior deserto quente do mundo."
    },
    {
      id: 342,
      question: "Quantos corações tem um polvo?",
      options: ["1", "2", "3", "4"],
      correctIndex: 2,
      explanation: "Os polvos têm 3 corações: dois bombeiam sangue para as guelras e um para o resto do corpo."
    },
    {
      id: 343,
      question: "Qual é a capital da Itália?",
      options: ["Milão", "Veneza", "Roma", "Nápoles"],
      correctIndex: 2,
      explanation: "Roma é a capital da Itália desde 1871."
    },
    {
      id: 344,
      question: "Em que país fica a Torre Eiffel?",
      options: ["Itália", "França", "Espanha", "Bélgica"],
      correctIndex: 1,
      explanation: "A Torre Eiffel fica em Paris, capital da França."
    },
    {
      id: 345,
      question: "Qual é o animal terrestre mais rápido do mundo?",
      options: ["O leão", "O cavalo", "A chita (guepardo)", "O avestruz"],
      correctIndex: 2,
      explanation: "A chita pode atingir mais de 100 km/h em curtas distâncias, sendo o animal terrestre mais rápido."
    },
    {
      id: 346,
      question: "Quantas cores tem o arco-íris tradicionalmente?",
      options: ["5", "6", "7", "8"],
      correctIndex: 2,
      explanation: "O arco-íris tradicional é composto por 7 cores: vermelho, laranja, amarelo, verde, azul, anil e violeta."
    },
    {
      id: 347,
      question: "Qual oceano banha o litoral leste do Brasil?",
      options: ["Pacífico", "Atlântico", "Índico", "Ártico"],
      correctIndex: 1,
      explanation: "O Oceano Atlântico banha toda a costa brasileira."
    },
    {
      id: 348,
      question: "Quem foi o primeiro presidente do Brasil?",
      options: ["Getúlio Vargas", "Deodoro da Fonseca", "Dom Pedro II", "Prudente de Morais"],
      correctIndex: 1,
      explanation: "Marechal Deodoro da Fonseca foi o primeiro presidente do Brasil, após a Proclamação da República em 1889."
    },
    {
      id: 349,
      question: "Qual é a montanha mais alta do mundo?",
      options: ["K2", "Monte Everest", "Kilimanjaro", "Aconcágua"],
      correctIndex: 1,
      explanation: "O Monte Everest, no Himalaia, é o ponto mais alto da Terra, com cerca de 8.849 metros."
    },
    {
      id: 350,
      question: "Quantos jogadores de cada time ficam em campo em uma partida oficial de futebol?",
      options: ["9", "10", "11", "12"],
      correctIndex: 2,
      explanation: "Cada time de futebol tem 11 jogadores em campo, incluindo o goleiro."
    },
    {
      id: 351,
      question: "Qual é o menor osso do corpo humano?",
      options: ["A falange", "O estribo (no ouvido)", "A clavícula", "A rótula"],
      correctIndex: 1,
      explanation: "O estribo, localizado no ouvido médio, é o menor osso do corpo humano."
    },
    {
      id: 352,
      question: "Em que ano começou a Segunda Guerra Mundial?",
      options: ["1935", "1939", "1941", "1945"],
      correctIndex: 1,
      explanation: "A Segunda Guerra Mundial começou em 1939, com a invasão da Polônia pela Alemanha."
    },
    {
      id: 353,
      question: "Qual é a língua mais falada no mundo como idioma nativo?",
      options: ["Inglês", "Espanhol", "Mandarim", "Hindi"],
      correctIndex: 2,
      explanation: "O mandarim é a língua com mais falantes nativos no mundo."
    },
    {
      id: 354,
      question: "Qual gás é mais abundante na atmosfera terrestre?",
      options: ["Oxigênio", "Gás carbônico", "Nitrogênio", "Hidrogênio"],
      correctIndex: 2,
      explanation: "O nitrogênio compõe cerca de 78% da atmosfera terrestre."
    },
    {
      id: 355,
      question: "Quantos minutos tem uma partida oficial de futebol, sem prorrogação?",
      options: ["60", "80", "90", "120"],
      correctIndex: 2,
      explanation: "Uma partida de futebol tem 90 minutos, divididos em dois tempos de 45."
    },
    {
      id: 356,
      question: "Qual é a capital do Canadá?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      correctIndex: 2,
      explanation: "Ottawa é a capital do Canadá, embora Toronto seja a cidade mais populosa."
    },
    {
      id: 357,
      question: "Quem escreveu a peça 'Romeu e Julieta'?",
      options: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "Jane Austen"],
      correctIndex: 1,
      explanation: "'Romeu e Julieta' é uma das tragédias mais famosas de William Shakespeare."
    },
    {
      id: 358,
      question: "Qual é o maior país do mundo em área territorial?",
      options: ["China", "Estados Unidos", "Canadá", "Rússia"],
      correctIndex: 3,
      explanation: "A Rússia é o maior país do mundo em área, ocupando partes da Europa e da Ásia."
    },
    {
      id: 359,
      question: "Quantos dentes tem, em média, um adulto humano, incluindo os sisos?",
      options: ["28", "30", "32", "34"],
      correctIndex: 2,
      explanation: "Um adulto humano tem, em média, 32 dentes contando com os 4 sisos."
    },
    {
      id: 360,
      question: "Qual instrumento musical tem teclas pretas e brancas?",
      options: ["O violino", "O piano", "A flauta", "O saxofone"],
      correctIndex: 1,
      explanation: "O piano é o instrumento clássico com teclas pretas e brancas."
    },
    {
      id: 361,
      question: "Em que continente fica o deserto do Saara?",
      options: ["Ásia", "América do Sul", "África", "Oceania"],
      correctIndex: 2,
      explanation: "O Saara está localizado no norte do continente africano."
    },
    {
      id: 362,
      question: "Qual é a velocidade aproximada do som no ar?",
      options: ["34 m/s", "340 m/s", "3.400 m/s", "34.000 m/s"],
      correctIndex: 1,
      explanation: "O som viaja a aproximadamente 340 metros por segundo no ar, ao nível do mar."
    },
    {
      id: 363,
      question: "Quantos planetas existem no sistema solar, sem contar Plutão (reclassificado como planeta anão)?",
      options: ["7", "8", "9", "10"],
      correctIndex: 1,
      explanation: "Desde 2006, o sistema solar é oficialmente composto por 8 planetas."
    },
    {
      id: 364,
      question: "Qual é a capital da Argentina?",
      options: ["Córdoba", "Rosário", "Buenos Aires", "Mendoza"],
      correctIndex: 2,
      explanation: "Buenos Aires é a capital e maior cidade da Argentina."
    },
    {
      id: 365,
      question: "Quem pintou a obra 'A Noite Estrelada'?",
      options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Salvador Dalí"],
      correctIndex: 2,
      explanation: "'A Noite Estrelada' é uma das obras mais famosas de Vincent van Gogh, pintada em 1889."
    },
    {
      id: 366,
      question: "Charada: quanto mais eu apago, mais eu ajudo. O que sou?",
      options: ["Uma borracha", "Um apagador", "Uma lousa", "Um marca-texto"],
      correctIndex: 0,
      explanation: "A borracha só é útil quando apaga o que está escrito, corrigindo erros."
    },
    {
      id: 367,
      question: "Charada: tenho uma agulha que aponta sempre para o mesmo lado, mas não costuro nada. O que sou?",
      options: ["Um relógio", "Uma bússola", "Uma balança", "Um velocímetro"],
      correctIndex: 1,
      explanation: "A agulha da bússola sempre aponta para o norte magnético."
    },
    {
      id: 368,
      question: "Charada: fecho tudo que você quer guardar, mas não tenho mãos. O que sou?",
      options: ["Uma gaveta", "Um cadeado", "Uma mala", "Um cofre"],
      correctIndex: 1,
      explanation: "O cadeado é usado para trancar e proteger o que está guardado."
    },
    {
      id: 369,
      question: "Charada: caio do céu, mas não me machuco; sem mim, as plantas não crescem. O que sou?",
      options: ["O sol", "A chuva", "O vento", "O orvalho"],
      correctIndex: 1,
      explanation: "A chuva cai do céu e é essencial para o crescimento das plantas."
    },
    {
      id: 370,
      question: "Charada: tenho luz própria à noite, mas de dia ninguém me nota. O que sou?",
      options: ["Uma estrela", "A lua", "Uma lanterna", "Um vaga-lume"],
      correctIndex: 1,
      explanation: "A lua é visível à noite, mas passa despercebida durante o dia claro."
    },
    {
      id: 371,
      question: "Charada: nasço líquido, mas fico duro dentro do congelador. O que sou?",
      options: ["O gelo", "A manteiga", "O chocolate", "A cera"],
      correctIndex: 0,
      explanation: "A água (líquida) se transforma em gelo (sólido) ao ser congelada."
    },
    {
      id: 372,
      question: "Charada: abro caminho no escuro, mas não tenho pernas. O que sou?",
      options: ["Uma porta", "Uma lanterna", "Uma chave", "Uma janela"],
      correctIndex: 1,
      explanation: "A lanterna ilumina o caminho em lugares escuros."
    },
    {
      id: 373,
      question: "Charada: bato bem forte quando você se assusta, mas não tenho mãos. O que sou?",
      options: ["Um tambor", "O coração", "Um sino", "Um despertador"],
      correctIndex: 1,
      explanation: "O coração bate mais forte e rápido em momentos de emoção ou susto."
    },
    {
      id: 374,
      question: "Charada: só apareço quando o sol se põe e desapareço quando ele nasce. O que sou?",
      options: ["A lua cheia", "A noite", "O crepúsculo", "A madrugada"],
      correctIndex: 1,
      explanation: "A noite começa ao pôr do sol e termina com o nascer do sol."
    },
    {
      id: 375,
      question: "Charada: tenho várias teclas, mas não abro nenhuma porta; faço música quando você me toca. O que sou?",
      options: ["Um piano", "Um teclado de computador", "Uma sanfona", "Um violão"],
      correctIndex: 0,
      explanation: "O piano tem teclas usadas para produzir música, não para abrir portas."
    },
    {
      id: 376,
      question: "Charada: escorro pela sua bochecha quando você fica muito triste ou muito feliz. O que sou?",
      options: ["Uma gota de suor", "Uma lágrima", "Uma gota de chuva", "Uma bolha"],
      correctIndex: 1,
      explanation: "As lágrimas podem surgir tanto em momentos de tristeza quanto de emoção intensa e alegria."
    },
    {
      id: 377,
      question: "Charada: tenho penas, mas não voo; ajudo a escrever à moda antiga. O que sou?",
      options: ["Uma pena de escrever", "Um travesseiro", "Um leque", "Uma flecha"],
      correctIndex: 0,
      explanation: "Antigamente, penas de aves eram usadas como caneta para escrever."
    },
    {
      id: 378,
      question: "Charada: sou uma casa sem portas nem janelas, e quem está lá dentro quer sair. O que sou?",
      options: ["Um ovo", "Uma caverna", "Um cofre", "Uma caixa"],
      correctIndex: 0,
      explanation: "O filhote dentro do ovo precisa quebrar a casca para poder sair."
    },
    {
      id: 379,
      question: "Charada: quanto mais eu ando, menos caminho me resta, mas nunca chego a lugar nenhum de verdade. O que sou?",
      options: ["Uma esteira", "Uma bicicleta", "Um carrossel", "Uma escada rolante"],
      correctIndex: 0,
      explanation: "Na esteira de academia, você caminha ou corre, mas permanece sempre no mesmo lugar."
    },
    {
      id: 380,
      question: "Charada: tenho corpo, mas não tenho alma; ganho forma quando você me veste. O que sou?",
      options: ["Um espantalho", "Um manequim", "Uma boneca", "Um travesseiro"],
      correctIndex: 1,
      explanation: "O manequim ganha a aparência de uma pessoa vestida, mas não tem vida."
    },
    {
      id: 381,
      question: "Charada: sou feito de água congelada, mas posso machucar quem estiver lá fora quando eu caio do céu. O que sou?",
      options: ["A neve", "O granizo", "O orvalho", "A geada"],
      correctIndex: 1,
      explanation: "O granizo é formado por pedras de gelo que caem durante tempestades, podendo causar estragos."
    },
    {
      id: 382,
      question: "Charada: nasço nas nuvens e brilho no céu logo depois da chuva parar. O que sou?",
      options: ["Um raio", "Um arco-íris", "Uma estrela cadente", "Um relâmpago"],
      correctIndex: 1,
      explanation: "O arco-íris aparece quando a luz do sol atravessa gotas de chuva no ar."
    },
    {
      id: 383,
      question: "Charada: sirvo para prender folhas de papel, mas não tenho mãos nem cola. O que sou?",
      options: ["Um clipe", "Uma fita adesiva", "Um grampeador", "Uma pasta"],
      correctIndex: 0,
      explanation: "O clipe prende papéis apenas pela pressão do seu formato dobrado, sem cola."
    },
    {
      id: 384,
      question: "Charada: sou pequena, mas sem mim, o cadeado não abre. O que sou?",
      options: ["Uma senha", "Uma chave", "Uma fechadura", "Um alarme"],
      correctIndex: 1,
      explanation: "A chave é o objeto pequeno necessário para destrancar um cadeado."
    },
    {
      id: 385,
      question: "Charada: encho de ar, mas não respiro; estouro com a picada de um alfinete. O que sou?",
      options: ["Um pneu", "Um balão", "Uma bola", "Um colchão inflável"],
      correctIndex: 1,
      explanation: "O balão é enchido com ar (ou gás) e estoura facilmente ao ser furado."
    },
    {
      id: 386,
      question: "Se hoje é quinta-feira, que dia da semana será daqui a 200 dias?",
      options: ["Domingo", "Segunda-feira", "Terça-feira", "Sábado"],
      correctIndex: 1,
      explanation: "200 dividido por 7 deixa resto 4. Avançando 4 dias a partir de quinta: sexta, sábado, domingo, segunda-feira."
    },
    {
      id: 387,
      question: "Uma caixa contém 8 bolas vermelhas e 8 bolas azuis, todas soltas. Quantas bolas você precisa tirar, no mínimo, para garantir 3 da mesma cor?",
      options: ["3", "4", "5", "6"],
      correctIndex: 2,
      explanation: "No pior caso, você tira 2 de cada cor (4 no total) sem formar trio. A 5ª bola garante 3 da mesma cor."
    },
    {
      id: 388,
      question: "Se o dobro de um número mais 5 é igual a 21, qual é esse número?",
      options: ["6", "7", "8", "9"],
      correctIndex: 2,
      explanation: "2x + 5 = 21 → 2x = 16 → x = 8."
    },
    {
      id: 389,
      question: "Numa fila, Marcos está na 5ª posição contando da frente e na 8ª posição contando de trás. Quantas pessoas há na fila?",
      options: ["11", "12", "13", "14"],
      correctIndex: 1,
      explanation: "Total = 5 + 8 - 1 (Marcos contado duas vezes) = 12 pessoas."
    },
    {
      id: 390,
      question: "Se 3 canetas custam R$9, quanto custam 7 canetas do mesmo tipo?",
      options: ["R$18", "R$21", "R$24", "R$15"],
      correctIndex: 1,
      explanation: "Cada caneta custa R$3 (9÷3). 7 canetas custam 7 × R$3 = R$21."
    },
    {
      id: 391,
      question: "Um código transforma cada letra na letra seguinte do alfabeto (A→B, B→C...). Qual é o código da palavra 'CASA'?",
      options: ["DBTB", "DBTA", "DATB", "DBUB"],
      correctIndex: 0,
      explanation: "C→D, A→B, S→T, A→B, formando 'DBTB'."
    },
    {
      id: 392,
      question: "Se depois de amanhã é sexta-feira, que dia da semana é hoje?",
      options: ["Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"],
      correctIndex: 1,
      explanation: "Depois de amanhã é hoje + 2 dias. Se hoje + 2 = sexta, hoje é quarta-feira."
    },
    {
      id: 393,
      question: "Numa prateleira há livros numerados de 1 a 50. Quantos desses números contêm o algarismo 5?",
      options: ["5", "6", "7", "8"],
      correctIndex: 1,
      explanation: "Os números são: 5, 15, 25, 35, 45 e 50 — total de 6 números com o algarismo 5."
    },
    {
      id: 394,
      question: "Se A é irmão de B, e B é irmão de C, o que podemos afirmar sobre A e C?",
      options: ["A e C também são irmãos", "A e C não têm relação necessária", "C é pai de A", "Não é possível determinar nada"],
      correctIndex: 0,
      explanation: "Sendo o parentesco de irmãos definido por compartilhar os mesmos pais, essa relação é transitiva: A e C também são irmãos."
    },
    {
      id: 395,
      question: "Se X + Y = 10 e X - Y = 4, qual é o valor de X?",
      options: ["6", "7", "8", "5"],
      correctIndex: 1,
      explanation: "Somando as duas equações: 2X = 14 → X = 7."
    },
    {
      id: 396,
      question: "Numa sala com 5 pessoas, cada uma aperta a mão de todas as outras exatamente uma vez. Quantos apertos de mão acontecem ao todo?",
      options: ["8", "9", "10", "12"],
      correctIndex: 2,
      explanation: "O total de combinações de 2 pessoas entre 5 é 10 (fórmula de combinação C(5,2) = 10)."
    },
    {
      id: 397,
      question: "Quantos graus o ponteiro das horas de um relógio percorre em 4 horas?",
      options: ["90°", "100°", "120°", "150°"],
      correctIndex: 2,
      explanation: "O ponteiro das horas percorre 30° a cada hora. Em 4 horas: 4 × 30° = 120°."
    },
    {
      id: 398,
      question: "Se todos os Xandu são Ypsilon, e nenhum Ypsilon é Zeta, o que podemos concluir?",
      options: ["Todo Zeta é Xandu", "Nenhum Xandu é Zeta", "Algum Xandu é Zeta", "Todo Ypsilon é Xandu"],
      correctIndex: 1,
      explanation: "Se Xandu está contido em Ypsilon, e Ypsilon não tem interseção com Zeta, então Xandu também não tem interseção com Zeta."
    },
    {
      id: 399,
      question: "Numa corrida, Ana termina antes de Bruno, mas depois de Carla. Diego termina antes de Carla. Quem venceu a corrida?",
      options: ["Ana", "Bruno", "Carla", "Diego"],
      correctIndex: 3,
      explanation: "A ordem de chegada é: Diego, Carla, Ana, Bruno — portanto Diego venceu."
    },
    {
      id: 400,
      question: "Um código transforma cada número em seu dobro menos 1 (regra: n → 2n-1). Qual número originou o resultado 15?",
      options: ["6", "7", "8", "9"],
      correctIndex: 2,
      explanation: "2n - 1 = 15 → 2n = 16 → n = 8."
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
   * Retorna uma cópia da pergunta com as 4 alternativas em ordem embaralhada,
   * ajustando correctIndex de acordo. Isso evita que a resposta certa fique
   * concentrada sempre nas mesmas posições (ex: sempre "B" ou "C"), o que
   * daria uma vantagem indevida a quem tenta adivinhar por padrão.
   */
  function shuffleOptions(question) {
    const order = shuffleArray([0, 1, 2, 3]);
    const newOptions = order.map(function (i) { return question.options[i]; });
    const newCorrectIndex = order.indexOf(question.correctIndex);
    return Object.assign({}, question, {
      options: newOptions,
      correctIndex: newCorrectIndex
    });
  }

  /**
   * Sorteia `count` perguntas aleatórias e em ordem aleatória a partir de um pool.
   * Também embaralha a ordem das alternativas de cada pergunta sorteada.
   * Se o pool tiver menos perguntas que `count`, retorna o pool inteiro embaralhado.
   */
  function pickRandom(pool, count) {
    const shuffled = shuffleArray(pool || []);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    return selected.map(shuffleOptions);
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
