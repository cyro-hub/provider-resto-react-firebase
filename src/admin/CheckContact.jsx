import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import '../css/checkout.scss'
import * as contactActions from '../redux/actions/contact'

function CheckContact() {
  const contacts = useSelector(state=>state.contact.contacts);
  
  function handleRemoveContactMessage(id){
    contactActions.removeContact(id)
  }
  useEffect(()=>{
    const timer = setInterval(()=>{
      contactActions.getContacts()
    },5000)
    return ()=>clearInterval(timer)
  })

  return (<section className='main'>
  <h3>Contact Messages</h3>
  <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th className='action'>Region</th>
          <th>Town</th>
          <th>Message</th>
          <th className='action'>action</th>
        </tr>
      </thead>
      <tbody className='scroll'>
        {
          contacts?.map(message=><tr key={message.id}>
            <td>{message.contactDate}</td>
            <td>{message.name}</td>
            <td className='action'>{message.region}</td>
            <td>{message.town}</td>
            <td>{message.message}</td>
            <td className='action'>
              <button onClick={()=>handleRemoveContactMessage(message.id)} className='btn_remove'>remove</button>
            </td>
          </tr>)
        }
      </tbody>
    </table></section>
  )
}

export default CheckContact