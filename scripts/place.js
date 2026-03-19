const today = new Date();

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

document.getElementById("currentYear").textContent = formattedDate;

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

const temp = 30;
const windSpeed = 10;

function calculateWindChill(t, s) {
  return 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);
}

let windChill = "N/A";

if (temp <= 10 && windSpeed > 4.8) {
  windChill = calculateWindChill(temp, windSpeed).toFixed(2);
}

document.getElementById("windChill").textContent = windChill;