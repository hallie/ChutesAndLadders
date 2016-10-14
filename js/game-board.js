function Gameboard() {
    var boardId = "game-board",
        boardDiv = document.getElementById(boardId),
        blockHeight = 100,
        blockWidth = 140,
        
        x, y;
    
    this.div = boardDiv;
    
    this.build = function (levelLayout) {
        function addBlock(x, y) {
            var newBlock = document.createElement('div');
            newBlock.setAttribute('class', 'game-block');
            newBlock.style.top = (x * blockHeight) + "px";
            newBlock.style.left = (y * blockWidth) + "px";
            boardDiv.appendChild(newBlock);
        }
        
        for (x in levelLayout) {
            for (y in levelLayout[x]) {
                if (levelLayout[x][y] === '-') {
                    addBlock(x, y);
                }
            }
        }
    }
    
    this.getDimensions = function () {
        return {
            height: x * blockHeight,
            width: y * blockWidth,
            blockH: blockHeight,
            blockW: blockWidth
        }
    }
}

Game.prototype.buildBoard = function (levelLayout) {
    this.board = new Gameboard();
    this.board.build(levelLayout);
    this.board.dimensions = this.board.getDimensions();
}