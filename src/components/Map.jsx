
import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

export default () => (

  <Map style={{ height: 300 }} center={[51.505, -0.09]} zoom={13} zoomControl={false}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </Map>
);
