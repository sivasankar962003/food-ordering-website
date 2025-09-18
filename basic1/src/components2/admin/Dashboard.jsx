import React, { useState } from "react";
import "../css/admin.css";
import "../css/food.css";
import { useEffect } from "react";
import axios from "axios";



function Dashboard(props){

const [data,setData]=useState({})

props.handle()
async function allData() {
var response=await axios.get(`${process.env.REACT_APP_API_URL}dashboard1`)  

setData(response.data)
}



useEffect(()=>{allData();},[])

return<>
<div className="main-content">
            <div className="wrapper">
                <h1>Dashboard</h1>
                <br/>
     
</div>
<div className="divide">

    <div className="p1 b1">
<h3 className="custom">Total Customers</h3>
<h1 className="custom1"> {data.customer1}</h1>
    </div>
    <div className="p1 b2">
        <h3 className="custom" >Total Categories</h3>
        <h1 className="custom1"> {data.category1}</h1>
    </div>
    <div className="p1 b3">
        <h3 className="custom">Total Orders</h3>
        <h1 className="custom1"> {data.orders1}</h1>
    </div>
    <div className="p1 b4">
        <h3 className="custom">Total Revenue</h3>
        <h1 className="custom1"> &#8377;{data.revenue1}</h1>
    </div>
</div>
</div>

</>


}
export default Dashboard;