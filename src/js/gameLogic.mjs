import { matchCounter, noMatch } from './matchHandler.mjs';
import { winInterface, loseInterface, createTimerContainer } from './interface.mjs';
import { createTimer, updateTimer } from './timer.mjs';
import { resetGame } from "./resetGame.mjs";

export function startGame(startInterface, gameConditions) {
    gameConditions.waiter = false;
    // array for two opened cards in one turn
    let selectedCards = [];
    const match = matchCounter();
    let timerID = null;

    if (gameConditions.isTimer) {
        const timerContainer = createTimerContainer(startInterface);
        const timerCounter = createTimer(startInterface);
        
        timerID = setInterval(() => {
            if (!updateTimer(timerContainer, timerCounter, timerID)) {
                // stop user's interactions with game field
                startInterface.gameContainer.style.pointerEvents = 'none';
                loseInterface(startInterface);
                setTimeout(() => {
                    resetGame(startInterface);
                }, 4000);
            }
            
        }, 1000);

        startInterface.resetBtn.addEventListener('click', function() {
            clearInterval(timerID);
        });
        startInterface.refreshBtn.addEventListener('click', function() {
            clearInterval(timerID);
        });
    } else {
        let timerContainer = document.querySelector('.timer_container');
        if (timerContainer) {
            timerContainer.innerHTML = '';
        }
    }
    
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
                    clearInterval(timerID);
                    selectedCards.length = 0;
                    gameConditions.waiter = true; 
                    startInterface.gameContainer.removeEventListener('click', game);
                    winInterface(startInterface);
                    setTimeout(() => {
                        resetGame(startInterface);
                    }, 4000);
                }
            } else {
                // pause interactions for complete animation 
                gameConditions.waiter = true;
                // handle CSS classes and update waiter
                setTimeout(()=>{ noMatch(selectedCards, gameConditions) }, 1000);
            }
        }
    });    
}
