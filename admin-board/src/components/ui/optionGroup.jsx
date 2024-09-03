import React from 'react'
import { useState } from 'react'
import OptionItem from './optionItem'
import { Tick } from '../svg/tick'
import Cancel from '../svg/cancel'
const OptionGroup = ({
  title = 'group',
  handleDelete,
  handleUpdate,
  id_key,
  data,
  keys,
  isUser = false,
  handleCreate = () => {},
  handleReset,
}) => {
  const [open, setOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }
  const handleIsCreating = () => {
    setIsCreating(!isCreating)
  }

  const [newItem, setNewItem] = useState({})

  const handleChange = (key, value) => {
    setNewItem({ ...newItem, [key]: value })
  }

  return (
    <div className="flex flex-col w-full 2xl:w-[60vw] justify-center  items-center p-4 border-t-2 border-b-2 hover:cursor-pointer py-9 shadow-sm">
      <div
        className="flex w-full justify-between items-center "
        onClick={handleOpen}
      >
        <h2 className="leading-[1.5rem] font-[500] text-[1.8rem] text-b-active-blue w-full text-left">
          {title}
        </h2>

        <button
          style={{
            transform: open ? 'rotate(90deg) scale(1.4)' : 'scale(1.4)',
            transition: '0.3s',
          }}
        >
          <Caret />
        </button>
      </div>

      {open && (
        <div className="w-full flex pl-[2rem] flex-col gap-3 mt-7 bg-white justify-center">
          <div
            className="w-full "
            style={{
              marginBottom: isCreating ? 0 : 8,
            }}
          >
            <button
              className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 uppercase font-[500] "
              style={{
                backgroundColor: isCreating ? '#C24500' : '',
              }}
              onClick={handleIsCreating}
            >
              {isCreating ? 'cancel ' : 'create new'}
            </button>
          </div>
          {isCreating && (
            <div className="flex w-fit  flex-wrap gap-5 pb-9">
              {keys?.length > 0 &&
                keys.map((key) => (
                  <input
                    key={key}
                    className=" text-lg p-3 rounded-lg border-2 capitalize"
                    placeholder={key.split('_').join(' ')}
                    onChange={(e) => handleChange(key, e.target.value)}
                    value={newItem[key] || ''}
                  />
                ))}
              <div className="flex-1 flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setNewItem({})
                    handleCreate(newItem)
                  }}
                >
                  <Tick width="28" />
                </button>
              </div>
            </div>
          )}

          <div className="flex  ">
            {keys?.map((key) => (
              <p
                key={key}
                className="flex-1 text-lg  uppercase text-b-mid-grey"
              >
                {key.split('_').join(' ')}
              </p>
            ))}

            <p className="flex-1 text-lg uppercase">action</p>
          </div>
          {data?.map((item, index) => {
            return (
              <OptionItem
                key={index}
                item={item}
                keys={keys}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                id_key={id_key}
                isUser={isUser}
                handleReset={handleReset}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OptionGroup

const Caret = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70698 6.29299C7.89445 6.48052 7.99976 6.73483 7.99976 6.99999C7.99976 7.26516 7.89445 7.51946 7.70698 7.70699L2.04998 13.364C1.95773 13.4595 1.84739 13.5357 1.72538 13.5881C1.60338 13.6405 1.47216 13.6681 1.33938 13.6692C1.2066 13.6704 1.07492 13.6451 0.952023 13.5948C0.829127 13.5445 0.717474 13.4703 0.623581 13.3764C0.529689 13.2825 0.455436 13.1708 0.405155 13.0479C0.354874 12.9251 0.329572 12.7934 0.330726 12.6606C0.33188 12.5278 0.359466 12.3966 0.411875 12.2746C0.464284 12.1526 0.540466 12.0422 0.635976 11.95L5.58598 6.99999L0.635976 2.04999C0.453818 1.86139 0.353024 1.60879 0.355302 1.34659C0.357581 1.0844 0.46275 0.833582 0.648158 0.648174C0.833566 0.462767 1.08438 0.357596 1.34658 0.355318C1.60877 0.35304 1.86137 0.453834 2.04998 0.635992L7.70698 6.29299Z"
        fill="#00739E"
      />
    </svg>
  )
}
