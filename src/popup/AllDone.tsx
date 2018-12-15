import * as React from 'react';

interface IProps {}

export class AllDone extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <div>All done for today...</div>
    }
}
