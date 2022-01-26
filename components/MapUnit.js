import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from "@env";

import tw from 'twrnc';

const MapUnit = () => {
  // Retrieve origin from the Redux store using the selector that carries the navigation slice.
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  // useRef holds a reference or a pointer to a mutable object
  const mapRef = useRef(null);

  const dispatch = useDispatch();

  // useEffect decouples the side effects from the rendering.
  // When the dependency changes, the hook will execute the callback.
  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom & fit to markers on the map view
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async() => {
      // Make a GET request to the Google Distance Matrix API
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial
        &origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
        )
      .then((res) => res.json())
      .then(data => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
      });
    }

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);


  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {
        origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )
      }
      {origin?.location &&
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      }
      {destination?.location &&
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      }
    </MapView>
  );
};

export default MapUnit;
