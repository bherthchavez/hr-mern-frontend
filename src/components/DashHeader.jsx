/* eslint-disable jsx-a11y/anchor-is-valid */
// import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const DashHeader = () => {

    const content = (
        <header aria-label="Site Header" className="border-b  bg-gray-50">
        <div
          className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center">
            <button type="button" className="p-2 sm:mr-4 lg:hidden">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
      
            <p className="flex">
              <span className="sr-only">Logo</span>
              <span className="inline-block text-gray-700 text-2xl font-bold">HR</span>
            </p>

          </div>

          <nav>
            <Navbar/>
          </nav>


          </div>
        </header>
      )

  return content
}

export default DashHeader