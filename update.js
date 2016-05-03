//init
updateProject();
repopulateWindowCircles();
var update = function(){
  testWindowSize();
  updateBackCanvas();
  updateTopCanvas();
}

setInterval(update, 25);
