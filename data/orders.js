export const orders = JSON.parse(localStorage.getItem('order')) || [];

// to add a order coming from checkoutpage
export function addOrder(order) {

  orders.unshift(order);
  saveIntoStorage();

}

function saveIntoStorage() {
  localStorage.setItem('order', JSON.stringify(orders));
}

export function getOrder(orderId) {

  let matchingItem;

  orders.forEach(order => {
    if(order.id === orderId) {
      matchingItem = order;
    }
  });

  return matchingItem;

}
