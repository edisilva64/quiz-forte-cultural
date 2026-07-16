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

  /* ---------- BANNERS PROMOCIONAIS ---------- */
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

  function renderPromo(slotEl, key) {
    const data = PROMO_CONTENT[key];
    if (!data) { slotEl.hidden = true; return; }

    slotEl.innerHTML =
      '<div class="promo-banner">' +
        '<div class="promo-mockup"><img src="' + data.img + '" alt="' + data.title + '" loading="lazy" width="160" height="200"></div>' +
        '<div>' +
          '<span class="promo-emoji">' + data.emoji + '</span>' +
          '<div class="promo-title">' + data.title + '</div>' +
          '<p class="promo-text">' + data.text + '</p>' +
          '<a class="btn btn-primary ripple" href="https://umapenca.com/fortecultural/" target="_blank" rel="noopener">' + data.cta + '</a>' +
        '</div>' +
      '</div>';
    slotEl.hidden = false;
  }

  function hidePromo(slotEl) {
    slotEl.hidden = true;
    slotEl.innerHTML = "";
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

  window.QuizUI = {
    attachRipple: attachRipple,
    renderQuestion: renderQuestion,
    markAnswer: markAnswer,
    renderPromo: renderPromo,
    hidePromo: hidePromo,
    renderResultCard: renderResultCard,
    renderReview: renderReview
  };
})();
