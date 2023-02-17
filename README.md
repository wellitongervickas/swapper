# Swapper DeFi

> run demo [http://swapper-psi.vercel.app](http://swapper-psi.vercel.app)

## Instructions

- Get a [faucet](https://goerli.etherscan.io/address/0xF4D84843E3A0cbEAE3651612f9fAA5C9849b743d#writeContract#F3) of ERC20 SWPR token
- You will need some WETH or ETH or exchange using the dApp.

## Development

### Development Environment

- Node v16.18.0
- yarn 1.22.19 or npm 9.1.2

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Also, you can build as production preview

```bash
npm run build && npm run start
# or
yarn build && yarn start
```

both ways open using [http://localhost:3000](http://localhost:3000)

### Testing

You can test running the package script `test`

```bash
yarn test
npm run test
```
