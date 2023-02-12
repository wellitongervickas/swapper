import { getConfigByChainId } from '@/config/utils/chains'
import useSwapperCoin from '@/modules/core/tokens/hooks/useSwapperCoin'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import { commify, formatUnits } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'

export default function Home() {
  const { state, wallet } = useWallet()

  const [ethBalance, setEthBalance] = useState('0')

  const { balance } = useSwapperCoin()

  const ethersBalanceToReadable = (balance: string) => {
    const config = getConfigByChainId(state.chainId)
    return commify(formatUnits(balance, config?.tokens.ETH.decimals))
  }

  useEffect(() => {
    if (state.connected) {
      wallet.provider?.signer?.getBalance().then(setEthBalance)
    }
  }, [state.connected, wallet.provider?.signer])

  return (
    <>
      <main>
        <h1>Welcome,</h1>
        <section>
          <h2>Balances</h2>
          <ul>
            <li className='flex space-x-2'>
              <span> WETH:</span>
              <span>{ethersBalanceToReadable(ethBalance)}</span>
            </li>
            <li className='flex space-x-2'>
              <span> SWPR:</span>
              <span>{balance}</span>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}
