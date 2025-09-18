import React, { useEffect } from "react";
import { useLocation, useNavigate,  } from "react-router-dom";
import axios from "axios";



function DeleteFood(){

const {state}=useLocation();
const navigate=useNavigate();
console.log(state)
async function deleteFood() {
    await axios.delete(`${process.env.REACT_APP_API_URL}deletefood/`+state);
  
   
      navigate("/managefood")
}



useEffect(()=>{deleteFood()},[])


return <>

</>

}

export default DeleteFood;