import React, { useContext } from "react";
import { useHistory } from "react-router";
import { RiderCategory } from "../../App";
import "./Riders.css"

const Riders = ({ currentRider }) => {
    const {imgURL,name}= currentRider
  const history = useHistory();
  const [rider, setRider] = useContext(RiderCategory);
  const handleRideSelection = () => {
    history.push("/location");
    setRider(currentRider);
  };

  return (
    <>
      {/* <div onClick={handleRideSelection} className="  border">
        <div className="d-flex flex-column justify-content-between align-items-between">
          <img style={{ width: "150px" }} src={currentRider.imgURL} alt="" />
          <h3>{currentRider.name}</h3>
          <button className="btn-primary p-2 border-0 rounded">select</button>
        </div>
      </div> */}

      <div onClick={handleRideSelection} className=" rider-img-container shadow mb-5 p-4 text-center rounded-3  d-flex flex-column justify-content-between align-items-center">
      <img className="w-50" src={imgURL} alt="" />
      <h4 className="mt-2">{name}</h4>
      

      <button
        className="btn-outline-primary pr-2 pl-2 rounded shadow-none pr-2 pl-2"
        onClick={handleRideSelection}> Select
      
      </button>
    </div>

      {/* <div onClick={handleRideSelection} className="card" style={{width:"18rem"}}>
        <div className="w-50 h-50 text-center">
            <img className="w-75 h-100 mr-auto ml-auto " src={currentRider.imgURL}  alt="..."/>
        </div>
  
  <div className="card-body">
    <h5 className="card-title">{currentRider.name}</h5>
    
    <button onClick={handleRideSelection} className="btn btn-primary">Go somewhere</button>
  </div>
</div> */}
    </>
  );
};

export default Riders;
