import { commify, formatUnits } from 'ethers/lib/utils'
import { Token } from '@/modules/core/tokens/types/token'

import Pin from '../shared/Pin'
import Image from 'next/image'

interface SwapTokenOutProps {
  token: Token
  loading?: boolean
  amount: string
}

const SwapTokenOut = ({ token, loading, amount }: SwapTokenOutProps) => {
  return (
    <section className='flex flex-col space-y-2'>
      <h3>{token.name}</h3>
      {loading ? (
        <div className='max-w-[4rem] pt-2'>
          <Pin pinsClassName='bg-gray' />
        </div>
      ) : (
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-gray'>Total</span>
          <div className='flex space-x-2'>
            <span className='text-lg text-lime-400'>
              {commify(formatUnits(amount, token.decimals))}
            </span>
            <Image
              alt={token.name}
              src={`/assets/tokens/${token.symbol.toLowerCase()}.svg`}
              width={16}
              height={16}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default SwapTokenOut
