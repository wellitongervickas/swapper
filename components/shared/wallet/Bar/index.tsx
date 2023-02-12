import { useMemo } from 'react'

import WalletBarConnect from '@/components/shared/wallet/Bar/Connect'
import WalletBarNetwork from '@/components/shared/wallet/Bar/Network'

import classnames from '@/modules/utils/classnames'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import config from '@/config'

interface WalletBarProps {
  className?: string
}

const getClassBarByStatus = (status: boolean) =>
  status
    ? `m-0 h-0 overflow-hidden p-0 opacity-0`
    : `flex flex-col items-center justify-center space-y-4 container h-[9rem]`

const WalletBar = ({ className }: WalletBarProps) => {
  const { state } = useWallet()

  const isAllowedChain = useMemo(
    () =>
      !!Object.values(config.chains).find(
        (chain) => chain.id === state.chainId
      ),
    [state.chainId]
  )

  const isHandlingConnection = useMemo(
    () => state.connecting || state.connected,
    [state.connected, state.connecting]
  )

  const isConnectedInWrongNetwork = useMemo(() => {
    const isAlreadyConnected = !state.connecting && state.connected
    const usingWrongNetwork = !isAllowedChain && !!state.address

    return isAlreadyConnected && usingWrongNetwork
  }, [state.connecting, state.connected, isAllowedChain, state.address])

  return (
    <div
      className={classnames.merge([
        className,
        state.connecting ? 'opacity-0' : 'opacity-100',
        { 'h-0': isHandlingConnection },
        { 'h-[9rem]': !isHandlingConnection || isConnectedInWrongNetwork },
        `relative overflow-hidden`,
        'transition-all duration-300'
      ])}
    >
      <div className='flex flex-col items-center justify-center container'>
        <WalletBarConnect
          className={classnames.merge([
            getClassBarByStatus(state.connected),
            'transition-all duration-150'
          ])}
        />
        <WalletBarNetwork
          className={classnames.merge([
            getClassBarByStatus(!isConnectedInWrongNetwork),
            'transition-all duration-150'
          ])}
        />
      </div>
    </div>
  )
}

export default WalletBar
