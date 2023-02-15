import { ChangeEvent, useEffect, useState } from 'react'
import { Token } from '@/modules/core/tokens/types/token'

import Input from '../shared/form/Input'
import useERC20Contract from '@/modules/core/contracts/hooks/useERC20Contract'
import { commify, formatUnits } from 'ethers/lib/utils'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

interface SwapTokenInProps {
  token: Token
  disabled?: boolean
  amount: string
  onChangeAmount(value: string): void
  onChangeUseNative(value: boolean): void
}

const SwapTokenIn = ({
  token,
  disabled,
  amount,
  onChangeAmount,
  onChangeUseNative
}: SwapTokenInProps) => {
  const chainConfig = useChainConfig()
  const { state } = useWallet()

  const [balance, setBalance] = useState('0')
  const [native, setNative] = useState(false)

  const { call } = useERC20Contract({
    address: native ? undefined : token.address
  })

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    onChangeAmount(value)
  }

  const handleChangeToNative = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setNative(value)
    onChangeUseNative(value)
  }

  useEffect(() => {
    call('balanceOf', state.address).then(
      (balance) => balance && setBalance(balance)
    )
  }, [call, state.address])

  return (
    <div className='flex flex-col space-y-4'>
      <Input
        label={token.name}
        key={token.address}
        id={token.address}
        type='number'
        onChange={handleChangeAmount}
        value={amount}
        disabled={disabled}
        suffix={
          <div className='flex space-x-2 text-xs text-gray-400'>
            <span>Balance:</span>
            <span>
              {commify(
                formatUnits(
                  native ? state.balance : balance,
                  native ? chainConfig.tokens.NATIVE.decimals : token.decimals
                )
              ).slice(0, 6)}
            </span>
          </div>
        }
      />
      {!disabled && token.native && (
        <div>
          <input type='checkbox' onChange={handleChangeToNative} />
          <label htmlFor=''>Use native balance</label>
        </div>
      )}
    </div>
  )
}

export default SwapTokenIn
