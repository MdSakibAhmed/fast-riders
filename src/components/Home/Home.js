import React from 'react';
import { data } from '../Data/Data';
import Riders from '../Riders/Riders';
import bgimg from "../../images/unnamed.jpg"

const Home = () => {
    
   const  setBgImg={ 
        backgroundImage: `url(${bgimg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        marginTop:"40px"
      }
   
   
    
    return (
        // <div className="d-flex justify-content-center container pt-5" style={setBgImg}>

        // {
        //     data.map(rider => <Riders key={rider.name} currentRider={rider}></Riders>)
        // }
<div style={setBgImg} className="container-fluid pt-4">
        <div style={setBgImg} className="container  pt-4   text-center  mt-5">
        <div className=" d-flex flex-column flex-md-row flex-wrap justify-content-md-around align-items-md-start justify-content-sm-center align-items-sm-center ">
        {
            data.map(rider => <Riders key={rider.name} currentRider={rider}></Riders>)
        }
        </div>
        </div>
      </div>
            
        // </div>
    );
};

export default Home;