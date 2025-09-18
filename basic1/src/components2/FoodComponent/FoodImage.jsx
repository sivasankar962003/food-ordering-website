import React, { useState } from "react";
import "../css/food.css";
import { Link } from "react-router-dom";
import Nutrition from "./Nutrition";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function FoodImage(props) {
  const [check, setCheck] = useState(true);

  
  function changeEvent() {
    setCheck((preval) => !preval);
  }

  async function deleteCart() {
    console.log(props.cid);
    await axios.delete(
      `${process.env.REACT_APP_API_URL}cartdelete/` + props.cid
    );
    props.cartData();
  }

  return (
    <>
      <div className="foodBox">
        {!props.nutri && (
          <button type="button" className="deleteicon" onClick={deleteCart}>
            <DeleteIcon />
          </button>
        )}
        {props.image ? (
          <img
            className="foodimg"
            src={props.image}
            alt={props.title}
          />
        ) : (
          <p>Image not found</p>
        )}
        {props.title && <h3 className="foodtitle foodtext">{props.title}</h3>}
        {props.nutri && props.price && (
          <h5 className="foodprice foodtext">&#8377;{props.price}</h5>
        )}
        {props.quantity && (
          <h5
            className="foodprice foodtext1"
            style={{ color: "black", fontSize: "13pt" }}
          >
            Quantity:<span className="nutvalue  ">{props.quantity}</span>
          </h5>
        )}
        {props.total && (
          <h5
            className="foodprice foodtext1"
            style={{ color: "black", fontSize: "13pt" }}
          >
            Total amount:<span className="nutvalue ">{props.total}</span>
          </h5>
        )}
        {check ? (
          <Nutrition description={props.description} />
        ) : (
          <Nutrition
            calories={props.calories}
            protein={props.protein}
            fat={props.fat}
            carbo={props.carbo}
          />
        )}

        <Link to={`/order/${props.id}`} className="foodButton foodlink">
          Order
        </Link>

        {props.nutri && (
          <button
            style={
              check
                ? { backgroundColor: "orange" }
                : { backgroundColor: "rgb(249, 10, 225)" }
            }
            onClick={changeEvent}
            className="foodButton foodbutton"
          >
            Nutrition
          </button>
        )}
      </div>
    </>
  );
}
export default FoodImage;
