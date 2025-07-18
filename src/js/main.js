/*
  ____                 _ _                  _____                           _ 
 / ___| ___   ___   __| | |__  _   _  ___  |_   _| __ _   _ _ __ ___  _ __ | |
| |  _ / _ \ / _ \ / _` | '_ \| | | |/ _ \   | || '__| | | | '_ ` _ \| '_ \| |
| |_| | (_) | (_) | (_| | |_) | |_| |  __/   | || |  | |_| | | | | | | |_) |_|
 \____|\___/ \___/ \__,_|_.__/ \__, |\___|   |_||_|   \__,_|_| |_| |_| .__/(_)
                               |___/                                 |_|      

Copyright (c) 2025 telecter - https://github.com/telecter/goodbyetrump
Licensed MIT, see LICENSE file.

*/

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.9.0/countUp.min.js";

const schemeSelector = document.getElementById("color-scheme");

schemeSelector.addEventListener("click", () => {
  const theme = document.body.getAttribute("data-theme");
  schemeSelector.textContent = theme == "dark" ? "🌙" : "🔅";

  const changed = theme == "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", changed);

  localStorage.setItem("color-scheme", changed);
});

document.body.setAttribute(
  "data-theme",
  localStorage.getItem("color-scheme") || "dark"
);

const countdownDays = document.getElementById("countdown-days");
const countdownWeeks = document.getElementById("countdown-weeks");
const countdownHours = document.getElementById("countdown-hours");
const progress = document.getElementById("countdown-progress");
const progressLabel = document.getElementById("progress-label");

function getDiffUnits(diffTime) {
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.ceil(diffDays / 7);
  const diffHours = Math.round(diffTime / (1000 * 60 * 60));
  return [diffWeeks, diffDays, diffHours];
}

function setCountdown(startTime, endTime) {
  const now = new Date();
  const [totalWeeks, totalDays, totalHours] = getDiffUnits(endTime - startTime);

  if (endTime - now > 0) {
    const [diffWeeks, diffDays, diffHours] = getDiffUnits(endTime - now);
    const decimalComplete = 1 - diffDays / 1461;
    const percentComplete = (decimalComplete * 100).toFixed(1);

    new CountUp(countdownDays, diffDays, {
      startVal: totalDays,
      suffix: diffDays == 1 ? " day" : " days",
      separator: "",
    }).start();

    new CountUp(countdownWeeks, diffWeeks, {
      startVal: totalWeeks,
      suffix: diffWeeks == 1 ? " week" : " weeks",
      separator: "",
    }).start();

    new CountUp(countdownHours, diffHours, {
      startVal: totalHours,
      suffix: diffHours == 1 ? " hour" : " hours",
      separator: "",
    }).start();

    new CountUp(progressLabel, percentComplete, {
      suffix: "% complete",
      decimalPlaces: 1,
    }).start();

    progress.style.width = `${percentComplete}%`;
  } else {
    countdownDays.textContent = "We made it!";
    countdownWeeks.textContent = "🎉 Congratulations!";
    countdownHours.textContent = "Is he leaving yet?";
    progress.style.width = `100%`;
    progress.style.backgroundColor = "green";
    progressLabel.textContent = `100% complete!`;
  }
}

const startTime = new Date(2025, 0, 20, 12, 0, 0);
const endTime = new Date(2029, 0, 20, 12, 0, 0);
setCountdown(startTime, endTime);
