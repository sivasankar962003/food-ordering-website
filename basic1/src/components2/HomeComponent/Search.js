import React, {  useState } from "react";
import "../css/style.css";
import { useNavigate } from "react-router-dom";


function Search(){
const navigate=useNavigate();
const [search,setSearch]=useState();

function handleSubmit(event){


event.preventDefault();
navigate("/searchfood",{state:{name:search}})

}
async function handleChange(event) {
 var   value=event.target.value;
 setSearch(value)
}


return  (
<section className="food-search text-center">
       {/* <form action="<?php echo SITEURL; ?>food-search.php" method="POST"> */}

          <form onSubmit={handleSubmit}>
                <input type="search" onChange={handleChange} name="search" placeholder="Search for Food.." required/>
                <input type="submit" name="submit" value="Search" className="btn btn-primary"/>
            </form>
</section>
)

}
export default Search;