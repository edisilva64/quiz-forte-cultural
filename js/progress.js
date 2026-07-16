/* ===================================================================
   progress.js — Controle da barra de progresso e label "Questão X de Y"
   Namespace global: window.QuizProgress
   =================================================================== */

(function () {
  "use strict";

  const els = {};

  function init() {
    els.label = document.getElementById("progressLabel");
    els.bar = document.getElementById("progressBar");
    els.fill = document.getElementById("progressFill");
  }

  /**
   * Atualiza a barra de progresso.
   * @param {number} current - índice da questão atual (1-based)
   * @param {number} total - total de questões
   */
  function update(current, total) {
    if (!els.fill) init();
    const percent = Math.round((current / total) * 100);
    els.label.textContent = "Questão " + current + " de " + total;
    els.fill.style.width = percent + "%";
    els.bar.setAttribute("aria-valuenow", String(percent));
  }

  function reset() {
    if (!els.fill) init();
    els.fill.style.width = "0%";
    els.bar.setAttribute("aria-valuenow", "0");
  }

  window.QuizProgress = { init: init, update: update, reset: reset };
})();
