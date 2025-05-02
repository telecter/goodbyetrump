const countdownDays = document.getElementById("countdown-days");
const countdownWeeks = document.getElementById("countdown-weeks");
const countdownHours = document.getElementById("countdown-hours");

const endTime = new Date(2029, 0, 20, 12, 0, 0);
const now = new Date();

const diffTime = Math.abs(endTime - now);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const diffWeeks = Math.ceil(diffDays / 7);
const diffHours = Math.round(diffTime / (1000 * 60 * 60));

countdownDays.innerHTML = `${diffDays} days`;
countdownWeeks.innerHTML = `${diffWeeks} weeks`;
countdownHours.innerHTML = `${diffHours} hours`;