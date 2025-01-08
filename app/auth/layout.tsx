import React from 'react'
import AuthBackgroungImage from "@/public/auth-background.jpg"
import AuthBannerImage from "@/public/auth-banner.jpg"
import Image from 'next/image'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className=' relative bg-gray-200 min-h-screen'>
      <div className='absolute inset-0'>
        <Image
          alt='auth banner'
          src={AuthBackgroungImage}
          width={1900}
          height={1080}
          className=' w-full h-full object-cover'
        />
        <div className="absolute h-full w-full inset-0 bg-gradient-to-r from-orange-500/50  to-gray-900/50"></div>
      </div>
      <div className="p-10 flex items-center justify-center">
        <div className="flex items-center justify-between relative z-50 bg-white shadow-md rounded-3xl h-full max-w-[1020px] md:max-h-[700px] w-full overflow-hidden">

          <Image
            alt='auth banner'
            src={AuthBannerImage}
            width={300}
            height={500}
            className='lg:block hidden w-full object-cover h-full max-h-[600px] rounded-3xl shadow-xl'
          />
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout