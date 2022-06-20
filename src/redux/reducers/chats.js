import * as types from '../type'

const initialState = {
    chatsByUser:[],
    email:JSON.parse(localStorage.getItem('user')).email||'',
    viewChats:false
}

const chats =(state=initialState,action)=>{
    switch(action.type){
        case types.getChatsByUser:
            return{
                ...state,
                chatsByUser:action.payload.arr,
                email:action.payload.email,
                viewChats:true
            } 
        case types.viewChats:
            return{
                ...state,
                viewChats:false
            }     
        default: return{
            ...state
        }
    }
}

export default chats;