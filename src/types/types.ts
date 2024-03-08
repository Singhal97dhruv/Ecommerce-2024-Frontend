export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  photo: string;
  category: string;
  _id: string;
  price: number;
  stock: number;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItems = {
  productId: string;
  photo: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
};

export type OrderItem = Omit<CartItems, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  status: string;
  total: number;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  order: number;
  user: number;
};
// type ChangePercent = {
//   revenueChangePercent: number;
//   productChangePercent: number;
//   userChangePercent: number;
//   orderChangePercent: number;
// };

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  revenueChangePercent: number;
  productChangePercent: number;
  userChangePercent: number;
  orderChangePercent: number;
  count: CountAndChange;
  chart: {
    orderMonthCounts: number[];
    orderMonthlyRevenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTxn: LatestTransaction[];
};

type RevenueDistribution={
    netMargin: number,
    discount: number,
    productionCost: number,
    burnt: number,
    marketingCost: number
}
export type Pie={
    orderFulfilment: {
        processing: number,
        shipped: number,
        delivered: number
    },
    productCategories: Record<string,number>[]
       
    stockAvailability: {
        inStock: number,
        outStock: number
    },
    revenueDistribution: RevenueDistribution;
    userAgeGroup: {
        teen: number,
        adult: number,
        old: number
    },
    adminCustomers: {
        admin: number,
        customer: number
    }
}
export type Bar={
    users: number[],
    product: number[],
    orders: number[],
}
export type Line={
    users: number[],
    product: number[],
    discount: number[],
    revenue: number[],
}