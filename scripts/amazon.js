import { renderAmazonProducts } from "./amazonMainPage/renderAmazonProducts.js";
import { renderAmazonHeader } from "./amazonMainPage/renderAmazonHeader.js";
import { loadProducts } from "../data/products.js";

async function loadPage() {

  await loadProducts();

  renderAmazonProducts();
  renderAmazonHeader();

}

loadPage();