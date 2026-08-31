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
   * Cicla indefinidamente a cada 5 perguntas, já que o jogo agora pode ter
   * múltiplos blocos de 10 (sem limite fixo de 15).
   * @param {number} zeroBasedIndex - índice cumulativo da pergunta (0, 1, 2...)
   */
  function getPromoKeyForIndex(zeroBasedIndex) {
    const keys = ["cafe", "gato", "fada"];
    const cycle = Math.floor(zeroBasedIndex / 5) % keys.length;
    return keys[cycle];
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
  function renderResultCard(el, level, score, total, timeFormatted, highestTierName) {
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    const tierInfo = highestTierName
      ? '<div class="stat-box"><div class="stat-value" style="font-size:1.05rem;">' + highestTierName + '</div><div class="stat-label">NÍVEL ALCANÇADO</div></div>'
      : "";
    el.innerHTML =
      '<div class="result-emoji">' + level.emoji + '</div>' +
      '<div class="result-level" style="color:' + level.color + '">' + level.title + '</div>' +
      '<div class="result-score">Você acertou ' + score + ' de ' + total + ' perguntas</div>' +
      '<p class="result-message">' + level.message + '</p>' +
      '<div class="stats-grid">' +
        '<div class="stat-box"><div class="stat-value">' + timeFormatted + '</div><div class="stat-label">TEMPO TOTAL</div></div>' +
        '<div class="stat-box"><div class="stat-value">' + score + '</div><div class="stat-label">ACERTOS</div></div>' +
        '<div class="stat-box"><div class="stat-value">' + (total - score) + '</div><div class="stat-label">ERROS</div></div>' +
        '<div class="stat-box"><div class="stat-value">' + accuracy + '%</div><div class="stat-label">PRECISÃO</div></div>' +
        tierInfo +
      '</div>' +
      '<div class="community-stats loading" id="communityStatsBlock"></div>';
  }

  /**
   * Preenche o bloco de estatísticas da comunidade com mensagens sempre
   * positivas/incentivadoras — nunca como um placar crítico de "perdeu".
   * A comparação usa PRECISÃO (%), não o número bruto de acertos, já que
   * cada jogador pode ter respondido uma quantidade diferente de perguntas
   * (o jogo agora tem blocos progressivos de 10, sem total fixo).
   * @param {HTMLElement} el - o container #communityStatsBlock
   * @param {object|null} stats - { players, avgScore, avgTimeMs, avgAccuracy } ou null
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

    const myAccuracy = total > 0 ? (score / total) * 100 : 0;
    const avgAccuracyText = stats.avgAccuracy !== null && stats.avgAccuracy !== undefined
      ? stats.avgAccuracy.toFixed(0)
      : null;
    const avgTimeText = stats.avgTimeMs !== null ? window.QuizTimer.formatMs(stats.avgTimeMs) : null;

    let scoreMsg;
    if (avgAccuracyText === null) {
      scoreMsg = null;
    } else if (myAccuracy - stats.avgAccuracy >= 3) {
      scoreMsg = 'Sua precisão ficou acima da média geral dos jogadores — <strong>mandou muito bem!</strong> 🎉 (média geral: ' + avgAccuracyText + '%)';
    } else if (myAccuracy - stats.avgAccuracy > -3) {
      scoreMsg = 'Sua precisão ficou bem próxima da média geral dos jogadores — <strong>ótimo equilíbrio!</strong> 👏 (média geral: ' + avgAccuracyText + '%)';
    } else {
      scoreMsg = 'A precisão média geral dos jogadores é ' + avgAccuracyText + '%. <strong>Jogue de novo e mostre do que você é capaz!</strong> 💪';
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

  /* ---------- TELA DE "BLOCO CONCLUÍDO" (continuar ou parar) ---------- */
  /**
   * Renderiza a tela intermediária mostrada ao final de cada bloco de 10
   * perguntas, avisando que o próximo bloco será mais difícil.
   */
  function renderBlockComplete(el, opts) {
    const blockScore = opts.blockScore;
    const blockTotal = opts.blockTotal;
    const blockNumber = opts.blockNumber;     // 1-based
    const totalBlocks = opts.totalBlocks;
    const overallScore = opts.overallScore;
    const overallTotal = opts.overallTotal;
    const nextZoneName = opts.nextZoneName;
    const isLastBlock = blockNumber >= totalBlocks;

    const accuracy = blockTotal > 0 ? Math.round((blockScore / blockTotal) * 100) : 0;

    el.innerHTML =
      '<div class="block-complete-card">' +
        '<div class="block-complete-emoji">🎉</div>' +
        '<h2 class="block-complete-title">Bloco ' + blockNumber + ' de ' + totalBlocks + ' concluído!</h2>' +
        '<p class="block-complete-score">Você acertou ' + blockScore + ' de ' + blockTotal + ' nesta parte (' + accuracy + '%)</p>' +
        '<p class="block-complete-overall">No total, até agora: ' + overallScore + ' de ' + overallTotal + ' perguntas certas.</p>' +
        (isLastBlock
          ? '<p class="block-complete-warning">🏁 Você chegou ao fim do banco de perguntas — o mais difícil que existe por aqui! Hora de ver seu resultado final.</p>'
          : '<p class="block-complete-warning">⚠️ As próximas 10 perguntas serão um pouco mais difíceis que as anteriores' + (nextZoneName ? ' (nível ' + nextZoneName + ')' : '') + '.</p>'
        ) +
        '<div class="block-complete-actions">' +
          (isLastBlock
            ? '<button id="blockFinishBtn" class="btn btn-primary btn-xl ripple">VER RESULTADO FINAL</button>'
            : '<button id="blockContinueBtn" class="btn btn-primary btn-xl ripple"><i class="fa-solid fa-arrow-right"></i> CONTINUAR</button>' +
              '<button id="blockStopBtn" class="btn btn-ghost ripple">PARAR E VER RESULTADO</button>'
          ) +
        '</div>' +
      '</div>';
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

  /**
   * Renderiza os cartões de escolha de módulo (Quiz Geral / Quiz Turismo).
   * @param {HTMLElement} el - container onde os cartões serão inseridos
   * @param {Array} modules - QuizData.QUIZ_MODULES (nome, cor, ícone, descrição)
   * @param {Function} onSelect - callback(moduleKey) ao clicar em um cartão
   */

  window.QuizUI = {
    attachRipple: attachRipple,
    renderQuestion: renderQuestion,
    markAnswer: markAnswer,
    updatePromoRail: updatePromoRail,
    renderResultCard: renderResultCard,
    renderCommunityStats: renderCommunityStats,
    renderBlockComplete: renderBlockComplete,
    renderReview: renderReview
  };
})();
