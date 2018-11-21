import { withStyles } from '@material-ui/core/styles';
import { Authenticator } from 'aws-amplify-react';

import React from 'react';

import awsExports from '../../aws-exports';

const FEDERATED_LOGINS = {
  facebook_app_id: 2051447911813001,
  google_client_id: '1051302649339-853p882uvu071n3nuka9aat63fha5je8.apps.googleusercontent.com',
};

const styles = {
  modal: {
    position: 'fixed',
    zIndex: 10000,
    width: 600,
    height: 600,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgoundColor: 'white',
  },
};

const LoginModal = ({ classes }) => (
  <div className={classes.modal}>
    <Authenticator
      authState="signIn"
      federated={FEDERATED_LOGINS}
      // hideDefault
      amplifyConfig={awsExports}
    />
  </div>
);

export default withStyles(styles)(LoginModal);
