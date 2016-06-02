var pseudoSprite = {shapes: []};

var previewPoint = function(){
  this.worldX = Math.random() * backCanvas.width;
  this.worldY = Math.random() * backCanvas.height;
}
var previewPoly = function(){
  this.color = Math.floor(Math.random() * 360);
  this.type = 'poly';
  this.globalAlpha = Math.random();
  this.positions = [];
  var random = Math.floor(Math.random() * 8) + 2;
  for ( var i = 0; i < random; i++){
    this.positions.push(new previewPoint() );
  }
}
var previewCircle = function(){
  this.color = Math.floor(Math.random() * 360)
  this.type = 'circle';
  this.colorSpeed = Math.floor(Math.random() * 5) + 1;
  this.globalAlpha = Math.random();
  this.alphaSpeed = Math.random() * 0.05;
  this.positions = [];
  this.radius = Math.random() * 40;
  this.positions.push(new previewPoint() );
}

for (var i = 0; i < 5; i++){
  pseudoSprite.shapes.push(new previewCircle());
}
for (var i = 0; i < 5; i++){
  pseudoSprite.shapes.push(new previewPoly());
}
console.log(pseudoSprite);
var polyEditPointRender = function(shape, color){
  ctx.globalAlpha = 0.6;
  shape.positions.forEach(function(p){
    ctx.beginPath();
    ctx.arc(p.worldX, p.worldY, handleSize, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  });
  ctx.beginPath();
  ctx.globalAlpha = 0.4;
  ctx.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(p){
    ctx.lineTo(p.worldX, p.worldY);
  });
  ctx.lineTo(shape.positions[0].worldX, shape.positions[0].worldY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.globalAlpha = 1;
}
var backGrid = function(){
  backCTX.beginPath();
  backCTX.fillStyle = '#555555';
  backCTX.rect(0, 0, backCanvas.width, backCanvas.height);
  backCTX.fill();
  backCTX.closePath();
  var increment = backCanvas.height/64;
  var pos = backCanvas.width/2;
  backCTX.strokeStyle = '#999999';
  backCTX.lineWidth = 0.125;
  while (pos > 0){
    backCTX.beginPath();
    backCTX.moveTo(pos, 0);
    backCTX.lineTo(pos, backCanvas.height);
    backCTX.stroke();
    backCTX.closePath();
    pos -= increment;
  }
  pos = backCanvas.width/2 + increment;
  while (pos < backCanvas.width){
    backCTX.beginPath();
    backCTX.moveTo(pos, 0);
    backCTX.lineTo(pos, backCanvas.height);
    backCTX.stroke();
    backCTX.closePath();
    pos += increment;
  }
  pos = increment;
  for (var i = 0; i < 63; i++){
    backCTX.beginPath();
    backCTX.moveTo(0, pos);
    backCTX.lineTo(backCanvas.width, pos);
    backCTX.stroke();
    backCTX.closePath();
    pos += increment;
  }
}
var renderPoly = function(shape){
  backCTX.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(p){
    backCTX.lineTo(p.worldX, p.worldY);
  });
  backCTX.globalAlpha = shape.globalAlpha;
  shape.globalAlpha += shape.alphaSpeed;
  if (shape.globalAlpha >= 1){
    shape.alphaSpeed *= -1;
  }
  backCTX.fillStyle = 'black';
  shape.color += shape.colorSpeed;
  backCTX.fill();
}
var renderCircle = function(shape){
  backCTX.globalAlpha = shape.globalAlpha;
  shape.globalAlpha += shape.alphaSpeed;
  if (shape.globalAlpha >= 1){
    shape.alphaSpeed *= -1;
  }
  backCTX.fillStyle = 'black';
  backCTX.arc(shape.positions[0].worldX, shape.positions[0].worldY, shape.radius, 0, Math.PI * 2);
  backCTX.fill();
}
var renderSprite = function(sprite){
  sprite.shapes.forEach(function(shape){
    switch (shape.type){
      case 'poly':
        renderPoly(shape);
        break;
      case 'circle':
        renderCircle(shape);
        break;
    }
  });
  backCTX.fillStyle = 'black';
  backCTX.globalAlpha = 1;
}
var updateDrawingApp = function(){
  backCTX.clearRect(0,0,backCanvas.width,backCanvas.height);
  backGrid();
  renderSprite(pseudoSprite);
  //include vector shapes and drawings
}
