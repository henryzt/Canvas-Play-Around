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

for(var i = 0; i < 400; i++){
    var st = new star(window.innerWidth/2, window.innerHeight/2, 4)
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
    this.first=true
    this.update = function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha+=0.01})`
        ctx.shadowBlur = 5;
        ctx.shadowColor = "white";
        ctx.fill();
        this.x += this.speedX;
        this.y += this.speedY; 
        if((this.x + this.radius > window.innerWidth || this.x < 0) && (this.y + this.radius > window.innerHeight || this.y < 0)){
            this.reset()   
        }
        
        
    }
    this.reset = function(){
        var directionX = Math.random() >= 0.5? 1 : -1;
        var directionY = Math.random() >= 0.5? 1 : -1;
        this.speedX = directionX * Math.random() ;
        this.speedY = directionY * Math.random() ;
        var random = Math.random() //random displacement
        this.x = window.innerWidth/2 + this.speedX * random * window.innerWidth/2
        this.y = window.innerHeight/2 + this.speedY * random * window.innerHeight/2
        this.alpha = 0
        
    }
}


function animate() {
    requestAnimationFrame(animate)
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for(var i = 0; i < stArray.length; i++){
        stArray[i].update();
    }
}

animate()

