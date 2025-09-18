import React, { useEffect, useState } from "react";

import "../css/style.css"
import axios from "axios";

function ManageOrder()
{

 const [order,setOrder]=useState([]);   

async function manageOrder(){

var respond=await axios.get(`${process.env.REACT_APP_API_URL}order`)

setOrder(respond.data)
}


useEffect(()=>{manageOrder()},[])    

async function handleDelete(id){
if(window.confirm("are you sure to delete this record"))
{
 await axios.delete(`${process.env.REACT_APP_API_URL}deleteorder/`+id);
  

 manageOrder()
    }}

return<>
<section className="food-menu" >
<table className="tablecategory" style={{width:"100%"}}>
<thead>
<tr>
<th  className="thead">S.No</th> 
<th  className="thead">Customer Name</th>
<th  className="thead">Customer Id</th>
<th  className="thead">Food Name</th>
<th  className="thead">Quantity</th>
<th  className="thead">Total Price</th>
<th  className="thead">Address</th>
<th  className="thead">Phone No</th>
<th  className="thead">Status</th>
<th  className="thead">Delete</th>
</tr>
</thead>
<tbody>
{
    order.map((data,index)=>{
        return<>
        <tr>
            <td key={index}>{index+1} </td>
             <td>{data.customer_name }  </td> 
             <td style={{color:"purple"}} >{data.customer_id }  </td> 
             <td style={{color:"blue"}}>{data.title }  </td> 
             <td>{data.quantity }  </td> 
             <td>{data.total_price }  </td> 
             <td>{data.address }  </td> 
             <td>{data.phone }  </td> 
             <td ><mark>{data.status } </mark> </td>
                  <td><button className="addcategory" onClick={()=>handleDelete(data.id)} style={{width:"80px",backgroundColor:"red"}}>Delete</button> </td>
             </tr>

</>

     })
    }





</tbody>


</table>

</section>

</>



}
export default ManageOrder;