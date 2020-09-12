class Particle {
  constructor(x, y, mass) {
    this.pos = new Vector(x, y);
    this.mass = mass;

    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    this.radius = Math.sqrt(Math.abs(mass) / Math.PI);

    this.static = false;
    this.showVector = mass < 0;
    this.showVectorMult = 500;

    this.hover = false;
    this.dragging = false;

    addEventListener('mousedown', (e) => {
      let rect = canvas.getBoundingClientRect();
      if(this.checkHit(e.clientX - rect.left, e.clientY - rect.top)) {
        this.dragging = true;
      }
    });
    addEventListener('mouseup', () => {
      if(this.dragging)
        this.dragging = false;
    });
    addEventListener('mousemove', (e) => {
      if(this.dragging) {
        let rect = canvas.getBoundingClientRect();

        this.pos.x = e.clientX - rect.left;
        this.pos.y = e.clientY - rect.top;
      }

      let rect = canvas.getBoundingClientRect();
      if(this.checkHit(e.clientX - rect.left, e.clientY - rect.top)) {
        this.hover = true;
      } else {
        this.hover = false;
      }
    });
  }

  update() {
    if(this.showVector) this.drawVector(this.acceleration);

    if(!this.static && !this.dragging) {
      this.velocity.add(this.acceleration);
      this.pos.add(this.velocity);
    }
    
    this.acceleration.set(0, 0);
  }

  draw() {
    this.update();

    if(this.mass < 0) ctx.fillStyle = '#f00';
    else ctx.fillStyle = '#00f';

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  drawVector(vector) {
    if(vector.x === 0 && vector.y === 0) return;

    vector = new Vector(vector.x * this.showVectorMult, vector.y * this.showVectorMult);
    let cursor = new Vector(this.pos.x, this.pos.y);

    ctx.strokeStyle = '#fff';
    
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    cursor.add(vector);
    ctx.lineTo(cursor.x, cursor.y);
    ctx.stroke();
    
    
    let arrow = new Vector(0, 0);
    
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    arrow.fromAngle(vector.angle() + 150 * (Math.PI / 180));
    arrow.setMag(ctx.lineWidth * 10);
    cursor.add(arrow);
    ctx.lineTo(cursor.x, cursor.y);
    arrow.fromAngle(vector.angle() - 90 * (Math.PI / 180));
    arrow.setMag(ctx.lineWidth * 10);
    cursor.add(arrow);
    ctx.lineTo(cursor.x, cursor.y);
    arrow.fromAngle(vector.angle() + 30 * (Math.PI / 180));
    arrow.setMag(ctx.lineWidth * 10);
    cursor.add(arrow);
    ctx.lineTo(cursor.x, cursor.y);
    
    ctx.fill();
  }

  applyForce(force) {
    let f = new Vector().div(force, this.mass);
    this.acceleration.add(f);
  }

  checkHit(x, y) {
    let vector = new Vector(x, y);
    let distance = Math.sqrt(Math.pow(vector.x - this.pos.x, 2) + Math.pow(vector.y - this.pos.y, 2));

    return distance < this.radius;
  }
}