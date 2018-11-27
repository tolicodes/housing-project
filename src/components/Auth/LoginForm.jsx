import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    credentials: {
        width: '70%',
        margin: 'auto',
        marginTop: '30px',
    },
    textField: {
        width: '100%',
        margin: 'auto'
    },
    submit: {
        marginTop: '20px'
    }
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

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;

        return (
            <div className={classes.credentials}>
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
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Submit
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);
