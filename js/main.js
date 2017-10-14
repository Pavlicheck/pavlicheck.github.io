

darkOpacity(0, 'none')


function darkOpacity(opacity, display, time) {
$('.dark').css('display', 'block');
$('.dark').animate({opacity: opacity}, time, function(){$(this).css('display', display)});
}



function scoreShow() {
		darkOpacity(0.8, 'block', 500);
		$('.score').css('display','block').animate({left: 0}, 500);
}

function scoreHide() {
		darkOpacity(0, 'none', 500);
		$('.score').animate({left: -3000}, 500, function() {$(this).css('display','none')});
}

$('#score').click(scoreShow);
$('.score-btn-back').on('click', scoreHide);