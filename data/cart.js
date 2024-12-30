class Cart {

  cartItem;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadCart();
  }

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

    const quantitySel = document.querySelector(`.js-quantity-sel-${productId}`);
    const quantity = Number(quantitySel.value);

    if(matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItem.push({
        productId,
        quantity,
        deliveryOptionID: '1',
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

}

export const cart = new Cart('newCart');