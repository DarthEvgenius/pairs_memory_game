import { loseInterface } from './interface.mjs';

export function createTimer(startInterface) {
    let timer = startInterface.timerRange;
    return function() {
        return --timer;
    }
}

export function updateTimer(timerContainer, timerCounter, timerID) {
    const counter = timerCounter();
    timerContainer.textContent = counter;

    if (counter <= 0) {
        clearInterval(timerID);
        return false;
    }
    return true;
}