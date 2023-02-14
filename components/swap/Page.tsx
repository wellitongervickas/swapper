import { InfoWalletDetails } from '@/components/info/WalletDetails'
import SwapWidget from './Widget'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { DEFAULT_SWAP_FEE } from '@/config/constants'

const SwapPage = () => {
  const config = useChainConfig()

  return (
    <div>
      <InfoWalletDetails />
      <SwapWidget
        fee={DEFAULT_SWAP_FEE}
        tokenA={config.tokens.SWPR}
        tokenB={config.tokens.WETH}
      />
      <br />
      <SwapWidget
        fee={DEFAULT_SWAP_FEE}
        tokenA={config.tokens.WETH}
        tokenB={config.tokens.SWPR}
      />
    </div>
  )
}

export default SwapPage
