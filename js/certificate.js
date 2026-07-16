/* ===================================================================
   certificate.js — Gera um certificado personalizado (canvas -> PDF)
   Namespace global: window.QuizCertificate
   Depende de: jsPDF (carregado via CDN no index.html)
   =================================================================== */

(function () {
  "use strict";

  function drawCertificate(canvas, data) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Fundo
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#16213E");
    grad.addColorStop(1, "#1E2C52");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Borda decorativa
    ctx.strokeStyle = "#FF6B00";
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, W - 60, H - 60);
    ctx.strokeStyle = "#00A651";
    ctx.lineWidth = 2;
    ctx.strokeRect(46, 46, W - 92, H - 92);

    ctx.textAlign = "center";

    // Selo / emoji
    ctx.font = "90px sans-serif";
    ctx.fillText(data.emoji || "🏆", W / 2, 190);

    // Título
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 44px Poppins, sans-serif";
    ctx.fillText("CERTIFICADO DE CONCLUSÃO", W / 2, 270);

    ctx.fillStyle = "#FF8C3D";
    ctx.font = "600 26px Poppins, sans-serif";
    ctx.fillText("Desafio Lógico Forte Cultural", W / 2, 312);

    // Texto "Certificamos que"
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "400 22px Poppins, sans-serif";
    ctx.fillText("Certificamos que", W / 2, 390);

    // Nome
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 56px Poppins, sans-serif";
    ctx.fillText(data.name, W / 2, 460);

    // Linha decorativa sob o nome
    ctx.strokeStyle = "#FF6B00";
    ctx.lineWidth = 3;
    ctx.beginPath();
    const lineWidth = Math.min(600, ctx.measureText(data.name).width + 60);
    ctx.moveTo(W / 2 - lineWidth / 2, 480);
    ctx.lineTo(W / 2 + lineWidth / 2, 480);
    ctx.stroke();

    // Resultado
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "400 24px Poppins, sans-serif";
    ctx.fillText(
      "concluiu o desafio com " + data.score + "/" + data.total + " acertos",
      W / 2, 540
    );

    ctx.fillStyle = "#00C766";
    ctx.font = "700 30px Poppins, sans-serif";
    ctx.fillText("Título: " + data.levelTitle, W / 2, 585);

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "400 20px Poppins, sans-serif";
    ctx.fillText("Tempo total: " + data.time + "  •  Precisão: " + data.accuracy + "%", W / 2, 625);

    // Rodapé
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "400 16px Poppins, sans-serif";
    ctx.fillText("Forte Cultural — umapenca.com/fortecultural", W / 2, H - 60);

    const dateStr = new Date().toLocaleDateString("pt-BR");
    ctx.fillText(dateStr, W / 2, H - 36);
  }

  /**
   * Gera o certificado e dispara o download em PDF (via jsPDF).
   * Faz fallback para PNG caso jsPDF não esteja disponível.
   */
  function generate(data) {
    const canvas = document.getElementById("certCanvas");
    if (!canvas) return;
    drawCertificate(canvas, data);

    const imgData = canvas.toDataURL("image/png", 1.0);

    if (window.jspdf && window.jspdf.jsPDF) {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificado-forte-cultural.pdf");
    } else {
      // Fallback: baixa como imagem PNG
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "certificado-forte-cultural.png";
      link.click();
    }
  }

  window.QuizCertificate = { generate: generate };
})();
