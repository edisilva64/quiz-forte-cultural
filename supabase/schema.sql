-- ===================================================================
-- FORTE CULTURAL — DESAFIO LÓGICO
-- schema.sql — Script único de configuração do banco de dados (Supabase)
--
-- COMO USAR:
-- 1. Crie um projeto gratuito em https://supabase.com
-- 2. No painel do projeto, vá em "SQL Editor" → "New query"
-- 3. Cole TODO o conteúdo deste arquivo e clique em "Run"
-- 4. Pronto! As tabelas, permissões e as 30 perguntas já ficam criadas.
--
-- Veja o passo a passo completo (com prints) no README.md.
-- ===================================================================


-- ===================== TABELA: questions =====================
-- Banco de perguntas do quiz. A cada partida, 15 são sorteadas aleatoriamente.
create table if not exists questions (
  id bigint generated always as identity primary key,
  question text not null,
  options jsonb not null,        -- array com as 4 alternativas, ex: ["A","B","C","D"]
  correct_index smallint not null check (correct_index between 0 and 3),
  explanation text not null,
  created_at timestamptz not null default now()
);

alter table questions enable row level security;

-- Qualquer visitante do site pode LER as perguntas (necessário para o quiz funcionar)
drop policy if exists "questions_select_public" on questions;
create policy "questions_select_public"
  on questions for select
  to anon
  using (true);

-- Ninguém além de você (via painel do Supabase) pode inserir/editar/excluir perguntas.
-- Não há política de INSERT/UPDATE/DELETE para o público de propósito.


-- ===================== TABELA: results =====================
-- Um registro por partida concluída: usado para calcular as médias gerais.
-- Não guarda nome nem qualquer dado pessoal do jogador — é 100% anônimo.
create table if not exists results (
  id bigint generated always as identity primary key,
  score smallint not null,
  total smallint not null default 15,
  time_ms integer not null,
  created_at timestamptz not null default now()
);

alter table results enable row level security;

-- Qualquer visitante pode REGISTRAR o próprio resultado ao terminar o quiz
drop policy if exists "results_insert_public" on results;
create policy "results_insert_public"
  on results for insert
  to anon
  with check (true);

-- Ninguém pode LER a tabela results diretamente pelo site (nem os outros
-- jogadores, nem visitantes) — as médias são expostas só pela função
-- get_stats() abaixo, que retorna apenas números agregados.


-- ===================== FUNÇÃO: get_stats() =====================
-- Retorna estatísticas agregadas (nunca dados individuais de um jogador).
create or replace function get_stats()
returns table (players bigint, avg_score numeric, avg_time_ms numeric)
language sql
security definer
set search_path = public
as $$
  select
    count(*)::bigint as players,
    avg(score)::numeric as avg_score,
    avg(time_ms)::numeric as avg_time_ms
  from results;
$$;

grant execute on function get_stats() to anon, authenticated;


-- ===================== TABELA: page_views =====================
-- Contador de acessos — visível SOMENTE para você, via admin.html
-- (exige login, ver seção "Painel administrativo" no README).
create table if not exists page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);

alter table page_views enable row level security;

-- Qualquer carregamento de página registra 1 acesso
drop policy if exists "page_views_insert_public" on page_views;
create policy "page_views_insert_public"
  on page_views for insert
  to anon
  with check (true);

-- Só um usuário autenticado (você, logado no admin.html) pode LER o total
drop policy if exists "page_views_select_admin" on page_views;
create policy "page_views_select_admin"
  on page_views for select
  to authenticated
  using (true);


-- ===================== SEED: 30 perguntas do banco =====================
-- (Se rodar este script mais de uma vez, isso vai duplicar as perguntas.
--  Para evitar duplicidade, rode "delete from questions;" antes de repetir.)

insert into questions (question, options, correct_index, explanation) values ('Complete a sequência lógica: 2, 6, 12, 20, 30, ?', '["36","40","42","38"]'::jsonb, 2, 'A diferença entre os termos cresce de 2 em 2 (4, 6, 8, 10, 12), então 30 + 12 = 42.');
insert into questions (question, options, correct_index, explanation) values ('Qual número não pertence ao grupo: 3, 5, 7, 10, 11?', '["3","7","10","11"]'::jsonb, 2, 'Todos os outros números são ímpares; o 10 é o único número par do grupo.');
insert into questions (question, options, correct_index, explanation) values ('Charada: quanto mais eu seco, mais molhado fico. O que sou?', '["Uma esponja","Uma toalha","Um guarda-chuva","Um espelho"]'::jsonb, 1, 'A toalha é usada para secar algo, mas no processo ela mesma fica molhada.');
insert into questions (question, options, correct_index, explanation) values ('Se hoje é quarta-feira, que dia da semana será daqui a 100 dias?', '["Segunda-feira","Sexta-feira","Quinta-feira","Sábado"]'::jsonb, 1, '100 dividido por 7 deixa resto 2, então avançamos 2 dias a partir de quarta: quinta, sexta.');
insert into questions (question, options, correct_index, explanation) values ('Qual é a próxima letra da sequência: A, D, G, J, ?', '["K","L","M","N"]'::jsonb, 2, 'A sequência pula sempre 2 letras (A→D→G→J→M), avançando de 3 em 3 posições no alfabeto.');
insert into questions (question, options, correct_index, explanation) values ('Charada: tenho cidades, mas nenhuma casa; tenho montanhas, mas nenhuma árvore; tenho água, mas nenhum peixe. O que sou?', '["Um globo","Um mapa","Um livro","Uma foto"]'::jsonb, 1, 'Um mapa representa cidades, montanhas e rios sem conter os elementos reais.');
insert into questions (question, options, correct_index, explanation) values ('Se um relógio leva 5 segundos para bater 6 badaladas, quanto tempo leva para bater 12 badaladas?', '["10 segundos","11 segundos","12 segundos","6 segundos"]'::jsonb, 1, 'Entre 6 badaladas há 5 intervalos (1s cada). Para 12 badaladas há 11 intervalos, ou seja, 11 segundos.');
insert into questions (question, options, correct_index, explanation) values ('Qual figura completa a sequência: círculo, quadrado, triângulo, círculo, quadrado, ?', '["Círculo","Triângulo","Quadrado","Pentágono"]'::jsonb, 1, 'O padrão se repete a cada 3 posições: círculo, quadrado, triângulo — o próximo é triângulo.');
insert into questions (question, options, correct_index, explanation) values ('Charada: quanto mais você tira de mim, maior eu fico. O que sou?', '["Um buraco","Uma dívida","Um problema","Uma sombra"]'::jsonb, 0, 'Ao retirar terra de um buraco, ele aumenta de tamanho.');
insert into questions (question, options, correct_index, explanation) values ('Ana é mais velha que Bruno. Bruno é mais velho que Carla. Quem é o mais novo dos três?', '["Ana","Bruno","Carla","Não é possível saber"]'::jsonb, 2, 'Se Ana > Bruno > Carla em idade, Carla é necessariamente a mais nova.');
insert into questions (question, options, correct_index, explanation) values ('Qual é o próximo número da sequência de Fibonacci: 1, 1, 2, 3, 5, 8, ?', '["11","12","13","10"]'::jsonb, 2, 'Cada número é a soma dos dois anteriores: 5 + 8 = 13.');
insert into questions (question, options, correct_index, explanation) values ('Charada: eu tenho chaves, mas não abro portas. Tenho espaço, mas não tenho quarto. Você pode entrar, mas não pode sair. O que sou?', '["Um piano","Um teclado de computador","Uma casa","Um cofre"]'::jsonb, 1, 'Um teclado tem ''teclas'' (chaves), ''barra de espaço'' e você pode digitar ''enter'' (entrar), mas não ''sair'' como tecla padrão.');
insert into questions (question, options, correct_index, explanation) values ('Se todos os Bips são Bops, e todos os Bops são Baps, então:', '["Todos os Baps são Bips","Todos os Bips são Baps","Nenhum Bip é Bap","Alguns Baps não são Bops"]'::jsonb, 1, 'Por transitividade lógica: se Bip ⊂ Bop e Bop ⊂ Bap, então Bip ⊂ Bap.');
insert into questions (question, options, correct_index, explanation) values ('Qual planeta do sistema solar é conhecido como o ''Planeta Vermelho''?', '["Vênus","Júpiter","Marte","Saturno"]'::jsonb, 2, 'Marte tem coloração avermelhada devido ao óxido de ferro presente em sua superfície.');
insert into questions (question, options, correct_index, explanation) values ('Um trem parte às 14h e viaja a 80 km/h. Outro trem parte da mesma cidade às 15h no mesmo sentido, a 100 km/h. A que horas o segundo trem alcança o primeiro?', '["18h","19h","20h","17h"]'::jsonb, 1, 'Às 15h o primeiro já percorreu 80 km. A diferença de velocidade é 20 km/h, então leva 4h para alcançar: 15h + 4h = 19h.');
insert into questions (question, options, correct_index, explanation) values ('Complete a sequência: 1, 4, 9, 16, 25, ?', '["30","36","32","49"]'::jsonb, 1, 'São os quadrados perfeitos (1², 2², 3², 4², 5²...). O próximo é 6² = 36.');
insert into questions (question, options, correct_index, explanation) values ('Charada: não tenho vida, mas posso morrer. O que sou?', '["Uma pilha","Uma planta","Um robô","Uma estrela"]'::jsonb, 0, 'Uma pilha nunca esteve viva, mas dizemos que ela ''morre'' quando descarrega.');
insert into questions (question, options, correct_index, explanation) values ('Se 5 máquinas fazem 5 produtos em 5 minutos, quanto tempo levam 100 máquinas para fazer 100 produtos?', '["100 minutos","20 minutos","5 minutos","50 minutos"]'::jsonb, 2, 'Cada máquina faz 1 produto em 5 minutos. Com 100 máquinas trabalhando em paralelo, ainda leva 5 minutos para produzir 100 produtos.');
insert into questions (question, options, correct_index, explanation) values ('Complete a sequência: 3, 9, 27, 81, ?', '["162","243","324","729"]'::jsonb, 1, 'Cada termo é o anterior multiplicado por 3 (potências de 3). 81 × 3 = 243.');
insert into questions (question, options, correct_index, explanation) values ('Charada: quanto mais eu cresço, menos você vê. O que sou?', '["A escuridão","A neblina","A fumaça","A distância"]'::jsonb, 0, 'Quanto mais a escuridão aumenta, menos enxergamos ao redor.');
insert into questions (question, options, correct_index, explanation) values ('Qual é o maior oceano do mundo?', '["Atlântico","Índico","Ártico","Pacífico"]'::jsonb, 3, 'O Oceano Pacífico é o maior e mais profundo oceano da Terra, cobrindo cerca de um terço da superfície do planeta.');
insert into questions (question, options, correct_index, explanation) values ('Um pai tem 5 filhas. Cada filha tem exatamente 1 irmão. Quantos filhos o pai tem ao todo?', '["5","6","10","11"]'::jsonb, 1, 'As 5 filhas compartilham o mesmo único irmão. Logo, são 5 filhas + 1 filho = 6 filhos no total.');
insert into questions (question, options, correct_index, explanation) values ('Complete a sequência de letras: Z, X, V, T, ?', '["S","R","Q","U"]'::jsonb, 1, 'A sequência anda de trás para frente pulando uma letra a cada passo (Z, X, V, T, R).');
insert into questions (question, options, correct_index, explanation) values ('Charada: tenho um rosto, mas não tenho olhos; tenho mãos, mas não tenho dedos. O que sou?', '["Uma boneca","Um relógio","Uma estátua","Um espelho"]'::jsonb, 1, 'Um relógio tem ''rosto'' (mostrador) e ''mãos'' (ponteiros), mas não possui olhos nem dedos de verdade.');
insert into questions (question, options, correct_index, explanation) values ('Quantos lados tem um hexágono?', '["5","6","7","8"]'::jsonb, 1, 'O prefixo ''hexa'' significa seis — um hexágono é um polígono de 6 lados.');
insert into questions (question, options, correct_index, explanation) values ('Você está correndo uma corrida e ultrapassa quem está em segundo lugar. Em que posição você fica?', '["Primeiro lugar","Segundo lugar","Terceiro lugar","Depende da distância que falta"]'::jsonb, 1, 'Se você ultrapassa o segundo colocado, você assume a posição dele: o segundo lugar (e não o primeiro).');
insert into questions (question, options, correct_index, explanation) values ('Complete a sequência: 2, 5, 11, 23, 47, ?', '["94","95","96","93"]'::jsonb, 1, 'Cada termo é o dobro do anterior mais 1 (2×2+1=5, 5×2+1=11...). 47×2+1 = 95.');
insert into questions (question, options, correct_index, explanation) values ('Charada: quanto mais você tira de mim, mais eu deixo para trás. O que sou?', '["Pegadas","Lembranças","Um rastro de tinta","Um caminho"]'::jsonb, 0, 'A cada passo que você dá (tira de si mesmo), mais pegadas ficam para trás.');
insert into questions (question, options, correct_index, explanation) values ('Qual é o único metal que é líquido à temperatura ambiente?', '["Chumbo","Mercúrio","Estanho","Zinco"]'::jsonb, 1, 'O mercúrio é o único metal que se mantém em estado líquido em temperatura ambiente.');
insert into questions (question, options, correct_index, explanation) values ('Se A=1, B=2, C=3, D=4... qual é a soma dos valores das letras da palavra ''CAB''?', '["5","6","7","8"]'::jsonb, 1, 'C=3, A=1, B=2. Somando: 3 + 1 + 2 = 6.');

-- ===================== FIM DO SCRIPT =====================
-- Se tudo rodou sem erro, seu banco de dados está pronto!
-- Próximo passo: copie a "Project URL" e a chave "anon public" em
-- Project Settings → API, e cole em js/config.js.
