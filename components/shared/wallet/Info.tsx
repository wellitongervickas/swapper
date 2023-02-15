import useWallet from '@/modules/core/wallet/hooks/useWallet'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import string from '@/modules/utils/string'
import classnames from '@/modules/utils/classnames'
import Pin from '../Pin'

export const WalletInfo = () => {
  const { state } = useWallet()
  const config = useChainConfig()

  return (
    <div
      className={classnames.merge([
        'rounded-md border border-white py-2 px-6',
        'flex items-center justify-between space-x-4'
      ])}
    >
      <span>{config.title}</span>
      <span>
        <Pin maxPins={1} pinsClassName='bg-primary' />
      </span>
      <span>{string.toEllipsis(state.address, 6, -4)}</span>
    </div>
  )
}

export default WalletInfo
