import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import SwapWidget from './Widget'

const SwapTokenB = () => {
  const config = useChainConfig()

  return (
    <div>
      <SwapWidget
        fee='MEDIUM'
        tokenA={config.tokens.WETH}
        tokenB={config.tokens.SWPR}
      />
    </div>
  )
}

export default SwapTokenB
