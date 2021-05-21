import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import styles from './style.module.scss';

function MapView({ studios, google, selectedStudio, history }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showingInfoWindow, setShowingWindow] = useState(false);
  const [bounds, setBounds] = useState(null);
  const [activeStudio, setActiveStudio] = useState(false);

  const onClickMarker = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);

    setShowingWindow(true);
  };

  const onCloseInfoWindow = () => {
    setActiveMarker(null);
    setShowingWindow(false);
  };

  const onClickMap = () => {
    if (showingInfoWindow) {
      setShowingWindow(false);
    }
  };

  useEffect(() => {
    if (google) {
      let newBounds = new google.maps.LatLngBounds();
      for (let i = 0; i < studios.length; i++) {
        newBounds.extend(studios[i].location);
      }
      setBounds(newBounds);
    }

    if (activeStudio !== selectedStudio) {
      setActiveStudio(selectedStudio);
    }
  }, [studios, selectedStudio]);

  console.log("map props  --- ", studios);

  return (
    <div>
      
    <div className={styles.deskMapView} >
      <Map
      className={styles.mapView}
      
      google={google}
      onClick={onClickMap}
      center={activeStudio ? activeStudio.location : null}
      style={{ height: "calc(100vh - 400px)", position: "relative", margin: "30px" }}
      bounds={bounds}
    >
      {studios &&
        studios.map((studio) => (
          <Marker
            key={studio.id}
            studio={studio}
            onClick={onClickMarker}
            position={studio.location}
          />
        ))}
      <InfoWindow
        marker={activeMarker}
        onClose={onCloseInfoWindow}
        visible={showingInfoWindow}
      >
        {selectedPlace ? (
          <div>
            <p
              className={styles.meta}
            >
              {selectedPlace.studio.name}
            </p>

            <p
              className={styles.meta}
            >
              $ {selectedPlace.studio.price}
            </p>
            <p
              className={styles.meta}
            >
              {/* <RoomIcon className={classes.inline} fontSize="small" />{" "} */}
              {selectedPlace.studio.address}
            </p>

            <p variant="caption" display="block" >
              {selectedPlace.studio.owner.name}
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </InfoWindow>
    </Map>
    </div>
    <div className={styles.mobMapView} >
      <Map
      className="map"
      google={google}
      onClick={onClickMap}
      center={activeStudio ? activeStudio.location : null}
      style={{ height: "calc(100vh - 80px)", position: "fixed", width: "100%", top: "70px", left: "0px"  }}
      bounds={bounds}
    >
      {studios &&
        studios.map((studio) => (
          <Marker
            key={studio.id}
            studio={studio}
            onClick={onClickMarker}
            position={studio.location}
          />
        ))}
      <InfoWindow
        marker={activeMarker}
        onClose={onCloseInfoWindow}
        visible={showingInfoWindow}
      >
        {selectedPlace ? (
          <div>
            <p
              className={styles.meta}
            >
              {selectedPlace.studio.name}
            </p>

            <p
              className={styles.meta}
            >
              $ {selectedPlace.studio.price}
            </p>
            <p
              className={styles.meta}
            >
              {/* <RoomIcon className={classes.inline} fontSize="small" />{" "} */}
              {selectedPlace.studio.address}
            </p>

            <p variant="caption" display="block" >
              {selectedPlace.studio.owner.name}
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </InfoWindow>
    </Map>
    </div>

    </div>

  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API_KEY,
})(MapView);
