import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

export default () => (
  <div>
    <Map
      center={{
        lat: 51.505,
        lng: -0.09,
      }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  </div>
);
