import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  useDeleteOrderMutation,
  useSingleOrderQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import { server } from "../../redux/store";
import { UserReducerInitialState } from "../../types/reducerTypes";
import { Order, OrderItem } from "../../types/types";
import { responseToast } from "../../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    state: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useSingleOrderQuery(params.id!);



  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        {isLoading ? (
          <>
            <div className="loader"></div>
            {/* <div className="loader"></div> */}
            <div className="loader"></div>
          </>
        ) : (
          <>
            <section>
    <h3>Order Items</h3>

              {orderItems.map((i) => (
                <ProductCard
                  key={i._id}
                  name={i.name}
                  photo={`${server}/${i.photo}`}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className="shippingInfoCard">
              <button className="deleteBtn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
              <h5>Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button className="shipping-btn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transactionBar">
    <img src={photo} alt="ProductPhoto" />
    <Link to={`product/${productId}`}>
      <p>{name}</p>
    </Link>

    <span>
      ₹{price} X {quantity}= ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
