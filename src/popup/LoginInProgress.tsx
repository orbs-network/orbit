import * as React from 'react';

interface IProps {}

export class LoginInProgress extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <div>Login in progress, Please wait...</div>
    }
}
