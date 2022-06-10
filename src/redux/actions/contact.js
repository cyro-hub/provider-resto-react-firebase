import * as types from '../type';
import store from '../store';
import {collection, query, where, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore'
import {db} from '../../firebase'

const references = collection(db,'contact')

export const addContact=async(contact)=>{
    await addDoc(references,contact)
}

export const getContacts=async()=>{
    let arr = []

    const locations = await getDocs(references);

    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });

    store.dispatch({
        type:types.getContacts,
        payload:arr
    })
}

export const removeContact=async(id)=>{
    await deleteDoc(doc(references,id))
}