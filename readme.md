# Dapp generator
==================================

Yeoman generator which sets up a local development environment for a decentralised app on the Ethereum blockchain.

## Instalation

# Geth and nodejs

```bash
#or your favourite package manager
brew install ethereum
brew install node

geth --help
npm --version
```


# yeoman 
```bash
npm install -g yeoman
npm install -g generator-eth-dapp
```

# Install
```bash
mkdir my-dapp
cd my-dapp
yo eth-dapp
```

## Usage
So far we set up a local blockchain with four accounts preconfigured. Start geth using your local blockchain like so.

```bash
./geth-local.sh
```
You will enter the interactive [geth shell](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console).

```bash
  ...
  at block: 0 (Thu, 01 Jan 1970 10:00:00 AEST)
  modules: admin:1.0 db:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 shh:1.0 txpool:1.0 web3:1.0
  > personal
  {
    listAccounts: ["0xedf535e2a610ea0450af92cc1db1fd4bccefc416", "0xefd1b289d777a467cd2344aa68d83e9aea9ff6b5", "0xa0a99f2c21d30c832e6f4f6414e5e9f807bde692", "0x7890407395a3d2bc7d9382a0d8d7e7c5ca60561c"],
    getListAccounts: function(),
    newAccount: function(),
    unlockAccount: function()
  }
  >
```

# More coming soon!