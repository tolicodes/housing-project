import React from 'react';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import Header from './components/Header';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import BorrowerInfo from './components/BorrowerInfo';
import BottomBar from './components/BottomBar';

import aws_exports from './aws-exports';

// Amplify.configure(aws_exports);

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

// export default withAuthenticator(
//   App,
//   true,
//   [],
//   {
//     facebook_app_id: 2051447911813001,
//   },
// );
