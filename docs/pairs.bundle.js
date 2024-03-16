/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/conditions.mjs":
/*!*******************************!*\
  !*** ./src/js/conditions.mjs ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGameConditions: () => (/* binding */ createGameConditions)
/* harmony export */ });
// get start options
// creates object with game conditions:
    // main array of pairs
    // win counter
    // waiter, for some animations
    // number of pairs (difficulty level)


function createGameConditions(interfaceObject) {
    const pairsAmount = +interfaceObject.difficulty.value;
    const isTimer = interfaceObject.timer.checked;
    
    const arr = Array.from({length: pairsAmount}, (elem, i) => i + 1);
    return {
        winCounter: pairsAmount,
        pairsArray: [...arr, ...arr],
        waiter: false,
        difficulty: pairsAmount,
        isTimer: isTimer
    }
}



/***/ }),

/***/ "./src/js/gameLogic.mjs":
/*!******************************!*\
  !*** ./src/js/gameLogic.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startGame: () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var _matchHandler_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matchHandler.mjs */ "./src/js/matchHandler.mjs");
/* harmony import */ var _interface_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interface.mjs */ "./src/js/interface.mjs");
/* harmony import */ var _timer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timer.mjs */ "./src/js/timer.mjs");
/* harmony import */ var _resetGame_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resetGame.mjs */ "./src/js/resetGame.mjs");





function startGame(interfaceObject, gameConditions) {
    gameConditions.waiter = false;
    // array for two opened cards in one turn
    let selectedCards = [];
    const match = (0,_matchHandler_mjs__WEBPACK_IMPORTED_MODULE_0__.matchCounter)();
    let timerID = null;

    if (gameConditions.isTimer) {
        const timerContainer = (0,_interface_mjs__WEBPACK_IMPORTED_MODULE_1__.createTimerContainer)(interfaceObject);
        const timerCounter = (0,_timer_mjs__WEBPACK_IMPORTED_MODULE_2__.createTimer)(interfaceObject);
        
        timerID = setInterval(() => {
            if (!(0,_timer_mjs__WEBPACK_IMPORTED_MODULE_2__.updateTimer)(timerContainer, timerCounter, timerID)) {
                // stop user's interactions with game field
                interfaceObject.gameContainer.style.pointerEvents = 'none';
                (0,_interface_mjs__WEBPACK_IMPORTED_MODULE_1__.loseInterface)(interfaceObject);
                setTimeout(() => {
                    (0,_resetGame_mjs__WEBPACK_IMPORTED_MODULE_3__.resetGame)(interfaceObject);
                }, 4000);
            }
            
        }, 1000);

        interfaceObject.resetBtn.addEventListener('click', function() {
            clearInterval(timerID);
        });
        interfaceObject.refreshBtn.addEventListener('click', function() {
            clearInterval(timerID);
        });
    } else {
        let timerContainer = document.querySelector('.timer_container');
        if (timerContainer) {
            timerContainer.innerHTML = '';
        }
    }
    
    // main logic
    interfaceObject.gameContainer.addEventListener('click', function game(e) {
        // selects only click inside card
        const target = e.target.closest('.game_card');

        // ignore:
            // clicks out of cards
            // already matched cards
            // already opened cards
            // waiter is set to true
        if (!target ||
                [...target.classList].includes('match') || 
                selectedCards.includes(target) ||
                gameConditions.waiter) {
            return;
        }

        // if it's first opened card >> push it to selected array
        if (selectedCards.length < 2) {
            selectedCards.push(target);
            target.classList.add('open');
        }

        // when we have two opened cards >> check values
        if (selectedCards.length == 2) {
            if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
                // handle CSS classes and update winCounter
                // check for win case
                if (match(selectedCards, gameConditions)) {
                    clearInterval(timerID);
                    selectedCards.length = 0;
                    gameConditions.waiter = true; 
                    interfaceObject.gameContainer.removeEventListener('click', game);
                    (0,_interface_mjs__WEBPACK_IMPORTED_MODULE_1__.winInterface)(interfaceObject);
                    setTimeout(() => {
                        (0,_resetGame_mjs__WEBPACK_IMPORTED_MODULE_3__.resetGame)(interfaceObject);
                    }, 4000);
                }
            } else {
                // pause interactions for complete animation 
                gameConditions.waiter = true;
                // handle CSS classes and update waiter
                setTimeout(()=>{ (0,_matchHandler_mjs__WEBPACK_IMPORTED_MODULE_0__.noMatch)(selectedCards, gameConditions) }, 1000);
            }
        }
    });    
}


/***/ }),

/***/ "./src/js/interface.mjs":
/*!******************************!*\
  !*** ./src/js/interface.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGameField: () => (/* binding */ createGameField),
/* harmony export */   createGameInterface: () => (/* binding */ createGameInterface),
/* harmony export */   createInterfaceObject: () => (/* binding */ createInterfaceObject),
/* harmony export */   createStartInterface: () => (/* binding */ createStartInterface),
/* harmony export */   createTimerContainer: () => (/* binding */ createTimerContainer),
/* harmony export */   loseInterface: () => (/* binding */ loseInterface),
/* harmony export */   winInterface: () => (/* binding */ winInterface)
/* harmony export */ });
/* harmony import */ var _resetGame_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resetGame.mjs */ "./src/js/resetGame.mjs");
// Interface staff



// main interface object
function createInterfaceObject() {
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
function createStartInterface(interfaceObject) {
    // hide game controls
    // set grid for the initial case
    interfaceObject.gameControls.style.display = 'grid';
    interfaceObject.gameControls.classList.add('hide');
    // show start options
    interfaceObject.startControls.classList.remove('hide');

}

// hide start controls and show game controls
function createGameInterface(interfaceObject) {
    // show refresh/reset buttons
    // hide start buttons
    interfaceObject.startControls.classList.add('hide');    
    interfaceObject.gameControls.classList.remove('hide');
}

// create timer DOM structure
// returns timer's inner element for seconds display
function createTimerContainer(interfaceObject) {
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
function createGameField(interfaceObject, gameConditions) {
    // reset conditions and DOM element's classes
    (0,_resetGame_mjs__WEBPACK_IMPORTED_MODULE_0__.resetInterface)(interfaceObject);
    
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
function winInterface(interfaceObject) {
    interfaceObject.gameContainer.classList.add('win');
    document.querySelector('.win_modal').classList.add('show');
}

function loseInterface(interfaceObject) {
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

/***/ }),

/***/ "./src/js/matchHandler.mjs":
/*!*********************************!*\
  !*** ./src/js/matchHandler.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   matchCounter: () => (/* binding */ matchCounter),
/* harmony export */   noMatch: () => (/* binding */ noMatch)
/* harmony export */ });
// game logics on match/no match
// make counter on each new game
function matchCounter() {
    let counter = 0;
    
    return function(selectedCards, gameConditions) {
        selectedCards.forEach(e => {
            e.classList.remove('open');
            e.classList.add('match');
        });
        selectedCards.length = 0;

        counter++;
        
        return counter == gameConditions.winCounter;
    };
}


function noMatch(selectedCards, gameConditions) {
    selectedCards.forEach(e => {
        e.classList.remove('open');
    })
    selectedCards.length = 0;    
    gameConditions.waiter = false;
}

/***/ }),

/***/ "./src/js/resetGame.mjs":
/*!******************************!*\
  !*** ./src/js/resetGame.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resetGame: () => (/* binding */ resetGame),
/* harmony export */   resetInterface: () => (/* binding */ resetInterface)
/* harmony export */ });
/* harmony import */ var _interface_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface.mjs */ "./src/js/interface.mjs");
// reset game interface DOM elements


function resetInterface(interfaceObject) {
    // hide win/lose modals
    document.querySelector('.win_modal').classList.remove('show');
    document.querySelector('.lose_modal').classList.remove('show');

    // if there was timer - remove
    document.querySelector('.timer_container')?.remove();

    // refresh game container
    const newContainer = document.createElement('div');
    newContainer.classList.add('game_container');
    interfaceObject.gameContainer.replaceWith(newContainer);
    return interfaceObject.gameContainer = newContainer;
}

function resetGame(interfaceObject) {
    resetInterface(interfaceObject);    
    (0,_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createStartInterface)(interfaceObject);
}

/***/ }),

/***/ "./src/js/timer.mjs":
/*!**************************!*\
  !*** ./src/js/timer.mjs ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTimer: () => (/* binding */ createTimer),
/* harmony export */   updateTimer: () => (/* binding */ updateTimer)
/* harmony export */ });
/* harmony import */ var _interface_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface.mjs */ "./src/js/interface.mjs");


function createTimer(interfaceObject) {
    let timer = interfaceObject.timerRange;
    return function() {
        return --timer;
    }
}

function updateTimer(timerContainer, timerCounter, timerID) {
    const counter = timerCounter();
    timerContainer.textContent = counter;

    if (counter <= 0) {
        clearInterval(timerID);
        return false;
    }
    return true;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/pairs.mjs ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/interface.mjs */ "./src/js/interface.mjs");
/* harmony import */ var _js_conditions_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/conditions.mjs */ "./src/js/conditions.mjs");
/* harmony import */ var _js_gameLogic_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/gameLogic.mjs */ "./src/js/gameLogic.mjs");
/* harmony import */ var _js_resetGame_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/resetGame.mjs */ "./src/js/resetGame.mjs");





// game container
// start button,
// reset button,
// difficulty select element
// const startInterface = createStartInterface();

const interfaceObject = (0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createInterfaceObject)();
console.log(interfaceObject);

(0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createStartInterface)(interfaceObject);


interfaceObject.startBtn.onclick = newGame;
interfaceObject.refreshBtn.onclick = newGame;
interfaceObject.resetBtn.addEventListener('click', function() {  
    
    const animated = interfaceObject.gameContainer;
    animated.classList.add('hide');
    
    setTimeout(() => {
        (0,_js_resetGame_mjs__WEBPACK_IMPORTED_MODULE_3__.resetGame)(interfaceObject);
    }, 500);
});

function newGame() {
    // create game conditions
        // pairsArray
        // winCounter
        // waiter
        // number of pairs (difficulty level)
    let gameConditions = (0,_js_conditions_mjs__WEBPACK_IMPORTED_MODULE_1__.createGameConditions)(interfaceObject);
    (0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createGameInterface)(interfaceObject, gameConditions);
    (0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createGameField)(interfaceObject, gameConditions);
    (0,_js_gameLogic_mjs__WEBPACK_IMPORTED_MODULE_2__.startGame)(interfaceObject, gameConditions);
}
})();

/******/ })()
;
//# sourceMappingURL=pairs.bundle.js.map