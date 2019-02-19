import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface IProps {}

export class LoginInProgress extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <Typography variant="h6">Login in progress, Please wait...</Typography>
    }
}
