import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { LocationContext, RiderCategory } from '../../App';
import SimpleMap from '../Map/Map';
import "./Location.css"

const Location = () => {
    const [rider,setRider] = useContext(RiderCategory)
    const [location,setLocation] = useContext(LocationContext)
    const handleChange = (e) => {
        const newLocation =  {...location}
        newLocation[e.target.name]= e.target.value;
        setLocation(newLocation)
    }
    const history = useHistory()
    const handleRidePrice = () => {
        history.replace(`/rider/${rider.name? rider.name:`bike`}`)



    }
    return (
        <div className="container pt-5 d-flex flex-column flex-md-row justify-content-center border-top ">
            <div className="location-search mr-4">

                <label className="d-block bold" htmlFor="">
                    Pick from
                    <input className="d-block" onBlur={handleChange} name="from" type="text"/>

                </label>
                <label className="d-block mt-2" htmlFor="">
                    Pick to
                 <input className="d-block " onBlur={handleChange} name="to" type="text"/>

                </label>
                <label className="d-block mt-2" htmlFor="">
                    Date
                    <input className="d-block" type="date" name="" id=""/>
                </label> <label className="d-block mt-2" htmlFor="">
                    Time
<input className="d-block" type="time" name="" id=""/>
                </label>

                <button className="mt-4 btn-primary border-0 p-2 rounded" onClick={handleRidePrice}>search</button>

            </div>
            <div className="mt-md-0 mt-5" >
<SimpleMap></SimpleMap>
            </div>
        </div>
    );
};

export default Location;