import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ContextMain from '../../context/ContextMain'
import ShowTable from './ShowTable'


export default function SearchDiseases() {
  const context=useContext(ContextMain)
  let columns=[
    {id:"diseases_name",label:"Diseases Name",minWidth:170,align:"center"},
    {id:"drugs_name",label:"Drugs",minWidth:170,align:"center"},
    {id:"symptoms",label:"Symptoms",minWidth:170,align:"center"},
    {id:"cvc_report",label:"CVC Report",minWidth:170,align:"center"},
    {id:"specific_dignosis_report",label:"Specific Dignosis Report",minWidth:170,align:"center"},
    {id:"discription",label:"Discription",minWidth:170,align:"center"},
  ]
  return (
    <div>
        <Navbar/>
            <ShowTable key={1} columns={columns} targetColumn={"diseases_name"} list_column={"drugs_name"} />
        <Footer/>
    </div>
  )
}
