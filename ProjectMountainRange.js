
background(67, 51, 69);
fill(240, 240, 240);
noStroke();
ellipse(0, 0, 120, 120);

// Using noise to create volumetric clouds
    var xOff = 0;
    for (var x = 0; x < width; x+= 2) {
        var yOff = 0.0;
        for (var y = 0; y < 180; y+=2) {
            var bright = map(noise(xOff, yOff), 0, 1, -200, 283);
            stroke(255, 255, 255, bright);
            point(x, y);
            yOff += 0.1;
        }
        xOff += 0.01;
    }

// Creating different mountain ranges
var drawRange = function() {
    stroke(171, 146, 171);
    var incAmount = 0.01;
    for (var t = 0; t < (incAmount*width)+10; t += incAmount) {
        var n = noise(t);
        var y = map(n, -2.4, 0.8, 0.4, height/2);
        rect(t*100, height-y, 1, y);
    }
};

var drawRange2 = function() {
    stroke(148, 135, 135);
    var incAmount = 0.01;
    for (var t = 0; t < (incAmount*width)+10; t += incAmount) {
        var n = noise(t);
        var y = map(n, 2.1, -0.8, -3.6, height/2);
        rect(t*59, height-y, 4, y);
    }
};
drawRange();
drawRange2();

var tree = function() {
    this.x = 200;
    this.y = 350;
};

var generator = new Random(1);
var standardDeviation = 50;
var mean = 0;

// Creating the trees
tree.prototype.display = function() {
    strokeWeight(3);
    stroke(0, 0, 0);
    stroke(89, 50, 11);
    line(this.x, this.y, this.x, this.y-10);
    noStroke();
    var fillR = generator.nextGaussian()*2;
    var red = standardDeviation * fillR + mean;
    fill(red, 143, 61);
    if (this.y>350)
    {
        triangle(this.x-20, this.y-10, this.x, this.y-30, this.x+20, this.y-10);
    }
    else {
        triangle(this.x-6, this.y-10, this.x, this.y-14, this.x+6, this.y-10);
    }
};

tree.prototype.walk = function() {
    var numX = generator.nextGaussian();
    var numY = generator.nextGaussian();
    var xStepSize = standardDeviation * numX + mean;
    var yStepSize = standardDeviation * numY + mean;
  
    this.x += xStepSize;
    this.y += yStepSize;
    
    if (this.y < 236)
    {
        this.y = 243;
    }
};

var t = new tree();

//loop to display multiple trees 
for (var i = 0; i<200; i++){
    t.walk();
    t.display();
}

