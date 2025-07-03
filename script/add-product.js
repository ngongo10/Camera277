// import { products } from "../script/shared/products.js";

import { formatCurrency } from "./shared/format-currency.js";

function showToast(message = "Product added!") {
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;

  // Optional styling (or move to CSS)
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.backgroundColor = 'hsl(222.86deg 84% 4.9%)';
  toast.style.color = '#fff';
  toast.style.padding = '10px 16px';
  toast.style.borderRadius = '6px';
  toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  toast.style.zIndex = 1000;
  toast.style.marginTop = '10px';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease-in';

  document.body.appendChild(toast);

  // Fade in
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 100);

  // Fade out & remove
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}


const form = document.querySelector('#add-product-form');

const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('fileImage');
  const file = fileInput.files[0];

  if (!file) {

    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const base64Image = event.target.result;


    const id = document.getElementById('id').value.trim();

    const index = existingProducts.findIndex(p => p.id === id);

    const newProduct = {
      id: id,
      image: base64Image, // Store base64 image
      name: document.getElementById('name').value.trim(),
      description: document.getElementById('description').value.trim(),
      priceCents: parseInt(document.getElementById('priceCents').value),
      category: document.getElementById('category').value
    };

    if (index !== -1) {
      existingProducts[index] = newProduct;
    } else {
      existingProducts.push(newProduct);
    }

    localStorage.setItem('products', JSON.stringify(existingProducts));
    showToast("Product added successfully!");
    form.reset();
    setTimeout(() => {
      location.reload();
    },  3500)

  };

  reader.readAsDataURL(file); // Convert file to base64
});


let htmlContent = '';
existingProducts.forEach((product) => {

  htmlContent += `
  <div class="all-product-details js-all-product-details">

            <div class="product-image">
              <img src="${product.image}" alt="Product Image">
            </div>
  
            <div class="product-name-quantity-price js-product-name-quantity-price">
              <div class="product-name js-product-name">
                <p class="">${product.name}</p>
              </div>
  
              <div class="product-price-quantity">
              
                <p>$${formatCurrency(product.priceCents)}</p>
               <i data-id="${product.id}" style='color: red;'class="fas fa-trash delete-btn js-delete-btn"></i>
              </div>
  
            </div>
          </div>
  `;
})

document.querySelector('.js-all-product-details-container').innerHTML = htmlContent;

let dataId = '';

document.querySelector('.js-all-product-details-container').addEventListener('click', (e) => {

  const deleteBtn = e.target.closest('.delete-btn');
  if (!deleteBtn) return;
    dataId = deleteBtn.getAttribute('data-id');
  showPopUp();


});
  document.querySelector('.popup-delete-btn').addEventListener('click', () => {

  if (!dataId) return;
    const productIndex = existingProducts.findIndex(p => p.id === dataId);

    if (productIndex !== -1) {
      // Remove product from products list
      existingProducts.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(existingProducts));

      // Update all users' carts
      const users = JSON.parse(localStorage.getItem('users')) || [];

      users.forEach(user => {
        if (Array.isArray(user.cart)) {
          // Filter out deleted product from the user's cart
          user.cart = user.cart.filter(item => {
            return existingProducts.find(p => p.id === item.id);
          });
        }
      });

      // Save updated users
      localStorage.setItem('users', JSON.stringify(users));

      location.reload();
    }
  });

function showPopUp() {
  const message = document.querySelector('.pop-up');
  message.classList.add('showPopup');



}

document.querySelector('.cancel-btn').addEventListener('click', () => {
  document.querySelector('.pop-up').classList.remove('showPopup');
  return;
});