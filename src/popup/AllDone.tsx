import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface IProps {}

export class AllDone extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <Typography variant="h6">All done for today...</Typography>
    }
}
