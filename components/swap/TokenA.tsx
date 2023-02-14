import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import SwapWidget from './Widget'

const SwapTokenB = () => {
  const config = useChainConfig()

  return (
    <div>
      <SwapWidget
        fee='MEDIUM'
        tokenA={config.tokens.SWPR}
        tokenB={config.tokens.WETH}
      />
    </div>
  )
}

export default SwapTokenB
