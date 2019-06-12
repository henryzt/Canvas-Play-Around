/*  created by Henry Zhang
    coded at 10/Jun/2019    */

var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var stArray = []

var mouse = {x:canvas.width/2, y:canvas.height/2}
var clicked = false

window.addEventListener("mousemove", (event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
})


window.ondevicemotion = function(event) {
    var accelerationX = event.accelerationIncludingGravity.x/10;
    var accelerationY = event.accelerationIncludingGravity.y/10;
    mouse.x = (1 + accelerationX) * canvas.width/2
    mouse.y = (1 + accelerationY) * canvas.height/2
}


window.addEventListener("mouseup",function(){
    clicked = true
})


window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

for(var i = 0; i < 400; i++){
    var st = new particlePath(mouse.x, mouse.y, 6)
    st.reset()
    stArray.push(st);
}


var grd1 = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
grd1.addColorStop(0, "#22c1c3");
grd1.addColorStop(1, "#fdbb2d");
    


function particlePath(x, y, radius) {
    this.radius = radius;
    this.rad = Math.random() * Math.PI * 2
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y; 
    this.distance = 100;

    this.update = function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = grd1
        
        if(clicked){
            ctx.fillStyle = "white"
            ctx.shadowBlur = 5;
            ctx.shadowColor = "white";
            this.distance+=2
            if(this.distance > 500){
                clicked = false
            }
        }
        if(!clicked && this.distance > 100){
            ctx.shadowBlur = 0
            this.distance -= 2;
        }

        ctx.fill();
        this.x += Math.cos(this.rad) * this.distance;
        this.y += Math.sin(this.rad) * this.distance; 
        if((this.x + this.radius > window.innerWidth || this.x < 0) && (this.y + this.radius > window.innerHeight || this.y < 0)){
            this.reset()   
        }
        
        
    }
    this.reset = function(){
        this.x = mouse.x
        this.y = mouse.y
        this.speedX = Math.random()
        this.speedY = Math.random()
    }
}


function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for(var i = 0; i < stArray.length; i++){
        stArray[i].update();
    }
}

animate()

//ok canvas is fun, this is actually created by accident