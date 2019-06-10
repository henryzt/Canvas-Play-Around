console.log("hello world.")

var box;




function createObjects(){
    //create gradient
    box = new component(10,10,200,200)
    box.speedX = 1;
}

function createGraditent(x,y,w,h){
    var grd1 = myCanvas.ctx.createLinearGradient(x,y,w,h);
    grd1.addColorStop(0, "#7837CF");
    grd1.addColorStop(1, "#C55E7B");
    return grd1
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



  function component(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myCanvas.ctx;
        ctx.fillStyle = createGraditent(this.x, this.y, this.width, this.height);
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