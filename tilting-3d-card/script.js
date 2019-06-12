/*  created by Henry Zhang
    coded at 12/Jun/2019    */


window.addEventListener("mousemove", (event)=>{
    let mouseX = event.clientX
    let mouseY = event.clientY
    let halfWidth = window.innerWidth/2
    let halfHeight = window.innerHeight/2 
    let xdeg = (mouseX - halfWidth)/halfWidth * 10;
    let ydeg = (mouseY - halfHeight)/halfHeight * 10;
    document.getElementById("card").style.transform = `rotateX(${ydeg}deg) rotateY(${xdeg}deg)`;
})

    


