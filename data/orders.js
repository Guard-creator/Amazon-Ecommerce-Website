export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(order) {

  orders.unshift(order);
  saveIntoStorage();
  console.log(orders);

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
