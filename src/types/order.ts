export type Order = {
  id: number;
  product: string;
  qty: number;
  price: number;
};

export type OrderInput = {
  product: string;
  qty: number;
  price: number;
};
