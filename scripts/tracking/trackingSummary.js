import { getProducts } from "../../data/products.js";
import { calculateOrderDeliveryTime } from "../../data/deliveryOptions.js";
import { getOrder } from "../../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderTrackingSummary() {

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProducts(productId);

  let productDetails;
  order.products.forEach(orderProduct => {
    if(orderProduct.productId === product.id) {
      productDetails = orderProduct;
    }
  }); 

  const deliveryDate = calculateOrderDeliveryTime(productDetails);

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const estimatedDeliveryTime = dayjs(productDetails.estimatedDeliveryTime);

  const currentProgress = ((today - orderTime) / (estimatedDeliveryTime - orderTime)) * 100;

  const deliveryTimeMgs = today < estimatedDeliveryTime ? 'Arriving on' : 'Delivered on'

  let html = `

        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
         ${deliveryTimeMgs} ${deliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${currentProgress > 0 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${currentProgress >= 50 && 100 < currentProgress ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${currentProgress > 100 ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${currentProgress}%"></div>
        </div>
  
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = html;

}