import useSwapNativeToToken from '@/modules/core/pool/hooks/usePoolNativeToToken'
import { useEffect } from 'react'

const SwapDetails = () => {
  const { getQuoteOut } = useSwapNativeToToken()

  useEffect(() => {
    getQuoteOut(1).then(console.log)
  }, [getQuoteOut])

  return <div>Just test</div>
}

export default SwapDetails
