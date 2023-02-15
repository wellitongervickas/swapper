import SwapWidget from '@/components/swap/Widget'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { DEFAULT_SWAP_FEE } from '@/config/constants'

const Homepagecontainer = () => {
  const config = useChainConfig()

  return (
    <div className='flex items-center justify-center'>
      <SwapWidget
        className='w-full md:w-auto md:min-w-[24rem]'
        fee={DEFAULT_SWAP_FEE}
        tokenA={config.tokens.WETH}
        tokenB={config.tokens.SWPR}
      />
    </div>
  )
}

export default Homepagecontainer
