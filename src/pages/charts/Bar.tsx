import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart } from "../../components/admin/Charts";
import { useBarQuery } from "../../redux/api/dashboardApi";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/apiTypes";
import { getLastMonths } from "../../utils/features";

const {last12Months,last6Months}=getLastMonths();

const Bar = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, error, isError } = useBarQuery(user?._id!);

  const product = data?.charts.product || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        {isLoading ? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
        ) : (
          <>
            <h1>Bar Charts</h1>
            <section>
              <BarChart
                data1={product}
                data2={users}
                title1="Products"
                title2="Users"
                bgColor1={`hsl(80,90%,83%)`}
                bgColor2={`hsl(20,80%,73%)`}
                labels={last6Months}
              />
              <h2>Top Products and Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data1={orders}
                data2={[]}
                title1="Orders"
                title2=""
                bgColor1={`hsl(180,90%,83%)`}
                bgColor2=""
                labels={last12Months}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Bar;
