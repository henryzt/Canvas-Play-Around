/*  created by Henry Zhang
    coded at 11/Jun/2019    */

var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var stArray = []

var onHold = false;

window.addEventListener("mousedown", function(){
    onHold = true
})

window.addEventListener("mouseup", function(){
    onHold = false
})

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

function randomColorPicker(){
    var colors = ["#234D51","#9DD3D9","#59C6D1","#3B4F51","#FF513F"]
    return colors[Math.floor(Math.random()*colors.length)]
}

for(var i = 0; i < 100; i++){
    var st = new particlePath(window.innerWidth/2, window.innerHeight/2, Math.random()*canvas.width, randomColorPicker())
    st.reset()
    stArray.push(st);
}


function particlePath(x, y, radius, color) {
    this.radius = radius;
    this.rad = Math.random() * Math.PI * 2
    this.speed = Math.random() * 0.01;   
    this.x = x;
    this.y = y; 

    this.update = function() {
        const lastPoint = {x:this.x, y:this.y}

        this.rad += this.speed 
        this.x = x + Math.cos(this.rad) * this.radius;
        this.y = y + Math.sin(this.rad) * this.radius; 

        if(!onHold){
            ctx.beginPath()
            ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1
            ctx.strokeStyle = "rgba(230, 230, 230, 0.5)"
            ctx.stroke()
            ctx.closePath()
        }
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.moveTo(lastPoint.x,lastPoint.y)
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
        ctx.closePath()
        
        // if((this.x + this.radius > window.innerWidth || this.x < 0) && (this.y + this.radius > window.innerHeight || this.y < 0)){
        //     this.reset()   
        // }
        
        
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
    if(!onHold){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }else{
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    for(var i = 0; i < stArray.length; i++){
        stArray[i].update();
    }
}

animate()

