import { FaShoppingBag } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";

// const swiper = new Swiper();


const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  
  const dispatch=useDispatch();

  const addToCartHandler = (cartItem:CartItems) => {
    if(cartItem.stock<1)return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  
  
  // const Product = {
    //   productId: "anandk",
    //   name: "Colors",
    //   price: 4552,
    //   stock: 58,
    //   photo:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPK9fwODbF9xOLs1ZYGSAK0ErikcgBYIuk_A&usqp=CAU",
    // };
if(isError) toast.error("Can't fetch products at this time")

  return (
    <div className="container">
      <div className="posterContainer">
        <div className="homePageContent">
          <h1>Buy Whatever You Need</h1>
          <h4>
            We have a wide variety of products in various categories. A one stop
            destionation for all your needs.
          </h4>
          <button>
            Shop Now <FaShoppingBag />{" "}
          </button>
        </div>
        <div className="homePagePhoto">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className="swiperImages"
                src="https://i0.wp.com/www.ritzmagazine.in/wp-content/uploads/2019/10/MS-Dhoni-5.jpg?fit=696%2C696&ssl=1"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="swiperImages"
                src="https://i0.wp.com/www.ritzmagazine.in/wp-content/uploads/2019/10/MS-Dhoni-5.jpg?fit=696%2C696&ssl=1"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="swiperImages"
                src="https://i0.wp.com/www.ritzmagazine.in/wp-content/uploads/2019/10/MS-Dhoni-5.jpg?fit=696%2C696&ssl=1"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="swiperImages"
                src="https://i0.wp.com/www.ritzmagazine.in/wp-content/uploads/2019/10/MS-Dhoni-5.jpg?fit=696%2C696&ssl=1"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="homeContents">
        <h2>
          Latest Products
          <Link className="findMore" to={"/search"}>
            More
          </Link>
        </h2>
        <div className="products">
          {isLoading? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
          ): (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              photo={i.photo}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
