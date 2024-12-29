import { formatCurrency } from "../scripts/utility/money.js";

export let products = [];

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

class Product {

  id;
  name;
  image;
  rating;
  priceCents;

    constructor(productDetails) {
      this.id = productDetails.id;
      this.name = productDetails.name;
      this.image = productDetails.image;
      this.rating = productDetails.rating;
      this.priceCents = productDetails.priceCents;
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

class Clothing extends Product{

  sizeChartLink;

    constructor(productDetails) {
      super(productDetails);
      this.sizeChartLink = productDetails.sizeCharLink
    }

  getExtraHtml() {
    return '<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>';
  }

}