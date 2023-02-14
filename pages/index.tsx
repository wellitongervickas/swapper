import { InfoWalletDetails } from '@/components/info/WalletDetails'
import SwapTokenA from '@/components/swap/TokenA'
import SwapTokenB from '@/components/swap/TokenB'

export default function Home() {
  return (
    <>
      <main>
        <InfoWalletDetails />
        <SwapTokenA />
        <br />
        <SwapTokenB />
      </main>
    </>
  )
}
