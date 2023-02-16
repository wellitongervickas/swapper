import config from '@/config'
import classnames from '@/modules/utils/classnames'
import Image from 'next/image'
import Link from 'next/link'

export const SocialMediaDiscord = () => {
  return (
    <Link
      href={config.social.discordURL}
      className='transition-opacity duration-200 hover:opacity-80'
    >
      <div
        className={classnames.merge([
          'rounded-md border border-white py-2 px-4 text-xs',
          'flex items-center justify-between space-x-2'
        ])}
      >
        <span>Join our community</span>
        <span>
          <Image
            alt='discord'
            src='/assets/icons/discord.svg'
            width={16}
            height={16}
          />
        </span>
      </div>
    </Link>
  )
}

export default SocialMediaDiscord
