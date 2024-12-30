import { renderOrderSummary } from "./orders/orderSummary.js";
import { renderheaderSummary } from "./orders/orderHeaderSummary.js";
import { loadProducts } from "../data/products.js";

async function loadPage() {

  await loadProducts();

  renderOrderSummary();
  renderheaderSummary();

}

loadPage();