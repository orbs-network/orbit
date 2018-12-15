import * as React from 'react';
import './Popup.scss';

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
                <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}></input>
                <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}></input>
                <button type="submit">Login</button>
                <div>{this.props.errorMessage}</div>
            </form>
        )
    }
}
