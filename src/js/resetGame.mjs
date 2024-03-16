// reset game interface DOM elements
import { createStartInterface } from './interface.mjs';

export function resetInterface(interfaceObject) {
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

export function resetGame(interfaceObject) {
    resetInterface(interfaceObject);    
    createStartInterface(interfaceObject);
}