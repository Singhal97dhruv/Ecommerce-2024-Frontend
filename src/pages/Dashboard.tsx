import { BiMaleFemale } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import AdminSidebar from "../components/admin/AdminSidebar";
import { BarChart, DoughNutChart } from "../components/admin/Charts";
import Widgets from "../components/admin/Widgets";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Table from "../components/admin/DashboardTable";
import { useStatsQuery } from "../redux/api/dashboardApi";
import { RootState } from "../redux/store";
import { getLastMonths } from "../utils/features";
const img =
  "https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg";

  const {last6Months}=getLastMonths();

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = useStatsQuery(user?._id!);

  const stats = data?.stats!;

  if (isError) {
    return <Navigate to={"/"}/>
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        {isLoading ? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
        ) : (
          <>
            <div className="bar">
              <FaSearch />
              <input type="text" placeholder="Search for a product..." />
              <IoMdNotifications />
              <img src={user?.photo || img} alt="" />
            </div>
            <section className="widgetContainer">
              <Widgets
                percent={stats.revenueChangePercent}
                amount={true}
                value={stats.count.revenue}
                heading="Revenue"
                color="rgb(0,115,115)"
              />
              <Widgets
                percent={stats.userChangePercent}
                amount={false}
                value={stats.count.user}
                heading="Users"
                color="rgb(230, 18, 50)"
              />
              <Widgets
                percent={stats.orderChangePercent}
                value={stats.count.order}
                heading="Transactions"
                color="rgb(139, 9, 145)"
              />
              <Widgets
                percent={stats.productChangePercent}
                value={stats.count.product}
                heading="Products"
                color="rgb(76 0 255)"
              />
            </section>
            <section className="graphContainer">
              <div className="revenueGraph">
                <h2>Revenue Graph</h2>
                <BarChart
                  labels={last6Months}
                  data1={stats.chart.orderMonthlyRevenue}
                  data2={stats.chart.orderMonthCounts}
                  title1="Revenue"
                  title2="Transaction"
                  bgColor1="rgb(158, 12, 166)"
                  bgColor2="rgb(130, 9, 96)"
                />
              </div>
              <div className="inventoryInfo">
                <h2>Inventory Info</h2>
                <div>
                  {stats.categoryCount.map((e) => {
                    const [heading, value] = Object.entries(e)[0];
                    return (
                      <CategoryItem
                        key={heading}
                        color={`hsl(${value * 3},${value * 3}%,60%)`}
                        value={value}
                        heading={heading}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="transactionContainer">
              <div className="genderChart">
                <h2>Gender Ratio</h2>
                <DoughNutChart
                  labels={["Male", "Female"]}
                  data={[stats.userRatio.male, stats.userRatio.female]}
                  backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                />
                <p>
                  <BiMaleFemale />
                </p>
              </div>
              <Table data={stats.latestTxn} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="categoryItem">
    <h5>{heading}</h5>
    <div>
      <div style={{ backgroundColor: color, width: `${value}%` }}></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
