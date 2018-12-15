import * as React from 'react';

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
                <button onClick={() => this.reportToMeckano()}>At Work</button>
                <button>Day Off</button>
                <button>Work From Home</button>
            </div>
        );
    }
}
