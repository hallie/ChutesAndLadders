function Gameboard() {
    var boardId = "game-board",
        boardDiv = document.getElementById(boardId),
        
        x, y, layout;
    
    this.div = boardDiv;
    
    this.build = function (levelLayout) {
        function addBlock(x, y) {
            var newBlock = document.createElement('div');
            newBlock.setAttribute('class', 'game-block');
            newBlock.style.top = (x * BLOCK_HEIGHT) + "px";
            newBlock.style.left = (y * BLOCK_WIDTH) + "px";
            boardDiv.appendChild(newBlock);
        }
        
        for (x in levelLayout) {
            for (y in levelLayout[x]) {
                if (levelLayout[x][y] === '-') {
                    addBlock(x, y);
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