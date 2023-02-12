import config from '..'

export const getConfigByChainId = (chainId: number) => {
  const chain = Object.values(config.chains).find(
    (chain) => chain.id === chainId
  )

  return chain
}
