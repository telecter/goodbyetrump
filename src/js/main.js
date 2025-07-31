/*
  ____                 _ _                  _____                           _ 
 / ___| ___   ___   __| | |__  _   _  ___  |_   _| __ _   _ _ __ ___  _ __ | |
| |  _ / _ \ / _ \ / _` | '_ \| | | |/ _ \   | || '__| | | | '_ ` _ \| '_ \| |
| |_| | (_) | (_) | (_| | |_) | |_| |  __/   | || |  | |_| | | | | | | |_) |_|
 \____|\___/ \___/ \__,_|_.__/ \__, |\___|   |_||_|   \__,_|_| |_| |_| .__/(_)
                               |___/                                 |_|      

https://github.com/telecter/goodbyetrump
*/

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.9.0/countUp.min.js";

const schemeSelector = document.getElementById("color-scheme");

schemeSelector.addEventListener("click", () => {
  const theme = document.body.getAttribute("data-theme");

  const changed = theme == "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", changed);

  localStorage.setItem("color-scheme", changed);
});

document.body.setAttribute(
  "data-theme",
  localStorage.getItem("color-scheme") || "dark"
);

const daysText = document.getElementById("days");
const monthsText = document.getElementById("months");
const weeksText = document.getElementById("weeks");
const hoursText = document.getElementById("hours");
const progress = document.getElementById("countdown-progress");
const progressLabel = document.getElementById("progress-label");
const endModal = document.getElementById("end-modal");

function getDiffUnits(diffTime) {
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = diffDays / 30.436768;
  const diffWeeks = Math.ceil(diffDays / 7);
  const diffHours = Math.round(diffTime / (1000 * 60 * 60));
  return [diffMonths, diffWeeks, diffDays, diffHours];
}

function setCountdown(startTime, endTime) {
  let now = new Date();
  const [totalMonths, totalWeeks, totalDays, totalHours] = getDiffUnits(
    endTime - startTime
  );

  if (endTime - now < 0) {
    now = endTime;
    endModal.showModal();
  }

  const [diffMonths, diffWeeks, diffDays, diffHours] = getDiffUnits(
    endTime - now
  );
  const decimalComplete = 1 - diffDays / 1461;
  const percentComplete = (decimalComplete * 100).toFixed(1);

  new CountUp(daysText, diffDays, {
    startVal: totalDays,
    separator: "",
  }).start();

  new CountUp(monthsText, diffMonths, {
    startVal: totalMonths,
  }).start();

  new CountUp(weeksText, diffWeeks, {
    startVal: totalWeeks,
    separator: "",
  }).start();

  new CountUp(hoursText, diffHours, {
    startVal: totalHours,
    separator: "",
  }).start();

  new CountUp(progressLabel, percentComplete, {
    suffix: "% complete",
    decimalPlaces: 1,
  }).start();

  progress.style.width = `${percentComplete}%`;

  if (percentComplete >= 100) {
    progress.style.backgroundColor = "green";
  }
}

const startTime = new Date(2025, 0, 20, 12, 0, 0);
const endTime = new Date(2029, 0, 20, 12, 0, 0);

setCountdown(startTime, endTime);
