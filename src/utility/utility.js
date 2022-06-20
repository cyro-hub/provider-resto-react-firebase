export const handleChanges = (e,change,setChange)=>{
    console.log(change)
    if(e.target.id==='login-email'||e.target.id==='login-password'){
        setChange({...change,[e.target.name]:e.target.value})
        return;
    }
    setChange({...change,[e.target.name]:e.target.value})
}