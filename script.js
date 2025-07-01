const card = document.querySelector(".card");
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("cumpleAudio");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function createConfetti() {
  confetti = []; // Reiniciar confeti cada vez
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  moveConfetti();
}

function moveConfetti() {
  confetti.forEach((p) => {
    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.x += Math.sin(p.d);
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

card.addEventListener("click", () => {
  createConfetti();
  animateConfetti();

  // Reinicia y reproduce audio del segundo 0 al 14
  audio.pause();             // Detiene si ya sonaba
  audio.currentTime = 0;     // Reinicia
  audio.play();

  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 15000);
});
