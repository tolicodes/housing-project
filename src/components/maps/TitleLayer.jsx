import React from 'react';
import { TileLayer } from 'react-leaflet';

export default () => (
  <TileLayer
    url="http://{s}.latimes.com/quiet-la-0.4.0/{z}/{x}/{y}.png"
    subdomains={['tiles1', 'tiles2', 'tiles3', 'tiles4']}
  />
);
