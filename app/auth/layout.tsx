import React from 'react'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen pt-24'>
      <div className="container flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout