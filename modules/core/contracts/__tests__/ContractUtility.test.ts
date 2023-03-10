import { providers } from '@/modules/core/entities/provider'
import { BigNumber } from '@/modules/core/entities/numbers'
import ContractUtility from '../ContractUtility'

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

  it('should estimate gas by method', async () => {
    const decimals = jest.fn(() => Promise.resolve(BigNumber.from(210000)))

    const contract = {
      estimateGas: {
        decimals
      }
    } as any

    const estimate = await ContractUtility.estimateGasByMethod(
      contract,
      'decimals'
    )

    expect(estimate.toString()).toBe('210000')
  })

  it('should estimate gas by method using the default value if throws', async () => {
    const decimals = jest.fn(() => Promise.reject())

    const contract = {
      estimateGas: {
        decimals
      }
    } as any

    const estimate = await ContractUtility.estimateGasByMethod(
      contract,
      'decimals'
    )

    expect(estimate.toString()).toBe(
      ContractUtility.DEFAULT_GAS_LIMIT.toString()
    )
  })
})
