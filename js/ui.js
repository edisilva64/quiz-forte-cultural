/* ===================================================================
   ui.js — Renderização de elementos visuais (perguntas, opções,
   banners promocionais, cartão de resultado, correção e estatísticas)
   Namespace global: window.QuizUI
   =================================================================== */

(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D"];

  /* ---------- RIPPLE EFFECT ---------- */
  function attachRipple(root) {
    root.addEventListener("click", function (e) {
      const btn = e.target.closest(".ripple");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      circle.className = "ripple-circle";
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = (e.clientX - rect.left - size / 2) + "px";
      circle.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(circle);
      setTimeout(function () { circle.remove(); }, 650);
    });
  }

  /* ---------- RENDER PERGUNTA ---------- */
  function renderQuestion(stageEl, q, index, total, onAnswer) {
    const card = document.createElement("div");
    card.className = "question-card";
    card.setAttribute("role", "group");
    card.setAttribute("aria-label", "Questão " + index + " de " + total);

    const number = document.createElement("span");
    number.className = "question-number";
    number.textContent = "PERGUNTA " + index + "/" + total;
    card.appendChild(number);

    // Badge do cronômetro de pressão (contagem progressiva desta pergunta)
    const timerBadge = document.createElement("span");
    timerBadge.className = "question-timer-badge";
    timerBadge.id = "questionTimerBadge";
    timerBadge.setAttribute("aria-hidden", "true"); // decorativo, não essencial ao conteúdo
    timerBadge.innerHTML = '<i class="fa-solid fa-stopwatch"></i> 00:00';
    card.appendChild(timerBadge);

    const text = document.createElement("h2");
    text.className = "question-text";
    text.textContent = q.question;
    card.appendChild(text);

    const grid = document.createElement("div");
    grid.className = "options-grid";
    grid.setAttribute("role", "radiogroup");
    grid.setAttribute("aria-label", "Alternativas");

    q.options.forEach(function (opt, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", "false");

      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = LETTERS[i];
      btn.appendChild(letter);

      const label = document.createElement("span");
      label.textContent = opt;
      btn.appendChild(label);

      btn.addEventListener("click", function () {
        onAnswer(i, btn, grid);
      });

      grid.appendChild(btn);
    });

    card.appendChild(grid);
    stageEl.innerHTML = "";
    stageEl.appendChild(card);
    return card;
  }

  /** Marca visualmente a resposta selecionada e a correta, desabilitando o grupo */
  function markAnswer(grid, correctIndex, selectedIndex) {
    const buttons = Array.from(grid.children);
    buttons.forEach(function (btn, i) {
      btn.classList.add("disabled");
      btn.setAttribute("aria-checked", i === selectedIndex ? "true" : "false");
      if (i === correctIndex) {
        btn.classList.add("correct");
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-check";
        btn.appendChild(icon);
      } else if (i === selectedIndex) {
        btn.classList.add("wrong");
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-xmark";
        btn.appendChild(icon);
      }
    });
  }

  /* ---------- FAIXA LATERAL (PROMO RAIL) ----------
     Não interrompe mais o quiz: fica sempre visível ao lado (ou acima,
     em telas menores) e a imagem troca a cada 5 perguntas. */
  const PROMO_CONTENT = {
    cafe: {
      img: "img/camiseta-cafe.png",
      emoji: "☕",
      title: "ESTILO CIÊNCIA",
      text: "Inteligência também se veste.",
      cta: "VER CAMISETA"
    },
    gato: {
      img: "img/camiseta-gato.png",
      emoji: "😺",
      title: "COLEÇÃO PETS",
      text: "Arte exclusiva para quem ama animais.",
      cta: "QUERO ESSA"
    },
    fada: {
      img: "img/camiseta-fada.png",
      emoji: "✨",
      title: "COLEÇÃO EXCLUSIVA",
      text: "Vista sua personalidade.",
      cta: "EXPLORAR LOJA"
    }
  };

  /**
   * Retorna a chave de produto (cafe/gato/fada) de acordo com a pergunta atual.
   * @param {number} zeroBasedIndex - índice da pergunta (0 a total-1)
   */
  function getPromoKeyForIndex(zeroBasedIndex) {
    if (zeroBasedIndex < 5) return "cafe";
    if (zeroBasedIndex < 10) return "gato";
    return "fada";
  }

  /** Atualiza o conteúdo da faixa lateral (chamado a cada pergunta renderizada) */
  function updatePromoRail(zeroBasedIndex) {
    const key = getPromoKeyForIndex(zeroBasedIndex);
    const data = PROMO_CONTENT[key];
    if (!data) return;

    const img = document.getElementById("promoRailImg");
    const emoji = document.getElementById("promoRailEmoji");
    const title = document.getElementById("promoRailTitle");
    const text = document.getElementById("promoRailText");
    const cta = document.getElementById("promoRailCta");

    if (img && img.getAttribute("src") !== data.img) {
      img.src = data.img;
      img.alt = data.title;
    }
    if (emoji) emoji.textContent = data.emoji;
    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (cta) cta.textContent = data.cta;
  }

  /* ---------- RESULTADO ---------- */
  function renderResultCard(el, level, score, total, timeFormatted) {
    el.innerHTML =
      '<div class="result-emoji">' + level.emoji + '</div>' +
      '<div class="result-level" style="color:' + level.color + '">' + level.title + '</div>' +
      '<div class="result-score">Você acertou ' + score + ' de ' + total + ' perguntas</div>' +
      '<p class="result-message">' + level.message + '</p>' +
      '<div class="stats-grid">' +
        '<div class="stat-box"><div class="stat-value">' + timeFormatted + '</div><div class="stat-label">TEMPO TOTAL</div></div>' +
        '<div class="stat-box"><div class="stat-value">' + score + '</div><div class="stat-label">ACERTOS</div></div>' +
        '<div class="stat-box"><div class="stat-value">' + (total - score) + '</div><div class="stat-label">ERROS</div></div>' +
        '<div class="stat-box"><div class="stat-value">' + Math.round((score / total) * 100) + '%</div><div class="stat-label">PRECISÃO</div></div>' +
      '</div>' +
      '<div class="community-stats loading" id="communityStatsBlock"></div>';
  }

  /**
   * Preenche o bloco de estatísticas da comunidade com mensagens sempre
   * positivas/incentivadoras — nunca como um placar crítico de "perdeu".
   * @param {HTMLElement} el - o container #communityStatsBlock
   * @param {object|null} stats - { players, avgScore, avgTimeMs } ou null
   * @param {number} score, total, timeMs - dados do jogador atual
   */
  function renderCommunityStats(el, stats, score, total, timeMs) {
    if (!el) return;
    el.classList.remove("loading");

    // Sem dados suficientes ainda (banco não configurado ou poucas partidas registradas)
    if (!stats || !stats.players || stats.players < 1) {
      el.innerHTML =
        '<div class="community-card">' +
          '<span class="community-card-icon"><i class="fa-solid fa-rocket"></i></span>' +
          '<span class="community-card-text">Você é um dos primeiros a encarar esse desafio! Em breve, mais jogadores vão aparecer aqui para você comparar sua evolução. 🚀</span>' +
        '</div>';
      return;
    }

    const avgScoreText = stats.avgScore !== null ? stats.avgScore.toFixed(1).replace(".", ",") : null;
    const avgTimeText = stats.avgTimeMs !== null ? window.QuizTimer.formatMs(stats.avgTimeMs) : null;

    let scoreMsg;
    if (avgScoreText === null) {
      scoreMsg = null;
    } else if (score - stats.avgScore >= 1) {
      scoreMsg = 'Você acertou mais que a média geral dos jogadores — <strong>mandou muito bem!</strong> 🎉 (média: ' + avgScoreText + '/' + total + ')';
    } else if (score - stats.avgScore > -1) {
      scoreMsg = 'Você ficou bem próximo da média geral dos jogadores — <strong>ótimo equilíbrio!</strong> 👏 (média: ' + avgScoreText + '/' + total + ')';
    } else {
      scoreMsg = 'A média geral dos jogadores é ' + avgScoreText + '/' + total + '. <strong>Jogue de novo e mostre do que você é capaz!</strong> 💪';
    }

    let timeMsg;
    if (avgTimeText === null) {
      timeMsg = null;
    } else if (timeMs <= stats.avgTimeMs) {
      timeMsg = 'Você foi mais rápido que a média geral (' + avgTimeText + ') — <strong>ótimos reflexos!</strong> ⚡';
    } else {
      timeMsg = 'Você levou seu tempo para pensar com calma — <strong>capricho vale mais que pressa!</strong> 🧠 (média geral: ' + avgTimeText + ')';
    }

    let html = '<div class="community-card">' +
      '<span class="community-card-icon"><i class="fa-solid fa-users"></i></span>' +
      '<span class="community-card-text">Já são <strong>' + stats.players + ' desafiantes</strong> que encararam o Desafio Lógico Forte Cultural!</span>' +
    '</div>';

    if (scoreMsg) {
      html += '<div class="community-card"><span class="community-card-icon"><i class="fa-solid fa-star"></i></span><span class="community-card-text">' + scoreMsg + '</span></div>';
    }
    if (timeMsg) {
      html += '<div class="community-card"><span class="community-card-icon"><i class="fa-solid fa-stopwatch"></i></span><span class="community-card-text">' + timeMsg + '</span></div>';
    }

    el.innerHTML = html;
  }

  function renderReview(el, answers, questions) {
    el.innerHTML = "";
    questions.forEach(function (q, i) {
      const userIndex = answers[i];
      const isCorrect = userIndex === q.correctIndex;

      const item = document.createElement("div");
      item.className = "review-item " + (isCorrect ? "correct" : "wrong");
      item.style.setProperty("--i", i);

      item.innerHTML =
        '<div class="review-q"><i class="fa-solid ' + (isCorrect ? "fa-circle-check" : "fa-circle-xmark") + '"></i>' +
        '<span>' + (i + 1) + '. ' + q.question + '</span></div>' +
        '<div class="review-row"><strong>Sua resposta:</strong> ' + (q.options[userIndex] !== undefined ? q.options[userIndex] : "Não respondida") + '</div>' +
        (isCorrect ? "" : '<div class="review-row"><strong>Resposta correta:</strong> ' + q.options[q.correctIndex] + '</div>') +
        '<div class="review-explain">' + q.explanation + '</div>';

      el.appendChild(item);
    });
  }

  window.QuizUI = {
    attachRipple: attachRipple,
    renderQuestion: renderQuestion,
    markAnswer: markAnswer,
    updatePromoRail: updatePromoRail,
    renderResultCard: renderResultCard,
    renderCommunityStats: renderCommunityStats,
    renderReview: renderReview
  };
})();
