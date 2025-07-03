import { subtotal } from "./shared/add-to-cart.js";
import { generateProductHTML2, generateProductHTMLShipping } from "./shared/cart.js";
import { formatCurrency } from "./shared/format-currency.js";

function getCurrentCart() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser?.cart || [];
}

function renderProducts2() {
  const cart = getCurrentCart();
  let htmlContent = cart.length > 0
    ? cart.map(generateProductHTML2).join('')
    : '<div style="padding:1rem;color:#888;">Không có sản phẩm trong giỏ hàng.</div>';
  document.querySelector('.js-order-summary-products').innerHTML = htmlContent;
  if (cart.length > 5) {
    document.querySelector('.js-order-summary-products').classList.add('order-summary-products');
  } else {
    document.querySelector('.js-order-summary-products').classList.remove('order-summary-products');
  }
}
renderProducts2();

document.querySelector('.js-summary-section-container').innerHTML = generateProductHTMLShipping();

function updatePrices() {
  const total = subtotal();
  document.querySelector('.js-subtotal-price').innerHTML = formatCurrency(total);
  document.querySelector('.js-total-price').innerHTML = formatCurrency(total);
}
updatePrices();

// Form validation 

const form = document.querySelector('form');

const showError = (id, message) =>{
   document.getElementById(id).textContent = message;
}

const clearErrors = () =>{
   document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    clearErrors();

      const firstname = document.getElementById('firstname').value.trim();
      const lastname = document.getElementById('lastname').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phonenumber').value.trim();
      const address = document.getElementById('address').value.trim();
      const city = document.getElementById('city').value.trim();
      const state = document.getElementById('state').value.trim();
      const zipcode = document.getElementById('zipcode').value.trim();
      const country = document.getElementById('country').value.trim();

      let valid = true;

      if(firstname.length < 2){
        showError('firstname-error','First name must be at least 2 characters.')
        valid = false;
      }
      
      if(lastname.length < 2){
        showError('lastname-error','Last name must be at least 2 characters.')
        valid = false;
      }

       if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError("email-error", "Enter a valid email address.");
        valid = false;
      }

      if (!/^\d{10}$/.test(phone)) {
        showError("phonenumber-error", "Phone number must be exactly 10 digits.");
        valid = false;
      }

      if (address.length < 5) {
        showError("address-error", "Address must be at least 5 characters.");
        valid = false;
      }

      if (city.length < 2) {
        showError("city-error", "City name must be at least 2 characters.");
        valid = false;
      }

      if (state.length < 2) {
        showError("state-error", "State name must be at least 2 characters.");
        valid = false;
      }

      if (!/^\d{5,6}$/.test(zipcode)) {
        showError("zipcode-error", "Enter a valid ZIP code.");
        valid = false;
      }

      if (country.length < 2) {
        showError("country-error", "Enter a valid country.");
        valid = false;
      }

      if (valid) {
         document.getElementById('loader').style.display = 'flex';
        // Lấy danh sách sản phẩm trong giỏ hàng
        const cart = getCurrentCart();
        if (!cart || cart.length === 0) {
          document.getElementById('loader').style.display = 'none';
          alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng!');
          return;
        }
        const orderedProducts = cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.priceCents
        }));
        // Tạo nội dung gửi đi
        const formData = {
          firstname,
          lastname,
          email,
          phone,
          address,
          city,
          state,
          zipcode,
          country,
          products: orderedProducts.map(p => `${p.name} (x${p.quantity}) - ${p.price} VNĐ`).join('\n')
        };
        // Gửi dữ liệu qua Formspree
        try {
          const response = await fetch('https://formspree.io/f/xldnjvlp', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            // Lưu thông tin vào sessionStorage để trang xác nhận lấy lại
            const user = {
              firstname,
              lastname,
              email,
              phone,
              address,
              city,
              state,
              zipcode,
              country
            };
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('orderedProducts', JSON.stringify(orderedProducts));
            setTimeout(()=>{
              window.location.assign('order-confirmed.html');
            }, 1000);
          } else {
            document.getElementById('loader').style.display = 'none';
            alert('Đã có lỗi khi gửi đơn hàng. Vui lòng thử lại!');
          }
        } catch (error) {
          document.getElementById('loader').style.display = 'none';
          alert('Đã có lỗi khi gửi đơn hàng. Vui lòng thử lại!');
        }
      }
} );


