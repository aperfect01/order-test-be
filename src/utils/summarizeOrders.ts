import { Order } from "../types/order";
import { Summary } from "../types/summary";

export function summarizeOrders(orders: Order[]): Summary {
  const totalRevenue = calculateTotalRevenue(orders);
  const medianOrderPrice = calculateMedianOrderPrice(orders);
  const topProductByQty = findTopProductByQty(orders);
  const uniqueProductCount = countUniqueProducts(orders);

  return {
    totalRevenue,
    medianOrderPrice,
    topProductByQty,
    uniqueProductCount,
  };
}

function calculateTotalRevenue(orders: Order[]): number {
  return orders.reduce((sum, { qty, price }) => sum + qty * price, 0);
}

function calculateMedianOrderPrice(orders: Order[]): number {
  const orderTotals = orders.map(({ qty, price }) => qty * price).sort((a, b) => a - b);
  const len = orderTotals.length;
  const mid = Math.floor(len / 2);

  if (len === 0) return 0;
  return len % 2 === 0 ? (orderTotals[mid - 1] + orderTotals[mid]) / 2 : orderTotals[mid];
}

function findTopProductByQty(orders: Order[]): string {
  const qtyMap = new Map<string, number>();

  for (const { product, qty } of orders) {
    qtyMap.set(product, (qtyMap.get(product) || 0) + qty);
  }

  const top = [...qtyMap.entries()].reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0]);
  return top[0];
}

function countUniqueProducts(orders: Order[]): number {
  const products = new Set(orders.map((o) => o.product));
  return products.size;
}
