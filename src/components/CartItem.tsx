import { FaTrash } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItems } from "../types/types";

type CartItemProps = {
  cartItem: CartItems;
  incrementalHandler: (cartItem: CartItems)=>void;
  decrementalHandler: (cartItem: CartItems)=>void;
  removeHandler: (id: string)=>void;
};

const CartItem = ({ cartItem,incrementalHandler,decrementalHandler,removeHandler }: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="cartItem">
      <img src={`${server}/${photo}`} alt="" />
      <div className="content">
        <p>{name}</p>
        <h4>₹{price}</h4>
      </div>
      <div className="quantitySetter">
        <button onClick={()=>decrementalHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={()=>incrementalHandler(cartItem)}>+</button>
      <button className="trash">
        <FaTrash onClick={()=>removeHandler(productId)} />
      </button>
      </div>
    </div>
  );
};

export default CartItem;
