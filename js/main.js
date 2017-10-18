var rows = field.getElementsByTagName('tr'),
arr = {},
coll = 0,
row = 0,
r=true,
l=false,
t=false,
b=false,
w = 10,
h = 10,
xP = Math.floor(Math.random()*w),
yP = Math.floor(Math.random()*h),
xW = Math.floor(Math.random()*w),
yW = Math.floor(Math.random()*h),
xE = Math.floor(Math.random()*w),
yE = Math.floor(Math.random()*h),
nE = 0,
allClass = ['wall', 'prise', 'speed', 'shit', 'field'],
elements = [],
snakeClass = 'snakeShit'
speed=300;

btn.addEventListener('click', start)
wrap.style.width = (document.documentElement.clientHeight)*0.8 + 'px';
cellSize();

//start game ---------------------------------------------------
function start() {
str.style.display = 'none';
interval = window.setInterval(play, speed);
intervalToWall = window.setInterval(elementToWall, 500);
intervalNewElement = window.setInterval(newElem, 2000);
rows[row].getElementsByTagName('td')[coll].classList.toggle('snake');
}
//Cell Size
function cellSize() {
	 	
	var wSize = parseInt(wrap.offsetWidth),
		size = wSize/w,
		tds = field.querySelectorAll('td');
		for (var i = 0; i<tds.length; i++) {
			tds[i].width = size;
			tds[i].height = size;
		}
}



window.addEventListener('keydown', changeSide)
function changeSide() {
	if (event.keyCode === 39) {
		r=true;
		l=false,
		t=false,
		b=false;
	}
	if (event.keyCode === 38){
		r=false;
		l=false,
		t=true,
		b=false;
	}
	if (event.keyCode === 37){
		r=false;
		l=true,
		t=false,
		b=false;
	}
	if (event.keyCode === 40){
		r=false;
		l=false,
		t=false,
		b=true;
	}
}

//play---------------------------------------------------------------
function play() {
	moveSnake();
	touchElement(rows[row].getElementsByTagName('td')[coll]);
}


//Move Snake-----------------------------------------------------------------------------------------
function moveSnake() {
	rows[row].getElementsByTagName('td')[coll].className = '';
	if (r) {
		
		if (coll === w-1) {
			coll=0;
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass);
		} else {
			coll++
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass);
		}
	}

	if (l) {
		if (coll === 0) {
			coll=w-1;
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass);
		} else {
			coll--
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass);
		}
	}

	if (t) {
		if (row === 0) {
			row=h-1;
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass);
		} else {
			row--
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass)
		}
	}

	if (b) {
		if (row === h-1) {
			row=0;
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass);
		} else {
			row++
			rows[row].getElementsByTagName('td')[coll].classList.toggle(snakeClass);
		}
	}

}

///Change field-------------------------------------------------------------
function changeField() {
	var newTr = document.createElement('tr')
	for (var i=0; i<w; i++) {
		newTr.innerHTML += '<td></td>'
	}
	h++
	field.appendChild(newTr)
	for (var i =0; i<h; i++) {
		field.getElementsByTagName('tr')[i].innerHTML += '<td></td>'
	}
	w++
	cellSize();
}

 //ChangeSpeed--------------------------------------------------------------------------------
function changeSpeed() { 	
 	clearInterval(interval);
 	speed = speed/1.2;
 	interval = window.setInterval(play, speed);
 }

//Create Elements-----------------------------------------------------------------------------------
function createNewElements(elem) {
	xE = Math.floor(Math.random()*w)
	yE = Math.floor(Math.random()*h)
	if (rows[yE].getElementsByTagName('td')[xE].className === '') {
		elements[nE] = rows[yE].getElementsByTagName('td')[xE];
		elements[nE].className = elem + ' elmenet' + nE;
		if (elem !== 'wall') {
		elements[nE].innerHTML = 5;
	}
		rows[yE].getElementsByTagName('td')[xE].className = elem + ' elmenet' + nE;
	}
	nE++
}


//Touch Element------------------------------------------------------------------------------------
function touchElement(elem) {
	if(elem.classList.contains(snakeClass) && elem.classList.contains('wall')) {
		if (snakeClass.indexOf('Shit') === -1) {
			alert('Game Over! '  + 'You collected ' + score.innerHTML + 'candies!')
 			clearInterval(interval); 
 			location.reload()
		} else {
			snakeClass = 'snake';
			score.innerHTML = parseInt(+score.innerHTML) + 1;
			elem.classList.remove('wall');
 		}
 		
 	} else if (elem.classList.contains(snakeClass) && elem.classList.contains('prise')) {
 		score.innerHTML = parseInt(+score.innerHTML) + 1;
		elem.classList.remove('prise');
		elem.innerHTML = '';
 	} else if (elem.classList.contains(snakeClass) && elem.classList.contains('field')) {
 		
 		elem.classList.remove('field');
		elem.innerHTML = '';
		changeField()
 	} else if (elem.classList.contains('speed') && elem.classList.contains(snakeClass)) {
 		
 		elem.classList.remove('speed');
		elem.innerHTML = '';
		changeSpeed()
 	}  else if (elem.classList.contains('shit') && elem.classList.contains(snakeClass))  {
 		if (snakeClass === 'snake') {
 			snakeClass = 'snakeShit'
 		}
 		elem.classList.remove('shit');
		elem.innerHTML = '';
 	}

}

//ElementToWall---------------------------------------------------------------------------------
function elementToWall() {
	var elements = document.querySelectorAll('.prise, .speed, .field, .shit')
	for (var i=0; i<elements.length; i++) {
		if (elements[i].innerHTML === '0' && elements[i].className !== '') {
			elements[i].className = 'wall'
			elements[i].innerHTML = ''

		} else {
			if (elements[i].innerHTML !== '' && elements[i].className !== '')
			elements[i].innerHTML = parseInt(elements[i].innerHTML) - 1;
		}

	}
}

//Randov Class-------------------------------------------------------------------------------
function randomClass() {
	return allClass[Math.floor((Math.random()*allClass.length))]
}

//new Element-----------------------------------------------------------------------------------
function newElem() {
	createNewElements(randomClass());
}


//Swipe-----------------------------------------------------------------------------------------------------------------------
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
	xDown = evt.touches[0].clientX;                                      
	yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
	if ( ! xDown || ! yDown ) {
		return;
	}

	var xUp = evt.touches[0].clientX;                                    
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
		if ( xDiff > 0 ) {
			r=false;
			l=true,
			t=false,
			b=false;
		} else {
			r=true;
			l=false,
			t=false,
			b=false;

		}                       
	} else {
		if ( yDiff > 0 ) {
			r=false;
			l=false,
			t=true,
			b=false;
		} else { 
			r=false;
			l=false,
			t=false,
			b=true;
		}                                                                 
	}
	/* reset values */
	xDown = null;
	yDown = null;                                             
};
