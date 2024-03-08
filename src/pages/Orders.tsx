import React, { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { UserReducerInitialState } from "../types/reducerTypes";
import { useSelector } from "react-redux";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { CustomError } from "../types/apiTypes";
import toast from "react-hot-toast";

interface DataType {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, isError, error, data } = useMyOrdersQuery(user?._id!);

  const [rows,setRows]=useState<DataType[]>([])


    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
      console.log(err);
    }
  
    useEffect(() => {
      if (data) {
        setRows(
          data.orders.map((i) => ({
            _id: i._id,
            amount: i.total,
            discount: i.discount,
            quantity: i.orderItems.length,
            status: (
              <span
                className={
                  i.status === "Processing"
                    ? "red"
                    : i.status === "Shipped"
                    ? "green"
                    : "purple"
                }
              >
                {i.status}
              </span>
            ),
            action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
          }))
        );
      }
    }, [data]);

  
  // const [rows] = useState<DataType[]>([
  //   {
  //     _id: "dafadf",
  //     amount: 897,
  //     quantity: 87,
  //     discount: 781,
  //     status: <span className="red">Processing</span>,
  //     action: <Link to={`/order/afldsfns`}>View</Link>,
  //   },
  // ]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboardProductBox",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="orders">
      <h2>My Orders</h2>

      {isLoading? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
          ): (
      Table
          )}
    </div>
  );
};

export default Orders;
