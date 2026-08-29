/* ===================================================================
   tourism-questions.js — Banco de 500 perguntas do módulo "Quiz Turismo"
   (monumentos, maravilhas do mundo, história e construção)
   Define window.TOURISM_QUESTIONS, consumido por js/quiz.js
   =================================================================== */

(function () {
  "use strict";

  window.TOURISM_QUESTIONS = [
    {
      id: 1,
      question: "Quantas das Sete Maravilhas do Mundo Antigo ainda existem de pé atualmente?",
      options: ["Nenhuma", "Apenas uma", "Duas", "Três"],
      correctIndex: 1,
      explanation: "Apenas a Grande Pirâmide de Gizé, no Egito, ainda existe. As outras seis foram destruídas ao longo dos séculos."
    },
    {
      id: 2,
      question: "Qual das Sete Maravilhas do Mundo Antigo é a única que ainda existe hoje?",
      options: ["O Farol de Alexandria", "A Grande Pirâmide de Gizé", "O Colosso de Rodes", "Os Jardins Suspensos da Babilônia"],
      correctIndex: 1,
      explanation: "A Grande Pirâmide de Gizé, construída como tumba do faraó Quéops, é a mais antiga das sete e a única que resistiu até os dias atuais."
    },
    {
      id: 3,
      question: "Em qual país está localizada a Grande Pirâmide de Gizé?",
      options: ["Egito", "Sudão", "Iraque", "Grécia"],
      correctIndex: 0,
      explanation: "A Grande Pirâmide de Gizé fica no Egito, próxima à cidade do Cairo."
    },
    {
      id: 4,
      question: "Para qual faraó egípcio a Grande Pirâmide de Gizé foi construída como tumba?",
      options: ["Tutancâmon", "Ramsés II", "Quéops (Khufu)", "Amenófis III"],
      correctIndex: 2,
      explanation: "A Grande Pirâmide foi construída como túmulo para o faraó Quéops (também chamado Khufu), da Quarta Dinastia do Egito."
    },
    {
      id: 5,
      question: "Onde ficavam, segundo a tradição, os Jardins Suspensos da Babilônia?",
      options: ["No Egito", "Na atual região do Iraque", "Na Grécia", "Na Turquia"],
      correctIndex: 1,
      explanation: "Os Jardins Suspensos teriam ficado na antiga cidade da Babilônia, na região onde hoje fica o Iraque."
    },
    {
      id: 6,
      question: "Qual das Sete Maravilhas do Mundo Antigo tem sua própria existência histórica questionada por arqueólogos?",
      options: ["A Grande Pirâmide de Gizé", "O Farol de Alexandria", "Os Jardins Suspensos da Babilônia", "O Colosso de Rodes"],
      correctIndex: 2,
      explanation: "Não foram encontrados registros arqueológicos definitivos dos Jardins Suspensos da Babilônia, e há debate acadêmico sobre se eles realmente existiram."
    },
    {
      id: 7,
      question: "A Estátua de Zeus, uma das Sete Maravilhas do Mundo Antigo, ficava em qual cidade grega?",
      options: ["Atenas", "Esparta", "Olímpia", "Delfos"],
      correctIndex: 2,
      explanation: "A Estátua de Zeus ficava no templo dedicado ao deus em Olímpia, sede dos Jogos Olímpicos da Antiguidade."
    },
    {
      id: 8,
      question: "De que material era feita, principalmente, a Estátua de Zeus em Olímpia?",
      options: ["Bronze maciço", "Mármore branco", "Ouro e marfim sobre estrutura de madeira", "Granito"],
      correctIndex: 2,
      explanation: "A estátua era do tipo criselefantina, feita com placas de ouro e marfim montadas sobre uma estrutura de madeira."
    },
    {
      id: 9,
      question: "O Templo de Ártemis, uma das Sete Maravilhas do Mundo Antigo, ficava em qual cidade?",
      options: ["Éfeso", "Rodes", "Alexandria", "Halicarnasso"],
      correctIndex: 0,
      explanation: "O Templo de Ártemis ficava na cidade de Éfeso, na costa da atual Turquia."
    },
    {
      id: 10,
      question: "A qual deusa grega era dedicado o templo de Éfeso, uma das Sete Maravilhas do Mundo Antigo?",
      options: ["Atena", "Afrodite", "Ártemis", "Hera"],
      correctIndex: 2,
      explanation: "O templo era dedicado a Ártemis, deusa da caça e da natureza selvagem na mitologia grega."
    },
    {
      id: 11,
      question: "O Mausoléu de Halicarnasso foi construído como túmulo para qual figura histórica?",
      options: ["Alexandre, o Grande", "O sátrapa Mausolo", "O faraó Quéops", "O imperador Nero"],
      correctIndex: 1,
      explanation: "O Mausoléu foi construído como túmulo monumental para Mausolo, governante (sátrapa) da região da Cária, e sua esposa Artemísia."
    },
    {
      id: 12,
      question: "De onde vem a palavra 'mausoléu', usada até hoje para designar túmulos monumentais?",
      options: ["Do nome do arquiteto que o projetou", "Do nome do governante Mausolo, para quem foi construído", "Do local onde ficava, a cidade de Halicarnasso", "De uma palavra grega que significa 'pedra'"],
      correctIndex: 1,
      explanation: "O termo 'mausoléu' deriva diretamente do nome de Mausolo, governante para quem o monumento original foi erguido."
    },
    {
      id: 13,
      question: "O Colosso de Rodes era uma estátua gigante representando qual figura?",
      options: ["Zeus, rei dos deuses", "Hélios, o deus do sol", "Poseidon, deus dos mares", "Atena, deusa da sabedoria"],
      correctIndex: 1,
      explanation: "O Colosso de Rodes era uma estátua de bronze representando Hélios, o deus grego do sol, erguida na ilha de Rodes."
    },
    {
      id: 14,
      question: "O que se acredita ter causado a queda do Colosso de Rodes, uma das Sete Maravilhas do Mundo Antigo?",
      options: ["Um incêndio", "Um terremoto", "Uma invasão militar", "O desgaste natural do tempo"],
      correctIndex: 1,
      explanation: "De acordo com relatos históricos, um terremoto por volta de 226 a.C. derrubou a estátua, que ficou caída por séculos."
    },
    {
      id: 15,
      question: "O Farol de Alexandria, uma das Sete Maravilhas do Mundo Antigo, ficava em qual país?",
      options: ["Grécia", "Turquia", "Egito", "Líbano"],
      correctIndex: 2,
      explanation: "O Farol de Alexandria ficava na ilha de Faro, na costa da cidade egípcia de Alexandria."
    },
    {
      id: 16,
      question: "Qual era a principal função do Farol de Alexandria?",
      options: ["Servir de templo religioso", "Guiar embarcações até o porto da cidade", "Ser um túmulo real", "Observar os astros"],
      correctIndex: 1,
      explanation: "O farol foi construído para guiar navios com segurança até o movimentado porto de Alexandria, no Egito."
    },
    {
      id: 17,
      question: "Para qual rei egípcio o Farol de Alexandria foi construído?",
      options: ["Ptolomeu II", "Ramsés II", "Tutancâmon", "Alexandre, o Grande"],
      correctIndex: 0,
      explanation: "O farol foi construído durante o reinado de Ptolomeu II, no século III a.C."
    },
    {
      id: 18,
      question: "Quem foi o autor da primeira lista conhecida das 'Sete Maravilhas do Mundo', escrita por volta de 225 a.C.?",
      options: ["Heródoto", "Filo de Bizâncio", "Aristóteles", "Platão"],
      correctIndex: 1,
      explanation: "Filo de Bizâncio escreveu a obra 'Sobre as Sete Maravilhas', uma das primeiras compilações conhecidas da lista."
    },
    {
      id: 19,
      question: "Por quantos anos, aproximadamente, as sete maravilhas do mundo antigo existiram todas ao mesmo tempo?",
      options: ["Menos de 60 anos", "Cerca de 500 anos", "Mais de 1000 anos", "Elas nunca coexistiram"],
      correctIndex: 0,
      explanation: "Segundo historiadores, as sete estruturas estiveram de pé simultaneamente por menos de 60 anos, já que foram construídas e destruídas em épocas diferentes."
    },
    {
      id: 20,
      question: "Qual das Sete Maravilhas do Mundo Antigo está localizada mais ao norte, na região da atual Turquia?",
      options: ["O Templo de Ártemis, em Éfeso", "A Grande Pirâmide de Gizé", "O Farol de Alexandria", "O Colosso de Rodes"],
      correctIndex: 0,
      explanation: "O Templo de Ártemis ficava em Éfeso, na costa oeste da atual Turquia."
    },
    {
      id: 21,
      question: "O Mausoléu de Halicarnasso ficava em uma região que hoje pertence a qual país?",
      options: ["Grécia", "Turquia", "Chipre", "Síria"],
      correctIndex: 1,
      explanation: "Halicarnasso corresponde à atual cidade de Bodrum, na Turquia."
    },
    {
      id: 22,
      question: "A Estátua de Zeus em Olímpia foi criada por qual famoso escultor grego?",
      options: ["Fídias", "Praxíteles", "Miron", "Policleto"],
      correctIndex: 0,
      explanation: "A estátua foi obra do escultor Fídias, também responsável por trabalhos no Partenon de Atenas."
    },
    {
      id: 23,
      question: "Aproximadamente quantos metros de altura tinha a Grande Pirâmide de Gizé em sua construção original?",
      options: ["Cerca de 100 metros", "Cerca de 147 metros", "Cerca de 200 metros", "Cerca de 60 metros"],
      correctIndex: 1,
      explanation: "Estima-se que a pirâmide tinha originalmente cerca de 146-147 metros de altura, antes da perda de seu revestimento externo."
    },
    {
      id: 24,
      question: "O Colosso de Rodes ficava na entrada de qual porto?",
      options: ["O porto da ilha de Rodes", "O porto de Atenas", "O porto de Alexandria", "O porto de Éfeso"],
      correctIndex: 0,
      explanation: "A estátua ficava próxima ao porto da cidade de Rodes, na ilha grega de mesmo nome."
    },
    {
      id: 25,
      question: "Segundo a tradição, quem teria mandado construir os Jardins Suspensos da Babilônia?",
      options: ["O rei Nabucodonosor II", "O faraó Ramsés II", "Alexandre, o Grande", "O imperador Dario I"],
      correctIndex: 0,
      explanation: "A tradição atribui a construção dos Jardins Suspensos ao rei babilônico Nabucodonosor II, que teria os erguido para agradar sua esposa."
    },
    {
      id: 26,
      question: "O Templo de Ártemis em Éfeso foi reconstruído várias vezes ao longo da história. O que causou uma de suas destruições?",
      options: ["Um incêndio criminoso", "Uma erupção vulcânica", "Um tsunami", "Uma epidemia"],
      correctIndex: 0,
      explanation: "Uma das versões do templo foi incendiada propositalmente por Herostrato, que buscava fama através do ato, no século IV a.C."
    },
    {
      id: 27,
      question: "Quantos metros de altura, aproximadamente, tinha o Colosso de Rodes?",
      options: ["Cerca de 10 metros", "Cerca de 33 metros", "Cerca de 70 metros", "Cerca de 150 metros"],
      correctIndex: 1,
      explanation: "Estima-se que o Colosso de Rodes tivesse cerca de 33 metros de altura, aproximadamente o tamanho da Estátua da Liberdade sem o pedestal."
    },
    {
      id: 28,
      question: "Qual material predominava na construção da Grande Pirâmide de Gizé?",
      options: ["Tijolos de barro", "Blocos de calcário e granito", "Mármore branco", "Madeira de cedro"],
      correctIndex: 1,
      explanation: "A pirâmide foi construída principalmente com blocos de calcário, com granito usado em partes internas como a câmara funerária."
    },
    {
      id: 29,
      question: "O Farol de Alexandria é considerado o precursor de qual tipo de construção moderna?",
      options: ["Os arranha-céus", "Os faróis marítimos", "As pontes suspensas", "Os aeroportos"],
      correctIndex: 1,
      explanation: "O Farol de Alexandria é referência histórica para os faróis marítimos construídos até hoje ao redor do mundo."
    },
    {
      id: 30,
      question: "O que provocou a destruição final do Farol de Alexandria, muitos séculos após sua construção?",
      options: ["Uma série de terremotos", "Um ataque naval", "Um incêndio florestal", "A erosão do mar"],
      correctIndex: 0,
      explanation: "Uma sequência de terremotos entre os séculos XI e XIV danificou progressivamente o farol até sua queda definitiva."
    },
    {
      id: 31,
      question: "Na mitologia grega, Hélios — representado pelo Colosso de Rodes — era o deus responsável por quê?",
      options: ["Guiar o carro do sol pelo céu", "Governar os mares", "Proteger os guerreiros na batalha", "Cuidar das colheitas"],
      correctIndex: 0,
      explanation: "Hélios era o deus grego que, segundo o mito, conduzia o carro solar através do céu todos os dias."
    },
    {
      id: 32,
      question: "Qual das Sete Maravilhas do Mundo Antigo ficava mais próxima do Mar Mediterrâneo, servindo de referência para navegantes?",
      options: ["O Farol de Alexandria", "A Estátua de Zeus em Olímpia", "O Mausoléu de Halicarnasso", "Os Jardins Suspensos da Babilônia"],
      correctIndex: 0,
      explanation: "O Farol de Alexandria, erguido na costa egípcia, foi construído justamente para orientar embarcações que navegavam pelo Mediterrâneo."
    },
    {
      id: 33,
      question: "A Grande Pirâmide de Gizé faz parte de um complexo que inclui qual outro monumento famoso?",
      options: ["A Esfinge de Gizé", "O Templo de Karnak", "O Vale dos Reis", "A Coluna de Trajano"],
      correctIndex: 0,
      explanation: "A Grande Pirâmide faz parte do complexo de Gizé, que também abriga a famosa Esfinge, uma estátua com corpo de leão e rosto humano."
    },
    {
      id: 34,
      question: "Aproximadamente em que século a.C. viveu Mausolo, homenageado no Mausoléu de Halicarnasso?",
      options: ["Século IV a.C.", "Século X a.C.", "Século I a.C.", "Século VIII a.C."],
      correctIndex: 0,
      explanation: "Mausolo governou a região da Cária no século IV a.C., período em que o mausoléu foi construído após sua morte."
    },
    {
      id: 35,
      question: "Além de Zeus, qual outra grande obra o escultor Fídias é conhecido por ter criado, dentro do Partenon de Atenas?",
      options: ["Uma estátua de Atena", "Uma estátua de Poseidon", "Uma estátua de Apolo", "Uma estátua de Afrodite"],
      correctIndex: 0,
      explanation: "Fídias também esculpiu a famosa estátua de Atena Partenos, que ficava dentro do Partenon, na Acrópole de Atenas."
    },
    {
      id: 36,
      question: "Os Jardins Suspensos da Babilônia, segundo a lenda, teriam sido construídos para quem?",
      options: ["Para o próprio rei Nabucodonosor II", "Para uma esposa do rei, que sentia saudade das paisagens verdes de sua terra natal", "Para os sacerdotes do templo principal", "Para receber visitantes estrangeiros"],
      correctIndex: 1,
      explanation: "A lenda conta que os jardins foram construídos para aliviar a saudade da esposa do rei, que vinha de uma região montanhosa e verde."
    },
    {
      id: 37,
      question: "Qual civilização antiga é responsável pela construção da Grande Pirâmide de Gizé?",
      options: ["Os egípcios", "Os mesopotâmicos", "Os persas", "Os fenícios"],
      correctIndex: 0,
      explanation: "A Grande Pirâmide foi construída pelos antigos egípcios durante o período do Império Antigo, há mais de 4.500 anos."
    },
    {
      id: 38,
      question: "O Templo de Ártemis em Éfeso era famoso, entre outras coisas, por seu grande número de quê?",
      options: ["Estátuas de ouro", "Colunas de mármore", "Portas de bronze", "Escadarias"],
      correctIndex: 1,
      explanation: "O templo era conhecido por suas numerosas colunas de mármore, muito maior que a maioria dos templos gregos da época."
    },
    {
      id: 39,
      question: "O Mausoléu de Halicarnasso ficou de pé por quantos séculos, aproximadamente, antes de ser destruído?",
      options: ["Cerca de 2 séculos", "Cerca de 16 séculos", "Cerca de 5 séculos", "Cerca de 30 séculos"],
      correctIndex: 1,
      explanation: "Construído no século IV a.C., o mausoléu resistiu até ser destruído por terremotos por volta do século XV, ficando de pé por cerca de 1.600-1.900 anos."
    },
    {
      id: 40,
      question: "Qual figura mitológica adorna, segundo relatos históricos, o topo da Estátua de Zeus em Olímpia?",
      options: ["Uma pequena estátua da deusa Nice (vitória)", "Uma coroa de louros", "Um raio dourado", "Uma águia"],
      correctIndex: 0,
      explanation: "Relatos da época descrevem que Zeus segurava, em uma das mãos, uma pequena estátua da deusa Nice, personificação da vitória."
    },
    {
      id: 41,
      question: "O que os arqueólogos utilizam para tentar comprovar a real localização e existência dos Jardins Suspensos da Babilônia?",
      options: ["Registros de escritores antigos e escavações na região da Mesopotâmia", "Fotografias aéreas modernas", "Relatos de viajantes do século XIX apenas", "Nenhuma fonte, pois é um mito reconhecido"],
      correctIndex: 0,
      explanation: "Pesquisadores se baseiam em textos de historiadores antigos e em escavações arqueológicas na região da antiga Mesopotâmia para tentar localizar os jardins."
    },
    {
      id: 42,
      question: "As Sete Maravilhas do Mundo Antigo, em sua maioria, ficavam concentradas em torno de qual região?",
      options: ["O Mar Mediterrâneo e o Oriente Médio", "A América Central", "O Sudeste Asiático", "A Europa Ocidental"],
      correctIndex: 0,
      explanation: "As sete maravilhas estavam localizadas na região do Mediterrâneo e do Oriente Médio, área central do mundo conhecido pelos gregos antigos."
    },
    {
      id: 43,
      question: "Em que ano foram eleitas as 'Sete Novas Maravilhas do Mundo Moderno', em uma votação popular mundial?",
      options: ["1999", "2007", "2012", "2015"],
      correctIndex: 1,
      explanation: "A eleição das New7Wonders foi organizada em 2007 por uma fundação suíça, com votação popular pela internet e telefone."
    },
    {
      id: 44,
      question: "Qual monumento brasileiro foi eleito uma das Sete Novas Maravilhas do Mundo Moderno em 2007?",
      options: ["O Pão de Açúcar", "O Cristo Redentor", "O Congresso Nacional", "O Teatro Amazonas"],
      correctIndex: 1,
      explanation: "O Cristo Redentor, no Rio de Janeiro, foi um dos sete monumentos eleitos na votação popular de 2007."
    },
    {
      id: 45,
      question: "O Cristo Redentor está localizado no topo de qual morro, no Rio de Janeiro?",
      options: ["Pão de Açúcar", "Corcovado", "Morro da Urca", "Pedra da Gávea"],
      correctIndex: 1,
      explanation: "A estátua do Cristo Redentor fica no topo do morro do Corcovado, a 710 metros de altitude."
    },
    {
      id: 46,
      question: "Em que ano o Cristo Redentor foi inaugurado?",
      options: ["1922", "1931", "1945", "1960"],
      correctIndex: 1,
      explanation: "O Cristo Redentor foi inaugurado em 12 de outubro de 1931."
    },
    {
      id: 47,
      question: "Quantos metros de altura tem a estátua do Cristo Redentor, contando com seu pedestal?",
      options: ["Cerca de 20 metros", "Cerca de 38 metros", "Cerca de 60 metros", "Cerca de 100 metros"],
      correctIndex: 1,
      explanation: "O Cristo Redentor tem cerca de 38 metros de altura, somando a estátua (30m) e o pedestal (8m)."
    },
    {
      id: 48,
      question: "Quem esculpiu o rosto e as mãos da estátua do Cristo Redentor?",
      options: ["O francês Paul Landowski", "O brasileiro Heitor da Silva Costa", "O italiano Antonio Canova", "O romeno Constantin Brâncuși"],
      correctIndex: 0,
      explanation: "O escultor francês Paul Landowski foi responsável pelo desenho do rosto e das mãos da estátua, embora o projeto geral seja do engenheiro Heitor da Silva Costa."
    },
    {
      id: 49,
      question: "Em qual estilo arquitetônico o Cristo Redentor foi construído?",
      options: ["Barroco", "Art Déco", "Neoclássico", "Gótico"],
      correctIndex: 1,
      explanation: "O Cristo Redentor é considerado a maior escultura Art Déco do mundo, estilo característico do início do século XX."
    },
    {
      id: 50,
      question: "A Grande Muralha da China foi eleita uma das Sete Novas Maravilhas do Mundo. Qual dinastia é responsável pela seção mais preservada e visitada da muralha?",
      options: ["Dinastia Han", "Dinastia Ming", "Dinastia Tang", "Dinastia Song"],
      correctIndex: 1,
      explanation: "A seção mais bem preservada e mais visitada da Grande Muralha foi construída durante a Dinastia Ming (1368-1644)."
    },
    {
      id: 51,
      question: "Qual imperador chinês é tradicionalmente associado ao início da unificação da Grande Muralha da China?",
      options: ["Qin Shi Huang", "Kublai Khan", "Sun Yat-sen", "Kangxi"],
      correctIndex: 0,
      explanation: "Qin Shi Huang, primeiro imperador de uma China unificada, ordenou a conexão de muralhas já existentes por volta de 220 a.C."
    },
    {
      id: 52,
      question: "Qual era o principal objetivo da construção da Grande Muralha da China?",
      options: ["Facilitar o comércio entre regiões", "Proteger o território contra invasões do norte", "Servir como estrada para caravanas", "Demarcar fronteiras religiosas"],
      correctIndex: 1,
      explanation: "A muralha foi construída principalmente como uma fortificação defensiva contra invasões de povos nômades vindos do norte."
    },
    {
      id: 53,
      question: "A cidade de Petra, uma das Sete Novas Maravilhas do Mundo, está localizada em qual país?",
      options: ["Egito", "Jordânia", "Síria", "Líbano"],
      correctIndex: 1,
      explanation: "Petra é uma cidade histórica esculpida na rocha, localizada no sul da Jordânia."
    },
    {
      id: 54,
      question: "Qual povo antigo é responsável pela construção da cidade de Petra?",
      options: ["Os nabateus", "Os babilônios", "Os fenícios", "Os persas"],
      correctIndex: 0,
      explanation: "Petra foi construída pelos nabateus, um povo árabe antigo que a transformou em importante centro comercial de caravanas."
    },
    {
      id: 55,
      question: "Uma característica marcante de Petra é que suas construções foram feitas de que forma?",
      options: ["Esculpidas diretamente na rocha arenito", "Erguidas com blocos de mármore importado", "Construídas inteiramente em madeira", "Feitas de tijolos de barro cozido"],
      correctIndex: 0,
      explanation: "Grande parte das edificações de Petra foi esculpida diretamente na rocha arenito avermelhada da região, técnica conhecida como arquitetura rupestre."
    },
    {
      id: 56,
      question: "Machu Picchu, uma das Sete Novas Maravilhas do Mundo, está localizada em qual país?",
      options: ["Bolívia", "Peru", "Equador", "Chile"],
      correctIndex: 1,
      explanation: "Machu Picchu é uma cidadela inca localizada nos Andes peruanos."
    },
    {
      id: 57,
      question: "Machu Picchu é associada a qual civilização antiga?",
      options: ["Os astecas", "Os maias", "Os incas", "Os olmecas"],
      correctIndex: 2,
      explanation: "Machu Picchu foi construída pelo Império Inca, provavelmente no século XV."
    },
    {
      id: 58,
      question: "Quem é o explorador norte-americano creditado por 'redescobrir' Machu Picchu para o mundo ocidental, em 1911?",
      options: ["Hiram Bingham", "Howard Carter", "Heinrich Schliemann", "John Lloyd Stephens"],
      correctIndex: 0,
      explanation: "O historiador e explorador Hiram Bingham apresentou Machu Picchu ao mundo ocidental em 1911, embora moradores locais já conhecessem o local."
    },
    {
      id: 59,
      question: "Acredita-se que Machu Picchu tenha sido construída como uma espécie de quê para um governante inca?",
      options: ["Fortaleza militar", "Propriedade/residência real", "Prisão", "Porto comercial"],
      correctIndex: 1,
      explanation: "A hipótese mais aceita é que Machu Picchu tenha sido construída como uma propriedade real para o imperador inca Pachacuti."
    },
    {
      id: 60,
      question: "Chichén Itzá, uma das Sete Novas Maravilhas do Mundo, está localizada em qual país?",
      options: ["Guatemala", "México", "Honduras", "Belize"],
      correctIndex: 1,
      explanation: "Chichén Itzá é um sítio arqueológico maia localizado na península de Yucatán, no México."
    },
    {
      id: 61,
      question: "Chichén Itzá foi construída por qual civilização mesoamericana?",
      options: ["Os astecas", "Os maias", "Os incas", "Os toltecas isoladamente"],
      correctIndex: 1,
      explanation: "Chichén Itzá foi um importante centro da civilização maia, com influências posteriores de outros povos como os toltecas."
    },
    {
      id: 62,
      question: "Como se chama a famosa pirâmide central de Chichén Itzá, dedicada a uma divindade maia?",
      options: ["El Castillo (Templo de Kukulkán)", "Templo do Sol", "Pirâmide da Lua", "Templo dos Guerreiros"],
      correctIndex: 0,
      explanation: "A pirâmide principal, conhecida como El Castillo, é dedicada ao deus serpente emplumada Kukulkán."
    },
    {
      id: 63,
      question: "O Coliseu de Roma, uma das Sete Novas Maravilhas do Mundo, está localizado em qual país?",
      options: ["Grécia", "Itália", "Espanha", "França"],
      correctIndex: 1,
      explanation: "O Coliseu está localizado no centro de Roma, na Itália."
    },
    {
      id: 64,
      question: "Para que finalidade o Coliseu de Roma era originalmente utilizado?",
      options: ["Templo religioso", "Palácio imperial", "Arena para espetáculos públicos, como lutas de gladiadores", "Biblioteca pública"],
      correctIndex: 2,
      explanation: "O Coliseu era um anfiteatro usado para espetáculos públicos, incluindo combates de gladiadores e caçadas de animais."
    },
    {
      id: 65,
      question: "Em que período histórico o Coliseu de Roma foi construído?",
      options: ["Império Romano, no século I d.C.", "Idade Média, no século X", "Renascimento, no século XV", "Grécia Antiga, no século V a.C."],
      correctIndex: 0,
      explanation: "O Coliseu foi construído durante o Império Romano, iniciado sob o imperador Vespasiano e concluído por Tito, por volta de 80 d.C."
    },
    {
      id: 66,
      question: "Aproximadamente quantas pessoas o Coliseu de Roma podia comportar em sua capacidade original?",
      options: ["Cerca de 5 mil", "Cerca de 50 mil", "Cerca de 200 mil", "Cerca de 500"],
      correctIndex: 1,
      explanation: "Estima-se que o Coliseu tinha capacidade para acomodar entre 50 e 80 mil espectadores."
    },
    {
      id: 67,
      question: "O Taj Mahal, uma das Sete Novas Maravilhas do Mundo, está localizado em qual cidade indiana?",
      options: ["Nova Deli", "Agra", "Mumbai", "Jaipur"],
      correctIndex: 1,
      explanation: "O Taj Mahal está localizado na cidade de Agra, no norte da Índia, às margens do rio Yamuna."
    },
    {
      id: 68,
      question: "O Taj Mahal foi construído pelo imperador mogol Shah Jahan em homenagem a quem?",
      options: ["Sua mãe", "Sua esposa, Mumtaz Mahal", "Seu pai", "Um líder religioso"],
      correctIndex: 1,
      explanation: "O Taj Mahal foi construído como mausoléu para Mumtaz Mahal, esposa favorita do imperador Shah Jahan, falecida em 1631."
    },
    {
      id: 69,
      question: "De qual material é feita, predominantemente, a estrutura externa do Taj Mahal?",
      options: ["Granito cinza", "Mármore branco", "Arenito vermelho", "Calcário bruto"],
      correctIndex: 1,
      explanation: "O Taj Mahal é famoso por sua estrutura de mármore branco, que muda de tonalidade conforme a luz do dia."
    },
    {
      id: 70,
      question: "Em que ano, aproximadamente, teve início a construção do Taj Mahal?",
      options: ["1526", "1632", "1748", "1857"],
      correctIndex: 1,
      explanation: "A construção do Taj Mahal começou por volta de 1632, a mando do imperador Shah Jahan."
    },
    {
      id: 71,
      question: "Quanto tempo, aproximadamente, levou a construção do mausoléu principal do Taj Mahal?",
      options: ["Cerca de 2 anos", "Cerca de 16 anos", "Cerca de 50 anos", "Cerca de 100 anos"],
      correctIndex: 1,
      explanation: "O corpo principal do mausoléu foi concluído em cerca de 16 anos (1632-1648), embora todo o complexo tenha levado ainda mais tempo."
    },
    {
      id: 72,
      question: "Em que ano a Grande Pirâmide de Gizé foi adicionada como 'candidata honorária' à lista das Sete Novas Maravilhas do Mundo?",
      options: ["2007", "1999", "2015", "Ela nunca foi incluída, mesmo honorariamente"],
      correctIndex: 0,
      explanation: "Como já era considerada uma das maravilhas originais da Antiguidade, a Grande Pirâmide de Gizé recebeu o status de candidata honorária em 2007, fora da votação popular."
    },
    {
      id: 73,
      question: "A organização responsável por eleger as Sete Novas Maravilhas do Mundo em 2007 se chama como?",
      options: ["UNESCO", "New7Wonders Foundation", "National Geographic Society", "Organização Mundial do Turismo"],
      correctIndex: 1,
      explanation: "A votação foi promovida pela New7Wonders Foundation, uma organização suíça, e não tem vínculo oficial com a UNESCO."
    },
    {
      id: 74,
      question: "Quantos monumentos concorreram na etapa final da votação das Sete Novas Maravilhas do Mundo, em 2007?",
      options: ["7", "14", "21", "50"],
      correctIndex: 2,
      explanation: "A lista final de candidatos incluía 21 monumentos, dos quais 7 foram eleitos pelo público."
    },
    {
      id: 75,
      question: "O Cristo Redentor recebeu, em 2012, um reconhecimento importante da UNESCO. Qual foi?",
      options: ["Foi declarado Patrimônio Mundial da Humanidade", "Foi eleito uma das sete maravilhas naturais", "Recebeu um prêmio de arquitetura moderna", "Foi tombado como monumento militar"],
      correctIndex: 0,
      explanation: "Em 2012, a UNESCO reconheceu o Cristo Redentor e a paisagem do Rio de Janeiro como Patrimônio Mundial da Humanidade."
    },
    {
      id: 76,
      question: "O sistema usado para transportar materiais de construção até o topo do morro do Corcovado, durante a obra do Cristo Redentor, foi:",
      options: ["Um teleférico de carga", "Um trem/bondinho sobre trilhos", "Helicópteros", "Carroças puxadas por bois"],
      correctIndex: 1,
      explanation: "Um sistema de trem (o mesmo trilho que ainda leva turistas hoje) foi utilizado para transportar materiais e trabalhadores até o topo do Corcovado."
    },
    {
      id: 77,
      question: "Petra também é conhecida por qual apelido, relacionado à cor de suas construções?",
      options: ["'A Cidade Branca'", "'A Cidade Rosa'", "'A Cidade Dourada'", "'A Cidade Negra'"],
      correctIndex: 1,
      explanation: "Petra é apelidada de 'Cidade Rosa' por causa da tonalidade avermelhada/rosada da rocha arenito em que foi esculpida."
    },
    {
      id: 78,
      question: "Qual monumento das Sete Novas Maravilhas do Mundo é o único localizado no continente asiático entre China, Jordânia e Índia, além da própria Grande Muralha?",
      options: ["O Taj Mahal, na Índia", "O Coliseu, na Itália", "Machu Picchu, no Peru", "O Cristo Redentor, no Brasil"],
      correctIndex: 0,
      explanation: "Entre as sete, o Taj Mahal (Índia), Petra (Jordânia) e a Grande Muralha (China) estão no continente asiático."
    },
    {
      id: 79,
      question: "Machu Picchu está situada a que altitude aproximada, nos Andes peruanos?",
      options: ["Cerca de 500 metros", "Cerca de 2.430 metros", "Cerca de 5.000 metros", "Ao nível do mar"],
      correctIndex: 1,
      explanation: "Machu Picchu está a aproximadamente 2.430 metros de altitude, entre as montanhas dos Andes."
    },
    {
      id: 80,
      question: "Qual técnica de construção os incas utilizaram em Machu Picchu, encaixando pedras sem uso de argamassa?",
      options: ["Alvenaria em seco (encaixe de pedras)", "Concreto armado", "Tijolos vazados", "Estruturas de madeira revestidas de pedra"],
      correctIndex: 0,
      explanation: "Os incas utilizavam uma técnica de encaixe preciso de pedras sem argamassa, o que contribuiu para a resistência das construções a terremotos."
    },
    {
      id: 81,
      question: "Por que os espanhóis nunca encontraram Machu Picchu durante a colonização da América?",
      options: ["Porque ela ficava escondida em uma região de difícil acesso na montanha", "Porque tinha um exército que a defendia", "Porque ela ficava no fundo de uma caverna", "Porque foi construída depois da colonização"],
      correctIndex: 0,
      explanation: "A localização remota e de difícil acesso, entre montanhas, fez com que Machu Picchu passasse despercebida pelos colonizadores espanhóis."
    },
    {
      id: 82,
      question: "O que significa 'Chichén Itzá' na língua maia?",
      options: ["'Cidade das Serpentes'", "'Na boca do poço dos itzás'", "'Templo do Sol'", "'Grande Pirâmide'"],
      correctIndex: 1,
      explanation: "O nome 'Chichén Itzá' significa aproximadamente 'na boca do poço dos itzás', referência aos poços naturais (cenotes) sagrados do local."
    },
    {
      id: 83,
      question: "O Coliseu de Roma também é conhecido por qual outro nome, referente ao imperador que o mandou construir?",
      options: ["Anfiteatro Flaviano", "Templo de César", "Arena Juliana", "Circo Augusto"],
      correctIndex: 0,
      explanation: "O Coliseu também é chamado de Anfiteatro Flaviano, em referência à dinastia Flávia, que iniciou sua construção."
    },
    {
      id: 84,
      question: "Além do Cristo Redentor, qual outro ponto turístico famoso do Rio de Janeiro é um morro com bondinho?",
      options: ["Corcovado", "Pão de Açúcar", "Pedra da Gávea", "Morro de Santa Teresa"],
      correctIndex: 1,
      explanation: "O Pão de Açúcar é um morro icônico do Rio de Janeiro, acessado por um bondinho (teleférico) inaugurado em 1912."
    },
    {
      id: 85,
      question: "Em que cidade brasileira está localizado o Teatro Amazonas, famoso por sua cúpula colorida?",
      options: ["Belém", "Manaus", "Porto Velho", "Boa Vista"],
      correctIndex: 1,
      explanation: "O Teatro Amazonas fica em Manaus, capital do Amazonas, e foi construído durante o ciclo econômico da borracha."
    },
    {
      id: 86,
      question: "Em que período histórico o Teatro Amazonas foi construído?",
      options: ["Durante o ciclo da borracha, no final do século XIX", "Durante o período colonial, no século XVII", "Após a Segunda Guerra Mundial", "Durante o Império, no início do século XIX"],
      correctIndex: 0,
      explanation: "O Teatro Amazonas foi inaugurado em 1896, financiado pela riqueza gerada pelo ciclo econômico da borracha na Amazônia."
    },
    {
      id: 87,
      question: "Qual arquiteto brasileiro é o principal responsável pelo desenho dos prédios do Congresso Nacional, em Brasília?",
      options: ["Lúcio Costa", "Oscar Niemeyer", "Burle Marx", "Ramos de Azevedo"],
      correctIndex: 1,
      explanation: "Oscar Niemeyer foi o arquiteto responsável pelo projeto arquitetônico dos principais edifícios de Brasília, incluindo o Congresso Nacional."
    },
    {
      id: 88,
      question: "Quem foi o urbanista responsável pelo plano geral (plano piloto) da cidade de Brasília?",
      options: ["Oscar Niemeyer", "Lúcio Costa", "Roberto Burle Marx", "Athos Bulcão"],
      correctIndex: 1,
      explanation: "Lúcio Costa venceu o concurso para o plano urbanístico de Brasília, conhecido como Plano Piloto."
    },
    {
      id: 89,
      question: "Em que ano Brasília foi inaugurada como capital do Brasil?",
      options: ["1950", "1960", "1975", "1988"],
      correctIndex: 1,
      explanation: "Brasília foi inaugurada em 21 de abril de 1960, durante o governo de Juscelino Kubitschek."
    },
    {
      id: 90,
      question: "O centro histórico de qual cidade mineira é famoso por sua arquitetura colonial e barroca, sendo Patrimônio Mundial da UNESCO?",
      options: ["Belo Horizonte", "Ouro Preto", "Uberlândia", "Juiz de Fora"],
      correctIndex: 1,
      explanation: "Ouro Preto, antiga capital de Minas Gerais, preserva um dos mais importantes conjuntos de arquitetura colonial barroca do Brasil."
    },
    {
      id: 91,
      question: "Qual escultor e entalhador brasileiro, conhecido como Aleijadinho, é famoso por suas obras em Ouro Preto e outras cidades mineiras?",
      options: ["Antônio Francisco Lisboa", "Mestre Valentim", "Cândido Portinari", "Victor Meirelles"],
      correctIndex: 0,
      explanation: "Antônio Francisco Lisboa, o Aleijadinho, foi um dos maiores escultores do barroco brasileiro, autor de obras como os Profetas de Congonhas."
    },
    {
      id: 92,
      question: "Em qual cidade mineira ficam as famosas esculturas dos 'Profetas', obra do Aleijadinho?",
      options: ["Congonhas", "Ouro Preto", "Tiradentes", "Mariana"],
      correctIndex: 0,
      explanation: "As esculturas dos Doze Profetas, uma das obras-primas do Aleijadinho, ficam no Santuário de Bom Jesus de Matosinhos, em Congonhas (MG)."
    },
    {
      id: 93,
      question: "O bairro do Pelourinho, com seu conjunto de casarões coloridos e igrejas históricas, fica em qual capital brasileira?",
      options: ["Salvador", "Recife", "São Luís", "Fortaleza"],
      correctIndex: 0,
      explanation: "O Pelourinho é o centro histórico de Salvador, na Bahia, reconhecido como Patrimônio Mundial pela UNESCO."
    },
    {
      id: 94,
      question: "Qual monumento localizado em São Paulo homenageia os pioneiros que desbravaram o interior do Brasil?",
      options: ["O Monumento às Bandeiras", "O Obelisco do Ibirapuera", "O Marco Zero", "O Farol do Comércio"],
      correctIndex: 0,
      explanation: "O Monumento às Bandeiras, esculpido por Victor Brecheret, homenageia os bandeirantes e fica no Parque Ibirapuera, em São Paulo."
    },
    {
      id: 95,
      question: "Quem foi o escultor responsável pelo Monumento às Bandeiras, em São Paulo?",
      options: ["Victor Brecheret", "Aleijadinho", "Bruno Giorgi", "Rodin"],
      correctIndex: 0,
      explanation: "O Monumento às Bandeiras foi criado pelo escultor ítalo-brasileiro Victor Brecheret, concluído em 1953."
    },
    {
      id: 96,
      question: "O Museu do Amanhã, com sua arquitetura futurista à beira-mar, fica em qual cidade brasileira?",
      options: ["Rio de Janeiro", "São Paulo", "Recife", "Florianópolis"],
      correctIndex: 0,
      explanation: "O Museu do Amanhã fica na região portuária do Rio de Janeiro, com projeto do arquiteto espanhol Santiago Calatrava."
    },
    {
      id: 97,
      question: "Quem projetou o Museu do Amanhã, no Rio de Janeiro?",
      options: ["Santiago Calatrava", "Oscar Niemeyer", "Zaha Hadid", "Renzo Piano"],
      correctIndex: 0,
      explanation: "O museu foi projetado pelo arquiteto espanhol Santiago Calatrava, conhecido por seus projetos de arquitetura futurista."
    },
    {
      id: 98,
      question: "O Marco das Três Fronteiras, ponto turístico que reúne Brasil, Argentina e Paraguai, fica em qual cidade brasileira?",
      options: ["Foz do Iguaçu", "Corumbá", "Uruguaiana", "Ponta Porã"],
      correctIndex: 0,
      explanation: "O Marco das Três Fronteiras fica em Foz do Iguaçu (PR), onde os territórios de Brasil, Argentina e Paraguai se encontram."
    },
    {
      id: 99,
      question: "As Cataratas do Iguaçu, uma das principais atrações naturais do Brasil, ficam na divisa com qual país?",
      options: ["Uruguai", "Argentina", "Bolívia", "Peru"],
      correctIndex: 1,
      explanation: "As Cataratas do Iguaçu ficam na fronteira entre o Brasil (Paraná) e a Argentina."
    },
    {
      id: 100,
      question: "Qual é o nome do famoso Mosteiro de São Bento, importante exemplo de arquitetura colonial, presente em várias capitais brasileiras?",
      options: ["Mosteiro de São Bento", "Convento da Penha", "Basílica de Nazaré", "Catedral de Brasília"],
      correctIndex: 0,
      explanation: "O Mosteiro de São Bento é uma ordem religiosa com edificações históricas importantes em cidades como Rio de Janeiro, Salvador e Olinda."
    },
    {
      id: 101,
      question: "A Catedral Metropolitana de Brasília, com seu formato de coroa de espinhos, foi projetada por quem?",
      options: ["Oscar Niemeyer", "Lúcio Costa", "Roberto Burle Marx", "Ramos de Azevedo"],
      correctIndex: 0,
      explanation: "A Catedral de Brasília é outra obra de Oscar Niemeyer, com uma estrutura circular composta por 16 colunas curvas de concreto."
    },
    {
      id: 102,
      question: "Em que material a estrutura da Catedral de Brasília é predominantemente feita?",
      options: ["Vidro e concreto", "Mármore maciço", "Madeira e tijolo", "Aço inoxidável apenas"],
      correctIndex: 0,
      explanation: "A catedral combina uma estrutura de concreto com grandes painéis de vidro colorido entre as colunas."
    },
    {
      id: 103,
      question: "O centro histórico de qual cidade maranhense é conhecido por seus azulejos portugueses e casarões coloniais, sendo Patrimônio Mundial?",
      options: ["São Luís", "Teresina", "Imperatriz", "Caxias"],
      correctIndex: 0,
      explanation: "São Luís, capital do Maranhão, tem seu centro histórico reconhecido pela UNESCO por sua arquitetura colonial portuguesa e azulejaria."
    },
    {
      id: 104,
      question: "Qual cidade histórica de Minas Gerais, tombada como patrimônio, é conhecida por suas ladeiras e igrejas barrocas, tendo sido palco da Inconfidência Mineira?",
      options: ["Diamantina", "Ouro Preto", "Tiradentes", "Mariana"],
      correctIndex: 1,
      explanation: "Ouro Preto foi palco de importantes eventos históricos como a Inconfidência Mineira, movimento pela independência do Brasil no século XVIII."
    },
    {
      id: 105,
      question: "O Palácio do Planalto, sede do governo federal brasileiro, está localizado em qual cidade?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
      correctIndex: 1,
      explanation: "O Palácio do Planalto, sede da Presidência da República, fica em Brasília e também foi projetado por Oscar Niemeyer."
    },
    {
      id: 106,
      question: "O Farol da Barra, um dos mais antigos faróis do Brasil, está localizado em qual cidade?",
      options: ["Salvador", "Recife", "Natal", "Fortaleza"],
      correctIndex: 0,
      explanation: "O Farol da Barra fica em Salvador, na Bahia, e é considerado um dos faróis mais antigos das Américas."
    },
    {
      id: 107,
      question: "A Basílica de Nossa Senhora de Nazaré, importante monumento religioso, fica em qual capital brasileira?",
      options: ["Belém", "Manaus", "Palmas", "Macapá"],
      correctIndex: 0,
      explanation: "A Basílica de Nazaré fica em Belém do Pará e é palco do Círio de Nazaré, uma das maiores procissões religiosas do mundo."
    },
    {
      id: 108,
      question: "O Theatro Municipal, importante casa de espetáculos inspirada na Ópera de Paris, fica em qual cidade brasileira?",
      options: ["São Paulo", "Rio de Janeiro", "Ambas têm um Theatro Municipal famoso", "Porto Alegre"],
      correctIndex: 2,
      explanation: "Tanto São Paulo quanto o Rio de Janeiro possuem um famoso Theatro Municipal, ambos inspirados em teatros europeus como a Ópera de Paris."
    },
    {
      id: 109,
      question: "Qual conjunto arquitetônico colonial em Diamantina (MG) é reconhecido pela UNESCO como Patrimônio Mundial?",
      options: ["O centro histórico da cidade", "Apenas a Praça da Sé", "O Museu do Diamante isoladamente", "A Estação Ferroviária"],
      correctIndex: 0,
      explanation: "O centro histórico de Diamantina foi declarado Patrimônio Mundial pela UNESCO em 1999, por seu conjunto arquitetônico colonial bem preservado."
    },
    {
      id: 110,
      question: "O Elevador Lacerda, importante marco urbano que liga a cidade alta à cidade baixa, fica em qual cidade?",
      options: ["Salvador", "Recife", "São Luís", "Vitória"],
      correctIndex: 0,
      explanation: "O Elevador Lacerda, inaugurado em 1873, conecta o Centro Histórico (cidade alta) ao Comércio (cidade baixa) em Salvador."
    },
    {
      id: 111,
      question: "O Palácio de Belas Artes, importante edifício histórico do Rio de Janeiro, foi inspirado em qual estilo?",
      options: ["Estilo eclético/neoclássico europeu", "Modernismo brutalista", "Arquitetura indígena", "Art Nouveau exclusivamente"],
      correctIndex: 0,
      explanation: "O Palácio de Belas Artes, no centro do Rio, segue um estilo eclético inspirado em palácios europeus do início do século XX."
    },
    {
      id: 112,
      question: "A Ponte Hercílio Luz, importante marco arquitetônico do sul do Brasil, está localizada em qual cidade?",
      options: ["Florianópolis", "Curitiba", "Porto Alegre", "Joinville"],
      correctIndex: 0,
      explanation: "A Ponte Hercílio Luz liga a ilha de Santa Catarina ao continente, em Florianópolis, e é um símbolo da cidade."
    },
    {
      id: 113,
      question: "O Monumento Nacional aos Pracinhas, que homenageia os soldados brasileiros da Segunda Guerra Mundial, fica em qual cidade?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Porto Alegre"],
      correctIndex: 0,
      explanation: "O Monumento aos Pracinhas fica no Aterro do Flamengo, no Rio de Janeiro, homenageando os combatentes da Força Expedicionária Brasileira."
    },
    {
      id: 114,
      question: "A Praça dos Três Poderes, que reúne os prédios do Executivo, Legislativo e Judiciário, fica em qual cidade?",
      options: ["Brasília", "Rio de Janeiro", "Salvador", "São Paulo"],
      correctIndex: 0,
      explanation: "A Praça dos Três Poderes, em Brasília, reúne o Palácio do Planalto, o Congresso Nacional e o Supremo Tribunal Federal."
    },
    {
      id: 115,
      question: "Qual escultura, também de Oscar Niemeyer, é um símbolo do Memorial da América Latina, em São Paulo?",
      options: ["A mão com uma mancha vermelha", "O Monumento às Bandeiras", "A Torre de TV", "O Obelisco"],
      correctIndex: 0,
      explanation: "A escultura da mão sangrando, símbolo do Memorial da América Latina, representa a dor dos povos latino-americanos e é obra de Niemeyer."
    },
    {
      id: 116,
      question: "A Estação da Luz, importante marco arquitetônico ferroviário, está localizada em qual cidade?",
      options: ["São Paulo", "Rio de Janeiro", "Curitiba", "Salvador"],
      correctIndex: 0,
      explanation: "A Estação da Luz, com sua arquitetura de influência inglesa, é um dos principais marcos históricos de São Paulo."
    },
    {
      id: 117,
      question: "O que caracteriza a arquitetura colonial das cidades históricas de Minas Gerais, como Ouro Preto e Tiradentes?",
      options: ["O uso de aço e vidro", "O estilo barroco, com igrejas ricamente ornamentadas", "Arranha-céus modernos", "Construções indígenas tradicionais"],
      correctIndex: 1,
      explanation: "As cidades históricas mineiras são marcadas pelo estilo barroco colonial, especialmente visível em suas igrejas e capelas."
    },
    {
      id: 118,
      question: "O Palácio da Alvorada, residência oficial do presidente da República, foi projetado por qual arquiteto?",
      options: ["Oscar Niemeyer", "Lúcio Costa", "Ramos de Azevedo", "Burle Marx"],
      correctIndex: 0,
      explanation: "O Palácio da Alvorada, em Brasília, foi um dos primeiros grandes projetos de Oscar Niemeyer para a nova capital."
    },
    {
      id: 119,
      question: "A cidade de Olinda, com seu centro histórico colonial colorido, fica em qual estado?",
      options: ["Pernambuco", "Bahia", "Paraíba", "Alagoas"],
      correctIndex: 0,
      explanation: "Olinda, no estado de Pernambuco, é famosa por seu centro histórico colonial e é Patrimônio Mundial da UNESCO."
    },
    {
      id: 120,
      question: "O que motivou a construção do Teatro Amazonas em Manaus, no final do século XIX?",
      options: ["A riqueza gerada pela exportação de látex da borracha", "A necessidade de um espaço para eventos políticos", "O turismo já consolidado na região", "Uma doação da coroa portuguesa"],
      correctIndex: 0,
      explanation: "O teatro foi financiado pela riqueza dos seringalistas durante o auge do ciclo econômico da borracha na Amazônia."
    },
    {
      id: 121,
      question: "O Palácio Rio Negro, importante prédio histórico, está localizado em qual cidade?",
      options: ["Manaus", "Belém", "Porto Velho", "Rio Branco"],
      correctIndex: 0,
      explanation: "O Palácio Rio Negro, antiga residência de um barão da borracha, fica em Manaus e hoje funciona como centro cultural."
    },
    {
      id: 122,
      question: "Qual é o principal material usado na construção das fachadas de muitos casarões históricos de São Luís (MA)?",
      options: ["Azulejos portugueses", "Mármore de Carrara", "Concreto armado", "Bambu"],
      correctIndex: 0,
      explanation: "São Luís é conhecida por suas fachadas revestidas com azulejos de origem portuguesa, característica que marca a arquitetura da cidade."
    },
    {
      id: 123,
      question: "O Palácio Itamaraty, sede do Ministério das Relações Exteriores, fica em qual cidade?",
      options: ["Brasília", "Rio de Janeiro", "São Paulo", "Belo Horizonte"],
      correctIndex: 0,
      explanation: "O Palácio Itamaraty, também projetado por Oscar Niemeyer, é a sede do Ministério das Relações Exteriores em Brasília."
    },
    {
      id: 124,
      question: "A Fortaleza de São José de Macapá, importante construção militar histórica, está localizada em qual capital?",
      options: ["Macapá", "Belém", "Boa Vista", "Rio Branco"],
      correctIndex: 0,
      explanation: "A Fortaleza de São José de Macapá é um dos principais monumentos históricos militares do Amapá, construída no século XVIII."
    },
    {
      id: 125,
      question: "O que representa arquitetonicamente o formato da Catedral de Brasília, com suas colunas curvas apontando para o céu?",
      options: ["Uma coroa de espinhos", "Uma nave espacial", "Um vulcão em erupção", "Uma flor de lótus"],
      correctIndex: 0,
      explanation: "O formato circular com colunas inclinadas é geralmente associado a uma coroa de espinhos, símbolo cristão da paixão de Cristo."
    },
    {
      id: 126,
      question: "O Convento de Santo Antônio, importante marco religioso do Rio de Janeiro, está localizado onde?",
      options: ["No centro da cidade, próximo à Cinelândia", "Na Barra da Tijuca", "Em Niterói", "No bairro de Copacabana"],
      correctIndex: 0,
      explanation: "O Convento de Santo Antônio é um dos mais antigos conventos do Brasil, localizado no centro do Rio de Janeiro."
    },
    {
      id: 127,
      question: "A famosa escadaria colorida conhecida como Escadaria Selarón fica em qual bairro do Rio de Janeiro?",
      options: ["Lapa/Santa Teresa", "Copacabana", "Barra da Tijuca", "Ipanema"],
      correctIndex: 0,
      explanation: "A Escadaria Selarón, decorada com azulejos coloridos pelo artista chileno Jorge Selarón, liga os bairros da Lapa e Santa Teresa."
    },
    {
      id: 128,
      question: "O Sambódromo, palco do desfile das escolas de samba do Rio de Janeiro, também foi projetado por qual arquiteto?",
      options: ["Oscar Niemeyer", "Lúcio Costa", "Roberto Burle Marx", "Affonso Reidy"],
      correctIndex: 0,
      explanation: "O Sambódromo do Rio de Janeiro, inaugurado em 1984, é outra obra de Oscar Niemeyer."
    },
    {
      id: 129,
      question: "A Casa das Onze Janelas, importante prédio histórico à beira do rio, fica em qual capital?",
      options: ["Belém", "Manaus", "São Luís", "Macapá"],
      correctIndex: 0,
      explanation: "A Casa das Onze Janelas fica no bairro da Cidade Velha, em Belém, e hoje abriga um centro cultural."
    },
    {
      id: 130,
      question: "O Museu de Arte de São Paulo (MASP), reconhecido por sua estrutura suspensa em vãos livres, foi projetado por quem?",
      options: ["Lina Bo Bardi", "Oscar Niemeyer", "Ramos de Azevedo", "Paulo Mendes da Rocha"],
      correctIndex: 0,
      explanation: "O MASP, com seu icônico vão livre suportado por grandes vigas vermelhas, foi projetado pela arquiteta ítalo-brasileira Lina Bo Bardi."
    },
    {
      id: 131,
      question: "A Ponte JK, conhecida por seu design moderno com arcos que cruzam o tabuleiro, está localizada em qual cidade?",
      options: ["Brasília", "Belo Horizonte", "Curitiba", "Goiânia"],
      correctIndex: 0,
      explanation: "A Ponte JK cruza o Lago Paranoá em Brasília e é conhecida por seu design contemporâneo premiado internacionalmente."
    },
    {
      id: 132,
      question: "O Forte de Copacabana, importante construção militar histórica, está localizado em qual cidade?",
      options: ["Rio de Janeiro", "Niterói", "Salvador", "Fortaleza"],
      correctIndex: 0,
      explanation: "O Forte de Copacabana, construído no início do século XX, fica na ponta da praia de Copacabana, no Rio de Janeiro."
    },
    {
      id: 133,
      question: "A Casa de Câmara e Cadeia, um dos edifícios históricos mais antigos preservados em Minas Gerais, fica em qual cidade?",
      options: ["Ouro Preto", "Belo Horizonte", "Uberaba", "Juiz de Fora"],
      correctIndex: 0,
      explanation: "A antiga Casa de Câmara e Cadeia de Ouro Preto, hoje Museu da Inconfidência, é um marco da arquitetura colonial mineira."
    },
    {
      id: 134,
      question: "O Santuário Fushimi Inari, famoso por seus milhares de portões torii vermelhos, está localizado em qual cidade japonesa?",
      options: ["Tóquio", "Quioto", "Osaka", "Nagoya"],
      correctIndex: 1,
      explanation: "O Santuário Fushimi Inari fica em Quioto e é famoso por seu caminho formado por milhares de portões torii vermelhos."
    },
    {
      id: 135,
      question: "A qual divindade é dedicado o Santuário Fushimi Inari, no Japão?",
      options: ["Inari, divindade do arroz e da prosperidade", "Amaterasu, deusa do sol", "Hachiman, deus da guerra", "Buda"],
      correctIndex: 0,
      explanation: "O santuário é dedicado a Inari, divindade xintoísta associada ao arroz, à agricultura e à prosperidade nos negócios."
    },
    {
      id: 136,
      question: "O que são os portões vermelhos que formam os famosos túneis do Santuário Fushimi Inari?",
      options: ["Torii", "Pagodes", "Estupas", "Mandalas"],
      correctIndex: 0,
      explanation: "Os portões chamados torii marcam a entrada para espaços sagrados na tradição xintoísta japonesa."
    },
    {
      id: 137,
      question: "O Castelo de Himeji, um dos mais bem preservados do Japão, também é conhecido pelo apelido de:",
      options: ["Castelo Dourado", "Castelo da Garça Branca", "Castelo do Dragão", "Castelo de Cristal"],
      correctIndex: 1,
      explanation: "O Castelo de Himeji é apelidado de 'Castelo da Garça Branca' (Shirasagijo) por sua aparência branca e elegante."
    },
    {
      id: 138,
      question: "Em qual período da história japonesa o Castelo de Himeji, em sua forma atual, foi construído?",
      options: ["Período Edo, início do século XVII", "Período Meiji, no século XIX", "Segunda Guerra Mundial", "Período Nara, no século VIII"],
      correctIndex: 0,
      explanation: "A estrutura atual do Castelo de Himeji data principalmente do início do período Edo, por volta de 1609."
    },
    {
      id: 139,
      question: "O Pavilhão Dourado, ou Kinkaku-ji, está localizado em qual cidade japonesa?",
      options: ["Tóquio", "Quioto", "Yokohama", "Sapporo"],
      correctIndex: 1,
      explanation: "O Kinkaku-ji, ou Pavilhão Dourado, é um templo zen budista em Quioto, revestido com folhas de ouro."
    },
    {
      id: 140,
      question: "Por que o Kinkaku-ji é chamado de 'Pavilhão Dourado'?",
      options: ["Porque fica ao lado de minas de ouro", "Porque seus andares superiores são revestidos com folhas de ouro", "Porque foi construído por um imperador chamado 'Dourado'", "Porque brilha ao amanhecer, por uma ilusão de ótica"],
      correctIndex: 1,
      explanation: "Os dois andares superiores do pavilhão são cobertos com folhas de ouro, o que lhe dá o nome e a aparência dourada característica."
    },
    {
      id: 141,
      question: "O Grande Buda de Nara, uma das maiores estátuas de bronze do Japão, está localizado dentro de qual templo?",
      options: ["Todai-ji", "Kinkaku-ji", "Sensoji", "Kiyomizu-dera"],
      correctIndex: 0,
      explanation: "O Grande Buda de Nara está abrigado no templo Todai-ji, na cidade de Nara."
    },
    {
      id: 142,
      question: "O templo Todai-ji, em Nara, é reconhecido por abrigar qual das maiores estruturas do tipo no mundo?",
      options: ["O maior edifício de madeira do mundo", "A maior pagode do mundo", "O maior jardim zen do mundo", "O maior mosteiro budista da Ásia"],
      correctIndex: 0,
      explanation: "O Salão Principal (Daibutsuden) do Todai-ji é considerado um dos maiores edifícios de madeira do mundo."
    },
    {
      id: 143,
      question: "O Santuário Itsukushima, famoso por seu 'torii flutuante', está localizado em qual ilha japonesa?",
      options: ["Ilha de Miyajima", "Ilha de Hokkaido", "Ilha de Okinawa", "Ilha de Sado"],
      correctIndex: 0,
      explanation: "O Santuário Itsukushima, com seu famoso torii que parece flutuar na água durante a maré alta, fica na ilha de Miyajima."
    },
    {
      id: 144,
      question: "O que causa o efeito visual de o torii do Santuário Itsukushima parecer 'flutuar' sobre a água?",
      options: ["A maré alta cobrindo a base do portão", "Um sistema de espelhos", "Ilusão criada por luzes artificiais", "O portão realmente flutua sobre boias"],
      correctIndex: 0,
      explanation: "Durante a maré alta, a água do mar cobre a base do torii, criando a impressão de que ele está flutuando."
    },
    {
      id: 145,
      question: "O Monte Fuji, a montanha mais alta e um dos símbolos mais reconhecidos do Japão, é classificado geologicamente como o quê?",
      options: ["Um vulcão ativo", "Uma cordilheira de granito", "Uma formação de calcário", "Uma cratera de meteorito"],
      correctIndex: 0,
      explanation: "O Monte Fuji é um estratovulcão, considerado ativo, embora sua última erupção registrada tenha sido em 1707."
    },
    {
      id: 146,
      question: "A Torre de Tóquio, inspirada em outro monumento famoso, é uma réplica estilizada de qual construção?",
      options: ["Torre Eiffel, de Paris", "Big Ben, de Londres", "Torre de Pisa, da Itália", "Empire State Building, de Nova York"],
      correctIndex: 0,
      explanation: "A Torre de Tóquio foi inspirada na Torre Eiffel de Paris, embora seja ligeiramente mais alta e pintada de laranja e branco."
    },
    {
      id: 147,
      question: "Qual é a principal função da Torre de Tóquio, além de atração turística?",
      options: ["Transmissão de sinais de rádio e televisão", "Observatório astronômico", "Depósito de água da cidade", "Sede do governo japonês"],
      correctIndex: 0,
      explanation: "Além de ponto turístico, a Torre de Tóquio funciona como estrutura de transmissão de sinais de rádio e TV."
    },
    {
      id: 148,
      question: "O Templo Sensoji, o mais antigo templo budista de Tóquio, está localizado em qual bairro?",
      options: ["Asakusa", "Shibuya", "Shinjuku", "Ginza"],
      correctIndex: 0,
      explanation: "O Sensoji, templo budista dedicado à deusa Kannon, fica no tradicional bairro de Asakusa, em Tóquio."
    },
    {
      id: 149,
      question: "O portão de entrada do Templo Sensoji, famoso por sua enorme lanterna vermelha, é chamado de:",
      options: ["Kaminarimon (Portão do Trovão)", "Torii Dourado", "Portão da Serenidade", "Portão dos Mil Budas"],
      correctIndex: 0,
      explanation: "O Kaminarimon, ou 'Portão do Trovão', é a entrada icônica do Sensoji, reconhecível por sua grande lanterna de papel vermelha."
    },
    {
      id: 150,
      question: "O Palácio Imperial de Tóquio, residência da família imperial japonesa, foi construído sobre as ruínas de qual antiga fortaleza?",
      options: ["O Castelo de Edo", "O Castelo de Osaka", "O Castelo de Nagoya", "O Castelo de Nijo"],
      correctIndex: 0,
      explanation: "O Palácio Imperial foi erguido sobre o antigo Castelo de Edo, sede do governo dos xoguns Tokugawa."
    },
    {
      id: 151,
      question: "O Castelo de Osaka, um dos mais famosos do Japão, foi originalmente construído por qual líder histórico?",
      options: ["Toyotomi Hideyoshi", "Tokugawa Ieyasu", "Oda Nobunaga", "Imperador Meiji"],
      correctIndex: 0,
      explanation: "O Castelo de Osaka foi originalmente construído sob ordens de Toyotomi Hideyoshi, no final do século XVI."
    },
    {
      id: 152,
      question: "O Templo Kiyomizu-dera, conhecido por sua grande varanda de madeira sustentada sem pregos, fica em qual cidade?",
      options: ["Quioto", "Tóquio", "Osaka", "Kobe"],
      correctIndex: 0,
      explanation: "O Kiyomizu-dera, famoso por sua estrutura de madeira erguida sem o uso de pregos, está localizado em Quioto."
    },
    {
      id: 153,
      question: "O nome 'Kiyomizu-dera' está relacionado a qual elemento natural presente no templo?",
      options: ["Uma cachoeira de água considerada pura", "Uma floresta de bambu", "Um vulcão adormecido", "Um lago sagrado congelado"],
      correctIndex: 0,
      explanation: "O nome significa 'templo da água pura', referência a uma cachoeira dentro do complexo, considerada sagrada."
    },
    {
      id: 154,
      question: "O Parque Memorial da Paz de Hiroshima, com sua Cúpula da Bomba Atômica preservada, homenageia qual evento histórico?",
      options: ["O bombardeio atômico de Hiroshima em 1945", "O terremoto de Kobe de 1995", "A Segunda Guerra Sino-Japonesa", "O Grande Terremoto de Kanto de 1923"],
      correctIndex: 0,
      explanation: "O parque e a Cúpula da Bomba Atômica preservam a memória do bombardeio atômico que atingiu Hiroshima em 6 de agosto de 1945."
    },
    {
      id: 155,
      question: "A Cúpula da Bomba Atômica, em Hiroshima, foi mantida em ruínas propositalmente com qual objetivo?",
      options: ["Servir como lembrança permanente dos horrores da guerra nuclear", "Por falta de recursos para reconstrução", "Como parte de um projeto arquitetônico moderno", "Porque nunca foi identificada a estrutura original"],
      correctIndex: 0,
      explanation: "As ruínas foram preservadas intencionalmente como um símbolo e lembrança permanente contra as armas nucleares."
    },
    {
      id: 156,
      question: "O Grande Buda de Kamakura, uma das estátuas mais famosas do Japão, fica ao ar livre em qual cidade?",
      options: ["Kamakura", "Nara", "Nikko", "Kanazawa"],
      correctIndex: 0,
      explanation: "O Grande Buda de Kamakura, feito em bronze, fica ao ar livre desde que seu templo original foi destruído por um tsunami no século XV."
    },
    {
      id: 157,
      question: "Os santuários de Nikko, incluindo o famoso Toshogu, homenageiam qual figura histórica japonesa?",
      options: ["O xogum Tokugawa Ieyasu", "O imperador Meiji", "O samurai Miyamoto Musashi", "O monge Kukai"],
      correctIndex: 0,
      explanation: "O Santuário Toshogu, em Nikko, foi construído para homenagear Tokugawa Ieyasu, fundador do xogunato Tokugawa."
    },
    {
      id: 158,
      question: "O Castelo de Matsumoto, também conhecido como 'Castelo do Corvo' por sua cor escura, fica em qual região do Japão?",
      options: ["Prefeitura de Nagano", "Prefeitura de Okinawa", "Prefeitura de Hokkaido", "Prefeitura de Fukuoka"],
      correctIndex: 0,
      explanation: "O Castelo de Matsumoto, um dos castelos originais mais antigos do Japão, fica na prefeitura de Nagano."
    },
    {
      id: 159,
      question: "O Jardim Kenrokuen, um dos três jardins mais famosos do Japão, está localizado em qual cidade?",
      options: ["Kanazawa", "Quioto", "Nagoya", "Sendai"],
      correctIndex: 0,
      explanation: "O Kenrokuen, considerado um dos três jardins paisagísticos mais belos do Japão, fica na cidade de Kanazawa."
    },
    {
      id: 160,
      question: "O que significa o nome 'Kenrokuen', dado a um dos mais famosos jardins japoneses?",
      options: ["'Jardim das seis qualidades combinadas'", "'Jardim do imperador dourado'", "'Jardim das mil flores'", "'Jardim do dragão adormecido'"],
      correctIndex: 0,
      explanation: "O nome faz referência a seis qualidades ideais que um jardim clássico japonês deveria reunir, segundo a tradição paisagística chinesa."
    },
    {
      id: 161,
      question: "O Templo Ryoan-ji, em Quioto, é famoso mundialmente por qual tipo de jardim?",
      options: ["Um jardim de pedras zen (jardim seco)", "Um jardim de cerejeiras", "Um labirinto de bambu", "Um jardim aquático com carpas coloridas"],
      correctIndex: 0,
      explanation: "O Ryoan-ji é célebre por seu jardim de pedras (karesansui), um dos exemplos mais famosos de jardim zen seco do Japão."
    },
    {
      id: 162,
      question: "A Floresta de Bambu de Arashiyama, famosa atração natural, está localizada em qual cidade?",
      options: ["Quioto", "Tóquio", "Osaka", "Hiroshima"],
      correctIndex: 0,
      explanation: "A Floresta de Bambu de Arashiyama fica na região oeste de Quioto e é um dos pontos turísticos naturais mais fotografados do Japão."
    },
    {
      id: 163,
      question: "O Castelo de Nagoya, reconhecido por seus dois grandes golfinhos dourados no topo, fica em qual cidade?",
      options: ["Nagoya", "Osaka", "Kobe", "Sendai"],
      correctIndex: 0,
      explanation: "O Castelo de Nagoya é famoso por suas esculturas douradas em forma de 'shachihoko' (uma criatura mítica com corpo de peixe) no topo do telhado."
    },
    {
      id: 164,
      question: "O templo budista do Monte Koya (Koyasan) é um importante centro de qual escola do budismo japonês?",
      options: ["Budismo Shingon", "Budismo Zen Soto", "Budismo Nichiren", "Budismo Jodo Shinshu"],
      correctIndex: 0,
      explanation: "O Monte Koya é o centro histórico do budismo Shingon, fundado pelo monge Kukai no século IX."
    },
    {
      id: 165,
      question: "A Ponte Kintai, famosa por seus cinco arcos de madeira, está localizada em qual cidade japonesa?",
      options: ["Iwakuni", "Nagasaki", "Kumamoto", "Matsuyama"],
      correctIndex: 0,
      explanation: "A Ponte Kintai, com seus cinco arcos de madeira sobre o rio Nishiki, fica na cidade de Iwakuni."
    },
    {
      id: 166,
      question: "O que caracteriza a arquitetura tradicional dos torii, portões sagrados presentes em santuários xintoístas japoneses?",
      options: ["Marcam a transição entre o espaço comum e o sagrado", "Servem apenas como decoração sem significado religioso", "São usados exclusivamente em templos budistas", "Representam fronteiras entre cidades"],
      correctIndex: 0,
      explanation: "Os torii marcam simbolicamente a passagem do mundo comum para o espaço sagrado de um santuário xintoísta."
    },
    {
      id: 167,
      question: "O Templo Byodo-in, com seu famoso 'Salão da Fênix' retratado na moeda japonesa de 10 ienes, fica em qual cidade?",
      options: ["Uji", "Quioto (centro)", "Nara", "Osaka"],
      correctIndex: 0,
      explanation: "O Byodo-in, com seu icônico Salão da Fênix, está localizado na cidade de Uji, próxima a Quioto."
    },
    {
      id: 168,
      question: "O Castelo de Kumamoto é conhecido por qual característica defensiva incomum em sua construção?",
      options: ["Muros curvos projetados para dificultar escaladas", "Um fosso feito de lava vulcânica", "Torres subterrâneas conectadas por túneis", "Portões feitos inteiramente de ferro"],
      correctIndex: 0,
      explanation: "O Castelo de Kumamoto é famoso por seus muros de pedra curvos, conhecidos como 'muros que repelem ladrões', dificultando escaladas."
    },
    {
      id: 169,
      question: "O que é um 'pagode' em templos budistas japoneses, como o encontrado no Todai-ji ou no Horyu-ji?",
      options: ["Uma torre de múltiplos andares com função religiosa e simbólica", "Um tipo de portão de entrada", "Um jardim de meditação", "Uma estátua de Buda deitado"],
      correctIndex: 0,
      explanation: "O pagode é uma torre de vários andares, com origem indiana (stupa), usada para abrigar relíquias sagradas em templos budistas."
    },
    {
      id: 170,
      question: "O Templo Horyu-ji, próximo a Nara, é reconhecido por abrigar quais das estruturas de madeira mais antigas do mundo?",
      options: ["As estruturas de madeira mais antigas do mundo ainda existentes", "Apenas réplicas modernas de templos antigos", "A maior escultura de Buda do Japão", "O primeiro templo budista construído na China"],
      correctIndex: 0,
      explanation: "O Horyu-ji abriga algumas das estruturas de madeira mais antigas do mundo, datando do início do século VII."
    },
    {
      id: 171,
      question: "O Santuário Meiji, um dos mais visitados de Tóquio, foi construído em homenagem a qual imperador?",
      options: ["Imperador Meiji", "Imperador Hirohito", "Imperador Akihito", "Imperador Taisho"],
      correctIndex: 0,
      explanation: "O Santuário Meiji foi construído em homenagem ao imperador Meiji e à imperatriz Shoken, após suas mortes no início do século XX."
    },
    {
      id: 172,
      question: "O centro histórico de Kanazawa preserva um bairro tradicional de geishas conhecido como:",
      options: ["Higashi Chaya", "Gion", "Pontocho", "Miyagawa-cho"],
      correctIndex: 0,
      explanation: "O bairro Higashi Chaya, em Kanazawa, preserva casas de chá tradicionais associadas à cultura das gueixas."
    },
    {
      id: 173,
      question: "O famoso bairro Gion, tradicionalmente associado às gueixas, está localizado em qual cidade?",
      options: ["Quioto", "Tóquio", "Osaka", "Nagasaki"],
      correctIndex: 0,
      explanation: "Gion é um distrito histórico de Quioto, famoso por preservar a tradição das gueixas e das casas de chá."
    },
    {
      id: 174,
      question: "O Castelo de Nijo, em Quioto, é famoso por possuir pisos que rangem propositalmente. Qual era a função desse mecanismo?",
      options: ["Alertar sobre a presença de intrusos, como um sistema de segurança", "Facilitar a limpeza do castelo", "Reduzir o peso da estrutura", "Melhorar a acústica para música tradicional"],
      correctIndex: 0,
      explanation: "Os famosos 'pisos de rouxinol' (uguisubari) do Castelo de Nijo rangiam propositalmente para alertar sobre passos de possíveis intrusos."
    },
    {
      id: 175,
      question: "O Shinkansen, o famoso trem-bala japonês, teve sua primeira linha inaugurada em qual ano, conectando Tóquio a Osaka?",
      options: ["1964", "1980", "1945", "2000"],
      correctIndex: 0,
      explanation: "O primeiro Shinkansen entrou em operação em 1964, ano dos Jogos Olímpicos de Tóquio, ligando Tóquio a Osaka."
    },
    {
      id: 176,
      question: "O Templo Chuson-ji, com seu famoso 'Salão Dourado' (Konjikido), está localizado em qual região do Japão?",
      options: ["Hiraizumi", "Hokkaido", "Okinawa", "Shikoku"],
      correctIndex: 0,
      explanation: "O Chuson-ji, com seu Salão Dourado revestido de ouro, fica na cidade histórica de Hiraizumi, no nordeste do Japão."
    },
    {
      id: 177,
      question: "O que é um 'xogunato', sistema de governo historicamente associado a estruturas como o Castelo de Edo (atual Palácio Imperial de Tóquio)?",
      options: ["Um governo militar liderado por um xogum, com o imperador em papel simbólico", "Uma assembleia de sacerdotes budistas", "Um conselho de comerciantes", "Um sistema de governo eleito democraticamente"],
      correctIndex: 0,
      explanation: "O xogunato era um governo militar de fato, liderado por um xogum, enquanto o imperador mantinha um papel majoritariamente simbólico."
    },
    {
      id: 178,
      question: "A Ilha de Okunoshima, conhecida por sua grande população de coelhos selvagens, também guarda ruínas de qual tipo de instalação histórica?",
      options: ["Uma fábrica secreta de armas químicas da Segunda Guerra Mundial", "Um antigo templo abandonado", "Uma base naval americana", "Uma colônia de pescadores do século XVIII"],
      correctIndex: 0,
      explanation: "Durante a Segunda Guerra Mundial, a ilha abrigou uma fábrica secreta de armas químicas do exército japonês, hoje em ruínas visitáveis."
    },
    {
      id: 179,
      question: "A Cidade Proibida, antigo palácio imperial chinês, está localizada em qual cidade?",
      options: ["Pequim", "Xangai", "Xi'an", "Nanjing"],
      correctIndex: 0,
      explanation: "A Cidade Proibida fica no centro de Pequim e foi residência dos imperadores chineses por quase 500 anos."
    },
    {
      id: 180,
      question: "Por que o antigo palácio imperial chinês é chamado de 'Cidade Proibida'?",
      options: ["Porque o acesso era restrito ao imperador, sua família e servidores", "Porque nunca foi visitada por estrangeiros", "Porque ficava em uma área de guerra constante", "Porque era construída sobre um território sagrado inacessível"],
      correctIndex: 0,
      explanation: "O nome vem do fato de que, por séculos, a entrada era proibida à maioria da população, sendo reservada ao imperador e sua corte."
    },
    {
      id: 181,
      question: "Durante quais dinastias a Cidade Proibida serviu como residência oficial dos imperadores da China?",
      options: ["Dinastias Ming e Qing", "Dinastias Han e Tang", "Dinastia Song apenas", "Dinastia Yuan apenas"],
      correctIndex: 0,
      explanation: "A Cidade Proibida foi residência imperial durante as dinastias Ming e Qing, de 1420 até 1912."
    },
    {
      id: 182,
      question: "O Exército de Terracota, formado por milhares de estátuas de soldados, foi descoberto próximo a qual cidade chinesa?",
      options: ["Xi'an", "Pequim", "Xangai", "Chengdu"],
      correctIndex: 0,
      explanation: "O Exército de Terracota foi encontrado próximo à cidade de Xi'an, antiga capital da China."
    },
    {
      id: 183,
      question: "O Exército de Terracota foi construído para proteger o túmulo de qual imperador chinês?",
      options: ["Qin Shi Huang, o primeiro imperador da China unificada", "Kublai Khan", "O imperador Kangxi", "Confúcio"],
      correctIndex: 0,
      explanation: "As estátuas foram enterradas para proteger o túmulo de Qin Shi Huang, fundador da dinastia Qin e primeiro imperador de uma China unificada."
    },
    {
      id: 184,
      question: "Em que ano o Exército de Terracota foi descoberto por agricultores locais?",
      options: ["1974", "1949", "1911", "2001"],
      correctIndex: 0,
      explanation: "O Exército de Terracota foi descoberto acidentalmente por agricultores em 1974, enquanto cavavam um poço."
    },
    {
      id: 185,
      question: "Aproximadamente quantos soldados de terracota, segundo estimativas, compõem o exército enterrado próximo ao túmulo do imperador Qin?",
      options: ["Cerca de 8.000", "Cerca de 500", "Cerca de 100.000", "Cerca de 50"],
      correctIndex: 0,
      explanation: "Estima-se que o exército seja composto por mais de 8.000 estátuas de soldados, além de cavalos e carruagens, cada uma com feições ligeiramente diferentes."
    },
    {
      id: 186,
      question: "O Templo do Céu, importante complexo religioso de Pequim, era usado pelos imperadores para qual finalidade?",
      options: ["Realizar cerimônias e orações por boas colheitas", "Servir de residência de verão", "Guardar tesouros imperiais", "Sediar julgamentos oficiais"],
      correctIndex: 0,
      explanation: "O Templo do Céu era o local onde os imperadores realizavam cerimônias anuais de oração ao céu por boas colheitas."
    },
    {
      id: 187,
      question: "O Palácio de Potala, importante marco arquitetônico no Tibete, foi historicamente residência de qual liderança religiosa?",
      options: ["O Dalai Lama", "O imperador chinês", "Um patriarca budista Zen", "Um sultão mongol"],
      correctIndex: 0,
      explanation: "O Palácio de Potala, em Lhasa, foi a residência de inverno dos Dalai Lamas até meados do século XX."
    },
    {
      id: 188,
      question: "Em que cidade está localizado o Palácio de Potala?",
      options: ["Lhasa", "Xangai", "Chengdu", "Kunming"],
      correctIndex: 0,
      explanation: "O Palácio de Potala está localizado em Lhasa, capital histórica e religiosa do Tibete."
    },
    {
      id: 189,
      question: "O Grande Buda de Leshan, uma das maiores estátuas de Buda esculpidas em pedra do mundo, está localizado em qual província chinesa?",
      options: ["Sichuan", "Guangdong", "Yunnan", "Hunan"],
      correctIndex: 0,
      explanation: "O Grande Buda de Leshan foi esculpido em um penhasco na província de Sichuan, no sudoeste da China."
    },
    {
      id: 190,
      question: "O Grande Buda de Leshan foi esculpido no encontro de quais rios, segundo a tradição, para acalmar as águas turbulentas?",
      options: ["Os rios Min e Dadu", "Os rios Yangtzé e Amarelo", "O Rio Pérola e o Rio Han", "O Rio Mekong e o Rio Salween"],
      correctIndex: 0,
      explanation: "A estátua foi esculpida no encontro dos rios Min e Dadu, com a intenção de acalmar as águas turbulentas que causavam acidentes com barcos."
    },
    {
      id: 191,
      question: "A Grande Muralha da China é frequentemente associada a um mito popular. Qual dessas afirmações sobre ela é verdadeira?",
      options: ["Ela não é visível a olho nu do espaço, ao contrário do que diz um mito popular", "Ela é visível facilmente da Lua", "Ela foi construída em menos de 10 anos", "Ela tem exatamente 1.000 km de extensão"],
      correctIndex: 0,
      explanation: "Ao contrário de um mito popular, astronautas confirmam que a Grande Muralha não é facilmente visível a olho nu do espaço."
    },
    {
      id: 192,
      question: "O Jardim Humble Administrator (Jardim do Administrador Humilde), um dos mais famosos jardins clássicos chineses, fica em qual cidade?",
      options: ["Suzhou", "Hangzhou", "Nanjing", "Guilin"],
      correctIndex: 0,
      explanation: "O Jardim do Administrador Humilde é um dos jardins clássicos mais famosos da China, localizado na cidade de Suzhou."
    },
    {
      id: 193,
      question: "A cidade de Suzhou é frequentemente comparada a qual cidade europeia, por causa de seus canais?",
      options: ["Veneza", "Amsterdã", "Paris", "Londres"],
      correctIndex: 0,
      explanation: "Suzhou é apelidada de 'Veneza do Oriente' devido à sua rede de canais e pontes antigas."
    },
    {
      id: 194,
      question: "O Templo de Shaolin, famoso por sua associação com as artes marciais chinesas, fica em qual província?",
      options: ["Henan", "Sichuan", "Fujian", "Shandong"],
      correctIndex: 0,
      explanation: "O lendário Templo de Shaolin, berço do kung fu Shaolin, está localizado na província de Henan."
    },
    {
      id: 195,
      question: "Os montes de Guilin, com suas formações cársticas únicas retratadas em pinturas tradicionais chinesas, ficam em qual região?",
      options: ["Guangxi", "Tibete", "Mongólia Interior", "Xinjiang"],
      correctIndex: 0,
      explanation: "As formações cársticas de Guilin, na região de Guangxi, são um dos cenários naturais mais icônicos e pintados da China."
    },
    {
      id: 196,
      question: "O Bund, famosa avenida à beira-rio com prédios históricos de estilo ocidental, é um marco de qual cidade chinesa?",
      options: ["Xangai", "Pequim", "Guangzhou", "Tianjin"],
      correctIndex: 0,
      explanation: "O Bund é uma avenida histórica à beira do rio Huangpu, em Xangai, conhecida por seus edifícios de arquitetura ocidental do início do século XX."
    },
    {
      id: 197,
      question: "A Torre de Porcelana de Nanjing, uma maravilha da China antiga hoje reconstruída, era originalmente revestida de quê?",
      options: ["Tijolos de porcelana branca e vidrados coloridos", "Placas de ouro maciço", "Mármore importado da Itália", "Bambu laqueado"],
      correctIndex: 0,
      explanation: "A torre original era revestida com tijolos de porcelana branca e elementos vidrados coloridos, sendo considerada uma das maravilhas do mundo medieval."
    },
    {
      id: 198,
      question: "O Palácio de Verão, complexo de jardins e lagos usado pela família imperial chinesa, está localizado em qual cidade?",
      options: ["Pequim", "Xangai", "Xi'an", "Chengdu"],
      correctIndex: 0,
      explanation: "O Palácio de Verão fica nos arredores de Pequim e era usado pela corte imperial como refúgio durante o verão."
    },
    {
      id: 199,
      question: "Quem foi a imperatriz historicamente associada à reconstrução do Palácio de Verão no final do século XIX?",
      options: ["Imperatriz Viúva Cixi", "Imperatriz Wu Zetian", "Rainha Consorte Wanrong", "Imperatriz Ma"],
      correctIndex: 0,
      explanation: "A Imperatriz Viúva Cixi ficou conhecida por usar recursos do tesouro naval para reconstruir e embelezar o Palácio de Verão."
    },
    {
      id: 200,
      question: "A Grande Muralha da China é composta principalmente de quais materiais, variando conforme a época e a região?",
      options: ["Terra socada, pedra e tijolo", "Apenas mármore", "Apenas ferro fundido", "Bambu e madeira exclusivamente"],
      correctIndex: 0,
      explanation: "Dependendo da época e da região, a muralha foi construída com terra socada, pedra, tijolo e outros materiais disponíveis localmente."
    },
    {
      id: 201,
      question: "O Templo Branco de Nuvens (Baiyun Guan), importante centro do taoísmo, está localizado em qual cidade?",
      options: ["Pequim", "Xangai", "Chengdu", "Kunming"],
      correctIndex: 0,
      explanation: "O Baiyun Guan é um dos templos taoístas mais importantes da China, localizado em Pequim."
    },
    {
      id: 202,
      question: "A antiga Rota da Seda, importante rede de comércio histórico, conectava a China a quais outras regiões do mundo?",
      options: ["Ásia Central, Oriente Médio e Europa", "Apenas o Japão e a Coreia", "Somente o Sudeste Asiático", "Exclusivamente a África"],
      correctIndex: 0,
      explanation: "A Rota da Seda era uma rede de rotas comerciais que ligava a China à Ásia Central, ao Oriente Médio e, por fim, à Europa."
    },
    {
      id: 203,
      question: "As Cavernas de Mogao, importante sítio budista com milhares de pinturas e esculturas, ficam próximas a qual cidade da Rota da Seda?",
      options: ["Dunhuang", "Xi'an", "Kashgar", "Lanzhou"],
      correctIndex: 0,
      explanation: "As Cavernas de Mogao, com centenas de grutas decoradas com arte budista, ficam próximas à cidade de Dunhuang."
    },
    {
      id: 204,
      question: "O Templo de Confúcio, dedicado ao filósofo chinês, encontra-se principalmente em qual cidade natal dele?",
      options: ["Qufu", "Pequim", "Xangai", "Xi'an"],
      correctIndex: 0,
      explanation: "O Templo de Confúcio mais importante fica em Qufu, cidade natal do filósofo, na província de Shandong."
    },
    {
      id: 205,
      question: "Confúcio, homenageado em templos por toda a China, foi principalmente qual tipo de figura histórica?",
      options: ["Um filósofo e educador", "Um imperador guerreiro", "Um general militar", "Um explorador marítimo"],
      correctIndex: 0,
      explanation: "Confúcio foi um filósofo, educador e pensador político chinês cujas ideias influenciaram profundamente a cultura chinesa."
    },
    {
      id: 206,
      question: "O Distrito de Hutong, com suas vielas tradicionais e pátios históricos, é uma característica típica de qual cidade?",
      options: ["Pequim", "Xangai", "Guangzhou", "Shenzhen"],
      correctIndex: 0,
      explanation: "Os hutongs são becos e vielas tradicionais formados por antigas residências com pátio, típicos da arquitetura histórica de Pequim."
    },
    {
      id: 207,
      question: "O Monte Tai, uma das montanhas sagradas mais importantes da China, está associado a qual tradição filosófica/religiosa?",
      options: ["O taoísmo", "O cristianismo", "O islamismo", "O xintoísmo (que é japonês)"],
      correctIndex: 0,
      explanation: "O Monte Tai é uma das cinco montanhas sagradas do taoísmo chinês, historicamente visitada por imperadores para realizar cerimônias."
    },
    {
      id: 208,
      question: "O Zoológico e a Torre de TV de Xangai, a Oriental Pearl Tower, são reconhecidos por qual característica arquitetônica marcante?",
      options: ["Suas esferas metálicas ao longo da estrutura", "Seu formato piramidal", "Sua fachada revestida de ouro", "Seu formato de dragão"],
      correctIndex: 0,
      explanation: "A Oriental Pearl Tower é reconhecida por suas grandes esferas metálicas dispostas ao longo da torre, lembrando pérolas."
    },
    {
      id: 209,
      question: "O Portão de Tiananmen, entrada histórica para a Cidade Proibida, dá nome a qual famosa praça de Pequim?",
      options: ["Praça Tiananmen", "Praça da Paz Celestial Ocidental", "Praça do Povo", "Praça Vermelha (que é russa)"],
      correctIndex: 0,
      explanation: "O Portão de Tiananmen dá nome à Praça Tiananmen, uma das maiores praças públicas do mundo, no centro de Pequim."
    },
    {
      id: 210,
      question: "O que significa 'Tiananmen' em chinês?",
      options: ["'Portão da Paz Celestial'", "'Portão do Dragão Dourado'", "'Portão dos Imperadores'", "'Portão da Grande Muralha'"],
      correctIndex: 0,
      explanation: "'Tiananmen' significa aproximadamente 'Portão da Paz Celestial', nome carregado de simbolismo na tradição imperial chinesa."
    },
    {
      id: 211,
      question: "A Grande Muralha teve, ao longo da história, qual outra função além da militar, relacionada ao comércio?",
      options: ["Controlar e taxar o comércio ao longo da Rota da Seda", "Servir como via exclusiva para peregrinos religiosos", "Funcionar como aqueduto para irrigação", "Servir de estrada para caravanas de sal"],
      correctIndex: 0,
      explanation: "Além da defesa militar, a muralha também ajudava a controlar e taxar o comércio de caravanas que cruzavam a fronteira norte da China."
    },
    {
      id: 212,
      question: "O Mausoléu de Qin Shi Huang, onde está o túmulo do imperador que ordenou o Exército de Terracota, permanece até hoje em qual condição?",
      options: ["Ainda não foi totalmente escavado pelos arqueólogos", "Foi completamente destruído por saqueadores", "Está aberto à visitação pública em seu interior", "Foi transformado em um templo budista"],
      correctIndex: 0,
      explanation: "O túmulo principal do imperador ainda não foi escavado, por razões técnicas e de preservação, permanecendo um mistério parcial até hoje."
    },
    {
      id: 213,
      question: "O Templo Lama (Yonghe Gong), um dos templos budistas tibetanos mais importantes fora do Tibete, está localizado em qual cidade?",
      options: ["Pequim", "Lhasa", "Chengdu", "Xining"],
      correctIndex: 0,
      explanation: "O Yonghe Gong, ou Templo Lama, é um importante templo budista tibetano localizado em Pequim."
    },
    {
      id: 214,
      question: "A Represa das Três Gargantas, uma das maiores obras de engenharia moderna da China, foi construída sobre qual rio?",
      options: ["Rio Yangtzé", "Rio Amarelo", "Rio Pérola", "Rio Mekong"],
      correctIndex: 0,
      explanation: "A Represa das Três Gargantas foi construída sobre o rio Yangtzé, o maior rio da Ásia, e é a maior usina hidrelétrica do mundo em capacidade instalada."
    },
    {
      id: 215,
      question: "O Antigo Observatório Astronômico de Pequim, ainda preservado, foi construído inicialmente durante qual dinastia?",
      options: ["Dinastia Yuan", "Dinastia Han", "Dinastia Song", "Dinastia Qin"],
      correctIndex: 0,
      explanation: "O observatório de Pequim tem origens na dinastia Yuan, no século XIII, e foi expandido em dinastias posteriores."
    },
    {
      id: 216,
      question: "Os Terraços de Arroz de Longsheng, importante paisagem cultural chinesa, ficam esculpidos em qual tipo de terreno?",
      options: ["Encostas de montanhas", "Planícies costeiras", "Desertos irrigados", "Ilhas fluviais"],
      correctIndex: 0,
      explanation: "Os famosos terraços de arroz de Longsheng foram esculpidos ao longo de encostas de montanhas, técnica agrícola milenar chinesa."
    },
    {
      id: 217,
      question: "O Palácio Potala, no Tibete, é construído em qual tipo de terreno elevado, o que reforça seu caráter simbólico e defensivo?",
      options: ["No topo da Colina Vermelha (Marpo Ri)", "No fundo de um vale fértil", "Sobre uma ilha em um lago sagrado", "Em uma caverna natural nas montanhas"],
      correctIndex: 0,
      explanation: "O Palácio de Potala foi construído no topo da Colina Vermelha (Marpo Ri), dominando a paisagem de Lhasa."
    },
    {
      id: 218,
      question: "O Forte Vermelho (Red Fort), importante monumento histórico indiano, está localizado em qual cidade?",
      options: ["Nova Deli", "Agra", "Jaipur", "Mumbai"],
      correctIndex: 0,
      explanation: "O Forte Vermelho fica em Nova Deli e foi a principal residência dos imperadores mogóis por quase 200 anos."
    },
    {
      id: 219,
      question: "O Forte Vermelho de Deli recebe esse nome por causa de qual característica?",
      options: ["A cor avermelhada de sua construção em arenito", "Por ter sido palco de uma grande batalha sangrenta", "Por abrigar uma coleção de rubis", "Por ser pintado de vermelho anualmente em um festival"],
      correctIndex: 0,
      explanation: "O forte recebe o nome por ser construído principalmente em arenito vermelho, característico da arquitetura mogol da região."
    },
    {
      id: 220,
      question: "Qual imperador mogol ordenou a construção do Forte Vermelho, o mesmo responsável pelo Taj Mahal?",
      options: ["Shah Jahan", "Akbar", "Aurangzeb", "Babur"],
      correctIndex: 0,
      explanation: "O Forte Vermelho de Deli foi construído a mando do imperador Shah Jahan, o mesmo que construiu o Taj Mahal."
    },
    {
      id: 221,
      question: "O Qutub Minar, um dos minaretes de tijolo mais altos do mundo, está localizado em qual cidade?",
      options: ["Nova Deli", "Agra", "Varanasi", "Hyderabad"],
      correctIndex: 0,
      explanation: "O Qutub Minar fica em Nova Deli e é um dos monumentos históricos mais importantes da Índia."
    },
    {
      id: 222,
      question: "O Qutub Minar foi construído inicialmente para comemorar qual tipo de evento histórico?",
      options: ["O início do domínio muçulmano na região de Deli", "Uma vitória militar hindu", "A fundação do primeiro templo budista da Índia", "A chegada dos portugueses à Índia"],
      correctIndex: 0,
      explanation: "A construção do Qutub Minar foi iniciada para marcar o início do domínio muçulmano na região, no final do século XII."
    },
    {
      id: 223,
      question: "O Hawa Mahal, conhecido como 'Palácio dos Ventos' por suas centenas de pequenas janelas, está localizado em qual cidade?",
      options: ["Jaipur", "Udaipur", "Jodhpur", "Bikaner"],
      correctIndex: 0,
      explanation: "O Hawa Mahal fica na cidade de Jaipur, conhecida como a 'Cidade Rosa' da Índia."
    },
    {
      id: 224,
      question: "Qual era a principal função das centenas de pequenas janelas do Hawa Mahal, na tradição da corte real?",
      options: ["Permitir que as mulheres da corte observassem a rua sem serem vistas", "Servir como saída de emergência em caso de incêndio", "Melhorar a ventilação de um hospital", "Funcionar como um sistema de sinalização militar"],
      correctIndex: 0,
      explanation: "As janelas permitiam que as mulheres da realeza observassem a vida na rua e celebrações, mantendo-se ocultas conforme os costumes da época."
    },
    {
      id: 225,
      question: "O Templo Dourado (Harmandir Sahib), local mais sagrado do siquismo, está localizado em qual cidade indiana?",
      options: ["Amritsar", "Nova Deli", "Chandigarh", "Ludhiana"],
      correctIndex: 0,
      explanation: "O Templo Dourado fica na cidade de Amritsar, no estado de Punjab, e é o principal centro espiritual do siquismo."
    },
    {
      id: 226,
      question: "Por que o Harmandir Sahib é popularmente conhecido como 'Templo Dourado'?",
      options: ["Por sua cúpula e parte da fachada serem revestidas de ouro", "Por ficar ao lado de minas de ouro", "Por ser construído inteiramente com moedas de ouro derretidas", "Por seu nome original significar 'ouro' em punjabi"],
      correctIndex: 0,
      explanation: "A cúpula superior e parte da fachada do templo são revestidas com folhas de ouro, o que lhe deu o apelido popular."
    },
    {
      id: 227,
      question: "As Cavernas de Ajanta e Ellora, importantes sítios de arte rupestre indiana, estão localizadas em qual estado?",
      options: ["Maharashtra", "Rajasthan", "Kerala", "Punjab"],
      correctIndex: 0,
      explanation: "As Cavernas de Ajanta e Ellora, esculpidas na rocha com templos e pinturas antigas, ficam no estado de Maharashtra."
    },
    {
      id: 228,
      question: "As Cavernas de Ellora são notáveis por reunir templos de quais tradições religiosas diferentes no mesmo complexo?",
      options: ["Budismo, hinduísmo e jainismo", "Apenas hinduísmo", "Apenas islamismo", "Cristianismo e judaísmo"],
      correctIndex: 0,
      explanation: "As Cavernas de Ellora reúnem, em um mesmo complexo, templos esculpidos na rocha de três tradições: budismo, hinduísmo e jainismo."
    },
    {
      id: 229,
      question: "O Portão da Índia (Gateway of India), importante monumento à beira-mar, está localizado em qual cidade?",
      options: ["Mumbai", "Chennai", "Kolkata", "Goa"],
      correctIndex: 0,
      explanation: "O Portão da Índia fica em Mumbai, à beira do Mar Arábico, e foi construído no início do século XX."
    },
    {
      id: 230,
      question: "O Portão da Índia, em Mumbai, foi construído para comemorar qual evento histórico?",
      options: ["A visita do rei George V e da rainha Mary à Índia, em 1911", "A independência da Índia, em 1947", "A fundação da cidade de Mumbai", "O fim da Segunda Guerra Mundial"],
      correctIndex: 0,
      explanation: "O monumento foi erguido para comemorar o desembarque do rei George V e da rainha Mary, em sua visita à Índia britânica em 1911."
    },
    {
      id: 231,
      question: "O Templo do Lótus, com sua arquitetura em forma de flor, é um templo dedicado a qual religião?",
      options: ["A Fé Bahá'í", "O hinduísmo", "O budismo", "O jainismo"],
      correctIndex: 0,
      explanation: "O Templo do Lótus, em Nova Deli, é uma casa de adoração da Fé Bahá'í, aberta a pessoas de todas as religiões."
    },
    {
      id: 232,
      question: "O Palácio de Mysore, um dos mais visitados da Índia, está localizado em qual estado?",
      options: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"],
      correctIndex: 0,
      explanation: "O Palácio de Mysore fica na cidade de mesmo nome, no estado de Karnataka, no sul da Índia."
    },
    {
      id: 233,
      question: "O Templo de Sol de Konark, esculpido em forma de uma grande carruagem, está localizado em qual estado indiano?",
      options: ["Odisha", "Bihar", "Bengala Ocidental", "Jharkhand"],
      correctIndex: 0,
      explanation: "O Templo do Sol de Konark, dedicado ao deus Surya, tem a forma de uma carruagem puxada por cavalos de pedra e fica em Odisha."
    },
    {
      id: 234,
      question: "O Templo de Sol de Konark é famoso por representar uma carruagem com quantas rodas de pedra esculpidas?",
      options: ["24 rodas", "4 rodas", "100 rodas", "12 rodas"],
      correctIndex: 0,
      explanation: "O templo é decorado com 24 grandes rodas de pedra esculpidas, representando uma carruagem solar."
    },
    {
      id: 235,
      question: "O Palácio da Água (Lake Palace), construído no meio de um lago, está localizado em qual cidade indiana?",
      options: ["Udaipur", "Jaipur", "Jodhpur", "Jaisalmer"],
      correctIndex: 0,
      explanation: "O Lake Palace fica no meio do Lago Pichola, na cidade de Udaipur, conhecida como a 'Veneza do Oriente' indiana."
    },
    {
      id: 236,
      question: "O Templo de Meenakshi, com suas torres coloridas e ricamente esculpidas (gopurams), fica em qual cidade do sul da Índia?",
      options: ["Madurai", "Chennai", "Bangalore", "Kochi"],
      correctIndex: 0,
      explanation: "O Templo de Meenakshi, dedicado à deusa Parvati, fica na cidade de Madurai, no estado de Tamil Nadu."
    },
    {
      id: 237,
      question: "Os 'gopurams', torres monumentais e coloridas presentes em templos do sul da Índia, geralmente marcam qual parte da estrutura?",
      options: ["A entrada principal do templo", "O local de sepultamento dos sacerdotes", "A cozinha do templo", "O depósito de oferendas"],
      correctIndex: 0,
      explanation: "Os gopurams são torres ornamentadas que marcam as entradas dos templos hindus tradicionais do sul da Índia."
    },
    {
      id: 238,
      question: "O Forte de Amber (Amber Fort), com sua arquitetura em arenito e mármore, fica próximo a qual cidade?",
      options: ["Jaipur", "Delhi", "Agra", "Jodhpur"],
      correctIndex: 0,
      explanation: "O Forte de Amber fica nos arredores de Jaipur e é conhecido por sua combinação de estilos arquitetônicos hindu e mogol."
    },
    {
      id: 239,
      question: "O Templo de Kashi Vishwanath, um dos mais sagrados do hinduísmo, dedicado ao deus Shiva, fica em qual cidade?",
      options: ["Varanasi", "Nova Deli", "Mumbai", "Amritsar"],
      correctIndex: 0,
      explanation: "O templo fica na cidade sagrada de Varanasi, às margens do rio Ganges, um dos locais mais importantes de peregrinação hindu."
    },
    {
      id: 240,
      question: "O rio Ganges, um dos mais sagrados para os hindus e associado a várias cidades históricas indianas, nasce em qual cordilheira?",
      options: ["O Himalaia", "Os Montes Gates Ocidentais", "Os Montes Vindhya", "A Cordilheira dos Andes (fora da Índia)"],
      correctIndex: 0,
      explanation: "O rio Ganges nasce nas geleiras do Himalaia e é considerado sagrado ao longo de todo o seu curso pelos hindus."
    },
    {
      id: 241,
      question: "O Complexo de Fatehpur Sikri, antiga capital mogol hoje abandonada, foi construído por qual imperador?",
      options: ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"],
      correctIndex: 0,
      explanation: "Fatehpur Sikri foi construída pelo imperador Akbar no século XVI, mas foi abandonada décadas depois, principalmente por falta de água."
    },
    {
      id: 242,
      question: "Por que a cidade de Fatehpur Sikri foi abandonada pouco tempo depois de construída?",
      options: ["Principalmente pela escassez de água na região", "Por causa de uma invasão estrangeira", "Por um grande incêndio que destruiu grande parte da cidade", "Por uma epidemia que atingiu toda a população"],
      correctIndex: 0,
      explanation: "A cidade foi abandonada poucas décadas após sua construção, principalmente devido à escassez de suprimento de água na região."
    },
    {
      id: 243,
      question: "O Templo de Brihadeeswarar, importante templo dedicado a Shiva com uma das maiores torres de templo da Índia, fica em qual cidade?",
      options: ["Thanjavur", "Chennai", "Madurai", "Coimbatore"],
      correctIndex: 0,
      explanation: "O Templo de Brihadeeswarar, construído pela dinastia Chola, está localizado na cidade de Thanjavur, no estado de Tamil Nadu."
    },
    {
      id: 244,
      question: "O que caracteriza a arquitetura mogol, presente em monumentos como o Taj Mahal e o Forte Vermelho?",
      options: ["Combinação de elementos persas, islâmicos e indianos", "Uso exclusivo de madeira e bambu", "Influência direta da arquitetura grega antiga", "Ausência total de simetria nas construções"],
      correctIndex: 0,
      explanation: "A arquitetura mogol combina elementos de tradições persas e islâmicas com técnicas e materiais locais indianos."
    },
    {
      id: 245,
      question: "O Jama Masjid, uma das maiores mesquitas da Índia, está localizado em qual cidade?",
      options: ["Nova Deli", "Lucknow", "Hyderabad", "Bhopal"],
      correctIndex: 0,
      explanation: "A Jama Masjid, construída pelo imperador Shah Jahan, fica no centro histórico de Nova Deli."
    },
    {
      id: 246,
      question: "O Palácio de Vento (Hawa Mahal) e a maioria dos edifícios históricos de Jaipur compartilham qual característica de cor, dando à cidade um apelido famoso?",
      options: ["Tons de rosa/terracota, o que rendeu à cidade o apelido de 'Cidade Rosa'", "Tons de azul, apelidada de 'Cidade Azul'", "Tons de branco, apelidada de 'Cidade Branca'", "Tons de dourado, apelidada de 'Cidade Dourada'"],
      correctIndex: 0,
      explanation: "Jaipur é conhecida como a 'Cidade Rosa' por causa da cor terracota/rosada predominante em seus edifícios históricos."
    },
    {
      id: 247,
      question: "A cidade de Jodhpur, com muitas construções pintadas de azul em seu centro histórico, é popularmente conhecida como:",
      options: ["'Cidade Azul'", "'Cidade Rosa'", "'Cidade Dourada'", "'Cidade de Prata'"],
      correctIndex: 0,
      explanation: "Jodhpur é apelidada de 'Cidade Azul' devido à cor predominante das casas em seu centro histórico, ao redor do Forte Mehrangarh."
    },
    {
      id: 248,
      question: "O Forte de Mehrangarh, um dos maiores fortes da Índia, domina a paisagem de qual cidade?",
      options: ["Jodhpur", "Jaipur", "Udaipur", "Bikaner"],
      correctIndex: 0,
      explanation: "O Forte de Mehrangarh fica no alto de uma colina rochosa em Jodhpur, dominando a vista da cidade."
    },
    {
      id: 249,
      question: "O que é um 'stupa', estrutura budista encontrada em monumentos indianos como o Grande Stupa de Sanchi?",
      options: ["Uma construção em formato de cúpula usada para guardar relíquias sagradas", "Um tipo de portão decorativo", "Uma torre residencial da realeza", "Um sistema de irrigação antigo"],
      correctIndex: 0,
      explanation: "Um stupa é uma estrutura em formato de cúpula usada tradicionalmente para abrigar relíquias budistas sagradas."
    },
    {
      id: 250,
      question: "O Grande Stupa de Sanchi, um dos monumentos budistas mais antigos preservados da Índia, está localizado em qual estado?",
      options: ["Madhya Pradesh", "Bihar", "Uttar Pradesh", "Rajasthan"],
      correctIndex: 0,
      explanation: "O Grande Stupa de Sanchi fica no estado de Madhya Pradesh e data do período do imperador Ashoka, no século III a.C."
    },
    {
      id: 251,
      question: "O imperador Ashoka, associado à disseminação do budismo e a monumentos como o Stupa de Sanchi, governou qual império?",
      options: ["O Império Máurya", "O Império Gupta", "O Império Mogol", "O Império Chola"],
      correctIndex: 0,
      explanation: "Ashoka foi um dos maiores imperadores do Império Máurya, conhecido por converter-se ao budismo e promover sua difusão."
    },
    {
      id: 252,
      question: "O Templo de Akshardham, um dos maiores complexos de templos hindus do mundo, está localizado em qual cidade?",
      options: ["Nova Deli", "Mumbai", "Ahmedabad", "Surat"],
      correctIndex: 0,
      explanation: "O Templo Akshardham, inaugurado em 2005, é um dos maiores e mais visitados complexos religiosos hindus, localizado em Nova Deli."
    },
    {
      id: 253,
      question: "O que é uma 'haveli', tipo de construção tradicional encontrada em regiões como Rajasthan, associada a famílias ricas?",
      options: ["Uma mansão ou residência tradicional ricamente decorada", "Um templo hindu de grande porte", "Uma fortaleza militar", "Um mercado coberto"],
      correctIndex: 0,
      explanation: "Havelis são mansões tradicionais, muitas vezes ricamente decoradas com pinturas e esculturas, construídas por famílias comerciantes abastadas."
    },
    {
      id: 254,
      question: "O Complexo de Khajuraho, conhecido por seus templos ricamente esculpidos, está localizado em qual estado indiano?",
      options: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "Rajasthan"],
      correctIndex: 0,
      explanation: "Os templos de Khajuraho, reconhecidos pela riqueza de suas esculturas, ficam no estado de Madhya Pradesh."
    },
    {
      id: 255,
      question: "O Taj Mahal é frequentemente descrito como um exemplo perfeito de qual princípio arquitetônico, visível em sua fachada?",
      options: ["Simetria", "Assimetria proposital", "Ausência de padrões geométricos", "Estilo puramente minimalista sem ornamentos"],
      correctIndex: 0,
      explanation: "O Taj Mahal é célebre por sua simetria quase perfeita, tanto na estrutura principal quanto nos jardins ao seu redor."
    },
    {
      id: 256,
      question: "Os jardins do tipo 'charbagh', presentes no complexo do Taj Mahal, têm origem em qual tradição paisagística?",
      options: ["Tradição persa de jardins divididos em quatro partes", "Tradição chinesa de jardins zen", "Tradição europeia de jardins formais franceses", "Tradição indígena americana"],
      correctIndex: 0,
      explanation: "O charbagh é um estilo de jardim persa dividido em quatro seções por caminhos de água, adotado pelos mogóis em monumentos como o Taj Mahal."
    },
    {
      id: 257,
      question: "O Kremlin de Moscou, importante complexo histórico e sede do governo russo, está localizado às margens de qual rio?",
      options: ["Rio Moscou", "Rio Volga", "Rio Neva", "Rio Don"],
      correctIndex: 0,
      explanation: "O Kremlin de Moscou está situado às margens do rio Moscou, no centro histórico da capital russa."
    },
    {
      id: 258,
      question: "O que significa a palavra 'kremlin' em russo?",
      options: ["Fortaleza dentro de uma cidade", "Palácio real", "Praça central", "Muralha sagrada"],
      correctIndex: 0,
      explanation: "'Kremlin' é um termo russo geral para 'fortaleza' ou 'cidadela' dentro de uma cidade; várias cidades russas têm seu próprio kremlin, mas o de Moscou é o mais famoso."
    },
    {
      id: 259,
      question: "A Catedral de São Basílio, com suas cúpulas coloridas em formato de bulbo, está localizada em qual praça de Moscou?",
      options: ["Praça Vermelha", "Praça do Kremlin", "Praça da Revolução", "Praça Manezhnaya"],
      correctIndex: 0,
      explanation: "A Catedral de São Basílio fica na extremidade sul da Praça Vermelha, em Moscou."
    },
    {
      id: 260,
      question: "A Catedral de São Basílio foi mandada construir por qual governante russo, para celebrar uma vitória militar?",
      options: ["Ivan, o Terrível", "Pedro, o Grande", "Catarina, a Grande", "Nicolau II"],
      correctIndex: 0,
      explanation: "A catedral foi construída a mando de Ivan, o Terrível, para celebrar a conquista de Kazan em 1552."
    },
    {
      id: 261,
      question: "O Palácio de Inverno, atual sede do Museu Hermitage, está localizado em qual cidade russa?",
      options: ["São Petersburgo", "Moscou", "Novosibirsk", "Kazan"],
      correctIndex: 0,
      explanation: "O Palácio de Inverno, antiga residência oficial dos czares russos, fica em São Petersburgo e hoje abriga o famoso Museu Hermitage."
    },
    {
      id: 262,
      question: "O Museu Hermitage, um dos maiores e mais visitados museus de arte do mundo, está localizado em qual antigo edifício?",
      options: ["O Palácio de Inverno", "O Kremlin de Moscou", "O Palácio de Peterhof", "A Catedral de Kazan"],
      correctIndex: 0,
      explanation: "O Hermitage ocupa o antigo Palácio de Inverno e edifícios anexos, que foram residência oficial dos czares russos."
    },
    {
      id: 263,
      question: "Qual czarina russa é frequentemente associada à fundação da coleção de arte que deu origem ao Museu Hermitage?",
      options: ["Catarina, a Grande", "Ana Ivanovna", "Isabel Petrovna", "Alexandra Feodorovna"],
      correctIndex: 0,
      explanation: "Catarina, a Grande, começou a formar a coleção de arte no século XVIII, que mais tarde se tornaria o acervo do Museu Hermitage."
    },
    {
      id: 264,
      question: "O Palácio de Peterhof, conhecido por suas extensas fontes douradas, foi inspirado em qual palácio europeu?",
      options: ["O Palácio de Versalhes, na França", "O Palácio de Buckingham, na Inglaterra", "O Palácio de Schönbrunn, na Áustria", "O Palácio Real de Madrid, na Espanha"],
      correctIndex: 0,
      explanation: "O czar Pedro, o Grande, idealizou Peterhof como uma resposta russa ao Palácio de Versalhes, após visitar a França."
    },
    {
      id: 265,
      question: "Qual czar russo é o principal responsável pela criação do complexo de Peterhof, incluindo seus famosos jardins e fontes?",
      options: ["Pedro, o Grande", "Ivan, o Terrível", "Nicolau I", "Alexandre III"],
      correctIndex: 0,
      explanation: "Pedro, o Grande, ordenou a construção de Peterhof no início do século XVIII, como uma residência de veraneio à beira do Mar Báltico."
    },
    {
      id: 266,
      question: "A Igreja do Salvador sobre o Sangue Derramado, com cúpulas coloridas semelhantes às de São Basílio, foi construída em qual cidade?",
      options: ["São Petersburgo", "Moscou", "Novgorod", "Yekaterinburgo"],
      correctIndex: 0,
      explanation: "Essa igreja fica em São Petersburgo e foi construída no local onde o czar Alexandre II foi assassinado em 1881."
    },
    {
      id: 267,
      question: "Por que a Igreja do Salvador sobre o Sangue Derramado recebeu esse nome?",
      options: ["Foi construída no local do assassinato do czar Alexandre II", "Foi palco de uma grande batalha sangrenta", "Homenageia soldados mortos na Primeira Guerra Mundial", "Foi erguida sobre um antigo campo de batalha medieval"],
      correctIndex: 0,
      explanation: "O nome faz referência ao assassinato do czar Alexandre II, que ocorreu exatamente no local onde a igreja foi erguida."
    },
    {
      id: 268,
      question: "São Petersburgo foi fundada por qual czar, que a projetou como uma 'janela para a Europa'?",
      options: ["Pedro, o Grande", "Ivan IV", "Nicolau I", "Alexandre I"],
      correctIndex: 0,
      explanation: "Pedro, o Grande, fundou São Petersburgo em 1703 com a intenção de criar uma cidade moderna voltada para a Europa Ocidental."
    },
    {
      id: 269,
      question: "O Teatro Bolshoi, famoso por suas produções de balé e ópera, está localizado em qual cidade?",
      options: ["Moscou", "São Petersburgo", "Kiev (Ucrânia, não Rússia)", "Minsk (Belarus, não Rússia)"],
      correctIndex: 0,
      explanation: "O Teatro Bolshoi, uma das companhias de balé e ópera mais renomadas do mundo, está localizado em Moscou."
    },
    {
      id: 270,
      question: "O Mausoléu de Lênin, onde o corpo embalsamado do líder soviético é exibido, está localizado em qual praça?",
      options: ["Praça Vermelha, em Moscou", "Praça do Palácio, em São Petersburgo", "Praça da Independência, em Kiev", "Praça Vitória, em Minsk"],
      correctIndex: 0,
      explanation: "O Mausoléu de Lênin fica na Praça Vermelha, próximo às muralhas do Kremlin de Moscou."
    },
    {
      id: 271,
      question: "A Torre Spasskaya, com seu famoso relógio, é uma das principais torres de qual complexo histórico russo?",
      options: ["O Kremlin de Moscou", "O Palácio de Inverno", "O Mosteiro de Novodevichy", "A Fortaleza de Pedro e Paulo"],
      correctIndex: 0,
      explanation: "A Torre Spasskaya é uma das torres históricas do Kremlin de Moscou, conhecida por seu grande relógio que marca as horas do país em transmissões oficiais."
    },
    {
      id: 272,
      question: "A Fortaleza de Pedro e Paulo, marco histórico fundacional, está localizada em qual cidade?",
      options: ["São Petersburgo", "Moscou", "Vladivostok", "Sochi"],
      correctIndex: 0,
      explanation: "A Fortaleza de Pedro e Paulo foi a primeira construção de São Petersburgo, erguida por Pedro, o Grande, em 1703."
    },
    {
      id: 273,
      question: "O Mosteiro de Novodevichy, importante complexo religioso histórico, está localizado em qual cidade?",
      options: ["Moscou", "São Petersburgo", "Novgorod", "Suzdal"],
      correctIndex: 0,
      explanation: "O Mosteiro de Novodevichy fica em Moscou e é reconhecido pela UNESCO como Patrimônio Mundial."
    },
    {
      id: 274,
      question: "O Anel de Ouro (Golden Ring) é uma rota turística que reúne cidades históricas russas conhecidas principalmente por qual característica?",
      options: ["Antigas cidades com importantes igrejas e mosteiros medievais", "Fábricas do período soviético", "Praias e resorts à beira-mar", "Modernos arranha-céus"],
      correctIndex: 0,
      explanation: "O Anel de Ouro reúne cidades históricas ao redor de Moscou, famosas por seus monastérios e igrejas medievais bem preservados."
    },
    {
      id: 275,
      question: "A cidade histórica de Suzdal, parte do Anel de Ouro russo, é conhecida por ter uma alta concentração de quê?",
      options: ["Igrejas e mosteiros históricos", "Fábricas industriais", "Museus de arte moderna", "Estádios esportivos"],
      correctIndex: 0,
      explanation: "Suzdal é famosa por preservar um grande número de igrejas e mosteiros antigos, quase sem construções modernas em seu centro histórico."
    },
    {
      id: 276,
      question: "A Universidade Estatal de Moscou, com seu prédio principal em estilo 'gótico stalinista', é um exemplo de qual grupo de edifícios conhecidos como 'Sete Irmãs'?",
      options: ["Um conjunto de arranha-céus construídos na era Stalin", "Sete catedrais ortodoxas históricas", "Sete pontes sobre o rio Moscou", "Sete estações de metrô decoradas"],
      correctIndex: 0,
      explanation: "As 'Sete Irmãs' são sete arranha-céus monumentais construídos em Moscou durante o governo de Josef Stalin, incluindo o prédio principal da Universidade Estatal de Moscou."
    },
    {
      id: 277,
      question: "O Metrô de Moscou é famoso mundialmente por qual característica de muitas de suas estações?",
      options: ["Decoração luxuosa, com mármore, mosaicos e lustres", "Serem completamente subterrâneas sem nenhuma decoração", "Terem sido construídas exclusivamente no século XXI", "Serem movidas por energia solar"],
      correctIndex: 0,
      explanation: "Muitas estações do Metrô de Moscou, construídas a partir da década de 1930, são decoradas suntuosamente com mármore, mosaicos e obras de arte."
    },
    {
      id: 278,
      question: "O Teatro Mariinsky, importante casa de ópera e balé, está localizado em qual cidade?",
      options: ["São Petersburgo", "Moscou", "Ecaterimburgo", "Novosibirsk"],
      correctIndex: 0,
      explanation: "O Teatro Mariinsky, um dos mais importantes teatros de ópera e balé do mundo, fica em São Petersburgo."
    },
    {
      id: 279,
      question: "A Ilha de Kizhi, reconhecida pela UNESCO, é famosa por suas construções de madeira, incluindo qual tipo de estrutura?",
      options: ["Igrejas de madeira construídas sem pregos", "Palácios de gelo permanentes", "Fortalezas subterrâneas", "Pontes suspensas de corda"],
      correctIndex: 0,
      explanation: "A Ilha de Kizhi abriga um conjunto de igrejas de madeira tradicionais, construídas com técnicas antigas sem o uso de pregos."
    },
    {
      id: 280,
      question: "O Lago Baikal, o mais profundo e um dos mais antigos lagos do mundo, está localizado em qual região da Rússia?",
      options: ["Sibéria", "Extremo Oriente Russo", "Região do Cáucaso", "Península de Kola"],
      correctIndex: 0,
      explanation: "O Lago Baikal está localizado na Sibéria e é considerado o lago de água doce mais profundo e um dos mais antigos do planeta."
    },
    {
      id: 281,
      question: "A Catedral de Cristo Salvador, uma das maiores igrejas ortodoxas do mundo, está localizada em qual cidade?",
      options: ["Moscou", "São Petersburgo", "Kiev (Ucrânia, não Rússia)", "Minsk (Belarus, não Rússia)"],
      correctIndex: 0,
      explanation: "A Catedral de Cristo Salvador, reconstruída após ser demolida na era soviética, fica em Moscou, às margens do rio Moscou."
    },
    {
      id: 282,
      question: "O que aconteceu com a Catedral de Cristo Salvador original durante o período soviético?",
      options: ["Foi demolida por ordem do governo soviético", "Foi transformada em museu de história natural", "Continuou funcionando normalmente como igreja", "Foi convertida em prédio residencial"],
      correctIndex: 0,
      explanation: "A catedral original foi demolida em 1931 por ordem do governo soviético, sendo reconstruída apenas na década de 1990."
    },
    {
      id: 283,
      question: "A Torre Ostankino, importante estrutura de telecomunicações, está localizada em qual cidade e foi, por um tempo, a estrutura autônoma mais alta do mundo?",
      options: ["Moscou", "São Petersburgo", "Kazan", "Sochi"],
      correctIndex: 0,
      explanation: "A Torre Ostankino, em Moscou, foi a estrutura autônoma mais alta do mundo por vários anos após sua conclusão em 1967."
    },
    {
      id: 284,
      question: "O Kremlin de Moscou serve, além de marco histórico, a qual função política atual?",
      options: ["Sede oficial do governo/presidência da Rússia", "Sede da Igreja Ortodoxa Russa apenas", "Museu exclusivamente, sem função política", "Universidade estatal"],
      correctIndex: 0,
      explanation: "Além de complexo histórico, o Kremlin de Moscou é atualmente a sede oficial da presidência da Federação Russa."
    },
    {
      id: 285,
      question: "Quantas cúpulas coloridas, aproximadamente, tem a Catedral de São Basílio, cada uma representando um santo diferente?",
      options: ["9", "3", "20", "50"],
      correctIndex: 0,
      explanation: "A Catedral de São Basílio é formada por um conjunto de 9 cúpulas distintas e coloridas, cada uma associada a diferentes santos."
    },
    {
      id: 286,
      question: "O Museu Hermitage abriga uma das maiores coleções de arte do mundo, incluindo obras de quais grandes artistas europeus?",
      options: ["Rembrandt, Da Vinci e Picasso, entre outros", "Apenas artistas russos", "Somente arte contemporânea", "Apenas esculturas gregas antigas"],
      correctIndex: 0,
      explanation: "O Hermitage possui uma vasta coleção que inclui obras de mestres como Rembrandt, Leonardo da Vinci, Picasso e muitos outros."
    },
    {
      id: 287,
      question: "A Avenida Nevsky Prospekt, importante rua histórica e comercial, é um marco de qual cidade russa?",
      options: ["São Petersburgo", "Moscou", "Volgogrado", "Ecaterimburgo"],
      correctIndex: 0,
      explanation: "A Nevsky Prospekt é a principal avenida histórica de São Petersburgo, repleta de palácios, igrejas e lojas históricas."
    },
    {
      id: 288,
      question: "O Monumento à Mãe Pátria (The Motherland Calls), uma das estátuas mais altas do mundo, está localizado em qual cidade russa?",
      options: ["Volgogrado", "Moscou", "São Petersburgo", "Kazan"],
      correctIndex: 0,
      explanation: "A estátua Mãe Pátria Chama, que homenageia a Batalha de Stalingrado, fica em Volgogrado (antiga Stalingrado)."
    },
    {
      id: 289,
      question: "O Monumento à Mãe Pátria, em Volgogrado, homenageia qual evento histórico da Segunda Guerra Mundial?",
      options: ["A Batalha de Stalingrado", "A Batalha de Moscou", "O Cerco de Leningrado", "A Batalha de Kursk"],
      correctIndex: 0,
      explanation: "A estátua foi erguida em homenagem aos soldados soviéticos que lutaram na decisiva Batalha de Stalingrado."
    },
    {
      id: 290,
      question: "O Cerco de Leningrado, lembrado em monumentos na atual São Petersburgo, durou aproximadamente quanto tempo durante a Segunda Guerra Mundial?",
      options: ["Cerca de 2 anos e meio", "Cerca de 3 meses", "Cerca de 1 semana", "Cerca de 6 anos"],
      correctIndex: 0,
      explanation: "O Cerco de Leningrado durou aproximadamente 872 dias, cerca de 2 anos e meio, sendo um dos episódios mais trágicos da Segunda Guerra Mundial."
    },
    {
      id: 291,
      question: "O Parthenon, um dos templos mais famosos da Grécia Antiga, está localizado em qual complexo histórico de Atenas?",
      options: ["A Acrópole de Atenas", "A Ágora de Atenas", "O Templo de Zeus Olímpico", "O Cerâmico"],
      correctIndex: 0,
      explanation: "O Parthenon fica no alto da Acrópole de Atenas, uma colina fortificada que abriga os principais monumentos religiosos da cidade antiga."
    },
    {
      id: 292,
      question: "A qual deusa grega o Parthenon é dedicado?",
      options: ["Atena", "Afrodite", "Hera", "Deméter"],
      correctIndex: 0,
      explanation: "O Parthenon é dedicado a Atena Partenos, deusa padroeira da cidade de Atenas."
    },
    {
      id: 293,
      question: "Em que século a.C. o Parthenon foi construído, durante o auge da democracia ateniense?",
      options: ["Século V a.C.", "Século X a.C.", "Século II a.C.", "Século VIII a.C."],
      correctIndex: 0,
      explanation: "O Parthenon foi construído no século V a.C., durante o governo de Péricles, período de grande prosperidade em Atenas."
    },
    {
      id: 294,
      question: "O sítio arqueológico de Delfos, importante centro religioso da Grécia Antiga, era famoso por abrigar qual tipo de figura?",
      options: ["Um oráculo, que fazia previsões em nome do deus Apolo", "Um exército permanente de elite", "A maior biblioteca do mundo antigo", "O túmulo de Alexandre, o Grande"],
      correctIndex: 0,
      explanation: "Delfos era o lar do famoso Oráculo, sacerdotisa que, em transe, transmitia mensagens atribuídas ao deus Apolo."
    },
    {
      id: 295,
      question: "O Oráculo de Delfos era consultado por gregos antigos com qual objetivo principal?",
      options: ["Buscar orientação e previsões sobre decisões importantes", "Realizar cerimônias de casamento", "Registrar nascimentos e óbitos", "Negociar tratados comerciais"],
      correctIndex: 0,
      explanation: "Governantes e cidadãos comuns viajavam a Delfos para consultar o oráculo antes de tomar decisões importantes, de guerras a questões pessoais."
    },
    {
      id: 296,
      question: "O Palácio de Cnossos, na ilha de Creta, é associado a qual civilização pré-grega?",
      options: ["A civilização minoica", "A civilização micênica", "A civilização fenícia", "A civilização etrusca"],
      correctIndex: 0,
      explanation: "Cnossos foi o principal centro da civilização minoica, uma das primeiras grandes civilizações da Europa, que floresceu em Creta."
    },
    {
      id: 297,
      question: "O mito grego do Minotauro e do labirinto está associado a qual sítio arqueológico?",
      options: ["O Palácio de Cnossos, em Creta", "A Acrópole de Atenas", "O sítio de Micenas", "O templo de Delfos"],
      correctIndex: 0,
      explanation: "A lenda do Minotauro e seu labirinto está tradicionalmente associada ao complexo palaciano de Cnossos, na ilha de Creta."
    },
    {
      id: 298,
      question: "Os Mosteiros de Meteora, construídos no topo de formações rochosas, estão localizados em qual região da Grécia?",
      options: ["Tessália", "Peloponeso", "Macedônia", "Trácia"],
      correctIndex: 0,
      explanation: "Os Mosteiros de Meteora ficam no alto de pilares rochosos na região da Tessália, no centro da Grécia."
    },
    {
      id: 299,
      question: "Por que os monges escolheram construir os Mosteiros de Meteora em locais tão elevados e de difícil acesso?",
      options: ["Buscando isolamento espiritual e proteção contra invasões", "Para facilitar o comércio com outras regiões", "Por exigência de um decreto imperial romano", "Para se aproximar de nascentes de água potável"],
      correctIndex: 0,
      explanation: "A localização de difícil acesso oferecia isolamento para a vida monástica e proteção contra invasões e saques."
    },
    {
      id: 300,
      question: "O Templo de Zeus Olímpico, um dos maiores templos da Grécia Antiga, está localizado em qual cidade?",
      options: ["Atenas", "Olímpia", "Esparta", "Corinto"],
      correctIndex: 0,
      explanation: "Apesar do nome remeter a Olímpia, o Templo de Zeus Olímpico (Olympieion) está localizado em Atenas, próximo à Acrópole."
    },
    {
      id: 301,
      question: "O sítio arqueológico de Olímpia, berço dos Jogos Olímpicos antigos, está localizado em qual região da Grécia?",
      options: ["Peloponeso", "Ática", "Creta", "Trácia"],
      correctIndex: 0,
      explanation: "Olímpia está localizada na região do Peloponeso, no sul da Grécia continental."
    },
    {
      id: 302,
      question: "Com que frequência os Jogos Olímpicos da Antiguidade eram realizados em Olímpia?",
      options: ["A cada 4 anos", "A cada ano", "A cada 10 anos", "A cada 2 anos"],
      correctIndex: 0,
      explanation: "Os antigos Jogos Olímpicos eram realizados a cada quatro anos, um período conhecido como 'olimpíada'."
    },
    {
      id: 303,
      question: "O Teatro de Epidauro, famoso por sua acústica excepcional, era originalmente dedicado a qual tipo de atividade?",
      options: ["Apresentações teatrais e cerimônias religiosas", "Batalhas de gladiadores", "Corridas de cavalos", "Reuniões do senado"],
      correctIndex: 0,
      explanation: "O Teatro de Epidauro era usado principalmente para apresentações teatrais e cerimônias ligadas ao culto de Asclépio, deus da medicina."
    },
    {
      id: 304,
      question: "A Acrópole de Atenas, além do Parthenon, abriga outro templo dedicado a qual figura mitológica, com uma varanda sustentada por estátuas femininas?",
      options: ["O Erecteion, com suas cariátides", "O Templo de Nice", "O Propileu", "O Odeon de Herodes Ático"],
      correctIndex: 0,
      explanation: "O Erecteion é famoso por sua Varanda das Cariátides, onde colunas em formato de figuras femininas sustentam a estrutura."
    },
    {
      id: 305,
      question: "O que são as 'cariátides', presentes no Erecteion, na Acrópole de Atenas?",
      options: ["Colunas esculpidas em forma de figuras femininas", "Estátuas de guerreiros gregos", "Vasos cerimoniais de argila", "Portões decorativos de bronze"],
      correctIndex: 0,
      explanation: "Cariátides são colunas arquitetônicas esculpidas com a forma de figuras femininas, usadas como suporte estrutural decorativo."
    },
    {
      id: 306,
      question: "A cidade de Micenas, importante centro da civilização micênica, é associada a qual figura da mitologia/literatura grega, personagem da Guerra de Troia?",
      options: ["O rei Agamêmnon", "O herói Hércules", "O rei Minos", "O filósofo Sócrates"],
      correctIndex: 0,
      explanation: "Micenas é tradicionalmente associada ao rei Agamêmnon, líder dos gregos na Guerra de Troia segundo a Ilíada de Homero."
    },
    {
      id: 307,
      question: "O Portão dos Leões, uma das entradas mais famosas de sítios arqueológicos gregos, está localizado em qual cidade antiga?",
      options: ["Micenas", "Esparta", "Tebas", "Argos"],
      correctIndex: 0,
      explanation: "O Portão dos Leões é a entrada monumental da antiga cidadela de Micenas, decorada com um relevo de dois leões."
    },
    {
      id: 308,
      question: "A Ágora de Atenas, importante espaço público da cidade antiga, era usada principalmente para quê?",
      options: ["Comércio, política e vida social", "Apenas cerimônias religiosas", "Exclusivamente treinamento militar", "Sepultamento de líderes políticos"],
      correctIndex: 0,
      explanation: "A Ágora era o centro da vida pública ateniense, usada para comércio, debates políticos, filosofia e convivência social."
    },
    {
      id: 309,
      question: "A Torre dos Ventos, estrutura octogonal usada como uma espécie de relógio antigo, está localizada em qual cidade?",
      options: ["Atenas", "Esparta", "Tebas", "Corinto"],
      correctIndex: 0,
      explanation: "A Torre dos Ventos, na Ágora Romana de Atenas, funcionava como um relógio de sol e cata-vento, além de possuir um relógio d'água interno."
    },
    {
      id: 310,
      question: "O Templo de Apolo, principal santuário de Delfos, era dedicado a qual deus, associado à profecia e às artes?",
      options: ["Apolo", "Zeus", "Ares", "Hermes"],
      correctIndex: 0,
      explanation: "O templo principal de Delfos era dedicado a Apolo, deus grego associado à profecia, música e às artes."
    },
    {
      id: 311,
      question: "A cidade de Esparta, rival de Atenas na Grécia Antiga, era conhecida principalmente por sua ênfase em qual aspecto da sociedade?",
      options: ["Treinamento militar rigoroso", "Desenvolvimento das artes e filosofia", "Comércio marítimo extensivo", "Arquitetura monumental"],
      correctIndex: 0,
      explanation: "Esparta era famosa por sua sociedade fortemente militarizada, com ênfase no treinamento físico e disciplina desde a infância."
    },
    {
      id: 312,
      question: "O Farol de Alexandria, uma das Sete Maravilhas do Mundo Antigo, embora localizado no Egito, foi construído sob domínio de qual dinastia de origem grega?",
      options: ["A dinastia ptolomaica", "A dinastia dos Seleucidas", "A dinastia romana", "A dinastia otomana"],
      correctIndex: 0,
      explanation: "O Farol de Alexandria foi construído durante o reinado de Ptolomeu II, da dinastia ptolomaica, de origem grega, que governou o Egito após Alexandre, o Grande."
    },
    {
      id: 313,
      question: "O Estádio Panathinaiko, em Atenas, é conhecido por ter sediado quais Jogos Olímpicos modernos?",
      options: ["Os primeiros Jogos Olímpicos modernos, em 1896", "Os Jogos Olímpicos de 1960", "Os Jogos Olímpicos de 1936", "Os primeiros Jogos Paralímpicos"],
      correctIndex: 0,
      explanation: "O Estádio Panathinaiko, construído em mármore, sediou os primeiros Jogos Olímpicos da era moderna, em 1896."
    },
    {
      id: 314,
      question: "O Estádio Panathinaiko é notável por ser construído quase inteiramente em qual material?",
      options: ["Mármore", "Concreto armado", "Aço", "Madeira"],
      correctIndex: 0,
      explanation: "O estádio é uma reconstrução de um estádio antigo e é famoso por ser feito quase inteiramente de mármore branco."
    },
    {
      id: 315,
      question: "A ilha de Santorini, famosa por suas construções brancas e azuis, é resultado geológico de qual tipo de evento natural?",
      options: ["Uma grande erupção vulcânica na Antiguidade", "Um terremoto recente", "A erosão marinha ao longo de séculos", "O derretimento de uma geleira"],
      correctIndex: 0,
      explanation: "A formação atual da ilha de Santorini é resultado de uma das maiores erupções vulcânicas da história, ocorrida há milhares de anos."
    },
    {
      id: 316,
      question: "O Templo de Poseidon, no Cabo Sunion, era dedicado a qual deus grego, associado ao mar?",
      options: ["Poseidon", "Zeus", "Hades", "Apolo"],
      correctIndex: 0,
      explanation: "O templo no Cabo Sunion, com vista para o mar Egeu, era dedicado a Poseidon, deus grego dos mares e terremotos."
    },
    {
      id: 317,
      question: "A moderna cidade de Atenas leva o nome de qual deusa da mitologia grega?",
      options: ["Atena", "Afrodite", "Hera", "Ártemis"],
      correctIndex: 0,
      explanation: "Segundo o mito, a cidade recebeu o nome de Atena após a deusa vencer uma disputa com Poseidon pelo patrocínio da cidade."
    },
    {
      id: 318,
      question: "O Odeon de Herodes Ático, teatro ainda usado para espetáculos, está localizado na base de qual monumento em Atenas?",
      options: ["A Acrópole", "A Torre dos Ventos", "O Templo de Zeus Olímpico", "A Ágora Romana"],
      correctIndex: 0,
      explanation: "O Odeon de Herodes Ático foi construído na encosta sul da Acrópole de Atenas, no século II d.C."
    },
    {
      id: 319,
      question: "Rodes, ilha grega onde ficava o Colosso de Rodes, faz parte de qual grupo de ilhas gregas?",
      options: ["Dodecaneso", "Cíclades", "Ilhas Jônicas", "Espórades"],
      correctIndex: 0,
      explanation: "A ilha de Rodes faz parte do grupo de ilhas conhecido como Dodecaneso, no mar Egeu."
    },
    {
      id: 320,
      question: "O que caracteriza a 'ordem dórica', um dos estilos de coluna usados em templos gregos como o Parthenon?",
      options: ["Colunas robustas e sem base, com capitéis simples", "Colunas finas decoradas com folhas de acanto", "Colunas em espiral coloridas", "Colunas totalmente lisas sem sulcos verticais"],
      correctIndex: 0,
      explanation: "A ordem dórica é caracterizada por colunas robustas, sem base própria, e capitéis simples, sendo um dos três principais estilos clássicos gregos."
    },
    {
      id: 321,
      question: "Quais são as três principais ordens arquitetônicas clássicas da Grécia Antiga, usadas em templos como o Parthenon?",
      options: ["Dórica, jônica e coríntia", "Românica, gótica e barroca", "Bizantina, otomana e persa", "Micênica, minoica e cicládica"],
      correctIndex: 0,
      explanation: "As três ordens clássicas da arquitetura grega são a dórica, a jônica e a coríntia, diferenciadas principalmente pelo estilo das colunas."
    },
    {
      id: 322,
      question: "O mármore usado na construção do Parthenon veio principalmente de qual monte próximo a Atenas?",
      options: ["Monte Pentélico", "Monte Olimpo", "Monte Parnaso", "Monte Taigeto"],
      correctIndex: 0,
      explanation: "O mármore usado na construção do Parthenon foi extraído principalmente do Monte Pentélico, próximo a Atenas."
    },
    {
      id: 323,
      question: "O estadista ateniense Péricles teve papel fundamental em qual aspecto da construção do Parthenon?",
      options: ["Liderou o programa de construção que incluiu o templo", "Foi o escultor responsável pelas esculturas do frontão", "Financiou pessoalmente toda a obra com fortuna própria", "Serviu como arquiteto principal da obra"],
      correctIndex: 0,
      explanation: "Péricles liderou o ambicioso programa de reconstrução da Acrópole no século V a.C., que incluiu o Parthenon, embora o projeto arquitetônico tenha sido de Ictino e Calícrates."
    },
    {
      id: 324,
      question: "A Esfinge de Gizé, uma das estátuas mais famosas do mundo, tem corpo de qual animal e cabeça de quê?",
      options: ["Corpo de leão e cabeça humana", "Corpo de touro e cabeça de falcão", "Corpo de águia e cabeça de leão", "Corpo de serpente e cabeça humana"],
      correctIndex: 0,
      explanation: "A Esfinge de Gizé tem corpo de leão e cabeça humana, sendo uma das maiores esculturas monolíticas do mundo antigo."
    },
    {
      id: 325,
      question: "A Esfinge de Gizé é frequentemente associada, pelo rosto esculpido, a qual faraó egípcio?",
      options: ["Quéfren (Khafre)", "Tutancâmon", "Ramsés II", "Akhenaton"],
      correctIndex: 0,
      explanation: "Muitos egiptólogos associam o rosto da Esfinge ao faraó Quéfren, cuja pirâmide fica próxima ao monumento."
    },
    {
      id: 326,
      question: "As ruínas de Grande Zimbábue, importante sítio arqueológico africano, estão localizadas em qual país atual?",
      options: ["Zimbábue", "África do Sul", "Moçambique", "Zâmbia"],
      correctIndex: 0,
      explanation: "As ruínas de Grande Zimbábue ficam no país que leva o mesmo nome, no sul da África, e dão nome à nação moderna."
    },
    {
      id: 327,
      question: "Grande Zimbábue foi construída, entre os séculos XI e XV, por qual tipo de civilização?",
      options: ["Uma civilização africana bantu, com uma sociedade comercial próspera", "Colonizadores europeus", "Comerciantes árabes exclusivamente", "Uma civilização egípcia migrante"],
      correctIndex: 0,
      explanation: "Grande Zimbábue foi construída por povos bantu locais, que desenvolveram uma sociedade próspera baseada no comércio de ouro e marfim."
    },
    {
      id: 328,
      question: "As Igrejas Rupestres de Lalibela, esculpidas na rocha, estão localizadas em qual país africano?",
      options: ["Etiópia", "Quênia", "Sudão", "Tanzânia"],
      correctIndex: 0,
      explanation: "As famosas igrejas de Lalibela, esculpidas inteiramente na rocha, ficam na Etiópia e datam do século XII e XIII."
    },
    {
      id: 329,
      question: "As igrejas de Lalibela foram construídas, segundo a tradição etíope, sob ordem de qual rei?",
      options: ["O rei Lalibela", "O rei Salomão", "O imperador Haile Selassie", "O rei Ezana"],
      correctIndex: 0,
      explanation: "A tradição atribui a construção das igrejas ao rei Lalibela, que teria buscado criar uma 'Nova Jerusalém' na Etiópia."
    },
    {
      id: 330,
      question: "A Grande Mesquita de Djenné, considerada a maior estrutura de barro/adobe do mundo, está localizada em qual país?",
      options: ["Mali", "Nigéria", "Senegal", "Burkina Faso"],
      correctIndex: 0,
      explanation: "A Grande Mesquita de Djenné, no Mali, é reconhecida como a maior construção de barro do mundo."
    },
    {
      id: 331,
      question: "De que material principal é construída a Grande Mesquita de Djenné, no Mali?",
      options: ["Tijolos de barro secos ao sol (adobe)", "Blocos de granito", "Mármore importado", "Concreto armado"],
      correctIndex: 0,
      explanation: "A mesquita é construída com tijolos de barro secos ao sol, técnica tradicional da arquitetura sudano-saheliana."
    },
    {
      id: 332,
      question: "As Pirâmides de Meroé, menos conhecidas que as do Egito mas em maior número, estão localizadas em qual país?",
      options: ["Sudão", "Egito", "Etiópia", "Líbia"],
      correctIndex: 0,
      explanation: "As Pirâmides de Meroé ficam no Sudão e pertenceram ao antigo Reino de Kush, com mais de 200 pirâmides menores que as egípcias."
    },
    {
      id: 333,
      question: "O antigo Reino de Kush, responsável pelas pirâmides de Meroé, ficava localizado ao sul de qual civilização, com quem manteve contato próximo?",
      options: ["O antigo Egito", "O Império Romano", "A Pérsia Antiga", "A Babilônia"],
      correctIndex: 0,
      explanation: "O Reino de Kush desenvolveu-se ao sul do antigo Egito, com forte influência cultural e comercial entre as duas civilizações."
    },
    {
      id: 334,
      question: "O Castelo de Cape Coast, importante e triste marco histórico do comércio de pessoas escravizadas, está localizado em qual país?",
      options: ["Gana", "Nigéria", "Senegal", "Costa do Marfim"],
      correctIndex: 0,
      explanation: "O Castelo de Cape Coast, em Gana, foi um dos principais entrepostos usados no comércio transatlântico de pessoas escravizadas."
    },
    {
      id: 335,
      question: "A Ilha de Gorée, também associada à história do tráfico de pessoas escravizadas, está localizada próxima a qual capital africana?",
      options: ["Dakar, no Senegal", "Acra, em Gana", "Lagos, na Nigéria", "Abidjan, na Costa do Marfim"],
      correctIndex: 0,
      explanation: "A Ilha de Gorée fica próxima a Dakar, capital do Senegal, e é um importante memorial da história do tráfico transatlântico."
    },
    {
      id: 336,
      question: "As Pirâmides de Gizé, incluindo a Grande Pirâmide, estão localizadas em qual continente?",
      options: ["África", "Ásia", "Europa", "América do Sul"],
      correctIndex: 0,
      explanation: "O Egito, onde ficam as pirâmides de Gizé, está localizado no continente africano (a parte principal do país)."
    },
    {
      id: 337,
      question: "O Templo de Abu Simbel, com suas grandes estátuas esculpidas na rocha, foi construído para qual faraó egípcio?",
      options: ["Ramsés II", "Tutancâmon", "Quéops", "Akhenaton"],
      correctIndex: 0,
      explanation: "O Templo de Abu Simbel foi construído para homenagear o faraó Ramsés II, com quatro grandes estátuas suas na fachada."
    },
    {
      id: 338,
      question: "O que houve de excepcional na história recente do Templo de Abu Simbel, no século XX?",
      options: ["Foi transladado para um local mais alto, para não ser inundado por uma represa", "Foi descoberto pela primeira vez em 1968", "Foi reconstruído do zero após ser destruído por um terremoto", "Foi movido para um museu na Europa"],
      correctIndex: 0,
      explanation: "Na década de 1960, o templo foi cuidadosamente desmontado e remontado em local mais elevado, para escapar da inundação causada pela Represa de Assuã."
    },
    {
      id: 339,
      question: "O Vale dos Reis, importante necrópole onde vários faraós egípcios foram sepultados, incluindo Tutancâmon, está localizado próximo a qual cidade?",
      options: ["Luxor", "Cairo", "Alexandria", "Assuã"],
      correctIndex: 0,
      explanation: "O Vale dos Reis fica na margem oeste do rio Nilo, próximo à cidade de Luxor, no Egito."
    },
    {
      id: 340,
      question: "Os Templos de Karnak, um dos maiores complexos religiosos do mundo antigo, estão localizados em qual cidade egípcia?",
      options: ["Luxor", "Cairo", "Alexandria", "Assuã"],
      correctIndex: 0,
      explanation: "O complexo de Karnak, dedicado principalmente ao deus Amon, fica na cidade de Luxor, no Egito."
    },
    {
      id: 341,
      question: "As Ilhas de Robben, que abrigaram uma prisão histórica, ficam próximas a qual cidade sul-africana?",
      options: ["Cidade do Cabo", "Joanesburgo", "Durban", "Pretória"],
      correctIndex: 0,
      explanation: "A Ilha Robben, onde Nelson Mandela ficou preso por anos, fica próxima à Cidade do Cabo, na África do Sul."
    },
    {
      id: 342,
      question: "A Ilha Robben é hoje reconhecida mundialmente por ter sido prisão de qual importante líder político?",
      options: ["Nelson Mandela", "Kwame Nkrumah", "Jomo Kenyatta", "Julius Nyerere"],
      correctIndex: 0,
      explanation: "Nelson Mandela ficou preso na Ilha Robben por 18 dos 27 anos que passou encarcerado, antes de se tornar presidente da África do Sul."
    },
    {
      id: 343,
      question: "O Monte Kilimanjaro, ponto mais alto da África, está localizado em qual país?",
      options: ["Tanzânia", "Quênia", "Uganda", "Ruanda"],
      correctIndex: 0,
      explanation: "O Monte Kilimanjaro, um vulcão inativo, está localizado na Tanzânia e é o ponto mais alto do continente africano."
    },
    {
      id: 344,
      question: "As Cataratas Vitória, uma das maiores quedas d'água do mundo, ficam na fronteira entre quais dois países africanos?",
      options: ["Zâmbia e Zimbábue", "Quênia e Tanzânia", "África do Sul e Namíbia", "Egito e Sudão"],
      correctIndex: 0,
      explanation: "As Cataratas Vitória, no rio Zambeze, ficam na fronteira entre a Zâmbia e o Zimbábue."
    },
    {
      id: 345,
      question: "O nome local das Cataratas Vitória, que significa 'a fumaça que troveja', é:",
      options: ["Mosi-oa-Tunya", "Zambezi Falls", "Kariba Roar", "Nyasa Thunder"],
      correctIndex: 0,
      explanation: "O nome tradicional das cataratas na língua local é Mosi-oa-Tunya, que significa 'a fumaça que troveja'."
    },
    {
      id: 346,
      question: "A antiga cidade de Cartago, importante centro comercial da Antiguidade, ficava localizada no que hoje é qual país?",
      options: ["Tunísia", "Argélia", "Marrocos", "Líbia"],
      correctIndex: 0,
      explanation: "Cartago, rival histórica de Roma, ficava próxima à atual cidade de Túnis, capital da Tunísia."
    },
    {
      id: 347,
      question: "A cidade de Cartago foi, segundo a tradição, fundada por qual povo antigo do Mediterrâneo?",
      options: ["Os fenícios", "Os gregos", "Os romanos", "Os persas"],
      correctIndex: 0,
      explanation: "Cartago foi fundada por colonizadores fenícios, vindos da região da atual Líbano, por volta do século IX a.C."
    },
    {
      id: 348,
      question: "A Medina de Fez, um dos maiores centros urbanos históricos preservados do mundo, está localizada em qual país?",
      options: ["Marrocos", "Argélia", "Tunísia", "Egito"],
      correctIndex: 0,
      explanation: "A Medina de Fez, com sua intrincada rede de ruelas medievais, fica no Marrocos e é Patrimônio Mundial da UNESCO."
    },
    {
      id: 349,
      question: "O que caracteriza uma 'medina', termo usado para os centros históricos de várias cidades do Norte da África?",
      options: ["A parte antiga e murada de uma cidade, com ruas estreitas", "Um tipo de mesquita específica", "Um mercado exclusivamente ao ar livre", "Um palácio real fortificado"],
      correctIndex: 0,
      explanation: "Uma medina é o bairro histórico e geralmente murado de cidades no Norte da África e Oriente Médio, marcado por ruas estreitas e sinuosas."
    },
    {
      id: 350,
      question: "O Templo de Filae, dedicado à deusa Ísis, também foi transladado para escapar da inundação de uma represa egípcia. Isso ocorreu em qual rio?",
      options: ["Rio Nilo", "Rio Congo", "Rio Níger", "Rio Zambeze"],
      correctIndex: 0,
      explanation: "Assim como Abu Simbel, o Templo de Filae foi transladado para uma ilha próxima para escapar das águas represadas do rio Nilo."
    },
    {
      id: 351,
      question: "A civilização do Antigo Egito se desenvolveu principalmente ao longo de qual rio?",
      options: ["Rio Nilo", "Rio Congo", "Rio Níger", "Rio Volta"],
      correctIndex: 0,
      explanation: "O Antigo Egito floresceu ao longo do rio Nilo, cujas cheias anuais fertilizavam as terras usadas para agricultura."
    },
    {
      id: 352,
      question: "O Deserto do Saara, onde estão localizadas várias rotas históricas de caravanas comerciais, é o maior deserto de qual tipo no mundo?",
      options: ["O maior deserto quente do mundo", "O maior deserto frio do mundo", "O único deserto da África", "O menor deserto do continente africano"],
      correctIndex: 0,
      explanation: "O Saara é o maior deserto quente do mundo, tendo sido historicamente cruzado por importantes rotas de caravanas comerciais."
    },
    {
      id: 353,
      question: "A cidade histórica de Timbuktu, importante centro de comércio e conhecimento islâmico medieval, está localizada em qual país?",
      options: ["Mali", "Níger", "Chade", "Mauritânia"],
      correctIndex: 0,
      explanation: "Timbuktu, no Mali, foi um dos mais importantes centros de comércio, cultura e ensino islâmico durante a Idade Média."
    },
    {
      id: 354,
      question: "Timbuktu era famosa, na Idade Média, por abrigar um grande número de quê, atraindo estudiosos de várias regiões?",
      options: ["Manuscritos antigos e bibliotecas islâmicas", "Templos budistas", "Catedrais católicas", "Fábricas de tecelagem"],
      correctIndex: 0,
      explanation: "A cidade abrigava importantes bibliotecas com milhares de manuscritos antigos sobre ciência, religião e direito islâmico."
    },
    {
      id: 355,
      question: "O Complexo Funerário de Djoser, que abriga a Pirâmide de Degraus, é considerado o precursor de qual tipo de construção egípcia?",
      options: ["As pirâmides egípcias posteriores, como a de Gizé", "Os templos gregos", "As catedrais medievais", "Os zigurates da Mesopotâmia"],
      correctIndex: 0,
      explanation: "A Pirâmide de Degraus de Djoser, em Saqqara, é considerada a precursora das pirâmides egípcias de faces lisas construídas posteriormente, como as de Gizé."
    },
    {
      id: 356,
      question: "Quem foi o arquiteto egípcio tradicionalmente associado ao projeto da Pirâmide de Degraus de Djoser?",
      options: ["Imhotep", "Hemiunu", "Senemut", "Ineni"],
      correctIndex: 0,
      explanation: "Imhotep, importante figura da história egípcia, é tradicionalmente creditado como o arquiteto responsável pela Pirâmide de Degraus."
    },
    {
      id: 357,
      question: "A Grande Esfinge de Gizé é esculpida principalmente a partir de qual tipo de rocha natural?",
      options: ["Um afloramento de calcário natural", "Blocos de granito transportados", "Mármore importado", "Arenito vermelho"],
      correctIndex: 0,
      explanation: "A Esfinge foi esculpida diretamente de um grande afloramento de calcário natural presente no platô de Gizé."
    },
    {
      id: 358,
      question: "A Torre Eiffel, símbolo de Paris, foi construída para qual evento internacional?",
      options: ["A Exposição Universal de 1889", "As Olimpíadas de 1900", "O centenário da Revolução Francesa isoladamente, sem exposição", "A coroação de Napoleão III"],
      correctIndex: 0,
      explanation: "A Torre Eiffel foi construída como o arco de entrada para a Exposição Universal de 1889, que também celebrava o centenário da Revolução Francesa."
    },
    {
      id: 359,
      question: "Quem foi o engenheiro que dá nome à Torre Eiffel, responsável pela empresa que a projetou e construiu?",
      options: ["Gustave Eiffel", "Auguste Perret", "Le Corbusier", "Georges-Eugène Haussmann"],
      correctIndex: 0,
      explanation: "A torre leva o nome do engenheiro Gustave Eiffel, cuja empresa venceu o concurso para o projeto."
    },
    {
      id: 360,
      question: "Originalmente, a Torre Eiffel foi muito criticada por artistas e intelectuais parisienses. O que estava planejado para ela após 20 anos?",
      options: ["Ser desmontada", "Ser pintada de dourado", "Ser transformada em museu de arte", "Ser vendida para outro país"],
      correctIndex: 0,
      explanation: "A torre tinha permissão temporária e estava planejada para ser desmontada 20 anos após sua construção, mas foi mantida por sua utilidade em telecomunicações."
    },
    {
      id: 361,
      question: "O Coliseu de Roma e outros monumentos históricos da cidade estão localizados em qual país europeu?",
      options: ["Itália", "Espanha", "Grécia", "Portugal"],
      correctIndex: 0,
      explanation: "Roma, com o Coliseu e diversos outros monumentos antigos, é a capital da Itália."
    },
    {
      id: 362,
      question: "A Torre de Pisa, famosa por sua inclinação, está localizada em qual cidade italiana?",
      options: ["Pisa", "Florença", "Veneza", "Milão"],
      correctIndex: 0,
      explanation: "A Torre de Pisa, oficialmente o campanário da catedral local, fica na cidade de Pisa, na região da Toscana."
    },
    {
      id: 363,
      question: "O que causou a famosa inclinação da Torre de Pisa?",
      options: ["Um solo instável e desigual sob a fundação", "Um terremoto histórico", "Um erro proposital do arquiteto para criar um efeito visual", "Bombardeios durante uma guerra"],
      correctIndex: 0,
      explanation: "A inclinação começou já durante a construção, causada por um solo macio e desigual que não sustentava adequadamente a fundação."
    },
    {
      id: 364,
      question: "A cidade de Veneza, conhecida por seus canais, está construída sobre uma série de quê?",
      options: ["Pequenas ilhas em uma lagoa", "Uma única grande rocha", "Um antigo vulcão extinto", "Colunas de concreto no oceano aberto"],
      correctIndex: 0,
      explanation: "Veneza foi construída sobre um arquipélago de pequenas ilhas dentro de uma lagoa, conectadas por canais e pontes."
    },
    {
      id: 365,
      question: "A Sagrada Família, famosa igreja ainda em construção, está localizada em qual cidade espanhola?",
      options: ["Barcelona", "Madri", "Sevilha", "Valência"],
      correctIndex: 0,
      explanation: "A Sagrada Família fica em Barcelona e é uma das obras mais famosas do arquiteto Antoni Gaudí."
    },
    {
      id: 366,
      question: "Quem foi o arquiteto responsável pelo projeto original da Sagrada Família?",
      options: ["Antoni Gaudí", "Rafael Moneo", "Santiago Calatrava", "Frank Gehry"],
      correctIndex: 0,
      explanation: "A Sagrada Família é a obra-prima inacabada do arquiteto catalão Antoni Gaudí, que dedicou décadas ao projeto."
    },
    {
      id: 367,
      question: "Por que a construção da Sagrada Família, iniciada em 1882, ainda não foi concluída até hoje?",
      options: ["É financiada apenas por doações privadas e ingressos, sem prazo fixo definido originalmente", "Foi abandonada por décadas e retomada recentemente", "Está proibida de ser concluída por lei", "Falta o projeto arquitetônico completo, que se perdeu"],
      correctIndex: 0,
      explanation: "A construção sempre dependeu principalmente de doações privadas e, mais recentemente, da venda de ingressos, o que tornou o processo extremamente longo."
    },
    {
      id: 368,
      question: "O Big Ben, famoso relógio associado ao Parlamento britânico, está localizado em qual cidade?",
      options: ["Londres", "Manchester", "Edimburgo", "Liverpool"],
      correctIndex: 0,
      explanation: "O Big Ben fica junto ao Palácio de Westminster, sede do Parlamento britânico, em Londres."
    },
    {
      id: 369,
      question: "Tecnicamente, o nome 'Big Ben' se refere a quê, e não à torre inteira, como muitos acreditam?",
      options: ["Ao grande sino dentro da torre", "Ao relógio como um todo", "Ao arquiteto que projetou a torre", "À bandeira no topo da torre"],
      correctIndex: 0,
      explanation: "Originalmente, 'Big Ben' é o apelido do grande sino dentro da torre, embora popularmente o nome seja usado para toda a estrutura."
    },
    {
      id: 370,
      question: "Stonehenge, o famoso monumento pré-histórico de grandes pedras, está localizado em qual país?",
      options: ["Inglaterra", "Irlanda", "Escócia", "País de Gales"],
      correctIndex: 0,
      explanation: "Stonehenge está localizado na planície de Salisbury, no sul da Inglaterra."
    },
    {
      id: 371,
      question: "Qual é a principal característica de Stonehenge que intriga arqueólogos até hoje?",
      options: ["Como grandes pedras foram transportadas e erguidas há milhares de anos", "Sua localização subterrânea", "O fato de ter sido construído em apenas um dia", "Ser feito inteiramente de metal"],
      correctIndex: 0,
      explanation: "Os métodos usados para transportar e erguer as enormes pedras, algumas vindas de dezenas de quilômetros de distância, ainda intrigam pesquisadores."
    },
    {
      id: 372,
      question: "O Coliseu de Roma foi construído principalmente com qual material de construção?",
      options: ["Concreto e pedra travertino", "Mármore maciço", "Tijolos de barro cru", "Madeira reforçada com ferro"],
      correctIndex: 0,
      explanation: "O Coliseu foi construído principalmente com concreto romano e blocos de pedra travertino, técnica avançada para a época."
    },
    {
      id: 373,
      question: "A Fontana di Trevi, famosa fonte onde turistas jogam moedas, está localizada em qual cidade?",
      options: ["Roma", "Florença", "Nápoles", "Milão"],
      correctIndex: 0,
      explanation: "A Fontana di Trevi é uma das fontes mais famosas do mundo, localizada no centro de Roma."
    },
    {
      id: 374,
      question: "Segundo a tradição popular, o que acontece quando alguém joga uma moeda na Fontana di Trevi, de costas?",
      options: ["A pessoa garante que um dia voltará a Roma", "A pessoa terá sorte no amor pelo resto da vida", "A pessoa se tornará rica", "A pessoa terá boa saúde por um ano"],
      correctIndex: 0,
      explanation: "A tradição diz que jogar uma moeda de costas na fonte garante que a pessoa retornará a Roma no futuro."
    },
    {
      id: 375,
      question: "O Museu do Louvre, um dos maiores museus de arte do mundo, está localizado em qual cidade?",
      options: ["Paris", "Londres", "Roma", "Madri"],
      correctIndex: 0,
      explanation: "O Louvre, que abriga obras como a Mona Lisa, está localizado no centro de Paris, na França."
    },
    {
      id: 376,
      question: "A pirâmide de vidro na entrada do Museu do Louvre foi projetada por qual arquiteto?",
      options: ["I. M. Pei", "Le Corbusier", "Jean Nouvel", "Renzo Piano"],
      correctIndex: 0,
      explanation: "A famosa pirâmide de vidro do Louvre foi projetada pelo arquiteto sino-americano I. M. Pei, inaugurada em 1989."
    },
    {
      id: 377,
      question: "A Acrópole à parte, a Catedral de Notre-Dame, importante marco gótico, está localizada em qual cidade?",
      options: ["Paris", "Reims", "Chartres", "Estrasburgo"],
      correctIndex: 0,
      explanation: "A Catedral de Notre-Dame, um dos exemplos mais famosos da arquitetura gótica, fica no centro histórico de Paris, na Ilha da Cité."
    },
    {
      id: 378,
      question: "Em 2019, a Catedral de Notre-Dame de Paris sofreu qual grave incidente, que danificou parte de sua estrutura?",
      options: ["Um grande incêndio", "Um terremoto", "Uma inundação do rio Sena", "Um ataque de vandalismo com explosivos"],
      correctIndex: 0,
      explanation: "Em abril de 2019, um grande incêndio destruiu boa parte do telhado e a torre central (flèche) da catedral, que passou por extenso trabalho de restauração."
    },
    {
      id: 379,
      question: "O Coliseu de Verona, um dos anfiteatros romanos mais bem preservados, ainda é usado atualmente para qual finalidade?",
      options: ["Espetáculos de ópera ao ar livre", "Corridas de cavalos", "Sede de tribunais", "Estádio de futebol"],
      correctIndex: 0,
      explanation: "A Arena de Verona é famosa por sediar até hoje grandes produções de ópera ao ar livre durante os meses de verão."
    },
    {
      id: 380,
      question: "O Castelo de Neuschwanstein, que inspirou castelos de contos de fadas modernos, está localizado em qual país?",
      options: ["Alemanha", "Áustria", "Suíça", "França"],
      correctIndex: 0,
      explanation: "O Castelo de Neuschwanstein fica na Baviera, sul da Alemanha, e foi construído no século XIX por ordem do rei Ludwig II."
    },
    {
      id: 381,
      question: "O Castelo de Neuschwanstein é famoso por ter servido de inspiração para qual castelo de um parque temático famoso?",
      options: ["O Castelo da Cinderela, da Disney", "O Castelo de Hogwarts, de Harry Potter", "O castelo do filme Shrek", "O castelo de Frozen"],
      correctIndex: 0,
      explanation: "Neuschwanstein é frequentemente citado como uma das principais inspirações para o Castelo da Cinderela, ícone dos parques da Disney."
    },
    {
      id: 382,
      question: "O Portão de Brandemburgo, importante símbolo histórico alemão, está localizado em qual cidade?",
      options: ["Berlim", "Munique", "Frankfurt", "Hamburgo"],
      correctIndex: 0,
      explanation: "O Portão de Brandemburgo, antigo marco da divisão entre Berlim Oriental e Ocidental, fica no centro de Berlim."
    },
    {
      id: 383,
      question: "O Portão de Brandemburgo se tornou um símbolo de qual evento histórico importante, ocorrido em 1989?",
      options: ["A queda do Muro de Berlim", "A reunificação da Alemanha Nazista", "O início da Guerra Fria", "A fundação da União Europeia"],
      correctIndex: 0,
      explanation: "O portão tornou-se um símbolo da queda do Muro de Berlim em 1989 e, posteriormente, da reunificação alemã."
    },
    {
      id: 384,
      question: "O Vaticano, menor Estado soberano do mundo, abriga qual famosa basílica?",
      options: ["A Basílica de São Pedro", "A Basílica de Notre-Dame", "A Basílica de São Marcos", "A Basílica de Santa Sofia"],
      correctIndex: 0,
      explanation: "A Basílica de São Pedro, uma das maiores igrejas do mundo, é o principal templo do Vaticano."
    },
    {
      id: 385,
      question: "Quem foi o principal arquiteto responsável pela icônica cúpula da Basílica de São Pedro, no Vaticano?",
      options: ["Michelangelo", "Bramante", "Bernini", "Rafael"],
      correctIndex: 0,
      explanation: "Michelangelo assumiu o projeto da cúpula da Basílica de São Pedro, embora ela só tenha sido concluída após sua morte."
    },
    {
      id: 386,
      question: "A Capela Sistina, com afrescos de Michelangelo, incluindo 'A Criação de Adão', está localizada em qual complexo?",
      options: ["O Vaticano", "O Louvre", "A Torre de Londres", "O Palácio de Versalhes"],
      correctIndex: 0,
      explanation: "A Capela Sistina fica dentro dos Museus do Vaticano, decorada com afrescos de Michelangelo no teto e em outras paredes."
    },
    {
      id: 387,
      question: "O Palácio de Versalhes, símbolo do poder da monarquia francesa, foi expandido principalmente por qual rei?",
      options: ["Luís XIV", "Luís XVI", "Napoleão Bonaparte", "Henrique IV"],
      correctIndex: 0,
      explanation: "O Palácio de Versalhes foi expandido e transformado na grandiosa residência real por Luís XIV, o 'Rei Sol'."
    },
    {
      id: 388,
      question: "O famoso Salão dos Espelhos, no Palácio de Versalhes, é conhecido historicamente por ter sediado qual evento após a Primeira Guerra Mundial?",
      options: ["A assinatura do Tratado de Versalhes", "A coroação de Napoleão", "A Revolução Francesa", "A abdicação de Luís XVI"],
      correctIndex: 0,
      explanation: "O Tratado de Versalhes, que oficializou o fim da Primeira Guerra Mundial, foi assinado no Salão dos Espelhos em 1919."
    },
    {
      id: 389,
      question: "A Torre de Londres, antiga fortaleza real, é hoje conhecida por abrigar qual importante coleção?",
      options: ["As Joias da Coroa britânica", "A maior coleção de arte moderna do Reino Unido", "Documentos históricos do Parlamento", "Uma coleção de armaduras medievais exclusivamente"],
      correctIndex: 0,
      explanation: "A Torre de Londres abriga as Joias da Coroa britânica, além de ter servido historicamente como prisão e fortaleza real."
    },
    {
      id: 390,
      question: "O Palácio de Buckingham, residência oficial da monarquia britânica, está localizado em qual cidade?",
      options: ["Londres", "Edimburgo", "Windsor", "Liverpool"],
      correctIndex: 0,
      explanation: "O Palácio de Buckingham, residência oficial dos monarcas britânicos, fica em Londres."
    },
    {
      id: 391,
      question: "A cerimônia da Troca da Guarda, tradição turística famosa, ocorre em qual monumento britânico?",
      options: ["O Palácio de Buckingham", "A Torre de Londres", "O Big Ben", "A Abadia de Westminster"],
      correctIndex: 0,
      explanation: "A tradicional cerimônia de Troca da Guarda ocorre nos portões do Palácio de Buckingham."
    },
    {
      id: 392,
      question: "A Abadia de Westminster, importante igreja histórica britânica, é tradicionalmente usada para qual tipo de cerimônia real?",
      options: ["Coroações e casamentos reais", "Apenas funerais de plebeus", "Reuniões do gabinete", "Sessões do tribunal supremo"],
      correctIndex: 0,
      explanation: "A Abadia de Westminster é tradicionalmente o local de coroações reais britânicas e de importantes casamentos e funerais da família real."
    },
    {
      id: 393,
      question: "O Muro de Berlim, que dividiu a cidade durante a Guerra Fria, foi derrubado em qual ano?",
      options: ["1989", "1991", "1961", "2000"],
      correctIndex: 0,
      explanation: "O Muro de Berlim, erguido em 1961, foi derrubado em novembro de 1989, marcando o fim da divisão da cidade."
    },
    {
      id: 394,
      question: "O Castelo de Praga, um dos maiores complexos de castelo do mundo, está localizado em qual país?",
      options: ["República Tcheca", "Áustria", "Polônia", "Eslováquia"],
      correctIndex: 0,
      explanation: "O Castelo de Praga, na República Tcheca, é considerado um dos maiores complexos castelares antigos do mundo."
    },
    {
      id: 395,
      question: "A Ponte Carlos, famosa ponte histórica decorada com estátuas, está localizada em qual cidade?",
      options: ["Praga", "Viena", "Budapeste", "Varsóvia"],
      correctIndex: 0,
      explanation: "A Ponte Carlos atravessa o rio Vltava em Praga e é decorada com uma série de estátuas de santos católicos."
    },
    {
      id: 396,
      question: "O Coliseu de Roma foi usado durante séculos, após deixar de sediar espetáculos, para diferentes fins. Qual destes é verdadeiro?",
      options: ["Serviu como pedreira, com pedras retiradas para outras construções", "Foi transformado em uma catedral por 500 anos", "Foi usado como palácio real bizantino", "Serviu de sede do governo romano medieval"],
      correctIndex: 0,
      explanation: "Durante a Idade Média e o Renascimento, muitas pedras do Coliseu foram retiradas e reaproveitadas na construção de outros edifícios romanos."
    },
    {
      id: 397,
      question: "A Basílica de Santa Sofia, importante monumento histórico que já foi igreja, mesquita e museu, está localizada em qual cidade?",
      options: ["Istambul", "Atenas", "Roma", "Moscou"],
      correctIndex: 0,
      explanation: "A Santa Sofia, em Istambul (Turquia), teve usos variados ao longo da história, refletindo as mudanças políticas e religiosas da região."
    },
    {
      id: 398,
      question: "A Basílica de Santa Sofia foi originalmente construída durante qual império?",
      options: ["O Império Bizantino", "O Império Romano Ocidental", "O Império Otomano, desde o início", "O Império Persa"],
      correctIndex: 0,
      explanation: "A Santa Sofia foi construída no século VI, durante o Império Bizantino, sob o imperador Justiniano I."
    },
    {
      id: 399,
      question: "O Coliseu, o Big Ben e a Torre Eiffel têm em comum o fato de estarem localizados em qual continente?",
      options: ["Europa", "Ásia", "África", "América do Sul"],
      correctIndex: 0,
      explanation: "Itália, Reino Unido e França estão localizados no continente europeu."
    },
    {
      id: 400,
      question: "A Alhambra, complexo de palácios mouriscos, está localizada em qual cidade espanhola?",
      options: ["Granada", "Sevilha", "Córdoba", "Toledo"],
      correctIndex: 0,
      explanation: "A Alhambra, um dos exemplos mais notáveis da arquitetura islâmica na Europa, fica em Granada, na Espanha."
    },
    {
      id: 401,
      question: "A Alhambra foi construída principalmente durante qual período histórico da Espanha?",
      options: ["O período de domínio muçulmano (mouro) na Península Ibérica", "O período romano", "A era da Inquisição Espanhola", "O reinado de Carlos V isoladamente"],
      correctIndex: 0,
      explanation: "A maior parte da Alhambra foi construída durante o período de domínio mouro, principalmente sob a dinastia Nasrida, entre os séculos XIII e XV."
    },
    {
      id: 402,
      question: "A Mesquita-Catedral de Córdoba é um exemplo notável de qual tipo de transformação arquitetônica ao longo da história?",
      options: ["Uma mesquita que foi transformada em catedral católica", "Uma catedral que virou mesquita e depois voltou a ser catedral", "Um templo romano transformado em sinagoga", "Um castelo transformado em universidade"],
      correctIndex: 0,
      explanation: "A estrutura foi originalmente construída como mesquita no período mouro e, após a reconquista cristã, uma catedral foi erguida em seu interior."
    },
    {
      id: 403,
      question: "O Vale do Reno, na Alemanha, é famoso por reunir uma grande quantidade de qual tipo de construção medieval, ao longo do rio?",
      options: ["Castelos medievais", "Catedrais góticas exclusivamente", "Moinhos de vento", "Fortalezas romanas"],
      correctIndex: 0,
      explanation: "O trecho do Vale do Reno entre Coblença e Bingen é famoso por abrigar dezenas de castelos medievais ao longo das margens do rio."
    },
    {
      id: 404,
      question: "A Torre de Belém, importante monumento histórico português, está localizada em qual cidade?",
      options: ["Lisboa", "Porto", "Coimbra", "Faro"],
      correctIndex: 0,
      explanation: "A Torre de Belém, construída no início do século XVI, fica às margens do rio Tejo, em Lisboa."
    },
    {
      id: 405,
      question: "A Torre de Belém foi construída durante qual período de grande expansão marítima portuguesa?",
      options: ["A Era dos Descobrimentos", "A Revolução Industrial", "O período romano na Ibéria", "A Reconquista cristã"],
      correctIndex: 0,
      explanation: "A torre foi erguida durante a Era dos Descobrimentos, período de grande expansão marítima e comercial de Portugal."
    },
    {
      id: 406,
      question: "O Mosteiro dos Jerónimos, em Lisboa, foi construído com recursos obtidos principalmente de qual atividade comercial?",
      options: ["O comércio de especiarias vindas do Oriente", "A mineração de ouro no Brasil", "O comércio de lã com a Inglaterra", "A pesca do bacalhau"],
      correctIndex: 0,
      explanation: "O Mosteiro dos Jerónimos foi financiado principalmente pelos lucros do lucrativo comércio de especiarias trazidas do Oriente pelas navegações portuguesas."
    },
    {
      id: 407,
      question: "A Praça Vermelha, um dos espaços públicos mais famosos do mundo, está localizada em qual cidade?",
      options: ["Moscou", "São Petersburgo", "Kiev (Ucrânia)", "Varsóvia"],
      correctIndex: 0,
      explanation: "A Praça Vermelha, cercada pelo Kremlin e pela Catedral de São Basílio, fica no centro de Moscou."
    },
    {
      id: 408,
      question: "O Estreito de Bósforo, importante via marítima, atravessa qual cidade que liga simbolicamente a Europa e a Ásia?",
      options: ["Istambul", "Atenas", "Alexandria", "Odessa"],
      correctIndex: 0,
      explanation: "Istambul é dividida pelo Estreito de Bósforo, sendo uma das poucas cidades do mundo situadas em dois continentes: Europa e Ásia."
    },
    {
      id: 409,
      question: "O Palácio de Topkapi, antiga residência dos sultões otomanos, está localizado em qual cidade?",
      options: ["Istambul", "Ancara", "Izmir", "Bursa"],
      correctIndex: 0,
      explanation: "O Palácio de Topkapi foi a principal residência dos sultões do Império Otomano por quase 400 anos, em Istambul."
    },
    {
      id: 410,
      question: "A Capela do Rosário e a região histórica de Cappadocia, com suas formações rochosas e igrejas subterrâneas, está localizada em qual país?",
      options: ["Turquia", "Grécia", "Armênia", "Geórgia"],
      correctIndex: 0,
      explanation: "A região da Capadócia, com suas formações rochosas únicas e cidades subterrâneas históricas, fica na Turquia."
    },
    {
      id: 411,
      question: "As 'cidades subterrâneas' da região da Capadócia, na Turquia, foram originalmente escavadas com qual propósito principal?",
      options: ["Servir de abrigo e proteção contra invasores", "Servir de tumbas reais", "Armazenar grãos exclusivamente", "Funcionar como minas de sal"],
      correctIndex: 0,
      explanation: "As cidades subterrâneas da Capadócia foram escavadas principalmente para servir de abrigo seguro contra invasões ao longo da história."
    },
    {
      id: 412,
      question: "O Coliseu, a Torre Eiffel e a Sagrada Família têm em comum o fato de serem, cada um em seu país, monumentos que atraem qual tipo de grande fluxo anual?",
      options: ["Milhões de turistas por ano", "Apenas peregrinos religiosos", "Somente estudantes de arquitetura", "Exclusivamente delegações diplomáticas"],
      correctIndex: 0,
      explanation: "Esses três monumentos estão entre os pontos turísticos mais visitados do mundo, recebendo milhões de visitantes anualmente."
    },
    {
      id: 413,
      question: "O Monte Saint-Michel, ilha-abadia cercada por marés, está localizado em qual país?",
      options: ["França", "Reino Unido", "Irlanda", "Bélgica"],
      correctIndex: 0,
      explanation: "O Mont Saint-Michel é uma ilha-comuna na costa da Normandia, na França, famosa por sua abadia medieval e marés extremas."
    },
    {
      id: 414,
      question: "O que torna o Monte Saint-Michel um fenômeno natural notável, além de seu valor histórico?",
      options: ["As marés na região estão entre as mais fortes da Europa", "Fica no topo de um vulcão ativo", "É a única ilha flutuante do mundo", "Muda de tamanho de acordo com as estações"],
      correctIndex: 0,
      explanation: "A região do Monte Saint-Michel tem uma das maiores amplitudes de maré da Europa, o que historicamente isolava a ilha em determinados horários."
    },
    {
      id: 415,
      question: "A Catedral de Colônia, um dos maiores exemplos de arquitetura gótica do mundo, está localizada em qual país?",
      options: ["Alemanha", "Bélgica", "Holanda", "Suíça"],
      correctIndex: 0,
      explanation: "A Catedral de Colônia, com suas torres imponentes, é um dos marcos góticos mais importantes da Alemanha."
    },
    {
      id: 416,
      question: "Quanto tempo, aproximadamente, levou para concluir a construção da Catedral de Colônia, incluindo interrupções ao longo dos séculos?",
      options: ["Mais de 600 anos", "Cerca de 10 anos", "Cerca de 50 anos", "Menos de 5 anos"],
      correctIndex: 0,
      explanation: "Iniciada em 1248, a construção da catedral foi interrompida por séculos e só foi finalmente concluída em 1880."
    },
    {
      id: 417,
      question: "A Estátua da Liberdade, presente dos franceses aos Estados Unidos, está localizada em qual cidade?",
      options: ["Nova York", "Washington D.C.", "Boston", "Filadélfia"],
      correctIndex: 0,
      explanation: "A Estátua da Liberdade fica na Ilha da Liberdade, na baía de Nova York."
    },
    {
      id: 418,
      question: "A Estátua da Liberdade foi um presente de qual país aos Estados Unidos?",
      options: ["França", "Reino Unido", "Espanha", "Holanda"],
      correctIndex: 0,
      explanation: "A estátua foi um presente do povo francês aos Estados Unidos, em comemoração à amizade entre os dois países, inaugurada em 1886."
    },
    {
      id: 419,
      question: "Quem foi o escultor francês responsável pela criação da Estátua da Liberdade?",
      options: ["Frédéric Auguste Bartholdi", "Auguste Rodin", "Gustave Eiffel (apenas a estrutura interna)", "Claude Monet"],
      correctIndex: 0,
      explanation: "A estátua foi esculpida por Frédéric Auguste Bartholdi, enquanto Gustave Eiffel projetou a estrutura interna de suporte."
    },
    {
      id: 420,
      question: "O Monte Rushmore, com os rostos esculpidos de quatro presidentes americanos, está localizado em qual estado?",
      options: ["Dakota do Sul", "Wyoming", "Montana", "Colorado"],
      correctIndex: 0,
      explanation: "O Monte Rushmore está localizado no estado de Dakota do Sul, nos Estados Unidos."
    },
    {
      id: 421,
      question: "Quais quatro presidentes dos Estados Unidos estão esculpidos no Monte Rushmore?",
      options: ["Washington, Jefferson, Roosevelt e Lincoln", "Adams, Madison, Monroe e Jackson", "Kennedy, Reagan, Obama e Trump", "Franklin, Hamilton, Grant e Wilson"],
      correctIndex: 0,
      explanation: "O monumento retrata os presidentes George Washington, Thomas Jefferson, Theodore Roosevelt e Abraham Lincoln."
    },
    {
      id: 422,
      question: "A Ponte Golden Gate, um dos marcos mais reconhecíveis dos Estados Unidos, está localizada em qual cidade?",
      options: ["São Francisco", "Los Angeles", "Seattle", "Portland"],
      correctIndex: 0,
      explanation: "A Golden Gate Bridge cruza o estreito de mesmo nome na entrada da baía de São Francisco."
    },
    {
      id: 423,
      question: "Qual é a cor característica da Ponte Golden Gate, escolhida especificamente para se destacar na neblina da região?",
      options: ["Laranja internacional", "Vermelho vivo", "Azul marinho", "Amarelo dourado"],
      correctIndex: 0,
      explanation: "A ponte é pintada na cor 'laranja internacional', escolhida por se destacar tanto na neblina comum da região quanto contra o céu e o mar."
    },
    {
      id: 424,
      question: "A Casa Branca, residência oficial do presidente dos Estados Unidos, está localizada em qual cidade?",
      options: ["Washington D.C.", "Nova York", "Boston", "Chicago"],
      correctIndex: 0,
      explanation: "A Casa Branca fica em Washington D.C., capital dos Estados Unidos."
    },
    {
      id: 425,
      question: "Chichén Itzá e outros importantes sítios maias estão localizados principalmente em qual país, além de partes da Guatemala e Belize?",
      options: ["México", "Colômbia", "Peru", "Equador"],
      correctIndex: 0,
      explanation: "Grande parte dos sítios da antiga civilização maia, incluindo Chichén Itzá, está localizada no México, especialmente na península de Yucatán."
    },
    {
      id: 426,
      question: "As Linhas de Nazca, enormes geoglifos visíveis do alto, estão localizadas em qual país?",
      options: ["Peru", "Bolívia", "Chile", "Equador"],
      correctIndex: 0,
      explanation: "As Linhas de Nazca são gigantescos desenhos traçados no solo do deserto, localizados no Peru."
    },
    {
      id: 427,
      question: "As Linhas de Nazca representam, entre outras figuras, quais tipos de imagens?",
      options: ["Animais, plantas e formas geométricas", "Apenas rostos humanos", "Exclusivamente símbolos religiosos cristãos", "Mapas de constelações modernas"],
      correctIndex: 0,
      explanation: "As linhas formam figuras de animais (como um macaco e um beija-flor), plantas e formas geométricas, visíveis principalmente do ar."
    },
    {
      id: 428,
      question: "A cidade de Cusco, antiga capital do Império Inca, está localizada em qual país?",
      options: ["Peru", "Bolívia", "Equador", "Colômbia"],
      correctIndex: 0,
      explanation: "Cusco foi a capital do Império Inca e está localizada nos Andes peruanos."
    },
    {
      id: 429,
      question: "O Lago Titicaca, um dos lagos navegáveis mais altos do mundo, é compartilhado por quais dois países?",
      options: ["Peru e Bolívia", "Peru e Equador", "Bolívia e Chile", "Chile e Argentina"],
      correctIndex: 0,
      explanation: "O Lago Titicaca fica na fronteira entre o Peru e a Bolívia, nos Andes."
    },
    {
      id: 430,
      question: "O Cristo de la Concordia, uma das maiores estátuas de Cristo do mundo, está localizado em qual cidade boliviana?",
      options: ["Cochabamba", "La Paz", "Santa Cruz", "Sucre"],
      correctIndex: 0,
      explanation: "O Cristo de la Concordia, uma estátua monumental inspirada no Cristo Redentor, fica na cidade de Cochabamba, na Bolívia."
    },
    {
      id: 431,
      question: "O Deserto do Atacama, um dos lugares mais áridos do mundo, está localizado em qual país?",
      options: ["Chile", "Peru", "Bolívia", "Argentina"],
      correctIndex: 0,
      explanation: "O Deserto do Atacama, no norte do Chile, é considerado um dos lugares mais secos do planeta."
    },
    {
      id: 432,
      question: "A Ilha de Páscoa, famosa por suas estátuas monumentais chamadas moai, pertence a qual país?",
      options: ["Chile", "Peru", "Nova Zelândia", "Estados Unidos"],
      correctIndex: 0,
      explanation: "A Ilha de Páscoa (Rapa Nui) é um território chileno localizado no Oceano Pacífico."
    },
    {
      id: 433,
      question: "O que são os 'moai', esculturas monumentais características da Ilha de Páscoa?",
      options: ["Grandes estátuas de pedra com rostos humanos estilizados", "Templos subterrâneos", "Instrumentos musicais tradicionais", "Tipos de canoas cerimoniais"],
      correctIndex: 0,
      explanation: "Os moai são estátuas monumentais de pedra, com rostos humanos estilizados, esculpidas pelos antigos habitantes polinésios da ilha."
    },
    {
      id: 434,
      question: "A Cidade do México foi construída sobre as ruínas de qual antiga capital asteca?",
      options: ["Tenochtitlán", "Teotihuacán", "Tikal", "Palenque"],
      correctIndex: 0,
      explanation: "A atual Cidade do México foi erguida sobre as ruínas de Tenochtitlán, a antiga capital do Império Asteca."
    },
    {
      id: 435,
      question: "A cidade antiga de Teotihuacán, com suas grandes pirâmides do Sol e da Lua, está localizada próxima a qual cidade moderna?",
      options: ["Cidade do México", "Guadalajara", "Monterrey", "Cancún"],
      correctIndex: 0,
      explanation: "Teotihuacán fica a cerca de 40 km da Cidade do México e é um dos maiores sítios arqueológicos da Mesoamérica."
    },
    {
      id: 436,
      question: "A Pirâmide do Sol, em Teotihuacán, é considerada uma das maiores pirâmides do mundo em qual medida?",
      options: ["Volume", "Altura absoluta", "Número de degraus", "Peso total"],
      correctIndex: 0,
      explanation: "A Pirâmide do Sol de Teotihuacán está entre as maiores estruturas piramidais do mundo em termos de volume."
    },
    {
      id: 437,
      question: "O Museu Guggenheim de Bilbao, marco da arquitetura contemporânea, está localizado em qual país?",
      options: ["Espanha", "México", "Argentina", "Estados Unidos"],
      correctIndex: 0,
      explanation: "O Museu Guggenheim Bilbao, projetado por Frank Gehry, fica na cidade de Bilbao, no País Basco, Espanha."
    },
    {
      id: 438,
      question: "A cidade de Cartagena, com seu centro histórico colonial murado, está localizada em qual país sul-americano?",
      options: ["Colômbia", "Venezuela", "Equador", "Panamá"],
      correctIndex: 0,
      explanation: "Cartagena das Índias, com suas muralhas coloniais bem preservadas, fica na costa caribenha da Colômbia."
    },
    {
      id: 439,
      question: "A Cidade Perdida (Ciudad Perdida), sítio arqueológico pré-colombiano nas montanhas, está localizada em qual país?",
      options: ["Colômbia", "Peru", "Equador", "Venezuela"],
      correctIndex: 0,
      explanation: "A Ciudad Perdida, construída pelo povo Tayrona, fica na Serra Nevada de Santa Marta, na Colômbia."
    },
    {
      id: 440,
      question: "O Cristo del Pacífico, outra grande estátua de Cristo na América do Sul, está localizado em qual cidade peruana?",
      options: ["Lima", "Cusco", "Arequipa", "Trujillo"],
      correctIndex: 0,
      explanation: "O Cristo del Pacífico fica na cidade de Lima, capital do Peru, com vista para o Oceano Pacífico."
    },
    {
      id: 441,
      question: "A Casa Rosada, sede do governo argentino, está localizada em qual cidade?",
      options: ["Buenos Aires", "Córdoba", "Rosário", "Mendoza"],
      correctIndex: 0,
      explanation: "A Casa Rosada é a sede do Poder Executivo argentino, localizada na Plaza de Mayo, em Buenos Aires."
    },
    {
      id: 442,
      question: "O Teatro Colón, uma das casas de ópera mais renomadas do mundo, está localizado em qual cidade?",
      options: ["Buenos Aires", "Santiago", "Montevidéu", "Assunção"],
      correctIndex: 0,
      explanation: "O Teatro Colón, reconhecido internacionalmente por sua acústica, fica em Buenos Aires, na Argentina."
    },
    {
      id: 443,
      question: "O Glaciar Perito Moreno, uma das maiores atrações naturais da Argentina, está localizado em qual região?",
      options: ["Patagônia", "Pampas", "Chaco", "Cuyo"],
      correctIndex: 0,
      explanation: "O Glaciar Perito Moreno fica na região da Patagônia argentina, dentro do Parque Nacional Los Glaciares."
    },
    {
      id: 444,
      question: "O Canal do Panamá, importante via de navegação que conecta dois oceanos, liga quais massas de água?",
      options: ["O Oceano Atlântico e o Oceano Pacífico", "O Oceano Atlântico e o Mar do Caribe apenas", "O Golfo do México e o Oceano Pacífico", "O Mar do Caribe e o Golfo do México"],
      correctIndex: 0,
      explanation: "O Canal do Panamá conecta o Oceano Atlântico ao Oceano Pacífico, sendo uma das obras de engenharia mais importantes do mundo."
    },
    {
      id: 445,
      question: "Tikal, importante sítio arqueológico maia com grandes pirâmides em meio à selva, está localizado em qual país?",
      options: ["Guatemala", "México", "Honduras", "Belize"],
      correctIndex: 0,
      explanation: "Tikal, um dos maiores centros urbanos da civilização maia, está localizado no norte da Guatemala."
    },
    {
      id: 446,
      question: "O Central Park, um dos parques urbanos mais famosos do mundo, está localizado em qual cidade?",
      options: ["Nova York", "Chicago", "Los Angeles", "Boston"],
      correctIndex: 0,
      explanation: "O Central Park é um extenso parque urbano localizado no centro da ilha de Manhattan, em Nova York."
    },
    {
      id: 447,
      question: "O Empire State Building, um dos arranha-céus mais famosos do mundo, está localizado em qual cidade?",
      options: ["Nova York", "Chicago", "Filadélfia", "Miami"],
      correctIndex: 0,
      explanation: "O Empire State Building fica no bairro de Manhattan, em Nova York, e foi por décadas o edifício mais alto do mundo."
    },
    {
      id: 448,
      question: "O Parque Nacional Yellowstone, conhecido por seus gêiseres, está localizado principalmente em qual estado americano?",
      options: ["Wyoming", "Colorado", "Utah", "Montana (parcialmente correto, mas o principal é Wyoming)"],
      correctIndex: 0,
      explanation: "Yellowstone está localizado principalmente no estado de Wyoming, embora se estenda também por Montana e Idaho."
    },
    {
      id: 449,
      question: "O Grand Canyon, um dos cânions mais famosos do mundo, foi formado ao longo de milhões de anos pela erosão de qual rio?",
      options: ["Rio Colorado", "Rio Mississippi", "Rio Grande", "Rio Columbia"],
      correctIndex: 0,
      explanation: "O Grand Canyon foi esculpido ao longo de milhões de anos pela erosão constante do Rio Colorado."
    },
    {
      id: 450,
      question: "A Torre CN, um dos marcos mais reconhecíveis do Canadá, está localizada em qual cidade?",
      options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
      correctIndex: 0,
      explanation: "A Torre CN, por muitos anos considerada a estrutura autônoma mais alta do mundo, fica em Toronto."
    },
    {
      id: 451,
      question: "As Cataratas do Niágara, compartilhadas entre dois países, ficam na fronteira entre quais nações?",
      options: ["Estados Unidos e Canadá", "Estados Unidos e México", "Canadá e Groenlândia (Dinamarca)", "Estados Unidos apenas, sem fronteira"],
      correctIndex: 0,
      explanation: "As Cataratas do Niágara estão localizadas na fronteira entre os Estados Unidos e o Canadá."
    },
    {
      id: 452,
      question: "O Château Frontenac, um dos hotéis mais fotografados do mundo, está localizado em qual cidade canadense?",
      options: ["Cidade de Quebec", "Toronto", "Montreal", "Ottawa"],
      correctIndex: 0,
      explanation: "O Château Frontenac, com sua arquitetura de castelo, é um marco histórico da Cidade de Quebec, no Canadá."
    },
    {
      id: 453,
      question: "A Casa da Ópera de Sydney, embora não fique nas Américas, é frequentemente comparada em fama a monumentos americanos. Em que continente ela realmente está?",
      options: ["Oceania", "América do Norte", "Ásia", "Europa"],
      correctIndex: 0,
      explanation: "A Casa da Ópera de Sydney está localizada na Austrália, no continente da Oceania, e não nas Américas."
    },
    {
      id: 454,
      question: "O Monumento Nacional Mount Vernon, antiga propriedade de George Washington, está localizado em qual estado americano?",
      options: ["Virgínia", "Maryland", "Pensilvânia", "Nova York"],
      correctIndex: 0,
      explanation: "Mount Vernon, residência do primeiro presidente dos Estados Unidos, fica no estado da Virgínia."
    },
    {
      id: 455,
      question: "O Monumento a Washington, obelisco que homenageia o primeiro presidente americano, está localizado em qual cidade?",
      options: ["Washington D.C.", "Nova York", "Boston", "Richmond"],
      correctIndex: 0,
      explanation: "O Monumento a Washington é um grande obelisco localizado no National Mall, em Washington D.C."
    },
    {
      id: 456,
      question: "O Lincoln Memorial, dedicado ao presidente Abraham Lincoln, está localizado em qual cidade?",
      options: ["Washington D.C.", "Springfield", "Gettysburg", "Chicago"],
      correctIndex: 0,
      explanation: "O Lincoln Memorial fica no National Mall, em Washington D.C., próximo ao Monumento a Washington."
    },
    {
      id: 457,
      question: "Machu Picchu, Cusco e o Vale Sagrado são atrações turísticas concentradas em qual região montanhosa da América do Sul?",
      options: ["Os Andes", "Os Alpes (que são europeus)", "A Cordilheira Litorânea brasileira", "A Serra Madre mexicana"],
      correctIndex: 0,
      explanation: "Machu Picchu, Cusco e o Vale Sagrado estão localizados na Cordilheira dos Andes, no Peru."
    },
    {
      id: 458,
      question: "O Cristo Redentor no Rio de Janeiro e o Cristo de la Concordia na Bolívia têm em comum o fato de serem, ambos, o quê?",
      options: ["Grandes estátuas monumentais de Jesus Cristo", "Réplicas exatas uma da outra", "Construções feitas pelo mesmo arquiteto", "Monumentos de mesma altura exata"],
      correctIndex: 0,
      explanation: "Ambas são estátuas monumentais representando Jesus Cristo, embora sejam obras distintas em países diferentes."
    },
    {
      id: 459,
      question: "O Palácio Nacional, importante edifício histórico do México, está localizado em qual praça da Cidade do México?",
      options: ["Zócalo (Praça da Constituição)", "Praça Garibaldi", "Alameda Central", "Plaza de las Tres Culturas"],
      correctIndex: 0,
      explanation: "O Palácio Nacional fica na praça conhecida como Zócalo, o principal centro histórico e político da Cidade do México."
    },
    {
      id: 460,
      question: "Chichén Itzá e outros grandes centros maias declinaram, segundo teorias arqueológicas, principalmente por causa de quê?",
      options: ["Uma combinação de fatores como seca, guerras e mudanças políticas", "Uma única grande invasão estrangeira", "Um vulcão que destruiu toda a região", "A chegada dos europeus no século XVI (que ocorreu muito depois)"],
      correctIndex: 0,
      explanation: "O declínio dos grandes centros maias clássicos é atribuído por arqueólogos a uma combinação de fatores, incluindo secas prolongadas, conflitos internos e mudanças econômicas."
    },
    {
      id: 461,
      question: "A Casa da Ópera de Sydney, um dos edifícios mais reconhecíveis do mundo, está localizada em qual país?",
      options: ["Austrália", "Nova Zelândia", "Estados Unidos", "Reino Unido"],
      correctIndex: 0,
      explanation: "A Casa da Ópera de Sydney fica na baía de Sydney, na Austrália, e é Patrimônio Mundial da UNESCO."
    },
    {
      id: 462,
      question: "Quem foi o arquiteto responsável pelo projeto icônico da Casa da Ópera de Sydney, com suas 'velas' brancas?",
      options: ["Jørn Utzon", "Frank Gehry", "Renzo Piano", "Norman Foster"],
      correctIndex: 0,
      explanation: "O projeto foi criado pelo arquiteto dinamarquês Jørn Utzon, vencedor de um concurso internacional em 1957."
    },
    {
      id: 463,
      question: "A Grande Barreira de Corais, embora seja uma formação natural e não um monumento construído, está localizada ao largo de qual país?",
      options: ["Austrália", "Indonésia", "Filipinas", "Papua-Nova Guiné"],
      correctIndex: 0,
      explanation: "A Grande Barreira de Corais fica no Mar de Coral, ao longo da costa nordeste da Austrália."
    },
    {
      id: 464,
      question: "Angkor Wat, um dos maiores complexos religiosos do mundo, está localizado em qual país?",
      options: ["Camboja", "Tailândia", "Vietnã", "Laos"],
      correctIndex: 0,
      explanation: "Angkor Wat, originalmente um templo hindu depois convertido ao budismo, fica próximo à cidade de Siem Reap, no Camboja."
    },
    {
      id: 465,
      question: "Angkor Wat foi originalmente construído como templo dedicado a qual religião?",
      options: ["O hinduísmo", "O budismo, desde sua fundação", "O islamismo", "O cristianismo"],
      correctIndex: 0,
      explanation: "Angkor Wat foi originalmente construído no século XII como templo hindu dedicado ao deus Vishnu, sendo depois gradualmente convertido em templo budista."
    },
    {
      id: 466,
      question: "Qual antigo império é responsável pela construção de Angkor Wat e da cidade de Angkor?",
      options: ["O Império Khmer", "O Império Mongol", "O Império Chola", "O Sultanato de Malaca"],
      correctIndex: 0,
      explanation: "Angkor Wat foi construído pelo Império Khmer, que dominou grande parte do Sudeste Asiático entre os séculos IX e XV."
    },
    {
      id: 467,
      question: "A cidade de Bagan, com milhares de templos e pagodes antigos, está localizada em qual país?",
      options: ["Mianmar", "Tailândia", "Camboja", "Laos"],
      correctIndex: 0,
      explanation: "Bagan, com mais de 2.000 templos e pagodes preservados, fica em Mianmar (antiga Birmânia)."
    },
    {
      id: 468,
      question: "O Templo Shwedagon, um dos santuários budistas mais sagrados, coberto por ouro genuíno, está localizado em qual cidade?",
      options: ["Yangon, em Mianmar", "Bangkok, na Tailândia", "Hanói, no Vietnã", "Vientiane, no Laos"],
      correctIndex: 0,
      explanation: "A Pagode Shwedagon, com sua grande estupa coberta de ouro, fica na cidade de Yangon, em Mianmar."
    },
    {
      id: 469,
      question: "O Grande Palácio Real, importante complexo histórico tailandês, está localizado em qual cidade?",
      options: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
      correctIndex: 0,
      explanation: "O Grande Palácio Real, antiga residência oficial dos reis da Tailândia, fica no centro de Bangkok."
    },
    {
      id: 470,
      question: "O Templo de Buda de Esmeralda, um dos mais sagrados da Tailândia, está localizado dentro de qual complexo?",
      options: ["O Grande Palácio de Bangkok", "O Palácio de Ayutthaya", "A cidade de Chiang Mai", "O templo de Wat Arun isoladamente"],
      correctIndex: 0,
      explanation: "O Templo de Buda de Esmeralda (Wat Phra Kaew) fica dentro do complexo do Grande Palácio, em Bangkok."
    },
    {
      id: 471,
      question: "A cidade histórica de Hoi An, com sua arquitetura colonial preservada, está localizada em qual país?",
      options: ["Vietnã", "Camboja", "Tailândia", "Laos"],
      correctIndex: 0,
      explanation: "Hoi An, antigo porto comercial, é uma cidade histórica bem preservada no centro do Vietnã."
    },
    {
      id: 472,
      question: "A Baía de Halong, famosa por suas formações rochosas emergindo do mar, está localizada em qual país?",
      options: ["Vietnã", "Filipinas", "Indonésia", "Malásia"],
      correctIndex: 0,
      explanation: "A Baía de Halong, com milhares de ilhotes de calcário, fica no norte do Vietnã."
    },
    {
      id: 473,
      question: "O Templo Borobudur, o maior templo budista do mundo, está localizado em qual país?",
      options: ["Indonésia", "Malásia", "Filipinas", "Cingapura"],
      correctIndex: 0,
      explanation: "O Borobudur, considerado o maior monumento budista do mundo, fica na ilha de Java, na Indonésia."
    },
    {
      id: 474,
      question: "O Templo Borobudur é estruturado em camadas, representando simbolicamente qual conceito budista?",
      options: ["A jornada em direção à iluminação", "Os quatro elementos da natureza", "A hierarquia militar do império", "As estações do ano"],
      correctIndex: 0,
      explanation: "A estrutura em níveis do Borobudur representa simbolicamente a jornada budista da vida terrena até a iluminação espiritual."
    },
    {
      id: 475,
      question: "O Templo Prambanan, um dos maiores complexos hindus do Sudeste Asiático, está localizado próximo a qual cidade indonésia?",
      options: ["Yogyakarta", "Jacarta", "Bali (Denpasar)", "Surabaya"],
      correctIndex: 0,
      explanation: "O Templo Prambanan, dedicado à Trimurti hindu (Brahma, Vishnu e Shiva), fica próximo à cidade de Yogyakarta, em Java."
    },
    {
      id: 476,
      question: "A ilha de Bali, famosa por seus templos hindus e paisagens, pertence a qual país?",
      options: ["Indonésia", "Malásia", "Filipinas", "Tailândia"],
      correctIndex: 0,
      explanation: "Bali é uma ilha indonésia conhecida por sua cultura hindu única em meio a um país majoritariamente muçulmano."
    },
    {
      id: 477,
      question: "As Torres Petronas, um dos arranha-céus gêmeos mais famosos do mundo, estão localizadas em qual cidade?",
      options: ["Kuala Lumpur", "Cingapura", "Jacarta", "Manila"],
      correctIndex: 0,
      explanation: "As Torres Petronas, antigo edifício mais alto do mundo, ficam em Kuala Lumpur, capital da Malásia."
    },
    {
      id: 478,
      question: "O Marina Bay Sands, complexo com piscina no topo em formato de barco, está localizado em qual cidade-estado?",
      options: ["Cingapura", "Hong Kong", "Kuala Lumpur", "Bangkok"],
      correctIndex: 0,
      explanation: "O Marina Bay Sands, com sua estrutura icônica em forma de barco no topo de três torres, fica em Cingapura."
    },
    {
      id: 479,
      question: "O que caracteriza a estrutura Gardens by the Bay, importante atração de Cingapura, com suas árvores artificiais gigantes?",
      options: ["'Supertrees' (superárvores) que combinam vegetação real com estrutura artificial", "Réplicas de templos antigos", "Um zoológico exclusivamente aquático", "Uma pirâmide de vidro"],
      correctIndex: 0,
      explanation: "O parque é famoso por suas 'supertrees', estruturas verticais gigantes cobertas de plantas reais, combinando natureza e tecnologia."
    },
    {
      id: 480,
      question: "A Grande Muralha da China à parte, qual outra grande fortificação histórica protege a antiga capital coreana de Seul?",
      options: ["A Fortaleza de Hwaseong", "A Muralha de Pyongyang", "O Forte de Busan", "A Cidadela de Jeju"],
      correctIndex: 0,
      explanation: "A Fortaleza de Hwaseong, na cidade de Suwon, próxima a Seul, é um importante exemplo de fortificação coreana do século XVIII."
    },
    {
      id: 481,
      question: "O Palácio Gyeongbokgung, principal palácio real da Coreia, está localizado em qual cidade?",
      options: ["Seul", "Busan", "Incheon", "Daegu"],
      correctIndex: 0,
      explanation: "O Gyeongbokgung foi o principal palácio real da dinastia Joseon, localizado no centro de Seul, na Coreia do Sul."
    },
    {
      id: 482,
      question: "As Grutas de Seokguram, importante sítio budista coreano com uma estátua de Buda esculpida em granito, ficam próximas a qual cidade?",
      options: ["Gyeongju", "Seul", "Busan", "Jeju"],
      correctIndex: 0,
      explanation: "A Gruta de Seokguram fica nas montanhas próximas à antiga capital de Gyeongju, na Coreia do Sul."
    },
    {
      id: 483,
      question: "A Grande Mesquita de Sultão Ahmed, conhecida como 'Mesquita Azul', está localizada em qual cidade?",
      options: ["Istambul", "Ancara", "Meca", "Cairo"],
      correctIndex: 0,
      explanation: "A Mesquita Azul, famosa por seus azulejos internos, fica em Istambul, na Turquia."
    },
    {
      id: 484,
      question: "Por que a Mesquita de Sultão Ahmed é popularmente chamada de 'Mesquita Azul'?",
      options: ["Pelos azulejos azuis que decoram seu interior", "Por sua cúpula externa ser pintada de azul", "Por ficar à beira de um mar de águas azuis", "Por ter sido construída com pedra azulada"],
      correctIndex: 0,
      explanation: "O apelido vem dos milhares de azulejos de tons azuis usados na decoração interna da mesquita."
    },
    {
      id: 485,
      question: "A cidade de Meca, destino de peregrinação obrigatória para muçulmanos, está localizada em qual país?",
      options: ["Arábia Saudita", "Egito", "Jordânia", "Iraque"],
      correctIndex: 0,
      explanation: "Meca, cidade sagrada do islamismo e local de nascimento do profeta Maomé, fica na Arábia Saudita."
    },
    {
      id: 486,
      question: "A Caaba, estrutura em formato de cubo considerada o local mais sagrado do islamismo, está localizada dentro de qual mesquita?",
      options: ["A Grande Mesquita de Meca (Masjid al-Haram)", "A Mesquita Azul, em Istambul", "A Mesquita de Al-Aqsa, em Jerusalém", "A Grande Mesquita de Damasco"],
      correctIndex: 0,
      explanation: "A Caaba fica no centro da Grande Mesquita de Meca e é o ponto para o qual os muçulmanos se voltam durante as orações."
    },
    {
      id: 487,
      question: "A Cúpula da Rocha, importante santuário islâmico com cúpula dourada, está localizada em qual cidade?",
      options: ["Jerusalém", "Meca", "Medina", "Damasco"],
      correctIndex: 0,
      explanation: "A Cúpula da Rocha é um santuário islâmico localizado no Monte do Templo, em Jerusalém."
    },
    {
      id: 488,
      question: "O Muro das Lamentações, importante local sagrado para o judaísmo, também está localizado em qual cidade?",
      options: ["Jerusalém", "Tel Aviv", "Belém", "Haifa"],
      correctIndex: 0,
      explanation: "O Muro das Lamentações, remanescente do antigo Segundo Templo, fica na Cidade Velha de Jerusalém."
    },
    {
      id: 489,
      question: "A cidade de Petra, esculpida na rocha, apesar de estar na Ásia (Jordânia), também é associada culturalmente a qual povo comerciante do deserto?",
      options: ["Os nabateus", "Os fenícios", "Os assírios", "Os hititas"],
      correctIndex: 0,
      explanation: "Petra foi construída pelos nabateus, um povo árabe que controlava importantes rotas comerciais no deserto."
    },
    {
      id: 490,
      question: "A Grande Mesquita de Xeique Zayed, uma das maiores mesquitas do mundo, está localizada em qual cidade?",
      options: ["Abu Dhabi", "Dubai", "Doha", "Manama"],
      correctIndex: 0,
      explanation: "A Grande Mesquita Xeique Zayed fica em Abu Dhabi, capital dos Emirados Árabes Unidos."
    },
    {
      id: 491,
      question: "O Burj Khalifa, o edifício mais alto do mundo atualmente, está localizado em qual cidade?",
      options: ["Dubai", "Abu Dhabi", "Doha", "Riade"],
      correctIndex: 0,
      explanation: "O Burj Khalifa, inaugurado em 2010, fica em Dubai, nos Emirados Árabes Unidos, e é o edifício mais alto do mundo."
    },
    {
      id: 492,
      question: "Persépolis, antiga capital cerimonial do Império Persa, está localizada em qual país atual?",
      options: ["Irã", "Iraque", "Turquia", "Afeganistão"],
      correctIndex: 0,
      explanation: "As ruínas de Persépolis, antiga capital do Império Aquemênida, estão localizadas no atual Irã."
    },
    {
      id: 493,
      question: "Persépolis foi fundada, segundo registros históricos, por qual rei persa?",
      options: ["Dario I", "Ciro, o Grande", "Xerxes I, isoladamente", "Alexandre, o Grande"],
      correctIndex: 0,
      explanation: "A construção de Persépolis foi iniciada por Dario I, por volta de 518 a.C., sendo expandida por seus sucessores."
    },
    {
      id: 494,
      question: "As Torres do Silêncio, estruturas usadas em rituais funerários zoroastristas, são encontradas principalmente em qual país, associado a essa antiga religião persa?",
      options: ["Irã", "Iraque", "Síria", "Líbano"],
      correctIndex: 0,
      explanation: "As Torres do Silêncio são estruturas associadas à antiga religião zoroastrista, historicamente praticada na região do atual Irã."
    },
    {
      id: 495,
      question: "A Grande Mesquita de Damasco, uma das mais antigas e importantes do mundo islâmico, está localizada em qual país?",
      options: ["Síria", "Líbano", "Jordânia", "Iraque"],
      correctIndex: 0,
      explanation: "A Grande Mesquita de Damasco, construída no início do século VIII, fica na capital da Síria."
    },
    {
      id: 496,
      question: "Babilônia, antiga cidade mesopotâmica associada aos lendários Jardins Suspensos, ficava localizada no que hoje é qual país?",
      options: ["Iraque", "Irã", "Síria", "Jordânia"],
      correctIndex: 0,
      explanation: "As ruínas da antiga Babilônia estão localizadas no atual Iraque, próximas à cidade de Bagdá."
    },
    {
      id: 497,
      question: "A Grande Mesquita de Samarra, no Iraque, é famosa por seu minarete em formato espiral, chamado de:",
      options: ["Malwiya", "Kaaba", "Al-Aqsa", "Sultanahmet"],
      correctIndex: 0,
      explanation: "O minarete Malwiya, com sua rampa espiral externa, é a marca mais reconhecível da Grande Mesquita de Samarra."
    },
    {
      id: 498,
      question: "O Uluru (Ayers Rock), uma das formações rochosas mais sagradas para os povos aborígenes, está localizado em qual país?",
      options: ["Austrália", "Nova Zelândia", "África do Sul", "Estados Unidos"],
      correctIndex: 0,
      explanation: "O Uluru é uma imensa formação rochosa localizada no centro da Austrália, sagrada para os povos aborígenes locais."
    },
    {
      id: 499,
      question: "O Uluru é especialmente famoso por qual fenômeno visual que ocorre ao entardecer?",
      options: ["A mudança de cor da rocha, que parece ficar avermelhada/laranja", "O surgimento de um arco-íris permanente", "A formação de neblina colorida", "O brilho fosforescente da própria pedra"],
      correctIndex: 0,
      explanation: "O Uluru é conhecido por mudar de tonalidade ao longo do dia, ficando especialmente avermelhado ao pôr do sol."
    },
    {
      id: 500,
      question: "A Casa da Ópera de Sydney foi reconhecida pela UNESCO como Patrimônio Mundial em qual século?",
      options: ["Século XXI (2007)", "Século XX (1980)", "Século XIX", "Ainda não foi reconhecida"],
      correctIndex: 0,
      explanation: "A Casa da Ópera de Sydney foi declarada Patrimônio Mundial pela UNESCO em 2007, sendo uma das construções mais recentes com esse título."
    }
  ];
})();
