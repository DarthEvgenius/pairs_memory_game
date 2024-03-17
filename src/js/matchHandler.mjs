// game logics on match/no match
// make counter on each new game
export function matchCounter() {
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


export function noMatch(selectedCards, gameConditions) {
    selectedCards.forEach(e => {
        e.classList.remove('open');
    })
    selectedCards.length = 0;    
    gameConditions.waiter = false;
}