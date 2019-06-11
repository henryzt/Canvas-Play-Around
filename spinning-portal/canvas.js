/*  created by Henry Zhang
    coded at 11/Jun/2019    */

var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var stArray = []

var onHold = false;
var darkMode = true;

//colour picked from https://color.adobe.com/explore
var bright = ["#234D51","#9DD3D9","#59C6D1","#3B4F51","#FF513F"]
var dark = ["#C370FF","#8E66E8","#817DFF","#6684E8","#70B7FF"]
var colors = darkMode? dark : bright

function startOnHold(){
    document.getElementById("text").className = "center hidden";
    onHold = true
}
function endOnHold(){
    document.getElementById("text").className = "center";
    onHold = false
}

window.addEventListener("mousedown", function(){startOnHold()})
window.addEventListener("mouseup", function(){endOnHold()})
window.addEventListener("touchstart", function(){startOnHold()})
window.addEventListener("touchend", function(){endOnHold()})

window.addEventListener("dblclick", function(){
    darkMode = ! darkMode
    colors = darkMode? dark : bright
    textColor = darkMode? "white" : "#234D51"
    document.getElementById("text").style.color = textColor;
    this.console.log(colors)
})


window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

function randomColorPicker(){
    return Math.floor(Math.random()*colors.length)
}

for(var i = 0; i < 300; i++){
    var st = new particlePath(window.innerWidth/2, window.innerHeight/2, Math.random()*canvas.width, randomColorPicker())
    st.reset()
    stArray.push(st);
}

//circular motion ref: youtu.be/raXW5J1Te7Y
function particlePath(x, y, radius, colorInt) {
    this.radius = radius;
    this.rad = Math.random() * Math.PI * 2
    this.speed = Math.random() * 0.01;   
    this.lastSpeed = this.speed
    this.x = x;
    this.y = y; 

    this.update = function() {
        const lastPoint = {x:this.x, y:this.y}

        this.rad += this.speed
        this.x = x + Math.cos(this.rad) * this.radius;
        this.y = y + Math.sin(this.rad) * this.radius; 
        
        if(onHold){
            if(this.speed < 0.2){
                this.speed +=0.00005
                this.radius += 0.2
            }else{
                console.log(this.speed)
            }
        }
        if(!onHold && this.speed > this.lastSpeed){
            this.speed-=0.0001;
            this.radius -= 0.4
        }

        ctx.beginPath()
        ctx.strokeStyle = colors[colorInt]
        ctx.lineWidth = 3
        ctx.moveTo(lastPoint.x,lastPoint.y)
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
        ctx.closePath()

        // if(!onHold && lastPoint != x){
        //     ctx.shadowBlur = 5;
        //     ctx.shadowColor = colors[colorInt];
        // }else{
        //     ctx.shadowBlur = 0;
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
    var rgb = darkMode ? "0, 0, 0" : "240, 240, 240"
    var alpha = onHold ? "0.1" : "0.5"
    ctx.fillStyle = `rgba(${rgb}, ${alpha})`

    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for(var i = 0; i < stArray.length; i++){
        stArray[i].update();
    }
}

animate()
