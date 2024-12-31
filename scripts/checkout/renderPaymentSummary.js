import { cart } from "../../data/cart.js";
import { addOrder } from "../../data/orders.js";
import { getProducts } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utility/money.js";''

export function renderPaymentSummary() {

  let itemsPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = 0;

  cart.cartItem.forEach(cartItem => {
    const product = getProducts(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    itemsPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents;
    cartQuantity += cartItem.quantity;
  })

  const totalBeforeTax = itemsPriceCents + shippingPriceCents;
  const taxPriceCents = totalBeforeTax * 0.1;
  const totalPriceCents = totalBeforeTax + taxPriceCents;

  let html = `

      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(itemsPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money testing-shipping-price">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxPriceCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money testing-total-price">$${formatCurrency(totalPriceCents)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order-btn">
        Place your order
      </button>
  
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = html

  document.querySelector('.js-place-order-btn')
    .addEventListener('click', async() => {

      const order = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItem
        })
        }).then(response => {
          return response.json();
        })

        addOrder(order);

        window.location.href = 'orders.html';

        cart.resetCart();

    })

}

