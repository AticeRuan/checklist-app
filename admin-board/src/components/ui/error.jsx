import React from 'react'

const Error = ({ text = 'Something went wrong, please try again' }) => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center text-2xl bg-gray-50 flex-col gap-6 absolute top-0 left-0 z-40">
      <p className="text-center">{text}</p>
    </div>
  )
}

export default Error
