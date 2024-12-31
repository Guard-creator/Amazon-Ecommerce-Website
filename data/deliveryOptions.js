import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0,
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499,
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999,
}]

export function getDeliveryOption(deliveryOptionId) {

  let matchingItem;

  deliveryOptions.forEach(option => {
    if(deliveryOptionId === option.id) {
      matchingItem = option;
    }
  })

  return matchingItem;

}

// to skip the weekend 
function isWeekEnd(dayOfWeek) {
  const weekend = dayOfWeek.format('dddd');
  return weekend === 'Saturday' || weekend === 'Sunday';
} 

// to calculate deliveryDate 
export function calculateDeliveryDate(deliveryOption) {

  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while(remainingDays > 0) {

    deliveryDate = deliveryDate.add(1, 'day');
    if(!isWeekEnd(deliveryDate)) {
      remainingDays--;
    }

  }

  const formatDate = deliveryDate.format('dddd, MMMM, DD');

  return formatDate;

}

// so it only work for the id that are given to deliveryOptions
export function validDeliveryOption(deliveryOptionId) {

  let found = false;

  deliveryOptions.forEach(option => {
    if(option.id === deliveryOptionId) {
      found = true;
    }
  })

  return found;

}

// this is different from the top function its for order page 
export function calculateOrderDeliveryTime(orderProduct) {
  // Parse the estimated delivery date
  const estimatedDeliveryDate = dayjs(orderProduct.estimatedDeliveryTime);

  let remainingDays = estimatedDeliveryDate.diff(dayjs(), 'day'); // Difference in days
  
  let deliveryDate = dayjs();

  while (remainingDays >= 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    if (!isWeekEnd(deliveryDate)) {
      remainingDays--;
    }
  }

  const formatDate = deliveryDate.format('dddd, MMMM DD');
  return formatDate;
}
