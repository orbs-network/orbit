import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
    maxWidth: 350
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  txId: {
    color: 'white',
    maxWidth: 250,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textDecoration: 'underline'
  }
});

function TxImpl(props) {
  const { classes, txId, onClose, url } = props;

  return (
    <SnackbarContent
      className={classes.success}
      message={
        <span className={classes.message}>
          <CheckCircleIcon className={classes.iconVariant} />
          <a
            href={url}
            className={classes.txId}
            onClick={e => {
              e.preventDefault();
              window.open(url, '_blank');
            }}
          >
            {txId}
          </a>
        </span>
      }
      action={[
        <IconButton key='close' color='inherit' className={classes.close} onClick={e => onClose(txId)}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
}

export const Tx = withStyles(styles1)(TxImpl);
