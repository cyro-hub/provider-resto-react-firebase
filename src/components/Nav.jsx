// import React,{useState,useEffect} from 'react'
import {BiUser,BiMessageRoundedDots} from 'react-icons/bi'
import {RiShoppingCart2Line} from 'react-icons/ri';
import {AiOutlineHome,AiFillSetting} from 'react-icons/ai'
import '../css/nav.scss'
import {Link} from 'react-router-dom'
// import {useSelector} from 'react-redux';

function Nav() {
// const cart = useSelector(state=>state.cart.cart.length)
// const newMessages = useSelector(state=>state.chat.newMessages);

  return (<section className='nav'>
  <div className='nav-list'>
      <Link to='/' className='nav-item'><AiOutlineHome size='30' className='nav-icon'/></Link>
      <Link to='/cart' className='nav-item'><RiShoppingCart2Line size='30' className='nav-icon'/>
  <span className='nav-tooltip'>{}</span>
    </Link>
      <Link to='/chat' className='nav-item'><BiMessageRoundedDots size='30' className='nav-icon'/>
    <span className='nav-tooltip'>{}</span>
    </Link>
    <Link to='/login' className='nav-item'><BiUser size='30' className='nav-icon'/></Link>
    <Link to='/admin' className='nav-item'><AiFillSetting size='30' className='nav-icon'/></Link>
  </div></section>)
}

export default Nav