import React,{useState} from "react";
import "../css/style.css";
import "../css/order.css";
import { useNavigate,  Link } from "react-router-dom";
import AddCart from "../HomeComponent/AddCart";
import FoodShow from "./FoodShow";
import axios from "axios";


function FoodDetails(props) {
  const navigate = useNavigate();
   const [show, setShow] = useState(false);

  


 async function handleOrder() {
      var responsed = await axios.post(
            `${process.env.REACT_APP_API_URL}confirm`,
            props.orderPage,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          alert(responsed.data.message);
          navigate("/food");
   
  }

  function manage() {
     setShow(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

    
async function handleCart() {
   navigate("/login")
   setShow(true);
  }
  

  return (
    <form className="order" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Selected Food</legend>

        <div className="food-menu-img">
          {props.orderPage.image_name && (
            <img
              className="img2"
              src={props.orderPage.image_name}
              alt={props.orderPage.title}
            />
          )}
        </div>
        <FoodShow
          key={props.orderPage.id}
          handleChange1={props.handleChange}
          value={props.orderPage.value1}
          food_id={props.orderPage.food_id}
          title={props.orderPage.title}
          price={props.orderPage.price}
        />
        <input
          type="submit"
          onClick={handleOrder}
          name="submit"
          value="Confirm Order"
          className="btn"
        ></input>
        {props.show2 ? (
          <input
            type="submit"
            onClick={handleCart}
            name="cart"
            value="Add To Cart"
            className="btn"
          ></input>
        ) : (
          <Link to="/cart" className="btn">
            Go to cart
          </Link>
        )}
        {show && (
          <AddCart
            food_id={props.orderPage.food_id}
            key={props.orderPage.id}
            manage={manage}
            title={props.orderPage.title}
            status={"notdeliver"}
            image={props.orderPage.image_name}
            value={props.orderPage.value1}
            total={props.orderPage.total_amount}
            price={props.orderPage.price}
          />
        )}
      </fieldset>
    </form>
  );
}

export default FoodDetails;
