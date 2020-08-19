window.addEventListener("load", first)
var bubbleQuantity = 1000;
var fishQuantity = 40;
var maxSize = 3;
var maxSizeFish = 8;
var velocityMultiplierFish = 4;
var velocityMultiplier = 4;
var RG = 0;
var darkness = 80;
var randomMovement = 2;
var bubbleArray = new Array();
var fishArray = new Array();
var canvas;  
var ctx;


function first(){  
    
    canvas = document.getElementById('canvas');
    
    // Canvas style and canvas size have to be the same if you don't want
    canvas.width  = 1000;
    canvas.height = 1000; 
    canvas.style.width  = '1000px';
    canvas.style.height = '1000px';

    ctx = canvas.getContext('2d');

    // Set default value range
    document.getElementById("bubbles").value = bubbleQuantity;
    document.getElementById("size").value = maxSize;
    document.getElementById("color").value = RG;
    document.getElementById("darkness").value = darkness;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Displays the source image + the destination image
    ctx.globalCompositeOperation = 'source-over';

    bubbleArray = getDrops(bubbleQuantity)

    fishArray = createFish(fishQuantity);

    //Water sound
    var audioElement = document.createElement("audio");
    audioElement.src = "sounds/366159__dcsfx__underwater-loop-amb.wav";
    audioElement.autoplay = true;
    audioElement.loop = true;
    audioElement.controls = true;
    document.getElementsByClassName("column")[1].appendChild(audioElement);

    window.requestAnimationFrame(draw);
                            
}

function draw (){
   
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Change bubbles size
    var bubbleSize = document.getElementById("size").value;

    // Change bubbles quantity
    var bubblesNumber = document.getElementById("bubbles").value;
    if(bubblesNumber != bubbleArray.length){
       bubbleArray = getDrops(bubblesNumber, bubbleArray)
    }

    // Change background color
    var colorValue = document.getElementById("color").value;
    var darknessValue = document.getElementById("darkness").value;
    ctx.fillStyle = 'rgb('+colorValue+', '+colorValue+', ' + darknessValue + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bubbleArray.length; i++) {
        
        // Colour bubble
        ctx.fillStyle = "rgb("+bubbleArray[i].r+","+bubbleArray[i].g+","+bubbleArray[i].b+","+bubbleArray[i].a+")";
        // Position bubble
        bubbleArray[i].moveBubble();
        // Draw bubble:size
        bubbleArray[i].drawBubble(bubbleSize);
        ctx.fill();
        
    }

    for (let i = 0; i < fishArray.length; i++) {
        
        // Position fish
        fishArray[i].move();
        // Draw fish:size
        fishArray[i].draw();
        ctx.fill();
        
    }

    
    window.requestAnimationFrame(draw);

}

function getDrops(quantity, existentBubbles=undefined){
    var bubbles;
    
    if(existentBubbles){
        if(quantity > existentBubbles.length){
            // When the number of desired bubbles is higher than existent quantity i add new bubbles
            for(;quantity > existentBubbles.length;quantity--){
                existentBubbles.push(new bubble(
                /*X*/       Math.floor(Math.random()*canvas.width),
                /*Y*/       canvas.height,
                /*R*/       255,
                /*G*/       255,
                /*B*/       255,
                /*A*/       0.1,
                /*Radio*/   Math.floor(Math.random()*maxSize),
                /*AngleS*/  0,
                /*AngleE*/  2*Math.PI             
                        ))}
        }else{
            // When the number of desired bubbles is lesser to the existent quantity i remove existent bubbles
            for(;quantity < existentBubbles.length;quantity++){
                existentBubbles.pop();
            }
        }
        bubbles = existentBubbles;
    }else{
        bubbles = new Array();
        for(var i = 0; i < quantity; i++){
            bubbles.push(new bubble(
        /*X*/       Math.floor(Math.random()*canvas.width),
        /*Y*/       canvas.height,
        /*R*/       255,
        /*G*/       255,
        /*B*/       255,
        /*A*/       0.1,
        /*Radio*/   Math.floor(Math.random()*maxSize),
        /*AngleS*/  0,
        /*AngleE*/  2*Math.PI
            ))}
    }
    
    return bubbles
}

function createFish(quantity, existingFish=undefined){
    var fishes;
    
    if(existingFish){
        if(quantity > existingFish.length){
            // When the number of desired fishes is higher than existent quantity i add new bubbles
            for(;quantity > existingFish.length;quantity--){
                existingFish.push(new fish())}
        }else{
            // When the number of desired fishes is lesser to the existent quantity i remove existent bubbles
            for(;quantity < existingFish.length;quantity++){
                existingFish.pop();
            }
        }
        fishes = existingFish;
    }else{
        fishes = new Array();
        for(var i = 0; i < quantity; i++){
            fishes.push(new fish())}
    }
    
    return fishes
}

class bubble {
    constructor(x, y, r, g, b, a, radio, angleS, angleE) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.radio = radio;
        this.angleS = angleS;
        this.angleE = angleE;
        this.movement = Math.random() * velocityMultiplier;
        // To save last 20 points bubbles points
        /*this.points = [];*/
        //this.dropSound = new Audio("./sounds/drop1.mp3"); // Initializate sound
    }

    drawBubble(bubbleSize){
        ctx.beginPath();
        // To draw the bubbles trail, 20 points long
        /*for (let index = 0; index < this.points.length; index++) {
            var xy = this.points[index].split("_");
            ctx.fillRect(xy[0],xy[1],1,1);
            if(this.points.length > 20){
                this.points.shift();
            }
        }
        this.points.push(this.x + "_" + this.y);*/
        //************************/
        if(this.y <= -maxSize){
            this.x = Math.floor(Math.random()*canvas.width);
            this.y = canvas.height;
            this.radio = Math.floor(Math.random()*maxSize);
            this.movement = Math.random() * velocityMultiplier;
            ctx.arc(this.x, this.y, this.radio, this.angleS, this.angleE);
        }else{
            var random = Math.random() * randomMovement - randomMovement/2;
            this.x += random == 0 ? 0.01 : random;
            if(this.x >= canvas.width){
                this.x = canvas.width;
            }else if(this.x <= 0){
                this.x = 0;
            }
            ctx.arc(this.x, this.y, this.radio * bubbleSize, this.angleS, this.angleE);
        }
        ctx.stroke();
    }
    
    moveBubble(){
        this.y = this.y - this.movement;
    }
  };

class fish {
    constructor() {
        this.direction = Math.random() > 0.5 ? 1: -1; // -1 left, 1 right
        this.movement = Math.random() * velocityMultiplierFish * this.direction;
        if(this.direction == 1){
            this.x = -100;
        }else{
            this.x = canvas.width + 100;
        }
        
        this.y = Math.floor(Math.random() * canvas.height);
        this.size = Math.floor(Math.random() * maxSizeFish);
        this.r = Math.floor(Math.random() * 255)
        this.g = Math.floor(Math.random() * 255)
        this.b = Math.floor(Math.random() * 255)
    }
    
    move(){
        this.x += this.movement;
        if(this.x > canvas.width + 100 || this.x < -100){
            if(this.x > canvas.width + 100){
                this.direction = -1;
            }else if(this.x < -100){
                this.direction = 1;
            }
            
            this.movement *= -1;
        }
    }
    draw(){
        var centerX = 0;
        var centerY = 0;
        var radius = this.size;
  
        // save state
        ctx.save();
 
        //BODY
        // translate context
        ctx.translate(this.x, this.y);
  
        // scale context horizontally
        ctx.scale(this.size*2, this.size);
  
        // draw circle which will be stretched into an oval
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  
        // apply styling
        ctx.fillStyle = "rgb("+this.r+","+this.g+","+this.b+")";
        ctx.fill();
        //*********
        //EYE
        ctx.beginPath();

        // Returning eye size to the initial scale
        ctx.scale(this.size/2, this.size);
        
        // The position is relative to the scale, don't need to calculate weird positions
        ctx.arc(this.direction, -0.5, this.size/50, 0, 2 * Math.PI, false);
        
        ctx.fillStyle = "black";
        ctx.fill();

        // Tail, i want the reverse direction
        ctx.moveTo(-2*this.direction, 0);
        ctx.lineTo(-3*this.direction, 1);
        ctx.lineTo(-3*this.direction, -1);

        ctx.fillStyle = "grey";
        ctx.fill();
        
        // ctx.stroke is for the line that envolves the shape
        //*********

        // restore to original state
        ctx.restore();
    }
};