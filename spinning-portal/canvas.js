/*  created by Henry Zhang
    coded at 11/Jun/2019    */

var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var stArray = []


window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

for(var i = 0; i < 100; i++){
    var st = new particlePath(window.innerWidth/2, window.innerHeight/2, Math.random()*canvas.width)
    st.reset()
    stArray.push(st);
}


function particlePath(x, y, radius) {
    this.radius = radius;
    this.rad = Math.random() * Math.PI * 2
    this.speed = Math.random() * 0.3;   
    this.x = x;
    this.y = y; 

    this.update = function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = "blue"
        ctx.fill();
        this.rad += this.speed 
        this.x = x + Math.cos(this.rad) * this.radius;
        this.y = y + Math.sin(this.rad) * this.radius; 
        if((this.x + this.radius > window.innerWidth || this.x < 0) && (this.y + this.radius > window.innerHeight || this.y < 0)){
            this.reset()   
        }
        
        
    }
    this.reset = function(){
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2
        this.speedX = Math.random() ;
        this.speedY = Math.random() ;
    }
}


function animate() {
    requestAnimationFrame(animate)
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for(var i = 0; i < stArray.length; i++){
        stArray[i].update();
    }
}

animate()

