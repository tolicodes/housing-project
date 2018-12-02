import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { register, getSocket } from './api';
import OAuth from './OAuth';

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
];

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoggedInWithSocial: false,
    }

    socket = getSocket()

    updateRegistrationView = () => {
      console.log("OK THAT SEEMS TO MAKE SENSE")
      this.setState({
        isLoggedInWithSocial: !this.state.isLoggedInWithSocial
      })
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
            mlsNumber,
            phone,
        });
    }

    renderSocial() {
        return PROVIDERS.map(provider =>
            <OAuth
                provider={provider}
                key={provider}
                socket={this.socket}
                update={this.updateRegistrationView}
            />
        );
    }

    renderIsLoggedInWithSocial() {
        const { classes } = this.props;
        const { email, mlsNumber, phone } = this.state;

        return <div className={classes.completeRegistration}>
            <p>Nice! Please fill in the rest of the required fields to finish registering.</p>
            <TextField
                className={classes.textField}
                label="Email"
                value={email}
                onChange={this.handleChange('email')}
            />
            <TextField
                className={classes.textField}
                label="MLS #"
                value={mlsNumber}
                onChange={this.handleChange('mlsNumber')}
            />
            <TextField
                className={classes.textField}
                label="Phone"
                value={phone}
                onChange={this.handleChange('phone')}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={this.onClickSubmit}
                className={classes.submit}
            >
                Submit
            </Button>
        </div>
    }

    renderIsNotLoggedInWithSocial() {
        const { classes } = this.props;
        const { name, email, password, confirmPassword, mlsNumber, phone } = this.state;

        return (
            <div>
                <div className={classes.socialButtonsContainer}>
                    {this.renderSocial()}
                </div>
                <TextField
                    className={classes.textField}
                    label="Name"
                    value={name}
                    onChange={this.handleChange('name')}
                />
                <TextField
                    className={classes.textField}
                    label="Email"
                    value={email}
                    onChange={this.handleChange('email')}
                />
                <TextField
                    className={classes.textField}
                    label="Password"
                    type="password"
                    value={password}
                    onChange={this.handleChange('password')}
                />
                <TextField
                    className={classes.textField}
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={this.handleChange('confirmPassword')}
                />
                <TextField
                    className={classes.textField}
                    label="MLS #"
                    value={mlsNumber}
                    onChange={this.handleChange('mlsNumber')}
                />
                <TextField
                    className={classes.textField}
                    label="Phone"
                    value={phone}
                    onChange={this.handleChange('phone')}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onClickSubmit}
                    className={classes.submit}
                >
                    Submit
                    </Button>
            </div>
        )
    }

    render() {
        return this.state.isLoggedInWithSocial 
            ? this.renderIsLoggedInWithSocial()
            : this.renderIsNotLoggedInWithSocial();
    }
}

export default withStyles(styles)(LoginForm);
