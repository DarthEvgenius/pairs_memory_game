import { createStartInterface, createGameField, createGameInterface } from './js/interface.mjs';
import { createGameConditions } from './js/conditions.mjs';
import { startGame } from './js/gameLogic.mjs';
import { resetInterface } from "./js/resetGame.mjs";
import { log } from 'console';

// game container
// start button,
// reset button,
// difficulty select element
const startInterface = createStartInterface();

// pairsArray
// winCounter
// waiter
// number of pairs (difficulty level)
let gameConditions = null;

// card field
let gameField = null;


startInterface.startBtn.onclick = () => {
    newGame();
}

startInterface.refreshBtn.addEventListener('click', ()=>{
    newGame();
});

startInterface.resetBtn.addEventListener('click', () => {  
    const animated = startInterface.gameContainer;
    animated.classList.add('hide');
    
    animated.addEventListener('transitionend', () => {        
        resetInterface(startInterface);    
        createStartInterface();
    });
    
    // this approach runs with some lags
    // setTimeout(()=>{
    //     resetInterface(startInterface);    
    //     createStartInterface();
    // }, 500)
    
});

function newGame() {
    gameConditions = createGameConditions(startInterface);
    createGameInterface(startInterface, gameConditions);
    gameField = createGameField(gameConditions, startInterface);
    startGame(startInterface, gameConditions, gameField);
}