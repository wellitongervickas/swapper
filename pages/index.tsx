import useNativeToken from '@/modules/core/tokens/hooks/useNativeToken'
import useSwapperToken from '@/modules/core/tokens/hooks/useSwapperToken'

export default function Home() {
  const { balance: tokenBalance } = useSwapperToken()
  const { balance: nativeBalance } = useNativeToken()

  console.log(tokenBalance, nativeBalance)

  return (
    <>
      <main>
        <h1>Welcome,</h1>
        <section>
          <h2>Balances</h2>
          <ul>
            <li className='flex space-x-2'>
              <span>ETH:</span>
              <span>{nativeBalance}</span>
            </li>
            <li className='flex space-x-2'>
              <span>SWPR:</span>
              <span>{tokenBalance}</span>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}
