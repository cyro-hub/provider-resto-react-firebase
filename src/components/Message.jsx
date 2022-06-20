import style from 'styled-components'
import locationImage from '../images/location.jpg'


export const Receiver = ({messageContent})=>{
    const {email,message,location,date} = messageContent;

    return(<ReceiverStyles>
            <p className='name'>{email}</p>
            {
                location!==null&&<Location location={location}/>
            }
            <p>{message}</p>
            <p className='date'>{date}</p>
    </ReceiverStyles>)
}

export const Sender = ({messageContent})=>{
    const {email,message,location,date} = messageContent;
    
    return(<SenderStyles>
            <p className='name'>{email}</p>
            {
                location!==null&&<Location location={location}/>
            }
            <p>{message}</p>
            <p className='date'>{date}</p>
    </SenderStyles>)
}

export const Location = ({location})=>{
const {lat,lon}=location;
    return(<LocationStyle target='blank' href={`https://www.google.com/maps?q=${lat},${lon}`}>
        <img src={locationImage} alt="location" />
    </LocationStyle>)
}

const ReceiverStyles = style.div`
max-width:85%;
background-color:rgb(201, 199, 199);
margin:5px;
border-radius:5px;
padding:10px;
height:fit-content;
display:block;
width:fit-content;
float:left;

p{
    width:100%;
}
.name{
    font-weight:bolder;
    font-size:medium;
}
.date{
    text-align:right;
    font-style:italic;
    font-size:small;
    font-weight:bold;
}
`
const SenderStyles = style.div`
max-width:85%;
background-color:rgb(51, 99, 51);
border-radius:5px;
padding:10px;
margin:5px;
// float:right;
margin-left:auto;
height:fit-content;
display:block;

p{
    width:100%;
}
.name{
    font-weight:bolder;
    text-align:right;
    font-size:medium;
}
.date{
    font-style:italic;
    font-size:small;
    font-weight:bold;
}
`
const LocationStyle = style.a`
   img{
    border:1px solid gray;
    width:200px;
    height:150px;
    margin:0 auto;
   }
`
