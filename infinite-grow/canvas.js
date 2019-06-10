/*  created by Henry Zhang
    coded at 10/Jun/2019    */

var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var stArray = []

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

for(var i = 0; i < 400; i++){
    var st = new star(window.innerWidth/2, window.innerHeight/2, 6)
    st.reset()
    stArray.push(st);
}


function star(x, y, radius) {
    this.radius = radius;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y; 
    this.blur = 0;  
    this.r=0
    this.g=0
    this.b=0
    this.update = function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${this.r++},${this.r++},${this.r++})`
        ctx.fill();
        this.x += this.speedX;
        this.y += this.speedY; 
        if((this.x + this.radius > window.innerWidth || this.x < 0) && (this.y + this.radius > window.innerHeight || this.y < 0)){
            this.reset()   
        }
        
        
    }
    this.reset = function(){
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2
        var directionX = Math.random() >= 0.5? 1 : -1;
        var directionY = Math.random() >= 0.5? 1 : -1;
        this.speedX = directionX * Math.random() ;
        this.speedY = directionY * Math.random() ;
        this.blur = Math.random() * 5;
        this.r=0
    }
}


function animate() {
    requestAnimationFrame(animate)
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for(var i = 0; i < stArray.length; i++){
        stArray[i].update();
    }
}

animate()

