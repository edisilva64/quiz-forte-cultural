/* ===================================================================
   config.js — Credenciais do banco de dados (Supabase)
   ===================================================================

   >>> IMPORTANTE <<<
   Substitua os dois valores abaixo pelos dados do SEU projeto Supabase
   (gratuito). Veja o passo a passo completo no README.md, seção
   "Configurando o banco de dados (Supabase)".

   Onde encontrar esses valores no painel do Supabase:
   Project Settings → API → "Project URL" e "anon public" key.

   Enquanto esses valores não forem preenchidos, o site continua
   funcionando normalmente (usa o banco de perguntas local e não mostra
   as estatísticas de outros jogadores) — nada quebra.

   >>> ATENÇÃO AO ATUALIZAR O SITE NO FUTURO <<<
   Este arquivo é o ÚNICO que contém suas chaves reais. Sempre que você
   receber uma nova versão do projeto (novo .zip) e for subir os
   arquivos para o GitHub, ESTE arquivo específico virá de novo com os
   valores de exemplo abaixo — porque quem gerou o zip não tem acesso
   às suas chaves. Depois de subir os arquivos novos, sempre volte
   aqui (no GitHub, edite js/config.js) e cole suas chaves reais de
   novo, ou o site perde a conexão com o banco de dados.
   =================================================================== */

window.QUIZ_CONFIG = {
   SUPABASE_URL: "https://gilesysnjjdaqoaytqbw.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_EJmUOI8XDOhgWn2BWzmdUg_hEHds9-F"
};
