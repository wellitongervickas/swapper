import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Token } from '@/modules/core/tokens/types/token'
import Input from '../shared/form/Input'
import useERC20Contract from '@/modules/core/contracts/hooks/useERC20Contract'
import { commify, formatUnits } from 'ethers/lib/utils'
import useWallet from '@/modules/core/wallet/hooks/useWallet'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import FormCheckbox from '../shared/form/Checkbox'

interface SwapTokenInProps {
  token: Token
  disabled?: boolean
  amount: string
  onChangeAmount(value: string): void
  onChangeUseNative(value: boolean): void
  executeAsNativeValue?: boolean
}

const SwapTokenIn = ({
  token,
  disabled,
  amount,
  onChangeAmount,
  onChangeUseNative,
  executeAsNativeValue
}: SwapTokenInProps) => {
  const chainConfig = useChainConfig()
  const { state } = useWallet()

  const [balance, setBalance] = useState('0')
  const [native, setNative] = useState(false)

  const { call } = useERC20Contract({
    address: native ? undefined : token.address
  })

  const handleCheckBalance = useCallback(async () => {
    if (!state.address || !state.connected) return
    await call('balanceOf', state.address).then(
      (balance) => balance && setBalance(balance)
    )
  }, [state.address, state.connected, call])

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    onChangeAmount(value)
    handleCheckBalance()
  }

  const handleChangeToNative = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setNative(value)
    onChangeUseNative(value)
  }

  useEffect(() => {
    if (!state.address) return
    handleCheckBalance()
  }, [handleCheckBalance, state.address])

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
          <FormCheckbox
            id='useAsNative'
            onChange={handleChangeToNative}
            checked={executeAsNativeValue}
            label={'Use native balance'}
          />
        </div>
      )}
    </div>
  )
}

export default SwapTokenIn
