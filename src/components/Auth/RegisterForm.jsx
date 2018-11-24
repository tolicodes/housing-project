import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { register } from './api';

const styles = {
    textField: {
        width: '100%',
    },
};

class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
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

        return (
            <div>
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
                    onClick={this.onClickSubmit}
                >Submit</Button>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);
