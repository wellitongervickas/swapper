import { Token } from '@/modules/core/tokens/types/token'
import classnames from '@/modules/utils/classnames'
import { Children } from 'react'

interface SwapSwitchProps {
  activeToken: Token
  tokenA: Token
  tokenB: Token
  onSwitch(): void
}

const SwapSwitch = ({
  onSwitch,
  tokenA,
  tokenB,
  activeToken
}: SwapSwitchProps) => {
  return (
    <div className='flex space-x-2 rounded bg-stone-900 p-1'>
      {Children.toArray(
        [tokenA, tokenB].map((token) => (
          <button
            onClick={onSwitch}
            className={classnames.merge([
              'rounded py-px px-1 text-xs',
              {
                'bg-primary text-black': activeToken.address === token.address
              },
              { 'text-gray': activeToken.address !== token.address }
            ])}
          >
            {token.symbol}
          </button>
        ))
      )}
    </div>
  )
}

export default SwapSwitch
