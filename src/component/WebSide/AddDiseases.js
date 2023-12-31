import { TextField } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import TagsInput from "react-tagsinput"
import Navbar from './Navbar'
import Footer from "./Footer"
import ContextMain from '../../context/ContextMain'
import { postRequest } from "../../server/server"
import 'react-tagsinput/react-tagsinput.css'
import "../css/adddiseases.css"
export default function AddDiseases() {
  const [tags, setTags] = useState([]);
  const context = useContext(ContextMain)
  const [getTagValue, setTagValue] = useState("")
  const [disTag, setDisTags] = useState([])
  const [getDisValue, setDisValue] = useState("")
  const [getDiseasesName, setDiseasesName] = useState("")
  const [getSymptomsName, setSymptomsName] = useState("")
  const [getCvcReport, setCvcReport] = useState("")
  const [getReport, setReport] = useState("")
  // const [getData, setData] = useState({ "diseases_name": "", "symptoms": "", "cvc_report": "", "specific_dignosis_report": "", "drugs": [], "discription": [] })
  const handleTagsChange = (newTags, callback) => {
    callback(newTags);
  };
  const handleChange = (event, target) => {
    let value = event.currentTarget.value
    if (target === "diseases_name") {
      setDiseasesName(value)
    }
    else if (target === "symptoms") {
      setSymptomsName(value)
    }
    else if (target === "cvc_report") {
      setCvcReport(value)
    }
    else {
      setReport(value);
    }
  }
  const handleAdd = async () => {
    context.setLoading(true);
    try {
      let body = { "diseases_name": getDiseasesName, "symptoms": getSymptomsName, "cvc_report": getCvcReport, "specific_dignosis_report": getReport, drugs: tags, discription: disTag };
      let res = await postRequest("/", body)
      if (res.status) {
        context.setError({ msg: "Diseases Added Success Fully", type: "success", status: true });
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
    // setData({ diseases_name: "", symptoms: "", cvc_report: "", specific_dignosis_report: "", drugs: [], discription: [] })
    setDiseasesName("")
    setSymptomsName("")
    setCvcReport("")
    setReport("")
    setDisTags([])
    setTags([])
  }
  const handleAddBtn = (tagsFuc, setTagsFuc, getTagValueFuc, setTagValueFuc) => {
    if (getTagValueFuc === "") { return }
    let arr = tagsFuc;
    arr.push(getTagValueFuc)
    setTagsFuc(arr);
    setTagValueFuc("")
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
              <TextField fullWidth variant='outlined' value={getDiseasesName} label="Diseases Name" onChange={(event) => { handleChange(event, "diseases_name") }} />
            </div>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' value={getSymptomsName} label="Symptoms" onChange={(event) => { handleChange(event, "symptoms") }} />
            </div>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' value={getCvcReport} label="CVC Report" onChange={(event) => { handleChange(event, "cvc_report") }} />
            </div>
            <div className='add-field'>
              <TextField fullWidth variant='outlined' value={getReport} label="Specific Dignosis Report" onChange={(event) => { handleChange(event, "specific_dignosis_report") }} />
            </div>
            <div className='add-field'>
              <TagsInput inputValue={getTagValue} value={tags} onChangeInput={(event) => { setTagValue(event) }} onChange={(newTags) => { handleTagsChange(newTags, setTags) }} onlyUnique={true} inputProps={{ placeholder: "Enter Drug.." }} />
              <button className='tags-btn' onClick={() => { handleAddBtn(tags, setTags, getTagValue, setTagValue) }}>Add</button>
            </div>
            <div className='add-field'>
              <TagsInput inputValue={getDisValue} value={disTag} onChangeInput={(event) => { setDisValue(event) }} onChange={(newTags) => { handleTagsChange(newTags, setDisTags) }} inputProps={{ placeholder: "Enter Discription.." }} />
              <button className='tags-btn' onClick={() => { handleAddBtn(disTag, setDisTags, getDisValue, setDisValue) }}>Add</button>
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
