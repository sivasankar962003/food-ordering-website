import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FoodImage from "./FoodComponent/FoodImage";

function FoodSearch(){
const {id}=useParams();

const [search,setSearch]=useState([]);

async function foodSearch(){
var response=await axios.get(`${process.env.REACT_APP_API_URL}foodsearch/`+id)
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
export default FoodSearch;