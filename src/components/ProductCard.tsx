import { RxCross2 } from "react-icons/rx";
import { server } from "../redux/store";
import { CartItems } from "../types/types";

interface ProductProps {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItems) => string | undefined;
}

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) => {
  return (
    <div className="productCard">
      <img src={`${server}/${photo}`} alt="" />
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button
          onClick={() =>
            handler({ productId, photo, name, price, stock, quantity: 1 })
          }
        >
          <RxCross2 />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
