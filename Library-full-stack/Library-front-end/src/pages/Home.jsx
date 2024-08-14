import { useEffect,useState } from "react"
// role wise views components
import CreatorView from "../views/CreatorView"
import UserView from "../views/UserView"
// redux rtk to check user tole to determine dashboard view
import { Flex } from "@chakra-ui/react";
import { useCheckUserRoleMutation } from "../app/features/usersApiSlics";

const Home = () => {
  
  const initialView = <Flex justify='center' h='100vh' align='center' color='blCK' fontSize={30}>Please Wait ...</Flex> 
  const [view,setView] = useState(<>{initialView}</>)
  const [hitCheckRole,{isError,data,isSuccess}] = useCheckUserRoleMutation()



  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    hitCheckRole(token)
  },[])

  useEffect(()=>{
    if(isSuccess) {
      if(data.role.includes('CREATOR')) {
        const {name} = data;
        setView(<CreatorView name={name}/>)
      } else {
        const {name} = data;
        setView(<UserView name={name}/>)
      }
    } else if(isError){
      setView(<Flex justify='center' h='100vh' align='center' fontSize={30} color='white'>Error Please Refresh of Try again Later...</Flex> )
    }
  },[isError, isSuccess])



 return (
  <div style={{backgroundColor:"white"}}>
  {view}
  </div>
);

};

export default Home
