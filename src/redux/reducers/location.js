import * as actionTypes from '../type'

const initialState = {
    towns:[],
    locations:[],
    success:''
}

const location =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.getTowns:
            return{
                ...state,
                towns:action.payload
            }
        case actionTypes.getLocations:
            return{
                ...state,
                locations:action.payload
            }
        default: return{
            ...state
        }
    }

}

export default location;