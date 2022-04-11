const bodyColor = document.querySelector('body');
const btnStartColor = document.querySelector('button[data-start]');
const btnStopColor = document.querySelector('button[data-stop]');

btnStartColor.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  if (timerId) {
    btnStartColor.setAttribute('disabled', 'disabled');
  }
});

btnStopColor.addEventListener('click', () => {
  clearInterval(timerId);
  if (timerId) {
    btnStartColor.removeAttribute('disabled', 'disabled');
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
