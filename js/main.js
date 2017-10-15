

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


function createField(width, height) {
	let fieldStr = '';
	for (let rowId=0; rowId < height; rowId++) {
		fieldStr += '<div class="play-row">';
		for (let cellId = 0; cellId < width; cellId++) {
			fieldStr += '<div class="play-cell" data-type="empty"></div>';
		}
		fieldStr += '</div>'
	}
	$('#play-field').append(fieldStr);

	$('.play-cell').each(function() {
		let cooldown = (Math.random().toFixed(3))*1000 + 500;
		$(this).delay(100).animate({opacity: 1}, cooldown)
	})
}

createField(8,8);