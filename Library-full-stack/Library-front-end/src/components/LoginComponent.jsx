import React from 'react'
import { useState ,useContext} from 'react'
import {Input,Button,Grid,Text} from '@chakra-ui/react'

// slices
import { useLoginMutation } from '../app/features/usersApiSlics'

// auth context
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {

  const navigate = useNavigate()

  const {authCompleted} = React.useContext(AuthContext);

  const [loginState,setLoginState] = useState('')
  const [formValidation,setFormValidation] = useState({
        password:'',
        email:''
  })

  const [hitLogin] = useLoginMutation ()

  const handleFormValidation = (event) =>{
 setFormValidation({
    ...formValidation,
    [event.target.name]: event.target.value
 }) 
  }
  const login = async () => {
    try {
      const result = await hitLogin(formValidation);

      if (result.error) {
        // Handle error response
        setLoginState(result.error.data.message || "An error occurred");
      } else if (result.data) {
        // Handle success response
        const { data } = result;
        localStorage.setItem('token', JSON.stringify(data.token));
        setLoginState(data.message);
        authCompleted();
        navigate('/')
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  }



  return (
    <Grid placeItems='center' rowGap={7} color='black'>
       <Text fontSize={30}>Login</Text>
       <Text color='black'>{loginState}</Text>
        <Grid rowGap={6}>
            <Input placeholder='Enter Email' border='2px solid black' bg='none' name='email' onChange={handleFormValidation}/>
            <Input placeholder='Enter Password...' border='2px solid black'  name='password' onChange={handleFormValidation}/>
            <Button onClick={login} bg='black' color='white'>
              Login
            </Button>
            
        </Grid>
    </Grid>
  )
}

export default LoginComponent
