/*  created by Henry Zhang
    coded at 10/Jun/2019    */

console.log("hello world.")

function createGraditent(x,y,w,h){
    var grd1 = ctx.createLinearGradient(x,y,x + w,y + h);
    grd1.addColorStop(0, "#7837CF");
    grd1.addColorStop(1, "#C55E7B");
    return grd1
}


var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var boxArray = []

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

for(var i = 0; i < 5; i++){
    var box = new component(10,10,10,10)
    box.height = (Math.random() + 0.5) * (window.innerWidth/5)
    box.width = (Math.random() + 0.5) * (window.innerWidth/5)
    box.speedX = Math.random();
    box.speedY = Math.random();
    box.x = Math.random()*(window.innerWidth-box.width);
    box.y = Math.random()*(window.innerHeight-box.height);
    box.blur = Math.random() * 20;
    boxArray.push(box);
}


function component(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y; 
    this.blur = 0;  
    this.update = function() {
        ctx.fillStyle = createGraditent(this.x, this.y, this.width, this.height);
        ctx.filter = `blur(${this.blur}px)`;
        ctx.globalAlpha = 0.5
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.x += this.speedX;
        this.y += this.speedY; 
        if(this.x + this.width > window.innerWidth || this.x < 0){
            this.speedX = - this.speedX
        }
        if(this.y + this.height > window.innerHeight || this.y < 0){
            this.speedY = - this.speedY
        }
        
    }
}


function animate() {
    requestAnimationFrame(animate)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < boxArray.length; i++){
        boxArray[i].update();
    }
}

animate()

