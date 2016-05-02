var projectsRay = [{name: "HUE WARS", description: "blah", link: "#"},
                {name: "FUNFETTI", description: "blah", link: "#"},
                {name: "PIXEL SMOKE", description: "blah", link: "#"},];

var titleSwitch = true;
$('#ta').css('left', '-150%');
$('#ta').css('display', 'none');
var updateProject = function(){
  var inToT, outOfT, inToD, outOfD;
  if (titleSwitch === true){
    inToT = '#ta';
    outOfT = '#tb';
    inToD = '#da';
    outOfD = '#db';
  } else {
    inToT = '#tb';
    outOfT = '#ta';
    inToD = '#db';
    outOfD = '#da';
  }
  $(inToT).css('display', 'block');
  $(outOfT).css('left', '150%');
  setTimeout(function(){
    $(outOfT).css('display', 'none');
    $(outOfT).css('left', '-150%');
  }, 750);
  setTimeout(function(){
    $(inToT).css('left', '25%');
  }, 10)
  titleSwitch = !titleSwitch;
}
