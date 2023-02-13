import useNativeToken from '@/modules/core/tokens/hooks/useNativeToken'
import useSwapperToken from '@/modules/core/tokens/hooks/useSwapperToken'
import { commify, formatUnits } from 'ethers/lib/utils'

export const InfoWalletDetails = () => {
  const { balance: tokenBalance, decimals: tokenDecimals } = useSwapperToken()
  const { balance: nativeBalance, decimals: nativeDecimals } = useNativeToken()

  return (
    <section>
      <h2>Balances</h2>
      <ul>
        <li className='flex space-x-2'>
          <span>WETH:</span>
          <span>{commify(formatUnits(nativeBalance, nativeDecimals))}</span>
        </li>
        <li className='flex space-x-2'>
          <span>SWPR:</span>
          <span>{commify(formatUnits(tokenBalance, tokenDecimals))}</span>
        </li>
      </ul>
    </section>
  )
}
