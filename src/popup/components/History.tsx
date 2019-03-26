import { createStyles, Grid, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { INetwork } from '../utils/Networks';

const styles = (theme: Theme) =>
  createStyles({
    rootContainer: {}
  });

interface IProps extends WithStyles<typeof styles> {
  network: INetwork;
}

export const History = withStyles(styles)(
  class extends React.Component<IProps> {
    constructor(props: IProps) {
      super(props);
    }

    render() {
      const { classes, network } = this.props;
      const { txIds } = network;

      return (
        <Grid container className={classes.rootContainer}>
          {txIds.map(txId => (
            <Grid item xs={12} key={txId}>
              <Typography>{`${network.prismUrl}/tx/${txId.toLowerCase()}`}</Typography>
            </Grid>
          ))}
        </Grid>
      );
    }
  }
);
