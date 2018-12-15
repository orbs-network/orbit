import * as React from 'react';
import Button from '@material-ui/core/Button';

interface IProps {}

export class MainScreen extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    private reportToMeckano() {
        chrome.runtime.sendMessage({ messageType: 'reportToMeckano' });
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.reportToMeckano()} variant="contained">At Work</Button>
            </div>
        );
    }
}
