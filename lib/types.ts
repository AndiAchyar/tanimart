export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  code: string;
};

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  code: string;
  qty: number;
};

export type PaymentMode = "cod" | "netbanking" | "cards";
export type DeliveryStatus = "pending" | "in_delivery" | "delivered";

export type Order = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  payment: PaymentMode;
  items: { name: string; qty: number }[];
  total: number;
  status: DeliveryStatus;
  createdAt: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};

export type Role = "user" | "farmer";

export type Session = {
  username: string;
  email: string;
  role: Role;
};
