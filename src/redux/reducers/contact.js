 import * as actionTypes from '../type';


const contact =(state={contacts:[],contact:{}},action)=>{
switch(action.type){
    case actionTypes.getContacts:
        return{
            ...state,
            contacts:action.payload
        }
    default:
        return{
        ...state,
        }
}
}

export default contact;