import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { register, getSocket } from './api';
import OAuth from './OAuth';
import RegistrationFields from './RegistrationFields';

const styles = {
    socialButtonsContainer: {
        marginTop: '40px',
        marginBottom: '30px',
        textAlign: 'center',
    },
    textField: {
        width: '100%',
    },
    submit: {
        marginTop: '20px'
    }
};

const PROVIDERS = [
    'facebook',
    'linkedin',
    'google'
]

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoggedInWithSocial: false,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onClickSubmit = () => {
        const { email, password, confirmPassword, mlsNumber, phone } = this.state;

        if (password !== confirmPassword) {
            return alert('Passwords must match');
        }

        register({
            email,
            password,
        });
    }


    render() {
        const { classes } = this.props;
        const { email, password, confirmPassword, mlsNumber, phone } = this.state;

        // const Auth = PROVIDERS.map(provider =>
        //     <OAuth
        //         provider={provider}
        //         key={provider}
        //         socket={this.socket}
        //         update={this.updateRegistrationView}
        //     />
        // );

        // const { isLoggedInWithSocial } = this.state;

        // const display = isLoggedInWithSocial ? (
        //     <p>coolio</p>
        // ) : (
        //         <div>
        //             <div className={classes.socialButtonsContainer}>
        //                 {Auth}
        //             </div>
        //             <TextField
        //                 className={classes.textField}
        //                 label="Email"
        //                 value={email}
        //                 onChange={this.handleChange('email')}
        //             />

        //             <TextField
        //                 className={classes.textField}
        //                 label="Password"
        //                 type="password"
        //                 value={password}
        //                 onChange={this.handleChange('password')}
        //             />

        //             <TextField
        //                 className={classes.textField}
        //                 label="Confirm Password"
        //                 type="password"
        //                 value={confirmPassword}
        //                 onChange={this.handleChange('confirmPassword')}
        //             />

        //             <TextField
        //                 className={classes.textField}
        //                 label="MLS #"
        //                 value={mlsNumber}
        //                 onChange={this.handleChange('mlsNumber')}
        //             />

        //             <TextField
        //                 className={classes.textField}
        //                 label="Phone"
        //                 value={phone}
        //                 onChange={this.handleChange('phone')}
        //             />

        //             <Button
        //                 variant="contained"
        //                 color="primary"
        //                 onClick={this.onClickSubmit}
        //                 className={classes.submit}
        //             >
        //                 Submit
        //     </Button>
        //         </div>
        //     );

        return (
            <RegistrationFields
                handleChange={this.handleChange}
                onClickSubmit={this.onClickSubmit}
                isLoggedInWithSocial={this.state.isLoggedInWithSocial}
                update={this.updateRegistrationView}
            />
        );
    }
}

export default withStyles(styles)(LoginForm);
