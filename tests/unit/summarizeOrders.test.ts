import { summarizeOrders } from "../../src/utils/summarizeOrders";
import { Order } from "../../src/types/order";
import { Summary } from "../../src/types/summary";

describe("summarizeOrders", () => {
  it("should return zeros and empty values for empty input", () => {
    const orders: Order[] = [];

    const result: Summary = summarizeOrders(orders);

    expect(result.totalRevenue).toBe(0);
    expect(result.medianOrderPrice).toBe(0);
    expect(result.topProductByQty).toBe("");
    expect(result.uniqueProductCount).toBe(0);
  });

  it("should correctly summarize a single order", () => {
    const orders: Order[] = [{ id: 1, product: "Apple", qty: 2, price: 3 }];

    const result = summarizeOrders(orders);

    expect(result.totalRevenue).toBe(6); // 2 * 3
    expect(result.medianOrderPrice).toBe(6);
    expect(result.topProductByQty).toBe("Apple");
    expect(result.uniqueProductCount).toBe(1);
  });

  it("should correctly calculate median for odd number of orders", () => {
    const orders: Order[] = [
      { id: 1, product: "A", qty: 1, price: 10 },
      { id: 2, product: "B", qty: 1, price: 20 },
      { id: 3, product: "C", qty: 1, price: 30 },
    ];

    const result = summarizeOrders(orders);

    expect(result.totalRevenue).toBe(60);
    expect(result.medianOrderPrice).toBe(20);
  });

  it("should correctly calculate median for even number of orders", () => {
    const orders: Order[] = [
      { id: 1, product: "A", qty: 1, price: 20 },
      { id: 2, product: "B", qty: 1, price: 30 },
      { id: 3, product: "C", qty: 1, price: 10 },
      { id: 4, product: "D", qty: 1, price: 40 },
    ];

    const result = summarizeOrders(orders);

    expect(result.totalRevenue).toBe(100);
    expect(result.medianOrderPrice).toBe((20 + 30) / 2);
  });

  it("should identify the top product by quantity", () => {
    const orders: Order[] = [
      { id: 1, product: "A", qty: 5, price: 10 },
      { id: 2, product: "B", qty: 3, price: 15 },
      { id: 3, product: "A", qty: 2, price: 10 },
      { id: 4, product: "B", qty: 1, price: 15 },
    ];

    const result = summarizeOrders(orders);

    expect(result.topProductByQty).toBe("A"); // A has 7, B has 3
  });

  it("should count unique products correctly", () => {
    const orders: Order[] = [
      { id: 1, product: "A", qty: 5, price: 10 },
      { id: 2, product: "B", qty: 3, price: 15 },
      { id: 3, product: "C", qty: 2, price: 20 },
      { id: 4, product: "A", qty: 1, price: 10 },
    ];

    const result = summarizeOrders(orders);

    expect(result.uniqueProductCount).toBe(3);
  });

  it("should handle products with same quantities correctly for topProductByQty", () => {
    const orders: Order[] = [
      { id: 1, product: "A", qty: 5, price: 10 },
      { id: 2, product: "B", qty: 5, price: 15 },
      { id: 3, product: "C", qty: 2, price: 20 },
      { id: 4, product: "D", qty: 1, price: 10 },
    ];

    const result = summarizeOrders(orders);

    // It will return the first encountered product with max qty
    expect(["A", "B"]).toContain(result.topProductByQty);
  });
});
