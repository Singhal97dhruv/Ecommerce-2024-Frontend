import { IconType } from "react-icons";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaShoppingBag, FaStopwatch } from "react-icons/fa";
import { MdPeople, MdSpaceDashboard } from "react-icons/md";
import { RiCoinFill, RiCoupon2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";


const AdminSidebar = () => {
  return (
   <aside>
    <h2>Logo</h2>
    <DivOne location={location}/>
    <DivTwo location={location}/>
    <DivThree location={location}/>
   </aside>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      <Li url="/admin/dashboard" location={location} Icon={MdSpaceDashboard} text="Dashboard" />
      <Li url="/admin/products" location={location} Icon={FaShoppingBag} text="Products" />
      <Li url="/admin/customers" location={location} Icon={MdPeople} text="Customers" />
      <Li url="/admin/transaction" location={location} Icon={AiOutlineTransaction} text="Transaction" />
    </ul>
  </div>
);
const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <h5>Charts</h5>
    <ul>
      <Li url="/admin/bar" location={location} Icon={FaChartBar} text="Bar" />
      <Li url="/admin/pie" location={location} Icon={FaChartPie} text="Pie" />
      <Li url="/admin/line" location={location} Icon={FaChartLine} text="Line" />
    </ul>
  </div>
);
const DivThree = ({ location }: { location: Location }) => (
  <div>
    <h5>Apps</h5>
    <ul>
      <Li url="/admin/stopwatch" location={location} Icon={FaStopwatch} text="Stopwatch" />
      <Li url="/admin/toss" location={location} Icon={RiCoinFill} text="Toss" />
      <Li url="/admin/coupon" location={location} Icon={RiCoupon2Fill} text="Coupon" />
    </ul>
  </div>
);
interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}

const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url) ? "yellow" : "",
    }}
  >
    <Link
      to={url}
      style={{ color: location.pathname.includes(url) ? "orangered" : "" }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
