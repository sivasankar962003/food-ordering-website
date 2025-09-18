import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const style1={
    padding:"8px",
    margin:"8px",
    textAlign:"left"
}


function Register(){
  const navigate = useNavigate();
  
 
  const [register, setRegister] = useState({ name: "", email:"",address:"",phone:"" ,password: "" });

  function handleInput(event) {
    var value = event.target.value;
    var name = event.target.name;
    setRegister((predata) => ({ ...predata, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
   
    var response = await axios.post(
      `${process.env.REACT_APP_API_URL}register`,
      register,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    var data = response.data;

    if (data.data) {
        navigate("/login");
        
      } 
    else {
      alert("username already exist");
    }
  }
  return (
    <>
      <div className="login" >
        <h1 className="text-center">Register</h1>

        <form className="text-center" style={style1} onSubmit={handleSubmit}>
          Name: <br />
          <input
            type="text" style={style1}
            onChange={handleInput}
            name="name"
            placeholder="Enter Username"
          />
          <br />
        Email: <br />
          <input
            type="email" style={style1}
            onChange={handleInput}
            name="email"
            placeholder="Enter emails"
          />
          <br />
           Phone: <br />
          <input
            type="number" style={style1}
            onChange={handleInput}
            name="phone"
            placeholder="Enter phone number"
          />
          <br />
            Address: <br />
          <textarea
            type="text" style={style1}
            onChange={handleInput}
            name="address"
            placeholder="Enter Address"
            rows="6"
          />
          <br />
          Password: <br />
          <input
            type="password" style={style1}
            onChange={handleInput}
            name="password"
            placeholder="Enter Password"
          />
          <br />
          <input
            type="submit" style={style1}
            name="submit"
            value="Submit"
            className="btn-primary"
          />
          <br />
        </form>

        <p className="text-center">
          Created By - <a href="www.sivasankar.com">Sivasankar S</a>
        </p>
      </div>
    </>
  );




}
export default  Register;