const M_S = 1200;
const audio = new Audio("10sec.mp3");
const DEAFULT_STAKE = 200;
let iterations = M_S;
let minutes;
let seconds;
let target_date;
let current_date;
let interval;
let stopped;
const redBackgroundImageColor =
  "-webkit-linear-gradient(top, #C20003, #C20003)";
const greyBackgroundImageColor = "-webkit-linear-gradient(top, #bbb, #eee)";

function start() {
  changeBackgroundImageColor(greyBackgroundImageColor);
  interval = setInterval(function() {
    getCountdown();
  }, 1000);
}

function getCountdown() {
  if (iterations === 0) {
    reset();
  }
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");
  iterations--;

  minutes = pad(parseInt(iterations / 60));
  seconds = pad(parseInt(iterations % 60));

  if (iterations <= 10) {
    audio.play();
    changeBackgroundImageColor(redBackgroundImageColor);
  }

  if (iterations === 0) {
    clearInterval(interval);
  }

  minutesSpan.innerHTML = minutes;
  secondsSpan.innerHTML = seconds;
}

function fillPrices() {
  let firstPlace = document.getElementById("firstPlace");
  let secondPlace = document.getElementById("secondPlace");
  let thirdPlace = document.getElementById("thirdPlace");
  const tot = parseInt(document.getElementById("tot").innerHTML);

  const thirdPlaceValue = DEAFULT_STAKE;
  const secondPlaceValue = (tot - thirdPlaceValue) * 0.3;
  const firstPlaceValue = tot - secondPlaceValue - thirdPlaceValue;

  firstPlace.innerHTML = firstPlaceValue;
  secondPlace.innerHTML = secondPlaceValue;
  thirdPlace.innerHTML = thirdPlaceValue;
}

function changeBackgroundImageColor(color) {
  const tiles = Array.from(document.querySelectorAll("#tiles >span"));
  tiles.map(span => (span.style.backgroundImage = color));
}

function pad(n) {
  return (n < 10 ? "0" : "") + n;
}

function stop() {
  audio.pause();
  clearInterval(interval);
}

function reset() {
  audio.pause();
  audio.currentTime = 0;
  changeBackgroundImageColor(greyBackgroundImageColor);
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");

  minutesSpan.innerHTML = "20";
  secondsSpan.innerHTML = "00";
  iterations = M_S;
}

function calculateTot() {
  const table = document.getElementById("table");
  console.log("table: ", table);
  const totSpan = document.getElementById("tot");
  let sumVal = 0;

  Array.from(table.rows).map(row => {
    const value = parseInt(row.cells[1].innerHTML);
    sumVal += value ? parseInt(row.cells[1].innerHTML) : 0;
  });

  totSpan.innerHTML = sumVal;

  fillPrices();
}
