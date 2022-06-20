import * as types from '../type'

const initialState = {
    auth:false,
    users:[],
    showRegister:false,
    setNavigateToUser:false
}

const user = (state=initialState,action)=>{
    switch(action.type){
        case types.authenticateUser:
            return{
                ...state,
                auth:true,
                setNavigateToUser:false
            }
        case types.getUsers:
            return{
                ...state,
                users:action.payload
            }
        case types.setShowRegister:
            return{
                ...state,
                showRegister:!state.showRegister
            }
        case types.setNavigateToUser:
            return{
                ...state,
                setNavigateToUser:!state.setNavigateToUser
            }
        default: return{
            ...state
        }
    }
}

export default user;