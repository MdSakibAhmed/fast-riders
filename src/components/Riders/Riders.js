import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { RiderCategory } from '../../App';

const Riders = ({currentRider}) => { 
    const history = useHistory() 
    const [rider,setRider] =  useContext(RiderCategory)
    const handleRideSelection = () => {
        history.push("/location")
        setRider(currentRider)
          
    }

    return (
        <div onClick={handleRideSelection} className="w-25 text-center border">
            
            <img style={{width:"250px"}} src={currentRider.imgURL} alt=""/>
            <h3>{currentRider.name}</h3>
        </div>
    );
};

export default Riders;