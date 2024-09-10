import React from 'react'
import Loader from '../svg/loader'

const Loading = ({ text = 'Loading' }) => {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center text-2xl bg-gray-50 flex-col gap-6 absolute top-0 left-0 z-40">
      <div className="animate-spin">
        <Loader />
      </div>
      <p className="text-center">{text}</p>
    </div>
  )
}

export default Loading
