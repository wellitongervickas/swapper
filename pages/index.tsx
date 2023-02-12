import { InfoWalletDetails } from '@/components/info/WalletDetails'
import SwapDetails from '@/components/swap/Details'

export default function Home() {
  return (
    <>
      <main>
        <InfoWalletDetails />
        <SwapDetails />
      </main>
    </>
  )
}
