/* ===================================================================
   sw.js — Service Worker do Desafio Lógico Forte Cultural
   Estratégia: cache-first para assets estáticos (app shell)
   =================================================================== */

const CACHE_NAME = "forte-cultural-v5";

const ASSETS_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/animations.css",
  "./css/responsive.css",
  "./css/dark.css",
  "./js/db.js",
  "./js/quiz.js",
  "./js/progress.js",
  "./js/timer.js",
  "./js/confetti.js",
  "./js/certificate.js",
  "./js/share.js",
  "./js/ui.js",
  "./js/app.js",
  "./img/logo.png",
  "./img/camiseta-cafe.png",
  "./img/camiseta-gato.png",
  "./img/camiseta-fada.png",
  "./favicon.ico"
];

// Arquivos que NUNCA devem ser guardados em cache — sempre buscados direto
// da rede. js/config.js guarda as chaves do usuário (que mudam sem gerar
// uma nova versão do site) e admin.html é a página administrativa, que
// deve sempre refletir o estado mais atual do banco de dados.
const NEVER_CACHE = ["/js/config.js", "/admin.html"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  // Ignora requisições que não sejam GET (ex: CDNs de terceiros como fontes/ícones seguem direto pra rede)
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) return; // deixa passar direto (Google Fonts, Font Awesome, jsPDF etc.)

  // Arquivos sensíveis a mudanças frequentes: sempre busca da rede, nunca
  // guarda nem lê do cache (evita servir credenciais antigas ou dados
  // desatualizados no painel administrativo).
  const isNeverCache = NEVER_CACHE.some(function (path) { return url.pathname.endsWith(path); });
  if (isNeverCache) {
    event.respondWith(fetch(event.request).catch(function () { return caches.match(event.request); }));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;

      return fetch(event.request)
        .then(function (response) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function () {
          // Fallback offline básico para navegação
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
