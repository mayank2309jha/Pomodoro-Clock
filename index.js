const start = document.querySelector(".start");
const resume = document.querySelector(".stop");
const reset = document.querySelector(".reset");
const pause = document.querySelector(".pause");
const minute = document.querySelector(".minute");
const second = document.querySelector(".seconds");
const msg = document.querySelector(".msg");

let min = 25;
let sec = 0;

minute.textContent = String(min).padStart(2, "0");
second.textContent = String(sec).padStart(2, "0");

let timerId = null;
let count = 0;
let pomo = true;

const updateTime = () => {
  if (sec == 0) {
    if (min == 0) {
      clearInterval(timerId);

      if (pomo) {
        //we just ended the pomodor, now we go to break.
        pomo = false;
        //min = 0;
        min = 5;
        //sec = 5;
        count += 1;
        let message = `${count} Rounds of Pomodoro Complete!
        Time for a break.`;
        msg.textContent = message;
      } else {
        //now we begin another pomodoro round.
        pomo = true;
        min = 25;
        //min = 0;
        //sec = 5;
        let message = "Get ready for another session";
        msg.textContent = message;
      }
      timerId = null;
    } else {
      min = min - 1;
      sec = 59;
    }
  } else {
    sec = sec - 1;
  }
  minute.textContent = String(min).padStart(2, "0");
  second.textContent = String(sec).padStart(2, "0");
};

start.addEventListener("click", () => {
  if (!timerId) {
    updateTime();
    timerId = setInterval(updateTime, 1000);
  }
});
resume.addEventListener("click", () => {
  if (!timerId) {
    timerId = setInterval(updateTime, 1000);
  }
});
pause.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
});
reset.addEventListener("click", () => {
  clearInterval(timerId);
  min = 25;
  sec = 0;
  minute.textContent = "25";
  second.textContent = "00";
  count = 0;
  msg.textContent = "";
  pomo = true;
});
