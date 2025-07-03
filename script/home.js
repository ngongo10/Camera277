import { products } from "./shared/products.js";
import { calculateCartQuantity, generateProductHTML, showLoginMessage, showToast } from "./shared/cart.js"
// import { formatCurrency } from "./shared/format-currency.js";
import { addToCart } from "./shared/add-to-cart.js";

// const products = JSON.parse(localStorage.getItem('products')) || [];



function renderProducts(productList = products) {
  let htmlContent = productList.map(generateProductHTML).join('');
  document.querySelector('.js-product-item-grid').innerHTML = htmlContent;
  console.log(htmlContent)
}


// Category filtering
const header = document.querySelector('.js-products-right-header');
if (header) {

  header.addEventListener('click', event => {

    const category = event.target.getAttribute('data-category');

    if (!category) return;

    document.querySelectorAll('.product-btn').forEach(button =>
      button.classList.remove('active')
    );

    event.target.classList.add('active');

    if (category === 'all') {
      renderProducts();
    } else {
      const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

      renderProducts(filtered);
    }
  });
}
// Add to cart

const productGrid = document.querySelector('.js-product-item-grid');
if (productGrid) {
  productGrid
    .addEventListener('click', event => {
      const dataId = event.target.getAttribute('data-id');
      if (!dataId) return;
      const isAdded = addToCart(dataId, 1);
      if (!isAdded.success) {
        showLoginMessage();
        return;
      }
      showToast();
    }
    );

}
calculateCartQuantity();
renderProducts();
