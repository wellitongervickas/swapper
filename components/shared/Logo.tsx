import config from '@/config'

const Logo = () => (
  <div className='flex flex-row items-center justify-center space-x-2 leading-none'>
    <span className='text-2xl'>{config.name}</span>
  </div>
)

export default Logo
