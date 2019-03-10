import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

interface IProps {
  todayReported: boolean;
}

export class DisplayTodayStatus extends React.Component<IProps> {
  private reportToMeckano(isWorkFromHome: boolean) {
    chrome.runtime.sendMessage({
      messageType: 'reportToMeckano',
      isWorkFromHome
    });
  }

  render() {
    const { todayReported } = this.props;
    return (
      <>
        {todayReported ? (
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
