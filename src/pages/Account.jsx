import { useSelector } from 'react-redux';
import Register from '../components/Register';
import Login from '../components/Login';
import Nav from '../components/Nav'
import Home from './Home'

function Account() {
const showRegister = useSelector(state=>state.user.showRegister);
const setNavigateToUser = useSelector(state=>state.user.setNavigateToUser);

  return<>
  {
    setNavigateToUser?<Home/>:<><Nav/>{showRegister?<Register/>:<Login/>}</>
  }</>
}


export default Account