import React from 'react';
import Header from './components/Header';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import BorrowerInfo from './components/BorrowerInfo';
import BottomBar from './components/BottomBar';

class App extends React.Component {
  state = {
    mapView: ''
  }

  addNeighborhood = () => {
    this.setState({
      mapView: 'city'
    })
  }

  changeMapView = (view) => {
    this.setState({
      mapView: view
    });
  }

  render() {
    return (
      <div>
        <Header />
        <BorrowerInfo />
        <Map
          view={this.state.mapView}
          changeView={this.changeMapView}
        />
        <Sidebar />
        <BottomBar
          addNeighborhood={this.addNeighborhood}
          addAnotherBorrower={this.addAnotherBorrower}
        />
      </div>
    );
  }
}

export default App;
