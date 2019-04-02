import * as Orbs from 'orbs-client-sdk/dist/index.es.js';
import { Account } from 'orbs-client-sdk/dist/orbs/Account';

const { createAccount } = Orbs;

function serializeAccount(account: Account): string {
  return JSON.stringify(
    {
      ClientPublicKey: uint8ArrayToHexString(account.publicKey),
      ClientPrivateKey: uint8ArrayToHexString(account.privateKey),
      ClientAddress: account.address
    },
    null,
    2
  );
}

function deserializeAccount(str: string): Account {
  const asJson = JSON.parse(str);
  return {
    publicKey: hexStringToUint8Array(asJson.ClientPublicKey),
    privateKey: hexStringToUint8Array(asJson.ClientPrivateKey),
    address: asJson.ClientAddress
  };
}

function uint8ArrayToHexString(arr: Uint8Array): string {
  return '0x' + Buffer.from(arr).toString('hex');
}

function hexStringToUint8Array(str: string): Uint8Array {
  str = str.replace(/^0x/i, '');
  return Uint8Array.from(Buffer.from(str, 'hex'));
}

export function generateRandomAccount(): string {
  const newAccount = createAccount();
  return newAccount.address;
}

export function generateMyAccount(): Account {
  const myNewAccount = createAccount();
  localStorage.setItem('my-orbs-account', serializeAccount(myNewAccount));
  return getMyAccount();
}

export function getMyAccount(): Account {
  let asStr = localStorage.getItem('my-orbs-account');
  return asStr ? deserializeAccount(asStr) : generateMyAccount();
}
