import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css"
import axios from "axios";

function ManageCategory()
{

 const [category,setCategory]=useState([]);   

async function manageCategory(){

var respond=await axios.get(`${process.env.REACT_APP_API_URL}category`)
console.log(respond.data)
setCategory(respond.data)
}


useEffect(()=>{manageCategory()},[])    
async function handleDelete(id){
if(window.confirm("are you sure to delete this record"))
{
 await axios.delete(`${process.env.REACT_APP_API_URL}deletecategory/`+id);
manageCategory()
}



}




return<>
<section className="food-menu">
<Link to="/addcategory" className="addcategory">Add</Link>
<table className="tablecategory">
<thead>
<tr>
<th  className="thead">S.No</th> 
<th  className="thead">Category Name</th>
<th  className="thead">Category Image</th>
<th  className="thead">Feature Status</th>
<th  className="thead">Active Status</th>
<th  className="thead">Update</th>
<th  className="thead">Delete</th>
</tr>
</thead>
<tbody>
{
    category.map((data,index)=>{
        return<>
        <tr>
            <td key={index}>{index+1} </td>
             <td>{data.title }  </td> 
             <td><img  style={{width:"150px",height:"150px"}}src={data.image_name} alt={data.title}/>  </td> 
             <td>{data.feature }  </td> 
             <td>{data.active }  </td> 
             <td><Link  to={`/updatecategory/${data.category_id}`} className="addcategory" style={{width:"80px",backgroundColor:"blue"}}>Update</Link> </td> 
                  <td><button className="addcategory" onClick={()=>handleDelete(data.category_id)} style={{width:"80px",backgroundColor:"red"}}>Delete</button> </td>
             </tr>

</>

     })
    }





</tbody>


</table>

</section>

</>



}
export default ManageCategory;