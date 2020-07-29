import React, { useRef, useEffect } from "react";
import { Map, TileLayer, LayersControl, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { fixIcon } from "../fixLeafletIcon";
// import useSwr from "swr";

export const ActualMap = ({ question, result, onMapClick, display }) => {
  fixIcon();

  const quiz = { lat: parseFloat(question.lat), lng: parseFloat(question.lng) };
  const mapRef = useRef();
  const { BaseLayer } = LayersControl;
  const objective = new Icon({
    iconUrl: "../assets/gps.svg",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const EUROPE_CENTER = [58.02956979905358, 10.56937075425759];

  useEffect(() => {
    if (!display) {
      GoTo(EUROPE_CENTER, 4);
    } else {
      GoTo(quiz, 7);
    }
  }, [display]);

  const GoTo = (coordinates, zoomLevel) => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.flyTo(coordinates, zoomLevel, { duration: 1 });
  };

  const onClick = (event) => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const coordinates = event.latlng;
    const zoom = map.getZoom();
    GoTo(coordinates, zoom);
    onMapClick(coordinates);
  };

  const EUROPE_BOUNDS = [
    [71.304858, -11.1632],
    [35.62686, 26.79504],
  ];

  return (
    <Map
      style={{ width: "77vw", height: "70vh" }}
      ref={mapRef}
      animate={true}
      bounds={EUROPE_BOUNDS}
      center={EUROPE_CENTER}
      maxZoom={12}
      maxBoundsViscosity={0.4}
      zoom={4}
      zoomSnap={0.1}
      zoomDelta={0.3}
      onClick={onClick}
    >
      <LayersControl>
        <BaseLayer checked name="Classic Map">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPSTUDIO_USER}/${process.env.REACT_APP_MAPSTUDIO_ID}/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPSTUDIO_TOKEN}`}
          />
        </BaseLayer>
        <BaseLayer name="NASA Blue Marble">
          <TileLayer
            attribution="&copy; NASA Blue Marble, image service by OpenGeo"
            url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
            maxNativeZoom={8}
          />
        </BaseLayer>
      </LayersControl>

      {display && <Marker position={quiz} icon={objective} />}
      {Object.keys(result).length > 0 && <Marker position={result} />}
    </Map>
  );
};
