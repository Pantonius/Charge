const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function setup() {
  let particle = new Particle(canvas.width / 2, canvas.height / 2, -100);
  particle.static = true;

  particles.push(particle);
}

const interval = 10;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let particleA of particles) {
    for(let particleB of particles) {
      if(particleA === particleB) continue;

      const G = 1;
      const force = new Vector().subtr(particleB.pos, particleA.pos);
      const distSq = force.magSq();
      
      if(distSq > 20) {
        force.setMag(G * (particleA.mass * particleB.mass) / (distSq / interval));
        particleA.applyForce(force);
      }
    }
  }

  let hover = false;
  for(let particle of particles) {
    if(particle.hover) hover = true;

    particle.draw();
  }

  canvas.classList.toggle('hover', hover);
}

setup();

setInterval(draw, interval);