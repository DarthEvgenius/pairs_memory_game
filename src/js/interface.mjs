// Interface staff
import { resetInterface } from "./resetGame.mjs";

// main interface object
export function createInterfaceObject() {
    const gameContainer = document.querySelector('.game_container');
    const gameControls = document.querySelector('.game_controls');
    const startControls = document.querySelector('.start_controls');
    const difficultySelect = startControls.querySelector('#difficulty_options');
    const timer = startControls.querySelector('#timer_options');

    return { 
        gameContainer: gameContainer,
        startControls: startControls,
        gameControls: gameControls,
        startBtn: startBtn(),
        refreshBtn: refreshBtn(),
        resetBtn: resetBtn(),
        difficulty: difficultySelect,
        timer: timer,
        timerRange: 60
    };
}

// hide game controls and show start options
export function createStartInterface(interfaceObject) {
    // hide game controls
    // set grid for the initial case
    interfaceObject.gameControls.style.display = 'grid';
    interfaceObject.gameControls.classList.add('hide');
    // show start options
    interfaceObject.startControls.classList.remove('hide');

}

// hide start controls and show game controls
export function createGameInterface(interfaceObject) {
    // show refresh/reset buttons
    // hide start buttons
    interfaceObject.startControls.classList.add('hide');    
    interfaceObject.gameControls.classList.remove('hide');
}

// create timer DOM structure
// returns timer's inner element for seconds display
export function createTimerContainer(interfaceObject) {
    let container = document.querySelector('.timer_container');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('timer_container');
    } else {
        container.innerHTML = '';
    }

    const timer = document.createElement('span');
    timer.textContent = interfaceObject.timerRange;
    container.append(timer);
    interfaceObject.gameControls.prepend(container);
    return timer;    
}

// creates new game field 
// depends on difficulty
export function createGameField(interfaceObject, gameConditions) {
    // reset conditions and DOM element's classes
    resetInterface(interfaceObject);
    
    // save original array
    const len = gameConditions.pairsArray.length;
    let arr = [];
    arr = Array.from(gameConditions.pairsArray);

    // if difficulty level is hard - change container
    if (len == 20) {
        interfaceObject.gameContainer.classList.add('game_container--hard');
    }

    // create cards
    for (let i = 0; i < len; i++) {
        // pick random index of arr
        // use exactly array, as each iteration it's getting shorter
        const index = Math.floor(Math.random() * arr.length);
        const card = createCard(arr[index]);
        interfaceObject.gameContainer.append(card);        
        // each time delete element
        arr.splice(index, 1);
    }
}

// handle win/lose cases
export function winInterface(interfaceObject) {
    interfaceObject.gameContainer.classList.add('win');
    document.querySelector('.win_modal').classList.add('show');
}

export function loseInterface(interfaceObject) {
    interfaceObject.gameContainer.classList.add('lose');
    document.querySelector('.lose_modal').classList.add('show');
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