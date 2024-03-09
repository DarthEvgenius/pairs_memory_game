// get start options
// creates object with game conditions:
    // main array of pairs
    // win counter
    // waiter, for some animations
    // number of pairs (difficulty level)


export function createGameConditions(startInterface) {
    let pairsAmount = +startInterface.difficulty.value;
    
    const arr = Array.from({length: pairsAmount}, (elem, i) => i + 1);
    return {
        winCounter: pairsAmount,
        pairsArray: [...arr, ...arr],
        waiter: false,
        difficulty: pairsAmount
    }
}

