-- ===================================================================
-- PATCH — corrige o painel administrativo mostrando "Desafios
-- Concluídos: 0" mesmo havendo partidas registradas.
--
-- Causa: a tabela `results` não tinha permissão de leitura liberada
-- para o usuário administrador autenticado (só a função get_stats()
-- conseguia ler os dados, de forma agregada/anônima).
--
-- COMO USAR: cole este arquivo inteiro no SQL Editor do Supabase e
-- clique em "Run". É seguro rodar mesmo que você já tenha rodado o
-- schema.sql antes — não duplica nada, só adiciona a permissão que
-- faltava.
-- ===================================================================

drop policy if exists "results_select_admin" on results;
create policy "results_select_admin"
  on results for select
  to authenticated
  using (true);
