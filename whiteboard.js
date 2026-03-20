const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 550;

let drawing = false;
emailjs.init("CqNZTScHE2x6guCJq");

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(e){
  if(!drawing) return;

  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function sendDrawing(){
  const dataURL = canvas.toDataURL("image/png");

  emailjs.send("service_jalzt7e", "template_p36x7l9", {
    image: dataURL
  })
  .then(() => {
    alert("sent 💌");
  })
  .catch((error) => {
    console.error("FAILED...", error);
    alert("failed 😭");
  });
}