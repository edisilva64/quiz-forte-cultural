/* ===================================================================
   app.js — Orquestrador principal: liga todos os módulos entre si
   =================================================================== */

(function () {
  "use strict";

  const state = {
    currentIndex: 0,
    answers: [],       // índice escolhido por pergunta (mesma ordem de QUESTIONS)
    answered: false
  };

  const dom = {};

  function cacheDom() {
    dom.startBtn = document.getElementById("startBtn");
    dom.heroSection = document.getElementById("hero");
    dom.quizSection = document.getElementById("quizSection");
    dom.resultSection = document.getElementById("resultSection");
    dom.questionStage = document.getElementById("questionStage");
    dom.promoSlot = document.getElementById("promoSlot");
    dom.resultCard = document.getElementById("resultCard");
    dom.reviewList = document.getElementById("reviewList");
    dom.restartBtn = document.getElementById("restartBtn");
    dom.certBtn = document.getElementById("certBtn");
    dom.certName = document.getElementById("certName");
    dom.darkToggle = document.getElementById("darkToggle");
  }

  /* ---------------- FLUXO PRINCIPAL ---------------- */

  function startQuiz() {
    state.currentIndex = 0;
    state.answers = [];
    state.answered = false;

    dom.heroSection.hidden = true;
    dom.resultSection.hidden = true;
    dom.quizSection.hidden = false;

    QuizProgress.reset();
    QuizTimer.start();
    QuizUI.hidePromo(dom.promoSlot);

    renderCurrentQuestion();
    dom.quizSection.scrollIntoView({ behavior: "smooth" });
  }

  function renderCurrentQuestion() {
    const total = QuizData.TOTAL;
    const q = QuizData.QUESTIONS[state.currentIndex];
    state.answered = false;

    QuizProgress.update(state.currentIndex + 1, total);
    QuizUI.hidePromo(dom.promoSlot);

    QuizUI.renderQuestion(dom.questionStage, q, state.currentIndex + 1, total, handleAnswer);
  }

  function handleAnswer(selectedIndex, btnEl, gridEl) {
    if (state.answered) return;
    state.answered = true;

    const q = QuizData.QUESTIONS[state.currentIndex];
    state.answers[state.currentIndex] = selectedIndex;

    QuizUI.markAnswer(gridEl, q.correctIndex, selectedIndex);

    // Avança automaticamente após pequena pausa para o usuário ver o feedback
    setTimeout(advance, 900);
  }

  function advance() {
    const total = QuizData.TOTAL;
    const finishedQuestionNumber = state.currentIndex + 1; // 1-based da pergunta que acabou de ser respondida

    state.currentIndex++;

    // Banners promocionais em pontos estratégicos
    if (finishedQuestionNumber === 5) {
      showPromoThenContinue("cafe");
      return;
    }
    if (finishedQuestionNumber === 10) {
      showPromoThenContinue("gato");
      return;
    }

    if (state.currentIndex >= total) {
      // Antes do resultado, mostrar banner final (coleção fada) e então resultado
      showFinalPromoThenResult();
      return;
    }

    renderCurrentQuestion();
  }

  function showPromoThenContinue(key) {
    QuizUI.renderPromo(dom.promoSlot, key);
    dom.promoSlot.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(function () {
      renderCurrentQuestion();
    }, 3200);
  }

  function showFinalPromoThenResult() {
    dom.questionStage.innerHTML = "";
    QuizUI.renderPromo(dom.promoSlot, "fada");
    setTimeout(finishQuiz, 3200);
  }

  function finishQuiz() {
    const totalTimeMs = QuizTimer.stop();
    const timeFormatted = QuizTimer.formatMs(totalTimeMs);

    const score = state.answers.reduce(function (acc, ans, i) {
      return acc + (ans === QuizData.QUESTIONS[i].correctIndex ? 1 : 0);
    }, 0);

    const level = QuizData.getLevel(score);

    dom.quizSection.hidden = true;
    dom.resultSection.hidden = false;

    QuizUI.renderResultCard(dom.resultCard, level, score, QuizData.TOTAL, timeFormatted);
    QuizUI.renderReview(dom.reviewList, state.answers, QuizData.QUESTIONS);

    dom.resultSection.scrollIntoView({ behavior: "smooth" });

    if (score >= 12) {
      QuizConfetti.fire(220);
    }

    // Guarda contexto para certificado e compartilhamento
    state.resultContext = {
      score: score,
      total: QuizData.TOTAL,
      levelTitle: level.title,
      levelEmoji: level.emoji,
      time: timeFormatted,
      accuracy: Math.round((score / QuizData.TOTAL) * 100)
    };

    QuizShare.checkNativeSupport();
  }

  function restartQuiz() {
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
