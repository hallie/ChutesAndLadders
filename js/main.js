var LEVEL1 = [
        [ '--', '--', 'lt', '--', '--' ],
        [ '--', '  ', 'lm', '  ', '  ' ],
        [ '--', '--', 'lb', '--', '--' ],
        [ '  ', '  ', '  ', '  ', '--' ],
        [ '--', '--', '--', '--', '--' ]
    ],
    LEVEL_INFO = {
        questions: QUESTIONS.L1,
        board: LEVEL1
    };

var game = new Game();
game.buildQuestioner(LEVEL_INFO.questions);
game.nextQuestion();
game.buildBoard(LEVEL_INFO.board);
game.initializePlayer();
//game.movePlayer(16);