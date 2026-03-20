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
function sendEverything(){
  const name = document.querySelector('[name="user_name"]').value;
  const email = document.querySelector('[name="user_email"]').value;
  const message = document.querySelector('[name="message"]').value;

  const dataURL = canvas.toDataURL("image/png");

  const params = {
    user_name: name,
    user_email: email,
    message: message,
    image: dataURL
  };

  console.log(params);

  emailjs.send("service_jalzt7e", "template_p36x7l9", params)
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