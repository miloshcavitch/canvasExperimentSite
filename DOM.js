
  var projectsRay = [{name: "HUE WARS", description: "Elitr nemore prodesset sea ei, cum et quando aeterno. Congue causae salutatus duo ne, nam id hinc eripuit omittantur, an rationibus honestatis eloquentiam eos.", link: "#", func: function(){updateStars()}},
                {name: "FUNFETTI", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", link: "#", func: function(){updateFetti()}},
                {name: "PIXEL SMOKE", description: "Quidam mediocrem eam ei. Vim partiendo liberavisse ad. Ut omnis consulatu est, duo nibh zril iisque, no.", link: "#", func: function(){}},
                {name: "WOBBLE WINDOW", description: "Lorem ipsum dolor sit amet. Vim partiendo liberavisse ad.", link: 'https://www.facebook.com', func: function(){updateWobble()}}];
var titleIndex = 0;
var projectIndex = titleIndex;
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
  console.log("updateProject: " + titleIndex);
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
  projectIndex = titleIndex;
  titleIndex++;
  if (titleIndex === projectsRay.length){
    titleIndex = 0;
  }
}
var updateFunc = function(){
  activeBack = projectsRay[projectIndex].func;
}

var updateProject = function(){
  updateColor();
  updateLink();
}
$('#carousel-selector').on('click', function(event){
  titleIndex = parseInt(event.target.id);

});
/*
$(document).on('click', function(){
  //commented out for testing
  updateProject();
  tweenCount = 0;
  windowState = 'shrink';
});
*/
$(document).on('swipeleft', function(){
  updateProject();
  tweenCount = 0;
  windowState = 'shrink';
});

$(document).on('tap', function(){
  console.log('bruh');
})

$('#Mmenu').on('click', function(){
  console.log('this is it what');
});
