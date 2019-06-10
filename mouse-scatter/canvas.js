var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var stArray = []

var mouse = {x:canvas.width/2, y:canvas.height/2}

window.addEventListener("mousemove", (event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
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


function particlePath(x, y, radius) {
    this.radius = radius;
    this.rad = Math.random() * Math.PI * 2
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y; 

    this.update = function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white"
        ctx.fill();
        this.x += Math.cos(this.rad) * 100;
        this.y += Math.sin(this.rad) * 100; 
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

