import config from '@/config'
import Image from 'next/image'
import { ReactNode } from 'react'
import SocialMediaDiscord from '../shared/SocialMedias/Discord'

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
    <div className='z-2 relative grid grid-cols-1 gap-16 py-24 container md:grid-cols-2'>
      <div className='flex flex-col justify-center space-y-4'>
        <h1 className='text-5xl font-black text-primary drop-shadow-md'>
          {title}
        </h1>
        <h2 className='w-full pb-8 text-xl text-gray drop-shadow-md lg:w-2/3'>
          {description}
        </h2>
        <div className='flex'>
          <SocialMediaDiscord />
        </div>
      </div>
      <div className='relative'>
        <div className='absolute  h-full w-full '>
          <div className='absolute left-[6rem] hidden opacity-40 md:block'>
            <Image
              src='/assets/icons/ball.svg'
              alt='balls'
              width={120}
              height={120}
            />
          </div>
          <div className='absolute -bottom-16 hidden md:-right-8 md:block lg:-right-16'>
            <Image
              src='/assets/icons/ball.svg'
              alt='balls'
              width={180}
              height={180}
            />
          </div>
        </div>
        <div className='z-3 relative flex items-center justify-center md:flex md:justify-end'>
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default HomepageWrapper
