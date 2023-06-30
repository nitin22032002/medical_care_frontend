import { TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import TagsInput from "react-tagsinput"
import 'react-tagsinput/react-tagsinput.css'
import "../css/adddiseases.css"
import Navbar from './Navbar'
import Footer from "./Footer"
import ContextMain from '../../context/ContextMain'
import { postRequest } from "../../server/server"
export default function AddDiseases() {
  const [tags, setTags] = useState([]);
  const context = useContext(ContextMain)
  const [getData, setData] = useState({ "diseases_name": "", "symptoms": "", "cvc_report": "", "specific_dignosis_report": "", "drugs": [], "discription": "" })
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };
  const handleChange = (event, target) => {
    let data = getData
    data[target] = event.currentTarget.value;
    setData(data);
  }
  const handleAdd = async () => {
    context.setLoading(true);
    try {
      let body = { ...getData, drugs: tags };
      let res = await postRequest("/", body)
      if (res.status) {
        context.setError({ msg: "Diseases Added Success Fully", type: "success", status: true });
        setData({diseases_name: "", symptoms: "", cvc_report: "", specific_dignosis_report: "", drugs: [], discription: "" })
        setTags([])
        context.fetchData(1)
      }
      else {
        context.setError({ msg: res.error, type: "warning", status: true });
      }
    }
    catch (e) {
      context.setError({ msg: "Server Error...", type: "error", status: true });
    }
    context.setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className='add-main-div'>
        <div className='add-sub-div'>
          <div className='add-heading'>
            Add New Diseases
          </div>
          <div className='add-field-area'>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' label="Diseases Name" onChange={(event) => { handleChange(event, "diseases_name") }} />
            </div>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' label="Symptoms" onChange={(event) => { handleChange(event, "symptoms") }} />
            </div>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' label="CVC Report" onChange={(event) => { handleChange(event, "cvc_report") }} />
            </div>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' label="Specific Dignosis Report" onChange={(event) => { handleChange(event, "specific_dignosis_report") }} />
            </div>
            <div className='add-field'>
              <TagsInput value={tags} onChange={handleTagsChange} onlyUnique={true} inputProps={{ placeholder: "Enter Drug.." }} />
            </div>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' label="Discription" onChange={(event) => { handleChange(event, "discription") }} />
            </div>
            <div className='add-btn'>
              <button className='add-btn' onClick={handleAdd}>Add Diseases</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
