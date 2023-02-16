import { Chain } from './factory'

const goerli = new Chain({
  id: 5,
  title: 'Goerli',
  name: 'goerli',
  scanURL: 'https://goerli.etherscan.io',
  icon: '/assets/tokens/eth.svg'
})

goerli.addHub({
  uniswapFactory: {
    address: '0x1F98431c8aD98523631AE4a59f267346ea31F984'
  },
  uniswapQuoter: {
    address: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
  },
  uniswapRouter: {
    address: '0xE592427A0AEce92De3Edee1F18E0157C05861564'
  }
})

goerli.addToken({
  NATIVE: {
    name: 'ETH',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    native: true
  },
  WNATIVE: {
    name: 'Wrapped Ether',
    symbol: 'wETH',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    decimals: 18,
    native: true
  },
  SWPR: {
    name: 'Swapper Coin',
    address: '0xF4D84843E3A0cbEAE3651612f9fAA5C9849b743d',
    decimals: 6,
    symbol: 'SWPR'
  }
})

export default goerli
