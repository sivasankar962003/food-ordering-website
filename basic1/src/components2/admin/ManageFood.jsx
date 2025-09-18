import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css"
import axios from "axios";

function ManageFood()
{

 const [food,setFood]=useState([]);   

async function manageFood(){

var respond=await axios.get(`${process.env.REACT_APP_API_URL}food`)
console.log(respond.data)
setFood(respond.data)
}


useEffect(()=>{manageFood()},[]) 
async function handleDelete(id){
if(window.confirm("are you sure to delete this record"))
{
   await axios.delete(`${process.env.REACT_APP_API_URL}deletefood/`+id);
   

manageFood()
}}

return<>
<section   className="food-menu"style={{width:"100vw",margin:"0",position:"relative" ,top:"0px",left:"-150px",zIndex:"2"}}>
<Link to="/addfood" className="addcategory">Add</Link>
<table className="tablecategory" style={{width:"100%"}}>
<thead>
<tr>
<th  className="thead">S.No</th> 
<th  className="thead">Food Name</th>
<th  className="thead">Food Image</th>
<th  className="thead">Food Description</th>
<th  className="thead">Price</th>
<th  className="thead">Active Status</th>
<th  className="thead">Calories</th>
<th  className="thead">Protein</th>
<th  className="thead">Fat</th>
<th  className="thead">Carbohydrate</th>
<th  className="thead">Update</th>
<th  className="thead">Delete</th>
</tr>
</thead>
<tbody>
{
    food.map((data,index)=>{
        return<>
        <tr>
            <td key={index}>{index+1} </td>
             <td>{data.title }  </td> 
             <td><img  style={{width:"150px",height:"150px"}}src={data.image_name} alt={data.title}/>  </td> 
            <td>{data.description }  </td> 
            <td>{data.price}  </td> 
             
             <td>{data.active }  </td> 
             <td>{data.calories }g  </td> 
             <td>{data.protein }g  </td> 
             <td>{data.fat }g  </td> 
             <td>{data.carbohydrate }g  </td> 
             <td><Link  to={`/updatefood/${data.food_id}`} className="addcategory" style={{width:"80px",backgroundColor:"blue"}}>Update</Link> </td> 
                  <td><button className="addcategory" onClick={()=>handleDelete(data.food_id)} style={{width:"80px",backgroundColor:"red"}}>Delete</button> </td>
             </tr>

</>

     })
    }





</tbody>


</table>

</section>

</>



}
export default ManageFood;