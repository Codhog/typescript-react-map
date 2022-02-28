import React, {createContext, useEffect, useState} from "react";
import { Marker, Popup, useMapEvents} from 'react-leaflet'
import MapComponent from "./MapComponents";
import Location from "./components/Location"

export interface MapInfoInterface {
    position: PositionType
    currLocation?: PositionType
    setPosition: (arg:PositionType) => void
}
export interface PositionType {
    lat: number
    lng: number

}
export const MapInfoContext = createContext<MapInfoInterface>({
    position:{ lat: 51.505, lng: -0.09 },
    setPosition: () => null
});

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
        <Marker position={position}

        >
            <Popup>You are here</Popup>
        </Marker>
    )
}

function App() {
    const [position, setPosition] = useState<PositionType>({ lat: 51.505, lng: -0.09 });
    const [coordArr, setCoordArr] =useState<[[number, number]]>([[0,0]]);



    return (
        <MapInfoContext.Provider value={
            {
                position,
                setPosition
            }
        }>
            <section className="myWrapper">
                {/*<button onClick={getLocation}>getLocation</button>*/}
                {/*<MapContainer center={position} zoom={13}>*/}
                {/*    <TileLayer*/}
                {/*        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                {/*        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                {/*    />*/}
                {/*    <LocationMarker />*/}
                {/*</MapContainer>*/}
                <MapComponent />
                <Location />
            </section>
        </MapInfoContext.Provider>


    )
}
export default App

