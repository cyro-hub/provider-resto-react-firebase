import * as types from '../type';
import store from '../store';
import { storage } from '../../firebase';
import {collection, query, where, getDocs, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import { ref, deleteObject } from "firebase/storage";
import {db} from '../../firebase'
const references = collection(db,'recipes')

export const getRecipes = async()=>{
    let arr = []

    const locations = await getDocs(references);

    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });

    store.dispatch({
        type:types.getRecipes,
        payload:arr
    })
}

export const getPopularRecipes=async()=>{
    let arr = []

    const q = query(references, where("status", "==", true));

    const locations = await getDocs(q);

    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });

    store.dispatch({
        type:types.getPopularRecipes,
        payload:arr
    })
}

export const addRecipe=async(recipe)=>{
    await addDoc(references,recipe)
}

export const removeRecipe=async(id,image)=>{

const imageRef = ref(storage, image);

await deleteObject(imageRef).then(() => {
    deleteDoc(doc(references,id))
  })
  
}

export const setEditRecipe=async(recipe)=>{
    store.dispatch({
        type:types.setEditRecipe,
        payload:recipe
    })
}

export const editRecipe=async(recipe)=>{
    await updateDoc(doc(references,recipe.id),recipe)
}

export const cancelEdit=()=>{
    store.dispatch({type:types.cancelEdit})
}