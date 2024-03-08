import React, { ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Column } from "react-table";
import { FaTrash } from "react-icons/fa";
import TableHOC from "../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAllUsersQuery, useDeleteUserMutation } from "../redux/api/userApi";
import { CustomError } from "../types/apiTypes";
import toast from "react-hot-toast";
import { responseToast } from "../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  gender: string;
  email: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

// const img1 = "https://pixlr.com/images/index/ai-image-generator-one.webp";
// const img2 =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8YoHYh5xcpty9L75KEvzKrWFaxUZxO8WYZ_VsepjRJmBhgRwkPNEE2VurlIFU_a1hf5E&usqp=CAU";

// const arr: Array<DataType> = [
//   {
//     avatar: <img src={img1} alt="" />,
//     name: "Steve Fleming",
//     gender: "female",
//     email: "stevefleming@gmail.com",
//     role: "user",
//     action: (
//       <button>
//         <FaTrash />
//       </button>
//     ),
//   },
//   {
//     avatar: <img src={img2} alt="" />,
//     name: "Stevie Chameli",
//     gender: "female",
//     email: "chamelifleming@gmail.com",
//     role: "user",
//     action: (
//       <button>
//         <FaTrash />
//       </button>
//     ),
//   },
// ];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isError, isLoading, data, error } = useAllUsersQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          avatar: <img src={i.photo} alt={i.name} />,
          name: i.name,
          gender: i.gender,
          email: i.email,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboardProductBox",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        {" "}
        {isLoading ? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
        ) : (
          Table
        )}
      </main>
    </div>
  );
};

export default Customers;
