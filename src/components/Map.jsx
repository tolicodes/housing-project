import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { Map, GeoJSON } from 'react-leaflet';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateBorrower } from './App/actions';

import { getCenter, MAPS, CENTERS, LA_CENTER } from './maps/utils';
import la from './maps/la';
import TitleLayer from './maps/TitleLayer';

import HoodDetailsBox from './HoodDetailsBox';

/* Neighborhood */
let defaultStyle = {
  color: '#2262CC',
  weight: 2,
  opacity: 0.6,
  fillOpacity: 0.1,
  fillColor: '#2262CC',
};

const highlightStyle = {
  ...defaultStyle,
  weight: 3,
  fillOpacity: 0.65,
};

const styles = () => ({
  mapContainer: {
    marginRight: '300px',
    paddingTop: '20px',
  },
  backButton: {
    marginLeft: '50px',
    marginTop: '5px',
  }
})

class CityMap extends Component {
  state = {
    currentCity: null,
    currentNeighborhoods: [],
    displayHoodDetails: false,
  }

  onEachCityFeature = (feature, layer) => this.onEachFeature('city', feature, layer)

  onEachNeighborhoodFeature = (feature, layer) => this.onEachFeature('neighborhood', feature, layer)

  onEachFeature = (type, feature, layer) => {
    // Load the default style.
    layer.setStyle(defaultStyle);

    const properties = feature.properties;

    layer.on('mouseover', () => {
      // check to see if we are hovering over a neighborhood or not
      if (type === 'neighborhood') {
        this.setState({
          displayHoodDetails: true,
          currentCity: feature.properties.name
        })
      } else {
        this.setState({
          displayHoodDetails: false,
        })
      }
      layer.setStyle(highlightStyle);
    });

    layer.on('mouseout', () => {
      if (!this.props.borrower.neighborhoods.includes(properties.name)) {
        layer.setStyle(defaultStyle);
      }
    });

    layer.on('click', () => {
      const { neighborhoods } = this.props.borrower;

      if (type === 'city') {
        this.props.updateBorrower({
          ...this.props.borrower,
          city: properties.name,
          neighborhoods: [],
        })
      } else {
        // if we click on a neighborhood that is already selected, remove it from the list of selected neighborhoods
        if (neighborhoods.includes(properties.name)) {
          const index = neighborhoods.indexOf(properties.name);
          neighborhoods.splice(index, 1)

          this.props.updateBorrower({
            ...this.props.borrower,
            neighborhoods,
          })
        } else {
          this.props.updateBorrower({
            ...this.props.borrower,
            neighborhoods: [
              ...this.props.borrower.neighborhoods,
              properties.name,
            ]
          });

          if (this.props.view === 'city') {
            this.props.changeView('');
          }
        }
      };
    });
  };

  handleBackButton = () => {
    const { neighborhoods } = this.props.borrower;

    if (neighborhoods.length) {
      this.props.updateBorrower({
        ...this.props.borrower,
        neighborhoods: [],
      })
    } else {
      this.props.updateBorrower({
        ...this.props.borrower,
        city: '',
        neighborhoods: [],
      })
    }

    this.setState({
      displayHoodDetails: false,
    })
  };

  render() {
    const { classes, view } = this.props;

    const { city, neighborhoods } = this.props.borrower;

    let zoomLevel = !city ? 10 : 11;

    let lastNeighborhood;

    let centerPoint = !city ?
      LA_CENTER
      : CENTERS[city];

    if (neighborhoods.length && this.props.view !== 'city') {
      lastNeighborhood = neighborhoods[neighborhoods.length - 1];
      centerPoint = getCenter(city, lastNeighborhood);

      zoomLevel = 12;
    }

    const mapData = !city ? la : MAPS[city];
    const mapKey = city || 'la';

    const button = !city ?
      null
      : <Button
        size="small"
        variant="contained"
        className={classes.backButton}
        onClick={this.handleBackButton}
      >
        Zoom Out
      </Button>;

    return (
      <div className={classes.mapContainer}>
        <Map
          style={{
            height: 'calc(100vh - 260px)',
            marginRight: '50px',
            marginLeft: '50px',
          }}
          zoomControl={false}
          scrollWheelZoom={false}
          touchZoom={false}
          doubleClickZoom={false}

          zoom={zoomLevel}
          center={centerPoint}
        >

          <TitleLayer />

          {neighborhoods.length === 0 && <GeoJSON
            key="la"
            data={la}
            onEachFeature={this.onEachCityFeature}
          />}

          {city && (neighborhoods.length === 0 || view === 'city') && <GeoJSON
            key={mapKey}
            data={mapData}
            onEachFeature={this.onEachNeighborhoodFeature}
          />}

          {city && neighborhoods.length && <GeoJSON
            key={neighborhoods}
            data={{
              type: 'FeatureCollection',
              features: MAPS[city].features.filter(({ properties: { name } }) => lastNeighborhood === name),
            }}
          />}
        </Map>
        {button}
        <HoodDetailsBox displayHoodDetails={this.state.displayHoodDetails} name={this.state.currentCity} />
      </div>
    );
  }
}

export default withStyles(styles)(connect(
  ({ app: { borrowers } }) => ({
    borrower: borrowers[borrowers.length - 1],
  }),
  dispatch => bindActionCreators({
    updateBorrower,
  }, dispatch),
)(CityMap));