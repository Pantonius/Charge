const btnNeg = document.getElementById('negativeCharge');
const btnPos = document.getElementById('positiveCharge');

btnNeg.addEventListener('dragstart', dragstartHandler);
btnPos.addEventListener('dragstart', dragstartHandler);

function dragstartHandler(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.effectAllowed = "move";
}

canvas.addEventListener('drop', (e) => {
  e.preventDefault();

  let id = e.dataTransfer.getData("text");
  
  let rect = canvas.getBoundingClientRect();

  if(id === btnNeg.id) {
    let particle = new Particle(e.clientX - rect.left, e.clientY - rect.top, 100);
    particle.static = true;
    
    particles.push(particle);
  } else if(id === btnPos.id) {
    let particle = new Particle(e.clientX - rect.left, e.clientY - rect.top, -100);
    particle.static = true;
    
    particles.push(particle);
  }
});

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();

  e.dataTransfer.dropEffect = "move"
});

addEventListener('keypress', (e) => {
  if(e.key === "+") {
    let particle = new Particle(canvas.width / 4, canvas.height / 2, -100);
    particle.static = true;
    particles.push(particle);
  } else if(e.key === "-") {
    let particle = new Particle(canvas.width / 4, canvas.height / 2, +100);
    particle.static = true;
    particles.push(particle);
  }
});