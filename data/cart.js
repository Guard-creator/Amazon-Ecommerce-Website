import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {

  cartItem; // cart array
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadCart();
  }

  // to load the products in the cart
  loadCart() {
    this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '2'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }];
  }

  saveIntoStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));
  }

  addToCart(productId) {

    let matchingItem;

    this.cartItem.forEach(cartItem => {
        if(productId === cartItem.productId) {
          matchingItem = cartItem;
        }
    });

    // to get the value from the quantity selector
    const quantitySel = document.querySelector(`.js-quantity-sel-${productId}`);
    const quantity = quantitySel ? Number(quantitySel.value) : 1;

    if(matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItem.push({
        productId,
        quantity,
        deliveryOptionId: '1',
      })
    }

    this.saveIntoStorage();

  }

  removeFromCart(productId) {

    const newCart = [];

    this.cartItem.forEach(cartItem => {
      if(productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    })

    this.cartItem = newCart;

    this.saveIntoStorage();

  }

  updateQuantityFromCart(productId, newQuantity) {

    let matchingItem;

    this.cartItem.forEach(cartItem => {
      if(cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    })

    matchingItem.quantity = newQuantity;

    this.saveIntoStorage();

  }

  // change the deliveryoption in the checkout page
  changeDeliveryOption(productId, deliveryOptionId) {

    // to make sure no unknown id pass
    if(!validDeliveryOption(deliveryOptionId)) {
      return;
    }

    let matchingItem;

    this.cartItem.forEach(cartItem => {
      if(cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    })

    //to make sure empty data dont pass
    if(!matchingItem) {
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveIntoStorage();

  }

  resetCart() {
    cart.cartItem = [];
    this.saveIntoStorage();
  }

}

export const cart = new Cart('newCart');