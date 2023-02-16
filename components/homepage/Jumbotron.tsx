import config from '@/config'
import Image from 'next/image'
import { ReactNode } from 'react'

interface HomepageWrapperProps {
  children?: ReactNode
  title: string
  description: string
}

const HomepageWrapper = ({
  children,
  title,
  description
}: HomepageWrapperProps) => (
  <div className='group relative w-screen'>
    <div className='-z-1 absolute h-[26rem] w-screen animate-pulse'>
      <Image
        loading='eager'
        src='/assets/background.png'
        alt={config.meta.description}
        fill
      />
    </div>
    <div className='-z-2 absolute h-[26rem] w-screen  bg-gradient-to-t from-black to-transparent'></div>
    <div className='z-2 relative grid grid-cols-1 gap-16 py-16 container md:grid-cols-2'>
      <div className='flex flex-col justify-center space-y-4'>
        <h1 className='text-5xl font-black text-primary drop-shadow-md'>
          {title}
        </h1>
        <h2 className='w-full text-xl text-gray drop-shadow-md lg:w-2/3'>
          {description}
        </h2>
      </div>
      <div className='flex items-center justify-end'>{children}</div>
    </div>
  </div>
)

export default HomepageWrapper
