import {
  Bar,
  CartItems,
  Line,
  Order,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export interface MessageResponse {
  status: boolean;
  message: string;
}

export interface UserResponse {
  status: boolean;
  user: User;
}
export interface AllUsersResponse {
  status: boolean;
  users: User[];
}
export interface AllProductsResponse {
  status: boolean;
  products: Product[];
}
export interface CategoriesResponse {
  status: boolean;
  categories: string[];
}
export type searchProductsResponse = {
  status: boolean;
  products: Product[];
  totalPage: number;
};
export type searchProductsRequest = {
  price: number;
  sort: string;
  page: number;
  category: string;
  search: string;
};
export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};
export type SingleOrderResponse = {
  success: boolean;
  order: Order;
};
export type StatsResponse = {
  success: boolean;
  stats: Stats;
};
export type PieResponse = {
  success: boolean;
  charts: Pie;
};
export type BarResponse = {
  success: boolean;
  charts: Bar;
};
export type LineResponse = {
  success: boolean;
  charts: Line;
};
export type ProductRequest = {
  id: string;
  formData: FormData;
};
export type UpdateProductRequest = {
  productId: string;
  formData: FormData;
  userId: string;
};
export type DeleteProductRequest = {
  productId: string;
  userId: string;
};
export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItems[];
  subtotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  user: string;
};
export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};
export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};
