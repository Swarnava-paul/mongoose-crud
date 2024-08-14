import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Grid,
    Button,
    Text,
    Flex,
    Input
  } from '@chakra-ui/react'

import { useState ,useEffect } from "react";
import { useDeleteBookMutation , useUpdateBookMutation } from '../app/features/BookapiSlice';

const Content = ({props,publishedBy}) => {
  const [hitDeleteBook,{isSuccess,isError,error,data}] = useDeleteBookMutation();
  const [bookDeleteResponseStatus,setBookDeleteResponseStatus] = useState()
  const {title,author,description,_id } = props;

    const [crudDiv,setCrudDiv] = useState('hide')

    useEffect(()=>{
     if(isSuccess) {
      setBookDeleteResponseStatus(data.message)
    } else if (isError) {
      console.log(error);
    }
    },[isSuccess,isError])
    
  return (
   <>
    {
        crudDiv == 'hide' ? (
        <>
         <Tr fontSize={20}>
            {
            <EachContent title={title} author={author} 
            description={description} id={_id} 
            hitDeleteBook={hitDeleteBook} publishedBy={publishedBy}/>
            }
            {bookDeleteResponseStatus}
         </Tr>
         </>
        ) :(
''
        )
    }
   </>
  )
}

const EachContent = ({title,author,description,id,hitDeleteBook,publishedBy}) => {

const [hitUpdateBook,{isSuccess,isError,error,data}] = useUpdateBookMutation();
const [updateResponseStates,setUpdateResponseStates] = useState(undefined)

function deleteBook () {
   hitDeleteBook({id});
}

 const [updateValidation,setUpdateValidation] = useState({
  title : title,
  author:author
 })

 function updatebook () {
  hitUpdateBook({id,payload:{...updateValidation}})
}

 function handleUpdateForm (event) {
  const {name,value} = event.target;
  setUpdateValidation({
    ...updateValidation,
    [name] : value
  })
 }
 const [updateBookdiv,setUpdateBookdivDiaplay] = useState('hide')

 useEffect(()=>{
  if(isSuccess) {
    setUpdateResponseStates(data.message)
    setTimeout(()=>{
      setUpdateBookdivDiaplay('hide')
    },2000)
  } else if (isError) {
    setUpdateResponseStates(error.data.message)
  }
 },[isSuccess,isError])



    return (
        <>
         {
          updateBookdiv == 'hide' ? (
        <>
        <Td>{title}</Td>
        <Td>{author}</Td>
        <Td><i className="fa-solid fa-pen-to-square" onClick={()=>{setUpdateBookdivDiaplay('display')}}></i></Td>
        <Td><i className="fa-solid fa-trash-can" onClick={deleteBook}></i></Td>
        <Td>{publishedBy}</Td>
        </>
          ) :(
            <>
             <Grid bg='RGB(0, 0, 0,0.5)' w='100%' height='100vh' placeItems='center' pos='absolute' top='0' left='0'>
               <Grid w='50%' height='auto' rowGap={10} bg='whitesmoke' p={10} placeItems='center' onChange={handleUpdateForm}>
                 <Text color='red' textDecoration='underline' cursor='pointer' textDecorationColor='red' left='0'
                 onClick={()=>{setUpdateBookdivDiaplay('hide')}}>Close Window</Text>
                 {updateResponseStates}
                 <br />
                 <Flex align='center' gap={3}>
                  <label htmlFor="updateName">Book Name :</label>
                  <Input name='title' value={updateValidation.title}/>
                 </Flex>
                 <Flex align='center' gap={3}>
                  <label htmlFor="updateName">Author Name :</label>
                  <Input name='author' value={updateValidation.author}/>
                 </Flex>
                 <Button bg='black' color='white' onClick={updatebook}>Update Book</Button>
               </Grid>
             </Grid>
            </>
          )
         }
        </>
    )
}

export default Content
