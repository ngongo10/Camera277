import { addTax, subtotal } from "./shared/add-to-cart.js";
import { generateProductHTML2, generateProductHTMLShipping } from "./shared/cart.js";
import { formatCurrency } from "./shared/format-currency.js";

 const currentUser = JSON.parse(localStorage.getItem('currentUser'));

function renderProducts2() {
  
   
  let htmlContent = currentUser.cart.map(generateProductHTML2).join('');
   document.querySelector('.js-ordered-products').innerHTML = htmlContent;
  console.log(htmlContent)

}
renderProducts2();
const summaryContainer = document.querySelector('.js-summary-section-container');
if (summaryContainer) {
  summaryContainer.innerHTML = generateProductHTMLShipping();
}

  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);
  if (!user) {
  document.querySelector('.js-shipping-information').innerHTML = '<p>No shipping info available.</p>';
}else{
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

console.log(formattedDate); 
document.querySelector('.js-order-date').innerHTML = formattedDate;

function updatePrices() {
  const total = subtotal();
  document.querySelector('.js-subtotal-price').innerHTML = formatCurrency(total);
  document.querySelector('.js-total-price').innerHTML = formatCurrency(total);
}
updatePrices();