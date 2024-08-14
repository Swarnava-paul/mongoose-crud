import { Flex ,Grid , Input , Button, useSafeLayoutEffect} from "@chakra-ui/react"
// hooks
import { useState , useEffect} from "react"
import { Link } from "react-router-dom"
// components
import Navbar from "../components/Navbar"
import Content from "../components/Content"
// redux rtk
import { useGetBooksMutation} from "../app/features/BookapiSlice"
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
} from '@chakra-ui/react'


const CreatorView = ({name}) => {

  const [books,setBooks] = useState(undefined)
  const [loadings,setLoadings] = useState()
  const token = JSON.parse(localStorage.getItem('token'))
  const [pagination,setPegination] = useState(1)
  const [dataLength,setDataLength] = useState(undefined);
  const [hitGetBooks , {isLoading,isError,isSuccess,data,error}] = useGetBooksMutation();
  const [refresh,setRefresh] = useState(0)
  const [publishedBy,setPublishedBy] = useState()

  useEffect(()=>{
   if(isLoading) {
    setBooks(undefined)
    setLoadings(<Flex fontSize={30} justify='center' align='center'>Loading Books ....</Flex>)
   } else if(isSuccess) {
     setBooks(data.books)
     setDataLength(data.length);
     setPublishedBy(data.publishedBy);
     
   } else if (isError) {
    setLoadings(<Flex fontSize={20}>{`${error.data.message} !`}</Flex>);
    }
  },[isError,isSuccess,isLoading])

  useEffect(()=>{
   hitGetBooks({token,pagination})
  },[pagination,refresh])

  return (
   <Grid bg='white' w='100%' rowGap={10} placeItems='center'>
    <Navbar name={name} welcome={'Welcome to The Creator Dashboard'}/>
    <Input w='50%' placeholder='Search on All  Books...' border='2px solid grey'/>
    <Flex>
      <Button bg='black' color='white'><Link to='/newPublish'>Publish Book</Link></Button>
    </Flex>
    <Grid placeItems='center'  w='60%'>
     {books ? (
      <TableContainer width='90%'>
        <Button gap={3} bg='black' color='white' onClick={()=>{setRefresh(refresh=>refresh+1)}}>Refresh for Updated Data <i style={{color:"white"}} className="fa-solid fa-arrows-rotate"></i></Button>
        <Table variant='striped' colorScheme="teal" width='100%'>
          <Thead>
            <Tr>
              <Th  fontSize={18}>Book Name</Th>
              <Th  fontSize={18}>Author Name</Th>
              <Th  fontSize={18}>Edit</Th>
              <Th fontSize={18}>Delete</Th>
              <Th fontSize={18}>Published By</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
               books.map((i,index)=>(
               <Content key={index} props={i} publishedBy={publishedBy}/>
              ))
            }
          </Tbody>
        </Table>
        <Flex justify='flex-end' fontSize={23} gap={2}>
         <Button bg='red' color='white'  isDisabled={pagination == 1 ? true :false} onClick={()=>{setPegination(pegination => pegination -1)}}>{'<'}</Button>
        <Button bg='red' color='white' isDisabled={dataLength < 5 ? true : false} onClick={()=>{setPegination(pagination => pagination+1)}}>{'>'}</Button>
        </Flex>
      </TableContainer>

     ) :(loadings)}
    </Grid>
   </Grid>
  )
}

export default CreatorView
