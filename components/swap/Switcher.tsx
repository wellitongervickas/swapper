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
          <span
            onClick={onSwitch}
            className={classnames.merge([
              'cursor-pointer rounded py-px px-1 text-xs',
              {
                'bg-primary text-black': activeToken.address === token.address
              },
              { 'text-gray': activeToken.address !== token.address }
            ])}
          >
            {token.symbol}
          </span>
        ))
      )}
    </div>
  )
}

export default SwapSwitch
