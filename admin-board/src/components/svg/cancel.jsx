import React from 'react'

const Cancel = ({ width = '40', height = '40' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C9.04762 40 0 30.9524 0 20C0 9.04762 9.03226 0 19.9846 0C30.937 0 40 9.04762 40 20C40 30.9524 30.9524 40 20 40ZM11.2903 21.49H28.679C29.6621 21.49 30.3379 20.9677 30.3379 20.0307C30.3379 19.063 29.7081 18.51 28.679 18.51H11.2903C10.2765 18.51 9.61598 19.063 9.61598 20.0307C9.61598 20.9677 10.3226 21.49 11.2903 21.49Z"
        fill="#FF3B30"
      />
    </svg>
  )
}

export default Cancel
