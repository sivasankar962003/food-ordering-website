import React from "react";
import Search from "./HomeComponent/Search";
import Categories from "./Categories";
import FoodData from "./FoodData";

function Home(){
return <>
<Search/>
<Categories data="4" />
<FoodData data="6"/>
</>

}
export default Home;