import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { DoughNutChart, PieChart } from "../../components/admin/Charts";
import { usePieQuery } from "../../redux/api/dashboardApi";
import { RootState } from "../../redux/store";

const Pie = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = usePieQuery(user?._id!);

  // const charts = data?.charts!;

  const order=data?.charts.orderFulfilment!;
  const categories=data?.charts.productCategories!;
  const stock=data?.charts.stockAvailability!;
  const revenue=data?.charts.revenueDistribution!;
  const ageGroup=data?.charts.userAgeGroup!;
  const adminCustomers=data?.charts.adminCustomers!;


  if (isError) {
    return <Navigate to={"/admin/dashboard"}/>
  }


  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Pie & Doughnut Charts</h1>
        {isLoading ? (
        <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
        ) : (
          <>
          <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[order.processing, order.shipped, order.delivered]}
              backgroundColor={[
                `hsl(180,80%, 80%)`,
                `hsl(180,70%, 50%)`,
                `hsl(180,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fulfillment Ratio</h2>
        </section>

        <section>
          <div>
            <DoughNutChart
              labels={categories.map((i) => Object.keys(i)[0])}
              data={categories.map((i) => Object.values(i)[0])}
              backgroundColor={categories.map(
                (i) => `hsl(${Object.values(i)[0] * 4}, ${Object.values(i)[0]}%, 50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2>Product Categories Ratio</h2>
        </section>

        <section>
          <div>
            <DoughNutChart
              labels={["InStock", "OutStock"]}
              data={[stock.inStock, stock.outStock]}
              backgroundColor={[`hsl(120,80%, 50%)`, `hsl(0,80%, 60%)`]}
              legends={false}
              offset={[0, 40]}
              cutout={"40%"}
            />
          </div>
          <h2>Stock Availability</h2>
        </section>

        <section>
          <div>
            <DoughNutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[revenue.marketingCost, revenue.discount, revenue.burnt, revenue.productionCost, revenue.netMargin]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>

        <section>
          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[ageGroup.teen, ageGroup.adult, ageGroup.old]}
              backgroundColor={[
                `hsl(138, ${80}%, 80%)`,
                `hsl(138, ${70}%, 50%)`,
                `hsl(138, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>

        <section>
          <div>
            <DoughNutChart
              labels={["Admin", "Customers"]}
              data={[adminCustomers.admin, adminCustomers.customer]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 50]}
            />
          </div>
        </section>
        </>
        )}

      </main>
    </div>
  );
};

export default Pie;
