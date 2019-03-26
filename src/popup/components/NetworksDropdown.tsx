import {
  createStyles,
  MenuItem,
  Select,
  Theme,
  WithStyles,
  withStyles,
  StandardProps,
  StyledComponentProps
} from '@material-ui/core';
import * as React from 'react';
import { INetwork } from '../utils/Networks';

const styles = (theme: Theme) =>
  createStyles({
    rootContainer: {
      minWidth: 300
    }
  });

interface IProps extends WithStyles<typeof styles> {
  networks: INetwork[];
  selectedNetworkIdx: number;
  onNetworkSelected: (idx: number) => void;
}

export const NetworksDropdown = withStyles(styles)(
  class extends React.Component<IProps> {
    constructor(props: IProps) {
      super(props);
    }

    render() {
      const { classes, networks, selectedNetworkIdx, onNetworkSelected } = this.props;

      return (
        <Select
          className={classes.rootContainer}
          value={selectedNetworkIdx}
          onChange={e => onNetworkSelected(parseInt(e.target.value, 10))}
        >
          {networks.map((network, idx) => (
            <MenuItem value={idx}>{network.name}</MenuItem>
          ))}
        </Select>
      );
    }
  }
);
