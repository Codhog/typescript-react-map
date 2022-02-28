import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import {useContext, useEffect, useState} from "react";
import {PositionType, MapInfoContext, MapInfoInterface} from "./App"
import {GeoSearchControl, GoogleProvider} from "leaflet-geosearch";
const MapComponent = () => {
    const contextObj:MapInfoInterface = useContext(MapInfoContext)
    const {lat, lng} = contextObj.position
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const provider = new GoogleProvider({
        params: {
            key: 'AIzaSyANSWGGKWdYU0EMBrbEG5yS-TrfpdzrgpQ',
        },
    });




    const Markers = () => {

        const map = useMapEvents({
            click(e) {
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })

        return (
            selectedPosition ?
                <Marker
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    interactive={false}
                />
                : null
        )

    }


    return(
        <MapContainer
            // center={selectedPosition || initialPosition}
            center={{lat, lng}}
            zoom={12}
        >
            {/*<SearchBox />*/}
            <Markers />
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default MapComponent