import React from 'react'

const Thead = (props) => {

const content = (
    <th className="whitespace-nowrap px-4 py-2 text-left font-bold tracking-wide text-[.625rem] text-gray-900 dark:text-gray-500">
          <div className="flex items-center gap-2">
          {props.thName}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </th>
)

  return content
}

export default Thead