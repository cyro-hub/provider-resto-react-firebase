import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import * as utils from '../utility/utility'
import {MdLocationOn,MdSend} from 'react-icons/md'
import {AiFillHome,AiFillContacts} from 'react-icons/ai'
import * as chatActions from '../redux/actions/chats'
import { Receiver,Sender } from '../components/Message';
import { useSelector } from 'react-redux';
import '../pages_css/chats.scss'
import style from 'styled-components'

function CheckChat() {
let email = useSelector(state=>state.chat.email)
const [message,setMessage]=useState({
  email:email||"",
  role:'admin',
  message:'',
  location:null,
  date:(new Date()).toUTCString()
});
const [search,setSearch]=useState('');
const viewChats = useSelector(state=>state.chat.viewChats)
const users = useSelector(state => state.user.users)
const chats = useSelector(state=>state.chat.chatsByUser)

const handleSend=async()=>{
  for(const key in message){
    if(message[key]===''){
    return 
    }
  }
  chatActions.sendMessage(message).then(()=>{
    setMessage({...message,
      message:'',
      location:null})
  }).catch(err=>{
    console.log(err.message)
  })
}
    
const handleLocation=async()=>{
  if(navigator.geolocation){
    return await navigator.geolocation.getCurrentPosition((position=>{
      setMessage({...message,location:{lat:position.coords.latitude,lon:position.coords.longitude}})
    }))
  }
}

useEffect(()=>{
  const timer = setInterval(()=>{
    chatActions.getChatsByUser(email)
  },5000)

  return ()=>clearInterval(timer)
})

    return (<section className='chat scroll'>
{
  viewChats?<>
      <div className='chat-head'>
    <Link to='/'><AiFillHome size='28'/></Link>
    <input type="search" name='search' className='search-chats' placeholder='Search' autoComplete='off' onChange={(e)=>setSearch(e.target.value)} value={search}/>
    <Link to=''><AiFillContacts size='28' onClick={()=>{
      chatActions.viewChats();
    }}/></Link>
    </div>
        <div className='message-body scroll'>
          {
            chats.map((message)=>(<React.Fragment key={message.id}>
            {
              message.role==='user'?<Receiver messageContent={message}/>:<Sender messageContent={message}/>
            }
            </React.Fragment>))
          }
          
        </div>
        <div className='message-send'>
        <MdLocationOn onClick={()=>handleLocation()} className='send-icon' size='25'/>
        <input type="text" name='message' id='message'
               value={message.message} autoComplete="off"
               onChange={e=>utils.handleChanges(e,message,setMessage)} 
               className='message-input' 
               placeholder='type a message'
               onKeyDown={(e)=>{
                if(e.keyCode === 13){
                  handleSend()
                }
              }}/>
        <MdSend onClick={()=>handleSend()} className='send-icon' size='25'/>
      </div></>:<Names users = {users}/>
}
    </section>)
}

export default CheckChat

const Names = ({users})=>{
  let email = useSelector(state=>state.chat.email)
  const [search,setSearch]=useState('');

  return(
  <>
  <div className='chat-head'>
    <Link to='/'><AiFillHome size='28'/></Link>
    <input type="search" name='search' className='search-chats' placeholder='Search' autoComplete='off' onChange={(e)=>setSearch(e.target.value)} value={search}/>
    <Link to=''>
    <AiFillContacts size='28' onClick={()=>{
      chatActions.viewChats();
    }}/>
    </Link>
  </div>
  <UserNames className='names scroll'>
    {
      users.map((user,i)=><div key={user.id} onClick={()=>{
        chatActions.getChatsByUser(user.details.email)
      }}>{user.details.email}</div>)
    }
  </UserNames></>)
}


const UserNames = style.div`
margin:0.5rem;
`