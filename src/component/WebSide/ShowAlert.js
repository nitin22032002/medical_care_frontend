import React, { useContext } from 'react'
import Alert from '@mui/material/Alert';
import ContextMain from "../../context/ContextMain"
export default function ShowAlert() {
    const context=useContext(ContextMain)
    setTimeout(()=>{
        context.setError({...context.getError,status:false});
    },10000)
  return (
    <div className='alert'>
         {context.getError.status && <Alert severity={context.getError.type}>{context.getError.msg}</Alert>}
    </div>
  )
}
