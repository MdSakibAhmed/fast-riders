import React from 'react';
import { data } from '../Data/Data';
import Riders from '../Riders/Riders';

const Home = () => {
    
    
   
   
    
    return (
        <div className="d-flex justify-content-center container pt-5" style={{background:"url(../../images/unnamed.jpg)"}}>

        {
            data.map(rider => <Riders key={rider.name} currentRider={rider}></Riders>)
        }
            
        </div>
    );
};

export default Home;