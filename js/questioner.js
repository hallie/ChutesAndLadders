/*global console */

console.log(QUESTIONS);

var timerId = "timer",
    stopperId = "stopper",
	questionId = "question",
	answerId = "answer";

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


function Question() {
	'use strict';
	var questionDiv = document.getElementById(questionId),
		answerDiv = document.getElementById(answerId);
	
	this.setQuestion = function (questionInfo) {
		questionDiv.textContent = questionInfo.question;
		var choiceKeys = Object.keys(questionInfo.choices)
		console.log(choiceKeys);
	}
}

var timer = new Timer();
new Question().setQuestion(QUESTIONS.L1[0]);