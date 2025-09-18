import React,{useEffect, useState} from "react";
import axios from "axios";
import "./css/style.css";
import FoodImage from "./FoodComponent/FoodImage";
import "./css/food.css";



function FoodData(props){

const [foodBox,setFoodBox]=useState([]);


async function FoodDetail() {
   
    var Food=await axios.post(`${process.env.REACT_APP_API_URL}food`,{limit:props.data},{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      setFoodBox(Food.data);
}

useEffect(()=>{FoodDetail()},[])



return<>
 <section className="food-menu">
       
            <h2 className="text-center">Food Menu</h2>
             <div className="container1">
            
            {
             foodBox.map((food)=>(
            <FoodImage  nutri={true} image={food.image_name}  key={food.food_id} id={food.food_id} calories={food.calories}  protein={food.protein} fat={food.fat} carbo={food.carbohydrate} checked={true}  title={food.title} price={food.price} description={food.description} />
                
             ))   

            }
          
   </div>
</section>
</>


}
export default FoodData;