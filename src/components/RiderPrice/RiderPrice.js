import React, { useContext } from 'react';
import { LocationContext, RiderCategory } from '../../App';
import {data} from "../Data/Data"
import icon from "../../images/peopleicon.png"
import Map from '../Map/Map';
import "./RiderPrice.css"

const RiderPrice = () => {
    const [rider,setRider] = useContext(RiderCategory)
    const [location,setLocation] = useContext(LocationContext)

    const ridePrice = <>        <div className="mb-3 bg-white p-3 rounded">
    <img style={{width:"60px"}} src={rider.imgURL ? rider.imgURL : data[0].imgURL} alt=""/> <p className=" d-inline ml-3 mr-2"> {rider.name? rider.name.toLowerCase():data[0].name.toLowerCase()}</p> <img style={{width:"20px"}} src={icon} alt=""/>
       <strong> <p className="d-inline"> {rider.capacity?rider.capacity:data[0].capacity}</p></strong> <span className="ml-5"> $100</span>
       </div>
    </>
    console.log(rider);
    return (
        <div className="container d-flex flex-column flex-md-row pt-5 mt-2 border-top justify-content-center">
       

        <div className="rider-price">

        <div className="fromToLocation p-3 text-white rounded ">
        <h3><span style={{color:"red",marginRight:"8px"}}>From</span>{location.from}Dhaka</h3>
        <h3 className="mt-3"><span style={{color:"red",marginRight:"8px"}}>To</span>{location.to}Rangpur</h3>

        </div>
           {ridePrice}
            {ridePrice}
            {ridePrice}
            {ridePrice}

        </div>
        <div className="mt-md-0 mt-5">
            <Map></Map>
        </div>
        </div>
            
    );
};

export default RiderPrice;