import { cart } from "../../data/cart.js";

describe('test suite: Testing Cart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  })

  it('adding a product in the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })

    cart.loadCart();
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItem.length).toEqual(2);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('newCart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 3,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '3'
    }]));

  })

  it('adding a product in empty cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    })

    cart.loadCart();
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  })

})

describe('test Suite: removing Product from the Cart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  })

  it('removing a product from the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })

    cart.loadCart();
    cart.removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('newCart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]))

  })

  it('does nothing if product id does not exist', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })

    cart.loadCart();
    cart.removeFromCart('does-nothing');

    expect(cart.cartItem.length).toEqual(2);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('newCart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '3'
    }]))

  })

});

describe('test suite: testing with delivery Option', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  })

  it('updating delivery option in cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })

    cart.loadCart();
    cart.changeDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');

    expect(cart.cartItem[0].deliveryOptionId).toEqual('3');
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('newCart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '3'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '3'
    }]))

  })

  it('if product id does not exist it does nothing', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })

    cart.loadCart();
    cart.changeDeliveryOption('does-nothing', '3');

    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  })

  it('if deliveryOptionId does not exist it does nothing', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })

    cart.loadCart();
    cart.changeDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-nothing');

    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  })

})