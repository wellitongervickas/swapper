import useWallet from '@/modules/core/wallet/hooks/useWallet'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import string from '@/modules/utils/string'
import classnames from '@/modules/utils/classnames'
import Pin from '../Pin'
import Image from 'next/image'

export const WalletInfo = () => {
  const { state } = useWallet()
  const config = useChainConfig()

  return (
    <div
      className={classnames.merge([
        'rounded-md border border-white py-2 px-4 text-xs',
        'flex items-center justify-between md:space-x-2'
      ])}
    >
      <span className='hidden md:inline-block'>
        <Image alt={config.title} src={config.icon} width={16} height={16} />
      </span>
      <span className='hidden md:inline-block'>{config.title}</span>
      <div className='flex items-center justify-between space-x-4'>
        <span>
          <Pin maxPins={1} pinsClassName='bg-primary' />
        </span>
        <span>{string.toEllipsis(state.address, 6, -4)}</span>
      </div>
    </div>
  )
}

export default WalletInfo
