import React from "react";
import { BrowserRouter,Link } from "react-router-dom";
import "../css/style.css";
function Footer(){

return (
  <section className="footer">
    <BrowserRouter>
        <div className="footer" style={{textAlign:"center",marginBottom:"10px"}}>
            <p>All rights reserved. Designed By <Link to="#">Sivasankar</Link></p>
        </div>
        </BrowserRouter>
    </section>
);
}
export default Footer;