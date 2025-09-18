import React,{useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



function UpdateCategory(){

    let {id}=useParams();
   
const navigate=useNavigate()

const [category,setCategory]=useState({
title:"",
feature:"",
active:"",
id,
})

const [imgUrl,setImgUrl]=useState("");


const [image,setImage]=useState();
async function updateData(){
    var res=await axios.get(`${process.env.REACT_APP_API_URL}category/`+id);
 
   
    setCategory( res.data   )
    setImage(res.data.image_name)
   
}



useEffect(()=>{updateData()},[])


async function handleSubmit(event){

event.preventDefault();
const isUrl = typeof image === 'string' && image.startsWith('http');
if(isUrl){
 const res = await axios.post(`${process.env.REACT_APP_API_URL}updatecategory`,{data:{...category,imageUrl:image}},)
        
        alert(res.data.message)

}else{
   const reader = new FileReader();
    reader.readAsDataURL(image); // Convert to base64

    reader.onloadend = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}updatecategory`,{data:{...category,imageUrl:reader.result}},)
        
        alert(res.data.message)
      } catch (err) {
        console.error('Upload failed:', err.message);
      }
    };
}

navigate("/manageCategory")


}
function handleChange(event){
var value=event.target.value;
var name=event.target.name;
setCategory((predata)=>({...predata,[name]:value}))

}

function imagehandle(event){

var imageblob=event.target.files[0]
var url=URL.createObjectURL(imageblob);
setImgUrl(url)
setImage(event.target.files[0])

}



return <>
<section className="food-menu">

<h2  style={{textAlign:"center"}}>Update Category</h2>
<form onSubmit={handleSubmit}>
<table style={{width:"80%",marginLeft:"100px"}}>
    <tbody>
<tr>
                    <td>Title: </td>
                    <td>
                        <input type="text"  onChange={handleChange} value={category.title} name="title" placeholder="Category Title"/>
                    </td>
                </tr>

                <tr>
                    <td>Select Image: </td>
                    <td>
                        <input type="file" onChange={imagehandle} name="image"/>
                    </td>
                </tr>
                
                <tr>
                <td>
                </td>
                <td>
                  <img  width="100px" height="100px" src={category.image_name || imgUrl}  alt={category.title}/>
                    
                </td>
                </tr>


                <tr>
                    <td>Featured: </td>
                    <td>
                        <input type="radio" onChange={handleChange} checked={(category.feature==="Yes"?true:false)} name="feature" value="Yes"/> Yes 
                        <input type="radio" onChange={handleChange} checked={(category.feature==="No"?true:false)} name="feature" value="No"/> No 
                    </td>
                </tr>

                <tr>
                    <td>Active: </td>
                    <td>
                        <input type="radio" onChange={handleChange} checked={category.active==="Yes"?true:false} name="active" value="Yes"/> Yes 
                        <input type="radio" onChange={handleChange} checked={category.active==="No"?true:false}name="active" value="No"/> No 
                    </td>
                </tr>

                <tr>
                    <td colSpan={2}>
                        <input type="submit"  name="submit" value="Update Category" className="btn-secondary"/>
                    </td>
                </tr>



</tbody>
</table>
</form>

</section>



</>






}

export default UpdateCategory;