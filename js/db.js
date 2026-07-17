/* ===================================================================
   db.js — Camada de acesso ao banco de dados (Supabase)

   Responsabilidades:
   - Buscar o banco de questões da tabela `questions`
   - Registrar o resultado de cada partida na tabela `results`
   - Calcular estatísticas gerais (média de acertos e de tempo) via RPC
   - Registrar um acesso na tabela `page_views` (contador só para o admin)

   Este módulo é "silenciosamente tolerante a falhas": se o Supabase não
   estiver configurado (js/config.js com valores padrão) ou a rede falhar,
   todas as funções retornam `null`/não fazem nada, e o app.js já sabe
   usar o banco de perguntas local (fallback) nesse caso.
   =================================================================== */

(function () {
  "use strict";

  let client = null;
  let clientChecked = false;

  function getClient() {
    if (clientChecked) return client;
    clientChecked = true;

    const cfg = window.QUIZ_CONFIG;
    const notConfigured =
      !cfg ||
      !cfg.SUPABASE_URL ||
      !cfg.SUPABASE_ANON_KEY ||
      cfg.SUPABASE_URL.indexOf("SUBSTITUA") !== -1;

    if (notConfigured) return null;
    if (!window.supabase || typeof window.supabase.createClient !== "function") return null;

    try {
      client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    } catch (e) {
      client = null;
    }
    return client;
  }

  /** Busca o banco de questões no Supabase. Retorna null se indisponível. */
  async function fetchQuestionPool() {
    const sb = getClient();
    if (!sb) return null;

    try {
      const { data, error } = await sb.from("questions").select("*");
      if (error || !data || !data.length) return null;

      return data.map(function (row) {
        return {
          id: row.id,
          question: row.question,
          options: row.options,
          correctIndex: row.correct_index,
          explanation: row.explanation
        };
      });
    } catch (e) {
      return null;
    }
  }

  /** Registra o resultado da partida (fire-and-forget, não bloqueia a UI). */
  async function recordResult(score, total, timeMs) {
    const sb = getClient();
    if (!sb) return;
    try {
      await sb.from("results").insert({ score: score, total: total, time_ms: Math.round(timeMs) });
    } catch (e) {
      /* falha silenciosa: estatísticas são um extra, não podem travar o app */
    }
  }

  /**
   * Retorna { players, avgScore, avgTimeMs } com base em todas as partidas
   * já registradas, ou null se o banco não estiver configurado/disponível.
   */
  async function getStats() {
    const sb = getClient();
    if (!sb) return null;

    try {
      const { data, error } = await sb.rpc("get_stats");
      if (error || !data || !data.length) return null;

      const row = data[0];
      return {
        players: Number(row.players) || 0,
        avgScore: row.avg_score !== null ? Number(row.avg_score) : null,
        avgTimeMs: row.avg_time_ms !== null ? Number(row.avg_time_ms) : null
      };
    } catch (e) {
      return null;
    }
  }

  /** Registra 1 acesso à página (contador privado, visível só em admin.html). */
  async function logPageView() {
    const sb = getClient();
    if (!sb) return;
    try {
      await sb.from("page_views").insert({});
    } catch (e) {
      /* falha silenciosa */
    }
  }

  window.QuizDB = {
    isConfigured: function () { return !!getClient(); },
    fetchQuestionPool: fetchQuestionPool,
    recordResult: recordResult,
    getStats: getStats,
    logPageView: logPageView
  };
})();
