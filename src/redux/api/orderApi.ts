import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderRequest,
  SingleOrderResponse,
  UpdateOrderRequest,
} from "../../types/apiTypes";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `my?id=${id}`,
        provideTags: ["orders"],
      }),
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `all?id=${id}`,
        provideTags: ["orders"],
      }),
    }),
    singleOrder: builder.query<SingleOrderResponse, string>({
      query: (id) => ({
        url: id,
        provideTags: ["orders"],
      }),
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}/?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}/?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
