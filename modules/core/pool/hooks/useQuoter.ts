import { useChainConfig } from '@/modules/shared/hooks/useChainConfig'
import { useWallet } from '@/modules/core/wallet/hooks/useWallet'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Token } from '@uniswap/sdk-core'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { FeeAmount } from '@uniswap/v3-sdk'

interface QuoteAmountParams {
  amount: ethers.BigNumber
  tokenA: Token
  tokenB: Token
  fee: FeeAmount
}

function useQuoter() {
  const config = useChainConfig()
  const { signerOrProvider } = useWallet()
  const [quoter, setQuoter] = useState<ethers.Contract>()

  useEffect(() => {
    if (!signerOrProvider) return
    const quoterContract = new ethers.Contract(
      config.hubs.uniswapQuoter.address,
      Quoter.abi,
      signerOrProvider
    )

    quoterContract.deployed().then(console.log)

    setQuoter(quoterContract)
  }, [config.hubs.uniswapQuoter.address, signerOrProvider])

  const getQuotedAmount = async (params: QuoteAmountParams) => {
    console.log(params)
    const quotedAmountOut = await quoter?.quoteExactInputSingle(
      params.tokenA.address,
      params.tokenB.address,
      params.fee,
      params.amount.toString(),
      0
    )
    return quotedAmountOut
  }

  return {
    quoter,
    getQuotedAmount
  }
}

export default useQuoter
