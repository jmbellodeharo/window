window.addEventListener("load", first)
var bubbleQuantity = 1000;
var maxSize = 3;
var velocityMultiplier = 4;
var RG = 0;
var darkness = 80;
var randomMovement = 2;
var bubbleArray = new Array();
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

    console.log(bubbleArray)

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

