import { TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import TagsInput from "react-tagsinput"
import Navbar from './Navbar'
import Footer from "./Footer"
import ContextMain from '../../context/ContextMain'
import { deleteRequest, postRequest } from "../../server/server"
import 'react-tagsinput/react-tagsinput.css'
import "../css/adddiseases.css"
import { useNavigate } from 'react-router'
export default function EditDiseases() {
  const [tags, setTags] = useState([]);
  const context = useContext(ContextMain)
  const history=useNavigate()
  const [getTagValue, setTagValue] = useState("")
  const [disTag, setDisTags] = useState([])
  const [getDisValue, setDisValue] = useState("")
  const [getDiseasesName, setDiseasesName] = useState("")
  const [getSymptomsName, setSymptomsName] = useState("")
  const [getCvcReport, setCvcReport] = useState("")
  const [getReport, setReport] = useState("")
  const setValue=()=>{
    setTags(context.getSelectedItem.drugs_name)
            setDiseasesName(context.getSelectedItem.diseases_name)
            setDisTags(context.getSelectedItem.discription)
            setSymptomsName(context.getSelectedItem.symptoms)
            setCvcReport(context.getSelectedItem.cvc_report)
            setReport(context.getSelectedItem.specific_dignosis_report)
  }
    useEffect(()=>{
           setValue() 
    },context.getSelectedItem)

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
      let deleteRes=await deleteRequest(`/?id=${context.getSelectedItem.diseases_name}&code=${1}`);
      if(!deleteRes.status){
        context.setError({ msg: "Server Error...", type: "error", status: true });
        context.setLoading(false)
        return
      }
      let body = { "diseases_name": getDiseasesName, "symptoms": getSymptomsName, "cvc_report": getCvcReport, "specific_dignosis_report": getReport, drugs: tags, discription: disTag };
      let res = await postRequest("/", body)
      if (res.status) {
        context.setError({ msg: "Diseases Edit Success Fully", type: "success", status: true });
        context.fetchData(1)
        history("/diseases")
      }
      else {
          context.setError({ msg: res.error, type: "warning", status: true });
          setValue()
        handleAdd()
      }
    }
    catch (e) {
      context.setError({ msg: "Server Error...", type: "error", status: true });
      setValue()
    handleAdd()
    }
    context.setLoading(false);
    
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
            Edit Diseases
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
              <button className='add-btn' onClick={handleAdd}>Edit Diseases</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
