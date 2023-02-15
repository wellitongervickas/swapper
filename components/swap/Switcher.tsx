import { Token } from '@/modules/core/tokens/types/token'
import classnames from '@/modules/utils/classnames'
import { Children } from 'react'

interface SwapSwitchProps {
  disabled?: boolean
  activeToken: Token
  tokenA: Token
  tokenB: Token
  onSwitch(): void
}

const SwapSwitch = ({
  onSwitch,
  tokenA,
  tokenB,
  activeToken,
  disabled
}: SwapSwitchProps) => {
  return (
    <div className='flex space-x-2 rounded bg-stone-900 p-1'>
      {Children.toArray(
        [tokenA, tokenB].map((token) => (
          <button
            disabled={disabled}
            onClick={onSwitch}
            className={classnames.merge([
              'rounded py-px px-1 text-xs disabled:opacity-50',
              !disabled
                ? [
                    {
                      'bg-primary text-black':
                        activeToken.address === token.address
                    },
                    { 'text-gray': activeToken.address !== token.address }
                  ]
                : 'cursor-not-allowed bg-gray-900'
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
