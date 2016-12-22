window.onload = function () {
	var box = document.getElementById('box');
	var imgs = box.getElementsByTagName('img');
	var imgWidth = imgs[0].offsetWidth;
	var exposeWidth = 160;
	var boxWidth = imgWidth + (imgs.length - 1) * exposeWidth;
	box.style.width = boxWidth + 'px';
	var len = imgs.length;
	for (var i = 1; i < len; i++) {
		imgs[i].pos = imgs[i].style.left = imgWidth + exposeWidth * (i - 1) + 'px';
	}
	function openDoor(el, distance) {
		var begin = parseInt(el.pos, 10);
		var end = begin - distance;
		var speed = 10;
		setTimeout(function () {
			el.style.left = parseInt(el.style.left, 10) - speed + 'px';
			speed *= 1.5;
			if (parseInt(el.style.left, 10) <= end) {
				el.style.left = end + 'px';
			} else {
				setTimeout(arguments.callee, 25);
			}			
		}, 25);
	}
	function closeDoor(el, distance) {
		var begin = parseInt(el.pos, 10) - distance;
		var end = begin + distance;
		var speed = 100;
		setTimeout(function () {
			el.style.left = parseInt(el.style.left, 10) + speed + 'px';
			speed = Math.ceil(speed * 0.7);
			if (parseInt(el.style.left, 10) >= end) {
				el.style.left = end + 'px';
			} else {
				setTimeout(arguments.callee, 25);
			}
		}, 25);
	}
	var distance = imgWidth - exposeWidth;
	for (var i = 0; i < len; i++) {
		(function (i) {
			imgs[i].onmouseover = function () {
				for (var j = 1; j <= i; j++) {
					openDoor(imgs[j], distance);
				}
				for (var j = i + 1; j < len; j++) {
					closeDoor(imgs[j], distance);
				}
			}
		}) (i);
	}
}