import React, { useEffect } from "react";
import { useLocation, useNavigate,  } from "react-router-dom";
import axios from "axios";



function DeleteCategory(){

const {state}=useLocation();
const navigate=useNavigate();

async function deleteCategory() {
    await axios.delete(`${process.env.REACT_APP_API_URL}deletecategory/`+state);
  
   
      navigate("/managecategory")
}



useEffect(()=>{deleteCategory()},[])


return <>



</>






}

export default DeleteCategory;