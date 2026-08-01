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
    },
    {
      id: 401,
      question: "Complete a sequência: 80, 67, 54, 41, 28, ?",
      options: ["15", "2", "-11", "28"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 13 em relação ao anterior. 28 - 13 = 15."
    },
    {
      id: 402,
      question: "Complete a sequência: 89, 86, 83, 80, 77, ?",
      options: ["74", "71", "68", "77"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 3 em relação ao anterior. 77 - 3 = 74."
    },
    {
      id: 403,
      question: "Complete a sequência: 86, 78, 70, 62, 54, ?",
      options: ["30", "54", "46", "38"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 8 em relação ao anterior. 54 - 8 = 46."
    },
    {
      id: 404,
      question: "Complete a sequência: 14, 19, 24, 29, 34, ?",
      options: ["39", "34", "44", "49"],
      correctIndex: 0,
      explanation: "Cada termo soma 5 em relação ao anterior. 34 + 5 = 39."
    },
    {
      id: 405,
      question: "Complete a sequência: 83, 96, 109, 122, 135, ?",
      options: ["148", "174", "161", "135"],
      correctIndex: 0,
      explanation: "Cada termo soma 13 em relação ao anterior. 135 + 13 = 148."
    },
    {
      id: 406,
      question: "Complete a sequência: 18, 22, 26, 30, 34, ?",
      options: ["46", "34", "42", "38"],
      correctIndex: 3,
      explanation: "Cada termo soma 4 em relação ao anterior. 34 + 4 = 38."
    },
    {
      id: 407,
      question: "Complete a sequência: 24, 20, 16, 12, 8, ?",
      options: ["4", "-4", "8", "0"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 4 em relação ao anterior. 8 - 4 = 4."
    },
    {
      id: 408,
      question: "Complete a sequência: 29, 33, 37, 41, 45, ?",
      options: ["49", "57", "45", "53"],
      correctIndex: 0,
      explanation: "Cada termo soma 4 em relação ao anterior. 45 + 4 = 49."
    },
    {
      id: 409,
      question: "Complete a sequência: 70, 59, 48, 37, 26, ?",
      options: ["26", "-7", "4", "15"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 11 em relação ao anterior. 26 - 11 = 15."
    },
    {
      id: 410,
      question: "Complete a sequência: 74, 78, 82, 86, 90, ?",
      options: ["98", "102", "90", "94"],
      correctIndex: 3,
      explanation: "Cada termo soma 4 em relação ao anterior. 90 + 4 = 94."
    },
    {
      id: 411,
      question: "Complete a sequência: 75, 89, 103, 117, 131, ?",
      options: ["131", "159", "145", "173"],
      correctIndex: 2,
      explanation: "Cada termo soma 14 em relação ao anterior. 131 + 14 = 145."
    },
    {
      id: 412,
      question: "Complete a sequência: 80, 66, 52, 38, 24, ?",
      options: ["24", "-18", "10", "-4"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 14 em relação ao anterior. 24 - 14 = 10."
    },
    {
      id: 413,
      question: "Complete a sequência: 71, 79, 87, 95, 103, ?",
      options: ["119", "103", "127", "111"],
      correctIndex: 3,
      explanation: "Cada termo soma 8 em relação ao anterior. 103 + 8 = 111."
    },
    {
      id: 414,
      question: "Complete a sequência: 18, 20, 22, 24, 26, ?",
      options: ["30", "26", "32", "28"],
      correctIndex: 3,
      explanation: "Cada termo soma 2 em relação ao anterior. 26 + 2 = 28."
    },
    {
      id: 415,
      question: "Complete a sequência: 52, 48, 44, 40, 36, ?",
      options: ["36", "32", "28", "24"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 4 em relação ao anterior. 36 - 4 = 32."
    },
    {
      id: 416,
      question: "Complete a sequência: 6, 20, 34, 48, 62, ?",
      options: ["90", "76", "104", "62"],
      correctIndex: 1,
      explanation: "Cada termo soma 14 em relação ao anterior. 62 + 14 = 76."
    },
    {
      id: 417,
      question: "Complete a sequência: 54, 46, 38, 30, 22, ?",
      options: ["-2", "22", "6", "14"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 8 em relação ao anterior. 22 - 8 = 14."
    },
    {
      id: 418,
      question: "Complete a sequência: 10, 12, 14, 16, 18, ?",
      options: ["18", "20", "22", "24"],
      correctIndex: 1,
      explanation: "Cada termo soma 2 em relação ao anterior. 18 + 2 = 20."
    },
    {
      id: 419,
      question: "Complete a sequência: 81, 79, 77, 75, 73, ?",
      options: ["69", "71", "73", "67"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 2 em relação ao anterior. 73 - 2 = 71."
    },
    {
      id: 420,
      question: "Complete a sequência: 57, 52, 47, 42, 37, ?",
      options: ["32", "37", "22", "27"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 5 em relação ao anterior. 37 - 5 = 32."
    },
    {
      id: 421,
      question: "Complete a sequência: 14, 15, 16, 17, 18, ?",
      options: ["19", "18", "20", "21"],
      correctIndex: 0,
      explanation: "Cada termo soma 1 em relação ao anterior. 18 + 1 = 19."
    },
    {
      id: 422,
      question: "Complete a sequência: 81, 89, 97, 105, 113, ?",
      options: ["129", "113", "137", "121"],
      correctIndex: 3,
      explanation: "Cada termo soma 8 em relação ao anterior. 113 + 8 = 121."
    },
    {
      id: 423,
      question: "Complete a sequência: 67, 71, 75, 79, 83, ?",
      options: ["87", "95", "83", "91"],
      correctIndex: 0,
      explanation: "Cada termo soma 4 em relação ao anterior. 83 + 4 = 87."
    },
    {
      id: 424,
      question: "Complete a sequência: 48, 34, 20, 6, -8, ?",
      options: ["-8", "-22", "-50", "-36"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 14 em relação ao anterior. -8 - 14 = -22."
    },
    {
      id: 425,
      question: "Complete a sequência: 30, 19, 8, -3, -14, ?",
      options: ["-25", "-47", "-14", "-36"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 11 em relação ao anterior. -14 - 11 = -25."
    },
    {
      id: 426,
      question: "Complete a sequência: 17, 26, 35, 44, 53, ?",
      options: ["71", "80", "62", "53"],
      correctIndex: 2,
      explanation: "Cada termo soma 9 em relação ao anterior. 53 + 9 = 62."
    },
    {
      id: 427,
      question: "Complete a sequência: 50, 41, 32, 23, 14, ?",
      options: ["5", "-4", "-13", "14"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 9 em relação ao anterior. 14 - 9 = 5."
    },
    {
      id: 428,
      question: "Complete a sequência: 26, 30, 34, 38, 42, ?",
      options: ["54", "46", "50", "42"],
      correctIndex: 1,
      explanation: "Cada termo soma 4 em relação ao anterior. 42 + 4 = 46."
    },
    {
      id: 429,
      question: "Complete a sequência: 18, 14, 10, 6, 2, ?",
      options: ["-2", "-6", "-10", "2"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 4 em relação ao anterior. 2 - 4 = -2."
    },
    {
      id: 430,
      question: "Complete a sequência: 52, 43, 34, 25, 16, ?",
      options: ["7", "16", "-11", "-2"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 9 em relação ao anterior. 16 - 9 = 7."
    },
    {
      id: 431,
      question: "Complete a sequência: 1, 11, 21, 31, 41, ?",
      options: ["61", "51", "71", "41"],
      correctIndex: 1,
      explanation: "Cada termo soma 10 em relação ao anterior. 41 + 10 = 51."
    },
    {
      id: 432,
      question: "Complete a sequência: 13, 16, 19, 22, 25, ?",
      options: ["28", "25", "34", "31"],
      correctIndex: 0,
      explanation: "Cada termo soma 3 em relação ao anterior. 25 + 3 = 28."
    },
    {
      id: 433,
      question: "Complete a sequência: 88, 89, 90, 91, 92, ?",
      options: ["94", "95", "93", "92"],
      correctIndex: 2,
      explanation: "Cada termo soma 1 em relação ao anterior. 92 + 1 = 93."
    },
    {
      id: 434,
      question: "Complete a sequência: 70, 58, 46, 34, 22, ?",
      options: ["-14", "-2", "10", "22"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 12 em relação ao anterior. 22 - 12 = 10."
    },
    {
      id: 435,
      question: "Complete a sequência: 38, 28, 18, 8, -2, ?",
      options: ["-2", "-12", "-22", "-32"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 10 em relação ao anterior. -2 - 10 = -12."
    },
    {
      id: 436,
      question: "Complete a sequência: 18, 30, 42, 54, 66, ?",
      options: ["66", "78", "102", "90"],
      correctIndex: 1,
      explanation: "Cada termo soma 12 em relação ao anterior. 66 + 12 = 78."
    },
    {
      id: 437,
      question: "Complete a sequência: 58, 62, 66, 70, 74, ?",
      options: ["82", "78", "86", "74"],
      correctIndex: 1,
      explanation: "Cada termo soma 4 em relação ao anterior. 74 + 4 = 78."
    },
    {
      id: 438,
      question: "Complete a sequência: 15, 24, 33, 42, 51, ?",
      options: ["60", "51", "69", "78"],
      correctIndex: 0,
      explanation: "Cada termo soma 9 em relação ao anterior. 51 + 9 = 60."
    },
    {
      id: 439,
      question: "Complete a sequência: 40, 35, 30, 25, 20, ?",
      options: ["20", "5", "10", "15"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 5 em relação ao anterior. 20 - 5 = 15."
    },
    {
      id: 440,
      question: "Complete a sequência: 48, 60, 72, 84, 96, ?",
      options: ["96", "132", "108", "120"],
      correctIndex: 2,
      explanation: "Cada termo soma 12 em relação ao anterior. 96 + 12 = 108."
    },
    {
      id: 441,
      question: "Complete a sequência: 30, 23, 16, 9, 2, ?",
      options: ["2", "-19", "-12", "-5"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 7 em relação ao anterior. 2 - 7 = -5."
    },
    {
      id: 442,
      question: "Complete a sequência: 81, 67, 53, 39, 25, ?",
      options: ["25", "-17", "11", "-3"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 14 em relação ao anterior. 25 - 14 = 11."
    },
    {
      id: 443,
      question: "Complete a sequência: 39, 27, 15, 3, -9, ?",
      options: ["-21", "-33", "-45", "-9"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 12 em relação ao anterior. -9 - 12 = -21."
    },
    {
      id: 444,
      question: "Complete a sequência: 1, -3, -7, -11, -15, ?",
      options: ["-19", "-15", "-23", "-27"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 4 em relação ao anterior. -15 - 4 = -19."
    },
    {
      id: 445,
      question: "Complete a sequência: 36, 50, 64, 78, 92, ?",
      options: ["92", "106", "120", "134"],
      correctIndex: 1,
      explanation: "Cada termo soma 14 em relação ao anterior. 92 + 14 = 106."
    },
    {
      id: 446,
      question: "Complete a sequência: 23, 11, -1, -13, -25, ?",
      options: ["-61", "-49", "-25", "-37"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 12 em relação ao anterior. -25 - 12 = -37."
    },
    {
      id: 447,
      question: "Complete a sequência: 35, 22, 9, -4, -17, ?",
      options: ["-43", "-56", "-17", "-30"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 13 em relação ao anterior. -17 - 13 = -30."
    },
    {
      id: 448,
      question: "Complete a sequência: 59, 48, 37, 26, 15, ?",
      options: ["15", "-7", "4", "-18"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 11 em relação ao anterior. 15 - 11 = 4."
    },
    {
      id: 449,
      question: "Complete a sequência: 75, 79, 83, 87, 91, ?",
      options: ["95", "99", "91", "103"],
      correctIndex: 0,
      explanation: "Cada termo soma 4 em relação ao anterior. 91 + 4 = 95."
    },
    {
      id: 450,
      question: "Complete a sequência: 51, 50, 49, 48, 47, ?",
      options: ["46", "44", "47", "45"],
      correctIndex: 0,
      explanation: "Cada termo subtrai 1 em relação ao anterior. 47 - 1 = 46."
    },
    {
      id: 451,
      question: "Complete a sequência: 33, 23, 13, 3, -7, ?",
      options: ["-27", "-7", "-17", "-37"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 10 em relação ao anterior. -7 - 10 = -17."
    },
    {
      id: 452,
      question: "Complete a sequência: 23, 37, 51, 65, 79, ?",
      options: ["121", "107", "93", "79"],
      correctIndex: 2,
      explanation: "Cada termo soma 14 em relação ao anterior. 79 + 14 = 93."
    },
    {
      id: 453,
      question: "Complete a sequência: 49, 62, 75, 88, 101, ?",
      options: ["140", "114", "127", "101"],
      correctIndex: 1,
      explanation: "Cada termo soma 13 em relação ao anterior. 101 + 13 = 114."
    },
    {
      id: 454,
      question: "Complete a sequência: 12, 23, 34, 45, 56, ?",
      options: ["67", "89", "56", "78"],
      correctIndex: 0,
      explanation: "Cada termo soma 11 em relação ao anterior. 56 + 11 = 67."
    },
    {
      id: 455,
      question: "Complete a sequência: 33, 36, 39, 42, 45, ?",
      options: ["48", "51", "45", "54"],
      correctIndex: 0,
      explanation: "Cada termo soma 3 em relação ao anterior. 45 + 3 = 48."
    },
    {
      id: 456,
      question: "Complete a sequência: 77, 82, 87, 92, 97, ?",
      options: ["97", "107", "102", "112"],
      correctIndex: 2,
      explanation: "Cada termo soma 5 em relação ao anterior. 97 + 5 = 102."
    },
    {
      id: 457,
      question: "Complete a sequência: 6, 10, 14, 18, 22, ?",
      options: ["22", "26", "34", "30"],
      correctIndex: 1,
      explanation: "Cada termo soma 4 em relação ao anterior. 22 + 4 = 26."
    },
    {
      id: 458,
      question: "Complete a sequência: 53, 47, 41, 35, 29, ?",
      options: ["29", "17", "11", "23"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 6 em relação ao anterior. 29 - 6 = 23."
    },
    {
      id: 459,
      question: "Complete a sequência: 16, 28, 40, 52, 64, ?",
      options: ["88", "64", "100", "76"],
      correctIndex: 3,
      explanation: "Cada termo soma 12 em relação ao anterior. 64 + 12 = 76."
    },
    {
      id: 460,
      question: "Complete a sequência: 33, 29, 25, 21, 17, ?",
      options: ["17", "5", "13", "9"],
      correctIndex: 2,
      explanation: "Cada termo subtrai 4 em relação ao anterior. 17 - 4 = 13."
    },
    {
      id: 461,
      question: "Complete a sequência: 47, 53, 59, 65, 71, ?",
      options: ["89", "77", "83", "71"],
      correctIndex: 1,
      explanation: "Cada termo soma 6 em relação ao anterior. 71 + 6 = 77."
    },
    {
      id: 462,
      question: "Complete a sequência: 33, 42, 51, 60, 69, ?",
      options: ["78", "96", "69", "87"],
      correctIndex: 0,
      explanation: "Cada termo soma 9 em relação ao anterior. 69 + 9 = 78."
    },
    {
      id: 463,
      question: "Complete a sequência: 7, 6, 5, 4, 3, ?",
      options: ["1", "0", "3", "2"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 1 em relação ao anterior. 3 - 1 = 2."
    },
    {
      id: 464,
      question: "Complete a sequência: 86, 92, 98, 104, 110, ?",
      options: ["122", "128", "116", "110"],
      correctIndex: 2,
      explanation: "Cada termo soma 6 em relação ao anterior. 110 + 6 = 116."
    },
    {
      id: 465,
      question: "Complete a sequência: 5, 6, 7, 8, 9, ?",
      options: ["11", "9", "10", "12"],
      correctIndex: 2,
      explanation: "Cada termo soma 1 em relação ao anterior. 9 + 1 = 10."
    },
    {
      id: 466,
      question: "Complete a sequência: 67, 63, 59, 55, 51, ?",
      options: ["51", "47", "43", "39"],
      correctIndex: 1,
      explanation: "Cada termo subtrai 4 em relação ao anterior. 51 - 4 = 47."
    },
    {
      id: 467,
      question: "Complete a sequência: 31, 39, 47, 55, 63, ?",
      options: ["71", "79", "63", "87"],
      correctIndex: 0,
      explanation: "Cada termo soma 8 em relação ao anterior. 63 + 8 = 71."
    },
    {
      id: 468,
      question: "Complete a sequência: 45, 31, 17, 3, -11, ?",
      options: ["-11", "-39", "-53", "-25"],
      correctIndex: 3,
      explanation: "Cada termo subtrai 14 em relação ao anterior. -11 - 14 = -25."
    },
    {
      id: 469,
      question: "Complete a sequência: 29, 36, 43, 50, 57, ?",
      options: ["57", "78", "64", "71"],
      correctIndex: 2,
      explanation: "Cada termo soma 7 em relação ao anterior. 57 + 7 = 64."
    },
    {
      id: 470,
      question: "Complete a sequência: 24, 28, 32, 36, 40, ?",
      options: ["48", "44", "40", "52"],
      correctIndex: 1,
      explanation: "Cada termo soma 4 em relação ao anterior. 40 + 4 = 44."
    },
    {
      id: 471,
      question: "Complete a sequência: 23, -92, 368, -1472, ?",
      options: ["5888", "5911", "5865", "11776"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por -4. -1472 × -4 = 5888."
    },
    {
      id: 472,
      question: "Complete a sequência: 30, 60, 120, 240, ?",
      options: ["480", "510", "450", "960"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 2. 240 × 2 = 480."
    },
    {
      id: 473,
      question: "Complete a sequência: 29, 87, 261, 783, ?",
      options: ["2320", "2378", "4698", "2349"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 3. 783 × 3 = 2349."
    },
    {
      id: 474,
      question: "Complete a sequência: 30, 120, 480, 1920, ?",
      options: ["7710", "15360", "7680", "7650"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 4. 1920 × 4 = 7680."
    },
    {
      id: 475,
      question: "Complete a sequência: 22, -88, 352, -1408, ?",
      options: ["5654", "5610", "5632", "11264"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por -4. -1408 × -4 = 5632."
    },
    {
      id: 476,
      question: "Complete a sequência: 15, 60, 240, 960, ?",
      options: ["3840", "3825", "7680", "3855"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 4. 960 × 4 = 3840."
    },
    {
      id: 477,
      question: "Complete a sequência: 18, -72, 288, -1152, ?",
      options: ["9216", "4590", "4626", "4608"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por -4. -1152 × -4 = 4608."
    },
    {
      id: 478,
      question: "Complete a sequência: 16, -32, 64, -128, ?",
      options: ["272", "512", "240", "256"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por -2. -128 × -2 = 256."
    },
    {
      id: 479,
      question: "Complete a sequência: 29, 145, 725, 3625, ?",
      options: ["18096", "36250", "18154", "18125"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 5. 3625 × 5 = 18125."
    },
    {
      id: 480,
      question: "Complete a sequência: 15, 30, 60, 120, ?",
      options: ["240", "225", "255", "480"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 2. 120 × 2 = 240."
    },
    {
      id: 481,
      question: "Complete a sequência: 14, 70, 350, 1750, ?",
      options: ["8764", "8736", "17500", "8750"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 5. 1750 × 5 = 8750."
    },
    {
      id: 482,
      question: "Complete a sequência: 24, -48, 96, -192, ?",
      options: ["360", "408", "384", "768"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por -2. -192 × -2 = 384."
    },
    {
      id: 483,
      question: "Complete a sequência: 26, -52, 104, -208, ?",
      options: ["442", "390", "832", "416"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por -2. -208 × -2 = 416."
    },
    {
      id: 484,
      question: "Complete a sequência: 16, 48, 144, 432, ?",
      options: ["2592", "1280", "1296", "1312"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 3. 432 × 3 = 1296."
    },
    {
      id: 485,
      question: "Complete a sequência: 8, -24, 72, -216, ?",
      options: ["656", "640", "1296", "648"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por -3. -216 × -3 = 648."
    },
    {
      id: 486,
      question: "Complete a sequência: 11, -44, 176, -704, ?",
      options: ["2805", "5632", "2827", "2816"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por -4. -704 × -4 = 2816."
    },
    {
      id: 487,
      question: "Complete a sequência: 22, 88, 352, 1408, ?",
      options: ["5654", "5610", "5632", "11264"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 4. 1408 × 4 = 5632."
    },
    {
      id: 488,
      question: "Complete a sequência: 2, -8, 32, -128, ?",
      options: ["1024", "512", "510", "514"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -4. -128 × -4 = 512."
    },
    {
      id: 489,
      question: "Complete a sequência: 28, -56, 112, -224, ?",
      options: ["420", "448", "896", "476"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -2. -224 × -2 = 448."
    },
    {
      id: 490,
      question: "Complete a sequência: 6, 12, 24, 48, ?",
      options: ["90", "192", "96", "102"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 2. 48 × 2 = 96."
    },
    {
      id: 491,
      question: "Complete a sequência: 9, -36, 144, -576, ?",
      options: ["2295", "2304", "4608", "2313"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -4. -576 × -4 = 2304."
    },
    {
      id: 492,
      question: "Complete a sequência: 26, 104, 416, 1664, ?",
      options: ["6656", "13312", "6630", "6682"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 4. 1664 × 4 = 6656."
    },
    {
      id: 493,
      question: "Complete a sequência: 6, -18, 54, -162, ?",
      options: ["480", "486", "492", "972"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -3. -162 × -3 = 486."
    },
    {
      id: 494,
      question: "Complete a sequência: 21, 42, 84, 168, ?",
      options: ["336", "315", "357", "672"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 2. 168 × 2 = 336."
    },
    {
      id: 495,
      question: "Complete a sequência: 6, 24, 96, 384, ?",
      options: ["1542", "1530", "3072", "1536"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 4. 384 × 4 = 1536."
    },
    {
      id: 496,
      question: "Complete a sequência: 25, 50, 100, 200, ?",
      options: ["400", "375", "425", "800"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 2. 200 × 2 = 400."
    },
    {
      id: 497,
      question: "Complete a sequência: 20, -40, 80, -160, ?",
      options: ["640", "320", "300", "340"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por -2. -160 × -2 = 320."
    },
    {
      id: 498,
      question: "Complete a sequência: 7, 35, 175, 875, ?",
      options: ["4375", "4382", "4368", "8750"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 5. 875 × 5 = 4375."
    },
    {
      id: 499,
      question: "Complete a sequência: 19, -38, 76, -152, ?",
      options: ["304", "323", "285", "608"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por -2. -152 × -2 = 304."
    },
    {
      id: 500,
      question: "Complete a sequência: 19, 95, 475, 2375, ?",
      options: ["11875", "11894", "11856", "23750"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 5. 2375 × 5 = 11875."
    },
    {
      id: 501,
      question: "Complete a sequência: 24, 48, 96, 192, ?",
      options: ["360", "384", "768", "408"],
      correctIndex: 1,
      explanation: "Cada termo é multiplicado por 2. 192 × 2 = 384."
    },
    {
      id: 502,
      question: "Complete a sequência: 11, 22, 44, 88, ?",
      options: ["352", "165", "187", "176"],
      correctIndex: 3,
      explanation: "Cada termo é multiplicado por 2. 88 × 2 = 176."
    },
    {
      id: 503,
      question: "Complete a sequência: 20, 40, 80, 160, ?",
      options: ["320", "300", "640", "340"],
      correctIndex: 0,
      explanation: "Cada termo é multiplicado por 2. 160 × 2 = 320."
    },
    {
      id: 504,
      question: "Complete a sequência: 28, -84, 252, -756, ?",
      options: ["4536", "2240", "2268", "2296"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por -3. -756 × -3 = 2268."
    },
    {
      id: 505,
      question: "Complete a sequência: 23, 69, 207, 621, ?",
      options: ["3726", "1840", "1863", "1886"],
      correctIndex: 2,
      explanation: "Cada termo é multiplicado por 3. 621 × 3 = 1863."
    },
    {
      id: 506,
      question: "Se 40% de um número é igual a 46, qual é esse número?",
      options: ["155", "115", "230", "75"],
      correctIndex: 1,
      explanation: "Se 40% = 46, o número total é 46 ÷ (40/100) = 115."
    },
    {
      id: 507,
      question: "Se 75% de um número é igual a 102, qual é esse número?",
      options: ["136", "211", "61", "272"],
      correctIndex: 0,
      explanation: "Se 75% = 102, o número total é 102 ÷ (75/100) = 136."
    },
    {
      id: 508,
      question: "Se 15% de um número é igual a 45, qual é esse número?",
      options: ["285", "315", "300", "600"],
      correctIndex: 2,
      explanation: "Se 15% = 45, o número total é 45 ÷ (15/100) = 300."
    },
    {
      id: 509,
      question: "Se 15% de um número é igual a 78, qual é esse número?",
      options: ["505", "1040", "535", "520"],
      correctIndex: 3,
      explanation: "Se 15% = 78, o número total é 78 ÷ (15/100) = 520."
    },
    {
      id: 510,
      question: "Se 5% de um número é igual a 58, qual é esse número?",
      options: ["2320", "1165", "1155", "1160"],
      correctIndex: 3,
      explanation: "Se 5% = 58, o número total é 58 ÷ (5/100) = 1160."
    },
    {
      id: 511,
      question: "Se 20% de um número é igual a 40, qual é esse número?",
      options: ["180", "200", "400", "220"],
      correctIndex: 1,
      explanation: "Se 20% = 40, o número total é 40 ÷ (20/100) = 200."
    },
    {
      id: 512,
      question: "Se 50% de um número é igual a 37, qual é esse número?",
      options: ["148", "74", "124", "24"],
      correctIndex: 1,
      explanation: "Se 50% = 37, o número total é 37 ÷ (50/100) = 74."
    },
    {
      id: 513,
      question: "Se 15% de um número é igual a 123, qual é esse número?",
      options: ["835", "820", "805", "1640"],
      correctIndex: 1,
      explanation: "Se 15% = 123, o número total é 123 ÷ (15/100) = 820."
    },
    {
      id: 514,
      question: "Se 5% de um número é igual a 56, qual é esse número?",
      options: ["2240", "1125", "1120", "1115"],
      correctIndex: 2,
      explanation: "Se 5% = 56, o número total é 56 ÷ (5/100) = 1120."
    },
    {
      id: 515,
      question: "Se 60% de um número é igual a 12, qual é esse número?",
      options: ["80", "20", "-40", "40"],
      correctIndex: 1,
      explanation: "Se 60% = 12, o número total é 12 ÷ (60/100) = 20."
    },
    {
      id: 516,
      question: "Se 20% de um número é igual a 2, qual é esse número?",
      options: ["30", "20", "10", "-10"],
      correctIndex: 2,
      explanation: "Se 20% = 2, o número total é 2 ÷ (20/100) = 10."
    },
    {
      id: 517,
      question: "Se 20% de um número é igual a 54, qual é esse número?",
      options: ["540", "270", "290", "250"],
      correctIndex: 1,
      explanation: "Se 20% = 54, o número total é 54 ÷ (20/100) = 270."
    },
    {
      id: 518,
      question: "Se 30% de um número é igual a 45, qual é esse número?",
      options: ["300", "120", "150", "180"],
      correctIndex: 2,
      explanation: "Se 30% = 45, o número total é 45 ÷ (30/100) = 150."
    },
    {
      id: 519,
      question: "Se 75% de um número é igual a 30, qual é esse número?",
      options: ["115", "40", "80", "-35"],
      correctIndex: 1,
      explanation: "Se 75% = 30, o número total é 30 ÷ (75/100) = 40."
    },
    {
      id: 520,
      question: "Se 15% de um número é igual a 57, qual é esse número?",
      options: ["395", "365", "760", "380"],
      correctIndex: 3,
      explanation: "Se 15% = 57, o número total é 57 ÷ (15/100) = 380."
    },
    {
      id: 521,
      question: "Se 20% de um número é igual a 25, qual é esse número?",
      options: ["145", "125", "250", "105"],
      correctIndex: 1,
      explanation: "Se 20% = 25, o número total é 25 ÷ (20/100) = 125."
    },
    {
      id: 522,
      question: "Se 40% de um número é igual a 52, qual é esse número?",
      options: ["90", "260", "130", "170"],
      correctIndex: 2,
      explanation: "Se 40% = 52, o número total é 52 ÷ (40/100) = 130."
    },
    {
      id: 523,
      question: "Se 30% de um número é igual a 120, qual é esse número?",
      options: ["430", "400", "800", "370"],
      correctIndex: 1,
      explanation: "Se 30% = 120, o número total é 120 ÷ (30/100) = 400."
    },
    {
      id: 524,
      question: "Se 30% de um número é igual a 108, qual é esse número?",
      options: ["390", "360", "720", "330"],
      correctIndex: 1,
      explanation: "Se 30% = 108, o número total é 108 ÷ (30/100) = 360."
    },
    {
      id: 525,
      question: "Se 75% de um número é igual a 174, qual é esse número?",
      options: ["464", "232", "307", "157"],
      correctIndex: 1,
      explanation: "Se 75% = 174, o número total é 174 ÷ (75/100) = 232."
    },
    {
      id: 526,
      question: "Se 75% de um número é igual a 87, qual é esse número?",
      options: ["232", "191", "41", "116"],
      correctIndex: 3,
      explanation: "Se 75% = 87, o número total é 87 ÷ (75/100) = 116."
    },
    {
      id: 527,
      question: "Se 25% de um número é igual a 30, qual é esse número?",
      options: ["240", "145", "95", "120"],
      correctIndex: 3,
      explanation: "Se 25% = 30, o número total é 30 ÷ (25/100) = 120."
    },
    {
      id: 528,
      question: "Se 10% de um número é igual a 41, qual é esse número?",
      options: ["820", "400", "410", "420"],
      correctIndex: 2,
      explanation: "Se 10% = 41, o número total é 41 ÷ (10/100) = 410."
    },
    {
      id: 529,
      question: "Se 5% de um número é igual a 39, qual é esse número?",
      options: ["780", "775", "785", "1560"],
      correctIndex: 0,
      explanation: "Se 5% = 39, o número total é 39 ÷ (5/100) = 780."
    },
    {
      id: 530,
      question: "Se 50% de um número é igual a 21, qual é esse número?",
      options: ["-8", "42", "92", "84"],
      correctIndex: 1,
      explanation: "Se 50% = 21, o número total é 21 ÷ (50/100) = 42."
    },
    {
      id: 531,
      question: "Se 30% de um número é igual a 114, qual é esse número?",
      options: ["410", "380", "350", "760"],
      correctIndex: 1,
      explanation: "Se 30% = 114, o número total é 114 ÷ (30/100) = 380."
    },
    {
      id: 532,
      question: "Se 15% de um número é igual a 39, qual é esse número?",
      options: ["245", "520", "275", "260"],
      correctIndex: 3,
      explanation: "Se 15% = 39, o número total é 39 ÷ (15/100) = 260."
    },
    {
      id: 533,
      question: "Se 40% de um número é igual a 106, qual é esse número?",
      options: ["305", "225", "530", "265"],
      correctIndex: 3,
      explanation: "Se 40% = 106, o número total é 106 ÷ (40/100) = 265."
    },
    {
      id: 534,
      question: "Se 50% de um número é igual a 51, qual é esse número?",
      options: ["102", "152", "204", "52"],
      correctIndex: 0,
      explanation: "Se 50% = 51, o número total é 51 ÷ (50/100) = 102."
    },
    {
      id: 535,
      question: "Se 25% de um número é igual a 5, qual é esse número?",
      options: ["20", "45", "40", "-5"],
      correctIndex: 0,
      explanation: "Se 25% = 5, o número total é 5 ÷ (25/100) = 20."
    },
    {
      id: 536,
      question: "Se 15% de um número é igual a 138, qual é esse número?",
      options: ["935", "905", "920", "1840"],
      correctIndex: 2,
      explanation: "Se 15% = 138, o número total é 138 ÷ (15/100) = 920."
    },
    {
      id: 537,
      question: "Se 15% de um número é igual a 105, qual é esse número?",
      options: ["715", "700", "685", "1400"],
      correctIndex: 1,
      explanation: "Se 15% = 105, o número total é 105 ÷ (15/100) = 700."
    },
    {
      id: 538,
      question: "Se 15% de um número é igual a 93, qual é esse número?",
      options: ["635", "620", "1240", "605"],
      correctIndex: 1,
      explanation: "Se 15% = 93, o número total é 93 ÷ (15/100) = 620."
    },
    {
      id: 539,
      question: "Se 20% de um número é igual a 58, qual é esse número?",
      options: ["580", "270", "310", "290"],
      correctIndex: 3,
      explanation: "Se 20% = 58, o número total é 58 ÷ (20/100) = 290."
    },
    {
      id: 540,
      question: "Se 50% de um número é igual a 55, qual é esse número?",
      options: ["160", "220", "110", "60"],
      correctIndex: 2,
      explanation: "Se 50% = 55, o número total é 55 ÷ (50/100) = 110."
    },
    {
      id: 541,
      question: "Se 20% de um número é igual a 57, qual é esse número?",
      options: ["265", "305", "570", "285"],
      correctIndex: 3,
      explanation: "Se 20% = 57, o número total é 57 ÷ (20/100) = 285."
    },
    {
      id: 542,
      question: "Se 25% de um número é igual a 43, qual é esse número?",
      options: ["197", "147", "172", "344"],
      correctIndex: 2,
      explanation: "Se 25% = 43, o número total é 43 ÷ (25/100) = 172."
    },
    {
      id: 543,
      question: "Se 25% de um número é igual a 14, qual é esse número?",
      options: ["31", "81", "112", "56"],
      correctIndex: 3,
      explanation: "Se 25% = 14, o número total é 14 ÷ (25/100) = 56."
    },
    {
      id: 544,
      question: "Se 25% de um número é igual a 20, qual é esse número?",
      options: ["80", "160", "55", "105"],
      correctIndex: 0,
      explanation: "Se 25% = 20, o número total é 20 ÷ (25/100) = 80."
    },
    {
      id: 545,
      question: "Se 5% de um número é igual a 51, qual é esse número?",
      options: ["1015", "1025", "1020", "2040"],
      correctIndex: 2,
      explanation: "Se 5% = 51, o número total é 51 ÷ (5/100) = 1020."
    },
    {
      id: 546,
      question: "Se 50% de um número é igual a 25, qual é esse número?",
      options: ["60", "50", "0", "100"],
      correctIndex: 1,
      explanation: "Se 50% = 25, o número total é 25 ÷ (50/100) = 50."
    },
    {
      id: 547,
      question: "Se 75% de um número é igual a 168, qual é esse número?",
      options: ["224", "149", "448", "299"],
      correctIndex: 0,
      explanation: "Se 75% = 168, o número total é 168 ÷ (75/100) = 224."
    },
    {
      id: 548,
      question: "Se 10% de um número é igual a 5, qual é esse número?",
      options: ["100", "60", "40", "50"],
      correctIndex: 3,
      explanation: "Se 10% = 5, o número total é 5 ÷ (10/100) = 50."
    },
    {
      id: 549,
      question: "Se 5% de um número é igual a 50, qual é esse número?",
      options: ["995", "2000", "1005", "1000"],
      correctIndex: 3,
      explanation: "Se 5% = 50, o número total é 50 ÷ (5/100) = 1000."
    },
    {
      id: 550,
      question: "Se 75% de um número é igual a 177, qual é esse número?",
      options: ["236", "161", "472", "311"],
      correctIndex: 0,
      explanation: "Se 75% = 177, o número total é 177 ÷ (75/100) = 236."
    },
    {
      id: 551,
      question: "Um produto custa R$350 e está com 50% de desconto. Qual é o preço final?",
      options: ["165", "185", "350", "175"],
      correctIndex: 3,
      explanation: "O desconto é 50% de R$350 = R$175. Preço final: R$350 - R$175 = R$175."
    },
    {
      id: 552,
      question: "Um produto custa R$360 e está com 50% de desconto. Qual é o preço final?",
      options: ["360", "180", "170", "190"],
      correctIndex: 1,
      explanation: "O desconto é 50% de R$360 = R$180. Preço final: R$360 - R$180 = R$180."
    },
    {
      id: 553,
      question: "Um produto custa R$310 e está com 50% de desconto. Qual é o preço final?",
      options: ["145", "155", "165", "310"],
      correctIndex: 1,
      explanation: "O desconto é 50% de R$310 = R$155. Preço final: R$310 - R$155 = R$155."
    },
    {
      id: 554,
      question: "Um produto custa R$260 e está com 30% de desconto. Qual é o preço final?",
      options: ["192", "172", "182", "260"],
      correctIndex: 2,
      explanation: "O desconto é 30% de R$260 = R$78. Preço final: R$260 - R$78 = R$182."
    },
    {
      id: 555,
      question: "Um produto custa R$350 e está com 40% de desconto. Qual é o preço final?",
      options: ["210", "220", "200", "350"],
      correctIndex: 0,
      explanation: "O desconto é 40% de R$350 = R$140. Preço final: R$350 - R$140 = R$210."
    },
    {
      id: 556,
      question: "Um produto custa R$260 e está com 10% de desconto. Qual é o preço final?",
      options: ["224", "244", "234", "260"],
      correctIndex: 2,
      explanation: "O desconto é 10% de R$260 = R$26. Preço final: R$260 - R$26 = R$234."
    },
    {
      id: 557,
      question: "Um produto custa R$230 e está com 20% de desconto. Qual é o preço final?",
      options: ["184", "230", "174", "194"],
      correctIndex: 0,
      explanation: "O desconto é 20% de R$230 = R$46. Preço final: R$230 - R$46 = R$184."
    },
    {
      id: 558,
      question: "Um produto custa R$120 e está com 10% de desconto. Qual é o preço final?",
      options: ["118", "120", "108", "98"],
      correctIndex: 2,
      explanation: "O desconto é 10% de R$120 = R$12. Preço final: R$120 - R$12 = R$108."
    },
    {
      id: 559,
      question: "Um produto custa R$150 e está com 30% de desconto. Qual é o preço final?",
      options: ["150", "115", "95", "105"],
      correctIndex: 3,
      explanation: "O desconto é 30% de R$150 = R$45. Preço final: R$150 - R$45 = R$105."
    },
    {
      id: 560,
      question: "Um produto custa R$140 e está com 40% de desconto. Qual é o preço final?",
      options: ["84", "74", "140", "94"],
      correctIndex: 0,
      explanation: "O desconto é 40% de R$140 = R$56. Preço final: R$140 - R$56 = R$84."
    },
    {
      id: 561,
      question: "Um produto custa R$140 e está com 15% de desconto. Qual é o preço final?",
      options: ["109", "119", "140", "129"],
      correctIndex: 1,
      explanation: "O desconto é 15% de R$140 = R$21. Preço final: R$140 - R$21 = R$119."
    },
    {
      id: 562,
      question: "Um produto custa R$160 e está com 40% de desconto. Qual é o preço final?",
      options: ["96", "86", "106", "160"],
      correctIndex: 0,
      explanation: "O desconto é 40% de R$160 = R$64. Preço final: R$160 - R$64 = R$96."
    },
    {
      id: 563,
      question: "Um produto custa R$350 e está com 30% de desconto. Qual é o preço final?",
      options: ["255", "350", "245", "235"],
      correctIndex: 2,
      explanation: "O desconto é 30% de R$350 = R$105. Preço final: R$350 - R$105 = R$245."
    },
    {
      id: 564,
      question: "Um produto custa R$330 e está com 40% de desconto. Qual é o preço final?",
      options: ["188", "208", "198", "330"],
      correctIndex: 2,
      explanation: "O desconto é 40% de R$330 = R$132. Preço final: R$330 - R$132 = R$198."
    },
    {
      id: 565,
      question: "Um produto custa R$400 e está com 50% de desconto. Qual é o preço final?",
      options: ["210", "190", "200", "400"],
      correctIndex: 2,
      explanation: "O desconto é 50% de R$400 = R$200. Preço final: R$400 - R$200 = R$200."
    },
    {
      id: 566,
      question: "Um produto custa R$260 e está com 20% de desconto. Qual é o preço final?",
      options: ["218", "260", "208", "198"],
      correctIndex: 2,
      explanation: "O desconto é 20% de R$260 = R$52. Preço final: R$260 - R$52 = R$208."
    },
    {
      id: 567,
      question: "Um produto custa R$160 e está com 15% de desconto. Qual é o preço final?",
      options: ["126", "160", "146", "136"],
      correctIndex: 3,
      explanation: "O desconto é 15% de R$160 = R$24. Preço final: R$160 - R$24 = R$136."
    },
    {
      id: 568,
      question: "Um produto custa R$180 e está com 15% de desconto. Qual é o preço final?",
      options: ["143", "153", "163", "180"],
      correctIndex: 1,
      explanation: "O desconto é 15% de R$180 = R$27. Preço final: R$180 - R$27 = R$153."
    },
    {
      id: 569,
      question: "Um produto custa R$100 e está com 30% de desconto. Qual é o preço final?",
      options: ["70", "60", "80", "100"],
      correctIndex: 0,
      explanation: "O desconto é 30% de R$100 = R$30. Preço final: R$100 - R$30 = R$70."
    },
    {
      id: 570,
      question: "Um produto custa R$110 e está com 40% de desconto. Qual é o preço final?",
      options: ["66", "110", "76", "56"],
      correctIndex: 0,
      explanation: "O desconto é 40% de R$110 = R$44. Preço final: R$110 - R$44 = R$66."
    },
    {
      id: 571,
      question: "Um produto custa R$220 e está com 10% de desconto. Qual é o preço final?",
      options: ["198", "220", "208", "188"],
      correctIndex: 0,
      explanation: "O desconto é 10% de R$220 = R$22. Preço final: R$220 - R$22 = R$198."
    },
    {
      id: 572,
      question: "Um produto custa R$200 e está com 10% de desconto. Qual é o preço final?",
      options: ["180", "170", "190", "200"],
      correctIndex: 0,
      explanation: "O desconto é 10% de R$200 = R$20. Preço final: R$200 - R$20 = R$180."
    },
    {
      id: 573,
      question: "Um produto custa R$220 e está com 15% de desconto. Qual é o preço final?",
      options: ["220", "177", "187", "197"],
      correctIndex: 2,
      explanation: "O desconto é 15% de R$220 = R$33. Preço final: R$220 - R$33 = R$187."
    },
    {
      id: 574,
      question: "Um produto custa R$320 e está com 15% de desconto. Qual é o preço final?",
      options: ["262", "320", "272", "282"],
      correctIndex: 2,
      explanation: "O desconto é 15% de R$320 = R$48. Preço final: R$320 - R$48 = R$272."
    },
    {
      id: 575,
      question: "Um produto custa R$350 e está com 20% de desconto. Qual é o preço final?",
      options: ["280", "350", "290", "270"],
      correctIndex: 0,
      explanation: "O desconto é 20% de R$350 = R$70. Preço final: R$350 - R$70 = R$280."
    },
    {
      id: 576,
      question: "Um produto custa R$280 e está com 40% de desconto. Qual é o preço final?",
      options: ["178", "280", "158", "168"],
      correctIndex: 3,
      explanation: "O desconto é 40% de R$280 = R$112. Preço final: R$280 - R$112 = R$168."
    },
    {
      id: 577,
      question: "Um produto custa R$130 e está com 50% de desconto. Qual é o preço final?",
      options: ["130", "55", "65", "75"],
      correctIndex: 2,
      explanation: "O desconto é 50% de R$130 = R$65. Preço final: R$130 - R$65 = R$65."
    },
    {
      id: 578,
      question: "Um produto custa R$230 e está com 40% de desconto. Qual é o preço final?",
      options: ["230", "128", "148", "138"],
      correctIndex: 3,
      explanation: "O desconto é 40% de R$230 = R$92. Preço final: R$230 - R$92 = R$138."
    },
    {
      id: 579,
      question: "Um produto custa R$260 e está com 25% de desconto. Qual é o preço final?",
      options: ["260", "205", "185", "195"],
      correctIndex: 3,
      explanation: "O desconto é 25% de R$260 = R$65. Preço final: R$260 - R$65 = R$195."
    },
    {
      id: 580,
      question: "Um produto custa R$300 e está com 40% de desconto. Qual é o preço final?",
      options: ["180", "300", "170", "190"],
      correctIndex: 0,
      explanation: "O desconto é 40% de R$300 = R$120. Preço final: R$300 - R$120 = R$180."
    },
    {
      id: 581,
      question: "Um produto custa R$310 e está com 20% de desconto. Qual é o preço final?",
      options: ["248", "258", "310", "238"],
      correctIndex: 0,
      explanation: "O desconto é 20% de R$310 = R$62. Preço final: R$310 - R$62 = R$248."
    },
    {
      id: 582,
      question: "Um produto custa R$170 e está com 30% de desconto. Qual é o preço final?",
      options: ["119", "129", "109", "170"],
      correctIndex: 0,
      explanation: "O desconto é 30% de R$170 = R$51. Preço final: R$170 - R$51 = R$119."
    },
    {
      id: 583,
      question: "Um produto custa R$320 e está com 50% de desconto. Qual é o preço final?",
      options: ["160", "170", "150", "320"],
      correctIndex: 0,
      explanation: "O desconto é 50% de R$320 = R$160. Preço final: R$320 - R$160 = R$160."
    },
    {
      id: 584,
      question: "Um produto custa R$250 e está com 10% de desconto. Qual é o preço final?",
      options: ["225", "235", "250", "215"],
      correctIndex: 0,
      explanation: "O desconto é 10% de R$250 = R$25. Preço final: R$250 - R$25 = R$225."
    },
    {
      id: 585,
      question: "Um produto custa R$320 e está com 20% de desconto. Qual é o preço final?",
      options: ["320", "246", "266", "256"],
      correctIndex: 3,
      explanation: "O desconto é 20% de R$320 = R$64. Preço final: R$320 - R$64 = R$256."
    },
    {
      id: 586,
      question: "Quantos mililitros há em 14 litros?",
      options: ["14000", "13000", "15000", "1400"],
      correctIndex: 0,
      explanation: "14 L × 1000 = 14000 mililitros."
    },
    {
      id: 587,
      question: "Quantos centavos há em 40 reais?",
      options: ["3900", "400", "4000", "4100"],
      correctIndex: 2,
      explanation: "40 R$ × 100 = 4000 centavos."
    },
    {
      id: 588,
      question: "Quantos unidades há em 44 dúzias?",
      options: ["528", "540", "516", "52.8"],
      correctIndex: 0,
      explanation: "44 dz × 12 = 528 unidades."
    },
    {
      id: 589,
      question: "Quantos mililitros há em 29 litros?",
      options: ["30000", "29000", "2900", "28000"],
      correctIndex: 1,
      explanation: "29 L × 1000 = 29000 mililitros."
    },
    {
      id: 590,
      question: "Quantos unidades há em 37 dúzias?",
      options: ["444", "432", "456", "44.4"],
      correctIndex: 0,
      explanation: "37 dz × 12 = 444 unidades."
    },
    {
      id: 591,
      question: "Quantos centavos há em 3 reais?",
      options: ["200", "30", "300", "400"],
      correctIndex: 2,
      explanation: "3 R$ × 100 = 300 centavos."
    },
    {
      id: 592,
      question: "Quantos metros há em 40 quilômetros?",
      options: ["4000", "41000", "39000", "40000"],
      correctIndex: 3,
      explanation: "40 km × 1000 = 40000 metros."
    },
    {
      id: 593,
      question: "Quantos gramas há em 10 quilogramas?",
      options: ["10000", "1000", "11000", "9000"],
      correctIndex: 0,
      explanation: "10 kg × 1000 = 10000 gramas."
    },
    {
      id: 594,
      question: "Quantos mililitros há em 12 litros?",
      options: ["13000", "12000", "1200", "11000"],
      correctIndex: 1,
      explanation: "12 L × 1000 = 12000 mililitros."
    },
    {
      id: 595,
      question: "Quantos centímetros há em 24 metros?",
      options: ["2500", "240", "2400", "2300"],
      correctIndex: 2,
      explanation: "24 m × 100 = 2400 centímetros."
    },
    {
      id: 596,
      question: "Quantos centavos há em 12 reais?",
      options: ["120", "1100", "1200", "1300"],
      correctIndex: 2,
      explanation: "12 R$ × 100 = 1200 centavos."
    },
    {
      id: 597,
      question: "Quantos centímetros há em 29 metros?",
      options: ["3000", "2900", "2800", "290"],
      correctIndex: 1,
      explanation: "29 m × 100 = 2900 centímetros."
    },
    {
      id: 598,
      question: "Quantos segundos há em 3 minutos?",
      options: ["180", "18", "240", "120"],
      correctIndex: 0,
      explanation: "3 min × 60 = 180 segundos."
    },
    {
      id: 599,
      question: "Quantos metros há em 14 quilômetros?",
      options: ["15000", "13000", "14000", "1400"],
      correctIndex: 2,
      explanation: "14 km × 1000 = 14000 metros."
    },
    {
      id: 600,
      question: "Quantos metros há em 20 quilômetros?",
      options: ["19000", "2000", "20000", "21000"],
      correctIndex: 2,
      explanation: "20 km × 1000 = 20000 metros."
    },
    {
      id: 601,
      question: "Quantos minutos há em 45 horas?",
      options: ["2760", "2640", "2700", "270"],
      correctIndex: 2,
      explanation: "45 h × 60 = 2700 minutos."
    },
    {
      id: 602,
      question: "Quantos centímetros há em 27 metros?",
      options: ["2800", "2600", "2700", "270"],
      correctIndex: 2,
      explanation: "27 m × 100 = 2700 centímetros."
    },
    {
      id: 603,
      question: "Quantos centímetros há em 37 metros?",
      options: ["3800", "3600", "3700", "370"],
      correctIndex: 2,
      explanation: "37 m × 100 = 3700 centímetros."
    },
    {
      id: 604,
      question: "Quantos unidades há em 17 dúzias?",
      options: ["216", "20.4", "204", "192"],
      correctIndex: 2,
      explanation: "17 dz × 12 = 204 unidades."
    },
    {
      id: 605,
      question: "Quantos gramas há em 34 quilogramas?",
      options: ["3400", "33000", "35000", "34000"],
      correctIndex: 3,
      explanation: "34 kg × 1000 = 34000 gramas."
    },
    {
      id: 606,
      question: "Quantos minutos há em 11 horas?",
      options: ["66", "600", "720", "660"],
      correctIndex: 3,
      explanation: "11 h × 60 = 660 minutos."
    },
    {
      id: 607,
      question: "Quantos unidades há em 12 dúzias?",
      options: ["14.4", "144", "132", "156"],
      correctIndex: 1,
      explanation: "12 dz × 12 = 144 unidades."
    },
    {
      id: 608,
      question: "Quantos centavos há em 25 reais?",
      options: ["2400", "250", "2600", "2500"],
      correctIndex: 3,
      explanation: "25 R$ × 100 = 2500 centavos."
    },
    {
      id: 609,
      question: "Quantos mililitros há em 19 litros?",
      options: ["19000", "1900", "20000", "18000"],
      correctIndex: 0,
      explanation: "19 L × 1000 = 19000 mililitros."
    },
    {
      id: 610,
      question: "Quantos centavos há em 10 reais?",
      options: ["1000", "900", "100", "1100"],
      correctIndex: 0,
      explanation: "10 R$ × 100 = 1000 centavos."
    },
    {
      id: 611,
      question: "Quantos centavos há em 18 reais?",
      options: ["1700", "180", "1900", "1800"],
      correctIndex: 3,
      explanation: "18 R$ × 100 = 1800 centavos."
    },
    {
      id: 612,
      question: "Quantos centavos há em 26 reais?",
      options: ["2700", "260", "2500", "2600"],
      correctIndex: 3,
      explanation: "26 R$ × 100 = 2600 centavos."
    },
    {
      id: 613,
      question: "Quantos metros há em 11 quilômetros?",
      options: ["12000", "11000", "10000", "1100"],
      correctIndex: 1,
      explanation: "11 km × 1000 = 11000 metros."
    },
    {
      id: 614,
      question: "Quantos gramas há em 19 quilogramas?",
      options: ["18000", "19000", "1900", "20000"],
      correctIndex: 1,
      explanation: "19 kg × 1000 = 19000 gramas."
    },
    {
      id: 615,
      question: "Quantos minutos há em 36 horas?",
      options: ["2160", "2220", "216", "2100"],
      correctIndex: 0,
      explanation: "36 h × 60 = 2160 minutos."
    },
    {
      id: 616,
      question: "Quantos minutos há em 4 horas?",
      options: ["300", "180", "240", "24"],
      correctIndex: 2,
      explanation: "4 h × 60 = 240 minutos."
    },
    {
      id: 617,
      question: "Quantos gramas há em 6 quilogramas?",
      options: ["7000", "6000", "600", "5000"],
      correctIndex: 1,
      explanation: "6 kg × 1000 = 6000 gramas."
    },
    {
      id: 618,
      question: "Quantos gramas há em 14 quilogramas?",
      options: ["14000", "15000", "13000", "1400"],
      correctIndex: 0,
      explanation: "14 kg × 1000 = 14000 gramas."
    },
    {
      id: 619,
      question: "Quantos unidades há em 15 dúzias?",
      options: ["192", "180", "168", "18"],
      correctIndex: 1,
      explanation: "15 dz × 12 = 180 unidades."
    },
    {
      id: 620,
      question: "Quantos minutos há em 32 horas?",
      options: ["192", "1980", "1860", "1920"],
      correctIndex: 3,
      explanation: "32 h × 60 = 1920 minutos."
    },
    {
      id: 621,
      question: "Quantos minutos há em 18 horas?",
      options: ["108", "1020", "1140", "1080"],
      correctIndex: 3,
      explanation: "18 h × 60 = 1080 minutos."
    },
    {
      id: 622,
      question: "Quantos centavos há em 33 reais?",
      options: ["3400", "3300", "3200", "330"],
      correctIndex: 1,
      explanation: "33 R$ × 100 = 3300 centavos."
    },
    {
      id: 623,
      question: "Quantos segundos há em 22 minutos?",
      options: ["1380", "132", "1320", "1260"],
      correctIndex: 2,
      explanation: "22 min × 60 = 1320 segundos."
    },
    {
      id: 624,
      question: "Quantos segundos há em 28 minutos?",
      options: ["168", "1620", "1740", "1680"],
      correctIndex: 3,
      explanation: "28 min × 60 = 1680 segundos."
    },
    {
      id: 625,
      question: "Quantos unidades há em 30 dúzias?",
      options: ["36", "348", "372", "360"],
      correctIndex: 3,
      explanation: "30 dz × 12 = 360 unidades."
    },
    {
      id: 626,
      question: "Hoje, Ana tem 60 anos. Daqui a 2 anos, quantos anos Ana terá?",
      options: ["63", "61", "64", "62"],
      correctIndex: 3,
      explanation: "60 + 2 = 62 anos."
    },
    {
      id: 627,
      question: "Bruno tem o dobro da idade de seu primo. Se o primo tem 31 anos, quantos anos tem Bruno?",
      options: ["33", "64", "60", "62"],
      correctIndex: 3,
      explanation: "O dobro de 31 é 31 × 2 = 62."
    },
    {
      id: 628,
      question: "Hoje, Carla tem 70 anos. Há 2 anos, quantos anos Carla tinha?",
      options: ["69", "67", "70", "68"],
      correctIndex: 3,
      explanation: "70 - 2 = 68 anos."
    },
    {
      id: 629,
      question: "Diego tem o dobro da idade de seu primo. Se o primo tem 5 anos, quantos anos tem Diego?",
      options: ["10", "7", "8", "12"],
      correctIndex: 0,
      explanation: "O dobro de 5 é 5 × 2 = 10."
    },
    {
      id: 630,
      question: "Hoje, Elena tem 58 anos. Daqui a 20 anos, quantos anos Elena terá?",
      options: ["98", "78", "79", "77"],
      correctIndex: 1,
      explanation: "58 + 20 = 78 anos."
    },
    {
      id: 631,
      question: "Hoje, Felipe tem 35 anos. Daqui a 5 anos, quantos anos Felipe terá?",
      options: ["39", "40", "41", "45"],
      correctIndex: 1,
      explanation: "35 + 5 = 40 anos."
    },
    {
      id: 632,
      question: "Hoje, Gabriela tem 21 anos. Daqui a 15 anos, quantos anos Gabriela terá?",
      options: ["37", "51", "36", "35"],
      correctIndex: 2,
      explanation: "21 + 15 = 36 anos."
    },
    {
      id: 633,
      question: "Hugo tem o dobro da idade de seu primo. Se o primo tem 31 anos, quantos anos tem Hugo?",
      options: ["33", "64", "62", "60"],
      correctIndex: 2,
      explanation: "O dobro de 31 é 31 × 2 = 62."
    },
    {
      id: 634,
      question: "Hoje, Iris tem 67 anos. Há 9 anos, quantos anos Iris tinha?",
      options: ["59", "57", "58", "67"],
      correctIndex: 2,
      explanation: "67 - 9 = 58 anos."
    },
    {
      id: 635,
      question: "João tem o dobro da idade de seu primo. Se o primo tem 6 anos, quantos anos tem João?",
      options: ["14", "10", "8", "12"],
      correctIndex: 3,
      explanation: "O dobro de 6 é 6 × 2 = 12."
    },
    {
      id: 636,
      question: "Hoje, Karina tem 9 anos. Daqui a 21 anos, quantos anos Karina terá?",
      options: ["30", "31", "29", "51"],
      correctIndex: 0,
      explanation: "9 + 21 = 30 anos."
    },
    {
      id: 637,
      question: "Hoje, Lucas tem 54 anos. Há 16 anos, quantos anos Lucas tinha?",
      options: ["37", "54", "38", "39"],
      correctIndex: 2,
      explanation: "54 - 16 = 38 anos."
    },
    {
      id: 638,
      question: "Hoje, Marina tem 50 anos. Há 10 anos, quantos anos Marina tinha?",
      options: ["40", "41", "50", "39"],
      correctIndex: 0,
      explanation: "50 - 10 = 40 anos."
    },
    {
      id: 639,
      question: "Hoje, Nicolas tem 40 anos. Há 9 anos, quantos anos Nicolas tinha?",
      options: ["32", "40", "31", "30"],
      correctIndex: 2,
      explanation: "40 - 9 = 31 anos."
    },
    {
      id: 640,
      question: "Olívia tem o dobro da idade de seu primo. Se o primo tem 14 anos, quantos anos tem Olívia?",
      options: ["26", "16", "30", "28"],
      correctIndex: 3,
      explanation: "O dobro de 14 é 14 × 2 = 28."
    },
    {
      id: 641,
      question: "Hoje, Pedro tem 12 anos. Daqui a 22 anos, quantos anos Pedro terá?",
      options: ["33", "35", "56", "34"],
      correctIndex: 3,
      explanation: "12 + 22 = 34 anos."
    },
    {
      id: 642,
      question: "Rafaela tem o dobro da idade de seu primo. Se o primo tem 34 anos, quantos anos tem Rafaela?",
      options: ["36", "68", "70", "66"],
      correctIndex: 1,
      explanation: "O dobro de 34 é 34 × 2 = 68."
    },
    {
      id: 643,
      question: "Samuel tem o dobro da idade de seu primo. Se o primo tem 21 anos, quantos anos tem Samuel?",
      options: ["44", "42", "40", "23"],
      correctIndex: 1,
      explanation: "O dobro de 21 é 21 × 2 = 42."
    },
    {
      id: 644,
      question: "Hoje, Tainá tem 31 anos. Daqui a 12 anos, quantos anos Tainá terá?",
      options: ["44", "42", "43", "55"],
      correctIndex: 2,
      explanation: "31 + 12 = 43 anos."
    },
    {
      id: 645,
      question: "Hoje, Victor tem 31 anos. Daqui a 17 anos, quantos anos Victor terá?",
      options: ["48", "65", "47", "49"],
      correctIndex: 0,
      explanation: "31 + 17 = 48 anos."
    },
    {
      id: 646,
      question: "Hoje, Yasmin tem 21 anos. Há 14 anos, quantos anos Yasmin tinha?",
      options: ["6", "21", "8", "7"],
      correctIndex: 3,
      explanation: "21 - 14 = 7 anos."
    },
    {
      id: 647,
      question: "William tem o dobro da idade de seu primo. Se o primo tem 6 anos, quantos anos tem William?",
      options: ["8", "10", "12", "14"],
      correctIndex: 2,
      explanation: "O dobro de 6 é 6 × 2 = 12."
    },
    {
      id: 648,
      question: "Hoje, Sofia tem 28 anos. Daqui a 17 anos, quantos anos Sofia terá?",
      options: ["44", "45", "62", "46"],
      correctIndex: 1,
      explanation: "28 + 17 = 45 anos."
    },
    {
      id: 649,
      question: "Hoje, Renato tem 54 anos. Daqui a 20 anos, quantos anos Renato terá?",
      options: ["75", "73", "74", "94"],
      correctIndex: 2,
      explanation: "54 + 20 = 74 anos."
    },
    {
      id: 650,
      question: "Hoje, Bianca tem 7 anos. Daqui a 22 anos, quantos anos Bianca terá?",
      options: ["51", "29", "28", "30"],
      correctIndex: 1,
      explanation: "7 + 22 = 29 anos."
    },
    {
      id: 651,
      question: "Hoje, Otávio tem 59 anos. Daqui a 8 anos, quantos anos Otávio terá?",
      options: ["66", "67", "75", "68"],
      correctIndex: 1,
      explanation: "59 + 8 = 67 anos."
    },
    {
      id: 652,
      question: "Camila tem o dobro da idade de seu primo. Se o primo tem 7 anos, quantos anos tem Camila?",
      options: ["9", "14", "16", "12"],
      correctIndex: 1,
      explanation: "O dobro de 7 é 7 × 2 = 14."
    },
    {
      id: 653,
      question: "Hoje, Fábio tem 10 anos. Daqui a 19 anos, quantos anos Fábio terá?",
      options: ["28", "30", "29", "48"],
      correctIndex: 2,
      explanation: "10 + 19 = 29 anos."
    },
    {
      id: 654,
      question: "Hoje, Larissa tem 51 anos. Há 13 anos, quantos anos Larissa tinha?",
      options: ["39", "51", "38", "37"],
      correctIndex: 2,
      explanation: "51 - 13 = 38 anos."
    },
    {
      id: 655,
      question: "Hoje, Vinícius tem 43 anos. Daqui a 13 anos, quantos anos Vinícius terá?",
      options: ["69", "56", "57", "55"],
      correctIndex: 1,
      explanation: "43 + 13 = 56 anos."
    },
    {
      id: 656,
      question: "Hoje, Ana tem 39 anos. Daqui a 10 anos, quantos anos Ana terá?",
      options: ["48", "59", "50", "49"],
      correctIndex: 3,
      explanation: "39 + 10 = 49 anos."
    },
    {
      id: 657,
      question: "Hoje, Bruno tem 10 anos. Há 7 anos, quantos anos Bruno tinha?",
      options: ["2", "3", "10", "4"],
      correctIndex: 1,
      explanation: "10 - 7 = 3 anos."
    },
    {
      id: 658,
      question: "Hoje, Carla tem 9 anos. Daqui a 5 anos, quantos anos Carla terá?",
      options: ["13", "15", "19", "14"],
      correctIndex: 3,
      explanation: "9 + 5 = 14 anos."
    },
    {
      id: 659,
      question: "Hoje, Diego tem 8 anos. Daqui a 10 anos, quantos anos Diego terá?",
      options: ["28", "19", "17", "18"],
      correctIndex: 3,
      explanation: "8 + 10 = 18 anos."
    },
    {
      id: 660,
      question: "Hoje, Elena tem 13 anos. Há 9 anos, quantos anos Elena tinha?",
      options: ["13", "5", "3", "4"],
      correctIndex: 3,
      explanation: "13 - 9 = 4 anos."
    },
    {
      id: 661,
      question: "Complete a sequência de letras: Q, O, M, K, ?",
      options: ["I", "H", "K", "J"],
      correctIndex: 0,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 662,
      question: "Complete a sequência de letras: Q, S, U, W, ?",
      options: ["Z", "X", "Y", "W"],
      correctIndex: 2,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 663,
      question: "Complete a sequência de letras: J, L, N, P, ?",
      options: ["S", "T", "R", "Q"],
      correctIndex: 2,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 664,
      question: "Complete a sequência de letras: Z, W, T, Q, ?",
      options: ["O", "Q", "N", "M"],
      correctIndex: 2,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 665,
      question: "Complete a sequência de letras: J, M, P, S, ?",
      options: ["W", "U", "Y", "V"],
      correctIndex: 3,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 666,
      question: "Complete a sequência de letras: H, J, L, N, ?",
      options: ["Q", "R", "O", "P"],
      correctIndex: 3,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 667,
      question: "Complete a sequência de letras: S, O, K, G, ?",
      options: ["D", "C", "G", "B"],
      correctIndex: 1,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 668,
      question: "Complete a sequência de letras: W, T, Q, N, ?",
      options: ["J", "K", "N", "L"],
      correctIndex: 1,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 669,
      question: "Complete a sequência de letras: I, L, O, R, ?",
      options: ["T", "X", "V", "U"],
      correctIndex: 3,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 670,
      question: "Complete a sequência de letras: P, R, T, V, ?",
      options: ["Z", "Y", "X", "W"],
      correctIndex: 2,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 671,
      question: "Complete a sequência de letras: V, S, P, M, ?",
      options: ["M", "J", "I", "K"],
      correctIndex: 1,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 672,
      question: "Complete a sequência de letras: X, T, P, L, ?",
      options: ["H", "I", "L", "G"],
      correctIndex: 0,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 673,
      question: "Complete a sequência de letras: V, T, R, P, ?",
      options: ["P", "N", "M", "O"],
      correctIndex: 1,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 674,
      question: "Complete a sequência de letras: I, K, M, O, ?",
      options: ["S", "Q", "R", "P"],
      correctIndex: 1,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 675,
      question: "Complete a sequência de letras: K, M, O, Q, ?",
      options: ["T", "U", "R", "S"],
      correctIndex: 3,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 676,
      question: "Complete a sequência de letras: E, G, I, K, ?",
      options: ["L", "N", "M", "O"],
      correctIndex: 2,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 677,
      question: "Complete a sequência de letras: T, Q, N, K, ?",
      options: ["K", "H", "I", "G"],
      correctIndex: 1,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 678,
      question: "Complete a sequência de letras: R, O, L, I, ?",
      options: ["E", "G", "F", "I"],
      correctIndex: 2,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 679,
      question: "Complete a sequência de letras: P, M, J, G, ?",
      options: ["C", "G", "D", "E"],
      correctIndex: 2,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 680,
      question: "Complete a sequência de letras: E, H, K, N, ?",
      options: ["R", "P", "Q", "T"],
      correctIndex: 2,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 681,
      question: "Complete a sequência de letras: U, Q, M, I, ?",
      options: ["F", "D", "E", "I"],
      correctIndex: 2,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 682,
      question: "Complete a sequência de letras: W, S, O, K, ?",
      options: ["F", "H", "K", "G"],
      correctIndex: 3,
      explanation: "A sequência regride de 4 em 4 letras no alfabeto."
    },
    {
      id: 683,
      question: "Complete a sequência de letras: L, O, R, U, ?",
      options: ["Y", "U", "X", "W"],
      correctIndex: 2,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 684,
      question: "Complete a sequência de letras: Q, N, K, H, ?",
      options: ["D", "F", "H", "E"],
      correctIndex: 3,
      explanation: "A sequência regride de 3 em 3 letras no alfabeto."
    },
    {
      id: 685,
      question: "Complete a sequência de letras: C, E, G, I, ?",
      options: ["J", "L", "M", "K"],
      correctIndex: 3,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 686,
      question: "Complete a sequência de letras: O, M, K, I, ?",
      options: ["G", "I", "H", "F"],
      correctIndex: 0,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 687,
      question: "Complete a sequência de letras: O, Q, S, U, ?",
      options: ["Y", "V", "X", "W"],
      correctIndex: 3,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 688,
      question: "Complete a sequência de letras: M, K, I, G, ?",
      options: ["G", "D", "E", "F"],
      correctIndex: 2,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 689,
      question: "Complete a sequência de letras: I, M, Q, U, ?",
      options: ["Z", "Y", "U", "X"],
      correctIndex: 1,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 690,
      question: "Complete a sequência de letras: W, U, S, Q, ?",
      options: ["N", "P", "O", "Q"],
      correctIndex: 2,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 691,
      question: "Complete a sequência de letras: D, H, L, P, ?",
      options: ["X", "U", "S", "T"],
      correctIndex: 3,
      explanation: "A sequência avança de 4 em 4 letras no alfabeto."
    },
    {
      id: 692,
      question: "Complete a sequência de letras: A, D, G, J, ?",
      options: ["P", "L", "M", "N"],
      correctIndex: 2,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 693,
      question: "Complete a sequência de letras: P, N, L, J, ?",
      options: ["H", "G", "J", "I"],
      correctIndex: 0,
      explanation: "A sequência regride de 2 em 2 letras no alfabeto."
    },
    {
      id: 694,
      question: "Complete a sequência de letras: D, F, H, J, ?",
      options: ["K", "N", "M", "L"],
      correctIndex: 3,
      explanation: "A sequência avança de 2 em 2 letras no alfabeto."
    },
    {
      id: 695,
      question: "Complete a sequência de letras: B, E, H, K, ?",
      options: ["N", "Q", "M", "O"],
      correctIndex: 0,
      explanation: "A sequência avança de 3 em 3 letras no alfabeto."
    },
    {
      id: 696,
      question: "Uma caixa tem 15 itens. Se você tem 19 caixas iguais, quantos itens há ao todo?",
      options: ["285", "304", "300", "266"],
      correctIndex: 0,
      explanation: "15 × 19 = 285."
    },
    {
      id: 697,
      question: "228 itens foram divididos igualmente entre 12 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["19", "18", "31", "20"],
      correctIndex: 0,
      explanation: "228 ÷ 12 = 19."
    },
    {
      id: 698,
      question: "Uma caixa tem 33 itens. Se você tem 5 caixas iguais, quantos itens há ao todo?",
      options: ["165", "198", "160", "170"],
      correctIndex: 0,
      explanation: "33 × 5 = 165."
    },
    {
      id: 699,
      question: "196 itens foram divididos igualmente entre 7 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["35", "29", "27", "28"],
      correctIndex: 3,
      explanation: "196 ÷ 7 = 28."
    },
    {
      id: 700,
      question: "300 itens foram divididos igualmente entre 10 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["40", "29", "31", "30"],
      correctIndex: 3,
      explanation: "300 ÷ 10 = 30."
    },
    {
      id: 701,
      question: "198 itens foram divididos igualmente entre 11 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["19", "17", "29", "18"],
      correctIndex: 3,
      explanation: "198 ÷ 11 = 18."
    },
    {
      id: 702,
      question: "364 itens foram divididos igualmente entre 14 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["40", "27", "26", "25"],
      correctIndex: 2,
      explanation: "364 ÷ 14 = 26."
    },
    {
      id: 703,
      question: "Uma caixa tem 28 itens. Se você tem 9 caixas iguais, quantos itens há ao todo?",
      options: ["261", "243", "252", "280"],
      correctIndex: 2,
      explanation: "28 × 9 = 252."
    },
    {
      id: 704,
      question: "Uma caixa tem 40 itens. Se você tem 21 caixas iguais, quantos itens há ao todo?",
      options: ["819", "840", "861", "880"],
      correctIndex: 1,
      explanation: "40 × 21 = 840."
    },
    {
      id: 705,
      question: "Uma caixa tem 8 itens. Se você tem 15 caixas iguais, quantos itens há ao todo?",
      options: ["135", "128", "120", "105"],
      correctIndex: 2,
      explanation: "8 × 15 = 120."
    },
    {
      id: 706,
      question: "16 itens foram divididos igualmente entre 2 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["8", "10", "9", "7"],
      correctIndex: 0,
      explanation: "16 ÷ 2 = 8."
    },
    {
      id: 707,
      question: "Uma caixa tem 19 itens. Se você tem 13 caixas iguais, quantos itens há ao todo?",
      options: ["266", "260", "247", "234"],
      correctIndex: 2,
      explanation: "19 × 13 = 247."
    },
    {
      id: 708,
      question: "54 itens foram divididos igualmente entre 6 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["8", "9", "15", "10"],
      correctIndex: 1,
      explanation: "54 ÷ 6 = 9."
    },
    {
      id: 709,
      question: "341 itens foram divididos igualmente entre 11 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["30", "31", "42", "32"],
      correctIndex: 1,
      explanation: "341 ÷ 11 = 31."
    },
    {
      id: 710,
      question: "108 itens foram divididos igualmente entre 9 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["12", "13", "11", "21"],
      correctIndex: 0,
      explanation: "108 ÷ 9 = 12."
    },
    {
      id: 711,
      question: "Uma caixa tem 29 itens. Se você tem 15 caixas iguais, quantos itens há ao todo?",
      options: ["464", "450", "435", "420"],
      correctIndex: 2,
      explanation: "29 × 15 = 435."
    },
    {
      id: 712,
      question: "78 itens foram divididos igualmente entre 6 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["13", "12", "19", "14"],
      correctIndex: 0,
      explanation: "78 ÷ 6 = 13."
    },
    {
      id: 713,
      question: "40 itens foram divididos igualmente entre 4 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["9", "11", "10", "14"],
      correctIndex: 2,
      explanation: "40 ÷ 4 = 10."
    },
    {
      id: 714,
      question: "12 itens foram divididos igualmente entre 6 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["2", "3", "8", "1"],
      correctIndex: 0,
      explanation: "12 ÷ 6 = 2."
    },
    {
      id: 715,
      question: "Uma caixa tem 14 itens. Se você tem 2 caixas iguais, quantos itens há ao todo?",
      options: ["30", "26", "28", "42"],
      correctIndex: 2,
      explanation: "14 × 2 = 28."
    },
    {
      id: 716,
      question: "80 itens foram divididos igualmente entre 8 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["10", "18", "11", "9"],
      correctIndex: 0,
      explanation: "80 ÷ 8 = 10."
    },
    {
      id: 717,
      question: "264 itens foram divididos igualmente entre 11 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["23", "25", "35", "24"],
      correctIndex: 3,
      explanation: "264 ÷ 11 = 24."
    },
    {
      id: 718,
      question: "Uma caixa tem 23 itens. Se você tem 14 caixas iguais, quantos itens há ao todo?",
      options: ["345", "308", "336", "322"],
      correctIndex: 3,
      explanation: "23 × 14 = 322."
    },
    {
      id: 719,
      question: "Uma caixa tem 30 itens. Se você tem 22 caixas iguais, quantos itens há ao todo?",
      options: ["660", "682", "690", "638"],
      correctIndex: 0,
      explanation: "30 × 22 = 660."
    },
    {
      id: 720,
      question: "140 itens foram divididos igualmente entre 14 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["11", "9", "10", "24"],
      correctIndex: 2,
      explanation: "140 ÷ 14 = 10."
    },
    {
      id: 721,
      question: "100 itens foram divididos igualmente entre 5 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["19", "21", "20", "25"],
      correctIndex: 2,
      explanation: "100 ÷ 5 = 20."
    },
    {
      id: 722,
      question: "96 itens foram divididos igualmente entre 8 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["12", "13", "11", "20"],
      correctIndex: 0,
      explanation: "96 ÷ 8 = 12."
    },
    {
      id: 723,
      question: "Uma caixa tem 21 itens. Se você tem 14 caixas iguais, quantos itens há ao todo?",
      options: ["315", "308", "280", "294"],
      correctIndex: 3,
      explanation: "21 × 14 = 294."
    },
    {
      id: 724,
      question: "Uma caixa tem 35 itens. Se você tem 15 caixas iguais, quantos itens há ao todo?",
      options: ["540", "560", "525", "510"],
      correctIndex: 2,
      explanation: "35 × 15 = 525."
    },
    {
      id: 725,
      question: "Uma caixa tem 44 itens. Se você tem 2 caixas iguais, quantos itens há ao todo?",
      options: ["132", "90", "88", "86"],
      correctIndex: 2,
      explanation: "44 × 2 = 88."
    },
    {
      id: 726,
      question: "28 itens foram divididos igualmente entre 2 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["14", "15", "13", "16"],
      correctIndex: 0,
      explanation: "28 ÷ 2 = 14."
    },
    {
      id: 727,
      question: "390 itens foram divididos igualmente entre 13 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["43", "29", "31", "30"],
      correctIndex: 3,
      explanation: "390 ÷ 13 = 30."
    },
    {
      id: 728,
      question: "230 itens foram divididos igualmente entre 10 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["22", "23", "33", "24"],
      correctIndex: 1,
      explanation: "230 ÷ 10 = 23."
    },
    {
      id: 729,
      question: "44 itens foram divididos igualmente entre 2 pessoas. Quantos itens cada pessoa recebeu?",
      options: ["24", "21", "23", "22"],
      correctIndex: 3,
      explanation: "44 ÷ 2 = 22."
    },
    {
      id: 730,
      question: "Uma caixa tem 23 itens. Se você tem 21 caixas iguais, quantos itens há ao todo?",
      options: ["506", "462", "504", "483"],
      correctIndex: 3,
      explanation: "23 × 21 = 483."
    },
    {
      id: 731,
      question: "Uma caixa tem 10 itens. Se você tem 16 caixas iguais, quantos itens há ao todo?",
      options: ["144", "170", "160", "176"],
      correctIndex: 2,
      explanation: "10 × 16 = 160."
    },
    {
      id: 732,
      question: "Uma caixa tem 5 itens. Se você tem 3 caixas iguais, quantos itens há ao todo?",
      options: ["20", "18", "15", "12"],
      correctIndex: 2,
      explanation: "5 × 3 = 15."
    },
    {
      id: 733,
      question: "Uma caixa tem 20 itens. Se você tem 8 caixas iguais, quantos itens há ao todo?",
      options: ["152", "168", "180", "160"],
      correctIndex: 3,
      explanation: "20 × 8 = 160."
    },
    {
      id: 734,
      question: "Uma caixa tem 9 itens. Se você tem 19 caixas iguais, quantos itens há ao todo?",
      options: ["171", "180", "190", "152"],
      correctIndex: 0,
      explanation: "9 × 19 = 171."
    },
    {
      id: 735,
      question: "Uma caixa tem 5 itens. Se você tem 5 caixas iguais, quantos itens há ao todo?",
      options: ["45", "25", "30", "20"],
      correctIndex: 1,
      explanation: "5 × 5 = 25."
    },
    {
      id: 736,
      question: "Se hoje é Sexta-feira, que dia da semana será daqui a 96 dias?",
      options: ["Quinta-feira", "Sábado", "Sexta-feira", "Quarta-feira"],
      correctIndex: 3,
      explanation: "96 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de sexta-feira, chega-se a quarta-feira."
    },
    {
      id: 737,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 118 dias?",
      options: ["Quarta-feira", "Domingo", "Sexta-feira", "Quinta-feira"],
      correctIndex: 0,
      explanation: "118 dividido por 7 deixa resto 6. Avançando 6 dia(s) a partir de quinta-feira, chega-se a quarta-feira."
    },
    {
      id: 738,
      question: "Se hoje é Segunda-feira, que dia da semana será daqui a 122 dias?",
      options: ["Domingo", "Terça-feira", "Quinta-feira", "Quarta-feira"],
      correctIndex: 2,
      explanation: "122 dividido por 7 deixa resto 3. Avançando 3 dia(s) a partir de segunda-feira, chega-se a quinta-feira."
    },
    {
      id: 739,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 116 dias?",
      options: ["Domingo", "Quinta-feira", "Terça-feira", "Segunda-feira"],
      correctIndex: 3,
      explanation: "116 dividido por 7 deixa resto 4. Avançando 4 dia(s) a partir de quinta-feira, chega-se a segunda-feira."
    },
    {
      id: 740,
      question: "Se hoje é Segunda-feira, que dia da semana será daqui a 213 dias?",
      options: ["Sábado", "Quarta-feira", "Terça-feira", "Quinta-feira"],
      correctIndex: 3,
      explanation: "213 dividido por 7 deixa resto 3. Avançando 3 dia(s) a partir de segunda-feira, chega-se a quinta-feira."
    },
    {
      id: 741,
      question: "Se hoje é Domingo, que dia da semana será daqui a 299 dias?",
      options: ["Quinta-feira", "Sábado", "Quarta-feira", "Sexta-feira"],
      correctIndex: 3,
      explanation: "299 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de domingo, chega-se a sexta-feira."
    },
    {
      id: 742,
      question: "Se hoje é Segunda-feira, que dia da semana será daqui a 248 dias?",
      options: ["Sábado", "Sexta-feira", "Domingo", "Quinta-feira"],
      correctIndex: 3,
      explanation: "248 dividido por 7 deixa resto 3. Avançando 3 dia(s) a partir de segunda-feira, chega-se a quinta-feira."
    },
    {
      id: 743,
      question: "Se hoje é Sexta-feira, que dia da semana será daqui a 259 dias?",
      options: ["Quarta-feira", "Sábado", "Segunda-feira", "Sexta-feira"],
      correctIndex: 3,
      explanation: "259 dividido por 7 deixa resto 0. Avançando 0 dia(s) a partir de sexta-feira, chega-se a sexta-feira."
    },
    {
      id: 744,
      question: "Se hoje é Sábado, que dia da semana será daqui a 170 dias?",
      options: ["Domingo", "Quinta-feira", "Segunda-feira", "Terça-feira"],
      correctIndex: 2,
      explanation: "170 dividido por 7 deixa resto 2. Avançando 2 dia(s) a partir de sábado, chega-se a segunda-feira."
    },
    {
      id: 745,
      question: "Se hoje é Sexta-feira, que dia da semana será daqui a 61 dias?",
      options: ["Sábado", "Quinta-feira", "Sexta-feira", "Quarta-feira"],
      correctIndex: 3,
      explanation: "61 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de sexta-feira, chega-se a quarta-feira."
    },
    {
      id: 746,
      question: "Se hoje é Sexta-feira, que dia da semana será daqui a 327 dias?",
      options: ["Terça-feira", "Quarta-feira", "Domingo", "Sábado"],
      correctIndex: 1,
      explanation: "327 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de sexta-feira, chega-se a quarta-feira."
    },
    {
      id: 747,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 222 dias?",
      options: ["Segunda-feira", "Sexta-feira", "Terça-feira", "Quarta-feira"],
      correctIndex: 2,
      explanation: "222 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de quinta-feira, chega-se a terça-feira."
    },
    {
      id: 748,
      question: "Se hoje é Sábado, que dia da semana será daqui a 226 dias?",
      options: ["Sexta-feira", "Terça-feira", "Segunda-feira", "Sábado"],
      correctIndex: 2,
      explanation: "226 dividido por 7 deixa resto 2. Avançando 2 dia(s) a partir de sábado, chega-se a segunda-feira."
    },
    {
      id: 749,
      question: "Se hoje é Terça-feira, que dia da semana será daqui a 351 dias?",
      options: ["Quinta-feira", "Terça-feira", "Quarta-feira", "Domingo"],
      correctIndex: 2,
      explanation: "351 dividido por 7 deixa resto 1. Avançando 1 dia(s) a partir de terça-feira, chega-se a quarta-feira."
    },
    {
      id: 750,
      question: "Se hoje é Sábado, que dia da semana será daqui a 33 dias?",
      options: ["Sexta-feira", "Terça-feira", "Quarta-feira", "Quinta-feira"],
      correctIndex: 3,
      explanation: "33 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de sábado, chega-se a quinta-feira."
    },
    {
      id: 751,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 34 dias?",
      options: ["Segunda-feira", "Quarta-feira", "Quinta-feira", "Terça-feira"],
      correctIndex: 1,
      explanation: "34 dividido por 7 deixa resto 6. Avançando 6 dia(s) a partir de quinta-feira, chega-se a quarta-feira."
    },
    {
      id: 752,
      question: "Se hoje é Sábado, que dia da semana será daqui a 82 dias?",
      options: ["Sexta-feira", "Terça-feira", "Quinta-feira", "Quarta-feira"],
      correctIndex: 2,
      explanation: "82 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de sábado, chega-se a quinta-feira."
    },
    {
      id: 753,
      question: "Se hoje é Sábado, que dia da semana será daqui a 342 dias?",
      options: ["Sábado", "Sexta-feira", "Segunda-feira", "Terça-feira"],
      correctIndex: 1,
      explanation: "342 dividido por 7 deixa resto 6. Avançando 6 dia(s) a partir de sábado, chega-se a sexta-feira."
    },
    {
      id: 754,
      question: "Se hoje é Quarta-feira, que dia da semana será daqui a 132 dias?",
      options: ["Domingo", "Terça-feira", "Quarta-feira", "Quinta-feira"],
      correctIndex: 1,
      explanation: "132 dividido por 7 deixa resto 6. Avançando 6 dia(s) a partir de quarta-feira, chega-se a terça-feira."
    },
    {
      id: 755,
      question: "Se hoje é Sexta-feira, que dia da semana será daqui a 235 dias?",
      options: ["Terça-feira", "Sábado", "Segunda-feira", "Sexta-feira"],
      correctIndex: 0,
      explanation: "235 dividido por 7 deixa resto 4. Avançando 4 dia(s) a partir de sexta-feira, chega-se a terça-feira."
    },
    {
      id: 756,
      question: "Se hoje é Terça-feira, que dia da semana será daqui a 277 dias?",
      options: ["Quinta-feira", "Terça-feira", "Segunda-feira", "Sábado"],
      correctIndex: 3,
      explanation: "277 dividido por 7 deixa resto 4. Avançando 4 dia(s) a partir de terça-feira, chega-se a sábado."
    },
    {
      id: 757,
      question: "Se hoje é Sexta-feira, que dia da semana será daqui a 130 dias?",
      options: ["Sábado", "Quinta-feira", "Sexta-feira", "Terça-feira"],
      correctIndex: 3,
      explanation: "130 dividido por 7 deixa resto 4. Avançando 4 dia(s) a partir de sexta-feira, chega-se a terça-feira."
    },
    {
      id: 758,
      question: "Se hoje é Terça-feira, que dia da semana será daqui a 383 dias?",
      options: ["Terça-feira", "Quinta-feira", "Quarta-feira", "Domingo"],
      correctIndex: 3,
      explanation: "383 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de terça-feira, chega-se a domingo."
    },
    {
      id: 759,
      question: "Se hoje é Segunda-feira, que dia da semana será daqui a 171 dias?",
      options: ["Quinta-feira", "Terça-feira", "Sexta-feira", "Quarta-feira"],
      correctIndex: 0,
      explanation: "171 dividido por 7 deixa resto 3. Avançando 3 dia(s) a partir de segunda-feira, chega-se a quinta-feira."
    },
    {
      id: 760,
      question: "Se hoje é Terça-feira, que dia da semana será daqui a 180 dias?",
      options: ["Quinta-feira", "Sábado", "Sexta-feira", "Domingo"],
      correctIndex: 3,
      explanation: "180 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de terça-feira, chega-se a domingo."
    },
    {
      id: 761,
      question: "Se hoje é Terça-feira, que dia da semana será daqui a 37 dias?",
      options: ["Segunda-feira", "Quinta-feira", "Domingo", "Sábado"],
      correctIndex: 1,
      explanation: "37 dividido por 7 deixa resto 2. Avançando 2 dia(s) a partir de terça-feira, chega-se a quinta-feira."
    },
    {
      id: 762,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 210 dias?",
      options: ["Quinta-feira", "Quarta-feira", "Segunda-feira", "Terça-feira"],
      correctIndex: 0,
      explanation: "210 dividido por 7 deixa resto 0. Avançando 0 dia(s) a partir de quinta-feira, chega-se a quinta-feira."
    },
    {
      id: 763,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 375 dias?",
      options: ["Sexta-feira", "Terça-feira", "Sábado", "Segunda-feira"],
      correctIndex: 3,
      explanation: "375 dividido por 7 deixa resto 4. Avançando 4 dia(s) a partir de quinta-feira, chega-se a segunda-feira."
    },
    {
      id: 764,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 181 dias?",
      options: ["Quarta-feira", "Terça-feira", "Sexta-feira", "Segunda-feira"],
      correctIndex: 0,
      explanation: "181 dividido por 7 deixa resto 6. Avançando 6 dia(s) a partir de quinta-feira, chega-se a quarta-feira."
    },
    {
      id: 765,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 53 dias?",
      options: ["Terça-feira", "Quinta-feira", "Segunda-feira", "Domingo"],
      correctIndex: 2,
      explanation: "53 dividido por 7 deixa resto 4. Avançando 4 dia(s) a partir de quinta-feira, chega-se a segunda-feira."
    },
    {
      id: 766,
      question: "Se hoje é Quinta-feira, que dia da semana será daqui a 160 dias?",
      options: ["Domingo", "Quarta-feira", "Terça-feira", "Segunda-feira"],
      correctIndex: 1,
      explanation: "160 dividido por 7 deixa resto 6. Avançando 6 dia(s) a partir de quinta-feira, chega-se a quarta-feira."
    },
    {
      id: 767,
      question: "Se hoje é Domingo, que dia da semana será daqui a 196 dias?",
      options: ["Domingo", "Terça-feira", "Segunda-feira", "Sábado"],
      correctIndex: 0,
      explanation: "196 dividido por 7 deixa resto 0. Avançando 0 dia(s) a partir de domingo, chega-se a domingo."
    },
    {
      id: 768,
      question: "Se hoje é Terça-feira, que dia da semana será daqui a 211 dias?",
      options: ["Quarta-feira", "Sexta-feira", "Segunda-feira", "Terça-feira"],
      correctIndex: 0,
      explanation: "211 dividido por 7 deixa resto 1. Avançando 1 dia(s) a partir de terça-feira, chega-se a quarta-feira."
    },
    {
      id: 769,
      question: "Se hoje é Quarta-feira, que dia da semana será daqui a 310 dias?",
      options: ["Quinta-feira", "Domingo", "Sexta-feira", "Quarta-feira"],
      correctIndex: 2,
      explanation: "310 dividido por 7 deixa resto 2. Avançando 2 dia(s) a partir de quarta-feira, chega-se a sexta-feira."
    },
    {
      id: 770,
      question: "Se hoje é Quarta-feira, que dia da semana será daqui a 341 dias?",
      options: ["Segunda-feira", "Domingo", "Sábado", "Quarta-feira"],
      correctIndex: 0,
      explanation: "341 dividido por 7 deixa resto 5. Avançando 5 dia(s) a partir de quarta-feira, chega-se a segunda-feira."
    },
    {
      id: 771,
      question: "Se 5 canetas custam R$145, quanto custam 4 canetas (mesmo preço unitário)?",
      options: ["145", "87", "116", "120"],
      correctIndex: 2,
      explanation: "Cada item custa R$29 (145÷5). 4 itens custam 4 × R$29 = R$116."
    },
    {
      id: 772,
      question: "Se 7 cadernos custam R$168, quanto custam 3 cadernos (mesmo preço unitário)?",
      options: ["75", "96", "72", "48"],
      correctIndex: 2,
      explanation: "Cada item custa R$24 (168÷7). 3 itens custam 3 × R$24 = R$72."
    },
    {
      id: 773,
      question: "Se 2 lápis custam R$48, quanto custam 10 lápis (mesmo preço unitário)?",
      options: ["264", "240", "250", "216"],
      correctIndex: 1,
      explanation: "Cada item custa R$24 (48÷2). 10 itens custam 10 × R$24 = R$240."
    },
    {
      id: 774,
      question: "Se 5 chocolates custam R$145, quanto custam 2 chocolates (mesmo preço unitário)?",
      options: ["29", "87", "60", "58"],
      correctIndex: 3,
      explanation: "Cada item custa R$29 (145÷5). 2 itens custam 2 × R$29 = R$58."
    },
    {
      id: 775,
      question: "Se 10 lápis custam R$190, quanto custam 13 lápis (mesmo preço unitário)?",
      options: ["260", "228", "247", "266"],
      correctIndex: 2,
      explanation: "Cada item custa R$19 (190÷10). 13 itens custam 13 × R$19 = R$247."
    },
    {
      id: 776,
      question: "Se 6 ingressos custam R$156, quanto custam 20 ingressos (mesmo preço unitário)?",
      options: ["546", "540", "494", "520"],
      correctIndex: 3,
      explanation: "Cada item custa R$26 (156÷6). 20 itens custam 20 × R$26 = R$520."
    },
    {
      id: 777,
      question: "Se 4 lápis custam R$88, quanto custam 20 lápis (mesmo preço unitário)?",
      options: ["418", "462", "440", "460"],
      correctIndex: 2,
      explanation: "Cada item custa R$22 (88÷4). 20 itens custam 20 × R$22 = R$440."
    },
    {
      id: 778,
      question: "Se 4 chocolates custam R$76, quanto custam 14 chocolates (mesmo preço unitário)?",
      options: ["247", "266", "285", "280"],
      correctIndex: 1,
      explanation: "Cada item custa R$19 (76÷4). 14 itens custam 14 × R$19 = R$266."
    },
    {
      id: 779,
      question: "Se 7 garrafas de água custam R$35, quanto custam 4 garrafas de água (mesmo preço unitário)?",
      options: ["15", "25", "24", "20"],
      correctIndex: 3,
      explanation: "Cada item custa R$5 (35÷7). 4 itens custam 4 × R$5 = R$20."
    },
    {
      id: 780,
      question: "Se 10 lápis custam R$140, quanto custam 14 lápis (mesmo preço unitário)?",
      options: ["182", "210", "183", "196"],
      correctIndex: 3,
      explanation: "Cada item custa R$14 (140÷10). 14 itens custam 14 × R$14 = R$196."
    },
    {
      id: 781,
      question: "Se 7 cadernos custam R$175, quanto custam 4 cadernos (mesmo preço unitário)?",
      options: ["125", "100", "75", "104"],
      correctIndex: 1,
      explanation: "Cada item custa R$25 (175÷7). 4 itens custam 4 × R$25 = R$100."
    },
    {
      id: 782,
      question: "Se 5 balas custam R$30, quanto custam 6 balas (mesmo preço unitário)?",
      options: ["42", "30", "27", "36"],
      correctIndex: 3,
      explanation: "Cada item custa R$6 (30÷5). 6 itens custam 6 × R$6 = R$36."
    },
    {
      id: 783,
      question: "Se 5 ingressos custam R$150, quanto custam 2 ingressos (mesmo preço unitário)?",
      options: ["30", "62", "90", "60"],
      correctIndex: 3,
      explanation: "Cada item custa R$30 (150÷5). 2 itens custam 2 × R$30 = R$60."
    },
    {
      id: 784,
      question: "Se 10 garrafas de água custam R$20, quanto custam 10 garrafas de água (mesmo preço unitário)?",
      options: ["30", "20", "18", "22"],
      correctIndex: 1,
      explanation: "Cada item custa R$2 (20÷10). 10 itens custam 10 × R$2 = R$20."
    },
    {
      id: 785,
      question: "Se 3 cadernos custam R$57, quanto custam 16 cadernos (mesmo preço unitário)?",
      options: ["304", "285", "320", "323"],
      correctIndex: 0,
      explanation: "Cada item custa R$19 (57÷3). 16 itens custam 16 × R$19 = R$304."
    },
    {
      id: 786,
      question: "Se 3 garrafas de água custam R$39, quanto custam 17 garrafas de água (mesmo preço unitário)?",
      options: ["238", "221", "208", "234"],
      correctIndex: 1,
      explanation: "Cada item custa R$13 (39÷3). 17 itens custam 17 × R$13 = R$221."
    },
    {
      id: 787,
      question: "Se 9 garrafas de água custam R$99, quanto custam 16 garrafas de água (mesmo preço unitário)?",
      options: ["192", "165", "176", "187"],
      correctIndex: 2,
      explanation: "Cada item custa R$11 (99÷9). 16 itens custam 16 × R$11 = R$176."
    },
    {
      id: 788,
      question: "Se 6 canetas custam R$72, quanto custam 10 canetas (mesmo preço unitário)?",
      options: ["130", "132", "108", "120"],
      correctIndex: 3,
      explanation: "Cada item custa R$12 (72÷6). 10 itens custam 10 × R$12 = R$120."
    },
    {
      id: 789,
      question: "Se 6 ingressos custam R$174, quanto custam 14 ingressos (mesmo preço unitário)?",
      options: ["420", "435", "377", "406"],
      correctIndex: 3,
      explanation: "Cada item custa R$29 (174÷6). 14 itens custam 14 × R$29 = R$406."
    },
    {
      id: 790,
      question: "Se 7 garrafas de água custam R$42, quanto custam 8 garrafas de água (mesmo preço unitário)?",
      options: ["56", "48", "54", "42"],
      correctIndex: 1,
      explanation: "Cada item custa R$6 (42÷7). 8 itens custam 8 × R$6 = R$48."
    },
    {
      id: 791,
      question: "Se 6 camisetas custam R$24, quanto custam 20 camisetas (mesmo preço unitário)?",
      options: ["84", "76", "80", "100"],
      correctIndex: 2,
      explanation: "Cada item custa R$4 (24÷6). 20 itens custam 20 × R$4 = R$80."
    },
    {
      id: 792,
      question: "Se 3 camisetas custam R$87, quanto custam 10 camisetas (mesmo preço unitário)?",
      options: ["261", "319", "300", "290"],
      correctIndex: 3,
      explanation: "Cada item custa R$29 (87÷3). 10 itens custam 10 × R$29 = R$290."
    },
    {
      id: 793,
      question: "Se 5 canetas custam R$60, quanto custam 4 canetas (mesmo preço unitário)?",
      options: ["60", "52", "36", "48"],
      correctIndex: 3,
      explanation: "Cada item custa R$12 (60÷5). 4 itens custam 4 × R$12 = R$48."
    },
    {
      id: 794,
      question: "Se 5 cadernos custam R$10, quanto custam 12 cadernos (mesmo preço unitário)?",
      options: ["24", "36", "26", "22"],
      correctIndex: 0,
      explanation: "Cada item custa R$2 (10÷5). 12 itens custam 12 × R$2 = R$24."
    },
    {
      id: 795,
      question: "Se 7 balas custam R$63, quanto custam 15 balas (mesmo preço unitário)?",
      options: ["135", "126", "144", "150"],
      correctIndex: 0,
      explanation: "Cada item custa R$9 (63÷7). 15 itens custam 15 × R$9 = R$135."
    },
    {
      id: 796,
      question: "Se 7 garrafas de água custam R$105, quanto custam 9 garrafas de água (mesmo preço unitário)?",
      options: ["135", "120", "144", "150"],
      correctIndex: 0,
      explanation: "Cada item custa R$15 (105÷7). 9 itens custam 9 × R$15 = R$135."
    },
    {
      id: 797,
      question: "Se 7 balas custam R$70, quanto custam 20 balas (mesmo preço unitário)?",
      options: ["190", "200", "220", "210"],
      correctIndex: 1,
      explanation: "Cada item custa R$10 (70÷7). 20 itens custam 20 × R$10 = R$200."
    },
    {
      id: 798,
      question: "Se 5 canetas custam R$80, quanto custam 14 canetas (mesmo preço unitário)?",
      options: ["208", "224", "238", "240"],
      correctIndex: 1,
      explanation: "Cada item custa R$16 (80÷5). 14 itens custam 14 × R$16 = R$224."
    },
    {
      id: 799,
      question: "Se 5 ingressos custam R$100, quanto custam 4 ingressos (mesmo preço unitário)?",
      options: ["80", "84", "100", "60"],
      correctIndex: 0,
      explanation: "Cada item custa R$20 (100÷5). 4 itens custam 4 × R$20 = R$80."
    },
    {
      id: 800,
      question: "Se 3 canetas custam R$27, quanto custam 6 canetas (mesmo preço unitário)?",
      options: ["54", "63", "60", "45"],
      correctIndex: 0,
      explanation: "Cada item custa R$9 (27÷3). 6 itens custam 6 × R$9 = R$54."
    },
    {
      id: 801,
      question: "Se 8 garrafas de água custam R$56, quanto custam 6 garrafas de água (mesmo preço unitário)?",
      options: ["42", "35", "49", "48"],
      correctIndex: 0,
      explanation: "Cada item custa R$7 (56÷8). 6 itens custam 6 × R$7 = R$42."
    },
    {
      id: 802,
      question: "Se 10 chocolates custam R$110, quanto custam 3 chocolates (mesmo preço unitário)?",
      options: ["22", "44", "36", "33"],
      correctIndex: 3,
      explanation: "Cada item custa R$11 (110÷10). 3 itens custam 3 × R$11 = R$33."
    },
    {
      id: 803,
      question: "Se 10 camisetas custam R$40, quanto custam 11 camisetas (mesmo preço unitário)?",
      options: ["40", "48", "55", "44"],
      correctIndex: 3,
      explanation: "Cada item custa R$4 (40÷10). 11 itens custam 11 × R$4 = R$44."
    },
    {
      id: 804,
      question: "Se 2 ingressos custam R$32, quanto custam 17 ingressos (mesmo preço unitário)?",
      options: ["272", "289", "288", "256"],
      correctIndex: 0,
      explanation: "Cada item custa R$16 (32÷2). 17 itens custam 17 × R$16 = R$272."
    },
    {
      id: 805,
      question: "Se 8 chocolates custam R$32, quanto custam 12 chocolates (mesmo preço unitário)?",
      options: ["60", "48", "52", "44"],
      correctIndex: 1,
      explanation: "Cada item custa R$4 (32÷8). 12 itens custam 12 × R$4 = R$48."
    },
    {
      id: 806,
      question: "Se 4 ingressos custam R$116, quanto custam 17 ingressos (mesmo preço unitário)?",
      options: ["464", "522", "493", "510"],
      correctIndex: 2,
      explanation: "Cada item custa R$29 (116÷4). 17 itens custam 17 × R$29 = R$493."
    },
    {
      id: 807,
      question: "Se 9 garrafas de água custam R$99, quanto custam 11 garrafas de água (mesmo preço unitário)?",
      options: ["121", "110", "137", "132"],
      correctIndex: 0,
      explanation: "Cada item custa R$11 (99÷9). 11 itens custam 11 × R$11 = R$121."
    },
    {
      id: 808,
      question: "Se 4 canetas custam R$24, quanto custam 20 canetas (mesmo preço unitário)?",
      options: ["140", "114", "126", "120"],
      correctIndex: 3,
      explanation: "Cada item custa R$6 (24÷4). 20 itens custam 20 × R$6 = R$120."
    },
    {
      id: 809,
      question: "Se 6 balas custam R$138, quanto custam 16 balas (mesmo preço unitário)?",
      options: ["391", "345", "368", "384"],
      correctIndex: 2,
      explanation: "Cada item custa R$23 (138÷6). 16 itens custam 16 × R$23 = R$368."
    },
    {
      id: 810,
      question: "Se 2 camisetas custam R$48, quanto custam 19 camisetas (mesmo preço unitário)?",
      options: ["475", "456", "432", "480"],
      correctIndex: 1,
      explanation: "Cada item custa R$24 (48÷2). 19 itens custam 19 × R$24 = R$456."
    },
    {
      id: 811,
      question: "Qual é a área de um retângulo com 24cm de largura e 18cm de altura?",
      options: ["414", "456", "432", "84"],
      correctIndex: 2,
      explanation: "Área = largura × altura = 24 × 18 = 432cm²."
    },
    {
      id: 812,
      question: "Qual é o perímetro de um retângulo com 20cm de largura e 23cm de altura?",
      options: ["460", "88", "86", "84"],
      correctIndex: 2,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (20 + 23) = 86cm."
    },
    {
      id: 813,
      question: "Qual é a área de um retângulo com 10cm de largura e 25cm de altura?",
      options: ["250", "260", "70", "225"],
      correctIndex: 0,
      explanation: "Área = largura × altura = 10 × 25 = 250cm²."
    },
    {
      id: 814,
      question: "Qual é a área de um retângulo com 19cm de largura e 18cm de altura?",
      options: ["361", "74", "342", "324"],
      correctIndex: 2,
      explanation: "Área = largura × altura = 19 × 18 = 342cm²."
    },
    {
      id: 815,
      question: "Qual é a área de um retângulo com 11cm de largura e 14cm de altura?",
      options: ["165", "154", "50", "140"],
      correctIndex: 1,
      explanation: "Área = largura × altura = 11 × 14 = 154cm²."
    },
    {
      id: 816,
      question: "Qual é o perímetro de um retângulo com 10cm de largura e 23cm de altura?",
      options: ["64", "66", "230", "68"],
      correctIndex: 1,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (10 + 23) = 66cm."
    },
    {
      id: 817,
      question: "Qual é o perímetro de um retângulo com 4cm de largura e 19cm de altura?",
      options: ["76", "46", "44", "48"],
      correctIndex: 1,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (4 + 19) = 46cm."
    },
    {
      id: 818,
      question: "Qual é a área de um retângulo com 17cm de largura e 15cm de altura?",
      options: ["240", "64", "255", "272"],
      correctIndex: 2,
      explanation: "Área = largura × altura = 17 × 15 = 255cm²."
    },
    {
      id: 819,
      question: "Qual é a área de um retângulo com 10cm de largura e 8cm de altura?",
      options: ["36", "72", "90", "80"],
      correctIndex: 3,
      explanation: "Área = largura × altura = 10 × 8 = 80cm²."
    },
    {
      id: 820,
      question: "Qual é a área de um retângulo com 6cm de largura e 11cm de altura?",
      options: ["72", "34", "55", "66"],
      correctIndex: 3,
      explanation: "Área = largura × altura = 6 × 11 = 66cm²."
    },
    {
      id: 821,
      question: "Qual é o perímetro de um retângulo com 22cm de largura e 4cm de altura?",
      options: ["52", "54", "50", "88"],
      correctIndex: 0,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (22 + 4) = 52cm."
    },
    {
      id: 822,
      question: "Qual é o perímetro de um retângulo com 22cm de largura e 18cm de altura?",
      options: ["82", "396", "78", "80"],
      correctIndex: 3,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (22 + 18) = 80cm."
    },
    {
      id: 823,
      question: "Qual é o perímetro de um retângulo com 7cm de largura e 19cm de altura?",
      options: ["52", "50", "133", "54"],
      correctIndex: 0,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (7 + 19) = 52cm."
    },
    {
      id: 824,
      question: "Qual é a área de um retângulo com 19cm de largura e 9cm de altura?",
      options: ["171", "56", "162", "190"],
      correctIndex: 0,
      explanation: "Área = largura × altura = 19 × 9 = 171cm²."
    },
    {
      id: 825,
      question: "Qual é a área de um retângulo com 16cm de largura e 11cm de altura?",
      options: ["165", "176", "192", "54"],
      correctIndex: 1,
      explanation: "Área = largura × altura = 16 × 11 = 176cm²."
    },
    {
      id: 826,
      question: "Qual é o perímetro de um retângulo com 5cm de largura e 17cm de altura?",
      options: ["44", "46", "42", "85"],
      correctIndex: 0,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (5 + 17) = 44cm."
    },
    {
      id: 827,
      question: "Qual é a área de um retângulo com 21cm de largura e 16cm de altura?",
      options: ["336", "320", "74", "357"],
      correctIndex: 0,
      explanation: "Área = largura × altura = 21 × 16 = 336cm²."
    },
    {
      id: 828,
      question: "Qual é a área de um retângulo com 16cm de largura e 15cm de altura?",
      options: ["240", "256", "225", "62"],
      correctIndex: 0,
      explanation: "Área = largura × altura = 16 × 15 = 240cm²."
    },
    {
      id: 829,
      question: "Qual é o perímetro de um retângulo com 10cm de largura e 8cm de altura?",
      options: ["80", "36", "38", "34"],
      correctIndex: 1,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (10 + 8) = 36cm."
    },
    {
      id: 830,
      question: "Qual é o perímetro de um retângulo com 7cm de largura e 4cm de altura?",
      options: ["20", "22", "28", "24"],
      correctIndex: 1,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (7 + 4) = 22cm."
    },
    {
      id: 831,
      question: "Qual é a área de um retângulo com 8cm de largura e 20cm de altura?",
      options: ["168", "160", "56", "140"],
      correctIndex: 1,
      explanation: "Área = largura × altura = 8 × 20 = 160cm²."
    },
    {
      id: 832,
      question: "Qual é a área de um retângulo com 7cm de largura e 13cm de altura?",
      options: ["40", "78", "91", "98"],
      correctIndex: 2,
      explanation: "Área = largura × altura = 7 × 13 = 91cm²."
    },
    {
      id: 833,
      question: "Qual é a área de um retângulo com 11cm de largura e 9cm de altura?",
      options: ["90", "40", "110", "99"],
      correctIndex: 3,
      explanation: "Área = largura × altura = 11 × 9 = 99cm²."
    },
    {
      id: 834,
      question: "Qual é o perímetro de um retângulo com 3cm de largura e 3cm de altura?",
      options: ["9", "12", "14", "10"],
      correctIndex: 1,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (3 + 3) = 12cm."
    },
    {
      id: 835,
      question: "Qual é a área de um retângulo com 10cm de largura e 16cm de altura?",
      options: ["160", "52", "170", "144"],
      correctIndex: 0,
      explanation: "Área = largura × altura = 10 × 16 = 160cm²."
    },
    {
      id: 836,
      question: "Qual é o perímetro de um retângulo com 19cm de largura e 5cm de altura?",
      options: ["48", "50", "95", "46"],
      correctIndex: 0,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (19 + 5) = 48cm."
    },
    {
      id: 837,
      question: "Qual é o perímetro de um retângulo com 7cm de largura e 25cm de altura?",
      options: ["66", "64", "62", "175"],
      correctIndex: 1,
      explanation: "Perímetro = 2 × (largura + altura) = 2 × (7 + 25) = 64cm."
    },
    {
      id: 838,
      question: "Qual é a área de um retângulo com 13cm de largura e 10cm de altura?",
      options: ["120", "143", "46", "130"],
      correctIndex: 3,
      explanation: "Área = largura × altura = 13 × 10 = 130cm²."
    },
    {
      id: 839,
      question: "Qual é a área de um retângulo com 8cm de largura e 17cm de altura?",
      options: ["50", "119", "136", "144"],
      correctIndex: 2,
      explanation: "Área = largura × altura = 8 × 17 = 136cm²."
    },
    {
      id: 840,
      question: "Qual é a área de um retângulo com 7cm de largura e 17cm de altura?",
      options: ["119", "102", "126", "48"],
      correctIndex: 0,
      explanation: "Área = largura × altura = 7 × 17 = 119cm²."
    },
    {
      id: 841,
      question: "Qual é a média aritmética dos números: 12, 20, 9, 21, 48?",
      options: ["22", "21", "23", "24"],
      correctIndex: 0,
      explanation: "Soma dos números: 110. Média = 110 ÷ 5 = 22."
    },
    {
      id: 842,
      question: "Qual é a média aritmética dos números: 9, 16, 42, 27, 6?",
      options: ["22", "19", "21", "20"],
      correctIndex: 3,
      explanation: "Soma dos números: 100. Média = 100 ÷ 5 = 20."
    },
    {
      id: 843,
      question: "Qual é a média aritmética dos números: 51, 17, 35, 9?",
      options: ["29", "28", "30", "27"],
      correctIndex: 1,
      explanation: "Soma dos números: 112. Média = 112 ÷ 4 = 28."
    },
    {
      id: 844,
      question: "Qual é a média aritmética dos números: 15, 36, 36?",
      options: ["30", "29", "31", "28"],
      correctIndex: 1,
      explanation: "Soma dos números: 87. Média = 87 ÷ 3 = 29."
    },
    {
      id: 845,
      question: "Qual é a média aritmética dos números: 20, 24, 28?",
      options: ["26", "24", "25", "23"],
      correctIndex: 1,
      explanation: "Soma dos números: 72. Média = 72 ÷ 3 = 24."
    },
    {
      id: 846,
      question: "Qual é a média aritmética dos números: 12, 28, 4, 16?",
      options: ["17", "15", "14", "16"],
      correctIndex: 1,
      explanation: "Soma dos números: 60. Média = 60 ÷ 4 = 15."
    },
    {
      id: 847,
      question: "Qual é a média aritmética dos números: 10, 76, 100?",
      options: ["64", "61", "62", "63"],
      correctIndex: 2,
      explanation: "Soma dos números: 186. Média = 186 ÷ 3 = 62."
    },
    {
      id: 848,
      question: "Qual é a média aritmética dos números: 1, 35, 44, 85, 100?",
      options: ["52", "54", "55", "53"],
      correctIndex: 3,
      explanation: "Soma dos números: 265. Média = 265 ÷ 5 = 53."
    },
    {
      id: 849,
      question: "Qual é a média aritmética dos números: 42, 35, 24, 18, 16?",
      options: ["28", "26", "29", "27"],
      correctIndex: 3,
      explanation: "Soma dos números: 135. Média = 135 ÷ 5 = 27."
    },
    {
      id: 850,
      question: "Qual é a média aritmética dos números: 20, 64, 28, 32, 16?",
      options: ["31", "34", "32", "33"],
      correctIndex: 2,
      explanation: "Soma dos números: 160. Média = 160 ÷ 5 = 32."
    },
    {
      id: 851,
      question: "Qual é a média aritmética dos números: 8, 20, 40, 60?",
      options: ["34", "32", "31", "33"],
      correctIndex: 1,
      explanation: "Soma dos números: 128. Média = 128 ÷ 4 = 32."
    },
    {
      id: 852,
      question: "Qual é a média aritmética dos números: 8, 8, 65, 27?",
      options: ["27", "29", "28", "26"],
      correctIndex: 0,
      explanation: "Soma dos números: 108. Média = 108 ÷ 4 = 27."
    },
    {
      id: 853,
      question: "Qual é a média aritmética dos números: 12, 36, 12?",
      options: ["22", "19", "20", "21"],
      correctIndex: 2,
      explanation: "Soma dos números: 60. Média = 60 ÷ 3 = 20."
    },
    {
      id: 854,
      question: "Qual é a média aritmética dos números: 36, 18, 8, 6?",
      options: ["17", "19", "18", "16"],
      correctIndex: 0,
      explanation: "Soma dos números: 68. Média = 68 ÷ 4 = 17."
    },
    {
      id: 855,
      question: "Qual é a média aritmética dos números: 38, 8, 30, 33, 76?",
      options: ["36", "38", "37", "39"],
      correctIndex: 2,
      explanation: "Soma dos números: 185. Média = 185 ÷ 5 = 37."
    },
    {
      id: 856,
      question: "Qual é a média aritmética dos números: 9, 15, 9?",
      options: ["11", "12", "13", "10"],
      correctIndex: 0,
      explanation: "Soma dos números: 33. Média = 33 ÷ 3 = 11."
    },
    {
      id: 857,
      question: "Qual é a média aritmética dos números: 12, 30, 48, 10?",
      options: ["24", "27", "25", "26"],
      correctIndex: 2,
      explanation: "Soma dos números: 100. Média = 100 ÷ 4 = 25."
    },
    {
      id: 858,
      question: "Qual é a média aritmética dos números: 3, 8, 25, 20, 14?",
      options: ["14", "15", "13", "16"],
      correctIndex: 0,
      explanation: "Soma dos números: 70. Média = 70 ÷ 5 = 14."
    },
    {
      id: 859,
      question: "Qual é a média aritmética dos números: 12, 25, 11?",
      options: ["15", "16", "18", "17"],
      correctIndex: 1,
      explanation: "Soma dos números: 48. Média = 48 ÷ 3 = 16."
    },
    {
      id: 860,
      question: "Qual é a média aritmética dos números: 15, 8, 40?",
      options: ["21", "23", "22", "20"],
      correctIndex: 0,
      explanation: "Soma dos números: 63. Média = 63 ÷ 3 = 21."
    },
    {
      id: 861,
      question: "Qual é a média aritmética dos números: 15, 30, 7, 48, 15?",
      options: ["22", "24", "25", "23"],
      correctIndex: 3,
      explanation: "Soma dos números: 115. Média = 115 ÷ 5 = 23."
    },
    {
      id: 862,
      question: "Qual é a média aritmética dos números: 39, 3, 24?",
      options: ["23", "21", "24", "22"],
      correctIndex: 3,
      explanation: "Soma dos números: 66. Média = 66 ÷ 3 = 22."
    },
    {
      id: 863,
      question: "Qual é a média aritmética dos números: 40, 26, 60?",
      options: ["44", "43", "42", "41"],
      correctIndex: 2,
      explanation: "Soma dos números: 126. Média = 126 ÷ 3 = 42."
    },
    {
      id: 864,
      question: "Qual é a média aritmética dos números: 20, 85, 72?",
      options: ["60", "58", "61", "59"],
      correctIndex: 3,
      explanation: "Soma dos números: 177. Média = 177 ÷ 3 = 59."
    },
    {
      id: 865,
      question: "Qual é a média aritmética dos números: 90, 50, 7?",
      options: ["48", "51", "50", "49"],
      correctIndex: 3,
      explanation: "Soma dos números: 147. Média = 147 ÷ 3 = 49."
    },
    {
      id: 866,
      question: "Qual é a média aritmética dos números: 25, 18, 14?",
      options: ["18", "21", "19", "20"],
      correctIndex: 2,
      explanation: "Soma dos números: 57. Média = 57 ÷ 3 = 19."
    },
    {
      id: 867,
      question: "Qual é a média aritmética dos números: 19, 68, 18?",
      options: ["37", "34", "36", "35"],
      correctIndex: 3,
      explanation: "Soma dos números: 105. Média = 105 ÷ 3 = 35."
    },
    {
      id: 868,
      question: "Qual é a média aritmética dos números: 10, 28, 9, 30, 18?",
      options: ["21", "20", "19", "18"],
      correctIndex: 2,
      explanation: "Soma dos números: 95. Média = 95 ÷ 5 = 19."
    },
    {
      id: 869,
      question: "Qual é a média aritmética dos números: 36, 21, 12?",
      options: ["24", "25", "22", "23"],
      correctIndex: 3,
      explanation: "Soma dos números: 69. Média = 69 ÷ 3 = 23."
    },
    {
      id: 870,
      question: "Qual é a média aritmética dos números: 11, 3, 45, 57?",
      options: ["30", "29", "28", "31"],
      correctIndex: 1,
      explanation: "Soma dos números: 116. Média = 116 ÷ 4 = 29."
    },
    {
      id: 871,
      question: "Complete a sequência: 1, 7, 8, 15, 23, ? (cada número é a soma dos dois anteriores)",
      options: ["39", "38", "37", "40"],
      correctIndex: 1,
      explanation: "15 + 23 = 38."
    },
    {
      id: 872,
      question: "Complete a sequência: 2, 1, 3, 4, 7, ? (cada número é a soma dos dois anteriores)",
      options: ["10", "11", "13", "12"],
      correctIndex: 1,
      explanation: "4 + 7 = 11."
    },
    {
      id: 873,
      question: "Complete a sequência: 8, 3, 11, 14, 25, ? (cada número é a soma dos dois anteriores)",
      options: ["40", "39", "38", "41"],
      correctIndex: 1,
      explanation: "14 + 25 = 39."
    },
    {
      id: 874,
      question: "Complete a sequência: 5, 8, 13, 21, 34, ? (cada número é a soma dos dois anteriores)",
      options: ["54", "56", "57", "55"],
      correctIndex: 3,
      explanation: "21 + 34 = 55."
    },
    {
      id: 875,
      question: "Complete a sequência: 10, 10, 20, 30, 50, ? (cada número é a soma dos dois anteriores)",
      options: ["80", "81", "82", "79"],
      correctIndex: 0,
      explanation: "30 + 50 = 80."
    },
    {
      id: 876,
      question: "Complete a sequência: 8, 7, 15, 22, 37, ? (cada número é a soma dos dois anteriores)",
      options: ["61", "60", "58", "59"],
      correctIndex: 3,
      explanation: "22 + 37 = 59."
    },
    {
      id: 877,
      question: "Complete a sequência: 9, 7, 16, 23, 39, ? (cada número é a soma dos dois anteriores)",
      options: ["63", "62", "61", "64"],
      correctIndex: 1,
      explanation: "23 + 39 = 62."
    },
    {
      id: 878,
      question: "Complete a sequência: 4, 7, 11, 18, 29, ? (cada número é a soma dos dois anteriores)",
      options: ["46", "49", "47", "48"],
      correctIndex: 2,
      explanation: "18 + 29 = 47."
    },
    {
      id: 879,
      question: "Complete a sequência: 3, 4, 7, 11, 18, ? (cada número é a soma dos dois anteriores)",
      options: ["29", "31", "28", "30"],
      correctIndex: 0,
      explanation: "11 + 18 = 29."
    },
    {
      id: 880,
      question: "Complete a sequência: 2, 5, 7, 12, 19, ? (cada número é a soma dos dois anteriores)",
      options: ["32", "33", "31", "30"],
      correctIndex: 2,
      explanation: "12 + 19 = 31."
    },
    {
      id: 881,
      question: "Complete a sequência: 7, 2, 9, 11, 20, ? (cada número é a soma dos dois anteriores)",
      options: ["32", "33", "31", "30"],
      correctIndex: 2,
      explanation: "11 + 20 = 31."
    },
    {
      id: 882,
      question: "Complete a sequência: 6, 8, 14, 22, 36, ? (cada número é a soma dos dois anteriores)",
      options: ["58", "57", "59", "60"],
      correctIndex: 0,
      explanation: "22 + 36 = 58."
    },
    {
      id: 883,
      question: "Complete a sequência: 10, 3, 13, 16, 29, ? (cada número é a soma dos dois anteriores)",
      options: ["46", "45", "44", "47"],
      correctIndex: 1,
      explanation: "16 + 29 = 45."
    },
    {
      id: 884,
      question: "Complete a sequência: 7, 9, 16, 25, 41, ? (cada número é a soma dos dois anteriores)",
      options: ["66", "67", "68", "65"],
      correctIndex: 0,
      explanation: "25 + 41 = 66."
    },
    {
      id: 885,
      question: "Complete a sequência: 7, 4, 11, 15, 26, ? (cada número é a soma dos dois anteriores)",
      options: ["43", "41", "42", "40"],
      correctIndex: 1,
      explanation: "15 + 26 = 41."
    },
    {
      id: 886,
      question: "Complete a sequência: 1, 8, 9, 17, 26, ? (cada número é a soma dos dois anteriores)",
      options: ["43", "42", "44", "45"],
      correctIndex: 0,
      explanation: "17 + 26 = 43."
    },
    {
      id: 887,
      question: "Complete a sequência: 7, 10, 17, 27, 44, ? (cada número é a soma dos dois anteriores)",
      options: ["70", "71", "73", "72"],
      correctIndex: 1,
      explanation: "27 + 44 = 71."
    },
    {
      id: 888,
      question: "Complete a sequência: 6, 5, 11, 16, 27, ? (cada número é a soma dos dois anteriores)",
      options: ["42", "44", "43", "45"],
      correctIndex: 2,
      explanation: "16 + 27 = 43."
    },
    {
      id: 889,
      question: "Complete a sequência: 6, 4, 10, 14, 24, ? (cada número é a soma dos dois anteriores)",
      options: ["40", "39", "37", "38"],
      correctIndex: 3,
      explanation: "14 + 24 = 38."
    },
    {
      id: 890,
      question: "Complete a sequência: 4, 10, 14, 24, 38, ? (cada número é a soma dos dois anteriores)",
      options: ["64", "61", "62", "63"],
      correctIndex: 2,
      explanation: "24 + 38 = 62."
    },
    {
      id: 891,
      question: "Complete a sequência: 5, 4, 9, 13, 22, ? (cada número é a soma dos dois anteriores)",
      options: ["35", "34", "36", "37"],
      correctIndex: 0,
      explanation: "13 + 22 = 35."
    },
    {
      id: 892,
      question: "Complete a sequência: 10, 5, 15, 20, 35, ? (cada número é a soma dos dois anteriores)",
      options: ["56", "57", "54", "55"],
      correctIndex: 3,
      explanation: "20 + 35 = 55."
    },
    {
      id: 893,
      question: "Complete a sequência: 10, 7, 17, 24, 41, ? (cada número é a soma dos dois anteriores)",
      options: ["65", "66", "64", "67"],
      correctIndex: 0,
      explanation: "24 + 41 = 65."
    },
    {
      id: 894,
      question: "Complete a sequência: 5, 2, 7, 9, 16, ? (cada número é a soma dos dois anteriores)",
      options: ["24", "26", "25", "27"],
      correctIndex: 2,
      explanation: "9 + 16 = 25."
    },
    {
      id: 895,
      question: "Complete a sequência: 8, 2, 10, 12, 22, ? (cada número é a soma dos dois anteriores)",
      options: ["36", "34", "33", "35"],
      correctIndex: 1,
      explanation: "12 + 22 = 34."
    },
    {
      id: 896,
      question: "Qual é o maior órgão do corpo humano?",
      options: ["O fígado", "A pele", "O intestino", "O pulmão"],
      correctIndex: 1,
      explanation: "A pele é o maior órgão do corpo humano, responsável pela proteção externa."
    },
    {
      id: 897,
      question: "Em que país se originou o sushi?",
      options: ["China", "Coreia do Sul", "Japão", "Tailândia"],
      correctIndex: 2,
      explanation: "O sushi é um prato tradicional japonês."
    },
    {
      id: 898,
      question: "Qual é a capital da Espanha?",
      options: ["Barcelona", "Madri", "Sevilha", "Valência"],
      correctIndex: 1,
      explanation: "Madri é a capital e maior cidade da Espanha."
    },
    {
      id: 899,
      question: "Quem escreveu 'Os Lusíadas'?",
      options: ["Fernando Pessoa", "Luís de Camões", "José Saramago", "Eça de Queirós"],
      correctIndex: 1,
      explanation: "'Os Lusíadas' é um poema épico escrito por Luís de Camões no século XVI."
    },
    {
      id: 900,
      question: "Qual é o animal símbolo da Austrália, que carrega os filhotes na bolsa?",
      options: ["O coala", "O canguru", "O wombat", "O dingo"],
      correctIndex: 1,
      explanation: "O canguru é um marsupial símbolo da fauna australiana."
    },
    {
      id: 901,
      question: "Aproximadamente quantos ossos tem a coluna vertebral humana?",
      options: ["24", "33", "40", "50"],
      correctIndex: 1,
      explanation: "A coluna vertebral humana é formada por cerca de 33 vértebras."
    },
    {
      id: 902,
      question: "Qual é a maior ilha do mundo?",
      options: ["Madagascar", "Groenlândia", "Bornéu", "Sumatra"],
      correctIndex: 1,
      explanation: "A Groenlândia é a maior ilha do mundo em área."
    },
    {
      id: 903,
      question: "Em que ano o Brasil se tornou independente de Portugal?",
      options: ["1808", "1822", "1889", "1500"],
      correctIndex: 1,
      explanation: "A independência do Brasil foi proclamada por Dom Pedro I em 1822."
    },
    {
      id: 904,
      question: "Qual metal, conhecido pelo brilho amarelo, é muito usado em joias?",
      options: ["O bronze", "A prata", "O ouro", "O cobre"],
      correctIndex: 2,
      explanation: "O ouro é valorizado por seu brilho característico e é amplamente usado em joalheria."
    },
    {
      id: 905,
      question: "Quantas patas tem um inseto, em geral?",
      options: ["4", "6", "8", "10"],
      correctIndex: 1,
      explanation: "Insetos são artrópodes que possuem 6 patas."
    },
    {
      id: 906,
      question: "Qual é o maior rio da Europa em extensão?",
      options: ["Reno", "Danúbio", "Volga", "Sena"],
      correctIndex: 2,
      explanation: "O rio Volga, na Rússia, é o maior rio da Europa em extensão."
    },
    {
      id: 907,
      question: "Quem foi o primeiro ser humano a viajar ao espaço?",
      options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
      correctIndex: 1,
      explanation: "O cosmonauta soviético Yuri Gagarin foi o primeiro humano a ir ao espaço, em 1961."
    },
    {
      id: 908,
      question: "Qual é a capital de Portugal?",
      options: ["Porto", "Lisboa", "Coimbra", "Faro"],
      correctIndex: 1,
      explanation: "Lisboa é a capital de Portugal."
    },
    {
      id: 909,
      question: "Quantos átomos de hidrogênio tem uma molécula de água (H₂O)?",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      explanation: "A fórmula H₂O indica 2 átomos de hidrogênio e 1 de oxigênio."
    },
    {
      id: 910,
      question: "Qual é o esporte mais praticado no mundo?",
      options: ["O basquete", "O futebol", "O tênis", "O vôlei"],
      correctIndex: 1,
      explanation: "O futebol é considerado o esporte com mais praticantes e fãs no mundo todo."
    },
    {
      id: 911,
      question: "Em que órgão do corpo humano o sangue é filtrado?",
      options: ["O fígado", "O coração", "Os rins", "O baço"],
      correctIndex: 2,
      explanation: "Os rins filtram o sangue, removendo toxinas e excesso de líquido, que formam a urina."
    },
    {
      id: 912,
      question: "Qual é a montanha mais alta da América do Sul?",
      options: ["Chimborazo", "Aconcágua", "Pico da Neblina", "Cotopaxi"],
      correctIndex: 1,
      explanation: "O Aconcágua, na Argentina, é o ponto mais alto da América do Sul e também do hemisfério ocidental."
    },
    {
      id: 913,
      question: "Quantos lados tem um pentágono?",
      options: ["4", "5", "6", "7"],
      correctIndex: 1,
      explanation: "O prefixo 'penta' significa cinco — um pentágono tem 5 lados."
    },
    {
      id: 914,
      question: "Qual civilização antiga construiu as pirâmides de Gizé?",
      options: ["Os romanos", "Os egípcios", "Os maias", "Os gregos"],
      correctIndex: 1,
      explanation: "As pirâmides de Gizé foram construídas pelos antigos egípcios há milhares de anos."
    },
    {
      id: 915,
      question: "Qual é o idioma oficial mais falado como nativo na América Latina?",
      options: ["O português", "O espanhol", "O inglês", "O francês"],
      correctIndex: 1,
      explanation: "O espanhol é o idioma nativo de mais países e falantes na América Latina."
    },
    {
      id: 916,
      question: "Quem pintou o teto da Capela Sistina?",
      options: ["Rafael", "Michelangelo", "Leonardo da Vinci", "Ticiano"],
      correctIndex: 1,
      explanation: "Michelangelo pintou os afrescos do teto da Capela Sistina no início do século XVI."
    },
    {
      id: 917,
      question: "Qual país tem o formato de uma bota na Europa?",
      options: ["Grécia", "Itália", "Espanha", "Croácia"],
      correctIndex: 1,
      explanation: "A Itália é famosa por seu território com formato semelhante a uma bota."
    },
    {
      id: 918,
      question: "Qual é a capital da Alemanha?",
      options: ["Munique", "Frankfurt", "Berlim", "Hamburgo"],
      correctIndex: 2,
      explanation: "Berlim é a capital da Alemanha."
    },
    {
      id: 919,
      question: "Quem formulou a teoria da relatividade?",
      options: ["Isaac Newton", "Albert Einstein", "Galileu Galilei", "Niels Bohr"],
      correctIndex: 1,
      explanation: "Albert Einstein desenvolveu a teoria da relatividade no início do século XX."
    },
    {
      id: 920,
      question: "Qual é o maior deserto frio do mundo?",
      options: ["O Ártico", "O Saara", "A Antártida", "O Gobi"],
      correctIndex: 2,
      explanation: "A Antártida é tecnicamente classificada como o maior deserto do mundo, por sua baixíssima precipitação."
    },
    {
      id: 921,
      question: "Quantos jogadores de cada time ficam em quadra em uma partida de vôlei?",
      options: ["5", "6", "7", "8"],
      correctIndex: 1,
      explanation: "Cada time de vôlei tem 6 jogadores em quadra."
    },
    {
      id: 922,
      question: "Qual é a moeda usada pela maioria dos países da União Europeia?",
      options: ["A libra", "O franco", "O euro", "O marco"],
      correctIndex: 2,
      explanation: "O euro é a moeda oficial adotada pela maioria dos países da União Europeia."
    },
    {
      id: 923,
      question: "Em que continente vivem os pinguins-imperadores em estado selvagem?",
      options: ["América do Sul", "Antártida", "Ásia", "Oceania"],
      correctIndex: 1,
      explanation: "Os pinguins-imperadores habitam naturalmente a Antártida."
    },
    {
      id: 924,
      question: "Qual foi o primeiro satélite artificial lançado ao espaço?",
      options: ["Explorer 1", "Sputnik 1", "Voyager 1", "Apollo 1"],
      correctIndex: 1,
      explanation: "O Sputnik 1, lançado pela União Soviética em 1957, foi o primeiro satélite artificial da história."
    },
    {
      id: 925,
      question: "Quantas cordas tem um violino tradicional?",
      options: ["4", "5", "6", "3"],
      correctIndex: 0,
      explanation: "O violino tradicional possui 4 cordas."
    },
    {
      id: 926,
      question: "Qual é a capital da Rússia?",
      options: ["São Petersburgo", "Moscou", "Kiev", "Minsk"],
      correctIndex: 1,
      explanation: "Moscou é a capital da Rússia."
    },
    {
      id: 927,
      question: "Quem foi o principal autor da Declaração de Independência dos Estados Unidos?",
      options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "Abraham Lincoln"],
      correctIndex: 1,
      explanation: "Thomas Jefferson foi o principal redator da Declaração de Independência americana, em 1776."
    },
    {
      id: 928,
      question: "Qual é o animal mais alto do mundo?",
      options: ["O elefante", "A girafa", "O avestruz", "O camelo"],
      correctIndex: 1,
      explanation: "A girafa é o animal terrestre mais alto do mundo, podendo ultrapassar 5 metros."
    },
    {
      id: 929,
      question: "Quantos minutos dura, em média, cada quarto de uma partida da NBA?",
      options: ["10", "12", "15", "20"],
      correctIndex: 1,
      explanation: "Cada um dos 4 quartos de uma partida da NBA tem 12 minutos."
    },
    {
      id: 930,
      question: "Qual é o maior lago de água doce do mundo em volume?",
      options: ["Lago Superior", "Lago Vitória", "Lago Baikal", "Lago Titicaca"],
      correctIndex: 2,
      explanation: "O Lago Baikal, na Rússia, contém o maior volume de água doce do mundo."
    },
    {
      id: 931,
      question: "Em que país se originou a pizza margherita?",
      options: ["França", "Itália", "Grécia", "Espanha"],
      correctIndex: 1,
      explanation: "A pizza margherita foi criada em Nápoles, na Itália."
    },
    {
      id: 932,
      question: "Como se chama o processo pelo qual as plantas produzem seu próprio alimento usando luz solar?",
      options: ["Respiração", "Fotossíntese", "Germinação", "Fermentação"],
      correctIndex: 1,
      explanation: "A fotossíntese é o processo que permite às plantas converter luz solar em energia química."
    },
    {
      id: 933,
      question: "Aproximadamente quantos ossos tem a mão humana, incluindo o pulso?",
      options: ["19", "27", "33", "40"],
      correctIndex: 1,
      explanation: "A mão humana tem cerca de 27 ossos, contando os do pulso, palma e dedos."
    },
    {
      id: 934,
      question: "Qual é a capital do Egito?",
      options: ["Alexandria", "Cairo", "Luxor", "Gizé"],
      correctIndex: 1,
      explanation: "Cairo é a capital e maior cidade do Egito."
    },
    {
      id: 935,
      question: "Quem foi o primeiro imperador do Brasil?",
      options: ["Dom João VI", "Dom Pedro I", "Dom Pedro II", "Marechal Deodoro"],
      correctIndex: 1,
      explanation: "Dom Pedro I tornou-se o primeiro imperador do Brasil após a independência, em 1822."
    },
    {
      id: 936,
      question: "Qual é o maior primata do mundo?",
      options: ["O chimpanzé", "O orangotango", "O gorila", "O babuíno"],
      correctIndex: 2,
      explanation: "O gorila é o maior primata vivo do mundo."
    },
    {
      id: 937,
      question: "Quantas horas tem um dia na Terra?",
      options: ["12", "24", "36", "48"],
      correctIndex: 1,
      explanation: "Um dia na Terra, definido pela rotação do planeta, tem 24 horas."
    },
    {
      id: 938,
      question: "Como se chama a camada mais externa e sólida da Terra, onde vivemos?",
      options: ["O manto", "O núcleo", "A crosta terrestre", "A atmosfera"],
      correctIndex: 2,
      explanation: "A crosta terrestre é a camada sólida mais externa do planeta."
    },
    {
      id: 939,
      question: "Em qual esporte se usa o termo 'xeque-mate'?",
      options: ["Damas", "Xadrez", "Dominó", "Buraco"],
      correctIndex: 1,
      explanation: "'Xeque-mate' é o termo usado no xadrez para indicar o fim do jogo."
    },
    {
      id: 940,
      question: "Qual é o maior anfíbio do mundo?",
      options: ["O sapo-boi", "A salamandra-gigante-chinesa", "A rã-touro", "O axolote"],
      correctIndex: 1,
      explanation: "A salamandra-gigante-chinesa é considerada o maior anfíbio vivo do mundo."
    },
    {
      id: 941,
      question: "Quantos planetas do sistema solar possuem anéis visíveis?",
      options: ["2", "3", "4", "5"],
      correctIndex: 2,
      explanation: "Júpiter, Saturno, Urano e Netuno possuem sistemas de anéis, totalizando 4 planetas."
    },
    {
      id: 942,
      question: "Qual é a capital da China?",
      options: ["Xangai", "Pequim", "Hong Kong", "Cantão"],
      correctIndex: 1,
      explanation: "Pequim é a capital da China."
    },
    {
      id: 943,
      question: "Quem compôs a 'Nona Sinfonia'?",
      options: ["Mozart", "Bach", "Ludwig van Beethoven", "Chopin"],
      correctIndex: 2,
      explanation: "A 'Nona Sinfonia' é uma das obras mais célebres de Ludwig van Beethoven."
    },
    {
      id: 944,
      question: "Qual é o menor planeta do sistema solar?",
      options: ["Marte", "Vênus", "Mercúrio", "Plutão"],
      correctIndex: 2,
      explanation: "Mercúrio é o menor e mais próximo planeta do Sol no sistema solar."
    },
    {
      id: 945,
      question: "Quantos dias tem um ano bissexto?",
      options: ["364", "365", "366", "367"],
      correctIndex: 2,
      explanation: "Um ano bissexto tem 366 dias, com um dia extra em fevereiro."
    },
    {
      id: 946,
      question: "Qual é o maior felino do mundo?",
      options: ["O leão", "O tigre", "O jaguar", "A onça-pintada"],
      correctIndex: 1,
      explanation: "O tigre é considerado o maior felino do mundo em tamanho e peso."
    },
    {
      id: 947,
      question: "Em que país fica o Taj Mahal?",
      options: ["Paquistão", "Índia", "Bangladesh", "Nepal"],
      correctIndex: 1,
      explanation: "O Taj Mahal está localizado na cidade de Agra, na Índia."
    },
    {
      id: 948,
      question: "Qual é a capital do México?",
      options: ["Guadalajara", "Cidade do México", "Cancún", "Monterrey"],
      correctIndex: 1,
      explanation: "A Cidade do México é a capital do país."
    },
    {
      id: 949,
      question: "Quantas cores primárias existem na pintura tradicional?",
      options: ["2", "3", "4", "5"],
      correctIndex: 1,
      explanation: "As três cores primárias tradicionais são vermelho, azul e amarelo."
    },
    {
      id: 950,
      question: "Qual gás as plantas absorvem durante a fotossíntese?",
      options: ["Oxigênio", "Nitrogênio", "Dióxido de carbono", "Hidrogênio"],
      correctIndex: 2,
      explanation: "As plantas absorvem dióxido de carbono (CO₂) e liberam oxigênio durante a fotossíntese."
    },
    {
      id: 951,
      question: "Quem liderou o movimento de resistência pacífica contra o domínio britânico na Índia?",
      options: ["Nelson Mandela", "Mahatma Gandhi", "Martin Luther King", "Jawaharlal Nehru"],
      correctIndex: 1,
      explanation: "Mahatma Gandhi liderou o movimento de independência indiano por meio da resistência pacífica."
    },
    {
      id: 952,
      question: "Qual é o maior arquipélago do mundo em número de ilhas?",
      options: ["Filipinas", "Japão", "Indonésia", "Grécia"],
      correctIndex: 2,
      explanation: "A Indonésia é formada por milhares de ilhas, sendo o maior arquipélago do mundo."
    },
    {
      id: 953,
      question: "Quantos sentidos básicos o ser humano possui, segundo a classificação tradicional?",
      options: ["3", "4", "5", "6"],
      correctIndex: 2,
      explanation: "Os 5 sentidos tradicionais são: visão, audição, olfato, paladar e tato."
    },
    {
      id: 954,
      question: "Qual é o planeta mais próximo do Sol?",
      options: ["Vênus", "Terra", "Mercúrio", "Marte"],
      correctIndex: 2,
      explanation: "Mercúrio é o planeta mais próximo do Sol no sistema solar."
    },
    {
      id: 955,
      question: "Qual é a capital da Grécia?",
      options: ["Atenas", "Esparta", "Tessalônica", "Creta"],
      correctIndex: 0,
      explanation: "Atenas é a capital da Grécia e um dos berços da civilização ocidental."
    },
    {
      id: 956,
      question: "Charada: tenho braços, mas não abraço; me abro quando chove. O que sou?",
      options: ["Um casaco", "Um guarda-chuva", "Uma capa de chuva", "Uma sombrinha de praia"],
      correctIndex: 1,
      explanation: "O guarda-chuva se abre para proteger da chuva, apesar de ter 'braços' (varetas)."
    },
    {
      id: 957,
      question: "Charada: empurro tudo no meu caminho, mas ninguém consegue me ver. O que sou?",
      options: ["A gravidade", "O vento", "O tempo", "O som"],
      correctIndex: 1,
      explanation: "O vento é invisível, mas sua força pode mover objetos."
    },
    {
      id: 958,
      question: "Charada: tenho língua, mas não falo; tenho sola, mas não ando sozinho. O que sou?",
      options: ["Uma meia", "Um sapato", "Uma luva", "Um boné"],
      correctIndex: 1,
      explanation: "O sapato tem 'língua' (parte interna) e 'sola', mas não se move sem alguém calçá-lo."
    },
    {
      id: 959,
      question: "Charada: entro na sua boca todos os dias, mas nunca sou engolida. O que sou?",
      options: ["Uma colher", "Uma escova de dentes", "Uma pastilha", "Um talher"],
      correctIndex: 1,
      explanation: "A escova de dentes é usada dentro da boca diariamente, mas nunca é engolida."
    },
    {
      id: 960,
      question: "Charada: faço espuma, mas não sou refrigerante; deixo você limpo. O que sou?",
      options: ["O sabão", "A esponja", "O xampu", "A toalha"],
      correctIndex: 0,
      explanation: "O sabão faz espuma ao entrar em contato com água, ajudando na limpeza."
    },
    {
      id: 961,
      question: "Charada: mostro seu rosto, mas não sou uma câmera; posso quebrar em mil pedaços. O que sou?",
      options: ["Uma foto", "Um espelho", "Uma tela", "Um retrato"],
      correctIndex: 1,
      explanation: "O espelho reflete sua imagem e pode se estilhaçar se for quebrado."
    },
    {
      id: 962,
      question: "Charada: tenho duas rodas, e você pedala para eu andar. O que sou?",
      options: ["Uma moto", "Uma bicicleta", "Um patinete", "Um triciclo"],
      correctIndex: 1,
      explanation: "A bicicleta tem duas rodas e é movida pela pedalada de quem a usa."
    },
    {
      id: 963,
      question: "Charada: tenho cordas, mas não sirvo para amarrar nada; faço música quando dedilhado. O que sou?",
      options: ["Um violão", "Um tambor", "Uma flauta", "Um pandeiro"],
      correctIndex: 0,
      explanation: "O violão produz música por meio de suas cordas, que são dedilhadas ou tocadas com palheta."
    },
    {
      id: 964,
      question: "Charada: fico no fogo, mas não me queimo; ajudo a cozinhar sua comida. O que sou?",
      options: ["Uma panela", "Uma faca", "Uma tábua", "Uma colher de pau"],
      correctIndex: 0,
      explanation: "A panela é feita para resistir ao fogo e cozinhar os alimentos."
    },
    {
      id: 965,
      question: "Charada: sou fria por dentro mesmo no calor do verão, e guardo sua comida fresca. O que sou?",
      options: ["Uma caixa térmica", "Uma geladeira", "Um freezer", "Uma adega"],
      correctIndex: 1,
      explanation: "A geladeira mantém uma temperatura baixa por dentro para conservar alimentos."
    },
    {
      id: 966,
      question: "Charada: sou quente por dentro, e é graças a mim que seu bolo fica pronto. O que sou?",
      options: ["Um fogão", "Um forno", "Uma panela de pressão", "Uma air fryer"],
      correctIndex: 1,
      explanation: "O forno assa alimentos usando calor concentrado em seu interior."
    },
    {
      id: 967,
      question: "Charada: solto fumaça sem fumar, e fico no telhado das casas antigas. O que sou?",
      options: ["Uma chaminé", "Uma antena", "Um para-raios", "Uma clarabóia"],
      correctIndex: 0,
      explanation: "A chaminé permite a saída da fumaça produzida por lareiras ou fogões antigos."
    },
    {
      id: 968,
      question: "Charada: durmo por anos, mas quando acordo, posso cuspir fogo e cinzas. O que sou?",
      options: ["Um dragão", "Um vulcão", "Uma fogueira", "Um forno"],
      correctIndex: 1,
      explanation: "Um vulcão pode ficar 'adormecido' por longos períodos antes de entrar em erupção."
    },
    {
      id: 969,
      question: "Charada: sou o melhor amigo do homem e abano o rabo quando estou feliz. O que sou?",
      options: ["Um gato", "Um cachorro", "Um coelho", "Um papagaio"],
      correctIndex: 1,
      explanation: "O cachorro é conhecido como o 'melhor amigo do homem' e costuma abanar o rabo quando contente."
    },
    {
      id: 970,
      question: "Charada: ronrono quando estou feliz e caço ratos à noite. O que sou?",
      options: ["Um gato", "Uma coruja", "Um furão", "Um lince"],
      correctIndex: 0,
      explanation: "O gato é conhecido por ronronar e caçar pequenos roedores."
    },
    {
      id: 971,
      question: "Charada: faço mel e posso picar se me incomodarem. O que sou?",
      options: ["Uma vespa", "Uma abelha", "Uma mosca", "Uma formiga"],
      correctIndex: 1,
      explanation: "A abelha produz mel e possui ferrão para se defender."
    },
    {
      id: 972,
      question: "Charada: sou pequena, mas carrego coisas muito maiores que eu nas costas. O que sou?",
      options: ["Uma formiga", "Uma barata", "Uma lagarta", "Uma joaninha"],
      correctIndex: 0,
      explanation: "As formigas são conhecidas por conseguir carregar objetos muitas vezes maiores que seu próprio corpo."
    },
    {
      id: 973,
      question: "Charada: tenho 8 pernas e teço minha própria casa no ar. O que sou?",
      options: ["Um escorpião", "Uma aranha", "Um caranguejo", "Um polvo"],
      correctIndex: 1,
      explanation: "A aranha tem 8 pernas e tece teias para viver e caçar."
    },
    {
      id: 974,
      question: "Charada: tenho camadas como um livro, mas faço você chorar ao me cortar. O que sou?",
      options: ["Um repolho", "Uma cebola", "Um alho", "Uma alface"],
      correctIndex: 1,
      explanation: "A cebola libera um gás irritante ao ser cortada, causando lágrimas."
    },
    {
      id: 975,
      question: "Charada: sou pequeno e forte, deixo o hálito com cheiro marcante depois que me comem. O que sou?",
      options: ["O gengibre", "O alho", "A pimenta", "O cravo"],
      correctIndex: 1,
      explanation: "O alho é conhecido por deixar um odor forte no hálito."
    },
    {
      id: 976,
      question: "Charada: sou escuro e quente pela manhã, e deixo você mais desperto. O que sou?",
      options: ["O chá", "O café", "O chocolate quente", "O leite"],
      correctIndex: 1,
      explanation: "O café é uma bebida estimulante tradicionalmente consumida pela manhã."
    },
    {
      id: 977,
      question: "Charada: sou branco e doce, mas em excesso faço mal aos dentes. O que sou?",
      options: ["O sal", "O açúcar", "O leite em pó", "O arroz"],
      correctIndex: 1,
      explanation: "O açúcar em excesso pode contribuir para cáries e outros problemas dentários."
    },
    {
      id: 978,
      question: "Charada: as abelhas me fazem, sou doce como o açúcar, mas venho direto da natureza. O que sou?",
      options: ["O xarope", "O mel", "O melado", "O açúcar mascavo"],
      correctIndex: 1,
      explanation: "O mel é produzido pelas abelhas a partir do néctar das flores."
    },
    {
      id: 979,
      question: "Charada: tenho tronco, galhos e folhas, mas não posso andar de um lugar para o outro. O que sou?",
      options: ["Uma árvore", "Um arbusto", "Uma trepadeira", "Uma flor"],
      correctIndex: 0,
      explanation: "A árvore é fixa ao solo por suas raízes, não podendo se locomover."
    },
    {
      id: 980,
      question: "Charada: sou pequena, mas dentro de mim mora uma planta inteira esperando para crescer. O que sou?",
      options: ["Uma semente", "Uma raiz", "Uma muda", "Uma flor"],
      correctIndex: 0,
      explanation: "A semente contém o embrião de uma nova planta em seu interior."
    },
    {
      id: 981,
      question: "Charada: sou colorida e cheirosa, e as abelhas adoram me visitar. O que sou?",
      options: ["Uma fruta", "Uma flor", "Uma folha", "Uma semente"],
      correctIndex: 1,
      explanation: "As flores atraem abelhas e outros polinizadores com suas cores e perfumes."
    },
    {
      id: 982,
      question: "Charada: sou verde e faço fotossíntese, mas caio no outono. O que sou?",
      options: ["Uma semente", "Uma folha", "Uma flor", "Uma raiz"],
      correctIndex: 1,
      explanation: "As folhas realizam fotossíntese e, em muitas árvores, caem durante o outono."
    },
    {
      id: 983,
      question: "Charada: fico embaixo da terra e sustento a planta, mesmo sem ninguém me ver. O que sou?",
      options: ["Uma raiz", "Um caule", "Um bulbo", "Um tubérculo"],
      correctIndex: 0,
      explanation: "A raiz fica sob a terra, absorvendo água e nutrientes e sustentando a planta."
    },
    {
      id: 984,
      question: "Charada: tenho areia e ondas, e as pessoas me visitam no verão. O que sou?",
      options: ["Um deserto", "Uma praia", "Uma piscina", "Um rio"],
      correctIndex: 1,
      explanation: "A praia combina areia e ondas do mar, sendo um destino popular no verão."
    },
    {
      id: 985,
      question: "Charada: sou feita de vidro e areia derretida, e deixo a luz entrar em sua casa. O que sou?",
      options: ["Uma porta", "Uma janela", "Uma lâmpada", "Uma claraboia"],
      correctIndex: 1,
      explanation: "A janela é feita de vidro (derivado da areia derretida) e permite a entrada de luz natural."
    },
    {
      id: 986,
      question: "Se hoje é terça-feira, que dia da semana será daqui a 300 dias?",
      options: ["Domingo", "Segunda-feira", "Sábado", "Quarta-feira"],
      correctIndex: 1,
      explanation: "300 dividido por 7 deixa resto 6. Avançando 6 dias a partir de terça: quarta, quinta, sexta, sábado, domingo, segunda-feira."
    },
    {
      id: 987,
      question: "Numa caixa há 6 bolas verdes e 6 bolas amarelas soltas. Quantas você precisa tirar, no mínimo, para garantir 4 da mesma cor?",
      options: ["5", "6", "7", "8"],
      correctIndex: 2,
      explanation: "No pior caso, você tira 3 de cada cor (6 no total) sem formar um grupo de 4. A 7ª bola garante 4 da mesma cor."
    },
    {
      id: 988,
      question: "Se o triplo de um número menos 4 é igual a 20, qual é esse número?",
      options: ["6", "7", "8", "9"],
      correctIndex: 2,
      explanation: "3x - 4 = 20 → 3x = 24 → x = 8."
    },
    {
      id: 989,
      question: "Numa fila, Beatriz está na 7ª posição contando da frente e na 10ª posição contando de trás. Quantas pessoas há na fila?",
      options: ["15", "16", "17", "18"],
      correctIndex: 1,
      explanation: "Total = 7 + 10 - 1 (Beatriz contada duas vezes) = 16 pessoas."
    },
    {
      id: 990,
      question: "Se 4 bolos custam R$60, quanto custam 9 bolos do mesmo tipo?",
      options: ["R$120", "R$125", "R$135", "R$140"],
      correctIndex: 2,
      explanation: "Cada bolo custa R$15 (60÷4). 9 bolos custam 9 × R$15 = R$135."
    },
    {
      id: 991,
      question: "Um código transforma cada letra na letra anterior do alfabeto (B→A, C→B...). Qual é o código da palavra 'GOL'?",
      options: ["FNK", "FMK", "FNJ", "ENK"],
      correctIndex: 0,
      explanation: "G→F, O→N, L→K, formando 'FNK'."
    },
    {
      id: 992,
      question: "Se anteontem foi domingo, que dia da semana é hoje?",
      options: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Sábado"],
      correctIndex: 1,
      explanation: "Anteontem é hoje menos 2 dias. Se anteontem foi domingo, hoje é domingo + 2 = terça-feira."
    },
    {
      id: 993,
      question: "Numa estante há livros numerados de 1 a 60. Quantos desses números contêm o algarismo 4?",
      options: ["12", "13", "14", "15"],
      correctIndex: 3,
      explanation: "Os números são: 4,14,24,34,40,41,42,43,44,45,46,47,48,49,54 — totalizando 15 números."
    },
    {
      id: 994,
      question: "Se A é pai de B, e B é pai de C, o que podemos afirmar sobre A e C?",
      options: ["A é avô de C", "A e C são irmãos", "A é filho de C", "Não há relação entre eles"],
      correctIndex: 0,
      explanation: "Se A é pai de B, e B é pai de C, então A é avô de C."
    },
    {
      id: 995,
      question: "Se X + Y = 15 e X - Y = 5, qual é o valor de Y?",
      options: ["4", "5", "6", "7"],
      correctIndex: 1,
      explanation: "Subtraindo as equações: 2Y = 10 → Y = 5."
    },
    {
      id: 996,
      question: "Numa sala com 6 pessoas, cada uma aperta a mão de todas as outras exatamente uma vez. Quantos apertos de mão acontecem ao todo?",
      options: ["12", "14", "15", "18"],
      correctIndex: 2,
      explanation: "O total de combinações de 2 pessoas entre 6 é 15 (fórmula de combinação C(6,2) = 15)."
    },
    {
      id: 997,
      question: "Quantos graus o ponteiro dos minutos de um relógio percorre em 20 minutos?",
      options: ["60°", "90°", "120°", "180°"],
      correctIndex: 2,
      explanation: "O ponteiro dos minutos percorre 360° em 60 minutos, ou seja, 6° por minuto. Em 20 minutos: 20 × 6° = 120°."
    },
    {
      id: 998,
      question: "Se todos os Alfas são Betas, e alguns Betas são Gamas, o que podemos concluir com certeza?",
      options: ["Todo Alfa é Gama", "Não é possível concluir que algum Alfa é Gama", "Nenhum Alfa é Gama", "Todo Gama é Alfa"],
      correctIndex: 1,
      explanation: "As premissas não garantem que os Betas que são Gamas incluam algum Alfa — essa conclusão não é logicamente válida."
    },
    {
      id: 999,
      question: "Numa corrida de 6 pessoas, Beto chega antes de Caio, mas depois de Duda. Elis chega antes de Duda. Quem venceu a corrida?",
      options: ["Beto", "Caio", "Duda", "Elis"],
      correctIndex: 3,
      explanation: "A ordem de chegada começa com Elis, depois Duda, Beto e Caio — portanto Elis venceu."
    },
    {
      id: 1000,
      question: "Um código transforma cada número em seu triplo mais 2 (regra: n → 3n+2). Qual número originou o resultado 20?",
      options: ["4", "5", "6", "7"],
      correctIndex: 2,
      explanation: "3n + 2 = 20 → 3n = 18 → n = 6."
    }
  ];

  /* ===================================================================
     CLASSIFICAÇÃO DE DIFICULDADE
     Cada pergunta recebe uma pontuação de dificuldade (quanto maior, mais
     difícil), calculada por heurística: categoria da pergunta (detectada
     pelo padrão do texto) + magnitude dos números envolvidos + tamanho
     do enunciado. Não existe um "gabarito oficial" de dificuldade humana
     testada — é uma estimativa automática, mas consistente e reprodutível.
     =================================================================== */

  // Pontuação-base por categoria, da mais fácil para a mais difícil
  const CATEGORY_BASE_SCORE = {
    cultura_geral: 8,
    charada: 18,
    sequencia_letras: 26,
    conversao_unidades: 32,
    sequencia_aritmetica: 34,
    sequencia_geometrica: 40,
    sequencia_fibonacci: 42,
    multiplicacao_divisao: 40,
    problema_idade: 44,
    media_aritmetica: 46,
    perimetro_area: 46,
    regra_de_tres: 48,
    porcentagem_numero: 50,
    desconto_percentual: 52,
    dia_semana: 56,
    logica_geral: 66
  };

  /** Detecta a categoria de uma pergunta a partir do padrão do texto/explicação */
  function detectCategory(q) {
    const text = q.question;
    const exp = q.explanation || "";

    if (/^Charada:/i.test(text)) return "charada";
    if (/sequência de letras/i.test(text)) return "sequencia_letras";
    if (/dia da semana/i.test(text)) return "dia_semana";
    if (/% de desconto/i.test(text)) return "desconto_percentual";
    if (/% de um número/i.test(text)) return "porcentagem_numero";
    if (/perímetro|área de um retângulo/i.test(text)) return "perimetro_area";
    if (/média aritmética/i.test(text)) return "media_aritmetica";
    if (/mesmo preço unitário/i.test(text)) return "regra_de_tres";
    if (/anos\b/i.test(text) && /(Hoje,|idade)/i.test(text)) return "problema_idade";
    if (/há em \d|quantos? (centavos|gramas|metros|minutos|segundos|mililitros|centímetros|unidades)/i.test(text)) return "conversao_unidades";
    if (/divididos? igualmente|caixas? iguais/i.test(text)) return "multiplicacao_divisao";
    if (/soma dos dois anteriores/i.test(text)) return "sequencia_fibonacci";
    if (/multiplicado por/i.test(exp)) return "sequencia_geometrica";
    if (/Complete a sequência/i.test(text)) return "sequencia_aritmetica";
    if (/^(Qual|Quem|Em que|Quantos?|Quantas?)\b/i.test(text) && !/\d/.test(text)) return "cultura_geral";
    if (/^(Qual|Quem|Em que|Quantos?|Quantas?)\b/i.test(text)) return "cultura_geral";
    return "logica_geral"; // catch-all: problemas de lógica, silogismos, combinatória etc.
  }

  /** Extrai os números presentes no texto e retorna o maior valor absoluto encontrado */
  function maxNumberIn(text) {
    const matches = text.match(/\d+([.,]\d+)?/g);
    if (!matches) return 0;
    return Math.max.apply(null, matches.map(function (m) { return parseFloat(m.replace(",", ".")); }));
  }

  /** Calcula a pontuação de dificuldade (aproximada) de uma pergunta */
  function difficultyScore(q) {
    const category = detectCategory(q);
    const base = CATEGORY_BASE_SCORE[category] !== undefined ? CATEGORY_BASE_SCORE[category] : 55;
    const maxNum = maxNumberIn(q.question);
    const magnitudeBonus = Math.min(20, Math.log10(maxNum + 1) * 6);
    const lengthBonus = Math.min(10, q.question.length / 40);
    return base + magnitudeBonus + lengthBonus;
  }

  const NUM_TIERS = 3;    // 3 níveis nomeados: Fácil, Médio, Difícil
  const BLOCK_SIZE = 10;  // perguntas exibidas por bloco/rodada

  /**
   * Metadados de cada nível: nome exibido, cores (harmonizadas com a
   * paleta do site) e ícone. O índice aqui corresponde ao índice do tier
   * gerado por buildDifficultyTiers (0 = mais fácil, 2 = mais difícil).
   */
  const TIER_META = [
    {
      key: "facil",
      name: "Nível Fácil",
      color: "#00A651",       // verde da marca
      colorLight: "#E7F8EF",
      icon: "fa-seedling",
      description: "Perguntas mais simples, ótimo para aquecer o raciocínio."
    },
    {
      key: "medio",
      name: "Nível Médio",
      color: "#FF8A00",       // laranja da marca
      colorLight: "#FFF1E0",
      icon: "fa-bolt",
      description: "Um desafio equilibrado — nem tão fácil, nem tão difícil."
    },
    {
      key: "dificil",
      name: "Nível Difícil",
      color: "#FF3C3C",       // vermelho (mesmo tom já usado em erros/alertas do site)
      colorLight: "#FFEAEA",
      icon: "fa-fire",
      description: "Só para quem não tem medo de um desafio de verdade."
    }
  ];

  /**
   * Ordena todas as perguntas do pool da mais fácil para a mais difícil e
   * as divide em NUM_TIERS grupos (tiers) de tamanho igual. O tier 0 é o
   * mais fácil; o último tier é o mais difícil.
   */
  function buildDifficultyTiers(pool) {
    const scored = (pool || []).map(function (q) {
      return { q: q, score: difficultyScore(q) };
    });
    scored.sort(function (a, b) { return a.score - b.score; });
    const sorted = scored.map(function (s) { return s.q; });

    const tierSize = Math.ceil(sorted.length / NUM_TIERS);
    const tiers = [];
    for (let i = 0; i < NUM_TIERS; i++) {
      tiers.push(sorted.slice(i * tierSize, (i + 1) * tierSize));
    }
    return tiers.filter(function (t) { return t.length > 0; });
  }

  /**
   * Sorteia `count` perguntas aleatórias dentro de um tier específico,
   * com as alternativas de cada uma também embaralhadas.
   */
  function pickTierQuestions(tiers, tierIndex, count) {
    const pool = (tiers && tiers[tierIndex]) || [];
    return pickRandom(pool, count);
  }

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
   * Níveis de classificação final, baseados na PORCENTAGEM de acertos
   * (não mais num número fixo de perguntas), já que agora o jogador pode
   * responder qualquer quantidade de perguntas (múltiplos de 10).
   */
  const LEVELS = [
    { min: 100, max: 100, title: "Lenda Suprema",       emoji: "👑", color: "#FF6B00",
      message: "Perfeição absoluta! Sua lógica está em outro nível — você enxerga padrões que ninguém mais vê." },
    { min: 90,  max: 99,  title: "Mestre da Lógica",    emoji: "🧠", color: "#00A651",
      message: "Impressionante! Você domina o raciocínio lógico como poucos. Faltou muito pouco para a perfeição." },
    { min: 75,  max: 89,  title: "Especialista",        emoji: "🎯", color: "#1877F2",
      message: "Ótimo desempenho! Sua capacidade analítica está muito acima da média." },
    { min: 55,  max: 74,  title: "Intelectual Curioso", emoji: "📚", color: "#8E5CF7",
      message: "Bom trabalho! Você tem uma boa base de raciocínio, com espaço para evoluir ainda mais." },
    { min: 35,  max: 54,  title: "Aprendiz",             emoji: "🌱", color: "#F5A623",
      message: "Você está no caminho certo! Continue exercitando a lógica e os resultados vão melhorar." },
    { min: 0,   max: 34,  title: "Iniciante",            emoji: "🔰", color: "#FF3C3C",
      message: "Todo mestre um dia foi iniciante. Tente novamente e desafie sua mente!" }
  ];

  /** Calcula o nível com base na porcentagem de acertos (score/total) */
  function getLevel(score, total) {
    const pct = total > 0 ? (score / total) * 100 : 0;
    return LEVELS.find(function (lvl) { return pct >= lvl.min && pct <= lvl.max; }) || LEVELS[LEVELS.length - 1];
  }

  window.QuizData = {
    FALLBACK_QUESTIONS: FALLBACK_QUESTIONS,
    QUESTIONS_PER_GAME: BLOCK_SIZE, // mantido por compatibilidade (agora representa o tamanho do bloco)
    BLOCK_SIZE: BLOCK_SIZE,
    NUM_TIERS: NUM_TIERS,
    TIER_META: TIER_META,
    LEVELS: LEVELS,
    getLevel: getLevel,
    pickRandom: pickRandom,
    buildDifficultyTiers: buildDifficultyTiers,
    pickTierQuestions: pickTierQuestions,
    difficultyScore: difficultyScore,
    detectCategory: detectCategory
  };
})();
