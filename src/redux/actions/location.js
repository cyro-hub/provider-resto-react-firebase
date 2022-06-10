import * as types from '../type';
import store from '../store';
import {collection, query, where, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore'
import {db} from '../../firebase'
const references = collection(db,'location')

export const getTowns=async(region)=>{
    let arr = []

    const q = query(references, where("region", "==", region));

    const locations = await getDocs(q);

    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });

    store.dispatch({
        type:types.getTowns,
        payload:arr
    })
}


export const getLocations=async()=>{
    let arr = []

    const locations = await getDocs(references);

    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });

    store.dispatch({
        type:types.getLocations,
        payload:arr
    })
}

export const addLocation =async(location)=>{
    await addDoc(references,location)
}

export const removeLocation=async(id)=>{
    const dle = await deleteDoc(doc(references,id))
console.log(dle);
}
