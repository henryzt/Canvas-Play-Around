console.log("hello world.")

var box;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}


function createGraditent(x,y,w,h){
    var grd1 = ctx.createLinearGradient(x,y,x + w,y + h);
    grd1.addColorStop(0, "#7837CF");
    grd1.addColorStop(1, "#C55E7B");
    return grd1
}


var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var ctx = this.canvas.getContext("2d");

var boxArray = []

for(var i = 0; i < 5; i++){
    var box = new component(10,10, (Math.random() + 0.5) * 400,(Math.random() + 0.5)*400)
    box.speedX = Math.random();
    box.speedY = Math.random();
    box.x = Math.random()*(window.innerWidth-400);
    box.y = Math.random()*(window.innerHeight-400);
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

