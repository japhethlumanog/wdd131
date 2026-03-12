const today = new Date();

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);

document.getElementById("currentYear").textContent = formattedDate;

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;