/*  created by Henry Zhang
    coded at 11/Jun/2019    */

var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var stArray = []

var onHold = false;
var opacity = 0.1; //of the rect
var yDisplace = 1.02;

function startOnHold(){
    // document.getElementById("text").className = "center hidden";
    onHold = true
}
function endOnHold(){
    // document.getElementById("text").className = "center";
    onHold = false
}

window.addEventListener("dblclick", function(){
    yDisplace = (yDisplace == 1.001) ? 1.02 : 1.001  
})

window.addEventListener("mousedown", function(){startOnHold()})
window.addEventListener("mouseup", function(){endOnHold()})
window.addEventListener("touchstart", function(){startOnHold()})
window.addEventListener("touchend", function(){endOnHold()})


window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

for(var i = 0; i < 700; i++){
    var st = new star(window.innerWidth/2, window.innerHeight/2, 2)
    st.reset()
    stArray.push(st);
}


function randomColorPicker(){
    var colors = ["195, 112, 255","142, 102, 232","129, 125, 255","102, 132, 232","112, 183, 255"]
    return colors[Math.floor(Math.random()*colors.length)]
}


function star(x, y, radius) {
    this.color = randomColorPicker();
    this.radius = radius;
    this.speedX = 0;
    this.speedY = 0;   
    
    this.x = x;
    this.y = y; 
    this.blur = 0;  
    this.alpha=0
    this.maxAplha = 0.5
    this.first=true
    this.update = function() {
        const lastPoint = {x:this.x, y:this.y}
        if(this.alpha < this.maxAplha){ this.alpha+=0.01 }

        if(onHold){
            if(this.speedX < 30){
                this.speedX *= 1.02
                this.speedY *= yDisplace
            }
        }
        if(!onHold && this.speedX > this.lastSpeedX){
            this.speedX /= 1.02
            this.speedY /= yDisplace
        }
        this.x += this.speedX;
        this.y += this.speedY; 
        if((this.x + this.radius > window.innerWidth || this.x < 0) && (this.y + this.radius > window.innerHeight || this.y < 0)){
            this.reset()   
        }
        
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${this.color}, ${this.alpha})`
        ctx.lineWidth = 3
        ctx.moveTo(lastPoint.x,lastPoint.y)
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
        ctx.closePath()
        
    }
    this.reset = function(){
        var directionX = Math.random() >= 0.5? 1 : -1;
        var directionY = Math.random() >= 0.5? 1 : -1;
        this.speedX = directionX * Math.random() ;
        this.speedY = directionY * Math.random() ;
        this.lastSpeedX = this.speedX
        this.lastSpeedY = this.speedY
        var random = Math.random() //random displacement
        this.x = window.innerWidth/2 + this.speedX * random * window.innerWidth/2
        this.y = window.innerHeight/2 + this.speedY * random * window.innerHeight/2
        this.alpha = 0
        this.maxAplha = Math.random() 
    }
}


function animate() {
    requestAnimationFrame(animate)
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(onHold && opacity > 0.05){
        opacity-=0.01
    }
    if(!onHold && opacity < 0.1){
        opacity+=0.01
    }
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for(var i = 0; i < stArray.length; i++){
        stArray[i].update();
    }
}

animate()

