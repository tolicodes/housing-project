import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

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
    position: 'relative',
    marginRight: '300px',
    paddingTop: '10px',
    '@media screen and (max-width: 425px)': {
      width: '100%',
      paddingTop: '5px',
    }
  },
  fullWidth: {
    marginRight: 0,
  },
  buttons: {
    marginTop: '5px',
  },
  backButton: {
    marginLeft: '50px',
    marginRight: '10px',
    '@media screen and (max-width: 425px)': {
      marginLeft: '20px',
    }
  },
  marketReportLink: {
    color: 'inherit',
    textDecoration: 'none'
  }
})

class CityMap extends Component {
  state = {
    currentCity: null,
    currentNeighborhoods: [],
    displayHoodDetails: false,
  }

  componentDidUpdate({ editBorrower: oldEditBorrower }) {
    if (oldEditBorrower !== this.props.editBorrower) {
      this.props.changeView('city');
    }
  }

  onEachCityFeature = (feature, layer) => this.onEachFeature('city', feature, layer)

  onEachNeighborhoodFeature = (feature, layer) => this.onEachFeature('neighborhood', feature, layer)

  onEachFeature = (type, feature, layer) => {
    // Load the default style.
    layer.setStyle(defaultStyle);

    if (this.props.borrower.neighborhoods.includes(feature.properties.name)) {
      layer.setStyle(highlightStyle)
    }

    const properties = feature.properties;

    layer.on('mouseover', () => {
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
          this.setState({
            displayHoodDetails: false
          });
          
          const index = neighborhoods.indexOf(properties.name);
          neighborhoods.splice(index, 1)

          this.props.updateBorrower({
            ...this.props.borrower,
            neighborhoods,
          })
        } else {
          this.setState({
            displayHoodDetails: true,
            currentCity: properties.name
          })

          this.props.updateBorrower({
            ...this.props.borrower,
            neighborhoods: [
              ...this.props.borrower.neighborhoods,
              properties.name,
            ]
          });
        }

        if (this.props.view === 'city') {
          this.props.changeView('');
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
    const { classes, view, width } = this.props;
    const { city, neighborhoods } = this.props.borrower;

    const fullWidth = (['sm', 'xs'].includes(width)) ? classes.fullWidth : '';

    let zoomLevel = !city ? 10 - (fullWidth ? 1 : 0) : 11;

    let centerPoint = !city ?
      LA_CENTER
      : CENTERS[city];

    let lastNeighborhood;
    if (neighborhoods.length && this.props.view !== 'city') {
      lastNeighborhood = neighborhoods[neighborhoods.length - 1];
      centerPoint = getCenter(city, lastNeighborhood);

      zoomLevel = 12;
    }

    let iHomeFinderId;
    if (lastNeighborhood) {
      iHomeFinderId = MAPS[city].features.find(({ properties: { name } }) =>
        lastNeighborhood === name).properties.iHomeFinderId;
    }

    const mapData = !city ? la : MAPS[city];
    const mapKey = city || 'la';

    return (
      <div className={classes.mapContainer + ' ' + fullWidth}>
        <Map
          style={{
            height: `calc(100vh - ${fullWidth ? 340 : 260}px)`,
            marginRight: `${fullWidth ? 10 : 20}px`,
            marginLeft: `${fullWidth ? 10 : 20}px`,
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
              features: MAPS[city].features.filter(({ properties: { name } }) => neighborhoods.includes(name)),
            }}
            onEachFeature={this.onEachNeighborhoodFeature}
          />}
        </Map>

        {
          <HoodDetailsBox
            displayHoodDetails={this.state.displayHoodDetails}
            name={this.state.currentCity}
          />
        }
        <div className={classes.buttons}>
          {city && <Button
            size="small"
            variant="contained"
            className={classes.backButton}
            onClick={this.handleBackButton}
          >
            Zoom Out
        </Button>}

          {iHomeFinderId && <Button
            size="small"
            variant="contained"
            color="primary"
          ><a
            className={classes.marketReportLink}
            target="_blank"
            href={`http://www.idxhome.com/report/market-report/Agoura-Hills/121429/${iHomeFinderId}`}
          >
              Market Report
        </a></Button>}
        </div>
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(connect(
  ({ app: { borrowers, editBorrower } }) => {
    return {
      editBorrower,
      borrower: editBorrower
        ? borrowers.find(({ id }) => id === editBorrower)
        : borrowers[borrowers.length - 1]
    };
  },
  dispatch => bindActionCreators({
    updateBorrower,
  }, dispatch),
)(CityMap)));