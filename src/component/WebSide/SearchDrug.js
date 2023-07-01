import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ShowTable from './ShowTable'

export default function SearchDrug(props) {
  let columns = [
    { id: "drugs_name", label: "Drug Name", minWidth: 170, align: "center" },
    { id: "diseases_name", label: "Diseases Name", minWidth: 170, align: "center" },
  ]
  return (
    <div>
      <Navbar />
      <ShowTable key={2} columns={columns} targetColumn={"drugs_name"} list_column={"diseases_name"} />
      <Footer />
    </div>
  )
}
