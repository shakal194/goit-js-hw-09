import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const isDisabled = true;
let chosenDate = Date.now();

refs.btnStart.disabled = isDisabled;
refs.btnStart.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onClose(selectedDates[0]);
  },
};

function onClose(date) {
  if (Date.now() > date) {
    Notify.failure('Please choose a date in the future');
  } else {
    refs.btnStart.disabled = !isDisabled;
    chosenDate = date;
  }
}

function onStartClick() {
  refs.btnStart.disabled = isDisabled;
  calendar.destroy();
  refs.inputDate.disabled = isDisabled;
  calculationStart();
}

function calculationStart() {
  const timerId = setInterval(() => {
    const restTime = convertMs(chosenDate - Date.now());
    markupChange(restTime);
    if (
      restTime.seconds === 0 &&
      restTime.minutes === 0 &&
      restTime.hours === 0 &&
      restTime.days === 0
    ) {
      clearInterval(timerId);
    }
  }, 1000);
}

const calendar = flatpickr(refs.inputDate, options);

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function markupChange({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}
