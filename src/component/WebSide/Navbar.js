import React, { useContext } from 'react'
import ContextMain from "../../context/ContextMain"
import "../css/navbar.css"
import { useNavigate } from 'react-router'
export default function Navbar() {
  const context=useContext(ContextMain)
  const history=useNavigate()
  return (
    <div class="navbar-container">
    <div class="navbar-sub-container">
      <div class="navbar-logo">
        <div class="nav-logo-img">
          <img src="/url.png" alt="Logo" />
        </div>
        <div class="nav-logo-name">
          Medical Care
        </div>
      </div>
      <div class="navbar-items">
        <div class="nav-items active" onClick={()=>{history("/")}}>
          Home
        </div>
        {context.getUser.isLogin && <><div class="nav-items" onClick={()=>{history("/add")}}>
          Add Diseases
        </div>
        <div class="nav-items" onClick={()=>{history("/diseases")}}>
          Search Diseases
        </div>
        <div class="nav-items" onClick={()=>{history("/drugs")}}>
          Search Drugs
        </div></>}
        {!context.getUser.isLogin ?<>
          <div class="nav-items signup" onClick={()=>{context.setDialog({status:true,tag:"signup"})}}>
          Sign Up
        </div>
        <div class="nav-items login" onClick={()=>{context.setDialog({status:true,tag:"login"})}}>
          Login
        </div>
        </>
        :
        <div class="nav-items signup" onClick={()=>{context.handleLogout()}}>
          Logout
        </div>
        }
      </div>
    </div>
  </div>
  
  )
}
