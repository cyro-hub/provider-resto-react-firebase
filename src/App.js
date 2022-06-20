import { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Account from './pages/Account';
import Admin from './pages/Admin'
import Home from './pages/Home';
import Chats from './pages/Chats';
import * as locationActions from './redux/actions/location';
import * as contactActions from './redux/actions/contact';
import * as recipeActions from './redux/actions/recipe';
import * as userActions from './redux/actions/user';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

useEffect(()=>{
  const timer = setInterval(()=>{
    //getting recipes
    recipeActions.getPopularRecipes();
    recipeActions.getRecipes();

    // user 
    userActions.authenticateUser()
  },3000)

  return ()=>{
    clearInterval(timer);
  }
},[])

  return (<Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Account/>}/>
      <Route path='/admin' element={<Admin/>}/>
        <Route path='chat' element={<Chats/>}/>
      <Route element={<ProtectedRoute/>}>
      </Route>
    </Routes>
  </Router>);
}

export default App;
