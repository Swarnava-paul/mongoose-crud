import Allroutes from "./routes/Allroutes";
import React from "react";
import {useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const AuthenticationCheck = ({Login}) => {

  const {authStatus} = React.useContext(AuthContext)

    if(localStorage.getItem('token') || authStatus ) {
      return (<Allroutes/>)
    } else {
      return (<Login/>)
    }

}

export default AuthenticationCheck;
