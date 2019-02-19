import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface IProps {}

export class ReportInProgress extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <Typography variant="h6">Reporting, please wait...</Typography>
    }
}
