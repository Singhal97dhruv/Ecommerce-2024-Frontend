import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducerTypes";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../redux/store";
const Shipping = () => {

  const {  cartItems,total} =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
    const navigate=useNavigate();
    const dispatch=useDispatch();
      

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler=async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));

    try {
      const {data}= await axios.post(`${server}/api/v1/payment/create`,{amount: total},{headers: {
        "Content-Type": "application/json"
      }})
      navigate("/pay",{
        state: data.clientSecret,
      })
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
      
    }
  }

  useEffect(()=>{
    if(cartItems.length<=0)return navigate("/cart");
  },[cartItems])

  return (
    <div className="shipping">
      <h1>Shipping Address</h1>
      <form onSubmit={submitHandler} action="">
        <input
          type="text"
          required
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          type="text"
          required
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          type="text"
          required
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
          id=""
        >
          <option value="">Choose country</option>
          <option value="India">India</option>
        </select>
        <input
          type="number"
          required
          placeholder="Pincode"
          value={shippingInfo.pinCode}
          name="pinCode"
          onChange={changeHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
