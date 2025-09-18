import React, { useEffect, useState } from "react";
import "../css/style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateFood() {
    
    let {id}=useParams();
   
const navigate=useNavigate()
  const [food, setFood] = useState({
    title: "",
    description: "",
    price: 0,
    category_id: 0,
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    feature: "",
    active: "",
  });

  const [image, setImage] = useState();

const [imgUrl,setImgUrl]=useState("");
async function updateData(){
    var res=await axios.get(`${process.env.REACT_APP_API_URL}food/`+id);
    setFood( res.data   )
    setImage(res.data.image_name)
}



useEffect(()=>{updateData()},[])



const [category, setCategory] = useState([]);


  async function handleSubmit(event) {
    event.preventDefault();
    const isUrl = typeof image === 'string' && image.startsWith('http');
if(isUrl){
 const res = await axios.post(`${process.env.REACT_APP_API_URL}updatefood`,{data:{...food,imageUrl:image}})
        
        alert(res.data.message)

}else{
        const reader = new FileReader();
    reader.readAsDataURL(image); // Convert to base64

    reader.onloadend = async () => {
      try {
          var res = await axios.post(
      `${process.env.REACT_APP_API_URL}updatefood`,
      { data: { ...food , imageUrl:reader.result} },
  
    );
    alert(res.data.message);
      } catch (err) {
        console.error('Upload failed:', err.message);
      }
    };}
    navigate("/managefood")
  }
  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;
    setFood((predata) => ({ ...predata, [name]: value }));
  }

  function imagehandle(event) {
    var imageblob=event.target.files[0]
var url=URL.createObjectURL(imageblob);
setImgUrl(url)
setImage(event.target.files[0])
  }

async function categoryData(){
 
var res=await axios.get(`${process.env.REACT_APP_API_URL}category`)

setCategory(res.data);
}

  useEffect(()=>{categoryData();},[])

  return (
    <>
      <section className="food-menu">
        <h2 style={{ textAlign: "center" }}>Update Food List</h2>
        <form onSubmit={handleSubmit}>
          <table style={{ width: "80%", marginLeft: "100px" }}>
            <tr>
              <td>Title: </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="title"
                  value={food.title}
                  placeholder="Food Title"
                />
              </td>
            </tr>
            <tr>
                 <td>Description: </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="description"
                  value={food.description}
                  placeholder="Description"
                />
              </td>
            </tr>

            <tr>
              <td>Select Image: </td>
              <td>
                <input type="file" onChange={imagehandle} name="image" />
              </td>
            </tr>
            <tr>
            <td></td>
            <td> <img  width="100px" height="100px"src={imgUrl || food.image_name } alt={food.title}/> </td>
            </tr>

            <tr>
                 <td>Price: </td>
              <td>
                
                <input
                  type="number"
                  onChange={handleChange}
                  name="price"
                  value={food.price}
                  placeholder="Price"
                />
              </td>

            </tr>

            <tr>
                 <td>Categories: </td>
              <td>
             <select  value={food.category_id} name="category_id" onChange={handleChange} >
               {
                category.map((data)=>(
                
                <option key={data.category_id}   value={data.category_id} selected={data.category_id===food.category_id?true:false}>{data.title}</option>
                
                ))
                

               }
             </select>
              </td>
            </tr>
            
            <tr>
              <td>Active: </td>
              <td>
                <input
                  type="radio"
                  onChange={handleChange}
                  checked={(food.active==="Yes"?true:false)}
                  name="active"
                  value="Yes"
                />{" "}
                Yes
                <input
                  type="radio"
                  onChange={handleChange}
                  checked={(food.active==="No"?true:false)}
                  name="active"
                  value="No"
                />{" "}
                  No 
                </td>
            </tr>
             <tr>
                 <td>Calories: </td>
              <td>

                <input
                  type="number"
                  onChange={handleChange}
                  name="calories"
                  value={food.calories}
                  placeholder="calories"
                />
              </td>
            </tr> <tr>
                 <td>Protein: </td>
              <td>

                <input
                  type="number"
                  onChange={handleChange}
                  name="protein"
                  value={food.protein}
                  placeholder="protein"
                />
              </td>
            </tr> <tr>
                 <td>Fat: </td>
              <td>

                <input
                  type="number"
                  onChange={handleChange}
                  name="fat"
                  value={food.fat}
                  placeholder="Fat"
                />
              </td>
            </tr> <tr>
                 <td>Carbohydrate: </td>
              <td>

                <input
                  type="number"
                  onChange={handleChange}
                  name="carbohydrate"
                  value={food.carbohydrate}
                  placeholder="Carbohydrate"
                />
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <input
                  type="submit"
                  name="submit"
                  value="Update Food"
                  className="btn-secondary"
                />
              </td>
            </tr>
          </table>
        </form>
      </section>
    </>
  );
}

export default UpdateFood;
