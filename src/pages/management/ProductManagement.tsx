import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApi";
import { server } from "../../redux/store";
import { UserReducerInitialState } from "../../types/reducerTypes";
import { responseToast } from "../../utils/features";

const img =
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg";
const ProductManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useProductDetailsQuery(params.id!);

  const [product, setProduct] = useState({
    _id: "",
    name: "",
    photo: "",
    stock: 0,
    category: "",
    price: 0,
  });

  const { price, stock, category, photo, name } = product;

  const [nameUpdate, setNameUpdate] = useState<string>("");
  const [categoryUpdate, setCategoryUpdate] = useState<string>("");
  const [priceUpdate, setPriceUpdate] = useState<number>(0);
  const [stockUpdate, setStockUpdate] = useState<number>(1);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (category) formData.set("category", categoryUpdate);
    if (photoFile) formData.set("photo", photoFile);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/products");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/products");
  };
  console.log(photo);

  useEffect(() => {
    if (data) {
      setProduct(data.product);
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);
  if(isError)return <Navigate to ={"/404"}/>
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        {isLoading ? (
          <>
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </>
        ) : (
          <>
            <section>
              <strong>ID - {product._id}</strong>
              <img src={`${server}/${photo}`} alt="ProductPhoto" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} available</span>
              ) : (
                <span className="red">Not available</span>
              )}
              <h3>₹{price}</h3>
            </section>

            <article>
              <button onClick={deleteHandler} className="deleteBtn">
                <FaTrash />
              </button>
              <form action="" onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Price</label>
                  <input
                    type="number"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="">Stock</label>
                  <input
                    type="number"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="">Category</label>
                  <input
                    type="string"
                    value={categoryUpdate}
                    placeholder="eg. laptops, grocery etc..."
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                {nameUpdate &&
                priceUpdate &&
                stockUpdate &&
                categoryUpdate &&
                photoUpdate ? (
                  <button type="submit">Update</button>
                ) : (
                  <button style={{ marginTop: "2rem" }} type="submit">
                    Update
                  </button>
                )}
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
