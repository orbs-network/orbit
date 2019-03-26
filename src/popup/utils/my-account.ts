import * as Orbs from 'orbs-client-sdk/dist/index.es.js';
import { Account } from 'orbs-client-sdk/dist/orbs/Account';

const { createAccount } = Orbs;

function serializeAccount(account: Account): string {
  return JSON.stringify(
    {
      publicKey: account.publicKey.toString(),
      privateKey: account.privateKey.toString(),
      address: account.address
    },
    null,
    2
  );
}

function deserializeAccount(str: string): Account {
  const asJson = JSON.parse(str);
  return {
    publicKey: Uint8Array.from(asJson.publicKey.split(',')),
    privateKey: Uint8Array.from(asJson.privateKey.split(',')),
    address: asJson.address
  };
}

function uint8ArrayToHexString(arr: Uint8Array): string {
  return '0x' + Buffer.from(arr).toString('hex');
}

export function generateRandomAccount(): string {
  const newAccount = createAccount();
  return uint8ArrayToHexString(newAccount.publicKey);
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
