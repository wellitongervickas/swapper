// import WalletBalances from '@/components/shared/wallet/Balances'
import SwapWidget from '@/components/swap/Widget'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { DEFAULT_SWAP_FEE } from '@/config/constants'

const Homepagecontainer = () => {
  const config = useChainConfig()

  return (
    <div className='flex flex-col space-y-4'>
      {/* <WalletBalances /> */}
      <div>
        <SwapWidget
          fee={DEFAULT_SWAP_FEE}
          tokenA={config.tokens.WETH}
          tokenB={config.tokens.SWPR}
        />
      </div>
    </div>
  )
}

export default Homepagecontainer
