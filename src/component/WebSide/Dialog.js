import React, { useContext } from 'react'
import '../css/dialog.css'
import ContextMain from '../../context/ContextMain'

export default function Dialog(props) {
  const context=useContext(ContextMain)
  const handleClick=()=>{
      context.setDialog({...context.getDialog,status:false})
  }
  return (
    <div className='dialog-container'>
        <div class="dialog-background">
        </div>
        <div class="dialog-card">
            <span onClick={handleClick} className='cross-icon'></span>
            {props.children}
        </div>
    </div>
  )
}
