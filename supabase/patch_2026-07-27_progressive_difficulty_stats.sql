-- ===================================================================
-- PATCH — atualiza a função get_stats() para incluir a média de
-- PRECISÃO (%), necessária porque agora o total de perguntas varia
-- por partida (o jogador pode parar em qualquer bloco de 10).
--
-- COMO USAR: cole este arquivo inteiro no SQL Editor do Supabase e
-- clique em "Run". Não apaga nenhum dado — só redefine a função.
-- ===================================================================

create or replace function get_stats()
returns table (players bigint, avg_score numeric, avg_time_ms numeric, avg_accuracy numeric)
language sql
security definer
set search_path = public
as $$
  select
    count(*)::bigint as players,
    avg(score)::numeric as avg_score,
    avg(time_ms)::numeric as avg_time_ms,
    avg(case when total > 0 then (score::numeric / total::numeric) * 100 else null end)::numeric as avg_accuracy
  from results;
$$;

grant execute on function get_stats() to anon, authenticated;
