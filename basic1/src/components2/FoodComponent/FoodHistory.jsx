import React from "react";
import "../css/food.css";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function FoodHistory(props){

async function deleteCart(){
    console.log(props.cid)
await axios.delete(`${process.env.REACT_APP_API_URL}historydelete/`+props.cid  );
 props.historyData();
}

return<>


<div className="foodBox">
{!props.nutri && <button type="button"    className="deleteicon" onClick={deleteCart}><DeleteIcon /></button>} 
{props.image ?<img  className="foodimg"src={props.image} alt={props.title}/>: <p>Image not found</p>}
{props.title && <h3 className="foodtitle foodtext">{props.title}</h3>}

{props.quantity && <h5 className="foodprice foodtext1" style={{color:"black",fontSize:"13pt"}}>Quantity:<span className="nutvalue  ">{props.quantity}</span></h5>}
{props.total && <h5 className="foodprice foodtext1" style={{color:"black",fontSize:"13pt"}}>Total amount:<span className="nutvalue ">{props.total}</span></h5>}
{props.status && <h5  style={{color:"green",fontSize:"13pt",margin:"5px"   }}className="foodprice foodtext">{props.status}</h5>} 




</div>



</>






}


export default FoodHistory;
