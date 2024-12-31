import { formatCurrency } from "../scripts/utility/money.js";

export let products = [];

// loading the product from the backend 

export async function loadProducts() {

  const response = await fetch('https://supersimplebackend.dev/products');
  const dataProduct = await response.json();

  products = await dataProduct.map(productDetails => {
    
    if(productDetails.type === 'clothing') {
      return new Clothing(productDetails);
    }

    return new Product(productDetails);

  })

}

export function getProducts(productId) {

  let matchingItem;

  products.forEach(product => {
    if(product.id === productId) {
      matchingItem = product;
    }
  })

  return matchingItem;

}

// get the product
export class Product {

  id;
  name;
  image;
  rating;
  priceCents;
  keywords;

    constructor(productDetails) {
      this.id = productDetails.id;
      this.name = productDetails.name;
      this.image = productDetails.image;
      this.rating = productDetails.rating;
      this.priceCents = productDetails.priceCents;
      this.keywords = productDetails.keywords;
    }

  getExtraHtml() {
    return '';
  }

  getPriceCents() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  getStarsImage() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

}

// get the chothes type products with sizeChart
export class Clothing extends Product{

  sizeChartLink;

    constructor(productDetails) {
      super(productDetails);
      this.sizeChartLink = productDetails.sizeCharLink
    }

  getExtraHtml() {
    return '<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>';
  }

}