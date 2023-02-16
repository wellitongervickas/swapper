import useChainConfig from '@/modules/shared/hooks/useChainConfig'

import Divider from '@/components/shared/Divider'
import Link from 'next/link'

interface SwapCardReceiptProps {
  hashAddress: string
}

const SwapCardReceipt = ({ hashAddress }: SwapCardReceiptProps) => {
  const config = useChainConfig()

  return (
    <div>
      <Divider />
      <Link
        href={`${config.scanURL}/tx/${hashAddress}`}
        target='_blank'
        className='text-xs text-gray'
      >
        View on etherscan
      </Link>
    </div>
  )
}

export default SwapCardReceipt
