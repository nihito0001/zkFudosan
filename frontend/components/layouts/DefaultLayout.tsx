import React, { FC, ReactNode } from 'react'

type DefaultLayoutProps = {
  children: ReactNode
}


const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default DefaultLayout
