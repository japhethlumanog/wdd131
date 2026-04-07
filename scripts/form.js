const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Function to populate product options
function populateProducts() {
  const selectElement = document.getElementById('productOption');
  
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    selectElement.appendChild(option);
  });
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', function() {
  populateProducts();
});

// Increment review counter in localStorage
function incrementReviewCounter() {
    // Get current count or initialize to 0
    let reviewCount = localStorage.getItem('reviewCount');
    reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
    
    // Store the updated count
    localStorage.setItem('reviewCount', reviewCount);
    
    // Display the count
    document.getElementById('reviewCount').textContent = reviewCount;
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', function() {
    incrementReviewCounter();
});

const today = new Date();

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

document.getElementById("currentYear").textContent = formattedDate;

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;