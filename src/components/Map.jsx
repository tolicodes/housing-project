
import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import turf from 'turf';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateBorrower } from './App/actions'

import la from './maps/la';
import sanFernandoValley from './maps/sanFernandoValley';
import santaMonicaMountains from './maps/santaMonicaMountains';
import theWestside from './maps/theWestside';
import theVerdugos from './maps/theVerdugos';

// import CityDetailsBox from './CityDetailsBox';

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

const MAPS = {
  'San Fernando Valley': sanFernandoValley,
  'Santa Monica Mountains': santaMonicaMountains,
  'Westside': theWestside,
  'Verdugos': theVerdugos,
};

const centers = {
  'San Fernando Valley': [34.228206858549996, -118.4674801745],
  'Santa Monica Mountains': [34.08857698855, -118.75480809449999],
  'Westside': [34.04733700695, -118.4783734895],
  'Verdugos': [34.2052679991, -118.201619]
};

class CityMap extends Component {
  state = {
    currentCity: null,
    currentNeighborhoods: []
  }

  onEachFeature = (feature, layer) => {
    const { city } = this.props.borrower;

    // Load the default style.
    layer.setStyle(defaultStyle);

    const properties = feature.properties;

    layer.on('mouseover', () => {
      layer.setStyle(highlightStyle);
    });

    layer.on('mouseout', () => {
      if (!this.props.borrower.neighborhoods.includes(properties.name)) {
        layer.setStyle(defaultStyle);
      }
    });

    layer.on('click', () => {
      console.log("Properties.name", properties.name)
      if (!city) {
        this.props.updateBorrower({
          ...this.props.borrower,
          city: properties.name,
          neighborhoods: [],
        })
      } else {
        this.props.updateBorrower({
          ...this.props.borrower,
          neighborhoods: [
            ...this.props.borrower.neighborhoods,
            properties.name
          ]
        })

        layer.setStyle(highlightStyle);
      }
    });
  };
  render() {
    const { city, neighborhoods } = this.props.borrower;

    let zoomLevel = !city ? 10 : 11;

    let centerPoint = !city ?
      [34.228206809, -118.4674801745]
      : centers[city];

    if (neighborhoods.length) {
      const lastNeighborhood = neighborhoods[neighborhoods.length - 1];

      const [lng, lat] = turf.center(MAPS[city].features.find(({ properties: { name } }) => name === lastNeighborhood)).geometry.coordinates;

      centerPoint = [lat, lng];

      zoomLevel = 12;
    }

    const mapData = !city ? la : MAPS[city];
    const mapKey = city || 'la';

    return (
      <Map
        ref={(map) => {
          this.map = map && map.leafletElement;
        }}
        style={{
          height: 'calc(100vh - 200px)',
          marginRight: '300px',
        }}

        zoomControl={false}
        scrollWheelZoom={false}
        touchZoom={false}
        doubleClickZoom={false}

        zoom={zoomLevel}

        center={centerPoint}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.latimes.com/quiet-la-0.4.0/{z}/{x}/{y}.png"
          subdomains={['tiles1', 'tiles2', 'tiles3', 'tiles4']}
        />

        <GeoJSON
          key="la"
          data={la}
          onEachFeature={this.onEachFeature}
        />
        {city && <GeoJSON
          key={mapKey}
          data={mapData}
          onEachFeature={this.onEachFeature}
        />}
      </Map>
    );
  }
}

export default (connect(
  ({ app: { borrowers } }) => ({
    borrower: borrowers[borrowers.length - 1],
  }),
  dispatch => bindActionCreators({
    updateBorrower,
  }, dispatch),
)(CityMap));