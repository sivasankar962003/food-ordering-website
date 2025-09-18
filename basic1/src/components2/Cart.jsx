import React, { useEffect, useState } from "react";
import "./css/style.css" 
 import "./css/food.css" 
import FoodImage from "./FoodComponent/FoodImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Cart(){
const navigate=useNavigate();
const [cart,setCart]=useState([])

async function cartData(){

var response=await axios.get(`${process.env.REACT_APP_API_URL}cart`);
if(response.data.valid){
setCart(response.data.data);
}
else{
    alert("kindly login first")
    navigate("/login")
}

}

    useEffect(()=>{cartData();},[])

    
return <>
<section className="food-menu">
       
            <h2 className="text-center">Cart</h2>
             <div className="container1">
             {cart.map((data)=>{return (
                
                <FoodImage cartData={cartData} nutri={false} id={data.food_id} cid={data.cart_id}  key={data.food_id} price ={data.price}  image={data.image_name} title={data.title}  total={data.total_price} quantity={data.quantity}/>
            )})
             
}
</div>


</section>
</>

}
export default Cart;