import * as Orbs from 'orbs-client-sdk/dist/index.es.js';
import { getMyAccount } from './my-account';

const { argAddress, argUint64, argUint32, argString, Client } = Orbs;

console.log('Orbs', Orbs);

export type TArgType = 'Uint32' | 'Uint64' | 'String' | 'Bytes' | 'Address';
export interface IArg {
  type: TArgType;
  value: any;
}

function toOrbsArgs(arg: IArg) {
  switch (arg.type) {
    case 'Uint32':
      return argUint32(Number(arg.value) || 0);

    case 'Uint64':
      return argUint64(arg.value);

    case 'String':
      return argString(arg.value);

    case 'Address':
      return argAddress(arg.value);

    default:
      break;
  }
}

export async function executeTx(
  orbsEndPoint: string,
  virtualChainId: number,
  contractName: string,
  methodName: string,
  args: IArg[]
): Promise<string> {
  const client = new Client(orbsEndPoint, virtualChainId, 'TEST_NET');
  const sender = getMyAccount();

  const [tx, txId] = client.createTransaction(
    sender.publicKey,
    sender.privateKey,
    contractName,
    methodName,
    args.map(toOrbsArgs)
  );

  await client.sendTransaction(tx);
  return txId;
}
