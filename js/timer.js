/* ===================================================================
   timer.js — Cronômetro de tempo decorrido durante o desafio
   Namespace global: window.QuizTimer
   =================================================================== */

(function () {
  "use strict";

  let startTime = null;
  let intervalId = null;
  let elapsedMs = 0;
  let display = null;

  function pad(n) { return String(n).padStart(2, "0"); }

  function formatMs(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return pad(minutes) + ":" + pad(seconds);
  }

  function tick() {
    elapsedMs = Date.now() - startTime;
    if (display) {
      display.innerHTML = '<i class="fa-regular fa-clock"></i> ' + formatMs(elapsedMs);
    }
  }

  function start() {
    display = document.getElementById("timerDisplay");
    startTime = Date.now();
    elapsedMs = 0;
    clearInterval(intervalId);
    intervalId = setInterval(tick, 1000);
    tick();
  }

  function stop() {
    clearInterval(intervalId);
    elapsedMs = Date.now() - startTime;
    return elapsedMs;
  }

  function reset() {
    clearInterval(intervalId);
    elapsedMs = 0;
    startTime = null;
  }

  function getFormatted() {
    return formatMs(elapsedMs);
  }

  /**
   * Cria uma instância de cronômetro independente (ex: para medir o tempo
   * gasto em cada pergunta, separado do cronômetro total do desafio).
   * Retorna um objeto com start/stop/reset/getElapsedMs próprios.
   */
  function createTimer() {
    let localStart = null;
    let localElapsed = 0;
    let localRunning = false;

    return {
      start: function () {
        localStart = Date.now();
        localRunning = true;
      },
      stop: function () {
        if (localRunning) {
          localElapsed = Date.now() - localStart;
          localRunning = false;
        }
        return localElapsed;
      },
      reset: function () {
        localStart = null;
        localElapsed = 0;
        localRunning = false;
      },
      getElapsedMs: function () {
        return localRunning ? Date.now() - localStart : localElapsed;
      }
    };
  }

  window.QuizTimer = {
    start: start,
    stop: stop,
    reset: reset,
    getFormatted: getFormatted,
    formatMs: formatMs,
    createTimer: createTimer
  };
})();
