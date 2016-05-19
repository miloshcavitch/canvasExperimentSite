var smoke = [];
var currentColor = 0;
var rectSmoke = function(){
  this.width = 10;
  this.height = 10;

  this.x = mouse.x - this.width/2;
  this.y = mouse.y;
  this.dx = Math.random() * 5 - 2.5;
  this.dy = 8 - Math.abs(this.dx);
  this.ddx = Math.random() * 0.4 - 0.2;
  this.ddy = Math.random() * 0.4 - 0.2;
  this.color = currentColor;
  this.opacity = 0.7;
  this.draw = function(){
    this.x += this.dx;
    this.dx += this.ddx;
    this.y += this.dy;
    this.dy += this.ddy;
    this.width *= 1.08;
    this.height *= 1.08;
    this.opacity -= 0.02;
   backCTX.fillStyle = "hsl(" + this.color + ", 100%, 50%)";
   backCTX.globalAlpha = this.opacity;
   backCTX.fillRect(this.x,this.y,this.width,this.height);

   backCTX.strokeStyle = "hsl(" + this.color + ", 100%, 60%)";
   backCTX.globalAlpha = this.opacity;
   backCTX.lineWidth = this.width/12;
   backCTX.strokeRect(this.x,this.y,this.width,this.height);

  }
}
var drawBall = function(){
 backCTX.beginPath();
 backCTX.fillStyle = 'black';
 backCTX.strokeStyle = 'white';
 backCTX.globalAlpha = 1;
 backCTX.arc(mouse.x,mouse.y,20,0,Math.PI * 2);
 backCTX.fill();
 backCTX.globalAlpha = 0.7;
 backCTX.stroke();
 backCTX.closePath();
}
var updateSmoke = function(){
 backCTX.clearRect(0,0,backCanvas.width,backCanvas.height);
 backCTX.fillStyle = 'black';
 backCTX.fillRect(0,0,backCanvas.width,backCanvas.height);
  currentColor += 7;
  smoke.push(new rectSmoke());
  smoke.push(new rectSmoke());
  for (var i = 0; i < smoke.length; i++){
    smoke[i].draw();
    if (smoke[i].opacity <= 0.02){
      smoke.splice(i,1);
      i -= 1;
    }
  }
  //drawBall();
 backCTX.globalAlpha = 1;
}
