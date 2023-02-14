import { WalletBalances } from '@/components/wallet/Balances'
import SwapWidget from './Widget'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { DEFAULT_SWAP_FEE } from '@/config/constants'

const SwapPage = () => {
  const config = useChainConfig()

  return (
    <div>
      <WalletBalances />
      <div className='flex space-x-2'>
        <SwapWidget
          fee={DEFAULT_SWAP_FEE}
          tokenA={config.tokens.SWPR}
          tokenB={config.tokens.WETH}
        />
        <SwapWidget
          fee={DEFAULT_SWAP_FEE}
          tokenA={config.tokens.WETH}
          tokenB={config.tokens.SWPR}
        />
      </div>
    </div>
  )
}

export default SwapPage
