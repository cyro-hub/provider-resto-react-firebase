import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {TiArrowBack} from 'react-icons/ti'
import '../css/form.scss'
import '../css/checkout.scss'
import * as locationActions from '../redux/actions/location';
import {regions} from '../data'

function AddLocation() {
const [warning,setWarning]=useState('');
const [showLocation,setShowLocation]=useState(false);
const [location,setLocation]=useState({
  region:regions[0],
  town:''
})
const locations = useSelector(state=>state.location.locations);
const success = useSelector(state=>state.location.success)

const handleChanges=e=>{
  setLocation({...location,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
  e.preventDefault()

  for(const key in location){
    if(location[key]===''){
      setWarning(`${key} is empty`)
      return;
    }
  }

  locationActions.addLocation(location)
  setShowLocation(true);
  setLocation({
    region:regions[0],
    town:''
  })
}

useEffect(()=>{
  const timer = setTimeout(()=>{
    setWarning('')
    locationActions.getLocations()
  },4000)
  return ()=>clearTimeout(timer)
})

// handling the removal of locations
const handleRemoveLocation = async(id)=>{
    locationActions.removeLocation(id)
}

return (
  <>{!showLocation&&<form onSubmit={(e)=>handleSubmit(e)} className='form'>
  <div className='input-div'>
    <h3>Add Location</h3>
  </div>
  <div>{warning&&<p className='warning'>{warning}</p>}</div>
  <div className='input-div'>
  <select className='input' autoComplete="off" name='region' 
             onChange={(e)=>handleChanges(e)}>
                {
                    regions?.map((region,i)=><option className='option' key={i} value={region}>{region}</option>)
                }
        </select>
  </div>
  <div className='input-div'>
    <input type="text" autoComplete="off" className='input' name='town' id='town' placeholder='Town' value={location.town} onChange={(e)=>handleChanges(e)}/>
  </div>
  <div className='input-div'>
    <button type='submit' className='submit account'>Add Location</button>
    <button className='swap' onClick={()=>setShowLocation(true)}>Show Locations</button>
  </div>
  </form>}
  {showLocation&&<>
  <section className='main'>
  <h3>Locations</h3>
  <div>{success&&<p className='success'>{success}</p>}</div>
  <table>
      <thead>
        <tr>
          <th className='region'>Region</th>
          <th>Town</th>
          <th className='action'>action</th>
        </tr>
      </thead>
      <tbody className='scroll'>
        {
          locations?.map(location=><tr key={location.id}>
            <td className='region'>{location.region}</td>
            <td>{location.town}</td>
            <td className='action'>
              <button onClick={()=>handleRemoveLocation(location.id)} className='btn_remove'>remove</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    <div className='input-div'>
    <button className='swap' onClick={()=>setShowLocation(false)}>Add Location</button>
    </div>
    </section></>}
  </>)
}

export default AddLocation