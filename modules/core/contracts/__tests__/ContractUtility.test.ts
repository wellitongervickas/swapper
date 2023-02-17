import { providers } from '../../entities/provider'
import { BigNumber } from '../../entities/numbers'

import ContractUtility from '../ContractUtility'
import { ContractFactory } from '../../entities/contract'

describe('ContractUtility: DEFAULT_GAS_LIMIT', () => {
  it('should return default gas limit', () => {
    expect(ContractUtility.DEFAULT_GAS_LIMIT.toString()).toBe('250000')
  })

  it('should return the gas limit increased with no decimals', () => {
    const limit = ContractUtility.DEFAULT_GAS_LIMIT
    expect(ContractUtility.getGasLimit(limit)).toBe('5595221')
  })

  it('should return the gas limit increased with decimals', () => {
    const limit = ContractUtility.DEFAULT_GAS_LIMIT
    expect(ContractUtility.getGasLimit(limit, 6)).toBe('28642')
  })

  it('should estimate get gas price from provider incresed', async () => {
    const provider = new providers.JsonRpcProvider()
    provider.getGasPrice = jest.fn(() => Promise.resolve(BigNumber.from('100')))

    expect(await ContractUtility.getGasPrice(provider)).toBe('130')
  })

  it.skip('should estimate gas by method', async () => {})
})
