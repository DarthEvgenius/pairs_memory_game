// get timer initial value
// returns timerCounter function with scoped value
export function createTimer(interfaceObject) {
    let timer = interfaceObject.timerRange;
    return function() {
        return --timer;
    }
}

// each call updates timer counter
// puts new value into DOM counter container
export function updateTimer(timerContainer, timerCounter, timerID) {
    const counter = timerCounter();
    timerContainer.textContent = counter;

    if (counter <= 0) {
        clearInterval(timerID);
        return false;
    }
    return true;
}