import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ITodayStatus } from '../background/ITodayStatus';
import Button from '@material-ui/core/Button';

interface IProps {
  todayStatus: ITodayStatus;
}

export class DisplayTodayStatus extends React.Component<IProps> {
  private reportToMeckano(isWorkFromHome: boolean) {
    chrome.runtime.sendMessage({
      messageType: 'reportToMeckano',
      isWorkFromHome
    });
  }

  render() {
    const { todayStatus } = this.props;
    return (
      <>
        {todayStatus.reported ? (
          <Typography variant='h6'>We're all good for today</Typography>
        ) : (
          <>
            <Button
              onClick={() => this.reportToMeckano(false)}
              variant='contained'
              fullWidth
            >
              Report, at Work
            </Button>
            <Button
              onClick={() => this.reportToMeckano(true)}
              variant='contained'
              fullWidth
            >
              Report, work from home
            </Button>
          </>
        )}
      </>
    );
  }
}
