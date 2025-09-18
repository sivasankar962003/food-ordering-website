import React, { useEffect, useState } from "react";
import "../css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddFood() {
const navigate=useNavigate();

  const [food, setFood] = useState({
    title: "",
    description: "",
    price: 0,
    category_id:'',
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    featured: "",
    active: "",
  });
  const [image, setImage] = useState();
  const [category, setCategory] = useState([]);
  async function handleSubmit(event) {
    event.preventDefault();
      const reader = new FileReader();
    reader.readAsDataURL(image); // Convert to base64

    reader.onloadend = async () => {
      try {
          var res = await axios.post(
      `${process.env.REACT_APP_API_URL}addfood`,
      { data: { ...food , imageUrl:reader.result} },
  
    );
    alert(res.data.message);
      } catch (err) {
        console.error('Upload failed:', err.message);
      }
    };

  
  }
  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;
    setFood((predata) => ({ ...predata, [name]: value }));
  }

  function imagehandle(event) {
    setImage(event.target.files[0]);
  }

async function categoryData(){
 
var res=await axios.get(`${process.env.REACT_APP_API_URL}category`)
console.log(res.data)
setCategory(res.data);
}

  useEffect(()=>{categoryData()},[])

  return (
    <>
      <section className="food-menu">
        <h2 style={{ textAlign: "center" }}>ADD Category</h2>
        <form onSubmit={handleSubmit}>
          <table style={{ width: "80%", marginLeft: "100px" }}>
            <thead></thead>
            <tbody>
            <tr>
              <td>Title: </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="title"
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
                 <td>Price: </td>
              <td>
                
                <input
                  type="number"
                  onChange={handleChange}
                  name="price"
                  placeholder="Price"
                />
              </td>

            </tr>

            <tr>
                 <td>Categories: </td>
              <td>
             <select value={food.category_id} name="category_id" onChange={(e)=>(setFood((predata) => ({ ...predata, category_id:Number(e.target.value)  })))} >
               <option value="">Select a category</option>

               {
                
           category.map((data)=>(
                
                <option key={data.category_id}   value={data.category_id} >{data.title}</option>
                
                ))
                

               }
             </select>
              </td>
            </tr>
            <tr>
              <td>Featured: </td>
              <td>
                <input
                  type="radio"
                  onChange={handleChange}
                  name="featured"
                  value="Yes"
                />{" "}
                Yes
                <input
                  type="radio"
                  onChange={handleChange}
                  name="featured"
                  value="No"
                />{" "}
                No
              </td>
            </tr>

            <tr>
              <td>Active: </td>
              <td>
                <input
                  type="radio"
                  onChange={handleChange}
                  name="active"
                  value="Yes"
                />{" "}
                Yes
                <input
                  type="radio"
                  onChange={handleChange}
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
                  placeholder="Carbohydrate"
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  type="submit"
                  name="submit"
                  value="Add Food"
                  className="btn-secondary"
                />
              </td>
              <td>
                        <input type="button"   onClick={()=>navigate("/managefood")}   value="Back" className="btn-secondary"/>
                    </td>
            </tr>
            </tbody>
          </table>
        </form>
      </section>
    </>
  );
}

export default AddFood;
