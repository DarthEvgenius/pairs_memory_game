import { createInterfaceObject, createStartInterface, createGameField, createGameInterface } from './js/interface.mjs';
import { createGameConditions } from './js/conditions.mjs';
import { startGame } from './js/gameLogic.mjs';
import { resetGame } from "./js/resetGame.mjs";

// game container
// start button,
// reset button,
// difficulty select element
// const startInterface = createStartInterface();

const interfaceObject = createInterfaceObject();
console.log(interfaceObject);

createStartInterface(interfaceObject);


interfaceObject.startBtn.onclick = newGame;
interfaceObject.refreshBtn.onclick = newGame;
interfaceObject.resetBtn.addEventListener('click', function() {  
    
    const animated = interfaceObject.gameContainer;
    animated.classList.add('hide');
    
    setTimeout(() => {
        resetGame(interfaceObject);
    }, 500);
});

function newGame() {
    // create game conditions
        // pairsArray
        // winCounter
        // waiter
        // number of pairs (difficulty level)
    let gameConditions = createGameConditions(interfaceObject);
    createGameInterface(interfaceObject, gameConditions);
    createGameField(interfaceObject, gameConditions);
    startGame(interfaceObject, gameConditions);
}