import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import NewPublish from "../pages/NewPublish";

const Allroutes = () => {
  return (
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/newPublish" element={<NewPublish/>}/>
    <Route path="*" element={<PageNotFound/>}/>
   </Routes>
  )
}

export default Allroutes;
