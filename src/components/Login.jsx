import React,{useState,useEffect} from 'react'
import * as userActions from '../redux/actions/user';
import * as utils from '../utility/utility';

function Login() {
const [user,setUser]=useState({
    email:'',
    password:''
});
const [warning,setWarning]=useState('');

const handleLogin = (e)=>{
    e.preventDefault();

    userActions.loginUser(user).then(()=>{
        userActions.setNavigateToUser()
    }).catch(err=>{
        setWarning('Unable to register user')
    })
}
useEffect(()=>{
    const timer = setTimeout(()=>{
        setWarning('')
    },4000)
    
    return ()=>clearTimeout(timer);
})

return (
<section className='main scroll'>
  <form className='form' onSubmit={(e)=>handleLogin(e)}>
  <div className='input-div'><h3 className='section-header'>Login</h3></div>

  <div>{warning&&<p className='warning'>{warning}</p>}</div>
  <div className='input-div'>
      <input className='input' autoComplete="off" type="email" name='email' 
      value={user.email} 
      onChange={(e)=>utils.handleChanges(e,user,setUser)} placeholder='Email' id='login-email' required/>
  </div> 
  <div className='input-div'>
      <input className='input' autoComplete="off" type="password" name='password' 
      value={user.password} 
      onChange={(e)=>utils.handleChanges(e,user,setUser)} placeholder='Password' id='login-password' required/>
  </div>

  <div className='input-div'>
  <button type='submit' className='submit account'>Login</button>
  <button className='swap' onClick={userActions.showRegister}>Register</button>
  </div>
</form>
</section>)
}

export default Login