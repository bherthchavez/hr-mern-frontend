/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState("dash");

  const handleNavUsers = () => {
    setNav("users");
  };
  const handleNavDash = () => {
    setNav("dash");
  };

  const content = (
    <div className="flex flex-1 items-center justify-end">
      <nav
        aria-label="Site Nav"
        className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"
      >
      <Link to="/dash">
        <span
          onClick={handleNavDash}
          className={
            nav === "dash"
              ? "block h-16 border-b-4 leading-[4rem] border-current text-red-700"
              : "block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
          }
        >
          Dashboard
        </span>
</Link>
        <Link to="/dash/users">
        <span
          onClick={handleNavUsers}
          className={
            nav === "users"
              ? "block h-16 border-b-4 leading-[4rem] border-current text-red-700"
              : "block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
          }
        >
          Users
        </span>
        </Link>

        <a
          href="/news"
          className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
        >
          News
        </a>

        <a
          href="/products"
          className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
        >
          Products
        </a>

        <a
          href="/contact"
          className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
        >
          Contact
        </a>
      </nav>

      <div className="ml-8 flex items-center">
        <div className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
          <span>
            <div className="flex gap-4">
              <div className="relative hidden sm:block">
                <label className="sr-only" htmlFor="search">
                  {" "}
                  Search{" "}
                </label>

                <input
                  className="h-10 w-full rounded-lg border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
                  id="search"
                  type="search"
                  placeholder="Search..."
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                >
                  <span className="sr-only">Submut Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 sm:hidden"
              >
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <a
                href="#"
                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </a>
              <button
                type="button"
                className="group flex shrink-0 items-center rounded-lg transition"
              >
                <span className="sr-only">Menu</span>
                <img
                  alt="Man"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-10 w-10 rounded-full object-cover"
                />

                <p className="ml-2 hidden text-left text-xs sm:block">
                  <strong className="block font-medium">Eric Frusciante</strong>

                  <span className="text-gray-500"> eric@frusciante.com </span>
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );

  return content;
};

export default Navbar;
