// Biggest possible PVector that fits on the canvas
var maxDir = PVector.sub(new PVector(0, 0), new PVector(width-1, height-1));
// Magnitude of the PVector
var maxMag = maxDir.mag();

// Function holds original position, velocity, speed
var Mover = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

// Constantly updating position of bird
Mover.prototype.update = function() {
    
    var m = new PVector(random(400), random(250));
    var dir = PVector.sub(m, this.position);
    var closeness = (maxMag - dir.mag()) / maxMag;
    dir.normalize();
    dir.mult(closeness);
    
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};

// Creating bird
Mover.prototype.display = function() {
     stroke(0, 0, 0);
    strokeWeight(2);
    //inside wing
    fill(230, 230, 161);
    triangle(this.position.x-10, this.position.y, this.position.x+19, this.position.y, this.position.x+-6, this.position.y+26);
    //body
    fill(255, 243, 8);
    ellipse(this.position.x, this.position.y, 58, 16);
    fill(248, 255, 41);
    //head
    ellipse(this.position.x-27, this.position.y, 20, 20);
    //beak
    fill(235, 228, 103);
    triangle(this.position.x-34, this.position.y+8, this.position.x-37, this.position.y-2, this.position.x-47, this.position.y+8);
    //outside wing
    fill(230, 230, 161);
    triangle(this.position.x-10, this.position.y, this.position.x+19, this.position.y, this.position.x+33, this.position.y+21);
};

// Brings bird away from the edges
Mover.prototype.checkEdges = function() {
  if (this.position.x > width) {
    this.position.x = 0;
  } else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  } else if (this.position.y < 0) {
    this.position.y = height;
  }
};

var mover = new Mover();

// displaying bird, background, mountain
draw = function() {
    background(99, 191, 240);
    
    mover.update();
    mover.checkEdges();
    mover.display(); 
    
    var drawRange = function() {
    stroke(83, 143, 31);
    var incAmount = 0.01;
    for (var t = 0; t < (incAmount*width)+10; t += incAmount) {
        var n = noise(t);
        var y = map(n, 0.1, 0.8, 0.4, height/2);
        rect(t*100, height-y, 1, y);
    }
};
drawRange();
};


