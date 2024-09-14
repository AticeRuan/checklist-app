import React from 'react'

const Error = ({ text = 'Something went wrong, please try again' }) => {
  return (
    <div className="w-screen h-full flex items-center justify-center text-2xl flex-col gap-6 absolute top-0 left-0 z-40 bg-b-mid-blue text-white ">
      <p className="text-center text-lg ">{text}</p>
    </div>
  )
}

export default Error
