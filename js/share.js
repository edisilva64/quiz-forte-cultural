/* ===================================================================
   share.js — Compartilhamento do resultado (WhatsApp, Facebook,
   Telegram, X, copiar link e Web Share API nativa)
   Namespace global: window.QuizShare
   =================================================================== */

(function () {
  "use strict";

  const PAGE_URL = "https://edisilva64.github.io/quiz-forte-cultural/";

  function buildMessage(levelTitle, score, total) {
    return "🧠 Acabei de fazer o Desafio Lógico Forte Cultural e conquistei o título de \"" +
      levelTitle + "\" com " + score + "/" + total + " acertos! Será que você consegue superar? 👉 " + PAGE_URL;
  }

  function openPopup(url) {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  }

  function shareTo(network, ctx) {
    const message = buildMessage(ctx.levelTitle, ctx.score, ctx.total);
    const encodedMsg = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(PAGE_URL);

    switch (network) {
      case "whatsapp":
        openPopup("https://api.whatsapp.com/send?text=" + encodedMsg);
        break;
      case "facebook":
        // OBS: o Facebook, por política própria (antispam), frequentemente
        // ignora o texto customizado (`quote`) e mostra apenas o og:title /
        // og:description cadastrados no <head> do site — isso não é algo que
        // dá para controlar 100% via código. Ainda assim, mantemos o `quote`
        // porque em vários cenários (app do Facebook, alguns navegadores) ele
        // aparece pré-preenchido no post.
        openPopup("https://www.facebook.com/sharer.php?u=" + encodedUrl + "&quote=" + encodedMsg);
        break;
      case "telegram":
        openPopup("https://t.me/share/url?url=" + encodedUrl + "&text=" + encodedMsg);
        break;
      case "x":
        openPopup("https://twitter.com/intent/tweet?text=" + encodedMsg);
        break;
      case "copy":
        copyToClipboard(message);
        break;
      case "native":
        nativeShare(message);
        break;
    }
  }

  function copyToClipboard(text) {
    const feedback = document.getElementById("shareFeedback");
    const done = function () {
      if (feedback) {
        feedback.textContent = "✅ Link copiado para a área de transferência!";
        setTimeout(function () { feedback.textContent = ""; }, 3000);
      }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, cb) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand("copy"); } catch (e) { /* noop */ }
    document.body.removeChild(textarea);
    cb();
  }

  function nativeShare(text) {
    if (navigator.share) {
      navigator.share({ title: "Desafio Lógico Forte Cultural", text: text, url: PAGE_URL })
        .catch(function (err) {
          // Se o usuário simplesmente cancelou o compartilhamento, não faz nada.
          // Em qualquer outra falha (ex: computador sem app de compartilhamento
          // configurado), copia o link como alternativa — assim o botão nunca
          // fica "sem reação" ao ser clicado.
          if (!err || err.name !== "AbortError") {
            copyToClipboard(text);
          }
        });
    } else {
      // Navegador não suporta a Web Share API: copia como alternativa.
      copyToClipboard(text);
    }
  }

  function checkNativeSupport() {
    const btn = document.querySelector('[data-share="native"]');
    if (btn && navigator.share) {
      btn.hidden = false;
    }
  }

  window.QuizShare = {
    shareTo: shareTo,
    checkNativeSupport: checkNativeSupport,
    buildMessage: buildMessage
  };
})();
