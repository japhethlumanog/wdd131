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
