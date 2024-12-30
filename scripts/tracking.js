import { loadProducts } from "../data/products.js";
import { renderTrackingHeaderSummary } from "./tracking/trackingHeaderSummary.js";
import { renderTrackingSummary } from "./tracking/trackingSummary.js";

async function loadPage() {

  await loadProducts();

  renderTrackingSummary();
  renderTrackingHeaderSummary();

}

loadPage();