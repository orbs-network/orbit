import { IState } from '../Popup';

const VERSION = '4';

const defaultState: IState = {
  networks: [
    {
      name: 'localhost:9000',
      orbsEndPoint: 'http://localhost:9000',
      prismUrl: 'http://localhost:3000',
      virtualChainId: 42,
      txIds: []
    },
    {
      name: '2020',
      orbsEndPoint: 'http://3.122.219.67/vchains/2020/',
      prismUrl: 'https://orbs-prism-staging.herokuapp.com',
      virtualChainId: 2020,
      txIds: []
    }
  ],
  selectedNetworkIdx: 0,
  contractName: '',
  methodName: '',
  args: [],
  errorStr: ''
};

export function storeState(state: IState) {
  localStorage.setItem(VERSION + '_state', JSON.stringify(state));
}

export function loadState() {
  const result = localStorage.getItem(VERSION + '_state');
  return result ? JSON.parse(result) : defaultState;
}
