import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import AdminSidebar from '../components/admin/AdminSidebar';
import TableHOC from '../components/admin/TableHOC';
import { useAllProductsQuery } from '../redux/api/productApi';
import { server } from '../redux/store';
import { CustomError } from '../types/apiTypes';
import { UserReducerInitialState } from '../types/reducerTypes';

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[]=[
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
]

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg";

// const arr: Array<DataType>=[
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/products/sajknaskd">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
//   },
// ]


const Products = () => {

  const {user}=useSelector(
    (state: {userReducer: UserReducerInitialState})=>state.userReducer
  )

  const {data,isLoading,isError,error}=useAllProductsQuery(user?._id!);

  if(isError){
    const err=error as CustomError;
    toast.error(err.data.message);
    
  }
  useEffect(()=>{
if(data){
  setRows(
    data.products.map((i)=>({
      photo:  <img src={`${server}/${i.photo}`} />,
      name: i.name,
      price: i.price,
      stock: i.stock,
      action: <Link to={`/admin/products/${i._id}`} >Manage</Link>
    }))
  )
}
  },[data])


  const [rows,setRows]=useState<DataType[]>([]);

  const Table=TableHOC<DataType>(
    columns,
    rows,
    "dashboardProductBox",
    "Products",
    rows.length>6,

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
    <Link to="/admin/products/new" className='createProductButton'>
    <FaPlus/>
    </Link>
  </div>
  )
}

export default Products