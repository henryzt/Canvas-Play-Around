console.log("hello world.")
var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
var ctx = canvas.getContext("2d");

console.log(canvas)


//create gradient
var grd1 = ctx.createLinearGradient(0, 0, 200, 100);
grd1.addColorStop(0, "#7837CF");
grd1.addColorStop(1, "#C55E7B");

ctx.fillStyle = grd1;
ctx.fillRect(10, 10, 150, 80);

