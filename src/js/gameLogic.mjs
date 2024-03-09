import { matchCounter, noMatch } from './matchHandler.mjs';
import { winInterface } from './interface.mjs';

export function startGame(startInterface, gameConditions) {
    gameConditions.waiter = false;
        
    // array for two opened cards in one turn
    let selectedCards = [];
    const match = matchCounter();

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
                    setTimeout(()=>{ winInterface(startInterface) }, 500);
                    
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