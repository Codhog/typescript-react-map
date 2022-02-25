import React, {useState} from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet'


function LocationMarker() {
    const [position, setPosition] = useState(null)

    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            // @ts-ignore
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function LocationButton(){
    const getLocation =() =>{

    }
    return <button onClick={getLocation}></button>
}

function App() {

    return (
        <div className="myWrapper">
            {/*<button onClick={getLocation}>getLocation</button>*/}
            <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <LocationButton />
            </MapContainer>
        </div>

    )
}
export default App

