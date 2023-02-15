import { ChangeEvent, useEffect, useState } from 'react'
import { Token } from '@/modules/core/tokens/types/token'

import Input from '../shared/form/Input'
import useERC20Contract from '@/modules/core/contracts/hooks/useERC20Contract'
import { commify, formatUnits } from 'ethers/lib/utils'
import useWallet from '@/modules/core/wallet/hooks/useWallet'

interface SwapTokenInProps {
  token: Token
  disabled?: boolean
  amount: string
  onChangeAmount(value: string): void
}

const SwapTokenIn = ({
  token,
  disabled,
  amount,
  onChangeAmount
}: SwapTokenInProps) => {
  const { state } = useWallet()

  const [balance, setBalance] = useState('0')

  const { call } = useERC20Contract({
    address: token.address
  })

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    onChangeAmount(value)
  }

  useEffect(() => {
    call('balanceOf', state.address).then(
      (balance) => balance && setBalance(balance)
    )
  }, [call, state.address])

  return (
    <div className='flex flex-col'>
      <Input
        label={token.name}
        key={token.address}
        id={token.address}
        type='number'
        onChange={handleChangeAmount}
        value={amount}
        disabled={disabled}
        suffix={
          <div className='text-xs text-gray-400'>
            Balance: {commify(formatUnits(balance, token.decimals)).slice(0, 6)}
          </div>
        }
      />
    </div>
  )
}

export default SwapTokenIn
