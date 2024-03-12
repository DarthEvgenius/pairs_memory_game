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


function createGameConditions(startInterface) {
    let pairsAmount = +startInterface.difficulty.value;
    
    const arr = Array.from({length: pairsAmount}, (elem, i) => i + 1);
    return {
        winCounter: pairsAmount,
        pairsArray: [...arr, ...arr],
        waiter: false,
        difficulty: pairsAmount
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



function startGame(startInterface, gameConditions) {
    gameConditions.waiter = false;
        
    // array for two opened cards in one turn
    let selectedCards = [];
    const match = (0,_matchHandler_mjs__WEBPACK_IMPORTED_MODULE_0__.matchCounter)();

    // main logic
    startInterface.gameContainer.addEventListener('click', function game(e) {
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
                    selectedCards.length = 0;
                    gameConditions.waiter = true;
                    startInterface.gameContainer.removeEventListener('click', game);
                    setTimeout(()=>{ (0,_interface_mjs__WEBPACK_IMPORTED_MODULE_1__.winInterface)(startInterface) }, 500);
                    
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
/* harmony export */   createStartInterface: () => (/* binding */ createStartInterface),
/* harmony export */   winInterface: () => (/* binding */ winInterface)
/* harmony export */ });
/* harmony import */ var _resetGame_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resetGame.mjs */ "./src/js/resetGame.mjs");

// Interface staff

// clear game container
// returns
    // game container
    // start button,
    // difficulty level
function createStartInterface() {
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
function createGameInterface(startInterface) {
    // show refresh/reset buttons
    // hide start buttons
    startInterface.startControls.classList.add('hide');    
    startInterface.gameControls.classList.remove('hide');
}

// creates new game field 
// depends on difficulty
function createGameField(gameConditions, startInterface) {
    // reset conditions and DOM element's classes
    (0,_resetGame_mjs__WEBPACK_IMPORTED_MODULE_0__.resetInterface)(startInterface);
    
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
function winInterface(startInterface) {
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
/* harmony export */   resetInterface: () => (/* binding */ resetInterface)
/* harmony export */ });
// reset game interface DOM elements

function resetInterface(startInterface) {
    document.querySelector('.win_modal').classList.remove('show');

    const newContainer = document.createElement('div');
    newContainer.classList.add('game_container');
    startInterface.gameContainer.replaceWith(newContainer);
    return startInterface.gameContainer = newContainer;
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
const startInterface = (0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createStartInterface)();


startInterface.startBtn.onclick = newGame;
startInterface.refreshBtn.onclick = newGame;

startInterface.resetBtn.addEventListener('click', function() {  
    const animated = startInterface.gameContainer;
    animated.className = animated.className + ' hide';
    
    animated.addEventListener('transitionend', () => {        
        (0,_js_resetGame_mjs__WEBPACK_IMPORTED_MODULE_3__.resetInterface)(startInterface);    
        (0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createStartInterface)();
    });
    
    // this approach runs with some lags
    // setTimeout(()=>{
    //     resetInterface(startInterface);    
    //     createStartInterface();
    // }, 500)
    
});

function newGame() {
    // create game conditions
        // pairsArray
        // winCounter
        // waiter
        // number of pairs (difficulty level)
    let gameConditions = (0,_js_conditions_mjs__WEBPACK_IMPORTED_MODULE_1__.createGameConditions)(startInterface);
    (0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createGameInterface)(startInterface, gameConditions);
    (0,_js_interface_mjs__WEBPACK_IMPORTED_MODULE_0__.createGameField)(gameConditions, startInterface);
    (0,_js_gameLogic_mjs__WEBPACK_IMPORTED_MODULE_2__.startGame)(startInterface, gameConditions);
}
})();

/******/ })()
;
//# sourceMappingURL=pairs.bundle.js.map