import { Chain } from './factory'

const goerli = new Chain({
  id: 5,
  title: 'Goerli',
  name: 'goerli',
  scanURL: 'goerli.etherscan.io'
})

goerli.addHub({
  uniswap: {
    address: process.env.NEXT_PUBLIC_GOERLI_POOL_ADDRESS!
  }
})

goerli.addToken({
  ETH: {
    name: 'Ethers',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18
  },
  SWPR: {
    name: 'Swapper Coin',
    address: '0x8f4B904d7DcF2E6b125A3596A74D34737F9A954a',
    decimals: 6,
    symbol: 'SWPR'
  }
})

export default goerli
