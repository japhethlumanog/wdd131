const products = [
  {
    id: 1,
    name: 'Dark Chocolate Bar',
    category: 'bars',
    price: '₱450',
    description: 'Rich and intense dark chocolate bar made with premium cocoa beans.',
    image: '../images/Dark-chocolate-Bar.webp',
  },
  {
    id: 2,
    name: 'Milk Chocolate Bar',
    category: 'bars',
    price: '₱400',
    description: 'Smooth and creamy milk chocolate bar perfect for everyday indulgence.',
    image: '../images/Milk-Chocolate-Bar.webp',
  },
  {
    id: 3,
    name: 'Chocolate Truffles',
    category: 'truffles',
    price: '₱600',
    description: 'Handcrafted chocolate truffles with various fillings and coatings.',
    image: '../images/Chocolate-Truffles.webp',
  },
  {
    id: 4,
    name: 'Chocolate Covered Strawberries',
    category: 'covered',
    price: '₱550',
    description: 'Fresh strawberries dipped in rich chocolate for a delightful treat.',
    image: '../images/Chocolate-Covered-Strawberries.webp',
  },
  {
    id: 5,
    name: 'Hot Chocolate Mix',
    category: 'mix',
    price: '₱350',
    description: 'Premium hot chocolate mix for cozy evenings and warm drinks.',
    image: '../images/Hot-Chocolate-Mix.webp',
  },
  {
    id: 6,
    name: 'Chocolate Cookies',
    category: 'cookies',
    price: '₱300',
    description: 'Crunchy chocolate cookies baked with real chocolate chunks.',
    image: '../images/Chocolate-Cookies.webp',
  },
];

function createProductCard(product) {
  const { name, category, price, description, image } = product;
  return `
    <article class="product-card">
      <img src="${image}" alt="${name}" loading="lazy">
      <div class="card-body">
        <h3>${name}</h3>
        <p>${description}</p>
        <p class="tag">${category}</p>
        <p><strong>${price}</strong></p>
      </div>
    </article>
  `;
}

function renderProducts(filterCategory = 'all') {
  const productList = document.getElementById('product-list');
  if (!productList) {
    return;
  }

  const filtered = filterCategory === 'all'
    ? products
    : products.filter((product) => product.category === filterCategory);

  if (filtered.length === 0) {
    productList.innerHTML = `<p class="loading-text">No products found for ${filterCategory}.</p>`;
    return;
  }

  const cards = filtered.map(createProductCard).join('');
  productList.innerHTML = cards;
  localStorage.setItem('chocolateBlissLastCategory', filterCategory);
}

function handleCategoryChange(event) {
  const selected = event.target.value;
  if (selected === 'all' || selected === 'bars' || selected === 'truffles' || selected === 'covered' || selected === 'mix' || selected === 'cookies') {
    renderProducts(selected);
  } else {
    renderProducts('all');
  }
}

function loadSavedCategory() {
  const savedCategory = localStorage.getItem('chocolateBlissLastCategory');
  const categorySelect = document.getElementById('category-select');
  if (savedCategory && categorySelect) {
    categorySelect.value = savedCategory;
    renderProducts(savedCategory);
  } else {
    renderProducts('all');
  }
}

function displayResult(message, isError = false) {
  const result = document.getElementById('form-result');
  if (!result) {
    return;
  }

  result.innerHTML = `
    <div class="result-message ${isError ? 'error' : 'success'}">
      <p>${message}</p>
    </div>
  `;
}

function getFormData() {
  return {
    name: document.getElementById('name')?.value.trim() || '',
    email: document.getElementById('email')?.value.trim() || '',
    occasion: document.getElementById('occasion')?.value || '',
    preferences: document.getElementById('preferences')?.value || '',
    message: document.getElementById('message')?.value.trim() || '',
  };
}

function validateFormData(formData) {
  const missingFields = Object.entries(formData)
    .filter(([key, value]) => value === '')
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Please complete the following fields: ${missingFields.join(', ')}.`,
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData.email)) {
    return { isValid: false, message: 'Please enter a valid email address.' };
  }

  return { isValid: true };
}

function saveFormData(formData) {
  localStorage.setItem('chocolateBlissRequest', JSON.stringify(formData));
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = getFormData();
  const validation = validateFormData(formData);

  if (!validation.isValid) {
    displayResult(validation.message, true);
    return;
  }

  saveFormData(formData);
  displayResult(`Thank you, ${formData.name}! Your request for a ${formData.occasion} gift with ${formData.preferences} chocolate preference has been saved.`);
}

function loadSavedRequest() {
  const saved = localStorage.getItem('chocolateBlissRequest');
  if (!saved) {
    displayResult('No saved request was found. Please submit the form first.', true);
    return;
  }

  const parsed = JSON.parse(saved);
  document.getElementById('name').value = parsed.name;
  document.getElementById('email').value = parsed.email;
  document.getElementById('occasion').value = parsed.occasion;
  document.getElementById('preferences').value = parsed.preferences;
  document.getElementById('message').value = parsed.message;
  displayResult(`Loaded saved request for ${parsed.name}. You can make changes and submit again.`);
}

window.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category-select');
  if (categorySelect) {
    categorySelect.addEventListener('change', handleCategoryChange);
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  const loadSavedButton = document.getElementById('load-saved');
  if (loadSavedButton) {
    loadSavedButton.addEventListener('click', loadSavedRequest);
  }

  loadSavedCategory();

  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = today.getFullYear();
  }
  
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;
  }
});
