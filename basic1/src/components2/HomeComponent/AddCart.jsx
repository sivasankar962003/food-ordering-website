import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCart(props){
const navigate=useNavigate();
   props.manage()

    console.log(props)
    async function addcart(props) {
        
        var response=await axios.post(`${process.env.REACT_APP_API_URL}addcart`,props,{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }) 
     { response.data.message &&alert(response.data.message);}
     { response.data.error &&alert(response.data.error);}
      navigate("/food");

        
    }
    


    useEffect(()=>{addcart(props)},[])
    return <>
      
    
    </>

}
export default AddCart;