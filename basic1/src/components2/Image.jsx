import React from "react";
import "./css/image.css"
function Image(props) {
  return (
    <div className="box">
      {props.source ? (
        <img className="food-img"src={props.source} alt="dosa" />
      ) : (
        <p>Image not found</p>
      )}
      {props.title && (
        <h3 className="food-title text-primary m-2 text-center">{props.title}</h3>
      )}
    </div>
  );
}
export default Image;
