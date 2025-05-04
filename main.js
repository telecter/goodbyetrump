const countdownDays = document.getElementById("countdown-days");
const countdownWeeks = document.getElementById("countdown-weeks");
const countdownHours = document.getElementById("countdown-hours");
const progress = document.getElementById("countdown-progress");
const progressLabel = document.getElementById("progress-label");

const endTime = new Date(2029, 0, 20, 12, 0, 0);
const now = new Date();

const diffTime = Math.abs(endTime - now);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const diffWeeks = Math.ceil(diffDays / 7);
const diffHours = Math.round(diffTime / (1000 * 60 * 60));
const decimalComplete = 1 - (diffDays / 1461);
const percentComplete = (decimalComplete * 100).toFixed(1);

countdownDays.innerHTML = `${diffDays} days`;
countdownWeeks.innerHTML = `${diffWeeks} weeks`;
countdownHours.innerHTML = `${diffHours} hours`;
progress.style.width = `${percentComplete}%`;
progressLabel.innerHTML = `${percentComplete}% complete`;