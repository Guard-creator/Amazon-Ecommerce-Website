import { orders } from "../../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "../utility/money.js";
import { getProducts } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { calculateOrderDeliveryTime } from "../../data/deliveryOptions.js";
import { renderheaderSummary } from "./orderHeaderSummary.js";

export function renderOrderSummary() {

  let html = '';



  orders.forEach(order => {

    const orderTime = dayjs(order.orderTime).format('MMMM, DD')

    html += `
  
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${renderOrderProducts(order)}
      </div>
    </div>

  `;
  });

  function renderOrderProducts(order) {

    let html = '';

    order.products.forEach(orderProduct => {

      const productDetails = getProducts(orderProduct.productId);

      const delivertDate = calculateOrderDeliveryTime(orderProduct);

      html += `
      
      <div class="product-image-container">
        <img src="${productDetails.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${productDetails.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${delivertDate}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>
        <button class="buy-again-button js-buy-again-btn button-primary"
          data-product-id="${orderProduct.productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">
          Buy it again
          </span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
  
  `;

    })

    return html;

  }

  document.querySelector('.js-orders-grid') 
    .innerHTML = html;

  document.querySelectorAll('.js-buy-again-btn')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        
        const {productId} = btn.dataset;
        cart.addToCart(productId);
        renderheaderSummary();

      })
    })

} 