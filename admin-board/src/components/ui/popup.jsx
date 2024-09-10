import React from 'react'
import { Tick } from '../svg/tick'
import Cancel from '../svg/cancel'
import Archive from '../svg/archive'

const Popup = ({
  confirmation = true,
  children,
  confirm = () => {},
  cancel = () => {},
  title = 'Title',
  content = 'Content',
}) => {
  return (
    <div className="w-full h-full backdrop-brightness-50 absolute top-0 left-0 items-center justify-center flex z-50">
      <div className="min-w-[23rem] h-fit bg-white rounded-xl p-10 flex flex-col gap-16">
        <h1 className="text-b-active-blue text-[30px] border-b-2 py-4">
          {title}
        </h1>
        {!confirmation && (
          <div className="w-full flex items-center justify-center">
            {children}
          </div>
        )}
        <p className="text-2xl mb-2">{content}</p>
        {confirmation && (
          <div className="flex gap-10 w-full items-center justify-center">
            <button className="" onClick={confirm}>
              <Tick />
            </button>
            <button className="" onClick={cancel}>
              <Cancel />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Popup
