function Gameboard() {
    var boardId = "game-board",
        boardDiv = document.getElementById(boardId),
        
        x, y, layout;
    
    this.div = boardDiv;
    
    this.build = function (levelLayout) {
        var ladderW = 80;
        function makeLadder(x, y, backgroundType) {
            var ladder = document.createElement('div'),
                hole1 = document.createElement('div'),
                hole2 = document.createElement('div'),
                hole3 = document.createElement('div');
            ladder.setAttribute('class', backgroundType + '-ladder');
            ladder.style.top = "-5px";
            ladder.style.left = (((BLOCK_WIDTH - ladderW) / 2) - 5) + "px";
            hole1.setAttribute('class', 'hole1');
            hole2.setAttribute('class', 'hole2');
            hole3.setAttribute('class', 'hole3');
            ladder.appendChild(hole1);
            ladder.appendChild(hole2);
            ladder.appendChild(hole3);
            return ladder;
        }
        function addBlock(x, y, hasLadder, isSpace) {
            var newBlock = document.createElement('div');
            newBlock.setAttribute('class', 'game-block');
            newBlock.style.top = (x * BLOCK_HEIGHT) + "px";
            newBlock.style.left = (y * BLOCK_WIDTH) + "px";
            if (hasLadder) {
                ladder = makeLadder(x, y, 'block');
                newBlock.appendChild(ladder);
                if (isSpace) {
                    newBlock.setAttribute('class', 'game-block space-ladder');
                    newBlock.style.top = (x * BLOCK_HEIGHT) + 5 + "px";
                    newBlock.style.left = (y * BLOCK_WIDTH) + 5 + "px";
                }
            }
            boardDiv.appendChild(newBlock);
        }
        
        for (x in levelLayout) {
            for (y in levelLayout[x]) {
                if (levelLayout[x][y][0] === '-') {
                    addBlock(x, y);
                } else if (levelLayout[x][y][0] === 'l') {
                    if (levelLayout[x][y] === 'lm') {
                        addBlock(x, y, true, true);
                    } else {
                        addBlock(x, y, true);
                    }
                }
            }
        }
		layout = levelLayout;
    }
    
    this.getDimensions = function () {
        return {
            height: x * BLOCK_HEIGHT,
            width: y * BLOCK_WIDTH,
            blockH: BLOCK_HEIGHT,
            blockW: BLOCK_WIDTH
        }
    }
	
	this.getLayout = function () {
		return layout;
	}
}

Game.prototype.buildBoard = function (levelLayout) {
    this.board = new Gameboard();
    this.board.build(levelLayout);
    this.board.dimensions = this.board.getDimensions();
}