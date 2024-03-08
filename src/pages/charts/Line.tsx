import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { LineChart } from "../../components/admin/Charts";
import { getLastMonths } from "../../utils/features";
import { RootState } from "../../redux/store";
import { useLineQuery } from "../../redux/api/dashboardApi";
import { useSelector } from "react-redux";
import { CustomError } from "../../types/apiTypes";
import toast from "react-hot-toast";

const {last12Months: months}=getLastMonths();

const Line = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, error, isError } = useLineQuery(user?._id!);

  const product = data?.charts.product || [];
  const revenue = data?.charts.revenue || [];
  const users = data?.charts.users || [];
  const discount = data?.charts.discount || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Line Charts</h1>
        {isLoading ? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
        ) : (
          <>
        <section>
          <LineChart
            data={users}
            label="Users"
            backgroundColor={`hsl(189,20%,50%)`}
            borderColor={`hsl(191,80%,80%)`}
            labels={months}
          />
          <h2>Active Users</h2>
        </section>

        <section>
          <LineChart
            data={product}
            label="Products"
            backgroundColor={`hsl(108,20%,50%)`}
            borderColor={`hsl(108,80%,80%)`}
            labels={months}
          />
          <h2>Total Products (SKU)</h2>
        </section>
        <section>
          <LineChart
           data={revenue}
            label="Revenue"
            backgroundColor={`hsl(151,20%,50%)`}
            borderColor={`hsl(214,80%,80%)`}
            labels={months}
          />
          <h2>Total Revenue</h2>
        </section>


        <section>
          <LineChart
            data={revenue}
            label="Users"
            backgroundColor={`hsl(211,20%,50%)`}
            borderColor={`hsl(230,80%,80%)`}
            labels={months}
          />
          <h2>Discount Allotted</h2>
        </section>
        </>
        )}
      </main>
    </div>
  );
};

export default Line;
