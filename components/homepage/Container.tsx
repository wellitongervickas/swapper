import WalletBalances from '@/components/shared/wallet/Balances'
import SwapWidget from '@/components/swap/Widget'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { DEFAULT_SWAP_FEE } from '@/config/constants'
import { useState } from 'react'
import { Token } from '@/modules/core/tokens/types/token'

const Homepagecontainer = () => {
  const config = useChainConfig()

  const [tokens, setTokens] = useState<Token[]>([
    config.tokens.WETH,
    config.tokens.SWPR
  ])

  const handleSwitchTokens = () => {
    setTokens((state) => [...state.reverse()])
  }

  return (
    <div>
      <WalletBalances />
      <div>
        <SwapWidget
          onSwitch={handleSwitchTokens}
          className='max-w-[16rem]'
          fee={DEFAULT_SWAP_FEE}
          tokenA={tokens[0]}
          tokenB={tokens[1]}
        />
      </div>
    </div>
  )
}

export default Homepagecontainer
