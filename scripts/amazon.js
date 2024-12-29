import { renderAmazonProducts } from "./amazonMainPage/renderAmazonProducts.js";
import { loadProducts } from "../data/products.js";

async function loadPage() {

  await loadProducts();

  renderAmazonProducts();

}

loadPage();

