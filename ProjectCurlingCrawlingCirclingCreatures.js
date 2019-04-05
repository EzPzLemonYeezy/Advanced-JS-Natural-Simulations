//setting angle mode to radians
angleMode = "radians";


// defining the properties of the flower
var Flower = function(){
    this.position = new PVector(width/2, height-90);
    this.mass = 27;
};


// displaying the Flower
Flower.prototype.display = function(){
    // pedals
    fill(240, 209, 5);
    ellipse(this.position.x+11, this.position.y, 16, 16);
    ellipse(this.position.x-11, this.position.y, 16, 16);
    ellipse(this.position.x, this.position.y-11, 16, 16);
    ellipse(this.position.x, this.position.y+11, 16, 16);
    // center of flower
    fill(250, 250, 250);
    ellipse(this.position.x, this.position.y, 10, 10);
    // flower stem
    stroke(31, 219, 75);
    strokeWeight(4);
    line(this.position.x, this.position.y+100, this.position.x, this.position.y+20);
};


// bird function containing properties of the birds
var Bird = function(m, x, y) {
    this.a = 0;
    this.angVelocity = 0;
    this.angle = new PVector();
    this.velocity = new PVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = new PVector(random(20, width/2), random(20, width/2));
    this.position = new PVector(0, 0);
};

// oscillating the birds
Bird.prototype.oscillate = function() {
    this.angle.add(this.velocity);
    this.position.set(
                sin(this.angle.x) * this.amplitude.x,
                sin(this.angle.y) * this.amplitude.y);
                
    var distance = this.position.mag();
    this.angVelocity += distance / 100000;
    this.angVelocity = constrain(this.angVelocity, 0, 0.1);
    this.a += this.angVelocity;
};

// creating the birds
Bird.prototype.display = function() {
    pushMatrix();
    translate(width/2, height/2);
    stroke(20, 1, 1);
    strokeWeight(4);
    imageMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.a);
    stroke(0, 0, 0);
    strokeWeight(2);
    // inside wing
    fill(161, 198, 230);
    triangle(this.position.x-10, this.position.y, this.position.x+19, this.position.y, this.position.x+-6, this.position.y+26);
    // body
    fill(43, 223, 255);
    ellipse(this.position.x, this.position.y, 58, 16);
    // head
    fill(43, 223, 255);
    ellipse(this.position.x-27, this.position.y, 20, 20);
    // eye
    fill(5, 5, 5);
    ellipse(this.position.x-31, this.position.y-2, 5, 5);
    // beak
    fill(240, 240, 240);
    triangle(this.position.x-34, this.position.y+8, this.position.x-37, this.position.y-2, this.position.x-47, this.position.y+8);
    // outside wing
    fill(161, 220, 230);
    triangle(this.position.x-10, this.position.y, this.position.x+19, this.position.y, this.position.x+33, this.position.y+21);
    popMatrix();
};


var flower = new Flower();

// declaring array for new birds
var bird = [];
// creating new bugs at randomized locations
for (var i = 0; i < 3; i++) {
    bird[i] = new Bird(random(0.1, 2), random(width), random(height));
}

draw = function() {
    background(190, 246, 247);
    
    // grass
    for (var grassPos = 0; grassPos <= 400; grassPos += 100){
        image(getImage("cute/GrassBlock"), grassPos, 381, 129, 35);
    }
    
    // looping through all of the movers
    for (var i = 0; i < bird.length; i++) {
        bird[i].oscillate();
        bird[i].display();
    }
        flower.display();
};

