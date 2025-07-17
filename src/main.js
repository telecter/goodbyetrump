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

"use strict";

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

const endTime = new Date(2029, 0, 20, 12, 0, 0);
const now = new Date();

const diffTime = endTime - now;

if (diffTime > 0) {
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.ceil(diffDays / 7);
  const diffHours = Math.round(diffTime / (1000 * 60 * 60));
  const decimalComplete = 1 - diffDays / 1461;
  const percentComplete = (decimalComplete * 100).toFixed(1);

  countdownDays.textContent = `${diffDays} days`;
  countdownWeeks.textContent = `${diffWeeks} weeks`;
  countdownHours.textContent = `${diffHours} hours`;
  progress.style.width = `${percentComplete}%`;
  progressLabel.textContent = `${percentComplete}% complete`;
} else {
  countdownDays.textContent = "We made it!";
  countdownWeeks.textContent = "🎉 Congratulations!";
  countdownHours.textContent = "Is he leaving yet?";
  progress.style.width = `100%`;
  progress.style.backgroundColor = "green";
  progressLabel.textContent = `100% complete!`;
}
