/*  created by Henry Zhang
    coded at 12/Jun/2019    */


var mouse = {x:window.innerWidth/2, y:window.innerHeight/2}
var clicked = false

window.addEventListener("mousemove", (event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

    


