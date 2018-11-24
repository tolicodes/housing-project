import React from 'react';
import Header from './components/Header';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import BorrowerInfo from './components/BorrowerInfo';
import BottomBar from './components/BottomBar';

const App = () => (
  <div>
    <Header />
    <BorrowerInfo />
    <Map />
    <Sidebar />
    <BottomBar />
  </div>
);

export default App;
