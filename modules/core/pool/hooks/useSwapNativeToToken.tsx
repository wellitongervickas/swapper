import useChainConfig from '@/modules/shared/hooks/useChainConfig'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import useWallet from '../../wallet/hooks/useWallet'
import { PoolFactory } from '../factory'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

function useSwapNativeToToken() {
  const config = useChainConfig()
  const { state, signerOrProvider } = useWallet()

  const [poolFactory, setFactory] = useState<PoolFactory>()

  const getConstants = async () => {
    if (!poolFactory) return

    const poolContract = new ethers.Contract(
      poolFactory.address,
      IUniswapV3PoolABI.abi,
      signerOrProvider
    )

    const [tokenA, tokenB, fee] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee()
    ])

    return {
      tokenA,
      tokenB,
      fee
    }
  }

  useEffect(() => {
    if (!state.connected) return
    const factory = new PoolFactory({
      chainId: state.chainId,
      factoryAddress: config.hubs.uniswapFactory.address,
      tokenA: config.tokens.SWPR,
      tokenB: config.tokens.WETH
    })

    setFactory(factory)
  }, [
    config.hubs.uniswapFactory.address,
    state.connected,
    config.tokens.WETH,
    config.tokens.SWPR,
    state.chainId
  ])

  return { poolFactory, getConstants }
}

export default useSwapNativeToToken
