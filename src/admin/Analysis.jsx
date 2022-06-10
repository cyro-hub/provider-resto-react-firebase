import React,{useState} from 'react'
import {useSelector} from 'react-redux';
import EditRecipe from './Analysis/EditRecipe';
import Recipes from './Analysis/Recipes';
import './css/analysis.scss'
// import MinMaxOrder from './Analysis/MinMaxOrder';


function Analysis() {
const isRecipeEdit = useSelector(state=>state.recipe.isRecipeEdit)

return (<section className='admin'>
{/* <MinMaxOrder/> */}
{isRecipeEdit?<EditRecipe/>:<Recipes/>}
</section>)
return <></>
}

export default Analysis