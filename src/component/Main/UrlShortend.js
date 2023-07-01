import React, { useContext } from "react"
import Dialog from "../WebSide/Dialog";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import ContextMain from "../../context/ContextMain";
import ShowAlert from "../WebSide/ShowAlert"
import Loading from "../WebSide/Loading";

function UrlShortend() {
  const context = useContext(ContextMain)
  return (
    <div>
      <ShowAlert />
      <Loading />
      {context.getDialog.status && <Dialog>
        {context.getDialog.tag == "login" ? <Login /> : <SignUp />}
      </Dialog>}
    </div>
  );
}

export default UrlShortend;
