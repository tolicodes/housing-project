
import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import sanFernandoValley from './maps/sanFernandoValley';
// import santaMonicaMountains from './maps/santaMonicaMountains';

export default () => (
  <Map
    style={{
      height: 'calc(100vh - 200px)',
      marginRight: '300px',
    }}

    zoomControl={false}
    scrollWheelZoom={false}
    touchZoom={false}
    doubleClickZoom={false}
    dragging={false}
    maxZoom={16}
    minZoom={8}

    zoom={11}

    center={[34.228206809, -118.4674801745]}

    maxBounds={new L.LatLngBounds(
      new L.LatLng(34.1191069991, -118.668153),
      new L.LatLng(34.337306718, -118.266807349),
    )}
  >
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="http://{s}.latimes.com/quiet-la-0.4.0/{z}/{x}/{y}.png"
      subdomains={['tiles1', 'tiles2', 'tiles3', 'tiles4']}
    />

    <GeoJSON
      data={sanFernandoValley}
    // data={santaMonicaMountains}
    />

  </Map>
);
