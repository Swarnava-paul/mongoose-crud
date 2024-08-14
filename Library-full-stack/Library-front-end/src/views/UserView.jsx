import { Flex,Grid,Input } from "@chakra-ui/react"

// components

import Navbar from "../components/Navbar"

const UserView = ({name}) => {
  return (
    <Grid  w='100%' h='100vh'>
    <Navbar name={name} welcome={'Welcome to The Users Dashboard'}/>
    <Input/>
   </Grid>
  )
}

export default UserView
