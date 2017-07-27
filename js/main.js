var screenWidth = $(window).width(),
	screenHeight = $(window).height(),
	menuWidth = 0,
	menuHeight = 0,
	ptMenu = 0,
	plMenu = 0
	fzlink = 0;
function calcSize(sW, sH) {

	if (sW > sH) {
		menuWidth = sW * .6;
		menuHeight = sH * .7;
		ptMenu = sH * .15;
		plMenu = sW * .2;
 	} else {
 		menuWidth = sW * .9;
		menuHeight = sH * .8;
		ptMenu = sH * .1;
		plMenu = sW * .05;
 	}
 	fzlink = parseInt(menuHeight * .2 *.4);
 	fzcock = parseInt(menuWidth * .2 * .85);
}

calcSize(screenWidth, screenHeight);
$('.main-wrap').height(screenHeight);
$('.main-menu').height(menuHeight);
$('.main-menu').width(menuWidth);
$('.main-menu').css({"left": plMenu, 'top': ptMenu});
$('.link span').css({'font-size': fzlink + "px"});
$("span.cock").css({'font-size': fzcock + "px"});


$(window).resize(function() {
screenWidth = $(window).width();
screenHeight = $(window).height();
calcSize(screenWidth, screenHeight);
$('.main-wrap').height(screenHeight);
$('.main-menu').height(menuHeight);
$('.main-menu').width(menuWidth);
$('.main-menu').css({"left": plMenu, 'top': ptMenu});
$("span.cock").css({'font-size': fzcock + "px"});
});





$('.link').on('click', function() {
		$('.activ').removeClass('activ');
		$('.activ-tab').removeClass('activ-tab');
		$($(this).attr('data-tab-class')).addClass('activ-tab');
		$(this).addClass('activ');
	});

