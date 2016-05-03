//init
updateProject();
repopulateWindowCircles();
var update = function(){
  testWindowSize();
  updateTopCanvas();
}

setInterval(update, 25);
