import {
  createStyles,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  WithStyles,
  withStyles,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Refresh from '@material-ui/icons/Refresh';
import * as React from 'react';
import { IArg } from '../utils/tx-generator';
import { generateRandomAccount } from '../utils/my-account';

const styles = (theme: Theme) =>
  createStyles({
    fieldsContainer: {
      display: 'flex',
      alignItems: 'baseline'
    },
    argType: {},
    argValue: {
      margin: '4px 16px',
      flex: 1
    },
    delButton: {}
  });

interface IProps extends WithStyles<typeof styles> {
  arg: IArg;
  onArgPropertyChange: (propertyName: string, value: any) => void;
  onArgRemoved: () => void;
}

export const Arg = withStyles(styles)(
  class extends React.Component<IProps> {
    constructor(props: IProps) {
      super(props);
    }

    render() {
      const { arg, onArgPropertyChange, onArgRemoved, classes } = this.props;
      const { type, value } = arg;
      return (
        <Grid container>
          <Grid item xs={12} className={classes.fieldsContainer}>
            <FormControl margin='dense' className={classes.argType}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={e => onArgPropertyChange('type', e.target.value)}>
                <MenuItem value='Uint32'>Uint32</MenuItem>
                <MenuItem value='Uint64'>Uint64</MenuItem>
                <MenuItem value='String'>String</MenuItem>
                <MenuItem value='Bytes'>Bytes</MenuItem>
                <MenuItem value='Address'>Address</MenuItem>
              </Select>
            </FormControl>
            {type === 'Address' ? this.renderAddressValueField(value) : this.renderGeneralValueField(value)}
            <IconButton className={classes.delButton}>
              <DeleteIcon onClick={e => onArgRemoved()} />
            </IconButton>
          </Grid>
        </Grid>
      );
    }

    private renderGeneralValueField(value: any) {
      const { onArgPropertyChange, classes } = this.props;
      return (
        <TextField
          className={classes.argValue}
          value={value}
          margin='dense'
          label='Value'
          onChange={e => onArgPropertyChange('value', e.target.value)}
        />
      );
    }

    private renderAddressValueField(value: string) {
      const { onArgPropertyChange, classes } = this.props;
      return (
        <FormControl className={classes.argValue}>
          <InputLabel htmlFor='adornment-address'>Receiver Address</InputLabel>
          <Input
            id='adornment-address'
            type={'text'}
            value={value}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => onArgPropertyChange('value', generateRandomAccount())}>
                  <Refresh />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      );
    }
  }
);
