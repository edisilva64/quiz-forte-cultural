/* ===================================================================
   confetti.js — Explosão de confetes em canvas (sem bibliotecas externas)
   Namespace global: window.QuizConfetti
   =================================================================== */

(function () {
  "use strict";

  const COLORS = ["#FF6B00", "#00A651", "#16213E", "#FFD400", "#FF3C3C", "#1877F2"];
  let canvas, ctx, particles, animationId, running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      size: 6 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: Math.random() > 0.5 ? "rect" : "circle"
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let allOffscreen = true;

    particles.forEach(function (p) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y < canvas.height + 20) allOffscreen = false;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    if (!allOffscreen) {
      animationId = requestAnimationFrame(draw);
    } else {
      running = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function fire(count) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);

    particles = [];
    const total = count || 160;
    for (let i = 0; i < total; i++) {
      particles.push(createParticle());
    }

    if (!running) {
      running = true;
      draw();
    }
  }

  window.QuizConfetti = { fire: fire };
})();
