import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../components/admin/AdminSidebar";
import TableHOC from "../components/admin/TableHOC";
import { useAllOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/apiTypes";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}


const columns: Column<DataType>[]=[
{
  Header:"User",
  accessor: "user"
},
{
  Header:"Amount",
  accessor: "amount"
},
{
  Header:"Discount",
  accessor: "discount"
},
{
  Header:"Quantity",
  accessor: "quantity"
},
{
  Header:"Status",
  accessor: "status"
},
{
  Header:"Action",
  accessor: "action"
},
]


// const arr: Array<DataType> = [
//   {
//     user: "Charas",
//     amount: 4500,
//     discount: 400,
//     status: <span className="red">Processing</span>,
//     quantity: 3,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },

//   {
//     user: "Xavirors",
//     amount: 6999,
//     discount: 400,
//     status: <span className="green">Shipped</span>,
//     quantity: 6,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },
// ];

const Transaction = () => {

// const {user}=useSelector(
//   (state: {userReducer: UserReducerInitialState})=>state.userReducer
//   )
const { user } = useSelector((state: RootState) => state.userReducer);

const {isLoading,data,error,isError}=useAllOrdersQuery(user?._id!);

  const[row,setRows]=useState<DataType[]>([]);


  if(isError){
    const err=error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(()=>{
    if(data)
      setRows(
        data.orders.map((i)=>({
          user: i.user ? i.user.name : "Deleted User",
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span className={
              i.status==="Processing"?"red":i.status==="Shipped"?"green": "purple"
            } >{i.status}</span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
        }))
      );
    
  },[data])

  const Table=TableHOC<DataType>(
    columns,
    row,
    "dashboardProductBox",
    "Transactions",
    row.length>6
  )();

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
    {isLoading? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
          ): (
      Table
          )}
    </main>
    </div>
  );
};

export default Transaction;
