import React from 'react'

const SearchBox = ({ placeholder }) => {
  return (
    <input
      className="border-2 border-b-light-grey w-[30rem] h-[2rem] mx-8 focus:border-b-deep-blue rounded-lg mb-9 px-3"
      placeholder={placeholder}
      type="text"
    />
  )
}

export default SearchBox
