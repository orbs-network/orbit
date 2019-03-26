import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import * as React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';

function TxSnackbarContent(props) {
  const { classes, message, onClose } = props;

  return (
    <SnackbarContent
      message={
        <span>
          <CheckCircleIcon />
          {message}
        </span>
      }
      action={[
        <IconButton key='close' color='inherit' onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}

export function TxSnackbar(props: { txId: string }) {
  const { txId } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={!!txId}
      autoHideDuration={6000}
    >
      <TxSnackbarContent message='This is a success message!' />
    </Snackbar>
  );
}
