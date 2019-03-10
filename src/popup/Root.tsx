import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Popup from './Popup';

const theme = createMuiTheme({});

export class Root extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Popup />
      </MuiThemeProvider>
    );
  }
}
