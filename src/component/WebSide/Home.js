import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import ContextMain from '../../context/ContextMain'
import Navbar from './Navbar'
import Footer from './Footer'
import MainView from './MainView'

export default function Home() {
    // const navigate=useNavigate()
  const context=useContext(ContextMain)
  return (
       <>
         <Navbar/>
         <MainView/>
         <Footer/>
        </>
  )
}
