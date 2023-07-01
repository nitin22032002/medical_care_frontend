import React, { useEffect, useState } from 'react'
import ContextMain from './ContextMain'
import { deleteRequest, getRequest } from "../server/server"

export default function ContextRouter(props) {
  const history = (path) => {
    if (window.location.pathname !== path)
      window.location.href = path;
  }
  const [getDialog, setDialog] = useState({ tag: "login", status: false })
  const [getError, setError] = useState({ status: false, msg: "Server Error...", type: "error" })
  const [getUser, setUser] = useState({ data: [], isLogin: false });
  const [getShowStatus, setShowStatus] = useState(1);
  const [getData, setData] = useState([])
  const [getLoading, setLoading] = useState(false)
  const [getColumnsList, setColumnList] = useState([0, 1, 2, 3, 4, 5])
  const [getSelectedItem,setSelectedItem]=useState({ "diseases_name": "", "symptoms": "", "cvc_report": "", "specific_dignosis_report": "", "drugs": [], "discription": [] })
  const fetchDiseases = async () => {
    setLoading(true)
    try {
      let res = await getRequest("/diseases")
      if (res.status) {
        setData(res.data);
      }
      else {
        setData([])
        setError({ msg: res.error, type: "error", status: true })
        history("/")
      }
    }
    catch (e) {
      setError({ msg: "Server Error...", type: "error", status: true })
      history("/")
    }
    setLoading(false)
  }

  const fetchDrugs = async () => {
    setLoading(true)
    try {
      let res = await getRequest("/drugs")
      if (res.status) {
        setData(res.data);
      }
      else {
        setData([])
        setError({ msg: res.error, type: "error", status: true })
        history("/")
      }
    }
    catch (e) {
      setError({ msg: "Server Error...", type: "error", status: true })
      history("/")
    }
    setLoading(false)
  }
  const fetchUser = async () => {
    setLoading(true)
    try {
      let res = await getRequest("/")
      if (res.status) {
        setUser({ isLogin: true, data: res.data })
      }
      else {
        setUser({ isLogin: false });
        history("/")
      }
    }
    catch (e) {
      setUser({ isLogin: false });
      history("/")
    }
    setLoading(false)
  }

  const fetchData = (code) => {
    console.log(code)
    if (code === 1) {
      fetchDiseases();
    }
    else {
      fetchDrugs();
    }
  }

  const handleDelete = async (row) => {
    setLoading(true)
    try {
      let id;
      if (getShowStatus === 1) {
        id = row.diseases_name;

      }
      else {
        id = row.drugs_name;
      }
      let res = await deleteRequest(`/?id=${id}&code=${getShowStatus}`)
      if (res.status) {
        setError({ msg: "Deleted SuccessFully", type: "success", status: true })
        fetchData(getShowStatus)
      }
      else {
        setData([])
        setError({ msg: res.error, type: "error", status: true })
        history("/")
      }
    }
    catch (e) {
      setError({ msg: "Server Error...", type: "error", status: true })
      history("/")
    }
    setLoading(false)
  }
  const handleLogout = async () => {
    setLoading(true)
    try {
      let res = await deleteRequest(`/logout`)
      if (res.status) {
        setError({ msg: "Logout SuccessFully", type: "success", status: true })
        history("/")
        setUser({ isLogin: false });
      }
      else {
        setError({ msg: res.error, type: "error", status: true })
      }
    }
    catch (e) {
      setError({ msg: "Server Error...", type: "error", status: true })
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchUser();
  }, [])
  useEffect(() => {
    // console.log(window.location.pathname)
    if (window.location.pathname === "/diseases") {
      setColumnList([0, 1, 2, 3, 4, 5])
      setShowStatus(1)
      fetchData(1)
    }
    else if (window.location.pathname === "/drugs") {
      setColumnList([0, 1])
      setShowStatus(0);
      fetchData(0)
    }
  }, [window.location.pathname])
  return (
    <ContextMain.Provider value={{getSelectedItem,setSelectedItem, getColumnsList, setColumnList, fetchData, getData, getUser, handleLogout, setShowStatus, handleDelete, fetchUser, getLoading, setLoading, getDialog, setDialog, getError, setError, setUser, getShowStatus}}>
      {props.children}
    </ContextMain.Provider>
  )
}
