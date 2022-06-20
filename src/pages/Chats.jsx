import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import {MdLocationOn,MdSend} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai';
import { Receiver,Sender } from '../components/Message';
import * as utils from '../utility/utility'
import '../pages_css/chats.scss'
import * as chatActions from '../redux/actions/chats'

function Chats() {
const [search,setSearch] = useState('');
const [isSending,setIsSending]=useState(false);
const chats = useSelector(state=>state.chat.chatsByUser)
const email = useSelector(state=>state.chat.email);
const [message,setMessage]=useState({
  email:JSON.parse(localStorage.getItem('user')).email||"",
  role:'user',
  message:'',
  location:null,
  date:(new Date()).toUTCString()
})

const handleLocation=async()=>{
  if(navigator.geolocation){
    return await navigator.geolocation.getCurrentPosition((position=>{
      setMessage({...message,location:{lat:position.coords.latitude,lon:position.coords.longitude}})
    }))
  }
}

const handleSend =()=>{
  for(const key in message){
    if(message[key]===''){
    return 
    }
  }
  setIsSending(true)
  chatActions.sendMessage(message).then(()=>{
    setIsSending(false)
    setMessage({...message,
      message:'',
      location:null})
  }).catch(err=>{
    console.log(err.message)
  })
}

useEffect(()=>{
chatActions.getChatsByUser(email);
},[])
  
  return (<section className='chat scroll'>
    <div className='chat-head'>
    <Link to='/'><AiFillHome size='28'/></Link>
    <input type="search" name='search' autoComplete='off' className='search-chats' placeholder='Search' onChange={(e)=>setSearch(e.target.value)} value={search}/>
    </div>
      <div className='message-body scroll'>
        {
          chats.map((message)=>(<React.Fragment key={message.id}>
          {
            message.role==='user'?<Sender messageContent={message}/>:<Receiver messageContent={message}/>
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
    </div>
  </section>)
}

export default Chats