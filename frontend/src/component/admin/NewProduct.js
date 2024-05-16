import React,{Fragment,useState,useEffect} from 'react';
import './NewProduct.css';
import {useSelector,useDispatch} from 'react-redux';
import { clearErrors,createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();

  const {loading,error,success}=useSelector((state)=>state.newProduct);

  const [name,setName]=useState("");
  const [price,setPrice] =useState(0);
  const [description,setDescription]=useState("");
  const [category,setCategory]=useState("");
  const [Stock,setStock]=useState(0);
  const [images,setImages]=useState([]);
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

   useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(success){
      alert.success("Product Created Successfully");
      navigate('/admin/dashboard');
      dispatch({type:NEW_PRODUCT_RESET});
    }
   },[dispatch,alert,error,navigate,success]);


   const createProductSubmitHandler=(e)=>{
     e.preventDefault();
     const myForm=new FormData();

     myForm.set("name",name);
     myForm.set("price",price);
     myForm.set("description",description);
     myForm.set("category",category);
     myForm.set("Stock",Stock);

     images.forEach((image)=>{
      myForm.append("images",image);
     }); 
     dispatch(createProduct(myForm));
   }


  const createProductImagesChange=(e)=>{
    const files=Array.from(e.target.files);//array.from will create a copy of these files

    //empty these because we have all the files
    setImages([]);
    setImagesPreview([]);

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
           onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
              <select onChange={(e)=>setCategory(e.target.value)}>
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
              />
            </div>
 
          {/* for choosing file */}
            <div id="createProductFormFile">
              <input 
               type="file"
               name="avatar"
               accept="image/*"
               onChange={createProductImagesChange}
               multiple
              />
            </div>

            {/* for showing file image */}
            <div id="createProductFormImage">
            {imagesPreview.map((image,index)=>(
              <img key={index} src={image} alt="Avatar Preview" />
            ))}
            </div>

            <Button
             id="createProductBtn"
             type='submit'
             disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default NewProduct