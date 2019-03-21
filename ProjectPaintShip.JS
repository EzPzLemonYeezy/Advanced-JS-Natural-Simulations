var generator = new Random(1);
var standardDeviation = 6;
var mean = 0; 
    
    
var paint = function() {
    this.x = width/2;
    this.y = height/2;
};
    

    paint.prototype.display = function() {
        var diameter = random(12);
        noStroke();
        fill(random(255), random(255), random(255));
        ellipse(this.x, this.y, diameter, diameter);
    };


paint.prototype.splatter = function() {
    var numX = generator.nextGaussian();
    var numY = generator.nextGaussian();
    var xStepSize = standardDeviation * numX + mean;
    var yStepSize = standardDeviation * numY + mean;
    
    
    this.x += xStepSize;
    this.y += yStepSize;
};


var q = new paint();

draw = function() {
    q.splatter();
    q.display();
};
