/*  created by Henry Zhang
    coded at 10/Jun/2019    */

var canvas = document.querySelector("canvas");

var ctx = this.canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

var mouse = {x:canvas.width/2, y:canvas.height/2}
var clicked = false

window.addEventListener("mousemove", (event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

    


