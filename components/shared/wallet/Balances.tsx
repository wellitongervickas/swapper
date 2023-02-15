import useSwapperToken from '@/modules/core/tokens/hooks/useSwapperToken'
import useWETHToken from '@/modules/core/tokens/hooks/useWETHToken'
import useNativeToken from '@/modules/core/tokens/hooks/useNativeToken'
import { formatUnits } from 'ethers/lib/utils'

const WalletBalances = () => {
  const { balance: tokenBalance, decimals: tokenDecimals } = useSwapperToken()
  const { balance: WETHBalance, decimals: WETHDecimals } = useWETHToken()
  const { balance: nativeBalance, decimals: nativeDecimals } = useNativeToken()

  return (
    <section>
      <h2>Balances</h2>
      <ul>
        <li className='flex space-x-2'>
          <span>ETH:</span>
          <span>{formatUnits(nativeBalance, nativeDecimals)}</span>
        </li>
        <li className='flex space-x-2'>
          <span>WETH:</span>
          <span>{formatUnits(WETHBalance, WETHDecimals)}</span>
        </li>
        <li className='flex space-x-2'>
          <span>SWPR:</span>
          <span>{formatUnits(tokenBalance, tokenDecimals)}</span>
        </li>
      </ul>
    </section>
  )
}

export default WalletBalances
