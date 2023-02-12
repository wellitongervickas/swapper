import useNativeToken from '@/modules/core/tokens/hooks/useNativeToken'
import useSwapperToken from '@/modules/core/tokens/hooks/useSwapperToken'

export const InfoWalletDetails = () => {
  const { balance: tokenBalance } = useSwapperToken()
  const { balance: nativeBalance } = useNativeToken()

  return (
    <section>
      <h2>Balances</h2>
      <ul>
        <li className='flex space-x-2'>
          <span>WETH:</span>
          <span>{nativeBalance}</span>
        </li>
        <li className='flex space-x-2'>
          <span>SWPR:</span>
          <span>{tokenBalance}</span>
        </li>
      </ul>
    </section>
  )
}
