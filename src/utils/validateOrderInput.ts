import { OrderInput } from "../types/order";

export function isValidOrderInput(input: Partial<OrderInput>): boolean {
  const { product, qty, price } = input;
  return (
    typeof product === "string" &&
    product.trim().length > 0 &&
    typeof qty === "number" &&
    qty > 0 &&
    typeof price === "number" &&
    price > 0
  );
}
