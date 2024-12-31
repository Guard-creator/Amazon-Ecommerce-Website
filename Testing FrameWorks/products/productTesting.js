import { Product, Clothing } from "../../data/products.js";

describe('checking classes of products', () => {

  let products;

  beforeEach(() => {

    products = new Product({
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel"
        ]
      }) 

  })

  it('testing product class passing correctly', () => {
    
    expect(products.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(products.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(products.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");

  });

  it('testing star function working correctly', () => {
    expect(products.getStarsImage()).toEqual('images/ratings/rating-45.png');
  })

  it('testing price Cents function', () =>  {
    expect(products.getPriceCents()).toEqual('$10.90')
  })

  it('testing extrahtml function', () => {
    expect(products.getExtraHtml()).toEqual('');
  })

})

describe('checking classes of products', () => {

  let clothing;

  beforeEach(() => {

    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    }) 

  })

  it('testing product class passing correctly', () => {
    
    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");
    expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");

  });

  it('testing star function working correctly', () => {
    expect(clothing.getStarsImage()).toEqual('images/ratings/rating-45.png');
  })

  it('testing price Cents function', () =>  {
    expect(clothing.getPriceCents()).toEqual('$7.99')
  })

  it('testing extrahtml function', () => {
    expect(clothing.getExtraHtml()).toContain('<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>');
    expect(clothing.getExtraHtml()).toContain('Size Chart');
  })

})