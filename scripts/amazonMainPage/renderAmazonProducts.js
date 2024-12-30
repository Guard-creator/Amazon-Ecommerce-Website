import { products } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { renderAmazonHeader } from "./renderAmazonHeader.js";

export function renderAmazonProducts() {

  let html = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search')

  let filteredProducts = products;

  if(search) {

    filteredProducts = products.filter(product => {

      let matchingKeywords = false;

      product.keywords.forEach(keyword => {
        if(keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeywords = true;
        }
      })

      return matchingKeywords || product.name.toLowerCase().includes(search.toLowerCase());

    })

  }

  filteredProducts.forEach(product => {

    html += `

        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsImage()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPriceCents()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-sel-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.getExtraHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    
    `;

  })

  document.querySelector('.js-products-grid')
    .innerHTML = html;

  let addMgsTimeOutId = {};

  document.querySelectorAll('.js-add-to-cart')
    .forEach(btn => {
      btn.addEventListener('click', () => {

        const {productId} = btn.dataset;
        cart.addToCart(productId)
        renderAmazonHeader();

        // display added mgs when click on Add to Cart
        const addedMgs = document.querySelector(`.js-added-to-${productId}`);
        addedMgs.classList.add('is-visible')
        if(addMgsTimeOutId[productId]) {
          clearTimeout(addMgsTimeOutId[productId]);
        }
        addMgsTimeOutId[productId] = setTimeout(() => {
          addedMgs.classList.remove('is-visible');
          delete addMgsTimeOutId[productId];
        }, 1000)

      })
    })

}