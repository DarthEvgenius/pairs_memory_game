// reset game interface DOM elements

export function resetInterface(startInterface) {
    document.querySelector('.win_modal').classList.remove('show');

    const newContainer = document.createElement('div');
    newContainer.classList.add('game_container');
    startInterface.gameContainer.replaceWith(newContainer);
    return startInterface.gameContainer = newContainer;
}

