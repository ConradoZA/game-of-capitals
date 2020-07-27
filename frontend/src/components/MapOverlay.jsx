import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { Map } from "./Map";

export const MapOverlay = ({ question, result, onMapClick, display }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
      <Map
        className="map"
        onMapClick={onMapClick}
        question={{ lat: question.lat, lng: question.lng }}
        result={result}
        display={display}
      />
    </LoadScript>
  );
};
