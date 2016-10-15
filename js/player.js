function Player() {
	var height = 60,
		width = 60,
		id = 'player',
		div, path, direction;
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
    
    this.move = function(direction) {
		var player = document.getElementById(id),
			top = parseInt(player.style.top.slice(0, -2)),
			left = parseInt(player.style.left.slice(0, -2)), mover,
			interval = 100, moveDistance = 5,
			timeout = (BLOCK_WIDTH / moveDistance) * interval;
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
		}
        if (direction != 'ladder') {
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
        } else {
            console.log(direction);
            direction = (path[-1] === 'right') ? 'left' : 'right';
            console.log(direction);
            timeout = (BLOCK_HEIGHT / moveDistance) * interval * 2;
            mover = setInterval(moveUp, interval);
        }
        setTimeout(function() {
            clearInterval(mover);
        }, timeout);
    }
    
    this.slideDown = function () {
        // Slides will always just go to the level immediately below
        var g = 9.8,
            totalFall = BLOCK_HEIGHT * 2,
            totalTime = Math.sqrt(2 * totalFall / g) * 1000,
            secondsPassed = 0,
            distanceFallen = 0,
            
            player = document.getElementById(id),
			top = parseInt(player.style.top.slice(0, -2)),
			left = parseInt(player.style.left.slice(0, -2));
        function calculateVelocity() {
            //TODO
        }
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
	this.player.position = {
        x: this.board.getLayout().length - 1,
        y: 0
    };
	this.player.direction = 'right';
    this.board.div.appendChild(this.player.div);
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
		},
        layout = this.board.getLayout(),
        direction = this.player.direction,
        path = [];
    
    function getDirection(x, y) {
        var nextMove = layout[x][y][1];
        switch (nextMove) {
            case 's':
                return 'right';
            case 'r':
                return 'right';
            case 'l':
                return 'left';
            case 'u':
                return 'up';
            case 'f':
                return -1;
        }
    }
    
    function getLadderLength(x, y) {
        var l = 0;
        while (layout[x-l][y] != 'lt') {
            l += 1;
        }
        return l;
    }
    
	function getPath(moves) {
		var steps = 0,
			x = player.position.x,
			y = player.position.y,
			max_y = layout[0].length - 1;
		while (steps < moves) {
            console.log(x, y, layout[x][y]);
			path.push(direction);
			var d_x = dirDir[direction].x,
				d_y = dirDir[direction].y;
            x -= d_x;
			y += d_y;
			if (y === 0 || y === max_y) {
                if (x > 0) {
                    if (layout[x-1][y] === '--') {
                        direction = 'up';
                    } else {
                        direction = 'left';
                    }
                } else {
                    direction = 'right';
                }
			}
			steps++;
		}
        console.log(x, y);
        console.log(layout[x][y]);
        if (layout[x][y] === 'lb') {
            path.push('ladder');
            x -= getLadderLength(x, y);
        }
        return {
            'x': x,
            'y': y
        };
    }
    pos = getPath(movesToMake);
    this.player.direction = direction;
    this.player.position = pos;
    var p = 0;
    function doSetTimeout() {
        var t = (BLOCK_WIDTH / 5) * 100;
        d = path[p];
        if (d === 'up' || d === 'down') {
            t = (BLOCK_HEIGHT / 5) * 100;
        }
        if (d === 'ladder') {
            t = (BLOCK_HEIGHT / 5) * 100 * 2;
        }
        var i = setInterval(player.move(d));
        setTimeout(function() {
            clearInterval(i);
            callNext();
        }, t);
    }
    function callNext() {
        p++;
        if (p < path.length) {
            doSetTimeout();
        }
    }
    doSetTimeout();
}