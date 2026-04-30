const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 550;
let currentColor = "#000000";
let drawing = false;
emailjs.init("CqNZTScHE2x6guCJq");
ctx.fillStyle = "#fffdf0";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function canvasPoint(clientX, clientY) {
  const r = canvas.getBoundingClientRect();
  const sx = canvas.width / r.width;
  const sy = canvas.height / r.height;
  return {
    x: (clientX - r.left) * sx,
    y: (clientY - r.top) * sy,
  };
}

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  const p = canvasPoint(e.clientX, e.clientY);
  ctx.moveTo(p.x, p.y);
});

function setColor(color, paletteEl) {
  currentColor = color;
  if (paletteEl && paletteEl.classList) {
    document.querySelectorAll(".color-palette span").forEach((el) => {
      el.classList.remove("active");
    });
    paletteEl.classList.add("active");
  }
}

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;

  const p = canvasPoint(e.clientX, e.clientY);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

canvas.addEventListener(
  "touchstart",
  (e) => {
    if (e.target !== canvas) return;
    e.preventDefault();
    drawing = true;
    ctx.beginPath();
    const t = e.changedTouches[0];
    const p = canvasPoint(t.clientX, t.clientY);
    ctx.moveTo(p.x, p.y);
  },
  { passive: false }
);

canvas.addEventListener(
  "touchmove",
  (e) => {
    if (!drawing) return;
    e.preventDefault();
    const t = e.changedTouches[0];
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;
    const p = canvasPoint(t.clientX, t.clientY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  },
  { passive: false }
);

canvas.addEventListener("touchend", () => {
  drawing = false;
  ctx.beginPath();
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function sendEverything() {
  const name = document.querySelector('[name="user_name"]').value;
  const email = document.querySelector('[name="user_email"]').value;
  const message = document.querySelector('[name="message"]').value;

  const dataURL = canvas.toDataURL("image/png");

  const params = {
    user_name: name,
    user_email: email,
    message: message,
    image: dataURL,
  };

  console.log(params);

  emailjs
    .send("service_jalzt7e", "template_p36x7l9", params)
    .then(() => {
      alert("sent <3");
      document.getElementById("contact-form").reset();
      clearCanvas();
    })
    .catch((error) => {
      console.error(error);
      alert("failed :(");
    });
}
