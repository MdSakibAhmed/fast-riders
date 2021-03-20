import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { LocationContext, RiderCategory } from '../../App';

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
        <div className="container mt-5 d-flex justify-content-between">
            <div >

                <label className="d-block" htmlFor="">
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

                <button className="mt-3 btn-success rounded" onClick={handleRidePrice}>search</button>

            </div>
            <div >
<h1>Google map</h1>
            </div>
        </div>
    );
};

export default Location;