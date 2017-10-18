let gameInterval,
	fps = 1000/60,
	gameScore = 0,
	playTime = {min: "00", sec: "00"}
	minCount = 1,
	way = 'right',
	deg = '0deg',
	hasShield = false,
	fieldArray = [],
	playerX = 0,
	playerY = 0,
	types = ['hole', 'speed', 'field', 'candy', 'hole', 'shield'],
	// types = ['shield'],
	timeCounter = {max: 60},
	itemsCounter = {max: 120},
	speedCounter = {max: 20},
	countItems = {field: 0, candy: 0, hole: 0, shield: 0, speed: 0},
	delayToHole = 1000;
	buttonsFlag = 'game'; 

	window.onkeydown = function(key) {
			switch (key.keyCode) {
				case (37): {
					way = 'left';
					rotatePlayer('180deg');
					break;
					
				}
				case (38): {
					way = 'up';
					rotatePlayer('-90deg');
					break;

				}
				case (39): {
					rotatePlayer('0');
					way = 'right';
					break;
				}
				case (40): {
					rotatePlayer('90deg');
					way = 'down';
					break;
				}
				case (32): {
					switch (buttonsFlag) {
						case('gameover'): {
								buttonsFlag = 'game';
								createField(8,8); 
								$('.play-state').css({display: 'none', opacity: 0}).empty();
								break;
						}
						case('pause'): {
								buttonsFlag = 'game';
								gameInterval = setInterval(() => play(), fps);
								$('.play-state').css({display: 'none', opacity: 0}).empty();
								break;
						}
						case('exitGame'): {
								buttonsFlag	= 'menu';
								$('.play-state').css({display: 'none', opacity: 0}).empty();
								break;
						}
					} 
					break;
				}
				case (27): {
					switch (buttonsFlag) {
						case('game'): {
								pause();
							break;
						}
						case('pause'): {
								buttonsFlag = 'game';
								gameInterval = setInterval(() => play(), fps);
								$('.play-state').css({display: 'none', opacity: 0}).empty();
								break;
						}
						case('exitGame'): {
							buttonsFlag = 'game';
							gameInterval = setInterval(() => play(), fps);
							$('.play-state').css({display: 'none', opacity: 0}).empty();
							break;
						}
					}
					break;
				}
			}
	}


function start() {
		buttonsFlag	= 'game';
		$('#playground').css('display', 'flex').animate({opacity: 1}, 500);
		createField(8,8);
}

function pause() {
	buttonsFlag	= 'pause';
	clearInterval(gameInterval);
	$('.play-state').append('<h1>Pause</h1><button id="continue">Continue</button><button id="menu">Menu</button>').css('display', 'flex').animate({opacity: 1}, 500);
	$('#continue').on('click', () => {gameInterval = setInterval(() => play(), fps)
								$('.play-state').css({display: 'none', opacity: 0}).empty();
								buttonsFlag = 'game';
								});
	$('#menu').mousedown(() => exit());
}

function exit() {
	buttonsFlag	= 'menu';
	$('#play-field').empty();
	$('.play-state').empty().css({display: 'none', opacity: 0});
	// $('.play-counter').empty().css({display: 'none', opacity: 0});
	// $('.play-buttons').empty().css({display: 'none', opacity: 0});
	clearInterval(gameInterval);
	$('#playground').css({display: 'none', opacity: 0});
}



let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;




document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;                                                        


function handleTouchStart(evt) {                                         
	xDown = evt.touches[0].clientX;                                      
	yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
	if ( ! xDown || ! yDown ) {
		return;
	}

	let xUp = evt.touches[0].clientX;                                    
	let yUp = evt.touches[0].clientY;

	let xDiff = xDown - xUp;
	let yDiff = yDown - yUp;

	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
		if ( xDiff > 0 ) {
			way = 'left';
			rotatePlayer('180deg');
		} else {
			way = 'right';
			rotatePlayer('0deg');

		}                       
	} else {
		if ( yDiff > 0 ) {
			way = 'up';
			rotatePlayer('-90deg');
		} else { 
			way = 'down';
			rotatePlayer('90deg');
		}                                                                 
	}
	/* reset values */
	xDown = null;
	yDown = null;                                             
};


function rotatePlayer(deg) {
		$('.play-cell[data-type = "player"]').css('transform', 'rotate(' + deg + ')')
}

darkOpacity(0, 'none')


function darkOpacity(opacity, display, time) {
		$('.dark').css('display', 'block');
		$('.dark').animate({opacity: opacity}, time, function(){$(this).css('display', display)});
}

function scoreShow() {
		darkOpacity(0.8, 'block', 500);
		$('.score').css('display','block').animate({left: 0}, 500);
		$('.score-best .score-value').text(window.localStorage.getItem('bestScore'));
		$('.score-last .score-value').text(window.localStorage.getItem('lastScore'));
		$('.score-time .score-value').text(window.localStorage.getItem('allTime'));
		$('.score-candies .score-value').text(window.localStorage.getItem('candy'));
		$('.score-holes .score-value').text(window.localStorage.getItem('hole'));
		$('.score-field .score-value').text(window.localStorage.getItem('field'));
		$('.score-speed .score-value').text(window.localStorage.getItem('speed'));
		$('.score-shield .score-value').text(window.localStorage.getItem('shield'));

}

function scoreHide() {
		darkOpacity(0, 'none', 500);
		$('.score').animate({left: -3000}, 500, function() {$(this).css('display','none')});
}

function makeTime(start) {
	if (+start.sec < 59) {
		start.sec = (+start.sec + 1) + '';
	} 	else  {
		start.sec = '0';
		start.min = (+start.min + 1) + '';
	}
	if (start.sec.length < 2) start.sec = '0' + start.sec; 
	if (start.min.length < 2) start.min = '0' + start.min; 
	return start.min + ':' + start.sec;
}

function MakeCooldown(obj, func, arg) {
	let counter = 0;
	this.go = () => {
		if (counter >= obj.max) {
				counter = 0;
				return func.call(this, arg);
			} else {
				counter++;
			}
	}
}


function makeItem() {
		let type = chooseType();
		let n = (Math.random()*$('.play-cell').length - 1).toFixed(0);
		let elem = $('.play-cell').eq(n);
		// if (elem.attr('date-type') == 'empty') {
			if (elem.attr('data-type') == 'empty') {
					elem.attr('data-type', type);
					setTimeout( ()=> {if (elem.attr('data-type') !='empty') elem.css('animation', "hideItem 1s 1")}, delayToHole);
					
					setTimeout(() => {if (elem.attr('data-type') !='empty') elem.attr('data-type', 'hole');}, delayToHole + 1000);
					} else {
						makeItem();
					}
					
}

function chooseType() {

	let n = (Math.random() * (types.length-1)).toFixed(0);
	return types[n]
}

function makePlayer () {
	x = 0;
	y = 0;
	$('.play-cell').eq(0).attr('data-type', 'player');
}

function movePlayer () {
	let newPlayerX = playerX,
		newPlayerY = playerY;
	switch (way) {
		case('right'): {
			deg='0deg';
			if (playerX == fieldArray.length-1) {
				newPlayerX = 0;
				break;
			}
			newPlayerX++;
			break;
		}
		case('left'): {
			deg='180deg'
			if (playerX == 0) {
				newPlayerX = fieldArray.length-1;
				break;
			}
			newPlayerX--;
			break;
		}
		case('down'): {
			deg='90deg';
			if (playerY == fieldArray.length-1) {
				newPlayerY = 0;

				break;
			}
			newPlayerY++;

			break;
		}
		case('up'): {
			deg='-90deg';
			if (playerY == 0) {
				newPlayerY = fieldArray.length-1;
				break;

			}
			newPlayerY--;
			break;
		}
	}

		switch ($(fieldArray[newPlayerY][newPlayerX]).attr('data-type')) {
			case ('empty'): {
				break;
			}
			case ('field'): {
				actions.field();
				break;
			}
			case ('candy'): {
				actions.candy();
				break;
			}
			case ('speed'): {
				actions.speed();
				
				break;
			}
			case ('hole'): {
				actions.hole();
				
				break;
			}

			case ('shield'): {
				actions.shield();
				break;
			}
		}
		$(fieldArray[playerY][playerX]).attr({'data-type': 'empty', 'data-shield': 'no'}).attr('style', '');
		$(fieldArray[newPlayerY][newPlayerX]).attr('data-type', 'player');
		if (hasShield) $(fieldArray[newPlayerY][newPlayerX]).attr('data-shield', 'yes');
		rotatePlayer(deg);
		playerX = newPlayerX;
		playerY = newPlayerY;
}
function refreshFieldArray() {
		let size = $('.play-row:eq(0) .play-cell').length;
		for (let i = 0; i < size; i++) fieldArray[i] = $('.play-row:eq(' + i + ') .play-cell').toArray();
}
function safeData() {
	window.localStorage.setItem('score', +window.localStorage.getItem('score') + gameScore);
	window.localStorage.setItem('bestScore', (( +window.localStorage.getItem('bestScore') > gameScore )? +window.localStorage.getItem('bestScore'):gameScore));
	window.localStorage.setItem('lastScore', gameScore);
	window.localStorage.setItem('field', +window.localStorage.getItem('field') + countItems.field);
	window.localStorage.setItem('candy', +window.localStorage.getItem('candy') + countItems.candy);
	window.localStorage.setItem('hole', +window.localStorage.getItem('hole') + countItems.hole);
	window.localStorage.setItem('shield', +window.localStorage.getItem('shield') + countItems.shield);
	window.localStorage.setItem('speed', +window.localStorage.getItem('speed') + countItems.speed);
	window.localStorage.setItem('allTime', +window.localStorage.getItem('allTime') + (+playTime.min * 60 + +playTime.sec));

}

let actions = {
	timer: new MakeCooldown(timeCounter, makeTime, playTime),
	createItem: new MakeCooldown(itemsCounter, makeItem),
	move: new MakeCooldown(speedCounter, movePlayer),
	field: function	() {
		countItems.field++;
		$('#play-field').append('<div class="play-row">' + 
								'<div class="play-cell" data-type = "empty"></div>'.repeat(fieldArray[0].length) + 
								'</div>');
		$('#play-field .play-row').append('<div class="play-cell" data-type = "empty"></div>');
		
		refreshFieldArray();
	},
	candy: function	() {
		countItems.candy++;
		gameScore++
		$('.play-score span').text(gameScore);
		
	},

	speed: function	() {
		speedCounter.max *= .85;
		countItems.speed++;
	},

	hole: function	() {
		countItems.hole++;
		buttonsFlag = 'gameover';
		if (hasShield) {hasShield = false; gameScore++; $('.play-score span').text(gameScore); return;};
		clearInterval(gameInterval);
		safeData();
		$('.play-state').css('display', 'flex').animate({opacity: 1}, 500).delay(500).append('<h1>Game over</h1><span>Result: ' + gameScore + '</span><button id="repeat">Repeat</button><button id="menu">Exit</button>');
		$('#repeat').mousedown(() => { createField(8,8); $('.play-state').css({display: 'none', opacity: 0}).empty();});
		$('#menu').mousedown(() => exit());

	},
	shield: function() {
		countItems.shield++;
		hasShield = true;
	}
} 






function createField(width, height) {
	let fieldStr = '';
	playerX	= 0;
	playerY = 0;
	timeCounter.max = 60;
	itemsCounter.max = 120;
	speedCounter.max = 20;
	playTime.min = "00";
	playTime.sec = "00";
	countItems.field = 0;
	countItems.candy = 0;
	countItems.hole = 0;
	countItems.shield = 0;
	countItems.speed = 0;
	gameScore = 0;
	fieldArray= [];
	hasShield = false;
	way = 'right';
	deg='0deg';
	buttonsFlag = 'game'
	makeTime(playTime);
	$('.play-score span').text(gameScore);
	$('#play-field').empty();
	for (let rowId=0; rowId < height; rowId++) {
		fieldStr += '<div class="play-row">';
		for (let cellId = 0; cellId < width; cellId++) {
			fieldStr += '<div class="play-cell" data-type="empty" style="opacity: 0;"></div>';
		}
		fieldStr += '</div>'
	}
	$('#play-field').append(fieldStr);
	refreshFieldArray();
	$('.play-cell').each(function() {
		let cooldown = (Math.random().toFixed(3))*1000 + 500;
		$(this).delay(100).animate({opacity: 1}, cooldown)
	})
	$('.play-cell').attr('data-type', 'empty');
	makePlayer();
	setTimeout(() => {gameInterval = setInterval(() => play(), fps)}, 1000)
	
}




function play() {
		$('.play-time span').text(actions.timer.go());
		actions.createItem.go();
		actions.move.go();
		// $('.play-time span').text(arguments[0].go());
		// arguments[1].go();
		// arguments[2].go();
}


$('#start').click(start);

$('#score').click(scoreShow);


$('.score-btn-back').on('click', scoreHide);



$('.play-cell').on('click', function() { alert($(this).attr('data-type'))})




$('.play-btn.back').mousedown(() => {
					clearInterval(gameInterval);
					buttonsFlag	= 'exitGame';
					$('.play-state').append("<h1>Are you sure?</h1><button id='menu'>Yes</button><button id='no'>No</button>").css('display', 'flex').animate({opacity: 1}, 500);
					$('#no').click(() => {
							buttonsFlag = 'game';
							gameInterval = setInterval(() => play(), fps);
							$('.play-state').css({display: 'none', opacity: 0}).empty();})
					$('#menu').mousedown(() => exit());
});




$('.play-btn.pause').mousedown(() => {
	pause();
})