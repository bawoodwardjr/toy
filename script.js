const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

let trail = [];

let circle = { x: canvas.width / 2, y: canvas.height / 2 };
let square = { x: canvas.width / 2 + 60, y: canvas.height / 2 + 60 };
let triangle = { x: canvas.width / 2 - 60, y: canvas.height / 2 - 60 };

let settings = {
  trailLength: 20,
  fadeOpacity: 0.1,
  circleSize: 20,
  circleSpeed: 0.05,
};

const trailInput = document.getElementById("trailLength");
const opacityInput = document.getElementById("fadeOpacity");
const sizeInput = document.getElementById("circleSize");
const speedInput = document.getElementById("circleSpeed");

trailInput.addEventListener("input", () => settings.trailLength = parseInt(trailInput.value));
opacityInput.addEventListener("input", () => settings.fadeOpacity = parseFloat(opacityInput.value));
sizeInput.addEventListener("input", () => settings.circleSize = parseInt(sizeInput.value));
speedInput.addEventListener("input", () => settings.circleSpeed = parseFloat(speedInput.value));

canvas.addEventListener("mousemove", function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

canvas.addEventListener("touchstart", function(event) {
  const touch = event.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
})

canvas.addEventListener("touchmove", function(event) {
  event.preventDefault();
  const touch = event.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
}, { passive: false });

function draw() {
  ctx.fillStyle = `rgba(0, 0, 0, ${settings.fadeOpacity || 0.1})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  circle.x += (mouse.x - circle.x) * settings.circleSpeed; 
  circle.y += (mouse.y - circle.y) * settings.circleSpeed;

  trail.push({ x: circle.x, y: circle.y });
  while (trail.length > settings.trailLength) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    ctx.beginPath();
    ctx.arc(t.x, t.y, settings.circleSize * (i / trail.length), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${i /  trail.length})`;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(circle.x, circle.y, settings.circleSize, 0, Math.PI * 2);
  ctx.strokeStyle = "white";
  ctx.stroke();

  requestAnimationFrame(draw);
}

draw();
