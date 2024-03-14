// reset game interface DOM elements
import { createStartInterface } from './interface.mjs';

export function resetInterface(startInterface) {
    document.querySelector('.win_modal').classList.remove('show');
    document.querySelector('.lose_modal').classList.remove('show');

    const newContainer = document.createElement('div');
    newContainer.classList.add('game_container');
    startInterface.gameContainer.replaceWith(newContainer);
    return startInterface.gameContainer = newContainer;
}

export function resetGame(startInterface) {
    resetInterface(startInterface);    
    createStartInterface();
}