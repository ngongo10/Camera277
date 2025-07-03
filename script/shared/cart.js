import { formatCurrency } from "./format-currency.js";
const products = JSON.parse(localStorage.getItem('products')) || [];

export function calculateCartQuantity() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || !currentUser.cart) return;

  const quantity = currentUser.cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartIcon = document.querySelector('.js-shopping-icon');
  if (cartIcon) {
    cartIcon.innerText = quantity;
  }
}


export function generateProductHTML(product) {
  return `
        <div class="product-item">
        <div class="product-img-container">
          <img class="product-img" src="${product.image}" alt="">
        </div>

        <div class="product-details">
          <a class="product-name js-product-details-link" href="product-details.html?id=${product.id}">${product.name}</a>
          <p class="product-description">${product.description}</p>
        </div>

        <div class="add-to-cart-container">
          <div class="price">${formatCurrency(product.priceCents)}</div>
          <div class="add-to-cart-btn">
            <button class="js-add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
   `;
}




export function generateProductHTML2(cartItem) {
  let product = products.find(p => String(p.id) === String(cartItem.id));
  if (!product) {
    // Thử tìm lại nếu id là số hoặc string
    product = products.find(p => p.id == cartItem.id);
  }
  if (!product) {
    return `<div class="order-summary-product-details"><p style='color:red'>Product not found: ${cartItem.id}</p></div>`;
  }
  return `
   <div class="order-summary-product-details">

          <div class="product-image">
            <img src="${product.image}" alt="Product Image">
          </div>

          <div class="product-name-quantity-price js-product-name-quantity-price">
            <div class="product-name js-product-name">
              <p class="">${product.name}</p>
            </div>

            <div class="product-price-quantity">
              <p class="product-quantity">Qty: ${cartItem.quantity}</p>
              <p>${formatCurrency(product.priceCents)}</p>
            </div>

          </div>
        </div>
   `;
}

export function generateProductHTMLShipping(){
return `      <div class="summary-section">

        <div class="grid-order-summary-details">
          <p class="grid-order-summary-details-text-format">Subtotal</p>
          <p class="js-subtotal-price">0 VNĐ</p>
        </div>
        <div class="grid-order-summary-details">
          <p class="grid-order-summary-details-text-format">Shipping</p>
          <p>Free</p>
        </div>
      </div>

      <div class="total-order-summary-container">
        <div class="grid-total-order-summary">
          <p>Total</p>
          <p class="js-total-price">0 VNĐ</p>
        </div>
      </div>`;
}
 
export function initHeaderEvents() {
  const searchIcon = document.querySelector('.js-search-icon');
  const searchInput = document.querySelector('.js-search-products');

  if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', (event) => {
      event.preventDefault();
      const category = searchInput.value.trim();
      if (category) {
        window.location.href = `search-by-category.html?category=${encodeURIComponent(category)}`;
      }
    });
  }
}

export function showLoginMessage() {

  document.getElementById('login-popup').style.display = 'flex';


  setTimeout(() => {
    document.getElementById('login-popup').style.display = 'none';
  }, 3000);
}



export function showToast(message = "Product added to cart!") {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
