window.addEventListener("load", first)
var dropQuantity = 1000;
var maxSize = 5;
var velocityMultiplier = 2;
var dropArray = new Array();
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
    document.getElementById("drops").value = dropQuantity;
    document.getElementById("size").value = maxSize;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Displays the source image + the destination image
    ctx.globalCompositeOperation = 'source-over';

    dropArray = getDrops(dropQuantity)

    console.log(dropArray)
    window.requestAnimationFrame(draw);
                            
}

function draw (){
   
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Change drops size
    var dropSize = document.getElementById("size").value;

    // Change drops quantity
    var dropsNumber = document.getElementById("drops").value;
    if(dropsNumber != dropArray.length){
       dropArray = getDrops(dropsNumber, dropArray)
    }

    // Change background color
    var colorValue = document.getElementById("color").value;
    ctx.fillStyle = 'rgb('+colorValue+', '+colorValue+', '+colorValue+')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dropArray.length; i++) {
        
        // Colour drop
        ctx.fillStyle = "rgb("+dropArray[i].r+","+dropArray[i].g+","+dropArray[i].b+","+dropArray[i].a+")";
        // Position drop
        dropArray[i].moveDrop();
        // Draw drop:size
        dropArray[i].drawDrop(dropSize);
        ctx.fill();
        
    }
    
    window.requestAnimationFrame(draw);

}

function getDrops(quantity, existentDrops=undefined){
    var drops;
    console.log(existentDrops)
    if(existentDrops){
        if(quantity > existentDrops.length){
            // When the number of desired drops is higher than existent quantity i add new drops
            for(;quantity > existentDrops.length;quantity--){
                existentDrops.push(new drop(
                    /*X*/   Math.floor(Math.random()*canvas.width),
                    /*Y*/   Math.floor(Math.random()*canvas.height),
                    /*R*/   0,
                    /*G*/   0,
                    /*B*/   255, 
                    /*A*/   0.1,                    
                    /*W*/   Math.floor(Math.random()*maxSize),
                    /*H*/   Math.floor(Math.random()*maxSize)               
                        ))}
        }else{
            // When the number of desired drops is lesser to the existent quantity i remove existent drops
            for(;quantity < existentDrops.length;quantity++){
                existentDrops.pop();
            }
        }
        drops = existentDrops;
    }else{
        drops = new Array();
        for(var i = 0; i < quantity; i++){
            drops.push(new drop(
        /*X*/   Math.floor(Math.random()*canvas.width),
        /*Y*/   Math.floor(Math.random()*canvas.height),
        /*R*/   0,
        /*G*/   0,
        /*B*/   255, 
        /*A*/   0.1,                    
        /*W*/   Math.floor(Math.random()*maxSize),
        /*H*/   Math.floor(Math.random()*maxSize)               
            ))}
    }
    
    return drops
}


class drop {
    constructor(x, y, r, g, b, a, w, h) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this.w = w;
      this.h = h;
      this.movement = Math.random() * velocityMultiplier;
      //this.dropSound = new Audio("./sounds/drop1.mp3"); // Initializate sound
    }

    drawDrop(dropSize){
        ctx.beginPath();

        // If drop reachs bottom
        if(this.y > canvas.height){
            //this.dropSound.play();
            this.y = 0;
            this.movement = Math.random() * velocityMultiplier;
        }

        /* Calculate drop size live, without recreating the drop again:
           I recover the last random size by dividing by the current "maxSize"
           and multiply the result (the random number) by the new "dropSize"
        */
        var w = (this.w / maxSize) * dropSize

        // Draw the drop
        ctx.moveTo(this.x - w, this.y);
        ctx.lineTo(this.x, this.y - w - 2);
        ctx.lineTo(this.x + w, this.y);
        ctx.arc(this.x, this.y, w, 0, Math.PI);
        
        ctx.closePath();
        ctx.fill();
    }

    moveDrop(){
        this.y = this.y + this.movement;
    }
  };

