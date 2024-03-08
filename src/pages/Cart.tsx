import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { server } from "../redux/store";
import { CartReducerInitialState } from "../types/reducerTypes";
import { CartItems } from "../types/types";

// const cartItems = [
//   {
//     productId: "adfesf",
//     photo:
//       "https://img.freepik.com/free-photo/creative-light-bulb-abstract-glowing-blue-background-generative-ai_188544-8090.jpg",
//     name: "creative",
//     price: 8000,
//     stock: 80,
//     quantity: 4,
//   },
//   {
//     productId: "adfesf",
//     photo:
//       "https://img.freepik.com/free-photo/creative-light-bulb-abstract-glowing-blue-background-generative-ai_188544-8090.jpg",
//     name: "creative",
//     price: 8000,
//     stock: 80,
//     quantity: 4,
//   },
//   {
//     productId: "adfesf",
//     photo:
//       "https://img.freepik.com/free-photo/creative-light-bulb-abstract-glowing-blue-background-generative-ai_188544-8090.jpg",
//     name: "creative",
//     price: 8000,
//     stock: 80,
//     quantity: 4,
//   },
// ];

// const shippingCharges = 4000;
// const tax = 20;
// const discount = 39;
// const total = 22200;
// const subtotal = 221;

const Cart = () => {
  const { discount, tax, subtotal, shippingCharges, total, cartItems } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementalHandler = (cartItem: CartItems) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error("Stock limit reached");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementalHandler = (cartItem: CartItems) => {
    if (cartItem.quantity <= 1) return removeHandler(cartItem.productId);
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeoutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount/?couponCode=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          setIsValidCouponCode(true);
          dispatch(applyDiscount(res.data.discount));
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(applyDiscount(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeoutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((e, index) => (
            <CartItem
              incrementalHandler={incrementalHandler}
              decrementalHandler={decrementalHandler}
              removeHandler={removeHandler}
              key={index}
              cartItem={e}
            />
          ))
        ) : (
          <h1>No Items in Cart</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p className="green">
          Discount: <em>-₹{discount}</em>
        </p>
        <p style={{ fontWeight: "700" }}>Total: ₹{total}</p>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {isValidCouponCode ? (
          <span className="green">
            ₹{discount} discount applied on the order
          </span>
        ) : (
          <span className="red">
            <VscError /> Invalid Coupon
          </span>
        )}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
