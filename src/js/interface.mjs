import { resetInterface } from "./resetGame.mjs";
// Interface staff

// clear game container
// returns
    // game container
    // start button,
    // difficulty level
export function createStartInterface() {
    const gameContainer = document.querySelector('.game_container');

    
    const gameControls = document.querySelector('.game_controls');
    gameControls.style.display = 'grid';
    gameControls.classList.add('hide');
    

    // start controls element
    const startControls = document.querySelector('.start_controls');
    startControls.classList.remove('hide');
    
    // get difficulty options
    const difficultySelect = startControls.querySelector('#difficulty_options');

    return { 
        gameContainer: gameContainer,
        startControls: startControls,
        gameControls: gameControls,
        startBtn: startBtn(),
        refreshBtn: refreshBtn(),
        resetBtn: resetBtn(),
        difficulty: difficultySelect
    };
}

// hide start controls and show game controls
export function createGameInterface(startInterface) {
    // show refresh/reset buttons
    // hide start buttons
    startInterface.startControls.classList.add('hide');    
    startInterface.gameControls.classList.remove('hide');
}

// creates new game field 
// depends on difficulty
export function createGameField(gameConditions, startInterface) {
    // reset conditions and DOM element's classes
    resetInterface(startInterface);
    
    // save original array
    const len = gameConditions.pairsArray.length;
    let arr = [];
    arr = Array.from(gameConditions.pairsArray);

    // if difficulty level is hard - change container
    if (len == 20) {
        startInterface.gameContainer.classList.add('game_container--hard');
    }

    // create cards
    for (let i = 0; i < len; i++) {
        // pick random index of arr
        // use exactly array, as each iteration it's getting shorter
        const index = Math.floor(Math.random() * arr.length);
        const card = createCard(arr[index]);
        startInterface.gameContainer.append(card);        
        // each time delete element
        arr.splice(index, 1);
    }
}

// handle win case
export function winInterface(startInterface) {
    startInterface.gameContainer.classList.add('win');
    document.querySelector('.win_modal').classList.add('show');
}

// start button
const startBtn = () => {
    const startBtn = document.querySelector('.start_button');
    startBtn.style.display = 'inline-block';
    return startBtn;
}

const refreshBtn = () => {
    const refreshBtn = document.querySelector('.refresh_btn');    
    return refreshBtn;
}

// reset button
const resetBtn = () => {
    const resetBtn = document.querySelector('.reset_btn');
    return resetBtn;
}


function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('game_card');
    card.dataset.value = value;
    card.innerHTML = `${value}`;
    return card;
}