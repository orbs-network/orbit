import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ITodayStatus } from '../background/ITodayStatus';
import Button from '@material-ui/core/Button';

interface IProps {
  todayStatus: ITodayStatus;
}

export class DisplayTodayStatus extends React.Component<IProps> {
  private reportToMeckano() {
    chrome.runtime.sendMessage({ messageType: 'reportToMeckano' });
  }

  render() {
    const { todayStatus } = this.props;
    return (
      <>
        <Typography variant='h6'>Today is the {todayStatus.date}</Typography>
        {todayStatus.reported ? (
          <Typography variant='h6'>We're all good for today</Typography>
        ) : (
          <Button
            onClick={() => this.reportToMeckano()}
            variant='contained'
            fullWidth
          >
            Report, at Work
          </Button>
        )}
      </>
    );
  }
}
