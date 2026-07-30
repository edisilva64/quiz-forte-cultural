/* ===================================================================
   app.js — Orquestrador principal: liga todos os módulos entre si

   FLUXO DE JOGO (blocos progressivos de dificuldade):
   As perguntas são divididas em 10 níveis de dificuldade (do mais fácil
   ao mais difícil). A cada rodada, o jogador responde um bloco de 10
   perguntas sorteadas dentro do nível atual. Ao final do bloco, escolhe
   entre continuar (nível mais difícil) ou parar e ver o resultado.
   =================================================================== */

(function () {
  "use strict";

  const state = {
    tiers: [],              // 10 arrays de perguntas, da mais fácil à mais difícil
    tierIndex: 0,            // nível atual (0-based)
    blockQuestions: [],       // as 10 perguntas do bloco atual
    indexInBlock: 0,           // posição dentro do bloco atual (0-9)
    allQuestions: [],           // TODAS as perguntas já respondidas nesta partida (cumulativo)
    allAnswers: [],               // respostas correspondentes a allQuestions
    allTimes: [],                  // tempo (ms) gasto em cada uma
    answered: false
  };

  const dom = {};

  // Cronômetro independente que mede o tempo gasto na pergunta atual
  // (separado do cronômetro total exibido no topo). Usado só para criar
  // uma sensação de urgência/pressão visual — não penaliza o usuário.
  let questionTimer = null;
  let questionTimerInterval = null;
  const PRESSURE_THRESHOLD_MS = 15000; // após 15s, o badge fica "vermelho"

  function cacheDom() {
    dom.startBtn = document.getElementById("startBtn");
    dom.heroSection = document.getElementById("hero");
    dom.quizSection = document.getElementById("quizSection");
    dom.blockCompleteSection = document.getElementById("blockCompleteSection");
    dom.blockCompleteContainer = document.getElementById("blockCompleteContainer");
    dom.resultSection = document.getElementById("resultSection");
    dom.questionStage = document.getElementById("questionStage");
    dom.tierBadge = document.getElementById("tierBadge");
    dom.resultCard = document.getElementById("resultCard");
    dom.reviewList = document.getElementById("reviewList");
    dom.restartBtn = document.getElementById("restartBtn");
    dom.certBtn = document.getElementById("certBtn");
    dom.certName = document.getElementById("certName");
    dom.darkToggle = document.getElementById("darkToggle");
  }

  /* ---------------- CRONÔMETRO POR PERGUNTA ---------------- */

  function startQuestionTimer() {
    questionTimer = QuizTimer.createTimer();
    questionTimer.start();
    clearInterval(questionTimerInterval);
    questionTimerInterval = setInterval(updateQuestionTimerDisplay, 250);
    updateQuestionTimerDisplay();
  }

  function updateQuestionTimerDisplay() {
    const badge = document.getElementById("questionTimerBadge");
    if (!badge || !questionTimer) return;
    const ms = questionTimer.getElapsedMs();
    badge.innerHTML = '<i class="fa-solid fa-stopwatch"></i> ' + QuizTimer.formatMs(ms);
    badge.classList.toggle("pressure", ms >= PRESSURE_THRESHOLD_MS);
  }

  function stopQuestionTimer() {
    clearInterval(questionTimerInterval);
    const ms = questionTimer ? questionTimer.stop() : 0;
    return ms;
  }

  /* ---------------- FLUXO PRINCIPAL ---------------- */

  async function startQuiz() {
    // Estado visual de carregamento (busca de perguntas pode levar um instante)
    dom.startBtn.disabled = true;
    const originalBtnHtml = dom.startBtn.innerHTML;
    dom.startBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> PREPARANDO SEU DESAFIO...';

    let pool = await QuizDB.fetchQuestionPool();
    if (!pool || !pool.length) {
      pool = QuizData.FALLBACK_QUESTIONS; // banco indisponível/não configurado: usa o pool local
    }

    state.tiers = QuizData.buildDifficultyTiers(pool);
    state.tierIndex = 0;
    state.allQuestions = [];
    state.allAnswers = [];
    state.allTimes = [];
    state.indexInBlock = 0;
    state.answered = false;
    loadBlockForCurrentTier();

    dom.startBtn.disabled = false;
    dom.startBtn.innerHTML = originalBtnHtml;

    dom.heroSection.hidden = true;
    dom.blockCompleteSection.hidden = true;
    dom.resultSection.hidden = true;
    dom.quizSection.hidden = false;

    QuizProgress.reset();
    QuizTimer.start();

    renderCurrentQuestion();
    dom.quizSection.scrollIntoView({ behavior: "smooth" });
  }

  /** Sorteia as 10 perguntas do bloco atual, dentro do tier ativo */
  function loadBlockForCurrentTier() {
    state.blockQuestions = QuizData.pickTierQuestions(state.tiers, state.tierIndex, QuizData.BLOCK_SIZE);
    state.indexInBlock = 0;
  }

  function renderCurrentQuestion() {
    const total = state.blockQuestions.length;
    const q = state.blockQuestions[state.indexInBlock];
    state.answered = false;

    dom.tierBadge.textContent = "Nível " + (state.tierIndex + 1) + " de " + state.tiers.length;

    QuizProgress.update(state.indexInBlock + 1, total);
    QuizUI.renderQuestion(dom.questionStage, q, state.indexInBlock + 1, total, handleAnswer);
    QuizUI.updatePromoRail(state.allQuestions.length); // troca a imagem a cada 5 perguntas (cumulativo)

    startQuestionTimer();
  }

  function handleAnswer(selectedIndex, btnEl, gridEl) {
    if (state.answered) return;
    state.answered = true;

    const q = state.blockQuestions[state.indexInBlock];
    const timeMs = stopQuestionTimer();

    state.allQuestions.push(q);
    state.allAnswers.push(selectedIndex);
    state.allTimes.push(timeMs);

    QuizUI.markAnswer(gridEl, q.correctIndex, selectedIndex);

    // Avança automaticamente após pequena pausa para o usuário ver o feedback
    setTimeout(advance, 900);
  }

  function advance() {
    state.indexInBlock++;

    if (state.indexInBlock >= state.blockQuestions.length) {
      showBlockComplete();
      return;
    }

    renderCurrentQuestion();
  }

  /** Mostra a tela de "bloco concluído" com as opções continuar/parar */
  function showBlockComplete() {
    clearInterval(questionTimerInterval);

    const blockStart = state.allQuestions.length - state.blockQuestions.length;
    let blockScore = 0;
    for (let i = blockStart; i < state.allQuestions.length; i++) {
      if (state.allAnswers[i] === state.allQuestions[i].correctIndex) blockScore++;
    }
    const overallScore = state.allAnswers.reduce(function (acc, ans, i) {
      return acc + (ans === state.allQuestions[i].correctIndex ? 1 : 0);
    }, 0);

    QuizUI.renderBlockComplete(dom.blockCompleteContainer, {
      blockScore: blockScore,
      blockTotal: state.blockQuestions.length,
      tierNumber: state.tierIndex + 1,
      numTiers: state.tiers.length,
      overallScore: overallScore,
      overallTotal: state.allQuestions.length
    });

    dom.quizSection.hidden = true;
    dom.blockCompleteSection.hidden = false;
    dom.blockCompleteSection.scrollIntoView({ behavior: "smooth" });

    const continueBtn = document.getElementById("blockContinueBtn");
    const stopBtn = document.getElementById("blockStopBtn");
    const finishBtn = document.getElementById("blockFinishBtn");

    if (continueBtn) continueBtn.addEventListener("click", onContinueToNextTier);
    if (stopBtn) stopBtn.addEventListener("click", finishQuiz);
    if (finishBtn) finishBtn.addEventListener("click", finishQuiz);
  }

  function onContinueToNextTier() {
    state.tierIndex++;
    loadBlockForCurrentTier();

    dom.blockCompleteSection.hidden = true;
    dom.quizSection.hidden = false;

    QuizProgress.reset();
    renderCurrentQuestion();
    dom.quizSection.scrollIntoView({ behavior: "smooth" });
  }

  async function finishQuiz() {
    const totalTimeMs = QuizTimer.stop();
    const timeFormatted = QuizTimer.formatMs(totalTimeMs);
    const total = state.allQuestions.length;

    const score = state.allAnswers.reduce(function (acc, ans, i) {
      return acc + (ans === state.allQuestions[i].correctIndex ? 1 : 0);
    }, 0);

    const level = QuizData.getLevel(score, total);
    const highestTier = state.tierIndex + 1;

    dom.quizSection.hidden = true;
    dom.blockCompleteSection.hidden = true;
    dom.resultSection.hidden = false;

    QuizUI.renderResultCard(dom.resultCard, level, score, total, timeFormatted, highestTier, state.tiers.length);
    QuizUI.renderReview(dom.reviewList, state.allAnswers, state.allQuestions);

    dom.resultSection.scrollIntoView({ behavior: "smooth" });

    if (total > 0 && score / total >= 0.8) {
      QuizConfetti.fire(220);
    }

    // Guarda contexto para certificado e compartilhamento
    state.resultContext = {
      score: score,
      total: total,
      levelTitle: level.title,
      levelEmoji: level.emoji,
      time: timeFormatted,
      accuracy: total > 0 ? Math.round((score / total) * 100) : 0,
      highestTier: highestTier,
      numTiers: state.tiers.length
    };

    QuizShare.checkNativeSupport();

    // Estatísticas da comunidade: busca a média geral (até agora) e, em
    // seguida, registra o resultado desta partida para as próximas médias.
    // Ambas as chamadas são tolerantes a falha (banco não configurado etc.)
    const communityStatsBlock = document.getElementById("communityStatsBlock");
    const statsBefore = await QuizDB.getStats();
    QuizUI.renderCommunityStats(communityStatsBlock, statsBefore, score, total, totalTimeMs);
    QuizDB.recordResult(score, total, totalTimeMs);
  }

  function restartQuiz() {
    clearInterval(questionTimerInterval);
    dom.blockCompleteSection.hidden = true;
    dom.resultSection.hidden = true;
    dom.heroSection.hidden = false;
    dom.heroSection.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------------- CERTIFICADO ---------------- */
  function onGenerateCertificate() {
    const name = (dom.certName.value || "").trim();
    if (!name) {
      dom.certName.focus();
      dom.certName.style.borderColor = "#FF3C3C";
      setTimeout(function () { dom.certName.style.borderColor = ""; }, 1500);
      return;
    }
    const ctx = state.resultContext;
    if (!ctx) return;

    QuizCertificate.generate({
      name: name,
      score: ctx.score,
      total: ctx.total,
      levelTitle: ctx.levelTitle,
      emoji: ctx.levelEmoji,
      time: ctx.time,
      accuracy: ctx.accuracy
    });
  }

  /* ---------------- COMPARTILHAMENTO ---------------- */
  function onShareClick(e) {
    const btn = e.target.closest("[data-share]");
    if (!btn || !state.resultContext) return;
    QuizShare.shareTo(btn.dataset.share, state.resultContext);
  }

  /* ---------------- DARK MODE TOGGLE ---------------- */
  function initDarkMode() {
    const saved = null; // Sem localStorage por padrão neste projeto (pode ser habilitado no README)
    dom.darkToggle.addEventListener("click", function () {
      const isDark = document.body.classList.contains("dark-mode");
      document.body.classList.toggle("dark-mode", !isDark);
      document.body.classList.toggle("light-mode", isDark);
    });
  }

  /* ---------------- INIT ---------------- */
  function init() {
    cacheDom();
    QuizUI.attachRipple(document.body);
    initDarkMode();

    dom.startBtn.addEventListener("click", startQuiz);
    dom.restartBtn.addEventListener("click", restartQuiz);
    dom.certBtn.addEventListener("click", onGenerateCertificate);
    document.querySelector(".share-buttons").addEventListener("click", onShareClick);

    document.getElementById("year").textContent = new Date().getFullYear();

    // Contador de acessos (só para o administrador, ver admin.html)
    QuizDB.logPageView();

    // Registra Service Worker (PWA)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {
          /* Falha silenciosa: PWA é um extra, não deve travar o app */
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
