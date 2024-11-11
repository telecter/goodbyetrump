const countdown = document.getElementById("countdown");
const endTime = new Date(2029, 0, 20, 12, 0, 0);

const now = new Date();
const diffTime = Math.abs(endTime - now);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
countdown.innerHTML = `${diffDays} days<br>`
