import React, { useEffect, useState } from "react";
import {  useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./css/style.css";
import "./css/order.css";

import ExistingOrder from "./OrderComponent/ExistingOrder.jsx";
import FoodDetails from "./OrderComponent/FoodDetails.jsx";



function Order() {
  const { id } = useParams();
const navigate=useNavigate();
  const [orderPage, setOrderPage] = useState({});
 
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(true);

  async function orderPages() {
    var response = await axios.get(`${process.env.REACT_APP_API_URL}order/` + id);
    var database = response.data;
    console.log(database)
    if(database.valid){
    setOrderPage(() => ({
      ...database.data[0],
      value1: 1,
      total_amount: database.data[0].price,
    }));
    setShow1(true);
  }else{
    alert("kindly login first");
    navigate("/login")
  }

}

  useEffect(() => {
    orderPages();
  }, []);

  function handleChange(event, total) {
    var values = event.target.value;
    var number = parseInt(values);

    if (values >= 1) {
      setOrderPage((data) => ({
        ...data,
        value1: number,
        total_amount: total,
      }));
    } else {
      alert("Please Enter value greater than 1");
    }
  }

  function existfunction(data, checking) {
    if (checking === false) {
      var { quantity, total_price } = data[0];
      console.log(data);
      setOrderPage((data) => ({
        ...data,
        value1: quantity,
        total_amount: total_price,
      }));
      setShow2(false);
    } else {
      setShow2(true);
    }
  }


  return (
    <>
      {show1 && <ExistingOrder exist={existfunction} id={id} />}

      <section className="food-search">
        <div className="container2">
          <h2 className="text-center text-white">
            Fill this form to confirm your order.
          </h2>
          <FoodDetails  handleChange={handleChange} orderPage={orderPage} show2={show2}    />

          {/* <fieldset>
                    <legend>Delivery Details</legend>
                    <div class="order-label">Full Name</div>
                    <input type="text" name="full-name" placeholder="E.g. Sivasankar" class="input-responsive" required>

                    <div class="order-label">Phone Number</div>
                    <input type="tel" name="contact" placeholder="E.g.8680971564" class="input-responsive" required>

                    <div class="order-label">Email</div>
                    <input type="email" name="email" placeholder="E.g. sankarsiva@gmail.com" class="input-responsive" required>

                    <div class="order-label">Address</div>
                    <textarea name="address" rows="10" placeholder="E.g. Street, City, Country" class="input-responsive" required></textarea>

                  
                </fieldset> */}

          {/* 
            <?php 

                //CHeck whether submit button is clicked or not
                if(isset($_POST['submit']))
                {
                    // Get all the details from the form

                    $food = $_POST['food'];
                    $price = $_POST['price'];
                    $qty = $_POST['qty'];

                    $total = $price * $qty; // total = price x qty 

                    $order_date = date("Y-m-d h:i:sa"); //Order DAte

                    $status = "Ordered";  // Ordered, On Delivery, Delivered, Cancelled

                    $customer_name = $_POST['full-name'];
                    $customer_contact = $_POST['contact'];
                    $customer_email = $_POST['email'];
                    $customer_address = $_POST['address'];


                    //Save the Order in Databaase
                    //Create SQL to save the data
                    $sql2 = "INSERT INTO tbl_order SET 
                        food = '$food',
                        price = $price,
                        qty = $qty,
                        total = $total,
                        order_date = '$order_date',
                        status = '$status',
                        customer_name = '$customer_name',
                        customer_contact = '$customer_contact',
                        customer_email = '$customer_email',
                        customer_address = '$customer_address'
                    ";

                    //echo $sql2; die();

                    //Execute the Query
                    $res2 = mysqli_query($conn, $sql2);

                    //Check whether query executed successfully or not
                    if($res2==true)
                    {
                        //Query Executed and Order Saved
                        $_SESSION['order'] = "<div class='success text-center'>Food Ordered Successfully.</div>";
                        header('location:'.SITEURL.'confirm.php');
                    }
                    else
                    {
                        //Failed to Save Order
                        $_SESSION['order'] = "<div class='error text-center'>Failed to Order Food.</div>";
                        header('location:'.SITEURL);
                        $_SESSION['total']=$total;
                    }

                }
            
            ?>

 */}
        </div>
      </section>
    </>
  );
}
export default Order;
