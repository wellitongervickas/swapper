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
    name: 'Wrapped Ethers',
    symbol: 'WETH',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    decimals: 18
  }
})

export default goerli
