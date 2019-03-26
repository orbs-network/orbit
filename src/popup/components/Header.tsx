import { AppBar, createStyles, Theme, WithStyles, withStyles, IconButton } from '@material-ui/core';
import * as React from 'react';
import { INetwork } from '../utils/Networks';
import { NetworksDropdown } from './NetworksDropdown';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme: Theme) =>
  createStyles({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      backgroundColor: theme.palette.grey[100]
    },
    logo: {
      flex: 0
    },
    networksContainer: {
      flex: 1,
      textAlign: 'center'
    },
    accountContainer: {
      flex: 0
    }
  });

interface IProps extends WithStyles<typeof styles> {
  networks: INetwork[];
  selectedNetworkIdx: number;
  onNetworkSelected: (idx: number) => void;
}

export const Header = withStyles(styles)(
  class extends React.Component<IProps> {
    constructor(props: IProps) {
      super(props);
    }

    render() {
      const { classes, networks, selectedNetworkIdx, onNetworkSelected } = this.props;

      return (
        <AppBar className={classes.rootContainer}>
          <img src='/icons/icon48.png' className={classes.logo} />
          {/* <IconButton className={classes.logo}>
            <MenuIcon />
          </IconButton> */}
          <div className={classes.networksContainer}>
            <NetworksDropdown
              networks={networks}
              selectedNetworkIdx={selectedNetworkIdx}
              onNetworkSelected={onNetworkSelected}
            />
          </div>
          <IconButton className={classes.accountContainer}>
            <AccountCircle />
          </IconButton>
        </AppBar>
      );
    }
  }
);
