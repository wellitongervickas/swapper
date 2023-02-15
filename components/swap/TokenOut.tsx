import { commify, formatUnits } from 'ethers/lib/utils'
import { Token } from '@/modules/core/tokens/types/token'

import Pin from '../shared/Pin'

interface SwapTokenOutProps {
  token: Token
  loading?: boolean
  amount: string
}

const SwapTokenOut = ({ token, loading, amount }: SwapTokenOutProps) => {
  return (
    <section className='flex flex-col'>
      <h3>{token.name}</h3>
      {loading ? (
        <div className='max-w-[4rem] pt-2'>
          <Pin pinsClassName='bg-gray' />
        </div>
      ) : (
        <div className='flex space-x-2'>
          <span className='font-medium'>Total</span>
          <span className='text-lime-400'>
            {commify(formatUnits(amount, token.decimals))}
          </span>
        </div>
      )}
    </section>
  )
}

export default SwapTokenOut
