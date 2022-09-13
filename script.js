"use strict";

let intervalID;
let countdownID;
let msIntervalID;

const body = document.querySelector("body");
const btnTrigger = document.querySelector(".btn--trigger");
const timerSecsLabel = document.querySelector(".timer--secs");
const timerMSLabel = document.querySelector(".timer--ms");

const randomNumber = (limit) => {
  const randomLimit = limit + 1;
  return Math.floor(Math.random() * randomLimit);
};

const msCountdown = () => {
  // Every 1000ms = 1s
  let msTimer = 100;
  return setInterval(() => {
    msTimer -= 1;
    timerMSLabel.textContent = `${msTimer}`.padStart(2, 0);
  }, 10);
};

const startCountdown = (secs) => {
  timerSecsLabel.innerHTML = "00";
  if (secs > 1) {
    timerSecsLabel.innerHTML = `${secs - 1}`.padStart(2, 0);
  }

  let timer = secs;

  msIntervalID = msCountdown();

  return setInterval(() => {
    timer = timer - 1;
    clearInterval(msIntervalID);
    msIntervalID = msCountdown();

    if (secs > 1) {
      timerSecsLabel.innerHTML = `${timer - 1}`.padStart(2, 0);
    }
  }, 1000);
};

const resetCountdown = (intervalID) => {
  clearInterval(intervalID);

  return 0;
};

const startInterval = (secs) => {
  const rgbHeading = document.querySelector(".rgb__value");

  btnTrigger.classList.remove("btn-primary");
  btnTrigger.classList.add("btn-danger");
  btnTrigger.innerText = "Stop";

  countdownID = startCountdown(secs);

  return setInterval(() => {
    const randomRGB = `rgb(${randomNumber(255)},${randomNumber(
      255
    )},${randomNumber(255)})`;

    resetCountdown(countdownID);
    resetCountdown(msIntervalID);

    countdownID = startCountdown(secs);

    body.style.background = randomRGB;
    rgbHeading.innerHTML = `<h1 class="py-2 text-center" style="color:${randomRGB}">${randomRGB}</h1>`;
  }, secs * 1000);
};
const stopInterval = (intervalID) => {
  btnTrigger.classList.remove("btn-danger");
  btnTrigger.classList.add("btn-primary");
  btnTrigger.innerText = "Start";

  clearInterval(intervalID);
  clearInterval(countdownID);
  clearInterval(msIntervalID);

  return 0;
};

btnTrigger.addEventListener("click", function (e) {
  const inpTime = document.querySelector(".input--time");

  if (intervalID) {
    intervalID = stopInterval(intervalID);
    return;
  }

  intervalID = startInterval(inpTime.value);
});
