import ContractUtility from '../ContractUtility'

describe('ContractUtility: DEFAULT_GAS_LIMIT', () => {
  it('should return default gas limiot', () => {
    expect(ContractUtility.DEFAULT_GAS_LIMIT.toString()).toBe('250000')
  })

  it('should return gas limit increased with no decimals', () => {
    const limit = ContractUtility.DEFAULT_GAS_LIMIT
    expect(ContractUtility.getGasLimit(limit)).toBe('5595221')
  })
})
