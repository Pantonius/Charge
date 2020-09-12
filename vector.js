class Vector {
  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  magSq() {
    const mag = this.mag();
    return Math.pow(mag, 2);
  }

  normalize() {
    const mag = this.mag();
    
    if(mag != 0)
      this.div(mag);
  }

  setMag(mag) {
    this.normalize();
    this.mult(mag);
  }

  fromAngle(angle) {
    this.set(Math.cos(angle), Math.sin(angle));
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  mult(vector, factor) {
    if(factor) {
      return new Vector(vector.x * factor, vector.y * factor);
    } else {
      // vector is actually scalar
      this.set(this.x * vector, this.y * vector);
    }
  }

  div(vector, factor) {
    if(factor) {
      return new Vector(vector.x / factor, vector.y / factor);
    } else {
      // vector is actually scalar
      this.set(this.x / vector, this.y / vector);
    }
  }

  add(v1, v2) {
    if(v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    } else {
      this.set(this.x + v1.x, this.y + v1.y);
    }
  }

  subtr(v1, v2) {
    if(v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    } else {
      this.set(this.x - v1.x, this.y - v1.y);
    }
  }
}