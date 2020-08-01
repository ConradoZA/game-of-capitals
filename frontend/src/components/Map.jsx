import React, { useRef, useEffect, useCallback } from "react";
import { Map, TileLayer, LayersControl, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { fixIcon } from "../fixLeafletIcon";
import { useStyles } from "../data/materialStyles";
import { geoLocations } from "./functions";

export const ActualMap = ({
  question,
  result,
  onMapClick,
  display,
  continent,
  reset,
  newGame,
}) => {
  const { BaseLayer } = LayersControl;
  fixIcon();
  let newLocation = useCallback(geoLocations(continent), [newGame]);
  let CENTER = newLocation.center;
  let BOUNDS = newLocation.bounds;
  const quiz = { lat: parseFloat(question.lat), lng: parseFloat(question.lng) };
  const mapRef = useRef();
  const classes = useStyles();

  const objective = new Icon({
    iconUrl: "../assets/gps.png",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  useEffect(() => {
    newLocation = geoLocations(continent);
    CENTER = newLocation.center;
    BOUNDS = newLocation.bounds;
    GoTo(CENTER);
  }, [newGame]);

  useEffect(() => {
    if (!display) {
      GoTo(CENTER, 4);
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

  return (
    <Map
      className={classes.map}
      ref={mapRef}
      animate={true}
      maxBounds={BOUNDS}
      center={CENTER}
      maxZoom={12}
      maxBoundsViscosity={0.5}
      zoom={4}
      zoomSnap={0.1}
      zoomDelta={0.3}
      onClick={onClick}
    >
      <LayersControl>
        <BaseLayer checked name="Classic Map">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/zaknar/ckd63bqbe0d251im97xz0vmdo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrbmFyIiwiYSI6ImNrZDYwbDBlcTBkNG4zMHJhd2k2MDFzdDEifQ.vHMVcC1pxUIB4NrNr2QX6Q"
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

      {display && <Marker position={quiz} />}
      {/* {display && <Marker position={quiz} icon={objective} />} */}
      {Object.keys(result).length > 0 && <Marker position={result} />}
    </Map>
  );
};
