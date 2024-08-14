import { Button , Flex, Grid} from "@chakra-ui/react"
import { useReducer,useEffect} from "react";
// components
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

function componentDetermine (state,action) {

 switch (action.type) {

 case 'RenderLoginCOmponent' : {
  return {state:<LoginComponent/>};
 }

 case "RenderRegister" : {
  return {state:<RegisterComponent/>}
 }

 }


} 


const Login = () => {

  const navigate = useNavigate()

  useEffect(()=>{
   if(localStorage.getItem('token')) {
     navigate('/')
   }
  },[])

  const btnStyle ={
    height:"10vh",
    borderRadius:"9px",
    backgroundColor:"black",
    color:'white',
    width:['80%','70%','50%','30%'],
    fontSize:"20px",
    fontFamily:"sans-serif"
  }
  const parent = {
    display:"grid",
    width:"100%",
    height:"30vh",
    placeItems:"center",
  }
  const [initialComponentState,dispatch] = useReducer(componentDetermine,{state:<Initial
    parent={parent} btnStyle={btnStyle} renderLogin={renderLogin} renderRegister={renderRegister}/>})

  function renderLogin (){
    dispatch({type:"RenderLoginCOmponent"})
  }
  function renderRegister () {
    dispatch({type:"RenderRegister"})
  }

  return (
   <Flex color='white' w='100%' h='100vh' justify='center' align='center'>
     {initialComponentState.state}
   </Flex>
  )
}

const Initial = ({parent,btnStyle,renderLogin,renderRegister}) => {
  return(
    <Grid sx={parent}>
    <Button sx={btnStyle}onClick={renderLogin}>Login</Button>
    <Button sx={btnStyle} onClick={renderRegister}>Register</Button>
    </Grid>
  )
}


export default Login
