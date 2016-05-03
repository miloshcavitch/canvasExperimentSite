var mouse = {x: undefined, y: undefined};
$(document).mousemove(function(event){//mouse input
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  console.log(mouse.x + ", " + mouse.y);
});

var backCanvas = document.getElementById('back-canvas');
var backCTX = backCanvas.getContext('2d');
backCanvas.width = window.innerWidth;
backCanvas.height = window.innerHeight;
backCTX.fillStyle = 'black';
backCTX.fillRect(0,0,backCanvas.width,backCanvas.height);
var updateBackCanvas = function(){
  backCTX.clearRect(0,0,backCanvas.width,backCanvas.height);
  activeBack();//run active background project;
}
