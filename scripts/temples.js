const today = new Date();

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

document.getElementById("currentYear").textContent = formattedDate;

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});





