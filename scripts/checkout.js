import { renderProductSummary } from "./checkout/renderProductSummary.js";
import { renderPaymentSummary } from "./checkout/renderPaymentSummary.js";
import { renderHeaderSummary } from "./checkout/renderHeaderSummary.js";
import { loadProducts } from "../data/products.js";
 
async function loadPage() {

  await loadProducts();

  renderProductSummary();
  renderPaymentSummary();
  renderHeaderSummary();

}

loadPage();

