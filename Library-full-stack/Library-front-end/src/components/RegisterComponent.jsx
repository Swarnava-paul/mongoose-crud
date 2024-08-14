import React from 'react'
import { Grid ,Input , Button ,Text , Flex ,Select} from '@chakra-ui/react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { useRegisterMutation } from '../app/features/usersApiSlics'

const RegisterComponent = () => {

  // redux api for register
  const navigate = useNavigate()

  const [hitRegister] = useRegisterMutation() // redux api for register

  const [formValidation,setFormValidation] = useState({
    name:"",
    email:"",
    password:"",
    role:[]
  });
  const [PasswordValidation,setPasswordValidation] = useState();
  const [hidePassword,setHidePassword] = useState('password');
  const [responseMessage,setResponseMessage] = useState()

  function handleFormValidation (event) {
    const {name,value} = event.target;
    if(name === 'role') {
      setFormValidation({
        ...formValidation,
        [name] : [value]
      })
    } else {
      setFormValidation({
        ...formValidation,
        [name] : value
      })
    }

    if(name ==='password') {
      passwordValidation(value)
    }
  }
  function passwordValidation (password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,20}$/;
    if(regex.test(password)) {
      setPasswordValidation('Password is Valid Go On')
    } else {
      setPasswordValidation('Weak Password Ex: Test123@#?')
    }
  }
  async function register () {

    
    try{
      const res1 =  await hitRegister(formValidation);
      if(res1.error) {
        setResponseMessage(res1.error.data.message)
       } else {
        setResponseMessage(res1.data.message)
        setTimeout(()=>{
          setResponseMessage('Please Login ')
        },2000)
        setTimeout(()=>{
          window.location.reload()
        },4000)
       }
    } catch(error) {
      console.log(error);
      
    }
  } 

  return (
    <Grid  w={['70%','50%','50%','30%']} rowGap={4} color='black'>
     <Text margin='auto' fontSize={20}>Register Yourself</Text>
     <Grid rowGap={4} onChange={handleFormValidation}>
      <Input name='name' placeholder='Enter Your Good Name...'/>
      <Input name='email' placeholder='Enter Email...'/>
      <Input name='password' type={hidePassword} placeholder='Enter Password'/>
      <Text>{PasswordValidation}</Text>
       <Flex align='center' justify='space-between'>
        <Text>Register As:</Text>
       <Select w='70%' name='role'>
       <option value="" style={{color:"black"}}>Register as</option>
        <option value="CREATOR" style={{color:"black"}}>Creator</option>
        <option value="VIEWER" style={{color:"black"}}>User</option>
      </Select>
       </Flex>
      <Button isDisabled={formValidation.email.length > 6 
        && formValidation.password.length > 5 
        && PasswordValidation === 'Password is Valid Go On' 
        && formValidation.name && formValidation.role[0] ? false : true} onClick={register}>
      Register
      </Button>
      <Text>{responseMessage}</Text>
      </Grid>
    </Grid>
  )
}

export default RegisterComponent
