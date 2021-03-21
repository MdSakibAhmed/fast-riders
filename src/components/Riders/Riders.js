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

      <div style={{cursor:"pointer"}} onClick={handleRideSelection} className=" rider-img-container shadow mb-5 p-4 text-center rounded-3  d-flex flex-column justify-content-between align-items-center">

      <img className="w-50" src={imgURL} alt="" />
      <h4 className="mt-2">{name}</h4>
      <button
        className="btn-outline-primary pr-2 pl-2 rounded shadow-none pr-2 pl-2"
        onClick={handleRideSelection}> Select
      </button>
    </div>
    </>
  );
};

export default Riders;
