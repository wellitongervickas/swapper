import useSwapNativeToToken from '@/modules/core/pool/hooks/useSwapNativeToToken'
import { useEffect } from 'react'

const SwapDetails = () => {
  const { getConstants } = useSwapNativeToToken()

  useEffect(() => {
    getConstants().then(console.log)
  }, [getConstants])

  return <div>Just test</div>
}

export default SwapDetails
