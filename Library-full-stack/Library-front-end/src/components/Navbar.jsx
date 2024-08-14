import { Flex ,Grid} from "@chakra-ui/react"

const Navbar = ({name,welcome}) => {
  return (

   <Grid h='10vh' bg='black' color='white' placeItems='center' w='100%'>
    <Flex fontSize={20} justify='center' h='80%' align='center'>
    {`Hi ${name} !`}
   </Flex>
    {welcome}
   </Grid>
  )
}

export default Navbar
