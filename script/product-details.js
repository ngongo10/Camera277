import { addToCart } from "./shared/add-to-cart.js";
import { showLoginMessage, showToast } from "./shared/cart.js";
import { formatCurrency } from "./shared/format-currency.js";
// import { products } from "./shared/products.js";

const products = JSON.parse(localStorage.getItem('products')) || [];


const params = new URLSearchParams(window.location.search);
const productId = params.get('id');



const product = products.find(p => String(p.id) === String(productId));
if (product) {

  let htmlContent = `
    <div class="product-details-container">
    <div class="product-image">
        <img src="${product.image}" alt="Product-Image">
    </div>
    <div class="product-details">
      <div class="product-details-description">
           <p class="product-name">${product.name}</p>
           <p class=product-price>${formatCurrency(product.priceCents)}</p>
           <div class=product-description>
              <h3>Description</h3>
              <p>${product.description || "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore iusto assumenda blanditiis consequatur alias, perspiciatis quos esse facilis, illum iure neque dolorum tempora ipsam nobis. Doloremque, sed ad!"}</p>
           </div>
      </div>
      <div class="product-details-quantity">
       <p>Quantity</p>
          <div class="product-quantity-buttons">
          <button class="decrement-btn js-decrement-btn">-</button>
          <div class="display-quantity js-display-btn">1</div>
          <button class="increment-btn js-increment-btn">+</button>
          </div>
        <div class="add-to-cart-product">
          <button class="add-to-cart-btn  js-add-to-cart-btn">
          <i class="fas fa-shopping-cart shop-icon"></i>
          Add to Cart</button>
        </div>  
      </div>

        <div class= "description-table">
           <div class="category">
              <p>Category</p>
              <p>${product.category}</p>
           </div>

           <div class="product-id">
            <p>Product ID</p>
              <p>${product.id}</p>
           </div>
        </div>
    </div>
  </div>
       `;
  document.querySelector('.js-product-details-main').innerHTML = htmlContent;

  let quantity = 1;

document.querySelector('.js-increment-btn')
 .addEventListener('click', () => {
   quantity++;
   document.querySelector('.js-display-btn').textContent = quantity;
    console.log(quantity);
 });

 document.querySelector('.js-decrement-btn')
 .addEventListener('click', () => {
  if(quantity > 1) quantity--;
  else return;
   document.querySelector('.js-display-btn').textContent = quantity;
    console.log(quantity);
 });

  document.querySelector('.js-add-to-cart-btn')
    .addEventListener('click', () => {
      const result = addToCart(productId, quantity);
      if (!result?.success) {
        showLoginMessage?.();
      } else {
        showToast?.("Product added to cart!");
      }
    });

} else {
  document.querySelector('.js-product-details-main').innerHTML = `<p>Product not found.</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.querySelector('.js-go-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      history.back();
    });
  }
});
