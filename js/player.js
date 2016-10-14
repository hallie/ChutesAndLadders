function Player() {
	var height = 60,
		width = 60,
		id = 'player',
		div;
    function createDiv() {
        var playerDiv = document.createElement('div');
        playerDiv.setAttribute('id', id);
		playerDiv.style.height = height;
		playerDiv.style.width = width;
        return playerDiv;
    }
    
    this.div = createDiv();
	this.height = height;
	this.width = width;
	
	this.moveBlock = function(direction) {
		var player = document.getElementById(id),
			top = parseInt(player.style.top.slice(0, -2)),
			left = parseInt(player.style.left.slice(0, -2)),
			timeout, mover,
			interval = 100, moveDistance = 5;
		function moveUp() {
			top = top - moveDistance;
			player.style.top = top + "px";
		}
		function moveLeft() {
			left = left - moveDistance;
			player.style.left = left + "px";
		}
		function moveDown() {
			top = top + moveDistance;
			player.style.top = top + "px";
		}
		function moveRight() {
			left = left + moveDistance;
			player.style.left = left + "px";
			console.log(left);
		}
		if (direction === 'left' || direction === 'right') {
			timeout = (BLOCK_WIDTH / moveDistance) * interval;
			if (direction === 'left') {
				mover = setInterval(moveLeft, interval);
			} else {
				mover = setInterval(moveRight, interval);
			}
		} else {
			timeout = (BLOCK_HEIGHT / moveDistance) * interval;
			if (direction === 'up') {
				mover = setInterval(moveUp, interval);
			} else {
				mover = setInterval(moveDown, interval);
			}
		}
		setTimeout(function() {
			clearInterval(mover);
		}, timeout);
    }
}

Game.prototype.initializePlayer = function () {
    var startingH = this.board.dimensions.height
	              + ((this.board.dimensions.blockH - this.player.height) / 2),
        startingW = (this.board.dimensions.blockW - this.player.width) / 2,
        player = new Player();
    
    this.player = player;
    this.player.div.style.top = startingH + "px";
    this.player.div.style.left = startingW + "px";
	this.player.position = (-1, 0);
	this.player.direction = 'right';
    this.board.div.appendChild(this.player.div);
    console.log(this.player.div);
}

Game.prototype.movePlayer = function (movesToMake) {
	var player = this.player,
		dirDir = {
			'right': {
				x: 0,
				y: 1
			},
			'left': {
				x: 0,
				y: -1
			},
			'up': {
				x: -1,
				y: 0
			},
			'down': {
				x: 1,
				y: 0
			}
		};
	function getPath(moves, layout, direction) {
		var path = [], steps = 0,
			x = player.position[0],
			y = player.position[1],
			max_x = layout.length,
			max_y = layout[0].length;
		while (steps < moves) {
			path.append(direction);
			var d_x = dirDir[direction].x,
				d_y = dirDir[direction].y;
			x += d_x;
			y += dy;
			if (y === 0 || y === max_y) {
				direction = 'up';
			}
			
		}
	}
}