import React from "react";
import "../css/food.css"

function Nutrition(props){
    
const {calories,protein,fat,carbo}=props;

return <>
{props.description && <p className="foodpara foodtext">{props.description}</p>}
<ul className="list1">
{calories &&<li> <h5>Calories:<span className="nutvalue">{calories}</span></h5></li> }
{protein && <li><h5>Protein:<span className="nutvalue">{protein}</span></h5></li> }
{fat && <li><h5>Fat:<span className="nutvalue">{fat}</span></h5> </li>}
{carbo &&<li> <h5>Carbohydrate:<span className="nutvalue">{carbo}</span></h5> </li>}
</ul>

</>


}
export default Nutrition;