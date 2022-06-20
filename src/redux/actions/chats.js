import * as types from '../type';
import store from '../store'
import {collection, query, where, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore'
import {db} from '../../firebase'

const references = collection(db,'chats')

export const sendMessage =async(message)=>{
    await addDoc(references,message)
}

export const getChatsByUser=async(email)=>{
    let arr = []
    console.log(email)

    const q = query(references, where("email", "==", email));

    const locations = await getDocs(q);

    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });

    store.dispatch({
        type:types.getChatsByUser,
        payload:{arr:arr,email:email}
    })
}

export const viewChats=()=>{
    store.dispatch({
        type:types.viewChats
    })
}