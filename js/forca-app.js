/* ===================================================================
   forca-app.js — Motor do jogo "Forca da Cela"

   Mecânica: o jogador tenta adivinhar uma palavra letra por letra.
   Cada erro (ou pedido de dica) constrói uma parte da cela — 6 partes
   fecham a cela e o jogador perde. Palavras vão de fácil a difícil a
   cada rodada vencida. 60 segundos por palavra, com alarme nos 10
   segundos finais.
   =================================================================== */

(function () {
  "use strict";

  const MAX_WRONG = 6;          // partes da cela até fechar
  const TIME_PER_ROUND = 60;    // segundos por palavra
  const ALARM_THRESHOLD = 10;   // segundos finais com alarme

  const state = {
    words: [],          // lista de palavras (na ordem em que serão jogadas)
    roundIndex: 0,        // rodada atual (0-based)
    displayWord: "",        // palavra original (com acentos) para exibir
    normalizedWord: "",       // palavra sem acentos, maiúscula, usada para checar letras
    hint: "",                   // dica da palavra atual
    guessedLetters: [],           // letras (normalizadas) já acertadas
    usedLetters: [],                 // { letter, correct } de todas as tentativas
    wrongCount: 0,                     // partes da cela já construídas (erros + dica)
    hintUsed: false,                     // se a dica já foi usada nesta rodada
    roundsWon: 0,                          // quantas palavras já foram resolvidas
    timeLeft: TIME_PER_ROUND,
    promoIndex: 0
  };

  const dom = {};
  let timerInterval = null;
  let alarmAudioCtx = null;

  /* ---------------- NORMALIZAÇÃO DE ACENTOS ---------------- */
  function stripAccents(s) {
    return s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }

  /* ---------------- DOM ---------------- */
  function cacheDom() {
    dom.introSection = document.getElementById("forcaIntro");
    dom.startBtn = document.getElementById("forcaStartBtn");
    dom.gameSection = document.getElementById("forcaGameSection");
    dom.roundBadge = document.getElementById("forcaRoundBadge");
    dom.timerDisplay = document.getElementById("forcaTimerDisplay");
    dom.cellScene = document.getElementById("forcaCellScene");
    dom.wordDisplay = document.getElementById("forcaWordDisplay");
    dom.hintBtn = document.getElementById("forcaHintBtn");
    dom.hintText = document.getElementById("forcaHintText");
    dom.usedList = document.getElementById("forcaUsedList");
    dom.keyboard = document.getElementById("forcaKeyboard");
    dom.railImg = document.getElementById("forcaRailImg");
    dom.railEmoji = document.getElementById("forcaRailEmoji");
    dom.railTitle = document.getElementById("forcaRailTitle");
    dom.roundResultSection = document.getElementById("forcaRoundResultSection");
    dom.roundResultCard = document.getElementById("forcaRoundResultCard");
    dom.gameoverSection = document.getElementById("forcaGameoverSection");
    dom.gameoverCard = document.getElementById("forcaGameoverCard");
  }

  /* ---------------- CENA DA CELA (SVG) ---------------- */
  function buildCellSceneSVG() {
    let bars = "";
    for (let i = 0; i < MAX_WRONG; i++) {
      const x = 20 + i * 27;
      bars += '<rect class="forca-bar" data-bar="' + (i + 1) + '" x="' + x + '" y="18" width="10" height="220" rx="3" fill="#2B2B2B"></rect>';
    }

    return (
      '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="10" y="8" width="180" height="240" rx="10" fill="none" stroke="#B9C0D6" stroke-width="4"></rect>' +
        '<g class="forca-character" id="forcaCharacter">' +
          '<circle cx="100" cy="80" r="26" fill="#FFD9A0"></circle>' +
          '<circle cx="90" cy="76" r="3.4" fill="#16213E"></circle>' +
          '<circle cx="110" cy="76" r="3.4" fill="#16213E"></circle>' +
          '<path class="forca-mouth-neutral" d="M88,92 Q100,100 112,92" stroke="#16213E" stroke-width="3" fill="none" stroke-linecap="round"></path>' +
          '<path class="forca-mouth-sad" d="M88,96 Q100,88 112,96" stroke="#16213E" stroke-width="3" fill="none" stroke-linecap="round" style="display:none;"></path>' +
          '<rect x="80" y="104" width="40" height="70" rx="12" fill="#FF6B00"></rect>' +
          '<rect x="55" y="110" width="18" height="55" rx="8" fill="#FFD9A0"></rect>' +
          '<rect x="127" y="110" width="18" height="55" rx="8" fill="#FFD9A0"></rect>' +
          '<rect x="82" y="172" width="15" height="50" rx="7" fill="#16213E"></rect>' +
          '<rect x="103" y="172" width="15" height="50" rx="7" fill="#16213E"></rect>' +
        "</g>" +
        bars +
      "</svg>"
    );
  }

  function updateCellScene() {
    const bars = dom.cellScene.querySelectorAll(".forca-bar");
    bars.forEach(function (bar) {
      const idx = Number(bar.getAttribute("data-bar"));
      bar.classList.toggle("visible", idx <= state.wrongCount);
    });
  }

  function setCharacterState(kind) {
    const el = document.getElementById("forcaCharacter");
    if (!el) return;
    el.classList.remove("sad", "dancing", "caught");
    const mouthNeutral = el.querySelector(".forca-mouth-neutral");
    const mouthSad = el.querySelector(".forca-mouth-sad");
    if (kind === "wrong") {
      el.classList.add("sad");
    } else if (kind === "win") {
      el.classList.add("dancing");
    } else if (kind === "lose") {
      el.classList.add("caught");
      if (mouthNeutral) mouthNeutral.style.display = "none";
      if (mouthSad) mouthSad.style.display = "block";
    } else {
      if (mouthNeutral) mouthNeutral.style.display = "block";
      if (mouthSad) mouthSad.style.display = "none";
    }
  }

  /* ---------------- ALARME SONORO (Web Audio API, sem arquivo externo) ---------------- */
  function playAlarmBeep() {
    try {
      if (!alarmAudioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        alarmAudioCtx = new AudioCtx();
      }
      const ctx = alarmAudioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      /* ambiente sem suporte a áudio: falha silenciosa */
    }
  }

  /* ---------------- CRONÔMETRO ---------------- */
  function startTimer() {
    clearInterval(timerInterval);
    state.timeLeft = TIME_PER_ROUND;
    updateTimerDisplay();
    timerInterval = setInterval(function () {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= ALARM_THRESHOLD && state.timeLeft > 0) {
        playAlarmBeep();
      }
      if (state.timeLeft <= 0) {
        clearInterval(timerInterval);
        onTimeUp();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function updateTimerDisplay() {
    const m = Math.floor(Math.max(0, state.timeLeft) / 60);
    const s = Math.max(0, state.timeLeft) % 60;
    dom.timerDisplay.innerHTML = '<i class="fa-regular fa-clock"></i> ' + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    dom.timerDisplay.classList.toggle("warning", state.timeLeft <= ALARM_THRESHOLD && state.timeLeft > 0);
  }

  function onTimeUp() {
    loseRound("tempo");
  }

  /* ---------------- FAIXA LATERAL (promo rail) ---------------- */
  const RAIL_CONTENT = [
    { img: "img/camiseta-cafe.png", emoji: "☕", title: "ESTILO CIÊNCIA" },
    { img: "img/camiseta-gato.png", emoji: "😺", title: "COLEÇÃO PETS" },
    { img: "img/camiseta-fada.png", emoji: "✨", title: "COLEÇÃO EXCLUSIVA" },
    { img: "img/camiseta-sarcasmo.jpg", emoji: "😏", title: "HUMOR CIENTÍFICO" }
  ];
  function cyclePromoRail() {
    const item = RAIL_CONTENT[state.promoIndex % RAIL_CONTENT.length];
    state.promoIndex++;
    if (dom.railImg && dom.railImg.getAttribute("src") !== item.img) {
      dom.railImg.src = item.img;
      dom.railImg.alt = item.title;
    }
    if (dom.railEmoji) dom.railEmoji.textContent = item.emoji;
    if (dom.railTitle) dom.railTitle.textContent = item.title;
  }

  /* ---------------- MONTAGEM DAS PALAVRAS (ordem com leve variedade) ---------------- */
  function buildWordSequence(bank) {
    const groupSize = 10;
    const result = [];
    for (let i = 0; i < bank.length; i += groupSize) {
      const group = bank.slice(i, i + groupSize);
      for (let j = group.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        const tmp = group[j]; group[j] = group[k]; group[k] = tmp;
      }
      result.push.apply(result, group);
    }
    return result;
  }

  /* ---------------- FLUXO PRINCIPAL ---------------- */
  function onStartClick() {
    state.words = buildWordSequence(window.FORCA_WORDS || []);
    state.roundIndex = 0;
    state.roundsWon = 0;

    dom.introSection.hidden = true;
    dom.roundResultSection.hidden = true;
    dom.gameoverSection.hidden = true;
    dom.gameSection.hidden = false;

    buildKeyboard();
    startRound();
    dom.gameSection.scrollIntoView({ behavior: "smooth" });
  }

  function startRound() {
    const entry = state.words[state.roundIndex];
    if (!entry) {
      showAllWordsConqueredScreen();
      return;
    }

    state.displayWord = entry.word;
    state.normalizedWord = stripAccents(entry.word);
    state.hint = entry.hint;
    state.guessedLetters = [];
    state.usedLetters = [];
    state.wrongCount = 0;
    state.hintUsed = false;

    dom.roundBadge.textContent = "Palavra " + (state.roundIndex + 1);
    dom.hintBtn.disabled = false;
    dom.hintBtn.innerHTML = '<i class="fa-solid fa-lightbulb"></i> PEDIR DICA (custa 1 parte da cela)';
    dom.hintText.hidden = true;
    dom.hintText.textContent = "";

    dom.cellScene.innerHTML = buildCellSceneSVG();
    setCharacterState("neutral");
    updateCellScene();
    resetKeyboard();
    renderWordDisplay();
    renderUsedLetters();
    cyclePromoRail();
    startTimer();
  }

  function buildKeyboard() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    dom.keyboard.innerHTML = "";
    letters.forEach(function (letter) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "forca-key ripple";
      btn.textContent = letter;
      btn.setAttribute("data-letter", letter);
      btn.addEventListener("click", function () { guessLetter(letter); });
      dom.keyboard.appendChild(btn);
    });
  }

  function resetKeyboard() {
    const keys = dom.keyboard.querySelectorAll(".forca-key");
    keys.forEach(function (k) {
      k.disabled = false;
      k.classList.remove("correct", "wrong");
    });
  }

  function renderWordDisplay() {
    dom.wordDisplay.innerHTML = "";
    for (let i = 0; i < state.displayWord.length; i++) {
      const normalizedChar = state.normalizedWord[i];
      const revealed = state.guessedLetters.indexOf(normalizedChar) !== -1;
      const span = document.createElement("span");
      span.className = "forca-letter-slot" + (revealed ? " revealed" : "");
      span.textContent = revealed ? state.displayWord[i] : "_";
      dom.wordDisplay.appendChild(span);
    }
  }

  function renderUsedLetters() {
    dom.usedList.innerHTML = "";
    state.usedLetters.forEach(function (u) {
      const chip = document.createElement("span");
      chip.className = "forca-used-chip " + (u.correct ? "correct" : "wrong");
      chip.textContent = u.letter;
      dom.usedList.appendChild(chip);
    });
  }

  function isWordFullyRevealed() {
    for (let i = 0; i < state.normalizedWord.length; i++) {
      if (state.guessedLetters.indexOf(state.normalizedWord[i]) === -1) return false;
    }
    return true;
  }

  function guessLetter(letter) {
    const norm = stripAccents(letter).charAt(0);
    if (!norm || state.usedLetters.some(function (u) { return u.letter === norm; })) return;

    const key = dom.keyboard.querySelector('[data-letter="' + norm + '"]');
    const isCorrect = state.normalizedWord.indexOf(norm) !== -1;

    state.usedLetters.push({ letter: norm, correct: isCorrect });
    if (key) {
      key.disabled = true;
      key.classList.add(isCorrect ? "correct" : "wrong");
    }

    if (isCorrect) {
      state.guessedLetters.push(norm);
      renderWordDisplay();
      renderUsedLetters();
      cyclePromoRail();
      if (isWordFullyRevealed()) {
        winRound();
      }
      return;
    }

    state.wrongCount++;
    updateCellScene();
    setCharacterState("wrong");
    renderUsedLetters();
    cyclePromoRail();

    if (state.wrongCount >= MAX_WRONG) {
      loseRound("erros");
    }
  }

  function onHintClick() {
    if (state.hintUsed) return;
    state.hintUsed = true;
    dom.hintBtn.disabled = true;

    const partsRemaining = MAX_WRONG - state.wrongCount;

    dom.hintText.hidden = false;
    dom.hintText.textContent = "💡 " + state.hint;

    state.wrongCount++;
    updateCellScene();
    cyclePromoRail();

    if (partsRemaining <= 1 || state.wrongCount >= MAX_WRONG) {
      setCharacterState("wrong");
      loseRound("dica");
      return;
    }

    setCharacterState("wrong");
  }

  /* ---------------- FIM DE RODADA ---------------- */
  function winRound() {
    stopTimer();
    setCharacterState("win");
    state.roundsWon++;

    dom.gameSection.hidden = true;
    dom.roundResultCard.innerHTML =
      '<div class="forca-result-emoji">🎉</div>' +
      '<h2 class="forca-result-title">Você acertou!</h2>' +
      '<p class="forca-result-word">A palavra era: <strong>' + state.displayWord + '</strong></p>' +
      '<p class="forca-result-sub">Palavras resolvidas até agora: ' + state.roundsWon + '</p>' +
      '<div class="forca-result-actions">' +
        '<button id="forcaNextRoundBtn" class="btn btn-primary btn-xl ripple"><i class="fa-solid fa-arrow-right"></i> PRÓXIMA PALAVRA (mais difícil)</button>' +
        '<button id="forcaStopHereBtn" class="btn btn-ghost ripple">PARAR POR AQUI</button>' +
      '</div>';
    dom.roundResultSection.hidden = false;
    dom.roundResultSection.scrollIntoView({ behavior: "smooth" });

    document.getElementById("forcaNextRoundBtn").addEventListener("click", function () {
      state.roundIndex++;
      dom.roundResultSection.hidden = true;
      dom.gameSection.hidden = false;
      startRound();
      dom.gameSection.scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("forcaStopHereBtn").addEventListener("click", function () {
      showFinalScreen(true);
    });
  }

  function loseRound(reason) {
    stopTimer();
    setCharacterState("lose");
    ForcaDB.recordResult(state.roundsWon, false);
    setTimeout(function () { showFinalScreen(false, reason); }, 700);
  }

  function showAllWordsConqueredScreen() {
    ForcaDB.recordResult(state.roundsWon, true);
    dom.gameSection.hidden = true;
    dom.roundResultSection.hidden = true;
    dom.gameoverCard.innerHTML =
      '<div class="forca-result-emoji">👑</div>' +
      '<h2 class="forca-result-title">Você venceu TODAS as palavras!</h2>' +
      '<p class="forca-result-sub">Impressionante — você conquistou o banco inteiro de ' + (window.FORCA_WORDS || []).length + ' palavras.</p>' +
      '<div class="forca-result-actions">' +
        '<button id="forcaRestartBtn" class="btn btn-primary btn-xl ripple"><i class="fa-solid fa-rotate-right"></i> JOGAR NOVAMENTE</button>' +
        '<a href="index.html" class="btn btn-ghost ripple">IR PARA O QUIZ</a>' +
      '</div>';
    dom.gameoverSection.hidden = false;
    dom.gameoverSection.scrollIntoView({ behavior: "smooth" });
    document.getElementById("forcaRestartBtn").addEventListener("click", restartGame);
  }

  function showFinalScreen(stoppedByChoice, reason) {
    dom.gameSection.hidden = true;
    dom.roundResultSection.hidden = true;

    let title, emoji, extra;
    if (stoppedByChoice) {
      emoji = "🙂";
      title = "Até a próxima!";
      extra = "";
    } else {
      emoji = "😵";
      title = "A cela se fechou!";
      const reasonText = reason === "tempo"
        ? "O tempo acabou antes de você resolver a palavra."
        : reason === "dica"
          ? "A dica pedida completou a última parte da cela."
          : "Você errou demais e a cela se fechou.";
      extra = '<p class="forca-result-sub">' + reasonText + ' A palavra era: <strong>' + state.displayWord + '</strong></p>';
      ForcaDB.recordResult(state.roundsWon, false);
    }

    dom.gameoverCard.innerHTML =
      '<div class="forca-result-emoji">' + emoji + '</div>' +
      '<h2 class="forca-result-title">' + title + '</h2>' +
      '<p class="forca-result-word">Você resolveu ' + state.roundsWon + ' palavra' + (state.roundsWon === 1 ? "" : "s") + ' nesta partida.</p>' +
      extra +
      '<div class="forca-result-actions">' +
        '<button id="forcaRestartBtn" class="btn btn-primary btn-xl ripple"><i class="fa-solid fa-rotate-right"></i> JOGAR NOVAMENTE</button>' +
        '<a href="index.html" class="btn btn-ghost ripple">IR PARA O QUIZ</a>' +
      '</div>';
    dom.gameoverSection.hidden = false;
    dom.gameoverSection.scrollIntoView({ behavior: "smooth" });
    document.getElementById("forcaRestartBtn").addEventListener("click", restartGame);
  }

  function restartGame() {
    dom.gameoverSection.hidden = true;
    dom.introSection.hidden = false;
    dom.introSection.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------------- TECLADO FÍSICO ---------------- */
  function onPhysicalKeydown(e) {
    if (dom.gameSection.hidden) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const norm = stripAccents(e.key || "").charAt(0);
    if (/^[A-Z]$/.test(norm)) {
      guessLetter(norm);
    }
  }

  /* ---------------- EFEITO RIPPLE (mesmo do resto do site) ---------------- */
  function attachRipple() {
    document.body.addEventListener("click", function (e) {
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

  /* ---------------- INIT ---------------- */
  function init() {
    cacheDom();
    document.getElementById("forcaYear").textContent = new Date().getFullYear();
    attachRipple();

    dom.startBtn.addEventListener("click", onStartClick);
    dom.hintBtn.addEventListener("click", onHintClick);
    document.addEventListener("keydown", onPhysicalKeydown);

    ForcaDB.logPageView();

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
