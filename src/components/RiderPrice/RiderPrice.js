import React, { useContext } from 'react';
import { LocationContext, RiderCategory } from '../../App';
import {data} from "../Data/Data"
import icon from "../../images/peopleicon.png"
import Map from '../Map/Map';

const RiderPrice = () => {
    const [rider,setRider] = useContext(RiderCategory)
    const [location,setLocation] = useContext(LocationContext)
    const ridePrice = <>        <div className="mb-3">
    <img style={{width:"60px"}} src={rider.imgURL ? rider.imgURL : data[0].imgURL} alt=""/> <p className=" d-inline ml-3 mr-2"> {rider.name? rider.name.toLowerCase():data[0].name.toLowerCase()}</p> <img style={{width:"20px"}} src={icon} alt=""/>
       <strong> <p className="d-inline"> {rider.capacity?rider.capacity:data[0].capacity}</p></strong> <span className="ml-5"> $100</span>
       </div>
    </>
    console.log(rider);
    return (
        <div className="container d-flex mt-5 justify-content-between">
        <p>{location.from}</p>
        <div>
 
           {ridePrice}
            {ridePrice}
            {ridePrice}

        </div>
        <div>
            <Map></Map>
        </div>
        </div>
            
    );
};

export default RiderPrice;