import * as actionTypes from '../type'

const recipeReducer =(state={recipes:[],popularRecipes:[],isRecipeEdit:false},action)=>{
    switch(action.type){
        case actionTypes.getRecipes:
            return{
                ...state,
                recipes:action.payload
            }
        case actionTypes.getPopularRecipes:
            return{
                ...state,
                popularRecipes:action.payload
            }
        case actionTypes.setEditRecipe:
            return{
                ...state,
                isRecipeEdit:true,
                toBeEdited:action.payload
            }
        case actionTypes.cancelEdit:
            return{
                ...state,
                isRecipeEdit:false
            }
        default: return {
            ...state
        }
    }
} 


export default recipeReducer