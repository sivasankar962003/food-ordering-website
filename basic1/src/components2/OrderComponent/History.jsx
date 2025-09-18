import React,{useState,useEffect} from "react";
import "../css/style.css" 
 import "../css/food.css" 
import FoodHistory from "../FoodComponent/FoodHistory";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function History(){
const  navigate=useNavigate();

const [history,setHistory]=useState([])

async function historyData(){
var response=await axios.get(`${process.env.REACT_APP_API_URL}history`);
if(response.data.valid){
setHistory(response.data.data);
}
else{
    alert("kindly login first")
    navigate("/login")
}

}

    useEffect(()=>{historyData();},[])

    
return <>
<section className="food-menu">
       
            <h2 className="text-center">History</h2>
             <div className="container1">
             {history.map((data)=>{return (
                
                <FoodHistory historyData={historyData}  id={data.food_id} cid={data.history_id} status={data.status} key={data.id} price ={data.price}  image={data.image_name} title={data.title}  total={data.total_price} quantity={data.quantity}/>
            )})
             
}
</div>


</section>
</>




}
export default History;