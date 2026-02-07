let calculationSum = 0;

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const particles = [];
let hue = 0;
const colors = ["red", "blue", "cyan"];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 2; i++) {
    particles.push(new Particle());
  }
});

class Particle {
  constructor() {
    ((this.x = mouse.x),
      (this.y = mouse.y),
      (this.speedX = Math.random() * 1 * 2.5),
      (this.speedY = Math.random() * 1 * 2.5));
    this.size = Math.random() * 5 * 4.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

console.log(particles);

function handle() {
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      continue;
    }
    particles[i].update();
    particles[i].draw();

    for (let j = 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const disatnce = Math.sqrt(dx * dx + dy * dy);
      calculationSum++;
      if (disatnce < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particles[i].color;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hue++;
  handle();
  requestAnimationFrame(animate);
}

animate();
