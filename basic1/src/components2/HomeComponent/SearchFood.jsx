import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FoodImage from "../FoodComponent/FoodImage";

function SearchFood(){
const state=useLocation();
console.log(state.state)
var {name}=state.state;

const [search,setSearch]=useState([]);

async function foodSearch(){
var response=await axios.get(`${process.env.REACT_APP_API_URL}searchfood/${name}`)
setSearch(response.data)

}

useEffect(()=>{foodSearch();},[])

return <section className="food-menu">
       
            <h2 className="text-center">Food Menu</h2>
             <div className="container1">
            
            {
                search.map((food)=><FoodImage  nutri={true} image={food.image_name}  key={food.food_id} id={food.food_id} calories={food.calories}  protein={food.protein} fat={food.fat} carbo={food.carbohydrate} checked={true}  title={food.title} price={food.price} description={food.description} />

           ) }
          
   </div>
   </section>

}
export default SearchFood;