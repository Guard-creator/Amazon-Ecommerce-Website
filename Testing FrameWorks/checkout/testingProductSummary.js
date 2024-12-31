import { cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";
import { renderProductSummary } from "../../scripts/checkout/renderProductSummary.js";

describe('test suite: display order Summary', () => {

  beforeAll(async () => {
    await loadProducts();
  })

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {

    document.querySelector('.testing-div-product-summary')
      .innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-checkout-header"></div>
        <div class="js-payment-summary"></div>
      `;

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })

    cart.loadCart();
    renderProductSummary();

  })

  afterEach(() => {
    document.querySelector('.testing-div-product-summary')
    .innerHTML = '';
  })

  it('checking it display correctly', () => {

    expect(document.querySelectorAll('.testing-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.testing-quantity-${productId1}`).innerHTML).toEqual('2');
    expect(document.querySelector(`.testing-quantity-${productId2}`).innerHTML).toEqual('1');
    expect(document.querySelector(`.testing-name-${productId1}`)
      .innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(document.querySelector(`.testing-priceCents-${productId1}`)
    .innerText).toEqual('$10.90');
    

  })

  it('deleting a product from the cart', () => {

    document.querySelector(`.testing-delete-button-${productId2}`).click();

    expect(document.querySelectorAll('.testing-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-cont-${productId2}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-cont-${productId1}`)).not.toEqual(null);
    expect(document.querySelector(`.testing-quantity-${productId1}`).innerHTML).toEqual('2');
    expect(document.querySelector(`.testing-name-${productId1}`)
      .innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(document.querySelector(`.testing-priceCents-${productId1}`)
    .innerText).toEqual('$10.90');

  })

  it('updating a deliveryOption in page', () => {

    document.querySelector(`.testing-delivery-option-${productId1}-3`).click();

    expect(cart.cartItem[0].deliveryOptionId).toEqual('3')
    expect(document.querySelector(`.testing-quantity-${productId1}`).innerHTML).toEqual('2');
    expect(document.querySelector(`.testing-quantity-${productId2}`).innerHTML).toEqual('1');
    expect(document.querySelector('.testing-shipping-price').innerHTML).toEqual('$19.98');
    expect(document.querySelector('.testing-total-price').innerHTML).toEqual('$69.00');

  })

})