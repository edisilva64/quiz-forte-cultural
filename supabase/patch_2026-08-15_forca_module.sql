-- ===================================================================
-- PATCH — cria as tabelas do jogo "Forca da Cela", com um contador de
-- acessos SEPARADO do contador do quiz.
--
-- COMO USAR: cole este arquivo inteiro no SQL Editor do Supabase e
-- clique em "Run". Cria tabelas NOVAS — não mexe em nada do quiz ou
-- do módulo de turismo já existentes.
-- ===================================================================

-- ===================== TABELA: forca_page_views =====================
-- Contador de acessos do jogo da forca — separado de page_views (quiz).
create table if not exists forca_page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);

alter table forca_page_views enable row level security;

drop policy if exists "forca_page_views_insert_public" on forca_page_views;
create policy "forca_page_views_insert_public"
  on forca_page_views for insert
  to anon
  with check (true);

-- Só um usuário autenticado (você, logado no admin.html) pode LER o total
drop policy if exists "forca_page_views_select_admin" on forca_page_views;
create policy "forca_page_views_select_admin"
  on forca_page_views for select
  to authenticated
  using (true);


-- ===================== TABELA: forca_results =====================
-- Um registro por partida jogada (opcional, para estatísticas futuras).
-- Não guarda nome nem qualquer dado pessoal do jogador — é 100% anônimo.
create table if not exists forca_results (
  id bigint generated always as identity primary key,
  rounds_won smallint not null default 0,
  won_all boolean not null default false,
  created_at timestamptz not null default now()
);

alter table forca_results enable row level security;

drop policy if exists "forca_results_insert_public" on forca_results;
create policy "forca_results_insert_public"
  on forca_results for insert
  to anon
  with check (true);

drop policy if exists "forca_results_select_admin" on forca_results;
create policy "forca_results_select_admin"
  on forca_results for select
  to authenticated
  using (true);

-- ===================== FIM DO PATCH =====================
-- Se tudo rodou sem erro, o contador de acessos da Forca já está pronto!
