// Values
var winWidth=0,
	winHeight=0,
	winHalf = 0;

//resize
	function resizeWin() {
		winWidth = $(document).width();
		winHeight = $(document).height();
		if (winWidth > winHeight) {
		$('.background').width(winWidth).height(winHeight);
		$('.shatter-main').width(winWidth).height(winHeight);
		$('.cockroach').width(winWidth*.15).height(winWidth*.15);
	} else {
		$('.background').width(winWidth).height(winHeight);
		$('.shatter-main').width(winWidth).height(winHeight);
		$('.cockroach').width(winWidth*.4).height(winWidth*.4);
	}
		// alert('works');
		// winHalf = winWidth/2;
	}

$(window).resize(function() {
		resizeWin();
});

// Menu creater
resizeWin();