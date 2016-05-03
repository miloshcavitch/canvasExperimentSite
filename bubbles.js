var elTiempo = new Date();
var topCanvas = document.getElementById('bubbles-canvas');
var topctx = topCanvas.getContext('2d');
var windowCanvas = document.getElementById('window-canvas');
var winctx = windowCanvas.getContext('2d');
topCanvas.width = window.innerWidth;
topCanvas.height = window.innerHeight;
var transitionTime = 30;
var oppositeCornerDX = -0.2;
var oppositeCornerDY = -0.2;
var topEmitter = {x: topCanvas.width +100, y: topCanvas.height+ 30};//before it was -100, 30
var particles = [];
var topParticle = function(){
  this.x = topEmitter.x;
  this.y = topEmitter.y;
  this.dx = 4 - Math.random() * 8;
  this.dy = 4 - Math.abs(this.dx);
  if (Math.random() <= 0.5){
    this.dy *= -1;
  }
  this.ddx = 0.45 - Math.random() * 0.9;
  this.ddy = 0.45 - Math.random() * 0.9;
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
      if (i != 0){
        i -= 1;
      }
    }
    if (particles[i].y >= topCanvas.height + 1000 || particles[i].y <= -1000){
      particles.splice(i, 1);
      if (i != 0){
        i -=1;
      }
    }

  }
  topctx.globalAlpha = 1;
}

var testWindowSize = function(){
  if (topCanvas.width != window.innerWidth){
    topCanvas.width = window.innerWidth;
    windowCanvas.width = window.innerWidth;
    topEmitter.x = topCanvas.width + 100;

    updateBounds();
  }
  if (topCanvas.height != window.innerHeight){
    topCanvas.height = window.innerHeight;
    windowCanvas.height = window.innerHeight;
    topEmitter.y = topCanvas.height + 30;
    updateBounds();
  }
}
/////////////////////////////////
////////////////////////////////
//Window Circles
var windowCircles = [];
var windowBounds = {xLeft: window.innerWidth/4, xRight: window.innerWidth - window.innerWidth/4,
                    yTop: window.innerHeight/4, yBottom: window.innerHeight- window.innerHeight/4};
var desiredCircleArea;
var updateBounds = function(){
  var lastWidth = windowBounds.xRight - windowBounds.xLeft;
  var lastHeight = windowBounds.yBottom - windowBounds.yTop;
  windowBounds.xRight = topCanvas.width - topCanvas.width/4;
  windowBounds.xLeft = topCanvas.width/4;
  windowBounds.yTop = topCanvas.height/4;
  windowBounds.yBottom = topCanvas.height - topCanvas.height/4;
  var newWidth = windowBounds.xRight - windowBounds.xLeft;
  var newHeight = windowBounds.yBottom - windowBounds.yTop;
  desiredCircleArea = (newWidth * newHeight)/ 400;
  windowCircles.forEach(function(c){
    c.x = c.x * (newWidth/lastWidth);
    c.y = c.y * (newHeight/lastHeight);
  });
}
updateBounds()//init setting;
var WindowCircle = function(){
  this.x = (Math.random() * (windowBounds.xRight -windowBounds.xLeft)) + windowBounds.xLeft;
  this.y = (Math.random() * (windowBounds.yBottom - windowBounds.yTop)) + windowBounds.yTop;
  var maxSize = desiredCircleArea/10;
  this.finalSizeX =  Math.random() * 75;
  if (this.x + this.finalSizeX > windowBounds.xRight - this.finalSizeX){
    this.x = windowBounds.xRight - this.finalSizeX;
  }
  this.finalSizeY = Math.random() * 75;
  if (this.y + this.finalSizeY > windowBounds.yBottom - this.finalSizeY){
    this.y = windowBounds.yBottom - this.finalSizeY;
  }
  this.currentSizeX = 0;
  this.currentSizeY = 0;
  this.growthSpeedX = this.finalSizeX / transitionTime;
  this.growthSpeedY = this.finalSizeY / transitionTime;
  this.currentHover = 1;
  this.draw = function(){
    winctx.beginPath();
    winctx.fillStyle = 'black';
    winctx.arc(this.x,this.y,(this.currentSizeX * this.currentHover),0,Math.PI * 2);
    winctx.fill();
    //topctx.fillRect(this.x,this.y,this.currentSizeX,this.currentSizeY);
    winctx.closePath();

  }
}
var updateWindowCircles = function(){
}
var windowState = 'grow';
var updateWindowCircles = function(){
  checkFrame();
  switch (windowState){
    case 'grow':
      console.log('grow');
      windowCircles.forEach(function(wC){
        wC.draw();
        wC.currentSizeX += wC.growthSpeedX;
        if (titleHover === true && wC.currentHover < 1.1){
          wC.currentHover += 0.01;
        }
        if (titleHover === false && wC.currentHover > 1){
          wC.currentHover -= 0.01;
        }
      });
      break;

    case 'mid':
      console.log('mid');
      windowCircles.forEach(function(wC){
        wC.draw();
        if (titleHover === true && wC.currentHover < 1.1){
          wC.currentHover += 0.01;
        }
        if (titleHover === false && wC.currentHover > 1){
          wC.currentHover -= 0.01;
        }
      });
      break;
    case 'shrink':
      console.log('shrink')
      windowCircles.forEach(function(wC){
        wC.draw();
        wC.currentSizeX -= wC.growthSpeedX;
        if (wC.currentSizeX < 0){
          wC.currentSizeX = 0;
        }
      });
      break;
  }
}
var repopulateWindowCircles = function(){
  windowCircles = [];
  var circleArea = 0;
  var i = 0;
  while (circleArea < desiredCircleArea){
    windowCircles.push(new WindowCircle());
    circleArea += windowCircles[i].finalSizeX;
    i++;
  }
}
var tweenCount = 0;
var checkFrame = function(){
  tweenCount++;
  if (windowState === 'grow' && tweenCount === transitionTime){
    console.log('MID!');
    windowState = 'mid';
    tweenCount = 0;
  }
  if (windowState === 'mid' && tweenCount >= 200){
    console.log('SHRINK!');
    windowState = 'shrink';
    tweenCount = 0;
    updateProject();
  }
  if (windowState === 'shrink' && tweenCount >= transitionTime){
    console.log('grow!')
    windowState = 'grow';
    tweenCount = 0;
    repopulateWindowCircles();
  }
}
var titleHover = false;
$('.project-title').hover(function(){
  titleHover = !titleHover;
});
////////////////////////////////
///////////////////////////////
var updateColor = function(){
  $('#bubbles-canvas').css('background-color', colorShader((colorRay[Math.floor(Math.random() * 765)]), 170));
}

var updateTopCanvas = function(){
  topctx.clearRect(0,0,topCanvas.width,topCanvas.height);
  updateTopParticles();
}
var updateWindowCanvas = function(){
  winctx.clearRect(0,0,windowCanvas.width,windowCanvas.height);
  //function to draw currentproject
  //change globalComposite to destination-in
  updateWindowCircles();
}
var render = function(){
  updateTopCanvas();
}
