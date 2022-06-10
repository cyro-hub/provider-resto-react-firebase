import React from 'react';
import {useSelector} from 'react-redux';
import * as recipeActions from '../../redux/actions/recipe'


function Recipes() {
const recipes = useSelector(state=>state.recipe.recipes);


const handleEditRecipe=(recipe)=>{
   recipeActions.setEditRecipe(recipe);
}

const handleRemoveRecipe=(id,name)=>{
   recipeActions.removeRecipe(id,name);
}

return (
<div className='recipe_table'>
<h3>Recipes</h3>
<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th className='action'>From</th>
          <th className='action'>Delivery</th>
          <th className='action'>Status</th>
          <th className='actions'>action</th>
        </tr>
      </thead>
      <tbody className='scroll'>
        {
          recipes?.map(recipe=><tr key={recipe.id}>
            <td>{recipe.name}</td>
            <td>{recipe.price}</td>
            <td className='action'>{recipe.from}</td>
            <td className='action'>{recipe.delivery?'yes':'no'}</td>
            <td className='action'>{recipe.status?'high':'low'}</td>
            <td className='actions'>
              <button onClick={()=>handleEditRecipe(recipe)} className='btn_edit'>Edit</button>
              <button onClick={()=>handleRemoveRecipe(recipe.id,recipe.name)} className='btn_remove'>remove</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
</div>
  )

}

export default Recipes