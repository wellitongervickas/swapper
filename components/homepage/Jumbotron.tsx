import config from '@/config'
import classnames from '@/modules/utils/classnames'
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
  <div className='relative w-full'>
    <div className='-z-1 absolute h-[26rem] w-full animate-pulse'>
      <Image
        loading='eager'
        src='/assets/background.png'
        alt={config.meta.description}
        fill
      />
    </div>
    <div className='-z-2 absolute h-[26rem] w-full  bg-gradient-to-t from-black to-transparent'></div>
    <div className='z-2 relative grid grid-cols-1 gap-y-16 gap-x-0 py-24 container md:grid-cols-2 md:gap-x-16'>
      <div className='flex flex-col justify-center space-y-4'>
        <h1 className='font-pixel text-[4rem] font-black leading-none text-primary drop-shadow-md'>
          {title}
        </h1>
        <h2 className='w-full pb-8 text-xl text-gray drop-shadow-md lg:w-2/3'>
          {description}
        </h2>
        <div className='flex'>
          <SocialMediaDiscord />
        </div>
      </div>
      <div className='group relative'>
        <div className='absolute hidden h-full w-full md:block'>
          <div
            className={classnames.merge([
              'absolute left-[6rem] top-0 opacity-40',
              'transition-all duration-700 group-hover:-top-4'
            ])}
          >
            <Image
              src='/assets/icons/ball.svg'
              alt='balls'
              width={120}
              height={120}
            />
          </div>
          <div
            className={classnames.merge([
              'absolute -bottom-16 hidden md:-right-8 md:block lg:-right-16',
              'transition-all duration-1000 group-hover:-bottom-8'
            ])}
          >
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
