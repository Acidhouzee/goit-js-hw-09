import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector('[data-start]')

const daysContent = document.querySelector('[data-days]');  
const hoursContent = document.querySelector('[data-hours]');  
const minutesContent = document.querySelector('[data-minutes]');  
const secondsContent = document.querySelector('[data-seconds]');

const currentDate = new Date();
const dateInput = document.querySelector('#datetime-picker');

let intervId = null;

start.setAttribute('disabled', 'disabled');

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

function addLeadingZero(value){
    return value.toString().padStart(2, '0');
  }

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        currentDate.getTime();
        selectedDates[0].getTime();
        if (currentDate > selectedDates[0]) {
            return Notiflix.Report.warning('Error', 'Please choose a date in the future!', 'Ok');
        }
        start.removeAttribute('disabled');
        start.addEventListener('click', () => {
            chooseTime();
        });
    },
};

function chooseTime() {
    intervId = setInterval(() => {
        let time = convertMs(selectedDates[0].getTime() - Date.parse(new Date()));    
        buildContent(time);
        if(selectedDates[0].getTime() - Date.parse(new Date()) <=0){  
            clearInterval(intervId);  
        }
    }, 1000); 
}

function buildContent(currentTime) {
    daysContent.innerHTML = addLeadingZero(currentTime.days);
    hoursContent.innerHTML = addLeadingZero(currentTime.hours);
    minutesContent.innerHTML = addLeadingZero(currentTime.minutes);
    secondsContent.innerHTML = addLeadingZero(currentTime.seconds);
}

flatpickr(dateInput, options);
