import { Button, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { Arg } from './components/Arg';
import { INetwork } from './utils/Networks';
import './Popup.scss';
import { loadState, storeState } from './utils/StatePersistency';
import { executeTx, IArg } from './utils/tx-generator';
import { History } from './components/History';

interface IProps {}

export interface IState {
  networks: INetwork[];
  selectedNetworkIdx: number;
  contractName: string;
  methodName: string;
  args: IArg[];
  errorStr: string;
}

export default class Popup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = loadState();
  }

  render() {
    return (
      <div className='popupContainer'>
        <Select
          value={this.state.selectedNetworkIdx}
          onChange={e => this._setState({ selectedNetworkIdx: parseInt(e.target.value, 10) })}
        >
          {this.state.networks.map((network, idx) => (
            <MenuItem value={idx}>{network.name}</MenuItem>
          ))}
        </Select>

        {/* <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  value={this.state.orbsEndPoint}
                  margin='dense'
                  id='orbsEndPoint'
                  label='Orbs Endpoint'
                  fullWidth
                  onChange={e => this._setState({ orbsEndPoint: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  value={this.state.prismUrl}
                  margin='dense'
                  id='prismUrl'
                  label='Prism Url'
                  fullWidth
                  onChange={e => this._setState({ prismUrl: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.virtualChainId}
                  margin='dense'
                  id='virtualChainId'
                  label='Virtual Chain Id'
                  type='number'
                  fullWidth
                  onChange={e =>
                    this._setState({
                      virtualChainId: parseInt(e.target.value, 10)
                    })
                  }
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails> */}
        <Grid container>
          <Grid item xs={12}>
            <TextField
              autoFocus
              value={this.state.contractName}
              margin='dense'
              id='contractName'
              label='Contract Name'
              fullWidth
              onChange={e => this._setState({ contractName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              value={this.state.methodName}
              margin='dense'
              id='methodName'
              label='Method Name'
              fullWidth
              onChange={e => this._setState({ methodName: e.target.value })}
            />
          </Grid>
          {this.state.args.map((arg, idx) => (
            <Grid item xs={12}>
              <Arg
                arg={arg}
                onArgPropertyChange={(property, newValue) => this.onArgChange(idx, property, newValue)}
                onArgRemoved={() => this.onArgRemoved(idx)}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant='contained' onClick={() => this.addArg()}>
              Add Arg
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button color='primary' variant='contained' fullWidth onClick={() => this.executeTx()}>
              Execute
            </Button>
          </Grid>
        </Grid>
        <History network={this.getSelectedNetwork()} />

        <Typography>{this.state.errorStr ? `${this.state.errorStr}` : null}</Typography>
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
