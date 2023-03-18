import React, { useState } from 'react'

const ToastNotification = ({ active, msgContent }) => {

    console.log(active, msgContent)

    const [nav, setNav] = useState(active);

    const handleNav = () => {
      setNav(!nav);
    };

    const content = (
        <aside
        className={!nav ? `fixed top-20 right-[-100%] ease-in-out duration-300 z-50 flex items-center justify-center gap-4 rounded-lg bg-black px-5 py-3 text-white`: `fixed top-20 right-4 z-50 flex ease-in-out duration-300 items-center justify-center gap-4 rounded-lg bg-black px-5 py-3 text-white`}
      >
        <a
          href="/new-thing"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium hover:opacity-75"
        >
          {msgContent}
        </a>
      
        <button onClick={handleNav}  className="rounded bg-white/20 p-1 hover:bg-white/10">
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </aside>

    )

  return content
}

export default ToastNotification