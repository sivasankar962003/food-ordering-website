import React, { useEffect, useState} from "react";
import "./css/style.css";
import Image from "./Image";
import axios from "axios";
import { Link } from "react-router-dom";




function Categories(props) {
  const [categoryData, setCategoryData] = useState([]);



  async function Category() {
    console.log("API"+process.env.REACT_APP_API_URL)
    var response = await axios.post(
      `${process.env.REACT_APP_API_URL}categories`,
      { limit: props.data},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
   
   setCategoryData(response.data);
  }
useEffect(()=>{Category()},[]) 
  console.log(categoryData)

  return (
    <>
      <section className="categories">
        <h2 className="text-center">Explore Foods</h2>
        <div className="container">
          
          {
          categoryData.map((data,index) =>  (<Link  to={`/foodsearch/${data.category_id}` } key={index} ><Image key={index} title={data.title} source={data.image_name} /> </Link>)
          )}
        </div>
      </section>
    </>
  );
}
export default Categories;
