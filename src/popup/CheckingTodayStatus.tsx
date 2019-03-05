import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface IProps {}

export class CheckingTodayStatus extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentWillMount() {
    chrome.runtime.sendMessage({ messageType: 'checkTodayStatus' });
  }

  render() {
    return <Typography variant='h6'>Checking today's status...</Typography>;
  }
}
