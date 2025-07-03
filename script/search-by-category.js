// import { products } from "./shared/products.js";
import { generateProductHTML, showLoginMessage, showToast } from "./shared/cart.js";
import { addToCart } from "./shared/add-to-cart.js";

const products = JSON.parse(localStorage.getItem('products')) || [];



const params = new URLSearchParams(window.location.search);
const category = params.get("category")?.toLowerCase();
let filtered = [];
if(category === 'clothing'){
   filtered = products.filter(p => p.category.toLowerCase() === "men's clothing" ||  p.category.toLowerCase() === "women's clothing");
}
else{
filtered = products.filter(p => p.category.toLowerCase() === category);
}
const html = filtered.map(generateProductHTML).join('');
const quantity = filtered.length;
document.querySelector('.js-search-by-category').innerHTML = html || '<p>No products found.</p>';

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
document.querySelector('.js-product-category-name').innerHTML = capitalize(category || 'All');
document.querySelector('.js-result-quantity').innerHTML = quantity;

document.querySelector('.js-search-by-category')
  .addEventListener('click', event => {
    const dataId = event.target.getAttribute('data-id');
    if (!dataId) return;
  const result = addToCart(dataId, 1);
    if (!result?.success) {
      showLoginMessage?.(); 
    } else {
      showToast?.();
    }
  }
  ); 

