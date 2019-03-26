import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  TextField,
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Arg } from './components/Arg';
import { Header } from './components/Header';
import { History } from './components/History';
import './Popup.scss';
import { INetwork } from './utils/Networks';
import { loadState, storeState } from './utils/StatePersistency';
import { executeTx, IArg } from './utils/tx-generator';

const styles = (theme: Theme) =>
  createStyles({
    rootContainer: {
      width: 550,
      minHeight: 550
    },
    mainContainer: {
      padding: '70px 16px 0 16px'
    },
    card: {
      backgroundColor: theme.palette.grey[100]
    },
    addArgButtonContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column'
    },
    addArg: {
      position: 'relative',
      top: 10
    }
  });

interface IProps extends WithStyles<typeof styles> {}

export interface IState {
  networks: INetwork[];
  selectedNetworkIdx: number;
  contractName: string;
  methodName: string;
  args: IArg[];
  errorStr: string;
}

export const Popup = withStyles(styles)(
  class extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = loadState();
    }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.rootContainer}>
          <Header
            networks={this.state.networks}
            selectedNetworkIdx={this.state.selectedNetworkIdx}
            onNetworkSelected={idx => this._setState({ selectedNetworkIdx: idx })}
          />
          <div className={classes.mainContainer}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardHeader title='Contract' />
                  <CardContent>
                    <Grid container spacing={16}>
                      <Grid item xs={6}>
                        <TextField
                          value={this.state.contractName}
                          margin='dense'
                          id='contractName'
                          label='Contract Name'
                          fullWidth
                          onChange={e => this._setState({ contractName: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          value={this.state.methodName}
                          margin='dense'
                          id='methodName'
                          label='Method Name'
                          fullWidth
                          onChange={e => this._setState({ methodName: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardHeader title='Arguments' />
                  <CardContent>
                    <Grid container spacing={16}>
                      {this.state.args.map((arg, idx) => (
                        <Grid item xs={12}>
                          <Arg
                            arg={arg}
                            onArgPropertyChange={(property, newValue) => this.onArgChange(idx, property, newValue)}
                            onArgRemoved={() => this.onArgRemoved(idx)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <div className={classes.addArgButtonContainer}>
                      <Fab className={classes.addArg} color={'primary'} onClick={() => this.addArg()}>
                        <AddIcon />
                      </Fab>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button color='primary' size={'large'} variant='contained' onClick={() => this.executeTx()}>
                  Execute
                </Button>
              </Grid>
            </Grid>
            <Typography>{this.state.errorStr ? `${this.state.errorStr}` : null}</Typography>
          </div>
          <History network={this.getSelectedNetwork()} />
        </div>
      );
    }

    private _setState(partialState: Partial<IState>): void {
      this.setState(partialState as any, () => storeState(this.state));
    }

    private addTx(txId: string) {
      const selectedNetwork = this.state.networks[this.state.selectedNetworkIdx];
      selectedNetwork.txIds = [txId, ...selectedNetwork.txIds];
      const networks: INetwork[] = this.state.networks;
      this._setState({ networks });
    }

    private onArgChange(idx: number, property: string, value: any) {
      const args = this.state.args.map((arg, i) => (i === idx ? { ...arg, [property]: value } : arg));
      this._setState({ args });
    }

    private onArgRemoved(idx: number) {
      const args = this.state.args.filter((_, i) => i !== idx);
      this._setState({ args });
    }

    private getSelectedNetwork(): INetwork {
      return this.state.networks[this.state.selectedNetworkIdx];
    }

    private addArg() {
      const arg: IArg = {
        value: 0,
        type: 'Uint32'
      };
      const args = [...this.state.args, arg];
      this._setState({ args });
    }

    private async executeTx() {
      const { contractName, methodName, args } = this.state;
      const { orbsEndPoint, virtualChainId } = this.getSelectedNetwork();
      try {
        const txId = await executeTx(orbsEndPoint, virtualChainId, contractName, methodName, args);
        this.addTx(txId);
      } catch (errorStr) {
        this._setState({ errorStr });
      }
    }
  }
);
