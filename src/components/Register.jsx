import React,{useEffect, useState} from 'react'
import {regions} from "../data"
import * as userActions from '../redux/actions/user';
import * as utils from '../utility/utility';

function Register() {

const [user,setUser]=useState({
    name:'',
    email:'',
    password:'',
    cPassword:'',
    tel:'',
    location:regions[0]
});
const [warning,setWarning]=useState('');

const handleRegister=(e)=>{
    e.preventDefault();
    // localStorage.setItem('cart',JSON.stringify([]))
    if(!user.password.match(passwordPattern)){
        setWarning('Password must contain atleast 8 letter or numbers')
        return;
    }
    if(!user.tel.match(numberPattern)){
        setWarning('Phone number is incorrect')
        return;
    }
    for(const key in user){
        if(user[key]===''){
          setWarning(`${key} is empty`)
        }
    }

    // performing the registration
    userActions.registerUser(user).then(()=>{
        userActions.setNavigateToUser()
    }).catch(err=>{
        setWarning('Unable to register usesr')
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
  <form className='form' onSubmit={(e)=>handleRegister(e)}>
  <div className='input-div'><h3 className='section-header'>Register</h3></div>
  <div>{warning&&<p className='warning'>{warning}</p>}</div>
  <div className='input-div'>
      <input className='input' autoComplete="off" type="text" name='name' 
      value={user.name} 
      onChange={(e)=>utils.handleChanges(e,user,setUser)} placeholder='Name'/>
  </div>
  <div className='input-div'>
      <input className='input' autoComplete="off" type="email" name='email' 
      value={user.email} 
      onChange={(e)=>utils.handleChanges(e,user,setUser)} placeholder='Email'/>
  </div> 
  <div className='input-div'>
      <input className='input' autoComplete="off" type="password" name='password' 
      value={user.password} 
      onChange={(e)=>utils.handleChanges(e,user,setUser)} placeholder='Password'/>
  </div>
  <div className='input-div'>
      <input className='input' autoComplete="off" type="password" name='cPassword' 
      value={user.cPassword} 
      onChange={(e)=>utils.handleChanges(e,user,setUser)} placeholder='Confirm password'/>
  </div>
  <div className='input-div'>
      <input className='input' autoComplete="off" type="text" name='tel' 
      value={user.tel} 
      onChange={(e)=>utils.handleChanges(e,user,setUser)} placeholder='Phone'/>
  </div>
  <div className='input-div'>
      <select className='input' autoComplete="off" name='location' 
      onChange={(e)=>utils.handleChanges(e,user,setUser)}>
          {
           regions?.map((region,i)=><option className='option' key={i} value={region}>{region}</option>)
          }
      </select>
  </div>
  <div className='input-div'>
  <button type='submit' className='submit account'>Register</button>
  <button className='swap' onClick={userActions.showRegister}>Login</button>
  </div>    
</form>
</section>)
}

var numberPattern = new RegExp("^((62)|(67)|(66)|(65))[0-9]{7}$");
var passwordPattern = new RegExp('^[0-9A-Za-z]{8,}$');

export default Register