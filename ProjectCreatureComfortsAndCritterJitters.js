
// global variable as gravity force
var force = 1;

// Biggest possible PVector that fits in the canvas
var maxDir = PVector.sub (new PVector (0, 0), new PVector (width-1, height-1));

// Magnitude of that vector
var maxMag = maxDir.mag();

// defining the properties of the flower
var Flower = function(){
    this.position = new PVector(width/2, height-100);
    this.mass = 40;
};

// function that calculates the attraction of the flower on the birds
Flower.prototype.calculateAttraction = function(m){
    // direction of the force
    var forceOfR = PVector.sub(this.position, m.position);
    // how far away the objects are
    var distance = forceOfR.mag();
    forceOfR.normalize();
    // calculating gravity
    var strength = (this.force * this.mass * m.mass) / (distance * distance);
    forceOfR.mult(strength);
    return forceOfR;
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
    this.mass = m;
    this.position = new PVector(x, y);
    this.velocity = new PVector(1, 0);
    this.acceleration = new PVector(0, 0);
};

//updating bugs by changing velocity, position and acceleration
Bird.prototype.update = function() {
    var m = new PVector(random(400), random(400));
    var dir = PVector.sub(m, this.position);
    var closeness = (maxMag - dir.mag()) / maxMag;
    
    dir.normalize();
    dir.mult(closeness);
    
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};

// creating the birds
Bird.prototype.display = function() {
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
    
};

// calculating attraction between birds
Bird.prototype.calculateAttraction = function(m) {
    var forceOfA = PVector.sub(this.position, m.position);
    var distance = forceOfA.mag();
    distance = constrain(distance, 5.0, 25.0);
    forceOfA.normalize();
    var strength = (force * this.mass * m.mass) / (distance * distance);
    forceOfA.mult(strength);
    return forceOfA;
};


// applying forces to change birds acceleration
Bird.prototype.applyForce = function(forces) {
    var f = PVector.div(forces, this.mass);
    this.acceleration.add(f);
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
        image(getImage("cute/GrassBlock"), grassPos, 360, 100, 40);
    }
    
    // looping through all of the movers
    for (var i = 0; i < bird.length; i++) {
        
        var forceOfF = flower.calculateAttraction(bird[i]);
        bird[i].applyForce(forceOfF);
        
        // loop to make each mover be attracted to all other movers
        for (var j = 0; j < bird.length; j++) {
            // making sure the mover is not attracted to itself
            if (i !== j) {
                var forceOfA = bird[j].calculateAttraction(bird[i]);
                // applying the repulsion
                bird[i].applyForce(forceOfA);
            }
        }
        // 3calling the update and display functions
        flower.display();
        bird[i].update();
        bird[i].display();
    }
};
