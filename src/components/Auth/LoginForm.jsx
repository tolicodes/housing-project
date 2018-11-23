import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;

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

                <Button>Submit</Button>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);
