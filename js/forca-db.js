/* ===================================================================
   forca-db.js — Integração com o Supabase para o jogo "Forca da Cela"

   Responsabilidades:
   - Registrar um acesso na tabela `forca_page_views` (contador
     PRÓPRIO deste jogo, separado do contador do quiz)
   - Registrar o resultado de cada partida (opcional, usado só para
     estatísticas futuras) na tabela `forca_results`

   Assim como em js/db.js, este módulo é tolerante a falhas: se o
   Supabase não estiver configurado, tudo aqui vira um no-op silencioso
   e o jogo continua funcionando normalmente.
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

  /** Registra 1 acesso à Forca (contador próprio, visível em admin.html). */
  async function logPageView() {
    const sb = getClient();
    if (!sb) return;
    try {
      await sb.from("forca_page_views").insert({});
    } catch (e) {
      /* falha silenciosa */
    }
  }

  /** Registra o resultado de uma partida (quantas rodadas venceu antes de perder ou parar). */
  async function recordResult(roundsWon, wonAll) {
    const sb = getClient();
    if (!sb) return;
    try {
      await sb.from("forca_results").insert({ rounds_won: roundsWon, won_all: !!wonAll });
    } catch (e) {
      /* falha silenciosa */
    }
  }

  window.ForcaDB = {
    logPageView: logPageView,
    recordResult: recordResult
  };
})();
