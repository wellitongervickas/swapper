import SwapWidget from '@/components/swap/Widget'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { DEFAULT_SWAP_FEE } from '@/config/constants'
import HomepageJumbotron from './Jumbotron'
import appConfig from '@/config'

const Homepagecontainer = () => {
  const config = useChainConfig()

  return (
    <div>
      <HomepageJumbotron
        title={`${appConfig.name} protocol`}
        description='Our mission is to make secure your swapper coin exchange.'
      >
        <SwapWidget
          className='w-full md:w-[24rem]'
          fee={DEFAULT_SWAP_FEE}
          tokenA={config.tokens.WNATIVE}
          tokenB={config.tokens.SWPR}
        />
      </HomepageJumbotron>
    </div>
  )
}

export default Homepagecontainer
