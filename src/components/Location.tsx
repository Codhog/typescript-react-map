import React, {useContext} from 'react';
import {MapInfoContext, MapInfoInterface, PositionType} from "../App";

const Location = () => {
    const contextObj:MapInfoInterface = useContext(MapInfoContext)
    const {position} = contextObj
    return (
        <div className="location-page">
            <h1>Accuenergy Map</h1>
            <LocationButton />
            <h6>Your Current Location:{position.lat} {position.lng}</h6>
            <ul>

            </ul>
        </div>
    );
};

function LocationButton(){
    const contextObj:MapInfoInterface = useContext(MapInfoContext)
    const {setPosition} = contextObj
    const getLocation =() =>{
        navigator.geolocation.getCurrentPosition(position => {
            let {latitude:lat, longitude:lng} = position.coords
            setPosition({lat, lng});
            console.log(position.coords)

        });
    }
    return <button onClick={getLocation} className="location-button">Click to get Location</button>
}


export default Location;