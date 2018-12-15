import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

interface IProps {
    errorMessage: string;
}

interface IState {
    email: string;
    password: string;
}

export class LoginForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            email: 'gil@orbs.com',
            password: 'y5ygy'
        }
    }

    private login() {
        chrome.runtime.sendMessage({ messageType: 'login', email: this.state.email, password: this.state.password });
    }

    render() {
        return (
            <form onSubmit={e => { e.preventDefault(); this.login() }}>
                <Grid container>
                    <Grid item xs={12} style={{ paddingBottom: 20 }}>
                        <TextField
                            autoFocus
                            value={this.state.email}
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            onChange={e => this.setState({ email: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom: 20 }}>
                        <TextField
                            autoFocus
                            value={this.state.password}
                            margin="dense"
                            id="name"
                            label="Password"
                            type="password"
                            onChange={e => this.setState({ password: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" color="primary" variant="contained" fullWidth>Login</Button>
                        <div>{this.props.errorMessage}</div>
                    </Grid>
                </Grid>
            </form>
        )
    }
}
