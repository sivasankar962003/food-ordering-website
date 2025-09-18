import React, { useState } from "react";
import logo from "../images/logo.png";
import "../css/style.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../Home.jsx";
import Categories from "../Categories.jsx";
import Food from "../Food.jsx";
import Cart from "../Cart.jsx";
import Order from "../Order.jsx";
import History from "../OrderComponent/History.jsx";
import Register from "../admin/Register.jsx";
import FoodSearch from "../FoodSearch.jsx";
import SearchFood from "../HomeComponent/SearchFood.jsx";
import Dashboard from "../admin/Dashboard";
import ManageCategory from "../admin/ManageCategory";
import ManageFood from "../admin/ManageFood";
import ManageOrder from "../admin/ManageOrder";
import Login from "../admin/Login";
import AddCategory from "../admin/AddCategory.jsx"
import AddFood from "../admin/AddFood.jsx"
import UpdateCategory from "../admin/UpdateCategory.jsx"
import UpdateFood from "../admin/UpdateFood.jsx"
import DeleteCategory from "../admin/DeleteCategory.jsx"
import DeleteFood from "../admin/DeleteFood.jsx"
import DeleteOrder from "../admin/DeleteOrder.jsx"

function Header() {
  const [states, setStates] = useState(true);

  function handle() {
    setStates(false);
  }
  function handleChange() {
    setStates(true);
  }

  return (
    <section id="navbar">
      <div id="container">
        <BrowserRouter>
          <div className="logo">
            <Link to="#">
              <img
                src={logo}
                alt="Restaurant Logo"
                className="img-responsive"
              />{" "}
            </Link>
          </div>

          {!states && (
            <div className="menu text-right">
              <div className="wrapper">
                <ul>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/managecategory">Manage-Category</Link>
                  </li>
                  <li>
                    <Link to="managefood">Manage-Food</Link>
                  </li>
                  <li>
                    <Link to="/manageorder">Order</Link>
                  </li>
                  <li>
                    <Link to="/login">Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {states && (
            <div className="menu text-right">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/food">Food</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/history">History</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          )}
          <div className="clearfix"></div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories data="12" />} />
            <Route path="/food" element={<Food />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/history" element={<History />} />
            <Route path="/order/:id" element={<Order />} />

            <Route path="/register" element={<Register />} />
            <Route path="/foodsearch/:id" element={<FoodSearch />} />
            <Route path="/searchfood" element={<SearchFood />} />
            <Route path="/dashboard" element={<Dashboard handle={handle} />} />
            <Route path="/managecategory" element={<ManageCategory />} />
            <Route path="/managefood" element={<ManageFood />} />
            <Route path="/manageorder" element={<ManageOrder />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/addfood" element={<AddFood />} />
            <Route path="/updatecategory/:id" element={<UpdateCategory />} />
            <Route path="/updatefood/:id" element={<UpdateFood />} />
            <Route path="/deletecategory" element={<DeleteCategory />} />
            <Route path="/deletefood" element={<DeleteFood />} />
            <Route path="/deleteorder" element={<DeleteOrder />} />
            <Route
              path="/login"
              element={<Login handleChange={handleChange} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  );
}
export default Header;
