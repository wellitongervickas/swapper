import Alert from '@/components/shared/Alert'
import { Token } from '@/modules/core/tokens/types/token'
import useChainConfig from '@/modules/shared/hooks/useChainConfig'

interface SwapCardNativeExecutionAlertProps {
  token: Token
}

const SwapCardNativeExecutionAlert = ({
  token
}: SwapCardNativeExecutionAlertProps) => {
  const config = useChainConfig()

  return (
    <Alert>
      <span className='inline space-x-1'>
        <span>Heads up! This Execution will exchange your native</span>
        <span>{config.tokens.NATIVE.symbol}</span>
        <span>balance to {token.symbol}.</span>
      </span>
    </Alert>
  )
}

export default SwapCardNativeExecutionAlert
