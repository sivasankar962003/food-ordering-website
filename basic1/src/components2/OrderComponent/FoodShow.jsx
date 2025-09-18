import React from "react";
import "../css/style.css";
import "../css/order.css";


function FoodShow(props) {
  var total_amount=parseInt(props.price)*( props.value+1);
  return (
    <div className="food-menu-desc">
      <h3 className="food-title">{props.title}</h3>
      
     
      <p className="food-price">Price:&#8377;{props.price* props.value}</p>
      <input type="hidden" name="price" />

      <label className="order-label">Quantity  </label>
      <input
        type="number"
        name="qty"
        onChange={(event)=>(props.handleChange1(event,total_amount))}
        className="input-responsive"
        placeholder="1"
        value={props.value}
        required
      />
    </div>
  );
}
export default FoodShow;
