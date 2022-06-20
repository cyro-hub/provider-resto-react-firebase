import React,{useState,useEffect} from 'react'
import {AiOutlineAppstoreAdd,AiOutlineContacts,AiOutlineHome} from 'react-icons/ai'
import {BsCardChecklist} from 'react-icons/bs'
import {BiMessageRoundedDetail} from 'react-icons/bi'
import {FaUsersCog} from 'react-icons/fa';
import {SiSimpleanalytics} from 'react-icons/si'
import {MdLocationPin} from 'react-icons/md'
import AddRecipe from '../admin/AddRecipe'
import Analysis from '../admin/Analysis'
import CheckChat from '../admin/CheckChat'
import CheckContact from '../admin/CheckContact'
import CheckUsers from '../admin/CheckUsers'
import CheckOrders from '../admin/CheckOrders'
import '../css/admin.scss'
import {Link} from 'react-router-dom';
import AddLocation from '../admin/AddLocation';
import * as userActions from '../redux/actions/user'

function Admin() {
const [show,setShow]=useState('analysis')

useEffect(()=>{
  const timer = setInterval(()=>{
    userActions.getAllUsers()
  },5000)

  return ()=>clearInterval(timer)
},[])


  return (<div className='admin-main scroll'>
  <section className='admin-nav scroll'>
    <div>
        <Link to='/' className='admin-nav-item'><AiOutlineHome size='23'/></Link>
        <span className='admin-nav-item' onClick={()=>setShow('analysis')}><SiSimpleanalytics size='23'/></span>
        <span className='admin-nav-item' onClick={()=>setShow('addRecipe')}><AiOutlineAppstoreAdd size='23'/></span>
        <span className='admin-nav-item' onClick={()=>setShow('checkUsers')}><FaUsersCog size='23'/></span>
        <span className='admin-nav-item' onClick={()=>setShow('checkOrders')}><BsCardChecklist size='23'/></span>
        <span className='admin-nav-item' onClick={()=>setShow('checkChat')}><BiMessageRoundedDetail size='23'/></span>
        <span className='admin-nav-item' onClick={()=>setShow('checkContact')}><AiOutlineContacts size='23'/></span>
        <span className='admin-nav-item' onClick={()=>setShow('addlocation')}><MdLocationPin size='23'/></span>
    </div>
  </section>
  <section className='admin-body'>
    {show==='addRecipe'&&<AddRecipe className='m-auto'/>}
    {show==='analysis'&&<Analysis className='m-auto'/>}
    {show==='checkChat'&&<CheckChat className='m-auto'/>}
    {show==='checkContact'&&<CheckContact className='m-auto'/>}
    {show==='checkUsers'&&<CheckUsers className='m-auto'/>}
    {show==='checkOrders'&&<CheckOrders className='m-auto'/>}
    {show==='addlocation'&&<AddLocation className='m-auto'/>}
  </section>
  </div>)
}

export default Admin