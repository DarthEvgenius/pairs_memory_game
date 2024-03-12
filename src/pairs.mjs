import { createStartInterface, createGameField, createGameInterface } from './js/interface.mjs';
import { createGameConditions } from './js/conditions.mjs';
import { startGame } from './js/gameLogic.mjs';
import { resetInterface } from "./js/resetGame.mjs";

// game container
// start button,
// reset button,
// difficulty select element
const startInterface = createStartInterface();


startInterface.startBtn.onclick = newGame;
startInterface.refreshBtn.onclick = newGame;
startInterface.resetBtn.addEventListener('click', function() {  
    const animated = startInterface.gameContainer;
    animated.classList.add('hide');
    
    animated.addEventListener('transitionend', () => {        
        resetInterface(startInterface);    
        createStartInterface();
    });
});

function newGame() {
    // create game conditions
        // pairsArray
        // winCounter
        // waiter
        // number of pairs (difficulty level)
    let gameConditions = createGameConditions(startInterface);
    createGameInterface(startInterface, gameConditions);
    createGameField(gameConditions, startInterface);
    startGame(startInterface, gameConditions);
}