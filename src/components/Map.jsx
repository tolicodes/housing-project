
import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import la from './maps/la';
import sanFernandoValley from './maps/sanFernandoValley';
import santaMonicaMountains from './maps/santaMonicaMountains';
import theWestside from './maps/theWestside';
import theVerdugos from './maps/theVerdugos';

/* Neighborhood */
const defaultStyle = {
  color: '#2262CC',
  weight: 2,
  opacity: 0.6,
  fillOpacity: 0.1,
  fillColor: '#2262CC',
};

const highlightStyle = {
  color: '#2262CC',
  weight: 3,
  opacity: 0.6,
  fillOpacity: 0.65,
  fillColor: '#2262CC',
};

const onEachFeature = (feature, layer) => {
  // Load the default style.
  layer.setStyle(defaultStyle);

  const properties = feature.properties;

  layer.on('mouseover', () => {
    console.log(feature, layer);
    layer.setStyle(highlightStyle);

    layer.on('mouseout', () => {
      layer.setStyle(defaultStyle);
    });

    layer.on('click', () => {

    });
  });
};

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

    zoom={10}

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
      data={la}
      onEachFeature={onEachFeature}

    // data={santaMonicaMountains}
    />

  </Map>
);
