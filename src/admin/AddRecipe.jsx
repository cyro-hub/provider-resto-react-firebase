import React,{useState,useEffect} from 'react'
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux';
import {regions} from '../data'
import * as recipeActions from '../redux/actions/recipe'
import '../css/form.scss'

function AddRecipe() {
const [recipe,setRecipe]=useState({
  name:'',
  price:'',
  from:'no-location',
  delivery:false,
  status:false,
  des:''
})
const [image,setImage]=useState(null)
const [warning,setWarning]=useState('');
const [success,setSuccess]=useState('');
const [imageSelected,setImageSelected]=useState(false);

const handleChanges=(e)=>{
  if(e.target.checked){
    setRecipe({...recipe,[e.target.name]:e.target.checked})
    return;
  }
  if(e.target.name === 'image'){
      setImage(e.target.files[0])
      setImageSelected(true);
      return;
  }
  setRecipe({...recipe,[e.target.name]:e.target.value})
}

const handleSubmit=async(url,imageName)=>{
  const newRecipe = {...recipe,imageUrl:url,imageName:imageName}
  // check for empty fields 
  for(const key in newRecipe){
    if(recipe[key]===''){
      setWarning(`${key} is empty`)
      return;
    }
  }
  recipeActions.addRecipe(newRecipe)
  setRecipe({
    name:'',
    price:'',
    location:'no-location',
    delivery:true,
    status:true,
    des:''
  })
  setImageSelected(false);
}

// submitting image to firestorage
const submitImage=async(e)=>{
  e.preventDefault();

  if(image===null){
    setWarning('insert an image')
    return;
  }
//   actions.isUploading();
  const imageName = (new Date()).toUTCString();
  const imageRef = ref(storage, imageName);
    await uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            if(url){
              handleSubmit(url,imageName)
            }
          })
          .catch((error) => {
            setWarning('Unable to upload image')
          });
      })
      .catch((error) => {
        setWarning('Unable to upload image')
      });
}

useEffect(()=>{
  const timer = setTimeout(()=>{
      setWarning('')
      setSuccess('')
  },4000)
  return ()=>clearTimeout(timer)
})

  return (<>{
    <form onSubmit={(e)=>submitImage(e)} className='form'>
      <div className='input-div'>
        <h3>Add Recipe</h3>
      </div>
      <div>
        {warning&&<p className='warning'>{warning}</p>}
      </div>
      <div>{success&&<p className='success'>{success}</p>}</div>
      <div className='input-div'>
        <input type="text" className='input' autoComplete="off" name='name' id='name' placeholder='Name' value={recipe.name} onChange={(e)=>handleChanges(e)}/>
      </div>
      <div className='input-div'>
        <label htmlFor="image" className='submit contact'>
          {imageSelected?<img className='selected-image' src={URL.createObjectURL(image)} alt='selected img'/>:'Select an Image'}
          <input type="file"  className='input' autoComplete="off" name='image' id='image' onChange={(e)=>handleChanges(e)} style={{display:'none'}} accept={'.jpeg,.png,.jpg,.gif'} />
        </label>
      </div>
      <div className='input-div'>
        <input type="number" placeholder='Price' name='price' step='.00' className='input' autoComplete="off" id='price' onChange={(e)=>handleChanges(e)} value={recipe.price}/>
      </div>
      <div className='input-div'>
        <select name="from" className='input' onChange={(e)=>handleChanges(e)} id="country">
          <option value="">Select location</option>
        {
          regions?.map((region,i)=><option className='option' key={i} value={region}>{region}</option>)
        }
        </select>
      </div>
      <div className='input-div check'>
        <label htmlFor="delivery" className='add-recipe-label'>Delivery</label>
        <input type="checkbox" className='add-recipe-checkbox'  name='delivery' id='delivery' onChange={(e)=>handleChanges(e)}/>
      </div>
      <div className='input-div check'>
        <label htmlFor="status" className='add-recipe-label'>Status</label>
        <input type="checkbox"  className='add-recipe-checkbox' name='status' id='status' onChange={(e)=>handleChanges(e)} />
      </div>
      <div className='input-div'>
        <textarea  className='input-textarea' name="des" autoComplete="off" id="des" placeholder='Description' cols="30" rows="6" onChange={(e)=>handleChanges(e)} value={recipe.des}></textarea>
      </div>
      <div className='input-div'>
        <button type='submit' className='submit contact'>Add Recipe</button>
      </div>
    </form>}
  </>)

}

export default AddRecipe