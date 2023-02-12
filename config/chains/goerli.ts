import { Chain } from './factory'

const goerli = new Chain({
  id: 5,
  title: 'Goerli',
  name: 'goerli',
  scanURL: 'goerli.etherscan.io'
})

goerli.addHub({
  uniswapFactory: {
    address: process.env.NEXT_PUBLIC_GOERLI_POOL_FACTORY_ADDRESS!
  },
  uniswapQuoter: {
    address: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
  }
})

goerli.addToken({
  WETH: {
    name: 'Wrapper Ethers',
    symbol: 'WETH',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
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
