import React from 'react'
import { Grid, Input ,Text , Button} from '@chakra-ui/react'
import { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useCreateBookMutation } from '../app/features/BookapiSlice'

const NewPublish = () => {

  const [hitCreateBook,{isSuccess,isLoading,data,error,isError}] = useCreateBookMutation()
  const [bookInfo,setBookInfo] = useState({
    title:"",
    author:"",
    description :""
  })

  const [status,setStatus] = useState('')
  function handleFormData (event) {
    const {name,value} = event.target;
   setBookInfo({
    ...bookInfo,
    [name] : value
   })
   
  }

  const publish = () => {
    hitCreateBook(bookInfo)
  }

  useEffect(()=>{
   if(isError) {
    setStatus(error.data.message)
  } else if (isSuccess) {
    setStatus(data.message)
  }
  },[isSuccess,isError,data])

  return (
   <Grid w='100%' placeItems='center' rowGap={20} pt={10} onChange={handleFormData}>
    {
      status === '' ? <>
       <Text fontSize={20}>Publish New Book</Text>
    <Input name="title" placeholder='Please Type Book Name..' w='40%' border='2px solid grey'/>
    <Input name='author' placeholder='Please Type Author name...' w='40%'  border='2px solid grey'/>
    <textarea name='description' placeholder="Enter Description..." style={{border:"2px solid grey",width:"30%",height:"15vh"}}></textarea>
    <Button bg='black' color='white' w='20%' isDisabled={
      bookInfo.author != "" && bookInfo.title !="" && bookInfo.description != "" ? false :true
    } onClick={publish}>Publish Book</Button>
      </>
       :
       <>
       <Text fontSize={24} fontWeight='600' fontFamily='sans-serif'>{status}</Text>
       <Button bg='yellow'><Link to='/'>Go to Home</Link></Button>
       </>
    }
   </Grid>
  )
}

export default NewPublish
