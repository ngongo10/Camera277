import { calculateCartQuantity } from "../shared/cart.js";
import { formatCurrency } from "./format-currency.js";
// import { products } from "./products.js";

const products = JSON.parse(localStorage.getItem('products')) || [];

export function addToCart(dataId, quantity) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    return {success: false};
  }
  let cart = currentUser.cart || [];
  // Always compare id as string
  let matching = cart.find(cartItem => String(cartItem.id) === String(dataId));
  if (matching) {
    matching.quantity += quantity;
  } else {
    const product = products.find(p => String(p.id) === String(dataId));
    if (product) {
      cart.push({
        name: product.name,
        priceCents: product.priceCents,
        category: product.category,
        id: String(product.id),
        quantity: quantity
      });
    }
  }
  currentUser.cart = cart;
  users = users.map(user => user.email === currentUser.email ? currentUser : user);
  updateUserStorage(currentUser, users);
  calculateCartQuantity();
  subtotal();
  return { success: true };
}


export function deleteCartItems(dataId) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) return;

  let cart = currentUser.cart || [];

  // Always compare id as string
  let matching = cart.find(cartItem => String(cartItem.id) === String(dataId));

  if (matching && matching.quantity > 1) {
    matching.quantity--;
  } else {
    cart = cart.filter(cartItem => String(cartItem.id) !== String(dataId));
  }
  currentUser.cart = cart;
  users = users.map(user => user.email === currentUser.email ? currentUser : user);

  updateUserStorage(currentUser, users);

  calculateCartQuantity();
}


export function subtotal() {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || !currentUser.cart) return 0;

  return currentUser.cart
    .map(item => item.priceCents * item.quantity)
    .reduce((sum, val) => sum + val, 0);
}

function updateUserStorage(currentUser, users) {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('users', JSON.stringify(users));
}