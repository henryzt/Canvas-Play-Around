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
    var directionX = Math.random() >= 0.5? 1 : -1;
    var directionY = Math.random() >= 0.5? 1 : -1;
    st.speedX = directionX * Math.random();
    st.speedY = directionY * Math.random();
    st.blur = Math.random() * 20;
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
        ctx.fillStyle = `rgba(${this.r+=Math.random()}, ${this.g+=Math.random()}, ${this.b+=Math.random()})`;
        ctx.fill();
        this.x += this.speedX;
        this.y += this.speedY; 
        // if(this.x + this.width > window.innerWidth || this.x < 0){
        //     this.speedX = - this.speedX
        // }
        // if(this.y + this.height > window.innerHeight || this.y < 0){
        //     this.speedY = - this.speedY
        // }
        
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

