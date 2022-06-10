import { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Account from './pages/Account';
import Admin from './pages/Admin'
import Home from './pages/Home';
import * as locationActions from './redux/actions/location';
import * as contactActions from './redux/actions/contact';
import * as recipeActions from './redux/actions/recipe';


function App() {
useEffect(()=>{
  const timer = setInterval(()=>{
    // getting all the available location 
    locationActions.getLocations()

    // getting all the available contact
    contactActions.getContacts()
    
    //getting recipes
    recipeActions.getPopularRecipes();
    recipeActions.getRecipes();
  },5000)

  return ()=>{
    clearInterval(timer);
  }
})

  return (<Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Account/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
  </Router>);
}

export default App;
