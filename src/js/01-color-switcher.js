const start = document.querySelector('[data-start]');
const finish = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

start.addEventListener('click', () => {
    start.setAttribute('disabled', 'disabled');
    finish.removeAttribute('disabled');
    intervId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 700);
});

finish.addEventListener('click', () => {
    finish.setAttribute('disabled', 'disabled');
    start.removeAttribute('disabled');
    clearInterval(intervId);
});

