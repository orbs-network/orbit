import * as React from 'react';

interface IProps {}

export class ReportInProgress extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <div>Reporting, please wait...</div>
    }
}
