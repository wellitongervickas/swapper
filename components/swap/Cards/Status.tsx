import Alert, { Variant } from '@/components/shared/Alert'
import { PoolSwapStatus } from '@/modules/core/pool/types/enums'

interface SwapCardStatusProps {
  status: PoolSwapStatus
}

const SwapCardStatus = ({ status }: SwapCardStatusProps) => (
  <div>
    {
      {
        [PoolSwapStatus.AllowanceNotApproved]: (
          <Alert variant={Variant.Warning}>Allowance not approved</Alert>
        ),
        [PoolSwapStatus.ExchangeNativeFailed]: (
          <Alert variant={Variant.Warning}>
            Failed to exchange native balance
          </Alert>
        ),
        [PoolSwapStatus.ExecutionFailed]: (
          <Alert variant={Variant.Error}>Swap has failed, try again.</Alert>
        ),
        [PoolSwapStatus.ExecutionSuccess]: (
          <Alert variant={Variant.Success}>Swap has been executed.</Alert>
        ),
        [PoolSwapStatus.PoolNotAvailable]: (
          <Alert variant={Variant.Error}>Liquidity pool not available.</Alert>
        )
      }[status]
    }
  </div>
)

export default SwapCardStatus
