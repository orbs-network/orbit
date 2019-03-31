import { IState } from '../Popup';

const VERSION = '7';

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
      name: 'Mainnet - 1,000,000',
      orbsEndPoint: 'http://18.197.127.2/vchains/1000000/',
      prismUrl: 'https://prism.orbs.com',
      virtualChainId: 1000000,
      txIds: []
    },
    {
      name: 'Mainnet - 1,000,001',
      orbsEndPoint: 'http://18.197.127.2/vchains/1000001/',
      prismUrl: 'https://prism.orbs.com',
      virtualChainId: 1000001,
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
