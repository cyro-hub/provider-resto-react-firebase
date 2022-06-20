import * as types from '../type';
import store from '../store';
import {collection, query, where, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore'
import {db,auth} from '../../firebase'
import { createUserWithEmailAndPassword ,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         deleteUser} from "firebase/auth";
import user from '../reducers/user';

const references = collection(db,'users')

export const registerUser=async(user)=>{
    return await createUserWithEmailAndPassword(auth, user.email, user.password).then(userCredentials=>{
        const newUser = {...user,password:'',cPassword:''}
        addDoc(references,{user:JSON.stringify(userCredentials.user),details:newUser})
        localStorage.setItem('user',JSON.stringify(userCredentials.user))

        store.dispatch({
            type:types.authenticateUser
        })
    })
}

export const loginUser=async(user)=>{
    return await signInWithEmailAndPassword(auth, user.email, user.password)
        .then(userCredentials=>{
            localStorage.setItem('user',JSON.stringify(userCredentials.user))

            store.dispatch({
                type:types.authenticateUser
            })
        })
}

export const authenticateUser =async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    return await onAuthStateChanged(auth, (user) => {
        if(user){
            store.dispatch({
                type:types.authenticateUser
            })
        }
    })
}

export const showRegister=()=>{
    store.dispatch({type:types.setShowRegister})
}

export const setNavigateToUser=()=>{
    store.dispatch({type:types.setNavigateToUser})
}

export const getAllUsers=async()=>{
    let arr = []

    const locations = await getDocs(references);

    locations.forEach((doc) => {
      arr.push({...doc.data(),id:doc.id});
    });

    store.dispatch({
        type:types.getUsers,
        payload:arr
    })
}

// export const deleteAUser=async(id,user)=>{
//     await deleteDoc(doc(references,id)).then(()=>{
//         deleteUser(user).then(() => {
//             console.log('success');
//           }).catch((error) => {
//             console.log(error)
//           });
//     })
// }