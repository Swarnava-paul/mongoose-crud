import { Flex ,Grid,Image,Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
const PageNotFound = () => {

const navigate = useNavigate();

const pageNotFoundImage = 'https://i.ibb.co/B3f4ysn/Screenshot-2024-08-12-200302.png'
  return (
    <Flex w='100%' h='100vh' bg='white' justify='center' align='center'>
      <Grid w='100%' h='100%' placeItems='center'>
        <Image src={pageNotFoundImage} w={['90%','60%','50%','50%']}/>
        <Flex pos='absolute' className="pagenotfoundDiv" w='40%' justify='center'>
            <Button w={['100%','45%','30%','25%']} onClick={()=>{
             navigate('/')
            }}>Go to Home</Button>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default PageNotFound
