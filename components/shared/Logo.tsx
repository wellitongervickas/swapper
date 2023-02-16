import config from '@/config'
import Image from 'next/image'

const Logo = () => (
  <div className='flex flex-row items-center justify-center space-x-2 leading-none'>
    <Image alt={config.name} src='/assets/logo.svg' width={20} height={20} />
    <span className='text-2xl'>{config.name}</span>
  </div>
)

export default Logo
