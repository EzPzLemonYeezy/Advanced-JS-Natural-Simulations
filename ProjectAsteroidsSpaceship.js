angleMode = "radians";

var Spaceship = function(){
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(3, 0);
    this.acceleration = new PVector(0, 0);
    this.topspeed = 5;
    this.xoff = 1000;
    this.yoff = 0;
    this.r = 16;         
};

// function to change acceleration
Spaceship.prototype.applyForce = function(force) {
    this.acceleration.add(force);
};

// rotate left by 1/8PI
Spaceship.prototype.rotateLeft = function(){
    var left = this.velocity.get();
    left.rotate(-PI/8);
    this.applyForce(left);
};

// rotate right by 1/8PI
Spaceship.prototype.rotateRight = function(){
    var right = this.velocity.get();
    right.rotate(PI/8);
    this.applyForce(right);
};

// speeds up spaceship
Spaceship.prototype.accelerate = function(){
    var force = this.velocity.get();
    force.normalize();
    force.mult(10);
    this.applyForce(force);
};

// adds to acceleration and changes position with new speed
Spaceship.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

// create spaceship
Spaceship.prototype.display = function() {
    var angle = this.velocity.heading();
    
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(angle + PI/2);
    triangle(20, 100, 60, 100, 40, 57);
    rect(24, 100, 10, 6);
    rect(44, 100, 10, 6);
    
    popMatrix();
};

// keeps ship on canvas
Spaceship.prototype.checkEdges = function () {
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

//new variable
var spaceship = new Spaceship();

// changes directions when arrow keys pressed, speeds up when z pressed
keyPressed = function(){
    if (keyCode === LEFT){
        spaceship.rotateLeft();
    } else if (keyCode === RIGHT){
        spaceship.rotateRight();
    } else if (keyCode === 90){
        spaceship.accelerate();
    }
};

draw = function() {
    background(159, 190, 242);
    
   
    spaceship.update();
    spaceship.display();
    spaceship.checkEdges();
};
