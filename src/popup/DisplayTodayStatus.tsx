import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ITodayStatus } from '../background/ITodayStatus';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

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
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Button
                onClick={() => this.reportToMeckano(false)}
                variant='contained'
                color='primary'
                fullWidth
              >
                At Work
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => this.reportToMeckano(true)}
                variant='contained'
                color='primary'
                fullWidth
              >
                Work from home
              </Button>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}
