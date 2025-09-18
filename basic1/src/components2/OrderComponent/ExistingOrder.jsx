import React,{useEffect} from "react";
import axios from "axios";

function ExistingOrder(props){


  async function ExistOrder(props) {
    var response = await axios.get(`${process.env.REACT_APP_API_URL}existorder/` +props.id);
    var database=response.data;
    if(database.length!==0){
       props.exist(database,false); 
    }
    else{
       props.exist(database,true); 
    }
  
    
  }

  useEffect(() => {
    ExistOrder(props);
  }, []);


return<>


</>


}

export default ExistingOrder;