import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Checkout from "./components/admin/Checkout.tsx";
import Loader from "./components/admin/Loader.tsx";
import { auth } from "./firebase.ts";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Orders from "./pages/Orders.tsx";
import Search from "./pages/Search.tsx";
import Shipping from "./pages/Shipping.tsx";
import TransactionManagement from "./pages/management/TransactionManagement.tsx";
import { getUser } from "./redux/api/userApi.ts";
import { userExist, userNotExist } from "./redux/reducer/userReducer.ts";
import { UserReducerInitialState } from "./types/reducerTypes.ts";

const Cart = lazy(() => import("./pages/Cart.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const Customers = lazy(() => import("./pages/Customers.tsx"));
const Transaction = lazy(() => import("./pages/Transaction.tsx"));
const Bar = lazy(() => import("./pages/charts/Bar.tsx"));
const Line = lazy(() => import("./pages/charts/Line.tsx"));
const Pie = lazy(() => import("./pages/charts/Pie"));
const Stopwatch = lazy(() => import("./pages/apps/Stopwatch.tsx"));
const Toss = lazy(() => import("./pages/apps/Toss.tsx"));
const Coupon = lazy(() => import("./pages/apps/Coupon.tsx"));
const NewProduct = lazy(() => import("./pages/management/NewProduct.tsx"));
const ProductManagement = lazy(
  () => import("./pages/management/ProductManagement.tsx")
);

function App() {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/orders" element={<Orders />} />

          {/* NOT LOGGED IN  */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* LOGGED IN ROUTES  */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>

          {/* ADMIN Routes  */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />

            <Route path="/admin/line" element={<Line />} />
            <Route path="/admin/bar" element={<Bar />} />
            <Route path="/admin/pie" element={<Pie />} />

            <Route path="/admin/toss" element={<Toss />} />
            <Route path="/admin/coupon" element={<Coupon />} />
            <Route path="/admin/stopwatch" element={<Stopwatch />} />

            {/* Management Routes */}
            <Route path="/admin/products/new" element={<NewProduct />} />
            <Route path="/admin/products/:id" element={<ProductManagement />} />
            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
