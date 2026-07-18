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
