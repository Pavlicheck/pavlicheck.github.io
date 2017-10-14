

darkOpacity(0, 'none')


function darkOpacity(opacity, display) {
$('.dark').css('display', 'block');
$('.dark').animate({opacity: opacity}, 1000, function(){$(this).css('display', display)});
}



function scoreShow() {
		darkOpacity(0.8, 'block');
		$('.score').css('display','block').animate({left: 0}, 1000);
}

$('#score').click(scoreShow);