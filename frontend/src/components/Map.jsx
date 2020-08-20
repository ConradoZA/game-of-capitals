import React, { useRef, useEffect, useContext } from "react";
import SetupContext from "../context/setup-context";
import QuizContext from "../context/quiz-context";
import { Map, TileLayer, LayersControl, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { fixIcon } from "../fixLeafletIcon";
import { useStyles } from "../data/extraFunctions/materialStyles";
import { geoLocations } from "../data/extraFunctions/functions";

export const ActualMap = ({ displayObjetive }) => {
  const { BaseLayer } = LayersControl;
  fixIcon();

  const { continent, difficulty } = useContext(SetupContext);
  const { quizLatLng, userGuess, setNewGuess } = useContext(QuizContext);

  let newLocation = geoLocations(continent);
  let CENTER = newLocation.center;

  const mapRef = useRef();
  const getMapRef = () => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    return map;
  };

  const markerRef = useRef();
  const getMarkerRef = () => {
    const { current = {} } = markerRef;
    const { leafletElement: Marker } = current;
    return Marker;
  };

  const classes = useStyles();

  const objective = new Icon({
    iconUrl: "/gps.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  // useEffect(() => {
  //   newLocation = geoLocations(continent);
  //   GoTo(CENTER);
  // }, [newGame]);

  useEffect(() => {
    if (!displayObjetive) {
      GoTo(CENTER, 4.3);
    } else {
      GoTo(quizLatLng, 7);
    }
  }, [displayObjetive]);

  const GoTo = (coordinates, zoomLevel) => {
    getMapRef().flyTo(coordinates, zoomLevel, { duration: 1.5 });
  };

  const onClick = (event) => {
    const coordinates = event.latlng;
    const zoom = getMapRef().getZoom();
    GoTo(coordinates, zoom);
    setNewGuess(coordinates);
  };

  const updateResult = () => {
    const updatedMarker = getMarkerRef();
    if (updatedMarker !== null) {
      setNewGuess(updatedMarker.getLatLng());
    }
  };

  return (
    <Map
      className={classes.map}
      ref={mapRef}
      animate={true}
      center={CENTER}
      maxZoom={13}
      zoom={4}
      zoomSnap={0.1}
      zoomDelta={0.3}
      onClick={onClick}
    >
      <LayersControl>
        {difficulty === "easy" && (
          <BaseLayer name="EASY Map">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.mapbox.com/styles/v1/zaknar/ckdro50ni05yr19uhuurkjxkm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrbmFyIiwiYSI6ImNrZDYwbDBlcTBkNG4zMHJhd2k2MDFzdDEifQ.vHMVcC1pxUIB4NrNr2QX6Q"
            />
          </BaseLayer>
        )}
        <BaseLayer checked name="Classic Map">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/zaknar/ckd63bqbe0d251im97xz0vmdo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrbmFyIiwiYSI6ImNrZDYwbDBlcTBkNG4zMHJhd2k2MDFzdDEifQ.vHMVcC1pxUIB4NrNr2QX6Q"
          />
        </BaseLayer>
        {difficulty === "hard" && (
          <BaseLayer name="NASA Blue Marble">
            <TileLayer
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              maxNativeZoom={8}
            />
          </BaseLayer>
        )}
      </LayersControl>
      {displayObjetive && <Marker position={quizLatLng} icon={objective} />}
      {Object.keys(userGuess).length > 0 && (
        <Marker
          draggable
          ref={markerRef}
          ondragend={updateResult}
          position={userGuess}
        >
          <Popup>
            <span>
              Lat: {+userGuess.lat.toFixed(4)}, Long:{" "}
              {+userGuess.lng.toFixed(4)}
            </span>
          </Popup>
        </Marker>
      )}
    </Map>
  );
};
