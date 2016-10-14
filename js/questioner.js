/*global console, QUESTIONS, Game */

var timerId = "timer",
    submitId = "submit",
	questionId = "question",
	answerId = "answer",
    
    
    player = new Player();

function Timer() {
	'use strict';
	var timerFace = document.getElementById(timerId),
		timer,
		timeTaken = 0,
		timeAlloted = 10,
        oneSecond = 1000;
    
    timerFace.textContent = timeAlloted + " seconds remaining";
	
	this.stopTimer = function () {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	
	function countDown() {
		timeTaken += 1;
        var remaining = timeAlloted - timeTaken
		timerFace.textContent = remaining + " second" + (remaining != 1 ? "s" : "") + " remaining";
	}
    
    this.getTimeTaken = function () {
        return timeTaken;
    }
    
    this.getTimeLeft = function () {
        return timeAlloted - timeTaken;
    }
    
	timer = setInterval(countDown, oneSecond);
    setTimeout(function() {
        clearInterval(timer);
    }, oneSecond * timeAlloted)
}


function Question() {
	'use strict';
	var questionDiv = document.getElementById(questionId),
        breakLine = document.createElement('br'),
        
        correctAnswer;
    
    this.setPlayer = function (gamePlayer) {
        player = gamePlayer;
    }
    
    this.setGame = function(thisGame) {
        game = thisGame;
    }
    
    function createChoice(key, choice) {
        var choiceDiv = document.createElement('input');
        choiceDiv.setAttribute('type', 'radio');
        choiceDiv.setAttribute('name', 'choice');
        choiceDiv.setAttribute('value', key);
        questionDiv.appendChild(breakLine);
        questionDiv.appendChild(choiceDiv);
        questionDiv.innerHTML = questionDiv.innerHTML + choice;
    }
	
	this.setQuestion = function (questionInfo) {
        var choiceKey, newChoice;
		questionDiv.textContent = questionInfo.question;
        questionDiv.appendChild(breakLine);
		for (choiceKey in questionInfo.choices) {
            createChoice(choiceKey, questionInfo.choices[choiceKey]);
        }
        correctAnswer = questionInfo.answer;
	};
    
    this.getCorrectAnswer = function () {
        return correctAnswer;
    }
}

Game.prototype.buildQuestioner = function (questionsInfo) {
    var questionsInfo = questionsInfo,
        q = 0,
        question = new Question(),
        
        timer,
		
        submitButton = document.getElementById(submitId),
        
        player = this.player;
    
    this.nextQuestion = function () {
        question.setQuestion(questionsInfo[q]);
        q++;
        timer = new Timer();
    }
    
    this.isGameOver = function () {
        return (q === questionsInfo.length)
    }
    
    submitButton.onclick = function () {
        if (submitButton.textContent === 'Submit') {
            timer.stopTimer();
            var choices = document.getElementsByName('choice'),
                i, movesToMake;
            for (i = 0; i < choices.length; i++) {
                if (choices[i].checked) {
                    if (choices[i].value === question.getCorrectAnswer()) {
                        movesToMake = timer.getTimeLeft();
                    } else {
                        movesToMake = timer.getTimeTaken() * -1;
                    }
                }
            }
            player.move(movesToMake);
            submitButton.textContent = 'Next Question';
        } else {
            game.nextQuestion();
            submitButton.textContent = 'Submit';
        }
    }
}