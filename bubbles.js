var elTiempo = new Date();
var topCanvas = document.getElementById('bubbles-canvas');
var topctx = topCanvas.getContext('2d');
topCanvas.width = window.innerWidth;
topCanvas.height = window.innerHeight;

var oppositeCornerDX = -0.2;
var oppositeCornerDY = -0.2;
var topEmitter = {x: topCanvas.width +100, y: topCanvas.height+ 30};//before it was -100, 30
var particles = [];
var topParticle = function(){
  this.x = topEmitter.x;
  this.y = topEmitter.y;
  this.dx = 4.5 - Math.random() * 9;
  this.dy = 4.5 - Math.abs(this.dx);
  if (Math.random() <= 0.5){
    this.dy *= -1;
  }
  this.ddx = 0.3 - Math.random() * 0.6;
  this.ddy = 0.3 - Math.random() * 0.6;
  this.size = 1 + Math.random() * 1.5;
  this.dSize = 0.5 + Math.random() * 0.3;
  this.alpha = 0.45;
  this.draw = function(){
    this.dx += this.ddx;

    this.x += this.dx;
    this.dy += this.ddy + oppositeCornerDY;
    this.y += this.dy;
    if (this.maxSize === false){
      this.size += this.dSize;
    }
    if (this.minAlpha === false){
      this.alpha -= 0.005;
    }
    topctx.beginPath();
    topctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    topctx.fillStyle = 'white'
    topctx.globalAlpha = this.alpha;
    topctx.fill();
  }
  this.maxSize = false;
  this.minAlpha = false;
}
var updateTopParticles = function(){
  particles.push(new topParticle);
  for (var i = 0; i < particles.length; i++){
    particles[i].draw();
    if (particles[i].alpha <= 0.05){
      particles[i].minAlpha = true;
    }
    if (particles[i].size > 350){
      particles[i].maxSize = true;
    }
    if (particles[i].x >= topCanvas.width +1000 || particles[i].x <= -1000){
      particles.splice(i, 1);
    }
    if (particles[i].y >= topCanvas.height + 1000 || particles[i].y <= -1000){
      particles.splice(i, 1);
    }
  }
  topctx.globalAlpha = 1;
}

var testWindowSize = function(){
  if (topCanvas.width != window.innerWidth){
    topCanvas.width = window.innerWidth;
    topEmitter.x = topCanvas.width + 100;
    //updateBounds();
  }
  if (topCanvas.height != window.innerHeight){
    topCanvas.height = window.innerHeight;
    topEmitter.y = topCanvas.height + 30;
    //updateBounds();
  }
}


var updateColor = function(){
  $('#bubbles-canvas').css('background-color', colorShader((colorRay[Math.floor(Math.random() * 765)]), 170));
}

var updateTopCanvas = function(){
  topctx.clearRect(0,0,topCanvas.width,topCanvas.height);
  updateTopParticles();
}
var render = function(){
  updateTopCanvas();
}
