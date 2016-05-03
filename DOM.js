  var projectsRay = [{name: "HUE WARS", description: "Elitr nemore prodesset sea ei, cum et quando aeterno. Congue causae salutatus duo ne, nam id hinc eripuit omittantur, an rationibus honestatis eloquentiam eos.", link: "#"},
                {name: "FUNFETTI", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", link: "#"},
                {name: "PIXEL SMOKE", description: "Quidam mediocrem eam ei. Vim partiendo liberavisse ad. Ut omnis consulatu est, duo nibh zril iisque, no.", link: "#"},];
var titleIndex = 0;
var titleSwitch = true;
$('#ta').css('left', '-125%');
$('#ta').css('display', 'none');
$('#da').css('left', '225%');
$('#da').css('display', 'none');
var updateLink = function(){
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
  $(inToD).css('display', 'block');
  $(inToT).empty();
  $(inToD).empty();
  $(inToT).append("<a href='" + projectsRay[titleIndex].link + "' <h2>" + projectsRay[titleIndex].name + "</h2></a>");
  $(inToD).append("<p>" + projectsRay[titleIndex].description + "</p>");
  $(outOfT).css('left', '150%');
  $(outOfD).css('left', '-150%');
  setTimeout(function(){
    $(outOfT).css('display', 'none');
    $(outOfD).css('display', 'none');
    $(outOfT).css('left', '-150%');
    $(outOfD).css('left', '225%');
  }, 750);
  setTimeout(function(){
    $(inToT).css('left', '25%');
    $(inToD).css('left', '50%');
  }, 10)
  titleSwitch = !titleSwitch;
  titleIndex++;
  if (titleIndex === projectsRay.length){
    titleIndex = 0;
  }
}

var updateProject = function(){
  updateColor();
  updateLink();

}
$(document).on('click', function(){
  updateProject();
  tweenCount = 0;
  windowState = 'shrink';
});
