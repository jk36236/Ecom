import React,{Fragment,useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { clearErrors,updateProduct,getProductDetails } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();

  const {error,product}=useSelector((state)=>state.productDetails);

  const {loading,error:updateError,isUpdated}=useSelector((state)=>state.product);

  const [name,setName]=useState("");
  const [price,setPrice] =useState(0);
  const [description,setDescription]=useState("");
  const [category,setCategory]=useState("");
  const [stock,setStock]=useState(0);
  const [images,setImages]=useState([]);
  const [oldImages,setOldImages]=useState([]);
  const [imagesPreview,setImagesPreview]=useState([]);

  const categories=[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
   ];

   const {id}=useParams();

   useEffect(()=>{
    
    if(product && product._id !== id){
      dispatch(getProductDetails(id));
    }else{
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(updateError){
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if(isUpdated){
      alert.success("Product Updated Successfully");
      navigate('/admin/products');
      dispatch({type:UPDATE_PRODUCT_RESET});
    }
   },[dispatch,alert,error,navigate,isUpdated,id,product,updateError]);


   const updateProductSubmitHandler=(e)=>{
     e.preventDefault();
     const myForm=new FormData();

     myForm.set("name",name);
     myForm.set("price",price);
     myForm.set("description",description);
     myForm.set("category",category);
     myForm.set("stock",stock);

     images.forEach((image)=>{
      myForm.append("images",image);
     }); 
     dispatch(updateProduct(id,myForm));
   }


  const updateProductImagesChange=(e)=>{
    const files=Array.from(e.target.files);//array.from will create a copy of these files

    //empty these because we have all the files
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

   files.forEach((file)=>{
      const reader=new FileReader();

      reader.onload=()=>{
        //images add krne ke liye
        if(reader.readyState === 2){
          setImagesPreview((old)=>[...old, reader.result]);//old data toh rahe lekin ye(reader.result) naya data bhi add ho jaye
          setImages((old)=> [...old,reader.result]);
        }
      }

      reader.readAsDataURL(file);
   });
  };


  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className='dashboard'>
        <Sidebar />
{/* main container */}
        <div className='newProductContainer'>
          <form
           className='createProductForm'
           encType='multipart/form-data'
           onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
            <SpellCheckIcon />
            <input 
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            </div>

            <div>
              <AttachMoneyIcon />
              <input 
               type="number"
               placeholder='Price'
               required
               onChange={(e)=>setPrice(e.target.value)}
               value={price}
              />
            </div>


            <div>
              <DescriptionIcon />
              <textarea 
               placeholder='Product Description'
               value={description}
               onChange={(e)=>setDescription(e.target.value)}
               cols="30"
               rows="1"
              ></textarea>
            </div>


            <div>
              <AccountTreeIcon />
              <select  value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate)=>(
                  <option key={cate} value={cate}>{cate}</option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input 
              type="number"
              placeholder="Stock"
              required
              onChange={(e)=>setStock(e.target.value)}
              value={stock}
              />
            </div>
 
          {/* for choosing file */}
            <div id="createProductFormFile">
              <input 
               type="file"
               name="avatar"
               accept="image/*"
               onChange={updateProductImagesChange}
               multiple
              />
            </div>

            {/* for showing old product images */}
            <div id="createProductFormImage">
            {oldImages && oldImages.map((image,index)=>(
              <img key={index} src={image.url} alt="Old Product Preview" />
            ))}
            </div>
      
            {/* for showing file image */}
            <div id="createProductFormImage">
            {imagesPreview.map((image,index)=>(
              <img key={index} src={image} alt="Product Preview" />
            ))}
            </div>

            <Button
             id="createProductBtn"
             type='submit'
             disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateProduct