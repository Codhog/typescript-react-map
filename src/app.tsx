import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker} from 'react-map-gl';
import mapboxgl from 'mapbox-gl'
import GeocoderControl from './geocoder-control';

import LocationInfo from "./LocationInfo";
import {createContext, useEffect, useMemo, useState} from "react";
import Pin from './Pin';
import './App.css'
import CITIES from './CITIES.json'

export interface LocationType {
    lat: number
    lng: number

}

export interface MapInfoInterface {
    coorArr: [LocationType]
    setCoorArr: (arg:LocationType) => void
}

export const MapInfoContext = createContext<MapInfoInterface>({
    positionArr:[],
    addSelectPosition: () => null
});

// eslint-disable-next-line
// const TOKEN = process.env.MapboxAccessToken; // Set your mapbox token here
const TOKEN = 'pk.eyJ1IjoiY2hlbno4NyIsImEiOiJja3VoYjB1ODgyZDJzMm5rNm90NzRjenp4In0.kTrjt38_JFTjLindaWKt8w'; // Set your mapbox token here



export default function App() {
    const [coorArr, setCoorArr] = useState<[LocationType]>([{lat: -79.4488729, lng: 43, name: "2333 "}])
    const [popupInfo, setPopupInfo] = useState(null);

    const addSelectPosition = (data) =>{
        const {result} = data
        const [latNum,lngNum] = result.geometry.coordinates
        setCoorArr((prevArr)=>[...prevArr, {
            lat:latNum,
            lng: lngNum,
            name: result['place_name'].split(',')[0]
        }])
    }
    const pins = useMemo(
        () =>
            coorArr.map((city, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={city.lng}
                    latitude={city.lat}
                    // anchor="bottom"
                    mapboxgl={mapboxgl}
                >
                    <Pin />


                </Marker>
            )),
        [coorArr]
    );
  // @ts-ignore
    return (
        <MapInfoContext.Provider value={
            {
                coorArr,
                addSelectPosition
            }
        }>
            <section className="main-wrapper">
                <div className='map-container'>
                    <Map
                        initialViewState={{
                            longitude: -79.4512,
                            latitude: 43.6568,
                            zoom: 13
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={TOKEN}
                    >
                        <GeocoderControl
                            onResult={(data)=>addSelectPosition(data) }
                            mapboxAccessToken={TOKEN}
                            marker={false}
                            position="top-right"
                            addArray={addSelectPosition}
                        />
                        {/*{pins}*/}
                        {  coorArr.map((city, index) => (
                            <Marker
                                key={`marker-${index}`}
                                longitude={city.lng}
                                latitude={city.lat}
                                >
                                <Pin />
                            </Marker>
                        ))}
                    </Map>

                </div>


                <LocationInfo />

            </section>
        </MapInfoContext.Provider>


  );
}

export function renderToDom(container) {
  render(<App />, container);
}
