import { createStyles, Theme, WithStyles, withStyles, Typography, Link } from '@material-ui/core';
import * as React from 'react';
import { INetwork } from '../utils/Networks';

const styles = (theme: Theme) =>
  createStyles({
    rootContainer: {},
    title: {
      backgroundColor: theme.palette.grey[100],
      textAlign: 'center',
      padding: theme.spacing.unit,
      marginTop: theme.spacing.unit,
      textTransform: 'uppercase'
    },
    tx: {
      padding: theme.spacing.unit,
      textAlign: 'center'
    }
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
        <div className={classes.rootContainer}>
          <Typography className={classes.title}>History</Typography>
          {txIds.map(txId => {
            const txStr = `${txId.substr(0, 5)}...${txId.substr(txId.length - 5)}`;
            return (
              <div className={classes.tx}>
                <Link
                  href={`${network.prismUrl}/vchains/${network.virtualChainId}/tx/${txId.toLowerCase()}`}
                  target={'_blank'}
                >
                  {txStr}
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  }
);
