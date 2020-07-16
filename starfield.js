window.addEventListener("load", first)
var starQuantity = 1000;
var lineWidth = 3;
var starArray = new Array();
var speedGrowLine = 1.2;
var speedMovement = 8;
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
    document.getElementById("stars").value = starQuantity;

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("color").value = 0;
    
    // Displays the source image + the destination image
    ctx.globalCompositeOperation = 'source-over';

    starArray = getStars(starQuantity);

    window.requestAnimationFrame(draw);
                            
}

function draw (){

    // Clear canvas
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Change stars quantity
    var starsNumber = document.getElementById("stars").value;
    if(starsNumber != starArray.length){
       starArray = getStars(starsNumber, starArray)
    }

    // Change background color
    var colorValue = document.getElementById("color").value;
    ctx.fillStyle = 'rgb('+colorValue+', '+colorValue+', '+colorValue+')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    ctx.save();

    /* 
    Translate: it has to be out of the loop because if not it will translate half of the canvas more 
    every loop --> if canvas width is 1000  --> 500, 1000, 1500, 2000...
    */
    ctx.translate(canvas.width/2, canvas.height/2);

    for (let i = 0; i < starArray.length; i++) {
        // Colour star
        ctx.strokeStyle = "rgb("+starArray[i].r+","+starArray[i].g+","+starArray[i].b+","+starArray[i].a+")";

        // Draw star
        starArray[i].drawStar();
    }
    
    ctx.restore();

    window.requestAnimationFrame(draw);

}

// With this function i generate the given quantity of stars given, removing or adding depending on it
function getStars(quantity, existentStars=undefined){
    var stars;
    if(existentStars){
        if(quantity > existentStars.length){
            // When the number of desired stars is higher than existent quantity i add new stars
            for(;quantity > existentStars.length;quantity--){
                var random1 = Math.random() * 2 - 1;
                var random2 = Math.random() * 2 - 1;
                var x =  random1 == 0 ? 0.01 : random1;
                var y =  random2 == 0 ? 0.01 : random2;
                existentStars.push(new star( 
                    /*X*/   x, // Random number between -1 and 1
                    /*Y*/   y,
                    /*R*/   255,
                    /*G*/   255,
                    /*B*/   255, 
                    /*A*/   1
                    ))}
        }else{
            // When the number of desired stars is lesser to the existent quantity i remove existent stars
            for(;quantity < existentStars.length;quantity++){
                existentStars.pop();
            }
        }
        stars = existentStars;
    }else{
        stars = new Array();
        for(var i = 0; i < quantity; i++){
            var random1 = Math.random() * 2 - 1;
            var random2 = Math.random() * 2 - 1;
            var x =  random1 == 0 ? 0.01 : random1;
            var y =  random2 == 0 ? 0.01 : random2;
            stars.push(new star(
            /*X*/   x, // Random number between -1 and 1
            /*Y*/   y,
            /*R*/   255,
            /*G*/   255,
            /*B*/   255, 
            /*A*/   1            
            ))}
    }
    
    return stars
}

class star {

    constructor(x, y, r, g, b, a) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      var random1 = Math.random() * speedMovement - speedMovement/2;
      var random2 = Math.random() * speedMovement - speedMovement/2;
      this.movementX = random1 == 0 ? 0.01 : random1;
      this.movementY = random2 == 0 ? 0.01 : random2;
    }

    drawStar(){

        ctx.lineWidth = lineWidth;
        
        // Detect if a star is out of canvas
        if(this.x > (canvas.width/2) || this.y < -(canvas.height/2) || this.x < -(canvas.width/2) || this.y > (canvas.height/2) ){
            this.x = Math.random() * 2 - 1; 
            this.y = Math.random() * 2 - 1;
            var random1 = Math.random() * speedMovement - speedMovement/2;
            var random2 = Math.random() * speedMovement - speedMovement/2;
            this.movementX = random1 == 0 ? 0.01 : random1;
            this.movementY = random2 == 0 ? 0.01 : random2;
        }
        
        // Draw the star
        ctx.beginPath(); 
        ctx.moveTo(this.x, this.y);

        // Depending on the quadrant of the circle, grows to one side or another
        this.x += this.movementX;
        this.y += this.movementY;
        
        // Star/Line length
        ctx.lineTo(this.x * speedGrowLine, this.y * speedGrowLine);

        ctx.stroke();
    }
  };