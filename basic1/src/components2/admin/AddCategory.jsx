import React, { useState } from "react";
// import "../css/style.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";


function AddCategory(){
const navigate=useNavigate()
const [category,setCategory]=useState({
title:"",

featured:"",
active:""

})
const [image,setImage]=useState();


async function handleSubmit(event){
event.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(image); // Convert to base64

    reader.onloadend = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}addcategory`,{data:{...category,imageUrl:reader.result}},)
        
        alert(res.data.message)
      } catch (err) {
        console.error('Upload failed:', err.message);
      }
    };




// var res=await axios.post("http://localhost:5000/addcategory",{data:{...category,},image},{headers:{
//   'Content-Type': 'multipart/form-data'

// }})



}
function handleChange(event){
var value=event.target.value;
var name=event.target.name;
setCategory((predata)=>({...predata,[name]:value}))

}

function imagehandle(event){
console.log(event.target.files[0])
setImage(event.target.files[0])

}


return <>
<section className="food-menu">

<h2  style={{textAlign:"center"}}>ADD Category</h2>
<form onSubmit={handleSubmit}>
<table style={{width:"80%",marginLeft:"100px"}}>
    <tbody>
<tr>
                    <td>Title: </td>
                    <td>
                        <input type="text"  onChange={handleChange}name="title" placeholder="Category Title"/>
                    </td>
                </tr>

                <tr>
                    <td>Select Image: </td>
                    <td>
                        <input type="file" onChange={imagehandle} name="image"/>
                    </td>
                </tr>

                <tr>
                    <td>Featured: </td>
                    <td>
                        <input type="radio" onChange={handleChange} name="featured" value="Yes"/> Yes 
                        <input type="radio" onChange={handleChange} name="featured" value="No"/> No 
                    </td>
                </tr>

                <tr>
                    <td>Active: </td>
                    <td>
                        <input type="radio" onChange={handleChange} name="active" value="Yes"/> Yes 
                        <input type="radio" onChange={handleChange} name="active" value="No"/> No 
                    </td>
                </tr>

                <tr>
                    <td>
                        <input type="submit"  name="submit" value="Add Category" className="btn-secondary"/>
                    </td>
                    <td>
                        <input type="button"   onClick={()=>navigate("/managecategory")}   value="Back" className="btn-secondary"/>
                    </td>
                </tr>



</tbody>
</table>
</form>

</section>


</>






}

export default AddCategory;