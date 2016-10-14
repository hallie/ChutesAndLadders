function Player() {
    function createDiv() {
        var playerDiv = document.createElement('div');
        playerDiv.setAttribute('class', 'player');
        return playerDiv;
    }
    
    this.div = createDiv();
    this.move = function(movesToMake) {
        console.log(movesToMake);
    }
}

Game.prototype.initializePlayer = function () {
    var startingH = this.board.dimensions.height + (this.board.dimensions.blockH / 2),
        startingW = this.board.dimensions.width + (this.board.dimensions.blockW / 2),
        player = new Player();
    
    this.player = player;
    this.player.div.style.top = startingH + "px";
    this.player.div.style.left = startingW + "px";
    this.board.div.appendChild(this.player.div);
    console.log(this.player.div);
}