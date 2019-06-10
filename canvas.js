console.log("hello world.")

var box;


function createObjects(){
    //create gradient
    var grd1 = myCanvas.ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
    grd1.addColorStop(0, "#7837CF");
    grd1.addColorStop(1, "#C55E7B");
    box = new component(10,10,200,200,grd1)
    box.speedX = 1;
}


var myCanvas = {
    canvas : document.querySelector("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight; 
        this.ctx = this.canvas.getContext("2d");
        this.interval = setInterval(updateArea, 20);
        console.log(this.canvas)
    },
    clear : function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval);
    }
  }



  function component(x, y, width, height, color ) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myCanvas.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }


function updateArea() {
    myCanvas.clear();
    box.x += box.speedX;
    box.y += box.speedY;    
    box.update();
}


myCanvas.start()

createObjects()