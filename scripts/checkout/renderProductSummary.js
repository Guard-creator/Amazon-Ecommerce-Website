import { getProducts } from "../../data/products.js";
import { formatCurrency } from "../utility/money.js";
import { cart } from "../../data/cart.js";
import { renderPaymentSummary } from "./renderPaymentSummary.js";
import { renderHeaderSummary } from "./renderHeaderSummary.js";

export function renderProductSummary() {

  let html = '';

  cart.cartItem.forEach(cartItem => {

    const productDetails = getProducts(cartItem.productId);

    html += `
  
    <div class="cart-item-container 
      js-cart-item-cont-${productDetails.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${productDetails.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${productDetails.name}
          </div>
          <div class="product-price">
            $${formatCurrency(productDetails.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${productDetails.id}">
              Update
            </span>
            <input class="input-quantity js-input-quantity-${productDetails.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link"
              data-product-id="${productDetails.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-del-quantity"
              data-product-id="${productDetails.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-1">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-1">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-1">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

`;  
    
  });

  document.querySelector('.js-order-summary')
    .innerHTML = html;

  document.querySelectorAll('.js-del-quantity')
    .forEach(delBtn => {
      delBtn.addEventListener('click', () => {

        const {productId} = delBtn.dataset;
        cart.removeFromCart(productId); 

        renderProductSummary();
        renderPaymentSummary();
        renderHeaderSummary();

      })
    })
  
  document.querySelectorAll('.js-update-link')
    .forEach(updBtn => {
      updBtn.addEventListener('click', () => {
        
        const {productId} = updBtn.dataset;

        const cont = document.querySelector(`.js-cart-item-cont-${productId}`);

        cont.classList.add('is-editing-cart');

      })
    })

  document.querySelectorAll('.js-save-quantity-link')
    .forEach(saveBtn => {
      saveBtn.addEventListener('click', () => {

        const {productId} = saveBtn.dataset;
        const cont = document.querySelector(`.js-cart-item-cont-${productId}`);
        cont.classList.remove('is-editing-cart');

        const inputQuantity = document.querySelector(`.js-input-quantity-${productId}`);
        const newQuantity = Number(inputQuantity.value);

        if(newQuantity >= 100) {
          alert('you cant update quantity more then 100');
          return;
        }
 
        cart.updateQuantityFromCart(productId, newQuantity);

        inputQuantity.value = '';

        renderProductSummary();
        renderPaymentSummary();
        renderHeaderSummary();

      })
    })


}