import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";
import "../css/food.css";

import axios from "axios";

const style1 = {
  padding: "8px",
  margin: "8px",
  textAlign: "left",
};

function Login(props) {
  props.handleChange();
  var navigate = useNavigate();
  
  

  const [login, setLogin] = useState({ username: "", password: "" });

  function handleInput(event) {
    var value = event.target.value;
    var name = event.target.name;
    setLogin((predata) => ({ ...predata, [name]: value }));
  }

  function handleFood() {
    navigate("/register");
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleLogin() {
    axios.defaults.withCredentials=true;
      var response = await axios.post(
        `${process.env.REACT_APP_API_URL}login`,
        { username: login.username, password: login.password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      var data = response.data;
        if(data.valid && data.password && data.admin){
        navigate("/dashboard",{state:{login:false}})
        
      }

     else  if(data.valid && data.password && (!data.admin)){
        navigate("/")
        
      }
      else if((data.valid || data.password) && (!data.admin)){
        alert("password  incorrect");
      }
      else{
        alert("username doesn't exist")
      }
    }
  

  return (
    <>
      <div className="login">
        <h1 className="text-center">Login</h1>

        <form className="text-center" style={style1} onSubmit={handleSubmit}>
          Username: <br />
          <input
            type="text"
            style={style1}
            onChange={handleInput}
            name="username"
            placeholder="Enter Username"
          />
          <br />
          Password: <br />
          <input
            type="password"
            style={style1}
            onChange={handleInput}
            name="password"
            placeholder="Enter Password"
          />
          <br />
          <input
            type="submit"
            style={style1}
            name="submit"
            value="Login"
            onClick={handleLogin}
            className="btn-primary"
          />
          <br />
          <input
            type="submit"
            style={style1}
            name="submit"
            value="SignUp"
            onClick={handleFood}
            className="btn-primary"
          />
        </form>

        <p className="text-center">
          Created By - <a href="www.sivasankar.com">Sivasankar S</a>
        </p>
      </div>
    </>
  );
}
export default Login;
