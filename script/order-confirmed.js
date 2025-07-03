import { generateProductHTML2, generateProductHTMLShipping } from "./shared/cart.js";
import { formatCurrency } from "./shared/format-currency.js";

function renderProducts2() {
  // Lấy sản phẩm đã đặt từ sessionStorage (nếu có)
  const orderedProducts = JSON.parse(sessionStorage.getItem('orderedProducts')) || [];
  let htmlContent = orderedProducts.length > 0
    ? orderedProducts.map(item => {
        // Tìm lại sản phẩm trong localStorage để lấy hình ảnh, tên, giá...
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => String(p.id) === String(item.id) || p.name === item.name);
        if (product) {
          return `<div class="order-summary-product-details">
            <div class="product-image">
              <img src="${product.image}" alt="Product Image">
            </div>
            <div class="product-name-quantity-price js-product-name-quantity-price">
              <div class="product-name js-product-name">
                <p class="">${product.name}</p>
              </div>
              <div class="product-price-quantity">
                <p class="product-quantity">Qty: ${item.quantity}</p>
                <p>${formatCurrency(product.priceCents)}</p>
              </div>
            </div>
          </div>`;
        } else {
          return `<div class="order-summary-product-details"><p style='color:red'>${item.name} (x${item.quantity})</p></div>`;
        }
      }).join('')
    : '<div style="padding:1rem;color:#888;">Không có sản phẩm trong đơn hàng.</div>';
  document.querySelector('.js-ordered-products').innerHTML = htmlContent;
}
renderProducts2();

const summaryContainer = document.querySelector('.js-summary-section-container');
if (summaryContainer) {
  summaryContainer.innerHTML = generateProductHTMLShipping();
}

const user = JSON.parse(sessionStorage.getItem('user'));
if (!user) {
  document.querySelector('.js-shipping-information').innerHTML = '<p>No shipping info available.</p>';
} else {
  document.querySelector('.js-shipping-information').innerHTML = `
<h3 style="text-align:center">Shipping Information</h3>
      <div class="ship-to-and-contact">
        <div class="ship-to">
         <p style="color: rgba(255, 255, 255, 0.4);">Ship To</p>
         <div>${user.firstname}&nbsp;${user.lastname}</div>
         <div>${user.state}</div>
         <div>${user.city}, ${user.zipcode}</div>
         <div>${user.country}</div>
        </div>
        <div class="contact">
          <p style="color: rgba(255, 255, 255, 0.4);">Contact</p>
         <div>${user.email}</div>
         <div>${user.phone}</div>
        </div>
      </div>
`;
}

const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.querySelector('.js-order-date').innerHTML = formattedDate;

function updatePrices() {
  // Lấy lại tổng giá trị từ orderedProducts
  const orderedProducts = JSON.parse(sessionStorage.getItem('orderedProducts')) || [];
  let total = 0;
  if (orderedProducts.length > 0) {
    // Nếu có priceCents thì dùng, nếu không thì lấy price
    total = orderedProducts.reduce((sum, item) => sum + (item.priceCents || item.price || 0) * (item.quantity || 1), 0);
  }
  document.querySelector('.js-subtotal-price').innerHTML = formatCurrency(total);
  document.querySelector('.js-total-price').innerHTML = formatCurrency(total);
}
updatePrices();