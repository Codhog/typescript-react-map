import * as ReactDOM from 'react-dom';
import './index.css';
import styles from 'leaflet/dist/leaflet.css';

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
// import App from "./App";
import React from "react";
import App from "./App";


const container = document.getElementById('root');
// Create a root.
// @ts-ignore
const root = ReactDOM.createRoot(container);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
