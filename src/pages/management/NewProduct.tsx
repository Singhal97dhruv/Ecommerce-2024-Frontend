import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../redux/api/productApi";
import { UserReducerInitialState } from "../../types/reducerTypes";
import { responseToast } from "../../utils/features";

const NewProduct = () => {

  const {user,loading}=useSelector(
    (state: {userReducer:UserReducerInitialState})=>state.userReducer
  )

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photo, setPhoto] = useState<File>();
  const [photoPrev, setPhotoPrev] = useState<string>("");

  const [newProduct]=useNewProductMutation();
  const navigate=useNavigate();

  const changeImageHandler=(e: ChangeEvent<HTMLInputElement>)=>{
    const file: File|undefined=e.target.files?.[0];
    const reader: FileReader=new FileReader();

    if(file){
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            if(typeof reader.result==="string"){
                setPhotoPrev(reader.result);
                setPhoto(file);
            }
        }
    }
  }

  const submitHandler=async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!name || !price || !photo || stock<0 || !category)return;

    const formData=new FormData();
    formData.set("name",name);
    formData.set("price",price.toString());
    formData.set("stock",stock.toString());
    formData.set("photo",photo);
    formData.set("category",category);

    const res= await newProduct({id:user?._id!,formData});
    responseToast(res,navigate,"/admin/products");
  }

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="">Category</label>
              <input
                type="string"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Photo</label>
              <input
                type="file"
                onChange={changeImageHandler}
              />


            </div>
           
           {photoPrev && <img src={photoPrev} alt="New Image" />}
           {
            name && price && stock && category && photo?
            <button type="submit">Create</button>:<div></div>
           }

          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
