import Image from 'next/image'

const Logo = () => {
  return (
    <div>
        <Image
        className="dark:invert"
        src="/logo.svg"
        alt="logo"
        width={40}
        height={40}
        />
    </div>
  )
}

export default Logo