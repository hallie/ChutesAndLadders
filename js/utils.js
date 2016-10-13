/*global console */

var timerId = "timer",
    stopperId = "stopper";

function Timer() {
	'use strict';
	var timerFace = document.getElementById(timerId),
		stopperButton = document.getElementById(stopperId),
		timer,
		timeTaken = 0,
		timeAlloted = 10;
	
	function stopTimer() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	
	stopperButton.onclick = function () {
		stopTimer();
	};
	console.log(stopperButton);
	
	function countDown() {
		timeTaken += 1;
		timerFace.textContent = (timeAlloted - timeTaken);
		if (timeAlloted === timeTaken) {
			stopTimer();
		}
	}
	
	timer = setInterval(countDown, 1000);
}

var timer = new Timer();