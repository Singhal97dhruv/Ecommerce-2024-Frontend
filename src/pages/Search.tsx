import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { CustomError } from "../types/apiTypes";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CartItems } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [page, setPage] = useState<number>(1);

  const {
    data: CategoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const {
    data: searchedData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });
  // console.log(searchedData);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  const isNextPage = page < 4;
  const isPrevPage = page > 1;

  const dispatch=useDispatch();

  const addToCartHandler = (cartItem:CartItems) => {
    if(cartItem.stock<1)return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  
  

  return (
    <div className="productSearchPage">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select
            name=""
            id=""
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="None">None</option>
            <option value="asc">Price (low to high)</option>
            <option value="dsc">Price (high to low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              CategoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {productLoading ? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
        ) : (
          <div className="searchProductList">
            {searchedData?.products &&
              searchedData.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  photo={i.photo}
                  stock={i.stock}
                  handler={addToCartHandler}
                />
              ))}
          </div>
        )}
        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {4}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
