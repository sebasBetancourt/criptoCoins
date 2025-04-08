export const dialogRegister = () => {
    const dialog = document.querySelector('#dialog__signUp');
    const dialog__close = document.querySelector('#close__dialog');
    const dialog__open = document.querySelector('#dialog__signUp_open');
    const dialog__openTwo = document.querySelector('#dialog__signUp_openTwo');
    const body = document.querySelector('#body');

    dialog__open.addEventListener('click', () => {
        dialog.showModal();
    });
    dialog__openTwo.addEventListener('click', () => {
        dialog.showModal();
    });

    dialog__close.addEventListener('click', () => {
        dialog.close();
    })
}